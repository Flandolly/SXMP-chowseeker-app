import React, {useEffect, useState} from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Col, CardFooter} from 'reactstrap';
import {Link} from "react-router-dom";
import axios from "axios";

function Restaurant({restaurant}) {

    const [photo, setPhoto] = useState("");

    useEffect(() => {
        axios.get("https://api.thecatapi.com/v1/images/search", {headers: {"x-api-key" : process.env.REACT_APP_CATAPI_API_KEY}})
            .then(function (response) {
                setPhoto(response.data[0].url);
            });
    }, [restaurant])

    return (
        <div className={"restaurant-result"}>
            <Col>
                <Card className={"text-center"}>
                    <CardImg id={"restaurant-card"} top src={restaurant.photo ? restaurant.photo : photo}
                             alt={"Restaurant Image"}/>
                    <CardBody style={{backgroundColor: "#ffa9a3"}}>
                        <CardTitle><b>{restaurant.name}</b></CardTitle>
                        <CardSubtitle><i>{restaurant.address}</i></CardSubtitle>
                        <CardText><b>Foods Served</b>: {restaurant.foodTypes.replaceAll(":", ",")}</CardText>
                        <Link to={`/restaurant/${restaurant.id}`}>
                            <Button>Details</Button>
                        </Link>
                    </CardBody>
                    <CardFooter className={"text-start"} style={{backgroundColor: "#ffc8c4"}}>
                        &#128077; <span className={"text-success"}>{restaurant.likes}</span> &#128078; <span
                        className={"text-danger"}>{restaurant.dislikes}</span>
                    </CardFooter>
                </Card>
            </Col>
        </div>
    )
}

export default Restaurant;