import { Box } from "@mui/material";

const MyMessage = ({ text }) => {
    return (
        <Box sx={{
            backgroundColor: 'purple',
            color: '#FFFFFF',
            width: '90%',
            height: '60px',
            position: 'absolute',
            top: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}>
            {text}
        </Box>
    )
}

export default MyMessage