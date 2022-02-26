import React, {useEffect} from "react";
import {APIURL} from "../config/config";
import {Link} from "react-router-dom";
import axios from "axios";

function ResultList(props) {

    useEffect(() => {

        const searchParam = props.history.location.search;

        axios.get(`${APIURL}/restaurants/search-food`, {
            params: {
                foodTypes: searchParam.substring(searchParam.indexOf('=') + 1)
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.length === 0) {
                    axios.get(`${APIURL}/restaurants/search-address`, {
                        params: {
                            address: searchParam.substring(searchParam.indexOf('=') + 1)
                        }
                    })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    return (
        <div>Result List</div>
    )
}

export default ResultList;