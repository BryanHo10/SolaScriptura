import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import { last, head } from "lodash";
import { useHistory } from "react-router-dom";
import { getPassageText } from "../../../api/scripture";
import { parseTextResponse, getBookData } from "../../../utils/parse";
import LoadingView from "../../Common/Loading";
import "./ScriptureView.css";
import NavigationView from "../../Common/Navigation";
import ErrorView from "../../Common/Error";
import { BOOKS } from "../../../constants/books";
import { STORAGE_META } from "../../../constants/keys";

const ScriptureView = ({ bookId, chapterId }) => {
	const [scriptureComponent, setScriptureComponent] = useState([]);
	const [loadingState, setLoadingState] = useState(false);
	const [failureState, setFailureState] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

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
			if (data.detail) {
				setErrorMessage(data.detail);
				setFailureState(true);
			} else {
				const passage = parseTextResponse(data);
				setScriptureComponent(passage);

				// Save State
				persistState({ book: bookId, chapter: chapterId });
				setLoadingState(false);
			}
		});
	}, [bookId, chapterId]);
	const persistState = ({ book, chapter }) => {
		localStorage.setItem(STORAGE_META.LATEST_BOOK_ID, book);
		localStorage.setItem(STORAGE_META.LATEST_CHAP_ID, chapter);
	};
	const goToNextChapter = () => {
		const bookInfo = getBookData(bookId);

		let nextBookId = bookInfo.name;
		let nextChapterId;

		if (chapterId === String(bookInfo.meta.total_chapters)) {
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

		if (chapterId === String(1)) {
			if (bookInfo.name !== head(BOOKS).name) {
				prevBookId = BOOKS[bookInfo.id - 1].name;
			}
			prevChapterId = BOOKS[bookInfo.id - 1].meta.total_chapters;
		} else {
			prevChapterId = parseInt(chapterId) - 1;
		}

		history.push(`/bible/${prevBookId}/${prevChapterId}`);
	};
	const saveVerse = ({ num, text }) => {};
	if (failureState) {
		return (
			<Container>
				<ErrorView message={errorMessage} />
			</Container>
		);
	}
	return (
		<Container fluid>
			<Row className="scripture-view">
				<h3>
					{bookId} {chapterId}
				</h3>
				{loadingState ? (
					<LoadingView label="Loading Text..." />
				) : (
					<div className="scripture-body">
						{scriptureComponent.map((verse, index) => (
							<span
								className="verse-body"
								key={`verse_${index}`}
								onClick={() => saveVerse(verse)}
							>
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
