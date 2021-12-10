import "../App.css";

import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import firebase from "../config/firebase";
import { onSnapshot } from "@firebase/firestore";
import Rating from "@mui/material/Rating";
import StarRoundedIcon from "@mui/icons-material/StarRounded";


const style = {
  studentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "#131414",
    justifyContent: "center",
   
    "@media only screen and (max-width : 720px)": {
      justifyContent: "center",
      
      
     
    },
  },

  studentPaper: {
    height: {
      xs: "70px",
      sm: "81px",
      md: "111px",
    },
    width: {
      xs: "160px",
      sm: "171px",
      md: "201px",
    },
    marginRight: {
      xs: "5px",
      sm: "10px",
      md: "15px",
    },
    marginLeft: {
      xs: "5px",
      sm: "10px",
      md: "15px",
    },
    marginTop : "20px",
    borderRadius:"8px",

    backgroundColor: "#1E1F20",
    display: "flex",
    alignItems: "flex-start",
    border: "1px solid #303336",

    "@media only screen and (max-width : 720px)": {
      marginTop: "10px",
    },
  },
  studentImage: {
    marginTop: "19.67px",
    marginLeft: "16.67px",
    marginBottom: "48.67px",
    marginRight: "6.67px",
    height: {
      xs: "30px",
      sm: "38px",
      md: "42.67px",
    },
    width: {
      xs: "30px",
      sm: "38px",
      md: "42.67px",
    },
    borderRadius: "5px",
    border: "2px solid #303336",
  },
  reviewContainer: {
    display: "flex",
    flexDirection: "column",
  },
  studentName: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "14px",
    },
    marginTop: "21px",
    display: "flex",
    alignItems: "center",
    color: "#D1D4C9",
    marginRight: "6.67px",
  },
  studentReview: {
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "14px",
    },
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#62666D",
  },
  filledStars: {
    color: "#26CE8D",
    fontSize: {
      xs: "10px",
      sm: "20px",
      md: "18px",
    },
  },

  emptyStars: {
    color: "#2C2F31",

    fontSize: {
      xs: "10px",
      sm: "20px",
      md: "18px",
    },
  },
  Rating : {
    marginTop : "15.88px"
  },
};

export default function TopStudents() {
  const db = firebase.firestore();
  const [studlist, setstudlist] = useState({
    list: [],
  });

  const fetchList = async () => {
    const studRef = db.collection("students");
    const data = await studRef.limit(4).get();
    let studentList = [];
    data.docs.forEach((onSnapshot) => {
      studentList.push(onSnapshot.data());
      setstudlist({ list: studentList });
    });
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Mui.Container sx={style.container}>
      <Mui.Box sx={style.studentContainer}>
        {studlist &&
          studlist.list.map((studlist) => {
            return (
              <Mui.Paper
                sx={style.studentPaper}
                elevation="10"
                key={studlist.id}
              >
                <Mui.Box
                  component="img"
                  src={studlist.profileImg}
                  sx={style.studentImage}
                ></Mui.Box>
                <Mui.Box sx={style.reviewContainer}>
                  <Mui.Box component="label" sx={style.studentName}>
                    {studlist.fullname}
                  </Mui.Box>
                  <Mui.Box component="label" sx={style.studentReview}>
                    {studlist.reviews} reviews
                  </Mui.Box>
                  <Mui.Box>

                  <Rating
                        name="text-feedback"
                        value={studlist.ovrall_rating}
                        readOnly
                        precision={0.5}
                        icon={<StarRoundedIcon sx={style.filledStars} />}
                        emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                        sx={style.Rating}
                      />
                  </Mui.Box>
                </Mui.Box>
              </Mui.Paper>
            );
          })}
      </Mui.Box>
    </Mui.Container>
  );
}
