import * as React from 'react';
import Box from '@mui/material/Box';

import firebase from "../config/firebase";
import { Paper, Typography } from '@mui/material';


export default function CommentSection() {
    const db = firebase.firestore();
    const [commentsList, setcommentsList] = React.useState({
        list: [],
    })
    var uid = localStorage.getItem("userID");

    const fetchComments = async () => {
        const commentsRef = db.collection('students').doc(uid).collection("comments");
        const data = await commentsRef.get();
        let commentsData = [];
        data.docs.forEach(onSnapshot => {
            commentsData.push(onSnapshot.data())
            setcommentsList({ list: commentsData });
        })
    }
    React.useEffect(() => {
        fetchComments();
    }, [])


    return (
        <Box>
            <Paper>
                <Typography> Test</Typography>
            </Paper>
        </Box>
    );


}