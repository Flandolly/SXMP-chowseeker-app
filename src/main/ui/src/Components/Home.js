import React, {useEffect} from "react";
import {APIURL} from "../config/config";
import {Button, FormGroup, Input} from "reactstrap";

function Home() {

    const axios = require("axios");

    useEffect(() => {
        axios.get(`${APIURL}/restaurants`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            })
    });

    return (
        <div className={"container-fluid d-flex"}>
            <div className={"d-flex flex-column vh-100 w-100 justify-content-center"}>
                <h1 className={"text-center d-inline"}>Chowseeker</h1>
                <h5 className={"text-center"}>Find Your Favorite SF Food Trucks!</h5>
                <FormGroup>
                    <Input className={"w-75 mx-auto"} type={"search"} name={"search"} placeholder={"Search..."}/>
                </FormGroup>
                <Button className={"w-25 mx-auto my-2"} type={"submit"} name={"submitSearch"} color={"primary"}>Submit</Button>
            </div>
        </div>
    );
}

export default Home;