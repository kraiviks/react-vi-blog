import React from "react";
import { NavLink, Redirect } from "react-router-dom";

import {
	AppBar,
	IconButton,
	ListItem,
	Toolbar,
	Typography,
	Box,
	Link,
	createStyles,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { getAuth, signOut } from "firebase/auth";

import useMediaQuery from "@mui/material/useMediaQuery";

const styles = createStyles({
	menuIcon: {
		margine: 2,
		"@media (min-width: 598px)": {
			display: "none",
		},
	},
	logoutIcon: {
		cursor: "pointer",
		padding: 2,
		"@media (max-width: 598px)": {
			display: "none",
		},
	},
});

const Header = ({ setOpenDrawer, user }) => {
	const showHeaderButton = useMediaQuery("(min-width:600px)");
	const sizeLogo = useMediaQuery("(min-width:600px)");
	const auth = getAuth();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar sx={{ justifyContent: "center" }}>
					<IconButton sx={styles.menuIcon} onClick={setOpenDrawer}>
						<MenuIcon />
					</IconButton>

					{sizeLogo && (
						<Typography
							variant="h5"
							component="div"
							sx={{ flexGrow: 1 }}
						>
							Vi-blog
						</Typography>
					)}
					{showHeaderButton && (
						<nav className="nav">
							<ListItem button>
								<Link
									color="inherit"
									underline="none"
									component={NavLink}
									to="/"
									sx={{ padding: "5px 15px" }}
								>
									Home
								</Link>
							</ListItem>
							<ListItem button>
								<Link
									color="inherit"
									underline="none"
									component={NavLink}
									to="/posts"
									sx={{ padding: "5px 15px" }}
								>
									Posts
								</Link>
							</ListItem>
							{user ? (
								<ListItem button>
									<Link
										color="inherit"
										underline="none"
										component={NavLink}
										to="/profile"
										sx={{ padding: "5px 15px" }}
									>
										Profile
									</Link>
								</ListItem>
							) : null}
							{!user ? (
								<>
									<ListItem button>
										<Link
											color="inherit"
											underline="none"
											component={NavLink}
											to="/login"
											sx={{ padding: "5px 15px" }}
										>
											Login
										</Link>
									</ListItem>
									<ListItem button>
										<Link
											color="inherit"
											underline="none"
											component={NavLink}
											to="/register"
											sx={{ padding: "5px 15px" }}
										>
											Register
										</Link>
									</ListItem>
								</>
							) : null}
						</nav>
					)}
					{user ? (
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography
								variant="h5"
								component="div"
								sx={{ ml: 5 }}
							>
								{user.displayName}
							</Typography>
							<Avatar
								alt="Remy Sharp"
								src={user.photoURL}
								sx={{ ml: 5 }}
							/>
							<LogoutIcon
								onClick={() => signOut(auth)}
								sx={styles.logoutIcon}
							/>
						</Box>
					) : null}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
