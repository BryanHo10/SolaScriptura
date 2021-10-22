import React, { useEffect, useState } from 'react';
import { getAllVerses } from 'api/storage';
import { BOOKS } from 'constants/books';
import { Container, Header } from 'semantic-ui-react';
import { isNil } from 'lodash-es';
import { Col, Row } from 'react-bootstrap';

const StatsBoard = () => {
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

	return (
		<Container fluid textAlign="left">
			<Header as="h2">Breakdown ({savedVerses.length})</Header>
			<Row>
				{BOOKS.map(({ name }, i) => (
					<Col lg={3} key={i}>
						<Header
							className="py-2"
							size="medium"
							textAlign="left"
							color={verseStats[name] ? 'blue' : 'grey'}
						>
							[{verseStats[name] || 0}] {name}
						</Header>
					</Col>
				))}
			</Row>
		</Container>
	);
};
export default StatsBoard;
