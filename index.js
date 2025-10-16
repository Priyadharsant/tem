import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let count = 0;
let verified = false;
const secret_key = "1607";
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({extended : true}));


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname ,"verification.html"))
})


app.post("/reg", (req, res) => {
  if(!req.body){
      res.send("<h1>Unauthorized, access denied!</h1><a href='/'>Verify now</a>") 
  }
  else{
  const {key}  = req.body;
  if(key==secret_key){
      verified = true;
      res.sendFile(path.join(__dirname, "home.html"));
    }
    else{
        verified = false;
        res.send("<h1>Incorrect Password! </h1><a href='/'>Verify again</a>")
    }
    }
});
app.post("/register", (req, res) => {
    if(!verified)
    {
        res.send("<h1>Not verified! </h1><a href='/'>Verify now</a>")
    }
    count++;
  const { name, year, branch } = req.body;
  console.log(`👤Student ${count}:\nName : ${name}\nYear : ${year}\nBranch : ${branch}\n \n`);
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registered</title>
    <style>
        body{
            background : hsl(120 100% 5%);
            color: hsl(120 100% 95%);
            font-size:3vw;
            display: flex;
            flex-direction: column ;
            align-items: center ;
        }
        a{
            text-decoration: none ;
        }
        button{
            width : 200px;
            height: 100px;
            background: #404eff;
            font-weight: bolder;
            border-radius : 20px;
            box-shadow: 0 0 20px #404eff;
            color : white ;
            font-size: larger;
        }
    </style>
</head>
<body>
    <h1>🎉Successfully registered
    <p>${name} from ${year} Year ${branch}</p> 
    </h1>
    <a href="/">
        <button>Home</button>
    </a>
</body>
</html>`)
});
app.listen(8000, () => {
  console.log("✅ App running localhost");
});