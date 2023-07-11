import React from 'react'
import { styled } from "@mui/material";
import { useState } from 'react';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

import { sliderItems } from "../data";
// import { mobile } from "../responsive";


const Container = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
})

const Arrow = styled('div')({
    width: '50px',
    height: '50px',
    backgroundColor: ' #fff7f7',
    borderRadius: '50%',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: `${props => props.direction === 'left' && '10px'}`,
    right: `${props => props.direction === 'right' && '10px'}`,
    margin: 'auto',
    cursor: 'pointer',
    opacity: 0.6,
    zIndex: 2,
})

const Wrapper = styled('div')({
    height: "100%",
    display: 'flex',
    transition: 'all 1.5s ease',
    // transform: translateX('${(props) => props.slideIndex * -100}'vw)
    transform: `translateX(${(props) => props.slideIndex * -100}vw)`
})

const Slide = styled('div')({

    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    // backgroundColor: "#${ (props) => props.bg };"
    backgroundColor: `#${(props) => props.bg}`
})

const ImgContainer = styled('div')({
    height: '100%',
    flex: 1,
})


const Image = styled('img')({
    height: '80%'
})


const InfoContainer = styled('div')({
    flex: 1,
    padding: "50px",
})


const Title = styled('h1')({
    fontSize: "70px",
})


const Desc = styled('p')({
    margin: "50px 0px",
    fontSize: "20px",
    fontWeight: 500,
    letterSpacing: "3px",
})


const Button = styled('button')({
    padding: "10px",
    fontSize: "20px",
    backgroundColor: "transparent",
    cursor: "pointer,"
})


const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

    return (
        <Container>

            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlinedIcon />
            </Arrow>

            <Wrapper slideIndex={slideIndex}>

                {sliderItems.map((item) => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>
                ))}

            </Wrapper>

            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlinedIcon />
            </Arrow>

        </Container>
    )
}

export default Slider
