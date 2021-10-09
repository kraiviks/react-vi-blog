import {AccountCircle, Menu} from "@mui/icons-material";
import {AppBar, Button, IconButton, MenuItem, Toolbar, Typography} from "@mui/material";
import React from "react";
import {NavLink} from 'react-router-dom'
import MenuIcon from "@mui/icons-material/Menu";
import {getAuth, signOut} from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth';
import Box from "@mui/material/Box";

const Header = ({setOpenDrawer}) => {

	const auth = getAuth();

	const [user, loading, error] = useAuthState(auth)

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="static">
				<Toolbar>
					<IconButton sx={{mr: 2}} onClick={setOpenDrawer}>
						<MenuIcon/>
					</IconButton>
					<Typography variant="h5" component="div" sx={{flexGrow: 1}}>
						Vi-blog {user ? user.displayName : 'Войдите'}
					</Typography>
					<nav className="nav">
						<NavLink to='/'>
							Home
						</NavLink>
						<NavLink to='/posts'>Posts</NavLink>
						{!user ? (
							<>
								<NavLink to='/login'>Login</NavLink>
								<NavLink to='/register'>Register</NavLink>
							</>
						) : null}
					</nav>
					<Box sx={{display: {xs: 'none', md: 'flex'}}}>
						<IconButton
							size="large"
							color="inherit"
							sx={{mr: 3}}
						>
							<AccountCircle/>
						</IconButton>
						{user ? (<Button variant="contained" onClick={() => signOut(auth)}>SignOut</Button>) : null}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
