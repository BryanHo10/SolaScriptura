import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import VerseItem from "./VerseItem";
import { getAllVerses, removeVerse } from "../../../api/storage";

const VerseCollection = () => {
	const [savedVerses, setSavedVerses] = useState(getAllVerses());

	const removeSelectedVerse = (book, chapter, { num, text }) => {
		removeVerse(book, chapter, { num, text });
		setSavedVerses(getAllVerses());
	};
	return (
		<Container fluid className="text-left">
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
