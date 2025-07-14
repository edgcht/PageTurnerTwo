import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Book = Database['public']['Tables']['books']['Row'];
type Chapter = Database['public']['Tables']['chapters']['Row'];

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (filters?: { 
    author_id?: string; 
    status?: string; 
    visibility?: string;
    search?: string;
    genre?: string;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('books')
        .select(`
          *,
          profiles:author_id (
            username,
            full_name,
            avatar_url
          )
        `);

      if (filters?.author_id) {
        query = query.eq('author_id', filters.author_id);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.visibility) {
        query = query.eq('visibility', filters.visibility);
      }
      if (filters?.genre) {
        query = query.eq('genre', filters.genre);
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,synopsis.ilike.%${filters.search}%`);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      query = query.order('updated_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      setBooks(data || []);
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching books:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const createBook = async (bookData: Database['public']['Tables']['books']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .insert(bookData)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh books list
      await fetchBooks();
      return { data, error: null };
    } catch (error) {
      console.error('Error creating book:', error);
      return { data: null, error };
    }
  };

  const updateBook = async (id: string, updates: Database['public']['Tables']['books']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Update local state
      setBooks(prev => prev.map(book => book.id === id ? data : book));
      return { data, error: null };
    } catch (error) {
      console.error('Error updating book:', error);
      return { data: null, error };
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setBooks(prev => prev.filter(book => book.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting book:', error);
      return { error };
    }
  };

  const getBook = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select(`
          *,
          profiles:author_id (
            username,
            full_name,
            avatar_url,
            bio
          ),
          chapters (
            id,
            title,
            chapter_number,
            word_count,
            status,
            published_at,
            created_at,
            stats
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching book:', error);
      return { data: null, error };
    }
  };

  return {
    books,
    loading,
    fetchBooks,
    createBook,
    updateBook,
    deleteBook,
    getBook
  };
};

export const useChapters = (bookId?: string) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChapters = async (id?: string) => {
    if (!id && !bookId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('book_id', id || bookId!)
        .order('chapter_number', { ascending: true });

      if (error) throw error;
      setChapters(data || []);
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching chapters:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const createChapter = async (chapterData: Database['public']['Tables']['chapters']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .insert(chapterData)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh chapters list
      await fetchChapters();
      return { data, error: null };
    } catch (error) {
      console.error('Error creating chapter:', error);
      return { data: null, error };
    }
  };

  const updateChapter = async (id: string, updates: Database['public']['Tables']['chapters']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Update local state
      setChapters(prev => prev.map(chapter => chapter.id === id ? data : chapter));
      return { data, error: null };
    } catch (error) {
      console.error('Error updating chapter:', error);
      return { data: null, error };
    }
  };

  const deleteChapter = async (id: string) => {
    try {
      const { error } = await supabase
        .from('chapters')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setChapters(prev => prev.filter(chapter => chapter.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting chapter:', error);
      return { error };
    }
  };

  const getChapter = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .select(`
          *,
          books (
            title,
            author_id,
            profiles:author_id (
              username,
              full_name,
              avatar_url
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching chapter:', error);
      return { data: null, error };
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchChapters();
    }
  }, [bookId]);

  return {
    chapters,
    loading,
    fetchChapters,
    createChapter,
    updateChapter,
    deleteChapter,
    getChapter
  };
};