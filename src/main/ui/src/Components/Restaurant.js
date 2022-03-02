import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Col} from 'reactstrap';

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
                        <Button>Details</Button>
                    </CardBody>
                </Card>
            </Col>
        </div>
    )
}

export default Restaurant;