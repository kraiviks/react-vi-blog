import React from 'react'
import {Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Paper, Divider} from "@mui/material";

const Profile = ({user}) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={3}>
				<Card sx={{maxWidth: '100%'}}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="100%"
							image={user ? user.providerData[0].photoURL : ''}
							alt="green iguana"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{user ? user.displayName : null}
							</Typography>
							<Divider/>

							<Typography variant="body2" color="text.secondary">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
							</Typography>
							<p>email: {user ? user.email : null	}</p>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
			<Grid item xs={12} md={9}>

				<Paper elevation={3} sx={{height: "85%", padding: '25px'}}>
					<Typography variant='h4' component='div'>About me</Typography>
					<Divider/>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
						voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</Paper>
			</Grid>
			<Grid item xs={12} md={3}>
				<Paper elevation={3} sx={{height: "100%", padding: '25px'}}>
					<p>Сменить фото</p>
					<p>Сменить имя</p>

				</Paper>
			</Grid>
		</Grid>
	)
}

export default Profile;