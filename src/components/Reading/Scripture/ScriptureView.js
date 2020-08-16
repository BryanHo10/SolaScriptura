import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { isEmpty, get } from "lodash";
import { Row, Container } from "react-bootstrap";
import { getPassageText } from "../../../api/scripture";
import { parseTextResponse } from "../../../utils/parse";
import LoadingView from "../../Common/Loading";

const ScriptureView = ({ bookId, chapterId }) => {
	const [scriptureComponent, setScriptureComponent] = useState([]);
	const [loadingState, setLoadingState] = useState(false);

	useEffect(() => {
		setLoadingState(true);
		const config = {
			passage: `${bookId} ${chapterId}`,
			includeFootnotes: false,
			includeFootnoteBody: false,
			includeHeadings: false,
		};
		getPassageText(config).then((data) => {
			const passage = parseTextResponse(data);
			setScriptureComponent(passage);
			setLoadingState(false);
		});
	}, []);
	return (
		<Container>
			<Row>
				<h3>
					{bookId} {chapterId}
				</h3>
				{loadingState ? (
					<LoadingView label="Loading Text..." />
				) : (
					<div>
						{scriptureComponent.map((verse, index) => (
							<>
								<span>{verse.num}</span> <span>{verse.text}</span>
							</>
						))}
					</div>
				)}
			</Row>
		</Container>
	);
};
ScriptureView.propTypes = {};
export default ScriptureView;
