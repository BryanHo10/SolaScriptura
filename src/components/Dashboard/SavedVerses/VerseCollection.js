import React, { useState } from "react";
import { Container } from "react-bootstrap";
import VerseItem from "./VerseItem";
import { getAllVerses, removeVerse } from "../../../api/storage";
import "./VerseCollection.css";

const VerseCollection = () => {
	const [savedVerses, setSavedVerses] = useState(getAllVerses());

	const removeSelectedVerse = (book, chapter, { num, text }) => {
		removeVerse(book, chapter, { num, text });
		setSavedVerses(getAllVerses());
	};
	console.log(savedVerses);
	return (
		<Container fluid className="verse-collection">
			<h2>Saved Verses ({savedVerses.length})</h2>
			{savedVerses.map((verseData, index) => (
				<VerseItem
					onRemove={removeSelectedVerse}
					key={`verse_${index}`}
					{...verseData}
				/>
			))}
		</Container>
	);
};
export default VerseCollection;
