import '../App.css';

import React, { useEffect, useState } from 'react';
import * as Mui from '@mui/material';
import firebase from "../config/firebase";
import { onSnapshot } from '@firebase/firestore';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { studentData } from '../pages/studentinfo';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme, getID } from '../redux/actions/uiAction';
import { setID } from '../redux/actions/uiAction';

const style = {
    studentImage: {
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

    sortContainer: {
        marginTop: "57px",
        marginLeft: "650px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "@media only screen and (max-width : 720px)": {

            marginLeft: "15px"

        }

    },

    sort: {
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        fontWeight: 500,
        fontSize: "12px",
        color: "#D1D4C9",

    },

    filter: {
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        fontWeight: 500,
        fontSize: "12px",
        color: "#D1D4C9",
        marginLeft: "10px",
        "@media only screen and (max-width : 720px)": {
            marginLeft: "0px"

        }
    },

    formControl: {
        margin: (theme) => theme.spacing(1),
        minWidth: 120,

    },

    dropDown: {
        border: "1px solid #303336",
        boxSizing: "border-box",
        borderRadius: "8px",
        fontSize: "12px",
        color: "#D1D4C9",
    },


    studentLabel: {
        fontSize: "14px",

        color: "#62666D",
        marginBottom: "20px",
    },

    studListPaper: {

        display: "flex",
        flexDirection: "column",
        marginBottom: "12px",
        backgroundColor: "#1E1F20",
    },
    studListDetails: {
        float: "right",
    },
    studImg: {
        padding: "25px",
    },
    studDetails: {
        padding: "25px",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
    },

    studsubDetails: {
        paddingLeft: "25px",
        paddingRight: "25px",
    },

    details: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },

};


export default function LoS() {
    const sData = studentData;
    const [filter, setFilter] = useState('');


    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('');

    const db = firebase.firestore();
    const [studlist, setstudlist] = useState({
        list: [],
    })


    const fetchList = async () => {
        const studRef = db.collection('students');
        const data = await studRef.get();
        let studentList = [];
        data.docs.forEach(onSnapshot => {
            studentList.push(onSnapshot.data())
            setstudlist({ list: studentList });
        })
    }
    useEffect(() => {
        fetchList();
    }, [])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
        dispatch(getID());
    }, [dispatch]);


    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    function setUID(uid) {
        dispatch(setID(uid));
    }

    return (
        <Mui.Box sx={style.header}>

            <Mui.Box sx={style.sortContainer}>
                <Mui.Box component="label" sx={style.sort}>
                    Sort By :
                    <Mui.Box>
                        <FormControl sx={style.formControl} size="small">
                            <Select onChange={(e) => setSortType(e.target.value)} sx={style.dropDown}>
                                <MenuItem value="Most Recent">
                                    Most Recent
                                </MenuItem>
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="Ys">Year & Section</MenuItem>
                                <MenuItem value="review">Reviews</MenuItem>
                            </Select>
                        </FormControl>
                    </Mui.Box>
                </Mui.Box>
                <Mui.Typography sx={style.filter}>
                    Filter :
                    <Mui.Box>
                        <FormControl sx={style.formControl} size="small">
                            <Select value={filter} onChange={handleFilter} sx={style.dropDown}>
                                <MenuItem value="No Filter">
                                    No Filter
                                </MenuItem>
                                <MenuItem value="Name">Name</MenuItem>
                                <MenuItem value="Ys">Year & Section</MenuItem>
                                <MenuItem value="Reviews">Reviews</MenuItem>
                            </Select>
                        </FormControl>
                    </Mui.Box>
                </Mui.Typography>
            </Mui.Box>

            <Mui.Container>
                <Mui.Box sx={style.details} >

                    <Mui.Box>
                        <Mui.Typography>
                            Year & Section
                        </Mui.Typography>
                    </Mui.Box>
                    <Mui.Box >
                        <Mui.Typography>
                            Reviews
                        </Mui.Typography>
                    </Mui.Box>
                    <Mui.Box>
                        <Mui.Typography>
                            Ratings
                        </Mui.Typography>
                    </Mui.Box>
                </Mui.Box>

                <Mui.Box sx={style.studListContainer}>
                    {studlist && studlist.list.map((studlist) => {
                        return (
                            <Mui.Container>

                                <Mui.Paper sx={style.studListPaper} key={studlist.id}>
                                    <Link
                                        style={{ textDecoration: 'none', color: "white" }}
                                        onClick={() => setUID(studlist.id)}
                                        to={{
                                            pathname: "/evaluation",
                                            state: { uid: studlist.id }
                                        }}
                                    >
                                        <Mui.Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }} >
                                            <Mui.Box sx={style.studImg}>
                                                <Mui.Avatar src={studlist.profileImg} variant="square" alt="Profile Image" />
                                            </Mui.Box>
                                            <Mui.Box>
                                                <Mui.Typography>
                                                    {studlist.fullname}
                                                </Mui.Typography>
                                            </Mui.Box>
                                            <Mui.Box sx={style.studDetails}>
                                                <Mui.Box sx={style.studsubDetails}>
                                                    <Mui.Typography>
                                                        {studlist.course}
                                                    </Mui.Typography>
                                                </Mui.Box>
                                                <Mui.Box sx={style.studsubDetails}>
                                                    <Mui.Typography>
                                                        {studlist.reviews}
                                                    </Mui.Typography>
                                                </Mui.Box>
                                                <Mui.Box sx={style.studsubDetails}>
                                                    <Mui.Typography>
                                                        {studlist.ovrall_rating}
                                                    </Mui.Typography>
                                                </Mui.Box>
                                            </Mui.Box>
                                        </Mui.Box>
                                    </Link>
                                </Mui.Paper>
                            </Mui.Container>
                        )
                    })}
                </Mui.Box>
            </Mui.Container>

        </Mui.Box >
    );
}

