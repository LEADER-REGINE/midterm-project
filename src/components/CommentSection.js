import * as React from 'react';
import Box from '@mui/material/Box';

import firebase from "../config/firebase";
import { Container, Paper, Typography, Button, IconButton, Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CommentIcon from '@mui/icons-material/Comment';


import { styled } from '@mui/material/styles';


import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Rating from "@mui/material/Rating";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { shadows } from '@mui/system';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const style = {
    rofilledStars: {
        color: "#26CE8D",
        fontSize: {
            xs: "8px",
            sm: "16px",
            md: "30px",
        },
    },

    roemptyStars: {
        color: "#2C2F31",

        fontSize: {
            xs: "8px",
            sm: "16px",
            md: "30px",
        },
    },

    redfilledStars: {
        color: "#E03E65;",
        fontSize: {
            xs: "8px",
            sm: "16px",
            md: "30px",
        },
    },

}



// const CustomizedTitle = styled(Title)`
//   color: #D1D4C9;

// `;

export default function CommentSection() {
    const db = firebase.firestore();
    const [commentsList, setcommentsList] = React.useState({
        list: [],
    })
    var uid = localStorage.getItem("userID");

    const fetchComments = async () => {
        const commentsRef = db.collection('students').doc(uid).collection("comments");
        const data = await commentsRef.orderBy("timestamp", "desc").get();
        let commentsData = [];
        data.docs.forEach((onSnapshot) => {
            commentsData.push(onSnapshot.data())
            setcommentsList({ list: commentsData });
        })

    }
    React.useEffect(() => {
        fetchComments();
    }, [])

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{
            flexGrow: 5,
            display: {
                xs: "none", md: "flex",

                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
            },

        }}>
            {/* <Container>
                {commentsList &&
                    commentsList.list.map((commentsList) => {
                        return (
                            <Paper key={commentsList.id}>
                                <Box>
                                    <Avatar variant="square" src={commentsList.img} />

                                </Box>
                                <Typography>{commentsList.email}</Typography>
                                <Typography>{commentsList.final_rating}</Typography>
                                <Typography>{commentsList.review}</Typography>
                                <Box>
                                    <Button>
                                        <CommentIcon />
                                        <Typography>Reply</Typography>
                                    </Button>
                                    <Button>
                                        <PriorityHighIcon />
                                        <Typography>Report</Typography>
                                    </Button>
                                </Box>


                            </Paper>
                        );
                    })}
            </Container> */}
            {commentsList &&
                commentsList.list.map((commentsList) => {
                    return (
                        <Card
                            key={commentsList.id}
                            sx={{
                                width: "926px",
                                marginBottom: "24px",
                                bgcolor: "#1E1F20",
                                border: "1px solid #303336",
                                boxShadow: 4,
                            }}>

                            <CardHeader
                                avatar={
                                    <Avatar sx={{}} aria-label="recipe">

                                    </Avatar>
                                }


                                title={commentsList.email}

                                subheader="Time Posted"
                            />




                            <Rating
                                icon={<StarRoundedIcon sx={style.rofilledStars} />}
                                emptyIcon={<StarRoundedIcon sx={style.roemptyStars} />}
                                value={commentsList.final_rating}
                                sx={{ marginLeft: "60px" }}
                                readOnly
                            />

                            <CardContent
                                sx={{ marginLeft: "52px" }}>
                                <Typography variant="body2" color="#D1D4C9">
                                    {commentsList.review}
                                </Typography>
                            </CardContent>
                            <CardActions >

                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ChatBubbleOutlineIcon sx={{ color: "#62666D", marginRight: "12px" }} />
                                    <Typography variant="body2" color="#62666D">
                                        Comment
                                    </Typography>
                                </ExpandMore>

                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ReportGmailerrorredOutlinedIcon sx={{ color: "#62666D", marginRight: "12px" }} />
                                    <Typography variant="body2" color="#62666D">
                                        Report
                                    </Typography>
                                </ExpandMore>

                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>

                                </CardContent>
                            </Collapse>

                        </Card>
                    );
                })}
        </Box>
    );


}