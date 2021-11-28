import '../App.css';
import { useDispatch } from 'react-redux';
import { getTheme } from '../redux/actions/uiAction';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import * as Mui from '@mui/material';
import { studentData } from './studentinfo';


const style = {

header : {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#131414",
    },

 topStudent : {
    position: "static",
    width: "107px",
    height: "20px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "18px",
    lineHeight: "20px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    flex: "none",
    order: "0",
    flexGrow: "0",
    marginLeft: "230px",
    marginTop : "38px",
 },

 studentContainer : {
    display: "flex",
    flexDirection: "row",
    justifyContent : "space-between",
    marginLeft: "236px",
    marginRight: "236px",
    flexWrap: "wrap",
    
    "@media only screen and (max-width : 720px)": {
        flexDirection: "column",
        justifyContent : "center",


    }

 },

 studentPaper : {
    height : "111px",
    width : "201px",
    marginRight : "30px",
    backgroundColor : "#1E1F20",
    display: "flex",
    alignItems: "flex-start",
    position: "static",
    marginTop :"20px",
    border : "1px solid #303336",
     
    "@media only screen and (max-width : 720px)": {
        marginTop :"20px",
    }
    
 },
 studentImage : {
    marginTop : "19.67px",
    marginLeft : "16.67px",
    marginBottom : "48.67px",
    marginRight: "6.67px",
    height: "42.67px",
    width : "42.67px",
    borderRadius : "5px",
    border : "2px solid #303336",
 }, 
 studentName : {
    position: "static",
    
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    marginTop : "21px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#D1D4C9",
    
    
 },
 studentReview : {
    position: "static",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "20px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#62666D",
    marginTop : "41px",
    marginLeft : "-58px"
   
    
 },

 reviewContainer : {
     marginTop : "76.88px",
     marginLeft : "-67.5px",
 },
 review : {
     marginLeft : "5px"
 }

};


function StudentList() {

    const dispatch = useDispatch();
    const sData = studentData

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Mui.Box>
            <Navbar />
            <Mui.Box sx = {style.header}>
                <Mui.Box component = "label" sx ={style.topStudent}>
                    Top Students
                </Mui.Box>
                <Mui.Box sx= {style.studentContainer}>
                {sData.map((data) => {
                    return (
                        <Mui.Paper sx={style.studentPaper} elevation = "10">
                            <Mui.Box component = "img" src = {data.image} sx={style.studentImage}></Mui.Box>
                            <Mui.Box component = "label" sx={style.studentName}>{data.name}</Mui.Box>
                            <Mui.Box component = "label" sx={style.studentReview}>{data.review}</Mui.Box>
                            <Mui.Box sx = {style.reviewContainer}>
                            <Mui.Box component = "img" src = {data.starsGreen} sx={style.review}></Mui.Box>
                            <Mui.Box component = "img" src = {data.starsGreen} sx={style.review}></Mui.Box>
                            <Mui.Box component = "img" src = {data.starsGreen} sx={style.review}></Mui.Box>
                            <Mui.Box component = "img" src = {data.starsblank} sx={style.review}></Mui.Box>
                            <Mui.Box component = "img" src = {data.starsblank} sx={style.review}></Mui.Box>
                            </Mui.Box>
                            
                           
                        </Mui.Paper>
                    )
                })}
                </Mui.Box>
            </Mui.Box>
        </Mui.Box>



    );
}

export default StudentList;
