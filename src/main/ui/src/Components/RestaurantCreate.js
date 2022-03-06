import React from "react";
import {Button, Form, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from "axios";
import {APIURL} from "../config/config";
import {useHistory} from "react-router-dom";


function RestaurantCreate({setShowModal}) {

    const hist = useHistory();

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newRestaurant = {
            name: data.get("name"),
            address: data.get("address"),
            photo: data.get("photo"),
            foodTypes: data.get("food")
        }

        axios.post(`${APIURL}/restaurants`, newRestaurant)
            .then(function (response) {
                hist.push(`/restaurant/${response.data.id}`)
            })
    }


    return (
        <div>
            <ModalHeader>Add New Restaurant</ModalHeader>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <ModalBody>
                    <FormGroup>
                        <Label for={"name"}>Name</Label>
                        <Input type={"text"} name={"name"} id={"name"} placeholder={"ex. Chowseeker"}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for={"address"}>Address</Label>
                        <Input type={"text"} name={"address"} id={"name"} placeholder={"ex. 300 Lucky St"}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for={"photo"}>Photo URL</Label>
                        <Input type={"url"} name={"photo"} id={"photo"} placeholder={"Enter valid URL"}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for={"food-types"}>Food(s) Sold</Label>
                        <Input type={"text"} name={"food"} id={"food-types"}
                               placeholder={"ex. Noodles, Burgers, Dessert"}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type={"submit"} color="primary">Add</Button>
                    <Button onClick={() => setShowModal(false)} color="secondary">Cancel</Button>
                </ModalFooter>
            </Form>
        </div>
    )
}

export default RestaurantCreate;