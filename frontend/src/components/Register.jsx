import '../App.css';
import { Box } from '@mui/material';
import MyEmailTextField from './forms/MyEmailTextField';
import MyPassField from './forms/MyPassTextField'
import MyTextField from './forms/MyTextFields'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import MyButton from './forms/MyButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MyMessage from './Message';


const Register = () => {
    const navigate = useNavigate()



    const [ShowMessage, setShowMessage] = useState(false)

    const schema = yup
        .object().shape({
            first_name: yup.string().required('First Name is a required field'),
            last_name: yup.string().required('Last Name is a required field'),
            cell: yup.string()
                .required('Cell number is a required field')
                .min(10, 'Cell number must be 10 digits long')
                .matches(/[0-9]/, 'Cell number can only contain numbers'),
            email: yup.string().email('Field expects a valid email address').required('Email is a required field'),
            password: yup.string()
                .required('Password is a required field')
                .min(8, 'Password must be at least 8 characters long')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
            password2: yup.string().required('Password confirmation is a required field')
                .oneOf([yup.ref('password'), null], 'Passwords must match')
        })

    const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) })
    const submission = (data) => {
        AxiosInstance.post(`register/`, {
            first_name: data.first_name,
            last_name: data.last_name,
            cell: data.cell,
            email: data.email,
            password: data.password,
        })

            .then((response) => {
                setShowMessage(true);
                setTimeout(() => {
                    navigate('/');
                }, 4000);
            })
            .catch((error) => {
                console.error('Registration error', error);
            });
    }

    return (
        <div className={"myBackground"}>
            {ShowMessage ? <MyMessage text={"You have successfully been registered. You will be directed to the login page."} /> : null}
            <form onSubmit={handleSubmit(submission)}>
                <Box sx={{ width: '50%' }} className={"whiteBox"}>
                    <Box className={"itemBox"}>
                        <Box className={"title"}>User Registration</Box>
                    </Box>

                    <Box className={"itemBox"}>
                        <MyTextField
                            className="myForm"
                            label="First Name"
                            name="first_name"
                            control={control}

                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyTextField
                            label="Last name"
                            name="last_name"
                            control={control}
                            className="myForm"
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyTextField
                            label="Cell"
                            name="cell"
                            control={control}
                            className="myForm"
                        />
                    </Box>

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
                        <MyPassField
                            label={"Confirm password"}
                            name={"password2"}
                            control={control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyButton
                            label={"Register"}
                            type={"submit"}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <Link to='/'>Already Registered? Please login!</Link>
                    </Box>

                </Box>
            </form>
        </div>
    )

}

export default Register;