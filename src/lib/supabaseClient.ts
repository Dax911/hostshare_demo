import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const envVariables = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_KEY: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof envVariables> {}
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const supabaseClient = createClient(supabaseUrl, supabaseKey)
export default supabaseClient