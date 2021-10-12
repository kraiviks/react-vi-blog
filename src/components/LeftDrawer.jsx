import React from "react";
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

import {getAuth, signOut} from "firebase/auth";
import {NavLink} from "react-router-dom";
import Link from "@mui/material/Link";


const LeftDrawer = ({openDrawer, closeDrawer, themeMode, handleThemeToLocalStorage, user}) => {
	const drawerWidth = 240;
	const auth = getAuth();
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
				<ListItem button onClick={closeDrawer}>
					<ListItemIcon>
						<HomeIcon/>
					</ListItemIcon>
					<Link color="inherit" underline="none" component={NavLink} to='/react-vi-blog/' sx={{width: '100%'}}><ListItemText primary={'Home'}/></Link>
				</ListItem>
				<ListItem button onClick={closeDrawer}>
					<ListItemIcon>
						<ArticleIcon/>
					</ListItemIcon>
					<Link color="inherit" underline="none" component={NavLink} to='/react-vi-blog/posts' sx={{width: '100%'}}><ListItemText primary={'Posts'}/></Link>
				</ListItem>
				{user ? (<ListItem button onClick={closeDrawer}>
					<ListItemIcon>
						<AccountBox/>
					</ListItemIcon>
					<Link color="inherit" underline="none" component={NavLink} to='/react-vi-blog/profile' sx={{width: '100%'}}><ListItemText primary={'Профиль'}/></Link>
				</ListItem>) : null}
				{!themeMode ?
					(<ListItem button onClick={handleThemeToLocalStorage} >
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

					<Link color="inherit" underline="none" component={NavLink} to='/react-vi-blog/' sx={{width: '100%'}}><ListItemText primary={'Выйти из профиля'}/></Link>
				</ListItem>) : (<ListItem button>
					<ListItemIcon>
						<AccountBox/>
					</ListItemIcon>
					<Link color="inherit" underline="none" component={NavLink} to='/react-vi-blog/login' sx={{width: '100%'}}><ListItemText primary={'Log in'}/></Link>
				</ListItem>)}
			</List>
		</Drawer>
	);
};

export default LeftDrawer;
