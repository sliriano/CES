const express = require("express");
const sqlite3 = require('sqlite3').verbose();

const app = express();

const port = 3000;
const hostname = "localhost";

app.use(express.static("public_html"));
app.use(express.json());

let db = new sqlite3.Database('./db/ecodata.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Connected to the ecosystem database.');
});

app.get("/", function (req, res) { 

});

app.post("/mc", function (req, res) {
	let body = req.body;
    let mcData = [];
	let volData = [];
    let date = []
	let name;
	let id = body.ecosystem;
	let sql = `SELECT * FROM ecosystem_stats where id = ?`;
	db.all(sql, [id], function(err, rows) {
		if (err) {
			throw err;
		}
		rows.forEach(element => {
			mcData.push(element.market_cap);
			date.push(element.time);
			volData.push(element.volume_24h);
			name = element.name;
		});
		res.status(200).send({"message": "success", mc:mcData, dates:date, vol: volData, econame: name});
	})
	
});

app.listen(port, hostname, () => {
	console.log(`Listening at: http://${hostname}:${port}`);
});