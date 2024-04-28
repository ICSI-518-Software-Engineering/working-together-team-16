import { Card, Divider, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Verifyotp from './Verifyotp';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { BACKEND_URL } from '../Constants';
import Header from './Header';
import Notify from '../Componnets/Notify';
import backgroundimage from "../background.png"
import Box from '@mui/material/Box';

export default function ForgotPassword() {
    const [Email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [Err, setErr] = useState("")
    const [open, setopen] = useState(false)
    const navigate = useNavigate()

    const [notify, setNotify] = useState(false)

    const [msg, setmsg] = useState({
        severity: "",
        message: ""
    })
    return (
        <div>
            <Header from="f" />
            <Box sx={{backgroundImage:`url(${backgroundimage})`,height:"93vh"}}>
            <Container sx={{ alignItems: "center", justifyContent: "center", width: "100vh", height: "60vh", display: "flex" }}>
                <Card variant='outlined' sx={{ display: "flex", flexDirection: "column", width: 370, pb: 3, pt: 1, opacity: 0.8, p: 2 }}>
                    <Typography variant='h5' sx={{ textAlign: "start" }} >Forgot Password</Typography>
                    <InputBase value={Email} onChange={(e) => setEmail(e.target.value)} sx={{ border: "1px solid black", px: 1, py: 0.5, mt: 2, borderRadius: 1 }} placeholder='Email' />
                    <InputBase value={password} onChange={(e) => setpassword(e.target.value)} type='password' sx={{ border: "1px solid black", px: 1, py: 0.5, mt: 2, borderRadius: 1 }} placeholder='New Password' />
                    <Button fullWidth variant='contained' sx={{ mt: 2 }} onClick={() => {
                        axios.get(BACKEND_URL+"user/checkmail/"+Email).then((res)=>{
                            console.log(res.data)
                            if (res.data.value){

                                axios.post(BACKEND_URL + "user/sendotp", {
                                    mail: Email
                                }).then((res) => {
                                    setmsg({
                                        severity:"success",
                                        message:"Otp sent successfully"
                                    })
                                    setNotify(true)
                                    setopen(true)
                                })
                            }else{
                                setmsg({
                                    severity:"error",
                                    message:"Mail Not Found"
                                })
                                setNotify(true)
                            }
                        })
                        
                    }} >Reset</Button>
                </Card>

                <Modal open={open} onClose={() => setopen(false)}  >
                    <Card sx={{ m: 20, backgroundColor: "white", width: 400, ml: "37%", p: 2 }}>
                        <Verifyotp setopen={setopen} mail={Email} password={password} from="change" />
                    </Card>
                </Modal>
                <Notify open={notify} setOpen={setNotify} severity={msg.severity} msg={msg.message} />
            </Container>
            </Box>
        </div>
    )
}
