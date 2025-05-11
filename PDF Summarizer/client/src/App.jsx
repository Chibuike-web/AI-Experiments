import { useState } from "react";
import "./globals.css";

export default function App() {
	const [file, setFile] = useState(null);
	const [parsedText, setParsedText] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			alert("Please select a PDF file.");
			return;
		}

		const formData = new FormData();
		formData.append("pdf", file);

		try {
			const response = await fetch("http://localhost:5000/parse-pdf", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();
			console.log("Parsed Data:", result);
			setParsedText(result.text);
		} catch (error) {
			console.error("Error uploading the file:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-[250px] space-y-4">
			<label className="w-full">
				<input
					type="file"
					accept="application/pdf"
					onChange={(e) => setFile(e.target.files[0])}
					className="border p-4 w-full"
				/>
			</label>
			<button type="submit" className="bg-black text-white px-4 py-2 rounded">
				Parse PDF
			</button>
			<pre className="whitespace-pre-wrap text-sm">{parsedText}</pre>
		</form>
	);
}
