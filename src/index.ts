import express from "express";
import { join } from "path";
import { cwd } from "process";

const app = express();

app.use((req, res) => {
	const path = req.path === "/" ? "/index.html" : req.path;

	res.sendFile(join(cwd(), path));
	console.log(path);
});
app.listen(3000, () => console.log("Ready at http://localhost:3000"));
