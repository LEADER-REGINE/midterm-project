import '../App.css';

import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StudentList from '../pages/StudentList';
import StudentEvaluation from '../pages/StudentEvaluation';
import Blog from '../pages/Blog';
import { useSelector } from 'react-redux';


export default function RouterComponent() {
    const ui = useSelector((state) => state.ui);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#1e1f20',
                dark: '#84A0C6',
                light: '#2D539E',
            },
            secondary: {
                main: '#80b2bd',
            },
            text: {
                primary: '#33374C',
                secondary: '#2D539E',
                disabled: '#ADB1C4',
            },
            error: {
                main: '#FC7374',
            },
            background: {
                paper: '#C6C8D1',
                default: '#161821',
            },
        },

        typography: {
            fontFamily: 'Inconsolata',
        },
    })

    const lightTheme = createTheme({
        palette: {
            primary: {
                main: '#33374C',
            },
            secondary: {
                main: '#2D539E',
            },
            text: {
                primary: '#33374C',
                secondary: '#2D539E',
                disabled: '#ADB1C4',
            },
            error: {
                main: '#FC7374',
            },
            background: {
                paper: '#f9fbfd',
                default: '#E8E9EC',
            },
        },

        typography: {
            fontFamily: 'Lato',
        },
    })
    return (
        <ThemeProvider theme={ui.isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Router>
                <Switch >
                    <Route exact component={StudentList} path="/studentlist" />
                    <Route component={StudentEvaluation} path="/studentevaluation" />
                    <Route component={Blog} path="/blog" />
                </Switch >
            </Router>
        </ThemeProvider>
    );
}

