import React, { useState, useEffect } from "react";
import "./App.scss";
import {Route, Switch} from "react-router-dom";
import Header from "../Header/Header";
import {Container, Grid, Paper, Fab, CircularProgress} from "@mui/material";
import LeftDrawer from "../LeftDrawer/LeftDrawer";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DialogAddItem from "../DialogAddItem/DialogAddItem";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import db from '../../firebase';
import {collection, getDocs} from "firebase/firestore";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const App = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [openDialogAddItem, setOpenDialogAddItem] = useState(false);
	const auth = getAuth();
	const [user, loading, error] = useAuthState(auth);

	const [data, setData] = useState([]);

	useEffect( ()=>{
		const fetchData = async () => {
			const req = await  getDocs(collection(db, 'posts'));
			setData(req.docs.map(item=> item.data()))
		}
		fetchData();
	}, [openDialogAddItem])


	if (loading) {
		return <CircularProgress sx={{position: "fixed", top: '50%', left: '50%'}}/>;
	}

	return (
		<div className="app">
			<LeftDrawer
				openDrawer={openDrawer}
				closeDrawer={() => setOpenDrawer(false)}
				setOpenDialogAddItem={()=> setOpenDialogAddItem(true)}
			/>
			<Header setOpenDrawer={() => setOpenDrawer(true)}/>
			<Container sx={{ mt: "5rem" }}>
				<Switch>
					<Route exact path='/'>
						<div>Hello</div>
					</Route>
					<Route path="/posts">
						<Grid container spacing={2}>
							<Grid item xs={12}>
								{data.map((post,i)=>(
									<li key={i}>
										<p>{post.title}</p>
										<p>{post.content}</p>
									</li>
								))}
							</Grid>

						</Grid>
						<Fab
							color="primary"
							aria-label="add"
							sx={{ position: "fixed", bottom: "5%", right: "10%" }}
							onClick={() => setOpenDialogAddItem(true)}
						>
							<AddIcon />
						</Fab>
					</Route>
					<Route  path="/login">
						<Login/>
					</Route>
					<Route  path="/register">
						<Register/>
					</Route>
				</Switch>
			</Container>
			<DialogAddItem
				openDialogAddItem={openDialogAddItem}
				closeDialogAddItem={() => setOpenDialogAddItem(false)}
			/>
		</div>
	);
};

export default App;
