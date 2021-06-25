import React, { useContext, useEffect, useState } from 'react';
import { getUser } from '../api/auth';

const UserContext = React.createContext();
const useUserContext = () => {
	const value = useContext(UserContext);
	return value;
};
const WithUser = ({ children }) => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		setUser(getUser());
	}, []);
	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
};

export { WithUser as default, useUserContext };
