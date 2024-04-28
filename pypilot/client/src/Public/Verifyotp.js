import React, { useState } from 'react'
import { Card, Divider, Typography, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../Constants';
import Notify from '../Componnets/Notify';

export default function Verifyotp({ setopen, mail, from, password }) {
    const [otp, setopt] = useState("")
    const navigate = useNavigate()
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant='h5' sx={{ textAlign: "start" }} >Verify Otp</Typography>
                <IconButton onClick={() => setopen(false)} >
                    <CloseIcon />
                </IconButton>
            </Box>
            <InputBase fullWidth value={otp} onChange={(e) => setopt(e.target.value)} sx={{ border: "1px solid black", px: 1, py: 0.5, mt: 2, borderRadius: 1 }} placeholder='Otp' />
            <Button fullWidth variant='contained' sx={{ mt: 2 }} onClick={() => {
                axios.get(BACKEND_URL + "user/checkotp/" + mail + "/" + otp).then((res) => {
                    if (res.data.verified) {
                        if (from === "change") {
                                axios.post(BACKEND_URL+"user/updatepassword",{
                                    mail:mail,
                                    password:password
                                }).then((res)=>{
                                    console.log(res)
                                    navigate("/")
                                }).catch(err=>{
                                    console.log(err)
                                })
                        } else {
                            localStorage.setItem("Token", res.data.Token)
                            navigate("/")
                        }
                    } else {
                        console.log("invalid otp")
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }} >Verifyotp</Button>
        </Box>
    )
}
