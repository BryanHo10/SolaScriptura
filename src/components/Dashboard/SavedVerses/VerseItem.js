import React from 'react';
import { Message, Container } from 'semantic-ui-react';
import './VerseItem.css';

const VerseItem = ({ onRemove, book, chapter, verseNum, verseText }) => {
	return (
		<Container fluid className="pb-2">
			<Message
				header={`${book} ${chapter}:${verseNum}`}
				content={verseText}
				size="big"
			/>
		</Container>
	);
};
export default VerseItem;
