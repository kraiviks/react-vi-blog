import React from "react";
import './Header.scss';
import {NavLink} from 'react-router-dom'
import {getAuth, signOut} from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth';

import {
	AppBar, Button, IconButton, ListItem, Toolbar, Typography, Box, Link
} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

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
						Vi-blog
					</Typography>
					<nav className="nav">
						<ListItem button>
							<Link color="inherit" underline="none" component={NavLink} to='/'
								  sx={{padding: '5px 15px'}}>Home</Link>
						</ListItem>
						<ListItem button>
							<Link color="inherit" underline="none" component={NavLink} to='/posts'
								  sx={{padding: '5px 15px'}}>Posts</Link>
						</ListItem>
						{user ? (<ListItem button>
							<Link color="inherit" underline="none" component={NavLink} to='/profile'
								  sx={{padding: '5px 15px'}}>Profile</Link>
						</ListItem>) : null}
						{!user ? (
							<>
								<ListItem button>
									<Link color="inherit" underline="none" component={NavLink} to='/login'
										  sx={{padding: '5px 15px'}}>Login</Link>
								</ListItem>
								<ListItem button>
									<Link color="inherit" underline="none" component={NavLink}
										  to='/register' sx={{padding: '5px 15px'}}>Register</Link>
								</ListItem>
							</>
						) : null}
					</nav>
					{user ?
						<Typography variant='h5' component='div' sx={{ml: 5}}>{user.displayName}</Typography> : null}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
