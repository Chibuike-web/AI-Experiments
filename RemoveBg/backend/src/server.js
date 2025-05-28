import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });
const REMOVE_BG_KEY = process.env.REMOVE_BG_APIKEY;

app.post("/remove-bg", upload.single("image"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).send("No file uploaded.");
		}

		const imagePath = path.resolve(req.file.path);
		console.log("Image uploaded:", imagePath);

		const imageBuffer = fs.readFileSync(imagePath);
		const blob = new Blob([imageBuffer], { type: req.file.mimetype });

		const formData = new FormData();
		formData.append("size", "auto");
		formData.append("image_file", blob, req.file.originalname);

		const response = await fetch("https://api.remove.bg/v1.0/removebg", {
			method: "POST",
			headers: {
				"X-Api-Key": REMOVE_BG_KEY,
			},
			body: formData,
		});

		fs.unlinkSync(imagePath);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Remove.bg Error:", errorText);
			return res.status(500).send(errorText);
		}

		const buffer = await response.arrayBuffer();
		res.set("Content-Type", "image/png");
		res.send(Buffer.from(buffer));
	} catch (err) {
		console.error("Server error:", err);
		res.status(500).send("Unexpected server error");
	}
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
