import '../App.css';
import { useDispatch } from 'react-redux';
import { getTheme } from '../redux/actions/uiAction';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import * as Mui from '@mui/material';

function StudentList() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Mui.Box>
            <Navbar />
        </Mui.Box>



    );
}

export default StudentList;
