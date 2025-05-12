import { useState } from "react";
import "./globals.css";

export default function App() {
	const [file, setFile] = useState(null);
	const [parsedText, setParsedText] = useState("");
	const [summary, setSummary] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			alert("Please select a PDF file.");
			return;
		}

		const formData = new FormData();
		formData.append("pdf", file);
		let result;

		try {
			const response = await fetch("http://localhost:5000/parse-pdf", {
				method: "POST",
				body: formData,
			});

			result = await response.json();
			setParsedText(result.text);
		} catch (error) {
			console.error("Error uploading the file:", error);
		}

		try {
			const res = await fetch("http://localhost:5000/summarize", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: result.text }),
			});

			if (!res.ok) {
				throw new Error("Issue fetching summary");
			}

			const data = await res.json();
			setSummary(data.summary);
		} catch (error) {
			console.error(error.message);
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
			<pre className="whitespace-pre-wrap text-sm">{summary}</pre>
		</form>
	);
}
