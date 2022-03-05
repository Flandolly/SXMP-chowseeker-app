import React, {useEffect, useState} from "react";
import axios from "axios";
import {APIURL} from "../config/config";

function ShowRestaurant(props) {

    const [restaurant, setRestaurant] = useState({});
    const [rateLiked, setRateLiked] = useState("");
    const [rateDisliked, setRateDisliked] = useState("");

    useEffect(() => {
        const idParam = props.match.url.split("/")
        // console.log(idParam)
        axios.get(`${APIURL}/restaurants/${idParam[2]}`)
            .then(function (response) {
                console.log(response);
                setRestaurant(response.data);
            })
    }, [props.match.url])

    useEffect(() => {
    }, [restaurant])

    useEffect(() => {
        setRateDisliked(localStorage.getItem("dislikedRestaurant"));
        setRateLiked(localStorage.getItem("likedRestaurant"));
    }, [])

    useEffect(() => {
        localStorage.setItem("likedRestaurant", rateLiked);
        localStorage.setItem("dislikedRestaurant", rateDisliked);
    }, [rateLiked, rateDisliked])

    function handleRatingButton(rating) {
        localStorage.setItem("ratedRestaurant", "true");
        if (rating === "like") {
            localStorage.setItem("likedRestaurant", "true");
            localStorage.setItem("dislikedRestaurant", "false");
            setRateLiked("true");
            setRateDisliked("false");
        }
        else {
            localStorage.setItem("dislikedRestaurant", "true");
            localStorage.setItem("likedRestaurant", "false");
            setRateLiked("false");
            setRateDisliked("true");
        }
    }

    if (restaurant.address !== undefined) {
        return (
            <div>
                <div>
                    <div className={"title"}>
                        <h1 className={"display-4 d-inline"}>{restaurant.name}</h1>
                        <img className={"mx-2"} alt={"Like button (unrated)"} onClick={() => handleRatingButton("like")} style={{display: localStorage.getItem("likedRestaurant") === "false" ? "inline" : "none"}} src="https://img.icons8.com/ios-glyphs/30/000000/thumb-up--v1.png"/>
                        <img className={"mx-2"} alt={"Like button (rated)"} style={{display: localStorage.getItem("likedRestaurant") === "true" ? "inline" : "none"}} src="https://img.icons8.com/ios-glyphs/30/26e07f/thumb-up--v1.png"/>
                        {restaurant.likes}
                        <img className={"mx-2"} alt={"Dislike button (unrated)"} onClick={() => handleRatingButton("dislike")} style={{display: localStorage.getItem("dislikedRestaurant") === "false" ? "inline" : "none"}} src="https://img.icons8.com/ios-glyphs/30/000000/thumbs-down.png"/>
                        <img className={"mx-2"} alt={"Dislike button (rated)"} style={{display: localStorage.getItem("dislikedRestaurant") === "true" ? "inline" : "none"}} src="https://img.icons8.com/ios-glyphs/30/fa314a/thumbs-down.png"/>
                        {restaurant.dislikes}
                        {/*<span className={"mx-2"}> {rateLiked ? "Thanks for rating!" : null}</span>*/}
                    </div>
                    <div className={"upper-main"}>

                        <h1 className={"display-6"}>{restaurant.address}</h1>
                        {restaurant.photo ? restaurant.photo : <p className={"lead"}>No photo available.</p>}
                    </div>
                    <div className={"lower-main"}>
                        <p><b>Serving:</b> {restaurant.foodTypes.replaceAll(":", ",")}</p>
                        <p><b>Nearby Street Location(s):</b> {restaurant.locationDescription}</p>
                    </div>
                    <p className={"lead"}>Map:</p>
                    <iframe title={"map"} width={600} height={450} loading={"lazy"}
                            src={`https://www.google.com/maps/embed/v1/place?q=${restaurant.address.replaceAll(" ", "+")}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className={"container-fluid"}>
                <div id={"loading"} className={"loading m-auto d-flex justify-content-center align-items-center"}>

                </div>
            </div>
        )
    }

}

export default ShowRestaurant;