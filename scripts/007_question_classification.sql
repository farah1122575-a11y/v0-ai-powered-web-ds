-- Question classification: per-user status for each MCQ and written question
-- Status: new, correct, incorrect, flagged

CREATE TABLE IF NOT EXISTS question_classification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'written')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'correct', 'incorrect', 'flagged')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, question_id, question_type)
);

CREATE INDEX IF NOT EXISTS idx_question_classification_user ON question_classification(user_id);
CREATE INDEX IF NOT EXISTS idx_question_classification_question ON question_classification(question_id);

-- RLS
ALTER TABLE question_classification ENABLE ROW LEVEL SECURITY;
CREATE POLICY "qc_select" ON question_classification FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "qc_insert" ON question_classification FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "qc_update" ON question_classification FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "qc_delete" ON question_classification FOR DELETE USING (auth.uid() = user_id);

-- Add lecture_completion tracking
CREATE TABLE IF NOT EXISTS lecture_completion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lecture_id UUID NOT NULL REFERENCES lectures(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, lecture_id)
);

ALTER TABLE lecture_completion ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lc_select" ON lecture_completion FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "lc_insert" ON lecture_completion FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "lc_update" ON lecture_completion FOR UPDATE USING (auth.uid() = user_id);
