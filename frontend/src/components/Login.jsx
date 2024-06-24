import '../App.css';
import { Box } from '@mui/material';
import MyEmailTextField from './forms/MyEmailTextField';
import MyPassField from './forms/MyPassTextField';
import { useForm } from 'react-hook-form';
import MyButton from './forms/MyButton';
import { Link } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import MyMessage from './Message';
import { React, useState } from 'react';
import { useAuth } from './AuthContext';


const Login = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm()
    const [ShowMessage, setShowMessage] = useState(false)
    const { setUser } = useAuth();

    const submission = (data) => {
        AxiosInstance.post(`login/`, {
            email: data.email,
            password: data.password,
        })

            .then((response) => {
                console.log(response)
                localStorage.setItem('Token', response.data.token)
                setUser(response.data.user)
                navigate(`/home`)
                console.log('User:', response.data.user)
            })
            .catch((error) => {
                setShowMessage(true)
                console.error('Error during login', error)
            })
    }

    return (
        <div className="myBackground">
            {ShowMessage ? <MyMessage text={"Login failed, please try again, or reset your password."} /> : null}
            <form onSubmit={handleSubmit(submission)} className="whiteBox">
                <Box className="title">Login for App</Box>

                <Box className={"itemBox"}>
                    <MyEmailTextField
                        label={"Email"}
                        name={"email"}
                        control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyPassField
                        label={"Password"}
                        name={"password"}
                        control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyButton
                        label={"Login"}
                        type={"submit"}
                    />
                </Box>

                <Box className="itemBox" sx={{ flexDirection: 'column' }}>
                    <Link to='/register'>No account yet? Register Now!</Link>
                    <Link to='/request/password_reset'>Forgot Password?</Link>
                </Box>
            </form>
        </div>
    );
}

export default Login;