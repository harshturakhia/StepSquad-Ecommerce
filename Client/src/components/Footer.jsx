import React from 'react'
import styled from '@emotion/styled'
import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@mui/icons-material';


const Container = styled('div')({
    display: 'flex',
})

const Left = styled('div')({
    flex: 1,
    marginLeft: '16px'
})

const Logo = styled('h1')({
    // marginLeft: '10px'
})

const Desc = styled('div')({
    margin: '20px 0px',
    fontSize: '1.1rem'
})

const SocialContainer = styled('div')({
    display: "flex",
})

const SocialIcon = styled('div')({
    // fontSize: '1.2rem',
    height: '60px',
    width: '60px',
    borderRadius: "50%",
    COLOR: 'white',
    backgroundColor: `#${(props) => props.color}`,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    marginRight: "17px",
    cursor: 'pointer'
})

const Center = styled('div')({
    flex: 1,
})

const Right = styled('div')({
    flex: 1,
})

const Title = styled('h3')({
    marginBottom: '30px'
})

const List = styled('ul')({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
})

const ListItem = styled('li')({
    width: "50%",
    marginBottom: '30px',
    fontSize: '1.2rem',
    cursor: 'pointer'
})

const ContactItem = styled('div')({
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    fontSize: '1.2rem'
})


const Footer = () => {
    return (
        <Container>

            <Left>
                <Logo>HARSH</Logo>
                <Desc>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, accusantium.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>

            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                </List>
            </Center>

            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} /> 622 Dixie Path , South Tobinchester 98336
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} /> +91 88661 03895
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} /> harsh@tur.com
                </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer
