import { useState, useRef } from "react";
import { CancelIcon, FileFormatIcon, UploadIcon } from "../Icons";
import { formatFileSize } from "../utils";

const maxSizeInBytes = 50 * 1024 * 1024;

export default function Single() {
	const [images, setImages] = useState([]);
	const [noBgImage, setNoBgImage] = useState("");
	const fileInputRef = useRef(null);

	const handleFileChange = (e) => {
		const selectedImage = e.target.files[0];
		if (!selectedImage.type.startsWith("image/")) {
			alert("Please upload an image file.");
			e.target.value = "";
			return;
		}
		const imgUrl = URL.createObjectURL(selectedImage);
		setImages((prev) => [...prev, { file: selectedImage, url: imgUrl }]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (images.length === 0) {
			alert("Please choose a file first.");
			return;
		}

		const formData = new FormData();
		formData.append("image", images[images.length - 1].file);

		try {
			const res = await fetch("http://localhost:3000/remove-bg", {
				method: "POST",
				body: formData,
			});
			if (!res.ok) {
				const err = await res.text();
				throw new Error(err || "Issue fetching image");
			}

			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			setNoBgImage(url);
		} catch (error) {
			console.error("Issue fetching image", error);
		}
	};

	const handleClear = (index) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
	};
	return (
		<main className="grid grid-cols-[350px_1fr] w-full h-screen">
			<aside className="p-6 bg-gray-100 h-full">
				<form onSubmit={handleSubmit} className="flex flex-col">
					<ChooseFileCard handleFileChange={handleFileChange} fileInputRef={fileInputRef} />
					<button type="submit" className="bg-black text-white py-4 my-6">
						Remove Bg
					</button>
				</form>
				<div>
					{images.map((img, index) => (
						<FileUploadCard key={index} file={img.file} onClear={() => handleClear(index)} />
					))}
				</div>
			</aside>
			<aside className="w-full">
				{images.map((image, index) => (
					<ImageContainer key={index} image={image.url} index={index} />
				))}
			</aside>

			{noBgImage && (
				<figure className="w-full max-w-[500px] object-cover">
					<img src={noBgImage} alt="No background preview" className="w-full h-full" />
				</figure>
			)}
		</main>
	);
}

export const ImageContainer = ({ image, index }) => {
	return (
		<figure className="w-full object-cover">
			<img src={image} alt={`Preview ${index}`} className="w-full h-full" />
		</figure>
	);
};

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

const ChooseFileCard = ({ handleFileChange, fileInputRef }) => {
	return (
		<label className="w-full relative block">
			<input type="file" onChange={handleFileChange} ref={fileInputRef} className="hidden" />

			<div className=" border border-gray-200 border-dashed rounded-[12px] w-full flex flex-col items-center p-8 bg-white">
				<UploadIcon />
				<p className="font-medium text-[14px] text-gray-950 mb-[6px] mt-[20px]">Choose a file</p>
				<p className="text-[12px] text-gray-600 mb-[20px]"> JPEG or PNG format, up to 50MB</p>
				<span className="text-gray-600 px-[12px] py-[6px] text-[14px] border border-gray-200 rounded-[8px]">
					Browse File
				</span>
			</div>
		</label>
	);
};
