import '../App.css';

import React, { useEffect, useState } from 'react';
import * as Mui from '@mui/material';
import firebase from "../config/firebase";
import { onSnapshot } from '@firebase/firestore';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { studentData } from '../pages/studentinfo';

const style = {
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

    label: {
        display: "flex",
        justifyContent: "row",
        alignItems: "center",
        marginTop: "20px",
        marginLeft: "761px"
    },

    studentLabel: {
        fontSize: "14px",
        marginRight: "100px",
        color: "#62666D",
        marginBottom: "20px",
    },

    studListPaper: {

        width: "906px",
        height: "64px",
        alignItems: "center",
        marginLeft: "324px",
        marginBottom: "12px",
        backgroundColor: "#1E1F20",
    }


};


export default function LoS() {
    const sData = studentData;
    const [filter, setFilter] = React.useState('');


    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('');

    useEffect(() => {
        const sortArray = type => {
            const types = {
                name: 'name',
                Ys: 'Ys',
                review: 'review',
            };
            const sortProperty = types[type];
            const sorted = [...studentData].sort((a, b) => b[sortProperty] - a[sortProperty]);
            console.log(sorted)
            setData(sorted);
        };
        sortArray(sortType);
    }, [sortType]);


    const handleFilter = (event) => {
        setFilter(event.target.value);
    };


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

            <Mui.Box sx={style.label}>
                <Mui.Box component="label" sx={style.studentLabel}>
                    Year & Section
                </Mui.Box>
                <Mui.Box component="label" sx={style.studentLabel}>
                    Reviews
                </Mui.Box>
                <Mui.Box component="label" sx={style.studentLabel}>
                    Ratings
                </Mui.Box>
            </Mui.Box>

            <Mui.Box sx={style.studListContainer}>

                {sData.map((data) => {
                    return (
                        <Mui.Paper sx={style.studListPaper} key={studentData.id}>
                            <Mui.Box component="label">
                                {data.id}
                            </Mui.Box>
                            <Mui.Box component="img" src={data.image}></Mui.Box>
                            <Mui.Box component="label">
                                {data.name}
                            </Mui.Box>
                            <Mui.Box component="label">
                                BSIT{data.Ys}A
                            </Mui.Box>
                            <Mui.Box component="label">
                                {data.review}
                            </Mui.Box>
                        </Mui.Paper>
                    )
                })}
            </Mui.Box>
        </Mui.Box>
    );
}

