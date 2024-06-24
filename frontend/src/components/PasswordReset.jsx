import '../App.css';
import { Box } from '@mui/material';
import MyPassField from './forms/MyPassTextField';
import { useForm } from 'react-hook-form';
import MyButton from './forms/MyButton';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import MyMessage from './Message';

const PasswordReset = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            password: "",
            password2: "",
        }
    });
    const { token } = useParams()
    console.log(token)
    const [ShowMessage, setShowMessage] = useState(false)

    const submission = (data) => {
        AxiosInstance.post(`api/password_reset/confirm/`, {
            password: data.password,
            token: token,
        })

            .then((response) => {
                setShowMessage(true);
                setTimeout(() => {
                    navigate('/');
                }, 4000);
            })
    }
    return (
        <div className="myBackground">
            {ShowMessage ? <MyMessage text={"Your password has successfully been reset. You will be directed to the login page soon."} /> : null}
            <form onSubmit={handleSubmit(submission)} className="whiteBox">


                <Box className="title">Reset Password</Box>

                <Box className={"itemBox"}>
                    <MyPassField
                        label={"Password"}
                        name={"password"}
                        control={control}
                        value={value}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyPassField
                        label={"Confirm password"}
                        name={"password2"}
                        control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyButton
                        label={"Reset password"}
                        type={"submit"}
                    />
                </Box>

                <Box className="itemBox" sx={{ flexDirection: 'column' }}>

                </Box>
            </form>
        </div>
    )
}

export default PasswordReset