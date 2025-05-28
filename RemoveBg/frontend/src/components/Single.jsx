import { useState, useRef } from "react";

export default function Single() {
	const [images, setImages] = useState([]);
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
	return (
		<div>
			<label>
				<input type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
			</label>

			{images.map((image, index) => (
				<ImageContainer key={index} image={image} index={index} />
			))}
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
