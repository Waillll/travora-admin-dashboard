import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://nmrmfhzmzxixclaicpvv.supabase.co/rest/v1/"
const supabaseKey = "sb_publishable_ul5lCJWUsYqA4qm3MzsgQw_CsB0XJTm"

export const supabase = createClient(supabaseUrl, supabaseKey)
