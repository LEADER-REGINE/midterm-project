import '../App.css';
import { useDispatch } from 'react-redux';
import { getTheme } from '../redux/actions/uiAction';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import * as Mui from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { studentData } from './studentinfo';
import Footer from "../components/Footer"

import firebase from "../config/firebase";
import { onSnapshot } from '@firebase/firestore';
import TopStudents from '../components/TopStudents';
import LoS from '../components/LoS';

const style = {
    header: {
        width: "100%",
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
    studentContainer: {
        display: "flex",
        flexDirection: "row",
        marginLeft: {
            xs: "115px",
            sm: "200px",
            md: "324px",
        },
        flexWrap: "wrap",
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
        marginRight: "30px",
        backgroundColor: "#1E1F20",
        display: "flex",
        alignItems: "flex-start",
        position: "static",
        marginTop: "20px",
        border: "1px solid #303336",

        "@media only screen and (max-width : 720px)": {
            marginTop: "10px",
        }

    },
};


function StudentList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Mui.Box sx={style.root}>
            <Mui.Box color="background">
                <Mui.Box component="label" sx={style.topStudent}>
                    Top Students
                </Mui.Box>
                <TopStudents />
                <LoS />
            </Mui.Box>

        </Mui.Box >

    );
}

export default StudentList;
