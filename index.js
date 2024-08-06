
import express from "express";
import { format } from "date-fns";
import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { it } from "date-fns/locale";


const app = express();
const PORT = 4000;

const fileName = fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);
const directoryPath = path.join(directoryName, "TimeStamp");


app.use(express.json());


app.get("/", (req, res) => { res
    .status(200)
    .send();
});


let filelocation;
app.get("/create", (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy-hh-mm-ss");
  console.log(today);
  filelocation = `TimeStamp/${today}.txt`;
  fs.writeFileSync(filelocation, `${today}`, "utf-8");
  res.status(200).send(`${today}`);
});


app.get("/read", (req, res) => {
  let txtFile = [];
  fs.readdir(directoryPath, (err, files) => {
    files.forEach((element) => {
      txtFile.push(element);
    });
    res.status(200).send(`${txtFile.join("<br><br>")}`);
  });
});


app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});