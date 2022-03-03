import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Col, CardFooter} from 'reactstrap';
import {Link} from "react-router-dom";

function Restaurant({restaurant}) {
    return (
        <div className={"restaurant-result"}>
            <Col>
                <Card className={"text-center"}>
                    <CardImg top src={`https://loremflickr.com/320/240?random=${Math.floor(Math.random() * 100)}`} alt={"Restaurant Image"}/>
                    <CardBody>
                        <CardTitle><b>{restaurant.name}</b></CardTitle>
                        <CardSubtitle><i>{restaurant.address}</i></CardSubtitle>
                        <CardText><b>Foods Served</b>: {restaurant.foodTypes.replaceAll(":", ",")}</CardText>
                        <Link to={`/restaurant/${restaurant.id}`}>
                            <Button>Details</Button>
                        </Link>
                    </CardBody>
                    <CardFooter className={"text-start"}>
                        &#128077; <span className={"text-success"}>{restaurant.likes}</span> &#128078; <span className={"text-danger"}>{restaurant.dislikes}</span>
                    </CardFooter>
                </Card>
            </Col>
        </div>
    )
}

export default Restaurant;