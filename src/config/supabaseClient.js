import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tieuwxruuneduhuqakyu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZXV3eHJ1dW5lZHVodXFha3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0ODQ5NTMsImV4cCI6MjAyNzA2MDk1M30.Q2QW3RBoui6NRjrv9yZluoqfgl-OZZ2d8_tre04vtyc";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
