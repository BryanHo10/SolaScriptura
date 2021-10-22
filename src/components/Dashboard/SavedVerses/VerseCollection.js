import React, { useEffect, useState } from 'react';
import VerseItem from './VerseItem';
import { getAllVerses, removeVerse } from 'api/storage';
import { Container, Header } from 'semantic-ui-react';
import './VerseCollection.css';
import { isNil } from 'lodash-es';
import { Row, Col } from 'react-bootstrap';

const VerseCollection = () => {
	const [savedVerses, setSavedVerses] = useState(getAllVerses());
	const [verseStats, setVerseStats] = useState({});

	useEffect(() => {
		const stats = {};
		savedVerses.forEach(({ book }) => {
			if (isNil(stats[book])) stats[book] = 0;
			stats[book] += 1;
		});
		setVerseStats(stats);
	}, [savedVerses]);

	const removeSelectedVerse = (book, chapter, { num, text }) => {
		removeVerse(book, chapter, { num, text });
		setSavedVerses(getAllVerses());
	};

	return (
		<Container fluid textAlign="left">
			<Header as="h2">Saved Verses ({savedVerses.length})</Header>
			<Container fluid>
				<Row>
					{Object.keys(verseStats).map((book, i) => (
						<Col lg={3} key={i}>
							<Header
								className="py-2"
								size="large"
								textAlign="left"
								color={'blue'}
							>
								{book}
							</Header>
						</Col>
					))}
				</Row>
			</Container>
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
