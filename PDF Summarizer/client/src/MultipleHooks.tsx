import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { FileWithId } from "./types";

const MAXSIZEINBYTES = 50 * 1024 * 1024;

export const useHandleMultipleFiles = () => {
	const [files, setFiles] = useState<FileWithId[]>([]);
	const [parsedText, setParsedText] = useState("");
	const [summary, setSummary] = useState("");
	const onClear = (fileId: string) => {
		setFiles((prev) => prev.filter((item) => item.id !== fileId));
		setParsedText("");
		setSummary("");
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files;
		if (!selectedFiles) return;

		const filesArray = Array.from(selectedFiles);

		const isPdfFiles = filesArray.every((file) => file.type === "application/pdf");

		if (!isPdfFiles) {
			alert("Only PDF files are allowed.");
			setFiles([]);
			return;
		}
		const hasTooLargeFile = filesArray.some((file) => file.size > MAXSIZEINBYTES);

		if (hasTooLargeFile) {
			alert("File is too large. Maximum allowed size is 50MB.");
			setFiles([]);
			return;
		}

		const newFiles: FileWithId[] = filesArray.map((file) => ({
			id: uuidv4(),
			content: file,
		}));

		setFiles((prev) => [...prev, ...newFiles]);
	};

	return {
		files,
		onClear,
		handleFileChange,
	};
};
