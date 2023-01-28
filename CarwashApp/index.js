const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://pyymrehpabqxdbuobtbh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eW1yZWhwYWJxeGRidW9idGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1OTA3MjgsImV4cCI6MTk5MDE2NjcyOH0.GPJW32brXyjktYJiinHapS82d4GVRlSUrv06gx9fBA0";
const supabase = createClient(supabaseUrl, supabaseKey);

const express = require("express")
const app = express()
const PORT = 3026
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.static((__dirname +'/public')));


app.get("/", (req, res) => {
    res.render("pages/index")
})
app.get("/login", (req, res) => {
    res.render("pages/login")
})

app.get("/signup", (req, res) => {
    res.render("pages/signup")
})

app.get("/signin", (req, res) => {
    res.render("pages/login")
})

app.post("/signup", async (req, res) => {
    const {email, password,} = req.body
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if(data){
      res.redirect("pages/login")
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
      res.render("pages/signedin",{user:data})
      return
    }
  } catch (error) {
      res.status(400).send(error)
  }
})

app.post("/Appointments", async (req, res) => {
  const { date, customer_id, package_id } = req.body;
  try {
    const { data, error } = await supabase.from("Appointements").insert([
      {
        date,
        customer_id,
        package_id,
      },
    ]);
    if (data) {
      res.status(200).render("pages/index", { user: data });
      return;
    } else {
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/logout", async (req, res) => {
  const { email, password } = req.body;
  try {
    let { data, error } = await supabase.auth.signOut();
    ({
      email,
      password,
    });
    if (data) {
      res.render("pages/signin", { user: data });
      return;
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/Packages", async (req, res) => {
  const { name, description, Price } = req.body;
  try {
    const { data, error } = await supabase.from("Packages").insert([
      {
        name,
        description,
        Price,
      },
    ]);
    res.json({
      message: " Package Added",
    });
    res.status(200);
    res.render("pages/index", { user: data });
    return;
  } catch (error) {
    res.status(400).send(error);
  }
});



app.listen(PORT, console.log(`Listening on port ${PORT}`))