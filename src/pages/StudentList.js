import '../App.css';
import { useDispatch } from 'react-redux';
import { getTheme } from '../redux/actions/uiAction';
import React, { useEffect } from 'react';
import * as Mui from '@mui/material';
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
