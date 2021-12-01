import * as actionTypes from "../types";

const initialState = {
    isDarkMode: false,
    lang: "en",
    userID: "1",
}

function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_THEME:
            return {
                ...state, isDarkMode: action.payload,
            };
        case actionTypes.USER_ID:
            return {
                ...state, userID: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
}

export default uiReducer;