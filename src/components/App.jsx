import React, { useState, useEffect } from "react";
import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import { Container, Grid, Fab, CircularProgress } from "@mui/material";
import LeftDrawer from "./LeftDrawer";
import AddIcon from "@mui/icons-material/Add";
import DialogAddItem from "./DialogAddItem";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import db from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { ThemeProvider, createTheme } from "@mui/material";
import Post from "./Post";
import FullPost from "./FullPost";
import Profile from "./Profile";
import Home from "./Home";

const App = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [openDialogAddItem, setOpenDialogAddItem] = useState(false);
	const auth = getAuth();
	const [user, loading] = useAuthState(auth);
	const [data, setData] = useState([]);
	const [themeMode, setThemeMode] = useState("false");

	//Theme to LocalStorage
	const handleThemeToLocalStorage = () => {
		setThemeMode(themeMode === "false" ? "true" : "false");
		localStorage.setItem("theme", themeMode);
	};

	useEffect(() => {
		const fetchData = async () => {
			const collectionRef = query(
				collection(db, "posts"),
				orderBy("createdAt", "desc")
			);
			const unsubscribe = await onSnapshot(collectionRef, (doc) => {
				setData(
					doc.docs.map((doc) => {
						const data = doc.data();
						const id = doc.id;
						return { id, ...data };
					})
				);
			});
		};
		fetchData();
	}, []);

	if (loading) {
		return (
			<CircularProgress
				sx={{ position: "fixed", top: "50%", left: "50%" }}
			/>
		);
	}

	//Theme

	const theme = createTheme({
		palette: {
			mode: localStorage.getItem("theme") === "false" ? "light" : "dark",
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<LeftDrawer
					openDrawer={openDrawer}
					closeDrawer={() => setOpenDrawer(false)}
					setOpenDialogAddItem={() => setOpenDialogAddItem(true)}
					handleThemeToLocalStorage={handleThemeToLocalStorage}
					themeMode={themeMode}
					user={user}
				/>
				<Header
					setOpenDrawer={() => setOpenDrawer(true)}
					user={user}
					handleThemeToLocalStorage={handleThemeToLocalStorage}
					themeMode={themeMode}
				/>
				<Container
					sx={{
						mt: "5rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/profile">
							{user ? (
								<Profile user={user} />
							) : (
								<Redirect to="/" />
							)}
						</Route>
						<Route path="/posts">
							<Grid container spacing={2}>
								{data.map((item) => (
									<Grid item xs={12} key={item.id}>
										<Post
											title={item.title}
											content={item.content}
											createdAt={item.createdAt}
											id={item.id}
										/>
									</Grid>
								))}
							</Grid>
							{user ? (
								<Fab
									color="primary"
									aria-label="add"
									sx={{
										position: "fixed",
										bottom: "5%",
										right: "10%",
									}}
									onClick={() => setOpenDialogAddItem(true)}
								>
									<AddIcon />
								</Fab>
							) : null}
						</Route>
						<Route exact path="/post/:id">
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<FullPost user={user} data={data} />
								</Grid>
							</Grid>
						</Route>
						<Route path="/login">
							<Login user={user} />
						</Route>
						<Route path="/register">
							<Register user={user} />
						</Route>
					</Switch>
				</Container>
				<DialogAddItem
					openDialogAddItem={openDialogAddItem}
					closeDialogAddItem={() => setOpenDialogAddItem(false)}
					user={user}
				/>
			</div>
		</ThemeProvider>
	);
};

export default App;
