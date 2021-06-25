import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import classname from 'classnames';
import {
	Menu,
	Icon,
	Header,
	Container,
	Loader,
	Dimmer,
} from 'semantic-ui-react';
import './index.css';
import { STORAGE_META } from '../../constants/keys';
import VerseCollection from './SavedVerses/VerseCollection';
import { signOutUser } from 'api/auth';
import { useUserContext } from 'contexts/WithUserProfile';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';

const VIEW = {
	SAVED_VERSES: 'saved',
	PROGRESS_CHART: 'progress',
	READ: 'red',
};

const Dashboard = (props) => {
	const [bibleURL, setBibleURL] = useState('/bible');
	const [loading, setLoading] = useState(false);
	const [viewState, setViewState] = useState(VIEW.SAVED_VERSES);
	const [user, setUser] = useUserContext();
	const history = useHistory();

	useEffect(() => {
		const storedBookId = localStorage.getItem(STORAGE_META.LATEST_BOOK_ID);
		const storedChapterId = localStorage.getItem(STORAGE_META.LATEST_CHAP_ID);
		if (!isEmpty(storedBookId) && !isEmpty(storedChapterId)) {
			setBibleURL(`/bible/${storedBookId}/${storedChapterId}`);
		}
	}, []);
	const logout = () => {
		setLoading(true);
		signOutUser().then(() => {
			setUser(null);
			history.push('/');
		});
	};
	const toggleView = (e, { name }) => setViewState(name);
	return (
		<Container className="text-center">
			{loading && (
				<Dimmer active inverted>
					<Loader inverted size="large">
						Loading
					</Loader>
				</Dimmer>
			)}

			<Menu stackable>
				<Menu.Item>
					<Header size="medium" color="blue" className="py-1">
						<Icon name="book" size="big" color="blue" />
						<Header.Content>SolaScriptura</Header.Content>
					</Header>
				</Menu.Item>

				<Menu.Item
					name={VIEW.SAVED_VERSES}
					active={viewState === VIEW.SAVED_VERSES}
					onClick={toggleView}
				>
					My Verses
				</Menu.Item>

				<Menu.Item
					name={VIEW.PROGRESS_CHART}
					active={viewState === VIEW.PROGRESS_CHART}
					onClick={toggleView}
				>
					My Progress
				</Menu.Item>
				<Menu.Item
					name={VIEW.READ}
					active={viewState === VIEW.READ}
					onClick={() => history.push(bibleURL)}
				>
					Read Bible
				</Menu.Item>
				<Menu.Item position="right" onClick={logout}>
					<Header size="small" color="grey" className="py-1">
						<Header.Content>
							Log out <Icon name="sign-out" color="grey" />
						</Header.Content>
					</Header>
				</Menu.Item>
			</Menu>
			<hr />

			{viewState === VIEW.SAVED_VERSES && <VerseCollection />}
		</Container>
	);
};
Dashboard.propTypes = {};
export default Dashboard;
