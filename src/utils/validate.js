import { BOOKS } from "../constants/books";
const isValidBookName = (book) => {
	const bookNames = BOOKS.map((bookData) => bookData.name);
	return bookNames.includes(book);
};
const isValidChapter = (book, chapter) => {};
export { isValidBookName, isValidChapter };
