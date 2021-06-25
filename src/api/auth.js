import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
	process.env.REACT_APP_SUPABASE_URL,
	process.env.REACT_APP_SUPABASE_KEY
);

const UserSignUp = (email, password) => {
	return supabase.auth.signUp({
		email,
		password,
	});
};
const UserSignIn = (email, password) => {
	return supabase.auth.signIn({
		email,
		password,
	});
};
export { UserSignUp, UserSignIn };
