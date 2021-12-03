import * as React from 'react';
import Box from '@mui/material/Box';

import firebase from "../config/firebase";
import { Container, Paper, Typography, Button } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CommentIcon from '@mui/icons-material/Comment';

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
            <Container>
                {commentsList &&
                    commentsList.list.map((commentsList) => {
                        return (
                            <Paper>
                                <Typography>{commentsList.email}</Typography>
                                <Typography>{commentsList.review}</Typography>
                                <Typography>{commentsList.final_rating}</Typography>
                                <Box>
                                    <Button>
                                        <CommentIcon />
                                        <Typography>Reply</Typography>
                                    </Button>
                                </Box>
                                <Box>
                                    <Button>
                                        <PriorityHighIcon />
                                        <Typography>Report</Typography>
                                    </Button>
                                </Box>

                            </Paper>
                        );
                    })}
            </Container>
        </Box>
    );


}