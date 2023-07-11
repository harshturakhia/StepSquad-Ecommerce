import React from 'react'

import { styled } from "@mui/material";
import { Search, Badge } from '@mui/icons-material'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';


const Container = styled("div")({
    height: '60px',
})


const Wrapper = styled("div")({
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

const Left = styled('div')({
    flex: "1",
    display: 'flex',
    alignItems: 'center',
})

const Language = styled('span')({
    cursor: 'pointer',
    fontSize: '15px'
})


const SearchContainer = styled('div')({
    border: '2px solid lightgray',
    marginLeft: "25px",
    padding: "10px",
    display: 'flex',
    widtht : '20%',
    alignItems: 'center'
})

const Input = styled('input')({
    border: "none"
})

const Center = styled('div')({
    flex: '1',
    textAlign: 'center',
})

const Right = styled('div')({
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
})

const Logo = styled("h1")({
    fontWeight: "bold",
})

const MenuItem = styled('div')({
    fontSize: '18px',
    cursor: "pointer",
    marginLeft: '25px'
})

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>

                    <Language>EN</Language>

                    <SearchContainer>
                        <Input />
                        <Search style={{ color: "gray", fontSize: '16px' }} />
                    </SearchContainer>

                </Left>

                <Center>
                    <Logo>
                        HumanWear
                    </Logo>
                </Center>
                <Right>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Log In</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color='primary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>

                </Right>


            </Wrapper>
        </Container>
    )
}

export default Navbar
