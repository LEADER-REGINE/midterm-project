import '../App.css';
import { useDispatch } from 'react-redux';
import { getTheme, getID } from '../redux/actions/uiAction';
import React, { useEffect, useState } from 'react';
import * as Mui from '@mui/material';
import StudentProfile from "../components/StudentProfile";
import { Helmet } from "react-helmet";
import firebase from "../config/firebase";


const style = {

    header: {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "#131414",
    },

    topStudent: {
        position: "static",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: {
            xs: "10px",
            sm: "14px",
            md: "18px",
        },
        lineHeight: "20px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        flex: "none",
        order: "0",
        flexGrow: "0",
        marginLeft: {
            xs: "100px",
            sm: "200px",
            md: "310px",
        },
        marginTop: {
            xs: "20px",
            sm: "30px",
            md: "38px",
        },
    },

    sortContainer: {
        marginTop: "57px",
        marginLeft: "900px",
        display: "flex",
        justifyContent: "row",
    },


};



function StudentEvaluation() {
    const dispatch = useDispatch();

    var uid = localStorage.getItem("userID");

    useEffect(() => {
        dispatch(getID());
    }, [dispatch]);

    const db = firebase.firestore();
    const [studProfile, setstudProfile] = useState({
        profile: [],
    })

    const fetchList = async () => {
        const studRef = await db.collection('students').doc(uid);
        let studentProfile = [];
        studRef.get().then(doc => {
            studentProfile.push(doc.data());
            setstudProfile({ profile: studentProfile });
        })
    }
    useEffect(() => {
        fetchList();
    }, [])

    return (
        <Mui.Box>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Student Evaluation</title>
                <meta name="description" content="View in-depth student review details and evaluate students" />
                <meta name="keywords" content="Review, Ratings, Student Review, Student Ratings" />
            </Helmet>
            <Mui.Box>
                <Mui.Container>
                    <Mui.Paper elevation="5" >
                        {
                            studProfile && studProfile.profile.map((studProfile) => {
                                return (
                                    <Mui.Box display="flex" flexDirection="row" sx={{ padding: 10, }}>
                                        <Mui.Box>
                                            <Mui.Avatar variant="square" sx={{ width: 256, height: 256 }}>{studProfile.profileImg}</Mui.Avatar>
                                            <Mui.Box display="flex" flexDirection="row" >
                                                <Mui.Typography>Overall Rating: {studProfile.ovrall_rating}.0</Mui.Typography>
                                                <Mui.Typography>Reviews: {studProfile.reviews}</Mui.Typography>
                                            </Mui.Box>
                                        </Mui.Box>
                                        <Mui.Box>
                                            <Mui.Typography>{studProfile.fullname}</Mui.Typography>
                                        </Mui.Box>
                                    </Mui.Box>
                                )
                            })
                        }
                    </Mui.Paper>

                </Mui.Container>

            </Mui.Box>


        </Mui.Box>
    );
}

export default StudentEvaluation;
