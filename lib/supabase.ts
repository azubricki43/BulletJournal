
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'not found';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || 'not found';

export const supabase = createClient(supabaseUrl, supabaseSecretKey);