import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, Redirect } from "react-router-dom";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from "firebase/auth";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function Register({ user }) {
	const auth = getAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleFirstName = (e) => {
		setFirstName(e.target.value);
	};
	const handleLastName = (e) => {
		setLastName(e.target.value);
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const [errorRegister, setErrorRegister] = useState("");

	const registerWithEmail = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				updateProfile(auth.currentUser, {
					displayName: firstName + " " + lastName,
				})
					.then(() => {
						console.log("Ви зарегестрировались");
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				switch (error.code) {
					case "auth/email-already-in-use":
						setErrorRegister("Такой email уже зарегестрирован");
						break;
					case "auth/invalid-email":
						setErrorRegister("Неправильный формат email");
						break;
					case "auth/weak-password":
						setErrorRegister("Слишком слабый пароль");
						break;
					default:
						setErrorRegister(error.code)
				}
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	if (user) {
		return <Redirect to="/posts" />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Typography component="h1" variant="h5" color="red">
						{errorRegister}
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									onChange={handleFirstName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
									onChange={handleLastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={handleEmail}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									onChange={handlePassword}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={registerWithEmail}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<NavLink to="/login" variant="body2">
									Already have an account? Sign in
								</NavLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
