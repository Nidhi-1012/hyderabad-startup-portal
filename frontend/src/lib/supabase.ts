import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xegqzhcarktskuxnlljm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlZ3F6aGNhcmt0c2t1eG5sbGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MjAxMjgsImV4cCI6MjA5MTQ5NjEyOH0.tFnKBB21pi6_THO3YShNYGcKxk4dnNwpIbaBcj79ZdY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
