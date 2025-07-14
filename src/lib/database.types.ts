export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          bio: string;
          avatar_url: string;
          location: string;
          website: string;
          favorite_genres: string[];
          writing_goals: any;
          stats: any;
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name: string;
          bio?: string;
          avatar_url?: string;
          location?: string;
          website?: string;
          favorite_genres?: string[];
          writing_goals?: any;
          stats?: any;
          preferences?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          bio?: string;
          avatar_url?: string;
          location?: string;
          website?: string;
          favorite_genres?: string[];
          writing_goals?: any;
          stats?: any;
          preferences?: any;
          updated_at?: string;
        };
      };
      books: {
        Row: {
          id: string;
          author_id: string;
          title: string;
          synopsis: string;
          cover_url: string;
          genre: string;
          tags: string[];
          status: 'draft' | 'beta' | 'published';
          visibility: 'private' | 'public' | 'unlisted';
          settings: any;
          stats: any;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          title: string;
          synopsis?: string;
          cover_url?: string;
          genre: string;
          tags?: string[];
          status?: 'draft' | 'beta' | 'published';
          visibility?: 'private' | 'public' | 'unlisted';
          settings?: any;
          stats?: any;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          synopsis?: string;
          cover_url?: string;
          genre?: string;
          tags?: string[];
          status?: 'draft' | 'beta' | 'published';
          visibility?: 'private' | 'public' | 'unlisted';
          settings?: any;
          stats?: any;
          published_at?: string | null;
          updated_at?: string;
        };
      };
      chapters: {
        Row: {
          id: string;
          book_id: string;
          title: string;
          content: string;
          chapter_number: number;
          word_count: number;
          status: 'draft' | 'beta' | 'published';
          notes: string;
          stats: any;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          title: string;
          content?: string;
          chapter_number: number;
          word_count?: number;
          status?: 'draft' | 'beta' | 'published';
          notes?: string;
          stats?: any;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          content?: string;
          chapter_number?: number;
          word_count?: number;
          status?: 'draft' | 'beta' | 'published';
          notes?: string;
          stats?: any;
          published_at?: string | null;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          target_type: 'book' | 'chapter' | 'comment';
          target_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          target_type: 'book' | 'chapter' | 'comment';
          target_id: string;
          created_at?: string;
        };
        Update: {
          target_type?: 'book' | 'chapter' | 'comment';
          target_id?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          chapter_id: string;
          user_id: string;
          parent_id: string | null;
          content: string;
          position_start: number | null;
          position_end: number | null;
          reactions: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          chapter_id: string;
          user_id: string;
          parent_id?: string | null;
          content: string;
          position_start?: number | null;
          position_end?: number | null;
          reactions?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          reactions?: any;
          updated_at?: string;
        };
      };
      groups: {
        Row: {
          id: string;
          name: string;
          description: string;
          image_url: string;
          category: string;
          settings: any;
          stats: any;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          image_url?: string;
          category: string;
          settings?: any;
          stats?: any;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string;
          image_url?: string;
          category?: string;
          settings?: any;
          stats?: any;
          updated_at?: string;
        };
      };
      challenges: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: 'word_count' | 'chapter_count' | 'daily_writing' | 'flash_fiction';
          rules: any;
          prizes: string[];
          difficulty: 'easy' | 'medium' | 'hard';
          start_date: string;
          end_date: string;
          stats: any;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          type: 'word_count' | 'chapter_count' | 'daily_writing' | 'flash_fiction';
          rules?: any;
          prizes?: string[];
          difficulty?: 'easy' | 'medium' | 'hard';
          start_date: string;
          end_date: string;
          stats?: any;
          created_by: string;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          rules?: any;
          prizes?: string[];
          difficulty?: 'easy' | 'medium' | 'hard';
          start_date?: string;
          end_date?: string;
          stats?: any;
        };
      };
    };
  };
}