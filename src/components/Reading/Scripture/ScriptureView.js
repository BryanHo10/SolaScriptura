import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { isEmpty, get } from "lodash";
import { Row, Container } from "react-bootstrap";
import { getPassageText } from "../../../api/scripture";

const ScriptureView = ({ bookId, chapterId }) => {
	const [scriptureComponent, setScriptureComponent] = useState([]);
	useEffect(() => {
		getPassageText(`${bookId} ${chapterId}`).then((data) => {
			setScriptureComponent(get(data, "passages", []));
		});
	}, []);
	return (
		<Container>
			<Row>
				<h3>
					{bookId} {chapterId}
				</h3>
				{scriptureComponent}
			</Row>
		</Container>
	);
};
ScriptureView.propTypes = {};
export default ScriptureView;
