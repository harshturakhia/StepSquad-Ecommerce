import React from 'react'
import styled from '@emotion/styled'
import Send from '@mui/icons-material/Send';

const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30vh',
    width: '100%',
    flexDirection: 'column',
    padding: '10% 0 10% 0',
})

const Heading = styled('h1')({
    fontSize: '60px',
    marginBottom: '20px',
    textAlign: 'center',
})


const Desc = styled('div')({
    fontSize: "24px",
    fontWeight: 300,
    marginBottom: "20px",
})


const InputContainer = styled("div")({
    width: "50%",
    height: "40px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space - between",
    border: "1px solid lightgray",
})

const Input = styled("input")({
    border: 'none',
    flex: 8,
    paddingLeft: '20px',
    fontSize: '19px'
})


const Button = styled("button")({
    flex: 1,
    border: 'none',
    backgroundColor: 'teal',
    color: "white",
})


const Newsletter = () => {
    return (
        <Container>
            <Heading>Newsletter</Heading>

            <Desc>Get timely updates about our new product!</Desc>

            <InputContainer>
                <Input placeholder="Your email" />
                <Button>
                    <Send />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter;
