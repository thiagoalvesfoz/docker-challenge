const express = require("express");
const app = express();
const PORT = 3000;

async function connect() {
  const mysql = require("mysql2/promise");
  
  const connection = await mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fullcycle',
  });
  console.log("LOG INFO - connection to database was opened");
  
  return connection;
}

app.get("/", async (req, res) => {
  console.log(`LOG INFO - new request - method ${req.method} - url: ${req.url} - query ${JSON.stringify(req.query)}`)
  
  const name = req.query.name;
  const clear = req.query.clear;

  if (name) savePeople(name);  
  else if(clear && Number(clear) === 1 || clear === "true") clearTable();
  
  const peoples = await findAllPeoples();
  res.send(toHtml(peoples));
});

async function savePeople(name) {
  const db = await connect();

  const sql = `INSERT INTO people(name) VALUES("${name}")`
  db.query(sql);
  
  console.log(`LOG INFO - ${name} has been inserted into database`)

  db.end();
}

async function findAllPeoples() {
  const db = await connect();
  
  const sql = "SELECT * FROM people";
  const [rows] = await db.query(sql);
  
  console.log("LOG INFO - query find all names in table peoples");

  db.end();
  return rows;
}

async function clearTable() {
  const db = await connect();
  
  const sql = "DELETE FROM people";
  db.query(sql);
  
  console.log("LOG INFO - clear all names in table peoples");
  
  db.end();
}

function processHtmlTable(peoples) {
    
   if(peoples.length === 0) return "<p>No data!</p>";

    return (
       `<table>
         <tr>
	   <th>ID </th>
	   <th>NOME</th>
	 </tr>
	 ${peoples.map(people => (`
	     <tr>
	       <td>${people.id}</td>
	       <td>${people.name}</td>
	     </tr>
	   `)).join("")
	 }
       </table>
      `
    )
}

function toHtml(peoples) {
  const header = "<h1>Full Cycle Rocks!</h1>";
  const tutorial= "<p>Use <code>?name=foo</code> or <code>?clear=true</code> in URL to add or clear names.</p>";
  const table = processHtmlTable(peoples);
  return header + tutorial + table;
}

app.listen(PORT, () => console.log("LOG INFO - server is running on port", PORT));
