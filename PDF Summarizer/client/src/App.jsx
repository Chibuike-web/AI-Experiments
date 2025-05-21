import { useState } from "react";
import "./globals.css";
import { CancelIcon, FileFormatIcon, UploadIcon } from "./Icons";

const maxSizeInBytes = 50 * 1024 * 1024;
const formatFileSize = (bytes) => {
	if (bytes >= 1024 * 1024) {
		return (bytes / (1024 * 1024)).toFixed(2) + "MB";
	}

	return (bytes / 1024).toFixed(2) + "KB";
};

export default function App() {
	const [file, setFile] = useState(null);
	const [parsedText, setParsedText] = useState("");
	const [summary, setSummary] = useState("");

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];

		if (!selectedFile || selectedFile.type !== "application/pdf") {
			alert("Please select a valid PDF file.");
			setFile(null);
			return;
		}
		if (selectedFile.size > maxSizeInBytes) {
			alert("File is too large. Maximum allowed size is 50MB.");
			setFile(null);
			return;
		}
		setFile(selectedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
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
			<aside className="p-6 bg-gray-100 h-full">
				<form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
					{file ? (
						<FileUploadCard file={file} onClear={() => setFile(null)} />
					) : (
						<label className="w-full relative block">
							<input
								type="file"
								accept="application/pdf"
								onChange={handleFileChange}
								className="hidden"
							/>

							<div className=" border border-gray-200 border-dashed rounded-[12px] w-full flex flex-col items-center p-8 bg-white">
								<UploadIcon />
								<p className="font-medium text-[14px] text-gray-950 mb-[6px] mt-[20px]">
									Choose a file
								</p>
								<p className="text-[12px] text-gray-600 mb-[20px]"> PDF format, up to 50MB</p>
								<span className="text-gray-600 px-[12px] py-[6px] text-[14px] border border-gray-200 rounded-[8px]">
									Browse File
								</span>
							</div>
						</label>
					)}
					<button type="submit" className="bg-black text-white px-4 py-2 rounded">
						Parse PDF
					</button>
				</form>
			</aside>
			<aside className="p-6">
				<p className="whitespace-pre-wrap text-sm">{summary}</p>
			</aside>
		</main>
	);
}

const FileUploadCard = ({ file, onClear }) => {
	if (!file) return null;

	return (
		<div className="border border-gray-200 rounded-[12px] p-4 bg-white">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-4">
					<FileFormatIcon />
					<div>
						<p className="text-sm font-medium text-gray-800">{file.name}</p>
						<p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
					</div>
				</div>
				<button type="button" onClick={onClear}>
					<CancelIcon />
				</button>
			</div>
		</div>
	);
};
