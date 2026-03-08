import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/router.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.use("/api", router);

mongoose
	.connect(`${process.env.MONGO_URI}`)
	.then(async () => {
		console.log("mongodb connected succesfully");

		app.listen(PORT, () => {
			console.log(`server started at ${PORT} successfully`);
		});
	})
	.catch((e) => {
		console.log(e);
	});
