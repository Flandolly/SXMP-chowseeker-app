import React, {useEffect, useState} from "react";
import {APIURL} from "../config/config";
import {Link} from "react-router-dom";
import axios from "axios";
import Restaurant from "./Restaurant";
import {Col, Row} from "reactstrap";

function ResultList(props) {

    const [resultList, setResultList] = useState([]);

    useEffect(() => {

        const searchParam = props.history.location.search;

        axios.get(`${APIURL}/restaurants/search-food`, {
            params: {
                foodTypes: searchParam.substring(searchParam.indexOf('=') + 1)
            }
        })
            .then(function (response) {
                console.log(response);
                setResultList(response.data);
                if (response.data.length === 0) {
                    axios.get(`${APIURL}/restaurants/search-address`, {
                        params: {
                            address: searchParam.substring(searchParam.indexOf('=') + 1)
                        }
                    })
                        .then(function (response) {
                            console.log(response);
                            setResultList(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props.history.location.search])

    return (
        <div>
            <h1>Result List</h1>
            <Row>
                {resultList.length !== 0 ? resultList.map((result, idx) => {
                    return <Col sm={4} className={"search-result my-3"} key={idx}>
                        <Restaurant restaurant={result}/>
                    </Col>
                }) : <div>No results found.</div>}
            </Row>
        </div>
    )
}

export default ResultList;