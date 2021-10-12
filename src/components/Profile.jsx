import React, {useEffect, useState} from 'react'
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Paper,
	Divider,
	ButtonGroup, Button, TextField, IconButton, Box, Snackbar, Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { getAuth, updateProfile } from "firebase/auth";

const Profile = ({user}) => {
	const auth = getAuth();
	const [handleEditProfile, setHandleEditProfile] = useState(false);
	const [updateUserName, setUpdateUserName] = useState(user ? user.displayName : '')
	const [updateUserPhotoUrl, setuUdateUserPhotoUrl] = useState(user ? user.photoURL : '')
	const [openAlertUpdate, setOpenAlertUpdate] = useState(false);

	const handleName = (e) => {
		setUpdateUserName(e.target.value)
	}
	const handlePhotoUrl = (e) => {
		setuUdateUserPhotoUrl(e.target.value)
	}
	const changeProfile = () => {
		//Update profile

		updateProfile(auth.currentUser, {
			displayName: updateUserName,
			photoURL: updateUserPhotoUrl,
		}).then(() => {
			console.log('Profile updated');
			// Profile updated!
			// ...
		}).catch((error) => {
			// An error occurred
			// ...
		});

		setHandleEditProfile(!handleEditProfile);
		setOpenAlertUpdate(true);
		setTimeout(()=>{
			setOpenAlertUpdate(false);
		}, 2000)
	}


	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={3}>
				<Card sx={{maxWidth: '100%'}}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="100%"
							image={user ? user.photoURL : ''}
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
					{handleEditProfile ?
						(<Box sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', rowGap: 5}}>
							<TextField id="outlined-basic" label="Edit name:" variant="outlined" value={updateUserName} onChange={handleName}/>
							<TextField fullWidth id="outlined-basic" label="Enter photo url:" variant="outlined" value={updateUserPhotoUrl} onChange={handlePhotoUrl}/>
							<Box>
								<label htmlFor="save-button">
									Сохранить:
								</label>
								<IconButton id='save-button' onClick={changeProfile} sx={{ml: 1}}>
									<SaveIcon/>
								</IconButton>
							</Box>
						</Box>) :
						(<>
							<Typography variant='h4' component='div'>About me</Typography>
							<Divider/>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
								labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
								voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
								non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</>)}
				</Paper>
			</Grid>
			<Grid item xs={12} md={3}>
				<Paper elevation={3} sx={{height: "50%", padding: '25px'}}>
					<Button onClick={()=>setHandleEditProfile(!handleEditProfile)}>Редактировать профиль</Button>
				</Paper>
			</Grid>
			<Snackbar open={openAlertUpdate} autoHideDuration={6000} onClose={()=>setOpenAlertUpdate(false)}>
				<Alert onClose={()=>setOpenAlertUpdate(false)} severity="success" sx={{ width: '100%' }}>
					Применение изменений...
				</Alert>
			</Snackbar>
		</Grid>
	)
}

export default Profile;