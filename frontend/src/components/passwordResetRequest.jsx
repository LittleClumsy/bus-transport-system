import '../App.css';
import { Box } from '@mui/material';
import MyEmailTextField from './forms/MyEmailTextField';
import { useForm } from 'react-hook-form';
import MyButton from './forms/MyButton';
import { useState } from 'react';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import MyMessage from './Message';

const PasswordResetRequest = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm()

    const [ShowMessage, setShowMessage] = useState(false)

    const submission = (data) => {
        AxiosInstance.post(`api/password_reset/`, {
            email: data.email
        })
            .then((response) => {
                setShowMessage(true)
            })
    }
    return (
        <div className="myBackground">
            {ShowMessage ? <MyMessage text={"If your email exists, a Password Reset email would have been sent"} /> : null}
            <form onSubmit={handleSubmit(submission)} className="whiteBox">


                <Box className="title">Request Password Reset</Box>

                <Box className={"itemBox"}>
                    <MyEmailTextField
                        label={"Email"}
                        name={"email"}
                        control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyButton
                        label={"Request password reset"}
                        type={"submit"}
                    />
                </Box>

                <Box className="itemBox" sx={{ flexDirection: 'column' }}>

                </Box>
            </form>
        </div>
    )
}

export default PasswordResetRequest