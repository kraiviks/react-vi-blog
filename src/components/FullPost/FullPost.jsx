import React from 'react'
import {Card, CardActions, CardContent, Link, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const FullPost = ({post}) => {


	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{post.createdAt.toDate().toDateString()}
				</Typography>
				<Typography variant="h5" component="div">
					{post.title}
				</Typography>

				<Typography variant="body2">
					{post.content}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default FullPost;