import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const Container = styled("div")({
    flex: 1,
    margin: '3px',
    height: '70vh',
    position: 'relative',
})

const Image = styled("img")({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
})

const Info = styled("div")({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

})

const Title = styled("h1")({
    color: "white",
    marginBottom: "20px",
})

const Button = styled("button")({
    border: "none",
    padding: "10px",
    backgroundColor: "white",
    color: "gray",
    cursor: "pointer",
    fontWeight: 600,
})



const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
                <Image src={item.img} />
                <Info>
                    <Title> {item.title} </Title>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link>

        </Container>
    )
}

export default CategoryItem
