import * as React from 'react';
import Box from '@mui/material/Box';
import firebase from "../config/firebase";
import { TextField, Typography, Button, IconButton, Avatar, Card, CardHeader, CardContent, CardActions, Collapse, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ReplyIcon from '@mui/icons-material/Reply';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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
    expand: {
        color: "#62666D",
      
    },
    expandTextinfo:{
        marginLeft:"5px",
        fontSize: {
            xs: "11px",
            sm: "11.5px",
            md: "14px",
          }
    },
    commentInfo:{
        color: "#D1D4C9",
        fontWeight: "500",
        fontSize: {
            xs: "11px",
            sm: "12.5px",
            md: "14px",
          }
    }
}
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
                xs: "flex", md: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
                backgroundColor: "#131414"
            },
        }}>
            {commentsList &&
                commentsList.list.map((commentsList) => {
                    return (
                        <Card sx={{
                            width: { xs: "90%", md: "926px" },
                            margin: { xs: "20px 0px" },
                            marginBottom: "24px",
                            bgcolor: "#1E1F20",
                            border: "1px solid #303336",
                            boxShadow: 4,
                        }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{}} aria-label="recipe" src={commentsList.profileImg}>
                                    </Avatar>
                                }
                             
                                title={commentsList.email }
                                subheader="Time Posted"
                              style={style.commentInfo}
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
                                    onClick={handleExpandClick}
                                    sx={style.expand}
                                >
                                    < ChatBubbleOutlineIcon  sx={style.expandTextinfo}/>
                                    <Typography  sx={style.expandTextinfo} >comment</Typography>
                                    < ErrorOutlineIcon  sx={style.expandTextinfo}/>
                                    <Typography  sx={style.expandTextinfo} >Report</Typography>
                                </ExpandMore>

                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Card sx={{ background: "#2C2F31", padding: "20px" }}>
                                        <CardActions sx={{ color: "#62666D" }}>
                                            <ReplyIcon />
                                            <Typography sx={{ marginLeft: "12px" }}>Add your comment</Typography>
                                        </CardActions>
                                        <CardActions >
                                            <TextField
                                                type="text"
                                                name="commentBody"
                                                sx={{ width: "100%" }}
                                            />
                                            <Button sx={{ height: "44px", backgroundColor: "#26CE8D", width: "143px", color: "#fff", marginLeft: "16px" }}>
                                                <Typography sx={{ fontSize: "14px" }}>
                                                    Submit
                                                </Typography>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            marginTop: 20,
                                        }}
                                    >
                                        {/* <Button onClick={() => handleComment()}>Comment</Button> */}
                                    </div>
                                </CardContent>
                            </Collapse>
                        </Card>
                    );
                })}
        </Box>
    );
}