import { createClient } from '@supabase/supabase-js'

    const supabaseUrl = 'https://wlonzbzmltroejjvccts.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsb256YnptbHRyb2VqanZjY3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwODA2MTEsImV4cCI6MjA1OTY1NjYxMX0.RkiyWxdCeHldtTG_g4LpdMZtsAVbAEZnkSc-9RyfwnI'

    export const supabase = createClient(supabaseUrl, supabaseAnonKey)
