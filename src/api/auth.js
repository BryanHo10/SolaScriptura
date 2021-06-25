import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
	process.env.REACT_APP_SUPABASE_URL,
	process.env.REACT_APP_SUPABASE_KEY
);
const getUser = () => {
	return supabase.auth.user();
};
const signOutUser = () => {
	return supabase.auth.signOut();
};
const signUpUser = (email, password) => {
	return supabase.auth.signUp({
		email,
		password,
	});
};
const signInUser = (email, password) => {
	return supabase.auth.signIn({
		email,
		password,
	});
};
export { getUser, signUpUser, signInUser, signOutUser };
