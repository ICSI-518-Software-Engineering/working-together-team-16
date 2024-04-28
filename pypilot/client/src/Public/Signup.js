import { Card, Divider, Typography, Box } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Verifyotp from './Verifyotp';
import axios from 'axios';
import { BACKEND_URL } from '../Constants';
import Header from './Header';
import Notify from '../Componnets/Notify';

import backgroundimage from "../background.png"


export default function Signup() {

    const [Email, setEmail] = useState("")
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [Err, setErr] = useState("")
    const [open, setopen] = useState(false)
    const [cpassword, setcpassword] = useState("")
    const [notify, setNotify] = useState(false)

    const [msg, setmsg] = useState({
        severity: "",
        message: ""
    })



    const navigate = useNavigate()

    return (
        <div>
            <Header />
            <Box sx={{ backgroundImage: `url(${backgroundimage})`, height: "93vh" }}>
                <Container sx={{ alignItems: "center", justifyContent: "center", width: "100vh", height: "60vh", display: "flex" }}>
                    <Card variant='outlined' sx={{ display: "flex", flexDirection: "column", width: 370, pb: 3, pt: 1, opacity: 0.8, p: 2 }}>
                        <Typography variant='h5' sx={{ textAlign: "start" }} >Signup</Typography>
                        <InputBase value={name} onChange={(e) => setname(e.target.value)} sx={{ border: "1px solid black", px: 1, py: 0.5, mt: 2, borderRadius: 1 }} placeholder='Full Name' />
                        <InputBase value={Email} onChange={(e) => setEmail(e.target.value)} sx={{ border: "1px solid black", px: 1, py: 0.5, mt: 2, borderRadius: 1 }} placeholder='Email' />
                        <InputBase value={password} onChange={(e) => setpassword(e.target.value)} type='password' sx={{ border: "1px solid black", px: 1, py: 0.5, mt: 2, borderRadius: 1 }} placeholder='Password' />
                        <InputBase value={cpassword} onChange={(e) => setcpassword(e.target.value)} type='password' sx={{ border: "1px solid black", px: 1, py: 0.5, mt: 2, borderRadius: 1 }} placeholder='Confirm Password' />
                        {/* <Typography sx={{ fontWeight: "bold", color: "blue", textAlign: "start", mt: 2 }}> <Link style={{ textDecoration: "none" }} to="/sign-up">Forgot Password?</Link></Typography> */}
                        <Button fullWidth variant='contained' sx={{ mt: 2 }} onClick={() => {
                            if (password !== "" && password === cpassword) {
                                axios.get(BACKEND_URL + "user/checkmail/" + Email).then((res) => {
                                    console.log(res.data)
                                    if (!res.data.value) {
                                        axios.post(BACKEND_URL + "user/createuser", {
                                            name: name,
                                            mail: Email,
                                            password: password,
                                        }).then((res) => {
                                            axios.post(BACKEND_URL + "user/sendotp", {
                                                mail: Email
                                            }).then((res) => {
                                                setmsg({
                                                    severity: "success",
                                                    message: "OTP send successfully"
                                                })
                                                setNotify(true)
                                                setopen(true)
                                                console.log(res)
                                            }).catch((err) => {
                                                console.log(err)
                                            })
                                            console.log(res)
                                        }).catch((err) => {
                                            console.log(err)
                                        })
                                    } else {
                                        setmsg({
                                            severity: "error",
                                            message: "user already registered "
                                        })
                                        setNotify(true)
                                    }
                                })
                            } else {
                                setmsg({
                                    severity: "error",
                                    message: "check password and confirm password"
                                })
                                setNotify(true)
                            }

                        }} >Signup</Button>
                        <Typography sx={{ fontWeight: "bold", color: "blue", textAlign: "center", mt: 2 }}>Already have an Account? <Link style={{ textDecoration: "none" }} to="/login">Login</Link></Typography>
                    </Card>
                    <Modal open={open} onClose={() => setopen(false)}  >
                        <Card sx={{ m: 20, backgroundColor: "white", width: 400, ml: "37%", p: 2 }}>
                            <Verifyotp setopen={setopen} mail={Email} />
                        </Card>
                    </Modal>
                    <Notify open={notify} setOpen={setNotify} severity={msg.severity} msg={msg.message} />
                </Container>
            </Box>
        </div>
    )
}
