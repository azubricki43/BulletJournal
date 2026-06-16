import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'not found';
console.log(supabaseUrl)
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'not found';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);