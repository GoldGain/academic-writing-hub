const SUPABASE_URL = "https://lfrjtklkbppihaaiuxef.supabase.co"; // your URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmcmp0a2xrYnBwaWhhYWl1eGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNTI5MzMsImV4cCI6MjA3NDYyODkzM30.2FVqnt5daF2Tw-RmVBwOGgt4GuIQQSkG8IUZt30QxIM"; // your anon key

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export to use in other JS files
window.supabase = supabase;



// supabaseClient.js
const SUPABASE_URL = "https://lfrjtklkbppihaaiuxef.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmcmp0a2xrYnBwaWhhYWl1eGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNTI5MzMsImV4cCI6MjA3NDYyODkzM30.2FVqnt5daF2Tw-RmVBwOGgt4GuIQQSkG8IUZt30QxIM";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
