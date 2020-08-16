import { isEmpty, get, head, split } from "lodash";
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

	return passage;
};

export { parseTextResponse };
