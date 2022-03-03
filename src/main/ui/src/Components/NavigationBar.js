import React from "react";
import {Container, Navbar, NavbarBrand} from "reactstrap";

function NavigationBar() {
    return (
        <div>
            <Navbar className={"navbar-dark bg-dark"}>
                <Container>
                    <NavbarBrand href={"/"}>Home</NavbarBrand>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar;