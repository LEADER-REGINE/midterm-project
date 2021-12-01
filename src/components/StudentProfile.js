import * as React from 'react';

import firebase from "../config/firebase";
import { Box, Typography } from '@mui/material';


export default function StudentProfile(props) {
    const db = firebase.firestore();
    const [studProfile, setstudProfile] = React.useState({
        profile: [],
    })
    console.log(props.id);
    var UID = props.id;
    const fetchList = async () => {
        const studRef = db.collection('students').doc(UID);
        let studentProfile = [];
        studRef.get().then(doc => {
            studentProfile.push(doc.data())
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