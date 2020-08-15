const GetPassageText_URL = `/v3/passage/text`;
const Token = "9a6226adb27b5b293603240118251c43b1951d99";
const getHeaders = () => ({
	Authorization: `Token ${Token}`,
});
const getSearchParams = (params) => {
	let searchParams = [];
	for (const [key, value] of Object.entries(params)) {
		searchParams.push(`${key}=${value}`);
	}
	return searchParams.join("&");
};

const getPassageText = (passage) => {
	const headers = getHeaders();
	const result = fetch(
		`${GetPassageText_URL}?${getSearchParams({
			q: passage,
		})}`,
		{ headers }
	).then((response) => response.json());
	return result;
};
export { getPassageText };
