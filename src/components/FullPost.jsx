import React from 'react'
import {Card, CardActions, CardContent, IconButton, Link, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const FullPost = ({post, user}) => {


	return (
		<Card sx={{minWidth: 275}}>
			<CardContent>
				<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
					{post.createdAt.toDate().toDateString()}
				</Typography>
				<Typography variant="h5" component="div">
					{post.title}
				</Typography>

				<Typography variant="body2">
					{post.content}
				</Typography>
			</CardContent>
			{user ? (
				<CardActions>
					<IconButton>
						<EditIcon/>
					</IconButton>
					<IconButton>
						<DeleteIcon/>
					</IconButton>
				</CardActions>
			) : null}
		</Card>
	)
}

export default FullPost;