import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import firebase from "../config/firebase";
import { Box } from '@mui/material';


export default function StudentTable() {
    const db = firebase.firestore();
    const [studlist, setstudlist] = React.useState({
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
    React.useEffect(() => {
        fetchList();
    }, [])
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Year and Section</TableCell>
                            <TableCell align="right">Reviews</TableCell>
                            <TableCell align="right">Rating</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            studlist && studlist.list.map((studlist) => {
                                return (
                                    <TableRow
                                        key={studlist.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={() => console.log("hello")}
                                    >
                                        <TableCell component="th" scope="row" >
                                            {studlist.fullname}
                                        </TableCell>
                                        <TableCell align="right">{studlist.course}</TableCell>
                                        <TableCell align="right">{studlist.reviews}</TableCell>
                                        <TableCell align="right">{studlist.ovrall_rating}</TableCell>
                                    </TableRow>
                                )
                            })
                        }


                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}