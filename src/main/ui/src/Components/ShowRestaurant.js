import React, {useEffect, useState} from "react";
import axios from "axios";
import {APIURL} from "../config/config";

function ShowRestaurant(props) {

    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        const idParam = props.match.url.split("/")
        console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
        // console.log(idParam)
        axios.get(`${APIURL}/restaurants/${idParam[2]}`)
            .then(function (response) {
                console.log(response)
                console.log();
                setRestaurant(response.data);
            })
    }, [props.match.url])

    useEffect(() => {
    }, [restaurant])

    return (
        <div>
            <div>
                <div className={"upper-main"}>
                    <h1 className={"display-4"}>{restaurant.name}</h1>
                    <h1 className={"display-6"}>{restaurant.address}</h1>
                    {restaurant.photo ? restaurant.photo : <p className={"lead"}>No photo available.</p>}
                </div>
                <div className={"lower-main"}>
                    <p><b>Serving:</b> {restaurant.foodTypes.replaceAll(":", "-")}</p>
                    <p><b>Nearby Street Location(s):</b> {restaurant.locationDescription}</p>
                </div>
                <p className={"lead"}>Map:</p>
                <iframe title={"map"} width={600} height={450} loading={"lazy"}
                        src={`https://www.google.com/maps/embed/v1/place?q=${restaurant.address.replaceAll(" ", "+")}&key=AIzaSyBLhROnrZ1PTEx7LD6CYUh4DPX1ej_twH8`}/>
            </div>
        </div>
    )
}

export default ShowRestaurant;