import { createClient } from '@supabase/supabase-js';
import { Database } from './types/database.types';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  'https://ztvpcmfrdsdkvaqzwxzy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dnBjbWZyZHNka3ZhcXp3eHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3NjMxNTIsImV4cCI6MjAxMDMzOTE1Mn0.YUuvdzDJM5sODnRcW7mAjIHXTW248EPCjiz6UMGGcLI',
);
