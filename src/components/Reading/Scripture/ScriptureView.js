import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import { last, head, isInteger } from "lodash";
import { useHistory } from "react-router-dom";
import { getPassageText } from "../../../api/scripture";
import { parseTextResponse, getBookData } from "../../../utils/parse";
import LoadingView from "../../Common/Loading";
import "./ScriptureView.css";
import NavigationView from "../../Common/Navigation";
import { BOOKS } from "../../../constants/books";

const ScriptureView = ({ bookId, chapterId }) => {
	const [scriptureComponent, setScriptureComponent] = useState([]);
	const [loadingState, setLoadingState] = useState(false);

	const history = useHistory();

	useEffect(() => {
		setLoadingState(true);
		const config = {
			passage: `${bookId} ${chapterId}`,
			includeFootnotes: false,
			includeFootnoteBody: false,
			includeHeadings: false,
		};
		getPassageText(config).then((data) => {
			const passage = parseTextResponse(data);
			setScriptureComponent(passage);
			setLoadingState(false);
		});
	}, [bookId, chapterId]);

	const goToNextChapter = () => {
		const bookInfo = getBookData(bookId);

		let nextBookId = bookInfo.name;
		let nextChapterId;

		if (chapterId === bookInfo.meta.total_chapters) {
			if (bookInfo.name !== last(BOOKS).name) {
				nextBookId = BOOKS[bookInfo.id + 1].name;
			}
			nextChapterId = 1;
		} else {
			nextChapterId = parseInt(chapterId) + 1;
		}

		history.push(`/bible/${nextBookId}/${nextChapterId}`);
	};
	const goToPrevChapter = () => {
		const bookInfo = getBookData(bookId);

		let prevBookId = bookInfo.name;
		let prevChapterId;

		if (chapterId === 1) {
			if (bookInfo.name !== head(BOOKS).name) {
				prevBookId = BOOKS[bookInfo.id - 1].name;
			}
			prevChapterId = 1;
		} else {
			prevChapterId = parseInt(chapterId) - 1;
		}

		history.push(`/bible/${prevBookId}/${prevChapterId}`);
	};

	return (
		<Container>
			<Row className="scripture-view">
				<h3>
					{bookId} {chapterId}
				</h3>
				{loadingState ? (
					<LoadingView label="Loading Text..." />
				) : (
					<div className="scripture-body">
						{scriptureComponent.map((verse, index) => (
							<span className="verse-body" key={`verse_${index}`}>
								<span className="verse-num">{verse.num}</span>{" "}
								<span className="verse-text">{verse.text}</span>
							</span>
						))}
						<span>(ESV)</span>
					</div>
				)}
			</Row>
			<NavigationView
				onNextClick={goToNextChapter}
				onPreviousClick={goToPrevChapter}
				hideNext={
					bookId === last(BOOKS).name &&
					chapterId === String(last(BOOKS).meta.total_chapters)
				}
				hidePrevious={bookId === head(BOOKS).name && chapterId === String(1)}
			/>
		</Container>
	);
};
ScriptureView.propTypes = {};
export default ScriptureView;
