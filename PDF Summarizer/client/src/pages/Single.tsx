import { ChooseFileCard } from "../components/ChooseFileCard";
import { FileUploadCard } from "../components/FileUploadCard";
import { useHandleFile } from "../SingleHooks";

export default function Single() {
	const {
		file,
		isLoading,
		summary,
		parsedText,
		onClear,
		handleFileChange,
		handleParse,
		handleSummarize,
	} = useHandleFile();

	return (
		<main className="grid grid-cols-[350px_1fr] w-full h-screen">
			<aside className="p-6 bg-gray-100 h-full flex flex-col gap-6">
				<form onSubmit={handleParse} className="w-full flex flex-col gap-8">
					<ChooseFileCard handleFileChange={handleFileChange} />

					{!parsedText && (
						<button type="submit" className="bg-black text-white px-4 py-2 rounded">
							{isLoading ? "Parsing..." : "Parse PDF"}
						</button>
					)}

					{parsedText && !summary && (
						<button
							type="button"
							onClick={handleSummarize}
							className="bg-blue-600 text-white px-4 py-2 rounded"
						>
							{isLoading ? "Summarizing..." : "Summarize"}
						</button>
					)}
				</form>
				<div>{file && <FileUploadCard file={file} onClear={onClear} />}</div>
			</aside>
			{summary ||
				(parsedText && (
					<aside className="p-6 flex flex-col gap-6 xl:flex-row items-start ">
						{parsedText && (
							<div className="w-full xl:w-1/2 bg-gray-200 p-4 rounded-md ">
								<h2 className="font-bold text-[2rem] mb-2">Parsed Text</h2>
								<p className="whitespace-pre-wrap text-xl">{parsedText}</p>
							</div>
						)}
						{summary && (
							<div className="w-full xl:w-1/2 bg-gray-200 p-4 rounded-md">
								<h2 className="font-bold text-[2rem] mb-2">Summary</h2>
								<p className="whitespace-pre-wrap text-xl">{summary}</p>
							</div>
						)}
					</aside>
				))}
		</main>
	);
}
