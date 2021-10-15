import React, { useEffect, useState } from 'react';
import {
	Container,
	Card,
	Form,
	Button,
	Segment,
	Grid,
	Divider,
	Message,
} from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { signUpUser, signInUser } from 'api/auth';
import { useUserContext } from 'contexts/WithUserProfile';
import './Login.css';

const SignUpView = ({ credentials, handleSignUp, updateUserCred }) => {
	return (
		<Form size="large" error={credentials.error}>
			<Message
				error
				className="text-center"
				content="Something went wrong! Please try again."
			/>
			<Form.Input
				icon="mail"
				iconPosition="left"
				label="Email"
				placeholder="Email"
				value={credentials.email}
				onChange={({ target }) =>
					updateUserCred((cred) => ({
						...cred,
						email: target.value,
					}))
				}
			/>
			<Form.Input
				icon="lock"
				iconPosition="left"
				label="Password"
				type="password"
				value={credentials.pass}
				onChange={({ target }) =>
					updateUserCred((cred) => ({
						...cred,
						pass: target.value,
					}))
				}
			/>
			<Form.Input
				icon="lock"
				iconPosition="left"
				label="Confirm Password"
				type="password"
				value={credentials.confirmPass}
				onChange={({ target }) =>
					updateUserCred((cred) => ({
						...cred,
						confirmPass: target.value,
					}))
				}
			/>
			<Button
				content="Sign up"
				icon="signup"
				size="large"
				onClick={handleSignUp}
			/>
		</Form>
	);
};
const SignInView = ({ credentials, handleSignIn, updateUserCred }) => {
	return (
		<Form size="large" error={credentials.error}>
			<Message
				error
				className="text-center"
				content="Something went wrong! Please try again."
			/>
			<Form.Input
				icon="mail"
				iconPosition="left"
				label="Email"
				placeholder="Email"
				value={credentials.email}
				onChange={({ target }) =>
					updateUserCred((cred) => ({ ...cred, email: target.value }))
				}
			/>
			<Form.Input
				icon="lock"
				iconPosition="left"
				label="Password"
				type="password"
				value={credentials.pass}
				onChange={({ target }) =>
					updateUserCred((cred) => ({ ...cred, pass: target.value }))
				}
			/>

			<Button content="Login" primary size="large" onClick={handleSignIn} />
		</Form>
	);
};

const Login = () => {
	const [, setUser] = useUserContext();
	const [loading, setLoading] = useState(false);
	const [userCred, setUserCred] = useState({
		email: '',
		pass: '',
		error: false,
	});
	const [newUserCred, setNewUserCred] = useState({
		email: '',
		pass: '',
		confirmPass: '',
		error: false,
	});

	const onSignin = () => {
		setLoading(true);
		const { email, pass } = userCred;
		signInUser(email, pass).then(({ user, session, error }) => {
			setLoading(false);
			if (isEmpty(error)) authorizeUser(user, session);

			setUserCred((cred) => ({ ...cred, error: !isEmpty(error) }));
		});
	};
	const onSignup = () => {
		setLoading(true);
		const { email, pass, confirmPass } = newUserCred;
		if (pass !== confirmPass) {
			setNewUserCred((cred) => ({ ...cred, error: true }));
		}
		signUpUser(email, pass).then(({ user, session, error }) => {
			setLoading(false);
			if (isEmpty(error)) authorizeUser(user, session);

			setNewUserCred((cred) => ({ ...cred, error: !isEmpty(error) }));
		});
	};

	const authorizeUser = (user) => {
		setUser(user);
	};
	return (
		<div>
			<Container
				style={{
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Container>
					<Card
						fluid
						color="olive"
						header="2 Timothy 3:16-17"
						meta="ESV"
						description={`All Scripture is breathed out by God and profitable for teaching, for
					reproof, for correction, and for training in righteousness, that the
					man of God may be complete, equipped for every good work.`}
					/>

					<Segment placeholder raised loading={loading}>
						<Grid columns={2} relaxed="very" stackable className="py-5">
							<Grid.Column verticalAlign="middle">
								<SignUpView
									credentials={newUserCred}
									handleSignUp={onSignup}
									updateUserCred={setNewUserCred}
								/>
							</Grid.Column>
							<Grid.Column verticalAlign="middle">
								<SignInView
									credentials={userCred}
									handleSignIn={onSignin}
									updateUserCred={setUserCred}
								/>
							</Grid.Column>
						</Grid>

						<Divider vertical>Or</Divider>
					</Segment>
				</Container>
			</Container>
		</div>
	);
};
export default Login;
