import { isEmpty, get } from 'lodash';
import { STORAGE_META } from 'constants/keys';

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
	if (isEmpty(get(verseCollection, `${book}[${chapter}][${num}]`, null))) {
		let updateVerseCollection = { ...verseCollection };
		if (!updateVerseCollection[book]) {
			updateVerseCollection[book] = {};
		}
		if (!updateVerseCollection[book][chapter]) {
			updateVerseCollection[book][chapter] = {};
		}
		if (!updateVerseCollection[book][chapter][num]) {
			updateVerseCollection[book][chapter][num] = {};
		}
		updateVerseCollection[book][chapter][num] = verseToBeSaved;
		saveToLocalStorage(STORAGE_META.SAVED_VERSES, updateVerseCollection);
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

	if (get(verseCollection, `${book}[${chapter}][${num}]`, null)) {
		let updateVerseCollection = { ...verseCollection };
		if (!verseCollection[book]) {
			updateVerseCollection[book] = {};
		}
		if (!verseCollection[book][chapter]) {
			updateVerseCollection[book][chapter] = {};
		}
		updateVerseCollection[book][chapter][num] = {};

		saveToLocalStorage(STORAGE_META.SAVED_VERSES, updateVerseCollection);
	}
};

const getAllVerses = () => {
	const serializedVerseCollection = JSON.parse(
		localStorage.getItem(STORAGE_META.SAVED_VERSES)
	);
	if (isEmpty(serializedVerseCollection)) {
		return [];
	}
	let allVerses = [];
	for (const book of Object.keys(serializedVerseCollection)) {
		for (const verse_sets of Object.values(serializedVerseCollection[book])) {
			if (!isEmpty(verse_sets)) {
				allVerses.push(
					Object.values(verse_sets).filter((verse) => !isEmpty(verse))
				);
			}
		}
	}
	return allVerses.flat(Infinity);
};
const getChapterVerseIndices = (book, chapter) => {
	const serializedVerseCollection = JSON.parse(
		localStorage.getItem(STORAGE_META.SAVED_VERSES)
	);
	if (isEmpty(serializedVerseCollection)) {
		return [];
	}
	const serializedChapterData = get(
		serializedVerseCollection,
		`${book}[${chapter}]`,
		{}
	);
	let verseIndices = [];
	for (const verse of Object.values(serializedChapterData)) {
		if (!isEmpty(verse)) {
			verseIndices.push(verse.verseNum);
		}
	}

	return verseIndices;
};
const getSingleVerse = (book, chapter, num) => {
	const serializedVerseCollection = localStorage.getItem(
		STORAGE_META.SAVED_VERSES
	);
	if (isEmpty(serializedVerseCollection)) {
		return;
	}

	const verseCollection = JSON.parse(serializedVerseCollection);

	return get(verseCollection, `${book}[${chapter}][${num}]`, null);
};
export {
	saveVerse,
	removeVerse,
	getAllVerses,
	getChapterVerseIndices,
	getSingleVerse,
};
