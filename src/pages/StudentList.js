import "../App.css";
import { useDispatch } from "react-redux";
import { getTheme, getID } from "../redux/actions/uiAction";
import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import TopStudents from "../components/TopStudents";
import LoS from "../components/LoS";
import { Helmet } from "react-helmet";

const style = {
  root: {
    width: "100%",
    background: "#131414",
  },
  topStudent: {
    fontStyle: "normal",
    fontWeight: "bold",
    color: "#D1D4C9",
    fontSize: {
      xs: "10px",
      sm: "14px",
      md: "18px",
    },

    marginLeft: {
      md: "80px",
      lg: "128.6px",
    },

    // background: "#131414",
    display: "flex",
    alignItems: "center",
    textAlign: "center",

    paddingTop: "38px",
    paddingBottom: "0px",
  },
};

function StudentList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
    dispatch(getID());
  }, [dispatch]);

  return (
    <Mui.Box sx={style.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Student List</title>
        <meta name="description" content="View list of students and ratings" />
        <meta
          name="keywords"
          content="Review, Ratings, Student Review, Student Ratings"
        />
      </Helmet>
      <Mui.Box color="background">
        <Mui.Container>
          <Mui.Box component="label" sx={style.topStudent}>
            Top Students
          </Mui.Box>
        </Mui.Container>
        <TopStudents />
        <LoS />
      </Mui.Box>
    </Mui.Box>
  );
}

export default StudentList;
