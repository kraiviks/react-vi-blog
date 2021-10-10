import React, {useState, useEffect} from "react";
import "./App.scss";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Header from "../Header/Header";
import {Container, Grid, Paper, Fab, CircularProgress} from "@mui/material";
import LeftDrawer from "../LeftDrawer/LeftDrawer";
import {styled} from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DialogAddItem from "../DialogAddItem/DialogAddItem";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import db from '../../firebase';
import {collection, getDocs} from "firebase/firestore";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import {ThemeProvider, createTheme} from "@mui/material";
import Post from "../Post/Post";
import FullPost from "../FullPost/FullPost";

const Item = styled(Paper)(({theme}) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const App = () => {
	let match = useRouteMatch();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [openDialogAddItem, setOpenDialogAddItem] = useState(false);
	const auth = getAuth();
	const [user, loading] = useAuthState(auth);
	const [data, setData] = useState([]);
	const [themeMode, setThemeMode] = useState('false');

	//Theme to LocalStorage
	const handleThemeToLocalStorage = () => {
		setThemeMode(themeMode === 'false' ? 'true' : 'false')
		localStorage.setItem('theme', themeMode)
	}


	useEffect(() => {
		const fetchData = async () => {
			const req = await getDocs(collection(db, 'posts'));
			setData(req.docs.map(doc => {
				const data = doc.data();
				const id = doc.id;
				return {id, ...data};
			}));
		}
		fetchData();

	}, [openDialogAddItem])


	if (loading) {
		return <CircularProgress sx={{position: "fixed", top: '50%', left: '50%'}}/>;
	}

	//Theme

	const theme = createTheme({
		palette: {
			mode: localStorage.getItem('theme') === 'false' ? 'light' : 'dark'
		},
	});

	console.log(user);
	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<LeftDrawer
					openDrawer={openDrawer}
					closeDrawer={() => setOpenDrawer(false)}
					setOpenDialogAddItem={() => setOpenDialogAddItem(true)}
					handleThemeToLocalStorage={handleThemeToLocalStorage}
					themeMode={themeMode}
				/>
				<Header setOpenDrawer={() => setOpenDrawer(true)}/>
				<Container sx={{mt: "5rem"}}>
					<Switch>
						<Route exact path='/'>
							<div>Hello</div>
						</Route>
						<Route path="/posts">
							<Grid container spacing={2}>
								{data.map((item) =>
									<Grid item xs={12} key={item.id}>
										<Post title={item.title} content={item.content} createdAt={item.createdAt}
											  id={item.id}/>
									</Grid>)
								}
							</Grid>
							{user ? (
								<Fab
									color="primary"
									aria-label="add"
									sx={{position: "fixed", bottom: "5%", right: "10%"}}
									onClick={() => setOpenDialogAddItem(true)}
								>
									<AddIcon/>
								</Fab>
							) : null}
						</Route>
						<Route exact path="/post/:id"
							   render={({match}) => (<FullPost user={user} post={data.find(p => p.id === match.params.id)}/>)}/>
						<Route path="/login">
							<Login/>
						</Route>
						<Route path="/register">
							<Register/>
						</Route>
					</Switch>
				</Container>
				<DialogAddItem
					openDialogAddItem={openDialogAddItem}
					closeDialogAddItem={() => setOpenDialogAddItem(false)}
				/>
			</div>
		</ThemeProvider>)
};

export default App;
