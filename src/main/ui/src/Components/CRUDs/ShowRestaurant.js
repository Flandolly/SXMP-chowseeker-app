import React, {useEffect, useState} from "react";
import axios from "axios";
import {APIURL} from "../../config/constants";
import NavigationBar from "../NavigationBar";
import {Modal} from "reactstrap";
import RestaurantEdit from "./RestaurantEdit";

function ShowRestaurant(props) {

    /*
    TODO:
    Comments?
    Readme
     */

    const [restaurant, setRestaurant] = useState({});
    const [rated, setRated] = useState("");
    const [rateLiked, setRateLiked] = useState("");
    const [rateDisliked, setRateDisliked] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const forceUpdate = React.useReducer(() => ({}))[1]
    const idParam = props.match.url.split("/")

    useEffect(() => {
        axios.get(`${APIURL}/restaurants/${idParam[2]}`)
            .then(function (response) {
                setRestaurant(response.data);
            })
    }, [])

    useEffect(() => {
    }, [restaurant])

    useEffect(() => {
        setRateDisliked(localStorage.getItem(`dislikedRestaurant-${restaurant.id}`));
        setRateLiked(localStorage.getItem(`likedRestaurant-${restaurant.id}`));
        setRated(localStorage.getItem(`ratedRestaurant-${restaurant.id}`));
    }, [restaurant.id])

    useEffect(() => {
        if (restaurant.id !== undefined) {
            localStorage.setItem(`likedRestaurant-${restaurant.id}`, rateLiked);
            localStorage.setItem(`dislikedRestaurant-${restaurant.id}`, rateDisliked);
            localStorage.setItem(`ratedRestaurant-${restaurant.id}`, rated);
        }
    }, [rateLiked, rateDisliked, rated, restaurant.id])

    function handleRatingButton(rating, target) {
        target.style.display = "none";
        if (rating === "like") {

            localStorage.setItem(`likedRestaurant-${restaurant.id}`, "true");
            localStorage.setItem(`dislikedRestaurant-${restaurant.id}`, "false");

            // console.log(localStorage.getItem(`ratedRestaurant`));

            setRateLiked("true");
            setRateDisliked("false");

            document.getElementById("dislike-button-unrated").style.display = "inline";

            axios.put(`${APIURL}/restaurants/${idParam[2]}`, {
                ...restaurant,
                likes: restaurant.likes + 1,
                dislikes: restaurant.dislikes > 0 && localStorage.getItem(`ratedRestaurant-${restaurant.id}`) === "true" ? restaurant.dislikes - 1 : restaurant.dislikes
            })
                .then(function (response) {
                    // console.log(response.data);
                    setRestaurant(response.data);

                    localStorage.setItem(`ratedRestaurant-${restaurant.id}`, "true");
                })
        } else {
            localStorage.setItem(`dislikedRestaurant-${restaurant.id}`, "true");
            localStorage.setItem(`likedRestaurant-${restaurant.id}`, "false");

            setRateLiked("false");
            setRateDisliked("true");

            document.getElementById("like-button-unrated").style.display = "inline";

            axios.put(`${APIURL}/restaurants/${idParam[2]}`, {
                ...restaurant,
                dislikes: restaurant.dislikes + 1,
                likes: restaurant.likes > 0 && localStorage.getItem(`ratedRestaurant-${restaurant.id}`) === "true" ? restaurant.likes - 1 : restaurant.likes
            })
                .then(function (response) {
                    // console.log(response.data);
                    setRestaurant(response.data);

                    localStorage.setItem(`ratedRestaurant-${restaurant.id}`, "true");
                });
        }
    }

    function toggleModal() {
        setShowEditModal(!showEditModal);
    }

    if (restaurant.address !== undefined) {

        return (
            <div>
                <NavigationBar setShowEditModal={setShowEditModal}/>
                <div>
                    <Modal isOpen={showEditModal} toggle={toggleModal} centered={true}>
                        <RestaurantEdit setRestaurant={setRestaurant} restaurant={restaurant}
                                        setShowModal={setShowEditModal}/>
                    </Modal>
                    <div className={"title"}>
                        <h1 className={"display-4 d-inline"}>{restaurant.name}</h1>
                        <img id={"like-button-unrated"} className={"mx-2"} alt={"Like button (unrated)"}
                             style={{display: localStorage.getItem(`likedRestaurant-${restaurant.id}`) === "true" ? "none" : "inline"}}
                             onClick={(e) => handleRatingButton("like", e.target)}
                             src="https://img.icons8.com/ios-glyphs/30/000000/thumb-up--v1.png"/>
                        <img id={"like-button-rated"} className={"mx-2"} alt={"Like button (rated)"}
                             style={{display: localStorage.getItem(`likedRestaurant-${restaurant.id}`) === "true" ? "inline" : "none"}}
                             src="https://img.icons8.com/ios-glyphs/30/26e07f/thumb-up--v1.png"/>
                        {restaurant.likes}
                        <img id={"dislike-button-unrated"} className={"mx-2"} alt={"Dislike button (unrated)"}
                             style={{display: localStorage.getItem(`dislikedRestaurant-${restaurant.id}`) === "true" ? "none" : "inline"}}
                             onClick={(e) => handleRatingButton("dislike", e.target)}
                             src="https://img.icons8.com/ios-glyphs/30/000000/thumbs-down.png"/>
                        <img id={"dislike-button-rated"} className={"mx-2"} alt={"Dislike button (rated)"}
                             style={{display: localStorage.getItem(`dislikedRestaurant-${restaurant.id}`) === "true" ? "inline" : "none"}}
                             src="https://img.icons8.com/ios-glyphs/30/fa314a/thumbs-down.png"/>
                        {restaurant.dislikes}
                    </div>
                    <div className={"upper-main"}>

                        <h1 className={"display-6"}>{restaurant.address}</h1>
                        {restaurant.photo ? <img alt={"Restaurant"} src={restaurant.photo}/> : null}
                    </div>
                    <div className={"lower-main"}>
                        <p><b>Serving:</b> {restaurant.foodTypes.replaceAll(":", ",")}</p>
                        {/*<p><b>Nearby Street Location(s):</b> {restaurant.locationDescription}</p>*/}
                    </div>
                    <p className={"lead"}>Map:</p>
                    <iframe title={"map"} width={600} height={450} loading={"lazy"}
                            src={`https://www.google.com/maps/embed/v1/place?q=${restaurant.address.replaceAll(" ", "+")}+San+Francisco&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}/>
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