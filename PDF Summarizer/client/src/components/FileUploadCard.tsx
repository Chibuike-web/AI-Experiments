import { CancelIcon, FileFormatIcon } from "../Icons";
import { formatFileSize } from "../utils";

type FileUploadCardProps = {
	file: File;
	onClear: () => void;
};

export const FileUploadCard = ({ file, onClear }: FileUploadCardProps) => {
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
