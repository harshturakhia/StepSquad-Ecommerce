import React from 'react'
import styled from '@emotion/styled'
import {
    FavoriteBorderOutlined, ShoppingCartOutlined, SearchOutlined
} from "@mui/icons-material";


const Info = styled('div')({
    opacity: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: "3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.5s ease",
    cursor: "pointer",
})


const Container = styled('div')({
    flex: 1,
    margin: '5px',
    minWidth: '280px',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fbfd',
    position: 'relative',

    '& : hover ': {
        opacity: 1,
    }
})

const Circle = styled('div')({
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: 'white',
    position: 'absolute',
})

const Image = styled('img')({
    height: '75%',
    zIndex: 2,
})

const Icon = styled('div')({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
    transition: "all 0.5s ease",

    '& : hover ': {
        backgroundColor: '#e9f5f5',
        transform: 'scale(1.1)'
    }
})

const Product = ({ item }) => {
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <SearchOutlined />
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product
