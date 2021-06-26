import React, { useState, useEffect } from 'react';
// import { Row } from 'react-bootstrap';
import { Container, Message } from 'semantic-ui-react';
import classname from 'classnames';
import { last, head } from 'lodash';
import { useHistory } from 'react-router-dom';
import { getPassageText } from 'api/scripture';
import { parseTextResponse, getBookData } from 'utils/parse';
import LoadingView from 'components/Common/Loading';
import './ScriptureView.css';
import NavigationView from 'components/Common/Navigation';
import ErrorView from 'components/Common/Error';
import { BOOKS } from 'constants/books';
import { STORAGE_META } from 'constants/keys';
import { saveVerse, getChapterVerseIndices } from 'api/storage';

const ScriptureView = ({ bookId, chapterId }) => {
	const [scriptureComponent, setScriptureComponent] = useState([]);
	const [savedVerses, setSavedVerses] = useState(
		getChapterVerseIndices(bookId, chapterId)
	);

	const [loadingState, setLoadingState] = useState(false);
	const [failureState, setFailureState] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

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
		setSavedVerses(getChapterVerseIndices(bookId, chapterId));
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
	const handleSaveVerse = (book, chapter, verse) => {
		saveVerse(book, chapter, verse);
		setSavedVerses(getChapterVerseIndices(book, chapter));
	};
	if (failureState) {
		return (
			<Container>
				<ErrorView message={errorMessage} />
			</Container>
		);
	}
	return (
		<Container>
			<Message size="big" floating className="scripture-view">
				<Message.Header className="text-center">
					{bookId} {chapterId}
				</Message.Header>
				{loadingState ? (
					<LoadingView label="Loading Text..." />
				) : (
					<div className="scripture-body">
						{scriptureComponent.map((verse, index) => (
							<span
								className={classname('verse-body', {
									'saved-verse': savedVerses.includes(verse.num),
								})}
								key={`verse_${index}`}
								onClick={() => handleSaveVerse(bookId, chapterId, verse)}
							>
								<span className="verse-num">{verse.num}</span>{' '}
								<span className="verse-text">{verse.text}</span>
							</span>
						))}
						<span>(ESV)</span>
					</div>
				)}
			</Message>

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
