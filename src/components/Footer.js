import React from 'react';
import {

    Box,
    Grid,
    Typography,
    Divider,
    SvgIcon

} from '@mui/material'


import { ReactComponent as Vector1 } from "../assets/svg/vector1.svg"
import { ReactComponent as Vector2 } from "../assets/svg/vector2.svg"
import { ReactComponent as Vector3 } from "../assets/svg/vector3.svg"

const style = {

    root: {
        background: "#131414",
        marginTop:5,
    },



    colContainer: {
        
        display: "flex",
        justifyContent: "center",
   

    },

    info: {
        fontWeight: "light",
        padding: .5,
        fontSize: {
            xs: ".75rem",
            sm: "1rem",
            md: "1.25rem",
        },
        letterSpacing: "0.0625rem",
        color:" #62666D"

    },
    infoColor: {
        fontWeight: "light",
        padding: .5,
        fontSize: {
            xs: ".75rem",
            sm: "1rem",
            md: "1.25rem",
        },
        letterSpacing: "0.0625rem",
        color: "#26CE8D",

    },

    vectorStyle: {
        color: theme => theme.palette.secondary.main,

        color: "#26CE8D",
        marginLeft: "1rem",
        padding: 0,



    },
    footerStyle: {
        padding: 0,

        display: "flex",
    }
};

export default function Footer() {

    return (

        <Box sx={style.root}>

            <Box sx={style.footerStyle}>
                <Grid container >
                    <Grid item xs={12}>

                        <Box sx={style.info}>
                            <Box sm item sx={style.colContainer}>
                                <Typography sx={style.vectorStyle}> <Vector1 /></Typography>
                                <Typography  sx={style.vectorStyle}>  <Vector2 /></Typography >
                                <Typography  sx={style.vectorStyle}> <Vector3 /></Typography>
                            </Box>


                            <Box sx={style.colContainer}>
                                <Typography sx={style.info} color="textPrimary">Contact us: </Typography>
                                <Typography sx={style.infoColor} color="textPrimary">support @studentreview.com</Typography>
                            </Box>
                            <Box sx={style.colContainer}>
                                <Typography sx={style.info} color="textPrimary">© 2021 Student Review. All Rights Reserved.</Typography>
                            </Box>
                            <Box sx={style.colContainer}>
                                <Typography sx={style.infoColor} color="textPrimary">
                                    Terms of Service
                                </Typography>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <Typography sx={style.infoColor} color="textPrimary">
                                    Privacy Policy
                                </Typography>

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </Box>


    )
}



