import { createClient } from '@supabase/supabase-js'

    const supabaseUrl = 'https://jozlsnsnruzibeaxfapu.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvemxzbnNucnV6aWJlYXhmYXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTQ3MjQsImV4cCI6MjA1OTY3MDcyNH0.RMFxoGJnhuFDRcnH9VerHFC03UdM1zCFO3lMtvnwgRM'

    export const supabase = createClient(supabaseUrl, supabaseAnonKey)
