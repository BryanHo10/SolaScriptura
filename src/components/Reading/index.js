import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import SelectionView from './Selection';
import ScriptureView from './Scripture/ScriptureView';
import { Icon, Sidebar } from 'semantic-ui-react';
const ReadingView = (props) => {
	const { bookId, chapterId } = useParams();
	const [visible, setVisible] = useState(false);
	const history = useHistory();
	if (!isEmpty(bookId) || !isEmpty(chapterId)) {
		return (
			<Sidebar.Pushable style={{ minHeight: '100vh' }}>
				<Sidebar
					animation="overlay"
					icon="labeled"
					inverted
					onHide={() => setVisible(false)}
					vertical
					visible={visible}
					width="wide"
				>
					<SelectionView stacked hidden={!visible} />
				</Sidebar>

				<Sidebar.Pusher
					dimmed={visible}
					style={{ backgroundColor: 'aliceblue', minHeight: '100vh' }}
				>
					<div className="d-flex justify-content-between">
						<Icon
							name="options"
							onClick={(e, data) => setVisible(true)}
							size="big"
							className="p-3"
							inverted
							bordered
							color="grey"
							style={{ cursor: 'pointer' }}
						/>
						<div>
							<Icon
								name="history"
								size="big"
								className="m-0"
								inverted
								bordered
								color="grey"
								style={{ cursor: 'pointer' }}
								onClick={() => history.push('/')}
							/>
						</div>
					</div>

					<ScriptureView bookId={bookId} chapterId={chapterId} />
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}
	return (
		<div>
			<Link to="/" className="home-link">
				<FontAwesomeIcon icon={faHome} /> Home
			</Link>
			<SelectionView />
		</div>
	);
};
ReadingView.propTypes = {};
export default ReadingView;
