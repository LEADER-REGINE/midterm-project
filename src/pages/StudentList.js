import '../App.css';
import { useDispatch } from 'react-redux';
import { getTheme } from '../redux/actions/uiAction';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import * as Mui from '@mui/material';
import StudentTable from '../components/StudentTable';
import TopStudents from '../components/TopStudents';

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


function StudentList() {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Mui.Box>
            <Mui.Box sx={style.header}>
                <Mui.Box component="label" sx={style.topStudent}>
                    Top Students
                </Mui.Box>
                <TopStudents />
                <Mui.Box>
                    <StudentTable />
                </Mui.Box>
            </Mui.Box>

        </Mui.Box>
    );
}

export default StudentList;
