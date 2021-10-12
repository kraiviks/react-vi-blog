import React, {useState} from 'react'
import {Card, CardActions, CardContent, IconButton, TextField, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from '../firebase';
import {useHistory, useParams} from 'react-router-dom';
const FullPost = ({data, user}) => {
	const { id } = useParams();
	const history = useHistory();

	const post = data.find(p => p.id === id);

	const [updateTitle, setUpdatetitle] = useState(post ? post.title : '')
	const [updateContent, setUpdateContent] = useState(post ? post.content : '')
	const [handleEdit, setHandleEdit] = useState(false)

	const postRef = doc(db, "posts", id);

	const handleTitle = (e) => {
		setUpdatetitle(e.target.value)
	}
	const handleContent = (e) => {
		setUpdateContent(e.target.value)
	}

	const saveEditPost = async () => {
		await updateDoc(postRef, {
			content: updateContent,
			title: updateTitle
		});
		console.log('update')
		return history.push('/posts');

	}

	const deletePost = async () => {
		history.push('/posts');
		await deleteDoc(doc(db, "posts", id));
	}


	return (
		<Card sx={{minWidth: 275}}>
			<CardContent sx={{display: 'flex', flexDirection: "column", rowGap: '10px'}}>
				{handleEdit ?
					(
						<>
							<TextField id="outlined-basic" label="Edit Title" variant="outlined" value={updateTitle} onChange={handleTitle}/>
							<TextField id="outlined-basic" label="Edit Content" variant="outlined" value={updateContent} onChange={handleContent}/>
						</>
					)
					: (
						<>
							<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
								{post ? post.createdAt.toDate().toDateString() : null}
							</Typography>
							<Typography variant="h5" component="div">
								{post ? post.title : null}
							</Typography>
							<Typography variant="body2">
								{post ? post.content : null}
							</Typography>
						</>
					)
				}



			</CardContent>
			{user && handleEdit ? (
					<CardActions>
						<IconButton onClick={saveEditPost}>
							<SaveIcon/>
						</IconButton>
						<IconButton onClick={deletePost}>
							<DeleteIcon/>
						</IconButton>
					</CardActions>

			) : (
				<CardActions>
					<IconButton onClick={()=>setHandleEdit(true)}>
						<EditIcon/>
					</IconButton>
					<IconButton onClick={deletePost}>
						<DeleteIcon/>
					</IconButton>
				</CardActions>
			)}
		</Card>
	)
}

export default FullPost;