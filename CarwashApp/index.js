const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://pyymrehpabqxdbuobtbh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eW1yZWhwYWJxeGRidW9idGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1OTA3MjgsImV4cCI6MTk5MDE2NjcyOH0.GPJW32brXyjktYJiinHapS82d4GVRlSUrv06gx9fBA0";
const supabase = createClient(supabaseUrl, supabaseKey);

const express = require("express")
const app = express()
const PORT = 3026
// const bcrypt = require("bcrypt")
// const session = require("express-session")
// const cookieParser = require("cookie-parser")
// const bodyParser = require("body-parser");


app.use(express.json())

// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// )

// app.use(bodyParser.json())
// app.use(cookieParser())
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialize: true,
//     cookie: {
//         secure: false,
//         maxAge: 2592000000
//     }
// }))
app.set("view engine", "ejs")

app.get("/login", (req, res) => {
    res.render("pages/login")
})
app.post("/login", async (req, res) => {
    const {userName, passWord,firstName,lastName} = req.body
    console.log(req.body)
  console.log("route triggered")
    const { data, error } = await supabase
    .from('Members')
    .insert([
      { userName, firstName, lastName, passWord },
    ])
  console.log(error)
    res.send(data)
})

app.listen(PORT, console.log(`Listening on port ${PORT}`))