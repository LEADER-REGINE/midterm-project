import * as actionTypes from "../types";

export const toggleTheme = (isDarkMode) => async (dispatch) => {
    try {
        localStorage.setItem("isDarkMode", isDarkMode);
        dispatch({ type: actionTypes.SET_THEME, payload: isDarkMode });

    } catch (err) {
        console.error(err);
    }
};

export const getTheme = () => async (dispatch) => {
    try {
        const isDarkMode = localStorage.getItem("isDarkMode") === "true" ? true : false;
        dispatch({ type: actionTypes.SET_THEME, payload: isDarkMode });

    } catch (err) {
        console.error(err);
    }
};

export const getID = () => async (dispatch) => {
    try {
        const uid = localStorage.getItem("userID");
        dispatch({ type: actionTypes.USER_ID, payload: uid });

    } catch (err) {
        console.error(err);
    }
};


export const setID = (userID) => async (dispatch) => {
    try {
        localStorage.setItem("userID", userID);
        dispatch({ type: actionTypes.USER_ID, payload: userID });

    } catch (err) {
        console.error(err);
    }
};