import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject_id: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration_minutes: number;
  total_questions: number;
  class_level: number;
  subjects: {
    name: string;
    icon?: string;
    color?: string;
  };
}

export function useQuizzes() {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          *,
          subjects (
            name,
            icon,
            color
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
      }

      return data as Quiz[];
    }
  });
}

export function useQuizAttempts(userId?: string) {
  return useQuery({
    queryKey: ['quiz-attempts', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (error) {
        console.error('Error fetching quiz attempts:', error);
        throw error;
      }

      return data;
    },
    enabled: !!userId
  });
}