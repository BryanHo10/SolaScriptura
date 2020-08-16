import React from "react";
import { Link, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import SelectionView from "./Selection";
import ScriptureView from "./Scripture/ScriptureView";

const ReadingView = (props) => {
	const { bookId, chapterId } = useParams();
	if (!isEmpty(bookId) || !isEmpty(chapterId)) {
		return (
			<div>
				<Link to="/bible">Back to Selection</Link>
				<ScriptureView bookId={bookId} chapterId={chapterId} />
			</div>
		);
	}
	return (
		<div>
			<Link to="/">Home</Link>
			<SelectionView />
		</div>
	);
};
ReadingView.propTypes = {};
export default ReadingView;
