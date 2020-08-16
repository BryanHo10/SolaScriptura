import { isEmpty, get, head, last } from "lodash";
import { BOOKS } from "../constants/books";

const removeCopyrightText = (passage) => {
	if (isEmpty(passage)) {
		return;
	}
	last(passage).text = last(passage).text.replace("(ESV)", "");
};
const parseTextResponse = (response) => {
	const passageResponse = get(response, "passages");
	if (isEmpty(passageResponse)) {
		return response;
	}
	const passageTexts = head([...passageResponse]);
	const passageTextGroups = passageTexts.split(/\[(\d*)\]/).splice(1);
	let passage = [];
	for (let index = 1; index < passageTextGroups.length; index += 2) {
		const verseInfo = {
			num: parseInt(passageTextGroups[index - 1]),
			text: passageTextGroups[index].trim(),
		};
		passage.push(verseInfo);
	}
	removeCopyrightText(passage);
	return passage;
};
const getBookData = (name) => {
	return head(BOOKS.filter((book) => name === book.name));
};
export { parseTextResponse, getBookData };
