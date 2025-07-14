/*
  # Initial Schema for PageTurner Writing Platform

  1. New Tables
    - `profiles` - User profiles with writing statistics
    - `books` - Book metadata and settings
    - `chapters` - Individual chapters within books
    - `book_collaborators` - Co-authoring permissions
    - `likes` - Likes on books and chapters
    - `comments` - Comments on chapters
    - `critiques` - Structured feedback on chapters
    - `groups` - Writing groups and communities
    - `group_members` - Group membership
    - `challenges` - Writing challenges and contests
    - `challenge_participants` - Challenge participation
    - `badges` - Achievement badges
    - `user_badges` - User badge assignments
    - `notifications` - User notifications
    - `follows` - User following relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure data access based on user permissions
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  location text DEFAULT '',
  website text DEFAULT '',
  favorite_genres text[] DEFAULT '{}',
  writing_goals jsonb DEFAULT '{}',
  stats jsonb DEFAULT '{"books_written": 0, "chapters_published": 0, "total_words": 0, "followers": 0, "following": 0, "likes_received": 0}',
  preferences jsonb DEFAULT '{"theme": "light", "notifications": {"email": true, "web": true}}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  synopsis text DEFAULT '',
  cover_url text DEFAULT '',
  genre text NOT NULL,
  tags text[] DEFAULT '{}',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'beta', 'published')),
  visibility text DEFAULT 'private' CHECK (visibility IN ('private', 'public', 'unlisted')),
  settings jsonb DEFAULT '{"allow_comments": true, "allow_critiques": true, "mature_content": false}',
  stats jsonb DEFAULT '{"views": 0, "likes": 0, "comments": 0, "chapters": 0, "words": 0, "rating": 0, "reviews": 0}',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text DEFAULT '',
  chapter_number integer NOT NULL,
  word_count integer DEFAULT 0,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'beta', 'published')),
  notes text DEFAULT '',
  stats jsonb DEFAULT '{"views": 0, "likes": 0, "comments": 0}',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(book_id, chapter_number)
);

-- Book collaborators table
CREATE TABLE IF NOT EXISTS book_collaborators (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'editor' CHECK (role IN ('co-author', 'editor', 'beta-reader')),
  permissions jsonb DEFAULT '{"read": true, "comment": true, "edit": false}',
  invited_by uuid REFERENCES profiles(id) NOT NULL,
  accepted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(book_id, user_id)
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('book', 'chapter', 'comment')),
  target_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, target_type, target_id)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  position_start integer,
  position_end integer,
  reactions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Critiques table
CREATE TABLE IF NOT EXISTS critiques (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  strengths text DEFAULT '',
  improvements text DEFAULT '',
  suggestions text DEFAULT '',
  overall_feedback text DEFAULT '',
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(chapter_id, user_id)
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  category text NOT NULL,
  settings jsonb DEFAULT '{"public": true, "auto_approve": true}',
  stats jsonb DEFAULT '{"members": 0, "posts": 0}',
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Group members table
CREATE TABLE IF NOT EXISTS group_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text DEFAULT '',
  type text NOT NULL CHECK (type IN ('word_count', 'chapter_count', 'daily_writing', 'flash_fiction')),
  rules jsonb DEFAULT '{}',
  prizes text[] DEFAULT '{}',
  difficulty text DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  stats jsonb DEFAULT '{"participants": 0}',
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Challenge participants table
CREATE TABLE IF NOT EXISTS challenge_participants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id uuid REFERENCES challenges(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  progress jsonb DEFAULT '{}',
  completed boolean DEFAULT false,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

-- Badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  description text DEFAULT '',
  icon text DEFAULT '',
  category text NOT NULL,
  requirements jsonb DEFAULT '{}',
  rarity text DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at timestamptz DEFAULT now()
);

-- User badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text DEFAULT '',
  data jsonb DEFAULT '{}',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Follows table
CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  following_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE critiques ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Books policies
CREATE POLICY "Anyone can view published books" ON books FOR SELECT USING (
  status = 'published' AND visibility = 'public'
  OR author_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM book_collaborators 
    WHERE book_id = books.id AND user_id = auth.uid()
  )
);
CREATE POLICY "Authors can manage their books" ON books FOR ALL USING (author_id = auth.uid());
CREATE POLICY "Collaborators can view books" ON books FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM book_collaborators 
    WHERE book_id = books.id AND user_id = auth.uid()
  )
);

-- Chapters policies
CREATE POLICY "Users can view chapters of accessible books" ON chapters FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM books 
    WHERE books.id = chapters.book_id 
    AND (
      (books.status = 'published' AND books.visibility = 'public')
      OR books.author_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM book_collaborators 
        WHERE book_id = books.id AND user_id = auth.uid()
      )
    )
  )
);
CREATE POLICY "Authors can manage chapters" ON chapters FOR ALL USING (
  EXISTS (
    SELECT 1 FROM books 
    WHERE books.id = chapters.book_id AND books.author_id = auth.uid()
  )
);

-- Book collaborators policies
CREATE POLICY "Users can view collaborators of accessible books" ON book_collaborators FOR SELECT USING (
  user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM books 
    WHERE books.id = book_collaborators.book_id AND books.author_id = auth.uid()
  )
);
CREATE POLICY "Authors can manage collaborators" ON book_collaborators FOR ALL USING (
  EXISTS (
    SELECT 1 FROM books 
    WHERE books.id = book_collaborators.book_id AND books.author_id = auth.uid()
  )
);

-- Likes policies
CREATE POLICY "Users can view all likes" ON likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own likes" ON likes FOR ALL USING (user_id = auth.uid());

-- Comments policies
CREATE POLICY "Users can view comments on accessible chapters" ON comments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM chapters 
    JOIN books ON books.id = chapters.book_id
    WHERE chapters.id = comments.chapter_id 
    AND (
      (books.status = 'published' AND books.visibility = 'public')
      OR books.author_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM book_collaborators 
        WHERE book_id = books.id AND user_id = auth.uid()
      )
    )
  )
);
CREATE POLICY "Users can manage their own comments" ON comments FOR ALL USING (user_id = auth.uid());

-- Critiques policies
CREATE POLICY "Users can view public critiques" ON critiques FOR SELECT USING (
  is_public = true OR user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM chapters 
    JOIN books ON books.id = chapters.book_id
    WHERE chapters.id = critiques.chapter_id AND books.author_id = auth.uid()
  )
);
CREATE POLICY "Users can manage their own critiques" ON critiques FOR ALL USING (user_id = auth.uid());

-- Groups policies
CREATE POLICY "Users can view public groups" ON groups FOR SELECT USING (true);
CREATE POLICY "Users can create groups" ON groups FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "Group creators can manage their groups" ON groups FOR ALL USING (created_by = auth.uid());

-- Group members policies
CREATE POLICY "Users can view group members" ON group_members FOR SELECT USING (true);
CREATE POLICY "Users can manage their own membership" ON group_members FOR ALL USING (user_id = auth.uid());

-- Challenges policies
CREATE POLICY "Users can view all challenges" ON challenges FOR SELECT USING (true);
CREATE POLICY "Users can create challenges" ON challenges FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "Challenge creators can manage their challenges" ON challenges FOR ALL USING (created_by = auth.uid());

-- Challenge participants policies
CREATE POLICY "Users can view challenge participants" ON challenge_participants FOR SELECT USING (true);
CREATE POLICY "Users can manage their own participation" ON challenge_participants FOR ALL USING (user_id = auth.uid());

-- Badges policies
CREATE POLICY "Users can view all badges" ON badges FOR SELECT USING (true);

-- User badges policies
CREATE POLICY "Users can view all user badges" ON user_badges FOR SELECT USING (true);
CREATE POLICY "System can award badges" ON user_badges FOR INSERT WITH CHECK (true);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (true);

-- Follows policies
CREATE POLICY "Users can view all follows" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can manage their own follows" ON follows FOR ALL USING (follower_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_books_author_id ON books(author_id);
CREATE INDEX IF NOT EXISTS idx_books_status_visibility ON books(status, visibility);
CREATE INDEX IF NOT EXISTS idx_chapters_book_id ON chapters(book_id);
CREATE INDEX IF NOT EXISTS idx_chapters_book_chapter ON chapters(book_id, chapter_number);
CREATE INDEX IF NOT EXISTS idx_comments_chapter_id ON comments(chapter_id);
CREATE INDEX IF NOT EXISTS idx_likes_target ON likes(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_target ON likes(user_id, target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);

-- Insert initial badges
INSERT INTO badges (name, description, icon, category, requirements) VALUES
('First Chapter', 'Published your first chapter', 'BookOpen', 'writing', '{"chapters_published": 1}'),
('Prolific Writer', 'Published 10 chapters', 'Edit3', 'writing', '{"chapters_published": 10}'),
('Word Master', 'Written 50,000 words', 'FileText', 'writing', '{"total_words": 50000}'),
('Helpful Reviewer', 'Left 25 critiques', 'Star', 'community', '{"critiques_given": 25}'),
('Popular Author', 'Received 100 likes', 'Heart', 'social', '{"likes_received": 100}'),
('Community Builder', 'Joined 5 groups', 'Users', 'community', '{"groups_joined": 5}'),
('Challenge Champion', 'Completed 3 challenges', 'Trophy', 'achievement', '{"challenges_completed": 3}'),
('Consistent Writer', 'Wrote for 30 consecutive days', 'Calendar', 'writing', '{"writing_streak": 30}');