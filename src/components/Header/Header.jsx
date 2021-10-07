import { AccountCircle } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
	return (
		<AppBar>
			<Toolbar>
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					Vi-blog
				</Typography>
				<IconButton color="inherit">
					<AccountCircle />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
