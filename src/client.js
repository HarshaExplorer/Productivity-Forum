import { createClient } from '@supabase/supabase-js'

const URL = "https://oexybgndpixfvguqrjrk.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9leHliZ25kcGl4ZnZndXFyanJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2NTY3MDEsImV4cCI6MjAxNTIzMjcwMX0.9yUdbbvoEaWPZDhmoyQfO0l5s9lZhxBTQ5dMkbbOGqA";

export const supabase = createClient(URL, API_KEY);