import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Like = Database['public']['Tables']['likes']['Row'];
type Comment = Database['public']['Tables']['comments']['Row'];

export const useLikes = () => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleLike = async (targetType: 'book' | 'chapter' | 'comment', targetId: string) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if like exists
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('target_type', targetType)
        .eq('target_id', targetId)
        .single();

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('id', existingLike.id);
        
        if (error) throw error;
        return { liked: false, error: null };
      } else {
        // Like
        const { data, error } = await supabase
          .from('likes')
          .insert({
            user_id: user.id,
            target_type: targetType,
            target_id: targetId
          })
          .select()
          .single();

        if (error) throw error;
        return { liked: true, error: null };
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      return { liked: false, error };
    } finally {
      setLoading(false);
    }
  };

  const getLikes = async (targetType: 'book' | 'chapter' | 'comment', targetId: string) => {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('target_type', targetType)
        .eq('target_id', targetId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error fetching likes:', error);
      return { data: [], error };
    }
  };

  const checkUserLike = async (targetType: 'book' | 'chapter' | 'comment', targetId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { liked: false, error: null };

      const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('target_type', targetType)
        .eq('target_id', targetId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { liked: !!data, error: null };
    } catch (error) {
      console.error('Error checking user like:', error);
      return { liked: false, error };
    }
  };

  return {
    likes,
    loading,
    toggleLike,
    getLikes,
    checkUserLike
  };
};

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async (chapterId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('chapter_id', chapterId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error fetching comments:', error);
      return { data: [], error };
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (commentData: Database['public']['Tables']['comments']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert(commentData)
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;
      
      // Add to local state
      setComments(prev => [...prev, data]);
      return { data, error: null };
    } catch (error) {
      console.error('Error creating comment:', error);
      return { data: null, error };
    }
  };

  const updateComment = async (id: string, updates: Database['public']['Tables']['comments']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;
      
      // Update local state
      setComments(prev => prev.map(comment => comment.id === id ? data : comment));
      return { data, error: null };
    } catch (error) {
      console.error('Error updating comment:', error);
      return { data: null, error };
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setComments(prev => prev.filter(comment => comment.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting comment:', error);
      return { error };
    }
  };

  return {
    comments,
    loading,
    fetchComments,
    createComment,
    updateComment,
    deleteComment
  };
};