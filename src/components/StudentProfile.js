import * as React from 'react';


import firebase from "../config/firebase";
import { Box, Typography } from '@mui/material';


export default function StudentProfile() {
    const db = firebase.firestore();
    const [studProfile, setstudProfile] = React.useState({
        profile: [],
    })
    var UID = "1EsDTohAZbXnyL4NcY65";
    const fetchList = async () => {
        const studRef = db.collection('students').doc(UID);
        let studentProfile = [];
        studRef.get().then(doc => {
            studentProfile.push(doc.data())
            console.log(doc.data());
            setstudProfile({ profile: studentProfile });
        })
    }
    React.useEffect(() => {
        fetchList();
    }, [])
    return (
        <Box>
            {
                studProfile && studProfile.profile.map((studProfile) => {
                    return (
                        <Typography>{studProfile.fullname}</Typography>
                    )
                })
            }

        </Box>
    );
}