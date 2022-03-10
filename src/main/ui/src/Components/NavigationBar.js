import React from "react";
import {Container, Navbar, NavbarBrand} from "reactstrap";

function NavigationBar({setShowAddModal, setShowEditModal, setShowDeleteModal}) {

    return (
        <div>
            <Navbar className={"navbar-dark bg-danger"}>
                <Container>
                    <NavbarBrand href={"/"}><h4>Home</h4></NavbarBrand>
                    {window.location.pathname.includes("search") ?
                        <h4 style={{cursor: "pointer"}} onClick={() => setShowAddModal(true)}
                            className={"text-white"}>New</h4> : null}
                    {window.location.pathname.includes("restaurant") ?
                        <div>
                            <h4 style={{cursor: "pointer"}} onClick={() => setShowEditModal(true)}
                                className={"text-white d-inline me-4"}>Edit</h4>
                            <h4 style={{cursor: "pointer"}} onClick={() => setShowDeleteModal(true)}
                                className={"text-danger d-inline ms-4"}>Delete</h4>
                        </div>
                        : null}
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar;