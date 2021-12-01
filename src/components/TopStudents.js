import '../App.css';

import React, { useEffect, useState } from 'react';
import * as Mui from '@mui/material';
import firebase from "../config/firebase";
import { onSnapshot } from '@firebase/firestore';


const style = {

    studentContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        "@media only screen and (max-width : 720px)": {
            flexDirection: "column",
        }

    },

    studentPaper: {
        height: {
            xs: "70px",
            sm: "81px",
            md: "111px",
        },
        width: {
            xs: "160px",
            sm: "171px",
            md: "201px",
        },
        margin: {
            xs: "10px",
            sm: "15px",
            md: "20px",
        },

        backgroundColor: "#1E1F20",
        display: "flex",
        alignItems: "flex-start",
        position: "static",
        border: "1px solid #303336",

        "@media only screen and (max-width : 720px)": {
            marginTop: "10px",


        }

    },
    studentImage: {
        marginTop: "19.67px",
        marginLeft: "16.67px",
        marginBottom: "48.67px",
        marginRight: "6.67px",
        height: {
            xs: "30px",
            sm: "38px",
            md: "42.67px",
        },
        width: {
            xs: "30px",
            sm: "38px",
            md: "42.67px",
        },
        borderRadius: "5px",
        border: "2px solid #303336",
    },
    reviewContainer: {
        display: "flex",
        flexDirection: "column",

    },
    studentName: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: {
            xs: "10px",
            sm: "12px",
            md: "14px",
        },
        marginTop: "21px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        color: "#D1D4C9",
        marginRight: "6.67px"
    },
    studentReview: {
        fontFamily: "Roboto",
        fontSize: {
            xs: "10px",
            sm: "12px",
            md: "14px",
        },
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        color: "#62666D",
    },
};


export default function TopStudents() {
    const db = firebase.firestore();
    const [studlist, setstudlist] = useState({
        list: [],
    })

    const fetchList = async () => {
        const studRef = db.collection('students');
        const data = await studRef.limit(4).get();
        let studentList = [];
        data.docs.forEach(onSnapshot => {
            studentList.push(onSnapshot.data())
            console.log(onSnapshot.data());
            setstudlist({ list: studentList });
        })
    }
    useEffect(() => {
        fetchList();
    }, [])


    return (
        <Mui.Container>
            <Mui.Box sx={style.studentContainer}>
                {
                    studlist && studlist.list.map((studlist) => {
                        return (

                            <Mui.Paper sx={style.studentPaper} elevation="10" key={studlist.fullname}>
                                <Mui.Box component="img" src={studlist.profileImg} sx={style.studentImage}></Mui.Box>
                                <Mui.Box sx={style.reviewContainer}>
                                    <Mui.Box component="label" sx={style.studentName}>{studlist.fullname}</Mui.Box>
                                    <Mui.Box component="label" sx={style.studentReview}>{studlist.reviews} reviews</Mui.Box>
                                </Mui.Box>
                            </Mui.Paper>
                        )
                    })
                }
            </Mui.Box>
        </Mui.Container>
    );
}

