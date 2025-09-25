-- Create subjects table
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quizzes table
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  total_questions INTEGER NOT NULL DEFAULT 0,
  class_level INTEGER NOT NULL CHECK (class_level >= 6 AND class_level <= 12),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz questions table
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of options
  correct_answer INTEGER NOT NULL, -- Index of correct option (0-3)
  explanation TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz attempts table
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL,
  time_taken_seconds INTEGER,
  answers JSONB, -- Store user answers
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create games table
CREATE TABLE public.games (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'memory', 'drag-drop', 'flashcard', etc.
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  class_level INTEGER NOT NULL CHECK (class_level >= 6 AND class_level <= 12),
  game_data JSONB, -- Store game-specific configuration
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create game scores table
CREATE TABLE public.game_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  level_reached INTEGER,
  time_taken_seconds INTEGER,
  game_data JSONB, -- Store game-specific results
  played_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resources table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('pdf', 'video', 'document', 'link')),
  file_url TEXT,
  file_size BIGINT,
  class_level INTEGER NOT NULL CHECK (class_level >= 6 AND class_level <= 12),
  download_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subjects (public read)
CREATE POLICY "Anyone can view subjects" ON public.subjects
FOR SELECT USING (true);

-- Create RLS policies for quizzes (public read)
CREATE POLICY "Anyone can view active quizzes" ON public.quizzes
FOR SELECT USING (is_active = true);

-- Create RLS policies for quiz questions (public read)
CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.quizzes 
    WHERE quizzes.id = quiz_questions.quiz_id 
    AND quizzes.is_active = true
  )
);

-- Create RLS policies for quiz attempts
CREATE POLICY "Users can view their own quiz attempts" ON public.quiz_attempts
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts" ON public.quiz_attempts
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for games (public read)
CREATE POLICY "Anyone can view active games" ON public.games
FOR SELECT USING (is_active = true);

-- Create RLS policies for game scores
CREATE POLICY "Users can view their own game scores" ON public.game_scores
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own game scores" ON public.game_scores
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for resources (public read)
CREATE POLICY "Anyone can view active resources" ON public.resources
FOR SELECT USING (is_active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_quizzes_updated_at
  BEFORE UPDATE ON public.quizzes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample subjects
INSERT INTO public.subjects (name, description, icon, color) VALUES
('Mathematics', 'Numbers, algebra, geometry and calculus', 'Calculator', 'hsl(221, 83%, 53%)'),
('Science', 'Physics, chemistry and biology concepts', 'Microscope', 'hsl(142, 71%, 45%)'),
('English', 'Grammar, literature and writing skills', 'BookOpen', 'hsl(262, 83%, 58%)'),
('History', 'World history and historical events', 'Scroll', 'hsl(25, 95%, 53%)'),
('Geography', 'Earth science and world geography', 'Globe', 'hsl(199, 89%, 48%)');

-- Insert sample quizzes
INSERT INTO public.quizzes (title, description, subject_id, difficulty, duration_minutes, total_questions, class_level) 
SELECT 
  'Advanced Mathematics',
  'Test your knowledge of calculus, algebra, and geometry',
  s.id,
  'Hard',
  30,
  20,
  12
FROM public.subjects s WHERE s.name = 'Mathematics';

INSERT INTO public.quizzes (title, description, subject_id, difficulty, duration_minutes, total_questions, class_level)
SELECT 
  'Physics Fundamentals',
  'Mechanics, thermodynamics, and wave properties',
  s.id,
  'Medium',
  25,
  15,
  11
FROM public.subjects s WHERE s.name = 'Science';

INSERT INTO public.quizzes (title, description, subject_id, difficulty, duration_minutes, total_questions, class_level)
SELECT 
  'Chemistry Basics',
  'Atomic structure, chemical bonding, and reactions',
  s.id,
  'Easy',
  35,
  18,
  10
FROM public.subjects s WHERE s.name = 'Science';

INSERT INTO public.quizzes (title, description, subject_id, difficulty, duration_minutes, total_questions, class_level)
SELECT 
  'English Literature',
  'Poetry analysis, prose comprehension, and grammar',
  s.id,
  'Medium',
  20,
  12,
  10
FROM public.subjects s WHERE s.name = 'English';

-- Add sample quiz questions for Advanced Mathematics
INSERT INTO public.quiz_questions (quiz_id, question, options, correct_answer, explanation, order_index)
SELECT 
  q.id,
  'What is the derivative of x²?',
  '["x", "2x", "x³", "2x²"]'::jsonb,
  1,
  'The derivative of x² is 2x according to the power rule',
  1
FROM public.quizzes q WHERE q.title = 'Advanced Mathematics';

INSERT INTO public.quiz_questions (quiz_id, question, options, correct_answer, explanation, order_index)
SELECT 
  q.id,
  'Solve: 2x + 5 = 15',
  '["x = 5", "x = 10", "x = 7.5", "x = 20"]'::jsonb,
  0,
  '2x + 5 = 15, so 2x = 10, therefore x = 5',
  2
FROM public.quizzes q WHERE q.title = 'Advanced Mathematics';

-- Add sample games
INSERT INTO public.games (title, description, type, subject_id, difficulty, class_level, game_data)
SELECT 
  'Math Memory Cards',
  'Match mathematical equations with their solutions',
  'memory',
  s.id,
  'Easy',
  8,
  '{"cards": [{"equation": "2+2", "answer": "4"}, {"equation": "3×4", "answer": "12"}]}'::jsonb
FROM public.subjects s WHERE s.name = 'Mathematics';

INSERT INTO public.games (title, description, type, subject_id, difficulty, class_level, game_data)
SELECT 
  'Science Lab Simulator',
  'Drag and drop elements to complete experiments',
  'drag-drop',
  s.id,
  'Medium',
  10,
  '{"experiments": ["chemical_reactions", "physics_mechanics"]}'::jsonb
FROM public.subjects s WHERE s.name = 'Science';

-- Add sample resources
INSERT INTO public.resources (title, description, subject_id, resource_type, file_url, class_level)
SELECT 
  'Advanced Calculus Guide',
  'Comprehensive guide to differential and integral calculus',
  s.id,
  'pdf',
  'https://example.com/calculus-guide.pdf',
  12
FROM public.subjects s WHERE s.name = 'Mathematics';

INSERT INTO public.resources (title, description, subject_id, resource_type, file_url, class_level)
SELECT 
  'Physics Formula Sheet',
  'Essential physics formulas for mechanics and thermodynamics',
  s.id,
  'pdf',
  'https://example.com/physics-formulas.pdf',
  11
FROM public.subjects s WHERE s.name = 'Science';

-- Update quiz total_questions count
UPDATE public.quizzes 
SET total_questions = (
  SELECT COUNT(*) 
  FROM public.quiz_questions 
  WHERE quiz_questions.quiz_id = quizzes.id
);