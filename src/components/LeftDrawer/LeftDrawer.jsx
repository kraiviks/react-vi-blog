import {AccountBox} from "@mui/icons-material";
import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import React, {useState} from "react";
import {getAuth, signOut} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {NavLink} from "react-router-dom";
import Link from "@mui/material/Link";


const LeftDrawer = ({openDrawer, closeDrawer, themeMode, handleThemeToLocalStorage}) => {
	const auth = getAuth();
	const [user, loading, error] = useAuthState(auth);

	const drawerWidth = 240;


	return (
		<Drawer
			anchor="left"
			open={openDrawer}
			onClose={closeDrawer}
			sx={{
				width: drawerWidth,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}
		>
			<Typography variant="h4" sx={{textAlign: "center"}}>
				Vi-blog
			</Typography>
			<Divider/>
			<List>
				<ListItem button>
					<ListItemIcon>
						<HomeIcon/>
					</ListItemIcon>
					<Link color="inherit" underline="none" component={NavLink} to='/' sx={{width: '100%'}}><ListItemText primary={'Home'}/></Link>
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<ArticleIcon/>
					</ListItemIcon>
					<Link color="inherit" underline="none" component={NavLink} to='/posts' sx={{width: '100%'}}><ListItemText primary={'Posts'}/></Link>
				</ListItem>
				{user ? (<ListItem button>
					<ListItemIcon>
						<AccountBox/>
					</ListItemIcon>
					<ListItemText primary={'Профиль'}/>
				</ListItem>) : null}
				{!themeMode ?
					(<ListItem button onClick={handleThemeToLocalStorage}>
						<ListItemIcon>
							<DarkModeIcon/>
						</ListItemIcon>
						<ListItemText primary={'Dark mode'}/>
					</ListItem>) :
					(<ListItem button onClick={handleThemeToLocalStorage}>
					<ListItemIcon>
						<LightModeIcon/>
					</ListItemIcon>
					<ListItemText primary={'Light mode'}/>
				</ListItem>)}
				{user ? (<ListItem button onClick={() => signOut(auth)}>
					<ListItemIcon>
						<LogoutIcon/>
					</ListItemIcon>
					<ListItemText primary={'Выйти из профиля'}/>
				</ListItem>) : (<ListItem button>
					<ListItemIcon>
						<AccountBox/>
					</ListItemIcon>
					<Link color="inherit" underline="none" component={NavLink} to='/login' sx={{width: '100%'}}><ListItemText primary={'Log in'}/></Link>
				</ListItem>)}
			</List>
		</Drawer>
	);
};

export default LeftDrawer;