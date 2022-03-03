import React, {useEffect, useState} from "react";
import axios from "axios";
import {APIURL} from "../config/config";

function ShowRestaurant(props) {

    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        const idParam = props.match.url.split("/")
        // console.log(idParam)
        axios.get(`${APIURL}/restaurants/${idParam[2]}`)
            .then(function (response) {
                console.log(response)
                setRestaurant(response.data);
            })
    }, [props.match.url])

    useEffect(() => {
        console.log("Got restaurant.")
    }, [restaurant])

    return (
        <div>
            <div>
                <h1 className={"display-3"}>{restaurant.name}</h1>
                <h1 className={"display-3"}>{restaurant.address}</h1>
            </div>
        </div>
    )
}

export default ShowRestaurant;