// app.js — connects your site to Supabase

// 1. Replace with your actual details from Supabase (Settings → API → Project URL + anon public key)
const SUPABASE_URL = "https://lfrjtklkbppihaaiuxef.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmcmp0a2xrYnBwaWhhYWl1eGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNTI5MzMsImV4cCI6MjA3NDYyODkzM30.2FVqnt5daF2Tw-RmVBwOGgt4GuIQQSkG8IUZt30QxIM";

// 2. Create Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Make Supabase available everywhere
window.supabase = supabaseClient;
