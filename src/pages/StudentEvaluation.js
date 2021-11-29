import '../App.css';
import { useDispatch } from 'react-redux';
import { getTheme } from '../redux/actions/uiAction';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import * as Mui from '@mui/material';

function StudentEvaluation() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Mui.Box>
            <Navbar />
            <h1>StudentEvaluation</h1>
        </Mui.Box>



    );
}

export default StudentEvaluation;
