import React from "react";
import {Container, Navbar, NavbarBrand} from "reactstrap";

function NavigationBar({setAddShowModal, setShowEditModal}) {

    return (
        <div>
            <Navbar className={"navbar-dark bg-dark"}>
                <Container>
                    <NavbarBrand href={"/"}><h4>Home</h4></NavbarBrand>
                    {window.location.pathname.includes("search") ?
                        <h4 style={{cursor: "pointer"}} onClick={() => setAddShowModal(true)}
                            className={"text-white"}>New</h4> : null}
                    {window.location.pathname.includes("restaurant") ?
                        <h4 style={{cursor: "pointer"}} onClick={() => setShowEditModal(true)}
                            className={"text-white"}>Edit</h4> : null}
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar;