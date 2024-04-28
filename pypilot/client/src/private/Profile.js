import React, { useEffect, useState } from 'react'
import Header from '../Componnets/Header'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from '../Constants';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Notify from '../Componnets/Notify';
import Verifyotp from '../Public/Verifyotp';
import CircularProgress from '@mui/material/CircularProgress';
export default function Profile() {
    const [User, setUser] = useState({})
    
    const navigate = useNavigate();
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [open, setopen] = useState(false)
    const [notify, setNotify] = useState(false)

    const [msg, setmsg] = useState({
        severity: "",
        message: ""
    })

    useEffect(() => {

        const Token = localStorage.getItem("Token");
        if (Token === null) {
            navigate("/login");
        } else {
            axios.post(BACKEND_URL + "user/VerifyUser/" + Token).then((res) => {
                if (!res.data.status) {
                    localStorage.removeItem("Token");
                    navigate("/login");
                } else {
                    console.log(res.data.user)
                    setUser(res.data.user)
                }
            });
        }
    }, []);

    const score = (User.total_answered > 0) ? (User.correctly_answered / User.Questions.length)*100 : 0;

    return (
        <Box>
            <Header />
            <Container maxWidth="xs" sx={{ mt: 9 }}>
                <Card sx={{ width: 400, p: 2, display: "flex", alignItems: "center" }} >
                    <AccountCircle sx={{ fontSize: 45 }} />
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ color: "black", textAlign: "start", fontSize: 15 }} >{User.name}</Typography>
                        <Typography sx={{ color: "black", textAlign: "start", fontWeight: "bold", mt: -0.5 }} >{User.mail}</Typography>
                    </Box>

                </Card>
                <Card sx={{ mt: 2,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <Typography sx={{ textAlign: "start", color: "black", p: 2 }}>Quiz Score</Typography>
                    <Box sx={{ position: 'relative', display: 'inline-flex',mr:2 }}>
                        <CircularProgress sx={{color:"black"}} variant="determinate" />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography sx={{fontWeight:"bold",fontSize:16}} variant="caption" component="div" color="text.secondary">
                                {`${Math.round(score)}%`}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
                <Card sx={{ width: 400, p: 2, alignItems: "center", mt: 2 }} >
                    <Typography sx={{ color: "black", textAlign: "start", fontWeight: "bold", mt: -0.5 }} >Change Password</Typography>
                    <Divider />
                    <InputBase value={password} onChange={(e) => setpassword(e.target.value)} fullWidth type='password' sx={{ border: "1px solid black", borderRadius: 2, mt: 2, px: 1, py: 0.5 }} placeholder='new password' />
                    <InputBase value={cpassword} onChange={(e) => setcpassword(e.target.value)} fullWidth type='password' sx={{ border: "1px solid black", borderRadius: 2, mt: 2, px: 1, py: 0.5 }} placeholder='Confirm New Password' />
                    <Button sx={{ mt: 2 }} variant='contained' fullWidth onClick={() => {
                        if (password.length) {
                            if (password === cpassword) {
                                axios.post(BACKEND_URL + "user/sendotp", {
                                    mail: User.mail
                                }).then((res) => {
                                    setmsg({
                                        severity: "success",
                                        message: "Otp sent successfully"
                                    })
                                    setNotify(true)
                                    setopen(true)
                                })
                            } else {
                                setmsg({
                                    severity: "error",
                                    message: "password doesnt match"
                                })
                                setNotify(true)
                            }

                        } else {
                            setmsg({
                                severity: "error",
                                message: "password should not be empty"
                            })
                            setNotify(true)
                        }
                    }}>Change Password</Button>

                </Card>
                <Modal open={open} onClose={() => setopen(false)}  >
                    <Card sx={{ m: 20, backgroundColor: "white", width: 400, ml: "37%", p: 2 }}>
                        <Verifyotp setopen={setopen} mail={User.mail} password={password} from="change" />
                    </Card>
                </Modal>

                <Notify open={notify} setOpen={setNotify} severity={msg.severity} msg={msg.message} />
            </Container>
        </Box>
    )
}
