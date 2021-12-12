import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Grid, TextField, Typography, Box } from "@mui/material"

export default function Pagination() {


    const style = {

        container: {
            display: 'flex',
            justifyContent:"center",
            padding:"15px",
            margin: "auto",
            background: "#131414",

        },
        pagesStyle: {
            padding: "5px",
            color: "#D1D4C9",
            fontWeight: "300",
            fontSize: "14px",
            padding: "1px",
            marginLeft:"3px",
            justifyContent:"center",
            fontSize: {
                xs: "10px",
                sm: "12px",
                md: "14px"
            },



        },
 
        numberBoxStyle: {
            color: "#D1D4C9",
            fontWeight: "300",
            fontSize: "12px",
            background: "#090807",
            padding: "1px",
            

            border: "1px solid #303336",
            boxSizing: "borderBox",
            borderRadius: "4px",
            height: {
                xs: "28px",
                sm: "30px",
                md: "32px"
            },
            width: {
                xs: "40px",
                sm: "40px",
                md: "43px"
            }
            
        },
        buttonStyle:{
            height: {
                xs: "28px",
                sm: "30px",
                md: "32px"
            },
            width: {
                xs: "27px",
                sm: "30px",
                md: "35px"
            }
        }

    }

    return (
        <Grid item xs={4} sx={style.container}>
            <Button variant="outlined" sx={style.buttonStyle} startIcon={< ArrowBackIcon  sx={{ color: "#2C2F31" }} />} />
            <Typography sx={style.pagesStyle}>Pages</Typography>
            <Box type="number" placeholder="1" sx={style.numberBoxStyle}><Typography sx={style.pagesStyle}>1</Typography></Box>
            <Typography sx={style.pagesStyle}>of </Typography>
            <Typography sx={style.pagesStyle}>100 </Typography>

            <Button variant="outlined"  sx={style.buttonStyle} endIcon={< ArrowForwardIcon sx={{ color: "#D1D4C9" }} />} />

        </Grid>
    );
}