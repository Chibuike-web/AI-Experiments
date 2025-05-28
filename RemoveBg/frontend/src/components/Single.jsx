import { useState, useRef } from "react";

export default function Single() {
	const [images, setImages] = useState([]);
	const [noBgImage, setNoBgImage] = useState("");
	const fileInputRef = useRef(null);

	const handleFileChange = (e) => {
		const selectedImage = e.target.files[0];
		if (!selectedImage.type.startsWith("image/")) {
			alert("Please upload an image file.");
			fileInputRef.current.value = "";
			return;
		}
		const imgUrl = URL.createObjectURL(selectedImage);
		setImages((prev) => [...prev, imgUrl]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const file = fileInputRef.current.files[0];

		if (!file) {
			alert("Please choose a file first.");
			return;
		}

		const formData = new FormData();
		formData.append("image", file);

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

	return (
		<div className="mb-[50%]">
			<form onSubmit={handleSubmit} className="flex flex-col">
				<label>
					<input type="file" onChange={handleFileChange} ref={fileInputRef} />
				</label>
				<button type="submit" className="bg-black text-white py-4 my-6">
					Remove Bg
				</button>
			</form>

			{images.map((image, index) => (
				<ImageContainer key={index} image={image} index={index} />
			))}

			{noBgImage && (
				<figure className="w-full max-w-[500px] object-cover">
					<img src={noBgImage} alt="No background preview" className="w-full h-full" />
				</figure>
			)}
		</div>
	);
}

export const ImageContainer = ({ image, index }) => {
	return (
		<figure className="w-full max-w-[500px] object-cover">
			<img src={image} alt={`Preview ${index}`} className="w-full h-full" />
		</figure>
	);
};
