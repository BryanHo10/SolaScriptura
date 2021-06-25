import React, { useState } from 'react';
import VerseItem from './VerseItem';
import { getAllVerses, removeVerse } from 'api/storage';
import { Container, Header } from 'semantic-ui-react';
import './VerseCollection.css';

const VerseCollection = () => {
	const [savedVerses, setSavedVerses] = useState(getAllVerses());

	const removeSelectedVerse = (book, chapter, { num, text }) => {
		removeVerse(book, chapter, { num, text });
		setSavedVerses(getAllVerses());
	};
	return (
		<Container fluid textAlign="left">
			<Header as="h2">Saved Verses ({savedVerses.length})</Header>
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
