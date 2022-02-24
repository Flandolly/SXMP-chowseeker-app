import React, {useEffect} from "react";
import {APIURL} from "../config/config";

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
        <div>
            <h1>Restaurants</h1>
        </div>
    );
}

export default Home;