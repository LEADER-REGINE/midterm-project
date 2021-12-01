import '../App.css';
import { useDispatch } from 'react-redux';
import { getTheme } from '../redux/actions/uiAction';
import React, { useEffect } from 'react';
import * as Mui from '@mui/material';
import TopStudents from '../components/TopStudents';
import LoS from '../components/LoS';
import { Helmet } from "react-helmet";

const style = {
    header: {
        width: "100%",
        background: "#131414",
    },
    topStudent: {
        fontStyle: "normal",
        fontWeight: "bold",
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

        marginTop: {
            xs: "20px",
            sm: "30px",
            md: "38px",
        },
        marginBottom: {
            xs: "20px",
            sm: "30px",
            md: "38px",
        },
    },

};


function StudentList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (

        <Mui.Box sx={style.root}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Student List</title>
                <meta name="description" content="View list of students and ratings" />
                <meta name="keywords" content="Review, Ratings, Student Review, Student Ratings" />
            </Helmet>
            <Mui.Box color="background">
                <Mui.Container>
                    <Mui.Box component="label" sx={style.topStudent}>
                        Top Students
                    </Mui.Box>
                </Mui.Container>
                <TopStudents />
                <LoS />
            </Mui.Box>

        </Mui.Box >

    );
}

export default StudentList;
