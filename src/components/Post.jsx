import React from 'react'

import { Card, CardActions, CardContent, Link, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";


const Post = ({title, content, createdAt, id}) => {
	const count = 500;
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{createdAt ? createdAt.toDate().toDateString() : null}

				</Typography>
				<Typography variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2">
					{content ? content.slice(0, count) + "..." : null}
				</Typography>
			</CardContent>
			<CardActions>
				<Link component={NavLink} to={`/react-aniviks/post/${id}`}>Learn More</Link>
			</CardActions>
		</Card>
	)
}

export default Post;


