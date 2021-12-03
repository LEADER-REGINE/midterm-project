import "../App.css";
import { useDispatch } from "react-redux";
import { getTheme, getID } from "../redux/actions/uiAction";
import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import StudentProfile from "../components/StudentProfile";
import { Helmet } from "react-helmet";
import firebase from "../config/firebase";
import { borderRadius } from "@mui/system";
import Rating from "@mui/material/Rating";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import RatingCom from "../components/Rating";
const style = {
    root: {
        width: "100%",
        background: "#131414",
        alignItems : "center",
    },
  header: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#131414",
  },

  

  sortContainer: {
    marginTop: "57px",
    marginLeft: "900px",
    display: "flex",
    justifyContent: "row",
  },

  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: {
      xs: "500px",
      sm: "700px",
      md: "926px",
    },
    height: {
      xs: "120px",
      sm: "210px",
      md: "324px",
    },
    backgroundColor: "#1E1F20",

  },

  avatarCont: {
    width: {
      xs: "50px",
      sm: "70px",
      md: "110px",
    },

    height: {
      xs: "50px",
      sm: "70px",
      md: "110px",
    },
    border: "2px solid #FFFFFF",
    borderRadius: "10px",
    margin: {
      xs: "5px 0px",
      sm: "15px 0px",
      md: "20px 0px",
    },
  },

  filledStars: {
    color: "#26CE8D",
    fontSize: {
      xs: "10px",
      sm: "20px",
      md: "30px",
    },
  },

  emptyStars: {
    color: "#2C2F31",

    fontSize:{
    xs: "10px",
    sm: "20px",
    md: "30px",
    },
  },

  bg:{
      backgroundColor: "white",

  },
};

function StudentEvaluation() {
  const value = 3;

  const dispatch = useDispatch();

  var uid = localStorage.getItem("userID");

  useEffect(() => {
    dispatch(getID());
  }, [dispatch]);

  const db = firebase.firestore();
  const [studProfile, setstudProfile] = useState({
    profile: [],
  });

  const fetchList = async () => {
    const studRef = await db.collection("students").doc(uid);
    let studentProfile = [];
    studRef.get().then((doc) => {
      studentProfile.push(doc.data());
      setstudProfile({ profile: studentProfile });
    });
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Mui.Box sx={style.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Student Evaluation</title>
        <meta
          name="description"
          content="View in-depth student review details and evaluate students"
        />
        <meta
          name="keywords"
          content="Review, Ratings, Student Review, Student Ratings"
        />
      </Helmet>
      <Mui.Box >
        <Mui.Container >
          <Mui.Paper elevation="5" sx={style.profileContainer}>
            {studProfile &&
              studProfile.profile.map((studProfile) => {
                return (
                  <Mui.Box
                    display="flex"
                    flexDirection="row"
                    sx={{ padding: 10 }}
                  >
                    <Mui.Box>
                      <Mui.Avatar variant="square" sx={style.avatarCont}>
                        {studProfile.profileImg}
                      </Mui.Avatar>
                      <Rating
                        name="text-feedback"
                        value={value}
                        readOnly
                        precision={0.5}
                        icon={<StarRoundedIcon sx={style.filledStars} />}
                        emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                      />
                      <Mui.Box display="flex" flexDirection="row">
                        <Mui.Typography>
                          Overall Rating: {studProfile.ovrall_rating}.0
                        </Mui.Typography>
                        <Mui.Typography>
                          Reviews: {studProfile.reviews}
                        </Mui.Typography>
                      </Mui.Box>
                    </Mui.Box>
                    <Mui.Box>
                      <Mui.Typography>{studProfile.fullname}</Mui.Typography>
                    </Mui.Box>
                  </Mui.Box>
                );
              })}
          </Mui.Paper>
        </Mui.Container>
        <Mui.Box color="background">
                <RatingCom/>
            </Mui.Box>
      </Mui.Box>
    </Mui.Box>
  );
}

export default StudentEvaluation;
