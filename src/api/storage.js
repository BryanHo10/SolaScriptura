import { isEmpty, head } from "lodash";
import { STORAGE_META } from "../constants/keys";

const compareVerseData = (this_verse, other_verse) => {
	if (this_verse.book !== other_verse.book) {
		return false;
	} else if (this_verse.chapter !== other_verse.chapter) {
		return false;
	} else if (this_verse.verseNum !== other_verse.verseNum) {
		return false;
	} else if (isEmpty(this_verse.text) || isEmpty(other_verse.text)) {
		return true;
	} else if (this_verse.verseText !== other_verse.verseText) {
		return false;
	}

	return true;
};
const isVerseInCollection = (verse) => {
	const serializedVerseCollection = localStorage.getItem(
		STORAGE_META.SAVED_VERSES
	);
	if (isEmpty(serializedVerseCollection)) {
		return false;
	}
	const verseCollection = JSON.parse(serializedVerseCollection);

	const foundIdenticalVerses = verseCollection.filter((other) =>
		compareVerseData(verse, other)
	);
	return foundIdenticalVerses > 0;
};
const saveToLocalStorage = (storageKey, storageObject) => {
	localStorage.setItem(storageKey, JSON.stringify(storageObject));
};
const saveVerse = (book, chapter, { num, text }) => {
	const serializedVerseCollection = localStorage.getItem(
		STORAGE_META.SAVED_VERSES
	);
	const verseCollection = JSON.parse(serializedVerseCollection);

	const verseToBeSaved = {
		book: book,
		chapter: chapter,
		verseNum: num,
		verseText: text,
	};
	if (!isVerseInCollection(verseToBeSaved)) {
		saveToLocalStorage(
			STORAGE_META.SAVED_VERSES,
			isEmpty(verseCollection)
				? [verseToBeSaved]
				: [...verseCollection, verseToBeSaved]
		);
	}
};
const removeVerse = (book, chapter, { num, text }) => {
	const serializedVerseCollection = localStorage.getItem(
		STORAGE_META.SAVED_VERSES
	);
	if (isEmpty(serializedVerseCollection)) {
		return;
	}

	const verseCollection = JSON.parse(serializedVerseCollection);

	const verseToBeRemoved = {
		book: book,
		chapter: chapter,
		verseNum: num,
		verseText: text,
	};

	const updatedVerseCollection = verseCollection.filter(
		(metaData) => !compareVerseData(metaData, verseToBeRemoved)
	);
	saveToLocalStorage(STORAGE_META.SAVED_VERSES, updatedVerseCollection);
};

const getAllVerses = () => {
	const serializedVerseCollection = localStorage.getItem(
		STORAGE_META.SAVED_VERSES
	);
	if (isEmpty(serializedVerseCollection)) {
		return;
	}

	return JSON.parse(serializedVerseCollection);
};
const getSingleVerse = (book, chapter, num) => {
	const serializedVerseCollection = localStorage.getItem(
		STORAGE_META.SAVED_VERSES
	);
	if (isEmpty(serializedVerseCollection)) {
		return;
	}

	const verseCollection = JSON.parse(serializedVerseCollection);

	const verseToBeRetrieved = {
		book: book,
		chapter: chapter,
		verseNum: num,
	};

	const desiredVerse = verseCollection.filter((metaData) =>
		compareVerseData(metaData, verseToBeRetrieved)
	);
	return head(desiredVerse);
};
export { saveVerse, removeVerse, getAllVerses, getSingleVerse };
