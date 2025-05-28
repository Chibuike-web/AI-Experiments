import { useRef, useState } from "react";
import "./globals.css";
import Single from "./components/Single";
import Multiple from "./components/Multiple";

export default function App() {
	return (
		<section>
			<Single />
			<Multiple />
		</section>
	);
}
