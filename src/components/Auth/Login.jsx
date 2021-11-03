import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { NavLink, Redirect } from "react-router-dom";

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

export default function Login({ user }) {
	const provider = new GoogleAuthProvider();
	const auth = getAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorLogin, setErrorLogin] = useState("");
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const loginWithEmail = async () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {})
			.catch((error) => {
				if (error.code === 'auth/wrong-password') {
					setErrorLogin('Неверный пароль');
				} else if(error.code === 'auth/user-not-found') {
					setErrorLogin('Пользователь не найден');
				}
			});
	};

	const loginWithGoogle = async () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// res
			})
			.catch((error) => {
				console.log(error);
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
						Sign in
					</Typography>
					<Typography component="h1" variant="h5" color="red">
						{errorLogin}
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={handleEmail}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handlePassword}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={loginWithEmail}
						>
							Sign In
						</Button>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={loginWithGoogle}
						>
							login With Google
						</Button>
						<Grid container>
							<Grid item>
								<NavLink to="/register" variant="body2">
									Don't have an account? Sign Up
								</NavLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
