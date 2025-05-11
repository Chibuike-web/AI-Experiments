import express from "express";
import fileUpload from "express-fileupload";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5000;

app.use(fileUpload());

app.post("/parse-pdf", async (req, res) => {
	const pdfFile = req.files?.pdf;
	if (!pdfFile) {
		return res.status(400).json({ error: "No file uploaded" });
	}

	try {
		// <-- use pdfFile.data, not file.data
		const data = await pdfParse(pdfFile.data);
		res.json({ text: data.text });
	} catch (error) {
		console.error("PDF parse error:", error);
		res.status(500).json({ error: "Failed to parse PDF" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
