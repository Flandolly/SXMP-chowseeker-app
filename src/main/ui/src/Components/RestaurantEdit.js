import React from "react";
import {Button, Form, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {APIURL} from "../config/config";
import axios from "axios";

function RestaurantEdit({setRestaurant, restaurant, setShowModal}) {

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        axios.put(`${APIURL}/restaurants/${restaurant.id}`, {
            ...restaurant,
            name: data.get("name"),
            address: data.get("address"),
            photo: data.get("photo"),
            foodTypes: data.get("food")
        })
            .then(function (response) {
                console.log(response.data);
                setRestaurant(response.data);
                setShowModal(false);
            })
    }

    return (
        <div>
            <ModalHeader>Edit Restaurant</ModalHeader>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <ModalBody>
                    <FormGroup>
                        <Label for={"name"}>Name</Label>
                        <Input type={"text"} name={"name"} id={"name"} defaultValue={restaurant.name}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for={"address"}>Address</Label>
                        <Input type={"text"} name={"address"} id={"name"} defaultValue={restaurant.address}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for={"photo"}>Photo URL</Label>
                        <Input type={"url"} name={"photo"} id={"photo"} defaultValue={restaurant.photo}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for={"food-types"}>Food(s) Sold (comma-separated)</Label>
                        <Input type={"text"} name={"food"} id={"food-types"}
                               defaultValue={restaurant.foodTypes}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type={"submit"} color="primary">Save</Button>
                    <Button onClick={() => setShowModal(false)} color="secondary">Cancel</Button>
                </ModalFooter>
            </Form>
        </div>
    )
}

export default RestaurantEdit;