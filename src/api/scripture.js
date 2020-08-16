const GetPassageText_URL = `/v3/passage/text`;
const getHeaders = () => ({
	Authorization: `Token ${process.env.REACT_APP_ESV_TOKEN}`,
});
const getSearchParams = (params) => {
	let searchParams = [];
	for (const [key, value] of Object.entries(params)) {
		searchParams.push(`${key}=${value}`);
	}
	return searchParams.join("&");
};

const getPassageText = ({
	passage,
	includeFootnotes = true,
	includeFootnoteBody = true,
	includeHeadings = true,
}) => {
	const headers = getHeaders();
	const result = fetch(
		`${GetPassageText_URL}?${getSearchParams({
			q: passage,
			"include-footnote-body": includeFootnoteBody,
			"include-footnotes": includeFootnotes,
			"include-headings": includeHeadings,
		})}`,
		{ headers }
	).then((response) => {
		return response.json();
	});
	return result;
};
export { getPassageText };
