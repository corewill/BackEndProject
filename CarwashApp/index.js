const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://hrhviqtzmgmsttkvotvq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyaHZpcXR6bWdtc3R0a3ZvdHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2NjIzNjYsImV4cCI6MTk5MDIzODM2Nn0.AiiB8o314C_rkOdneQk_vwvzxXO4W3lwHN-8-_NKEsA";
const supabase = createClient(supabaseUrl, supabaseKey);

const express = require("express")
const app = express()
const PORT = 3026
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static((__dirname +'public')));

app.get("/login", (req, res) => {
    res.render("pages/login")
})

app.post("/signup", async (req, res) => {
    const {email, password,} = req.body
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if(data){
      res.redirect("login")
      return
    } else {
      res.send("Error signing up")
    }
})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email ,
      password
    })
    if(data){
      res.render("pages/index",{user:data})
      return
    }
  } catch (error) {
      res.status(400).send(error)
  }
})

app.listen(PORT, console.log(`Listening on port ${PORT}`))