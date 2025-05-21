import { useState } from "react";
import "./globals.css";
import { UploadIcon } from "./Icons";

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
		<main className="grid grid-cols-[350px_1fr] w-full h-screen">
			<aside className="p-6 bg-gray-200 h-full">
				<form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
					<label className="w-full relative block">
						<input
							type="file"
							accept="application/pdf"
							onChange={(e) => setFile(e.target.files[0])}
							className="hidden"
						/>

						<div className=" border border-[#CACFD8] border-dashed rounded-[8px] w-full flex flex-col items-center p-8 bg-white">
							<UploadIcon />
							<p className="font-medium text-[14px] text-gray-950 mb-[6px] mt-[20px]">
								Choose a file or drag & drop it here.
							</p>
							<p className="text-[12px] text-gray-600 mb-[20px]">JPEG,PNG, and PDF, up to 50MB</p>
							<button className="text-gray-600 px-[12px] py-[6px] text-[14px] border border-gray-200 rounded-[8px]">
								Browse File
							</button>
						</div>
					</label>
					<button type="submit" className="bg-black text-white px-4 py-2 rounded">
						Parse PDF
					</button>
				</form>
			</aside>
			<aside className="p-6">
				<pre className="whitespace-pre-wrap text-sm">{summary}</pre>
				<div>chibuike</div>
			</aside>
		</main>
	);
}
