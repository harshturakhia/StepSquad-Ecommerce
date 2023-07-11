import React from 'react'
import { styled } from "@mui/material";


const Container = styled('div')({
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    padding: '10px',
    fontSize: '18px',
    fontWeight: '500',
    textTransform: "uppercase",
    position : 'static',
})

const Announcement = () => {
    return (
        <Container>
            Special Offer : Use Coupon FIRST500
        </Container>
    )
}

export default Announcement
