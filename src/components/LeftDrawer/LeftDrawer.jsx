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
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import React, {useState} from "react";
import {getAuth, signOut} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {NavLink} from "react-router-dom";


const LeftDrawer = ({openDrawer, closeDrawer, setOpenDialogAddItem}) => {
	const [themeMode, setThemeMode] = useState(false);
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
						<AccountBox/>
					</ListItemIcon>
					<NavLink to='/'>
						Home
					</NavLink>
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<AccountBox/>
					</ListItemIcon>
					<NavLink to='/posts'>Posts</NavLink>
				</ListItem>
				{user ? (<ListItem button>
					<ListItemIcon>
						<AccountBox/>
					</ListItemIcon>
					<ListItemText primary={'Профиль'}/>
				</ListItem>) : null}
				{!themeMode ?
					(<ListItem button onClick={()=> setThemeMode(true)}>
						<ListItemIcon>
							<DarkModeIcon/>
						</ListItemIcon>
						<ListItemText primary={'Dark mode'}/>
					</ListItem>) :
					(<ListItem button onClick={()=> setThemeMode(false)}>
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
					<NavLink to='/login' variant="body2">Log in</NavLink>
				</ListItem>)}
			</List>
		</Drawer>
	);
};

export default LeftDrawer;
