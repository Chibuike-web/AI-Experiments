import { ChooseFileCard } from "../components/ChooseFileCard";
import { FileUploadCard } from "../components/FileUploadCard";
import { useHandleMultipleFiles } from "../MultipleHooks";

export default function Multiple() {
	const { files, onClear, handleFileChange } = useHandleMultipleFiles();

	return (
		<main className="grid grid-cols-[350px_1fr] w-full h-screen">
			<aside className="p-6 bg-gray-100 h-full flex flex-col gap-6">
				<form className="w-full flex flex-col gap-8">
					<ChooseFileCard handleFileChange={handleFileChange} />
				</form>
				<div>
					{files?.map((file) => (
						<FileUploadCard key={file.id} file={file.content} onClear={() => onClear(file.id)} />
					))}
				</div>
			</aside>
		</main>
	);
}
