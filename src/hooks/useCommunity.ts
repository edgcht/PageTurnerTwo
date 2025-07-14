import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Group = Database['public']['Tables']['groups']['Row'];
type Challenge = Database['public']['Tables']['challenges']['Row'];

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async (filters?: { category?: string; search?: string; limit?: number }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('groups')
        .select(`
          *,
          profiles:created_by (
            username,
            full_name,
            avatar_url
          )
        `);

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      setGroups(data || []);
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching groups:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (groupData: Database['public']['Tables']['groups']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .insert(groupData)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh groups list
      await fetchGroups();
      return { data, error: null };
    } catch (error) {
      console.error('Error creating group:', error);
      return { data: null, error };
    }
  };

  const joinGroup = async (groupId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          user_id: user.id,
          role: 'member'
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error joining group:', error);
      return { data: null, error };
    }
  };

  const leaveGroup = async (groupId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', user.id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error leaving group:', error);
      return { error };
    }
  };

  const checkMembership = async (groupId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { isMember: false, error: null };

      const { data, error } = await supabase
        .from('group_members')
        .select('id')
        .eq('group_id', groupId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { isMember: !!data, error: null };
    } catch (error) {
      console.error('Error checking membership:', error);
      return { isMember: false, error };
    }
  };

  return {
    groups,
    loading,
    fetchGroups,
    createGroup,
    joinGroup,
    leaveGroup,
    checkMembership
  };
};

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChallenges = async (filters?: { 
    type?: string; 
    difficulty?: string; 
    active?: boolean;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('challenges')
        .select(`
          *,
          profiles:created_by (
            username,
            full_name,
            avatar_url
          )
        `);

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }
      if (filters?.active) {
        const now = new Date().toISOString();
        query = query.lte('start_date', now).gte('end_date', now);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      query = query.order('start_date', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      setChallenges(data || []);
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching challenges:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const createChallenge = async (challengeData: Database['public']['Tables']['challenges']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .insert(challengeData)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh challenges list
      await fetchChallenges();
      return { data, error: null };
    } catch (error) {
      console.error('Error creating challenge:', error);
      return { data: null, error };
    }
  };

  const joinChallenge = async (challengeId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('challenge_participants')
        .insert({
          challenge_id: challengeId,
          user_id: user.id,
          progress: {}
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error joining challenge:', error);
      return { data: null, error };
    }
  };

  const updateProgress = async (challengeId: string, progress: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('challenge_participants')
        .update({ progress })
        .eq('challenge_id', challengeId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating progress:', error);
      return { data: null, error };
    }
  };

  return {
    challenges,
    loading,
    fetchChallenges,
    createChallenge,
    joinChallenge,
    updateProgress
  };
};