import {
	Dialog,
	DialogTitle,
	TextField,
	Button,
	DialogContent,
	FormControl,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {useState} from "react";
import { addDoc, collection,} from "firebase/firestore";
import db from '../firebase';

const DialogAddItem = ({openDialogAddItem, closeDialogAddItem, user}) => {

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleTitle = (e) => {
		setTitle(e.target.value)
	}
	const handleContent = (e) => {
		setContent(e.target.value)
	}

	const addPost = async () => {
		await addDoc(collection(db, 'posts'),
			{
				title,
				content,
				createdAt: new Date(),
			}
		)
		closeDialogAddItem();
		setTitle('');
		setContent('');
	}

	return (
		<Dialog open={openDialogAddItem} onClose={closeDialogAddItem}>
			<DialogTitle>Добавьте новый пост</DialogTitle>
			<DialogContent>
				<FormControl>
					<TextField
						fullWidth
						label="Title"
						id="fullWidth"
						sx={{mt: 3}}
						onChange={handleTitle}
						value={title}
					/>
					<TextField
						id="outlined-multiline-static"
						label="Text content"
						multiline
						rows={10}
						sx={{
							width: 250,
							minWidth: {xs: 250, md: 500},
							mt: 3,
							mb: 3,
						}}
						onChange={handleContent}
						value={content}
					/>
					{/* <label for="input-image">Выберите изображение:</label>
						<input type="file" name="input-image" id="input-image"/> */}
				</FormControl>
				<Button
					variant="contained"
					endIcon={<SendIcon/>}
					sx={{mt: 3}}
					onClick={addPost}
				>
					Add
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default DialogAddItem;
