-- Enable RLS on all tables and create policies

-- Content tables: authenticated users can read
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "modules_read" ON modules FOR SELECT TO authenticated USING (true);

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subjects_read" ON subjects FOR SELECT TO authenticated USING (true);

ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lectures_read" ON lectures FOR SELECT TO authenticated USING (true);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notes_read" ON notes FOR SELECT TO authenticated USING (true);

ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "flashcards_read" ON flashcards FOR SELECT TO authenticated USING (true);

ALTER TABLE mcqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mcqs_read" ON mcqs FOR SELECT TO authenticated USING (true);

ALTER TABLE written_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "written_questions_read" ON written_questions FOR SELECT TO authenticated USING (true);

ALTER TABLE diagrams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "diagrams_read" ON diagrams FOR SELECT TO authenticated USING (true);

ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "youtube_videos_read" ON youtube_videos FOR SELECT TO authenticated USING (true);

ALTER TABLE slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "slides_read" ON slides FOR SELECT TO authenticated USING (true);

-- User tables: users can only access their own data
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON profiles FOR DELETE USING (auth.uid() = id);

ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "study_sessions_select" ON study_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "study_sessions_insert" ON study_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "study_sessions_delete" ON study_sessions FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE flashcard_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "flashcard_progress_select" ON flashcard_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "flashcard_progress_insert" ON flashcard_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "flashcard_progress_update" ON flashcard_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "flashcard_progress_delete" ON flashcard_progress FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE mcq_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mcq_attempts_select" ON mcq_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mcq_attempts_insert" ON mcq_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE written_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "written_attempts_select" ON written_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "written_attempts_insert" ON written_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "test_sessions_select" ON test_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "test_sessions_insert" ON test_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "test_sessions_update" ON test_sessions FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE test_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "test_answers_select" ON test_answers FOR SELECT USING (
  EXISTS (SELECT 1 FROM test_sessions WHERE test_sessions.id = test_answers.test_session_id AND test_sessions.user_id = auth.uid())
);
CREATE POLICY "test_answers_insert" ON test_answers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM test_sessions WHERE test_sessions.id = test_answers.test_session_id AND test_sessions.user_id = auth.uid())
);

ALTER TABLE user_notes_annotations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_notes_annotations_select" ON user_notes_annotations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_notes_annotations_insert" ON user_notes_annotations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_notes_annotations_update" ON user_notes_annotations FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tasks_select" ON tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "tasks_insert" ON tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tasks_update" ON tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "tasks_delete" ON tasks FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE weak_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "weak_topics_select" ON weak_topics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "weak_topics_insert" ON weak_topics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "weak_topics_update" ON weak_topics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "weak_topics_delete" ON weak_topics FOR DELETE USING (auth.uid() = user_id);
