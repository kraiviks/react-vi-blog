import React from "react";
import {NavLink} from 'react-router-dom'


import {
	AppBar, IconButton, ListItem, Toolbar, Typography, Box, Link
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";

import useMediaQuery from '@mui/material/useMediaQuery';


const Header = ({setOpenDrawer, user}) => {
	const showHeaderButton = useMediaQuery('(min-width:600px)');
	const sizeLogo = useMediaQuery('(min-width:600px)');

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="static">
				<Toolbar>
					<IconButton sx={{mr: 2}} onClick={setOpenDrawer}>
						<MenuIcon/>
					</IconButton>

					{sizeLogo && <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
						Vi-blog
					</Typography>}
					{showHeaderButton && <nav className="nav">
						<ListItem button>
							<Link color="inherit" underline="none" component={NavLink} to='/react-aniviks/'
								  sx={{padding: '5px 15px'}}>Home</Link>
						</ListItem>
						<ListItem button>
							<Link color="inherit" underline="none" component={NavLink} to='/react-aniviks/posts'
								  sx={{padding: '5px 15px'}}>Posts</Link>
						</ListItem>
						{user ? (<ListItem button>
							<Link color="inherit" underline="none" component={NavLink} to='/react-aniviks/profile'
								  sx={{padding: '5px 15px'}}>Profile</Link>
						</ListItem>) : null}
						{!user ? (
							<>
								<ListItem button>
									<Link color="inherit" underline="none" component={NavLink} to='/react-aniviks/login'
										  sx={{padding: '5px 15px'}}>Login</Link>
								</ListItem>
								<ListItem button>
									<Link color="inherit" underline="none" component={NavLink}
										  to='/react-aniviks/register' sx={{padding: '5px 15px'}}>Register</Link>
								</ListItem>
							</>
						) : null}
					</nav>
					}
					{user ?
						(<Box sx={{display: 'flex', alignItems:'center'}}>
							<Typography variant='h5' component='div' sx={{ml: 5}}>{user.displayName}</Typography>
							<Avatar alt="Remy Sharp" src={user.photoURL} sx={{ml: 5}}/>
						</Box>) : null}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
