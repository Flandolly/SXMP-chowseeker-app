import React, {useEffect, useState} from "react";
import {APIURL} from "../config/constants";
import axios from "axios";
import Restaurant from "./Restaurant";
import {Button, ButtonGroup, Col, Modal, Pagination, PaginationItem, PaginationLink, Row} from "reactstrap";
import SearchBar from "./SearchBar";
import NavigationBar from "./NavigationBar";
import RestaurantCreate from "./CRUDs/RestaurantCreate";

function RestaurantList(props) {

    const maxPageSize = 21;
    const [resultList, setResultList] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({
        sortDirection: "",
        sortParam: ""
    })
    const [showAddAsc, setShowAddAsc] = useState(false);
    const [showAddDesc, setShowAddDesc] = useState(false);
    const [showNameAsc, setShowNameAsc] = useState(false);
    const [showNameDesc, setShowNameDesc] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {

        const searchParam = props.history.location.search;

        axios.get(`${APIURL}/restaurants/search-food`, {
            params: {
                foodTypes: searchParam.substring(searchParam.indexOf('=') + 1)
            }
        })
            .then(function (response) {
                setResultList(response.data);
                if (response.data.length === 0) {
                    axios.get(`${APIURL}/restaurants/search-address`, {
                        params: {
                            address: searchParam.substring(searchParam.indexOf('=') + 1)
                        }
                    })
                        .then(function (response) {
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

    useEffect(() => {
        // console.log(sort);
        const sortResults = [...resultList].sort((a, b) => {
            if (sort.sortDirection === "ascending") {
                if (sort.sortParam === "name") {
                    return a.name > b.name ? 1 : -1;
                } else {
                    return a.address > b.address ? 1 : -1;
                }
            }

            if (sort.sortDirection === "descending") {
                if (sort.sortParam === "name") {
                    return a.name < b.name ? 1 : -1;
                } else {
                    return a.address < b.address ? 1 : -1;
                }
            }
            return [];
        })
        setResultList(sortResults);
    }, [sort])

    useEffect(() => {
        setPage(1);

        if (resultList) {
            resultList.forEach((restaurant) => {
                if (!restaurant.photo) {
                    axios.get("https://api.thecatapi.com/v1/images/search", {headers: {"x-api-key" : process.env.REACT_APP_CATAPI_API_KEY}})
                        .then(function (response) {
                            axios.put(`${APIURL}/restaurants/${restaurant.id}`, {...restaurant, photo: response.data[0].url})
                                .then(function (response) {
                                    // console.log(response.data);
                                })
                        });
                }
            })
        }

        console.log(resultList);
    }, [resultList])

    function sortResults(event) {
        if (!sort.sortDirection || !sort.sortParam || sort.sortParam !== event.childNodes[0].nodeValue.toLowerCase()) {
            if (event.innerText.toLowerCase().includes("address")) {
                setShowAddAsc(true);
                setShowNameAsc(false);
                setShowNameDesc(false);
            } else {
                setShowNameAsc(true);
                setShowAddAsc(false);
                setShowAddDesc(false);
            }
            setSort({sortParam: event.childNodes[0].nodeValue.toLowerCase(), sortDirection: "ascending"});
        }

        if (sort.sortDirection === "ascending" && sort.sortParam === event.childNodes[0].nodeValue.toLowerCase()) {
            if (event.innerText.toLowerCase().includes("address")) {
                setShowAddAsc(false);
                setShowAddDesc(true);
            } else {
                setShowNameAsc(false);
                setShowNameDesc(true);
            }
            setSort({...sort, sortDirection: "descending"});
        }

        if (sort.sortDirection === "descending" && sort.sortParam === event.childNodes[0].nodeValue.toLowerCase()) {
            if (event.innerText.toLowerCase().includes("address")) {
                setShowAddAsc(true);
                setShowAddDesc(false);
            } else {
                setShowNameAsc(true);
                setShowNameDesc(false);
            }
            setSort({...sort, sortDirection: "ascending"});
        }
    }

    function ResultHeader() {
        return (
            <div className={"result-header"}>
                <NavigationBar setShowAddModal={setShowAddModal}/>
                <SearchBar/>
                <h1 className={"display-6 mt-3 mx-3"}>Showing search results for
                    "{props.history.location.search.substring(props.history.location.search.indexOf('=') + 1)}"</h1>
                <p className={"lead mx-3"}>{resultList.length ? resultList.length + " results found." : "No results found."}</p>
                <div className={"lead text-end"}>
                    Sort By: <ButtonGroup>
                    <Button onClick={(event => sortResults(event.target))}>Address
                        <span style={{display: showAddAsc ? "inline" : "none"}} id={"sort-asc-address"}> &#8593;</span>
                        <span style={{display: showAddDesc ? "inline" : "none"}}
                              id={"sort-desc-address"}> &#8595;</span>
                    </Button>
                    <Button onClick={(event => sortResults(event.target))}>Name
                        <span style={{display: showNameAsc ? "inline" : "none"}} id={"sort-asc-name"}> &#8593;</span>
                        <span style={{display: showNameDesc ? "inline" : "none"}} id={"sort-desc-name"}> &#8595;</span>
                    </Button>
                </ButtonGroup>
                </div>
            </div>
        )
    }

    function toggleModal() {
        setShowAddModal(!showAddModal);
    }

    function ResultPagination() {
        return (
            <Pagination className={"result-header d-flex justify-content-center"}>
                <PaginationItem disabled={page === 1}>
                    <PaginationLink previous onClick={() => setPage(page-1)} href={"#"}/>
                </PaginationItem>
                {Array(Math.ceil(resultList.length / maxPageSize)).fill(null).map((result, idx) => {
                    if ([idx, idx-1, idx+1, idx+2, idx+3].includes(page)) {
                        if (page === idx+1) {
                            return <PaginationItem active key={idx} onClick={() => setPage(idx+1)}>
                                <PaginationLink>
                                    {idx+1}
                                </PaginationLink>
                            </PaginationItem>
                        } else {
                            return <PaginationItem key={idx} onClick={() => setPage(idx+1)}>
                                <PaginationLink href={"#"}>
                                    {idx+1}
                                </PaginationLink>
                            </PaginationItem>
                        }
                    }
                })}
                <PaginationItem disabled={page === Math.ceil(resultList.length / maxPageSize)}>
                    <PaginationLink next onClick={() => setPage(page+1)} href={"#"}/>
                </PaginationItem>
            </Pagination>
        )
    }


    if (resultList.length !== 0) {
        return (
            <div className={"restaurant-list"}>
                <Modal isOpen={showAddModal} toggle={toggleModal} centered={true}>
                    <RestaurantCreate setShowModal={setShowAddModal}/>
                </Modal>
                <ResultHeader/>
                <ResultPagination/>
                <Row>
                    {resultList.slice((page-1) * maxPageSize, maxPageSize * page).map((result, idx) => {
                        return <Col sm={4} className={"search-result my-3"} key={idx}>
                            <Restaurant restaurant={result}/>
                        </Col>
                    })}
                </Row>
                <ResultPagination/>
            </div>
        )
    } else {
        return (
            <div className={"container-fluid"}>
                <ResultHeader/>
                <div id={"loading"} className={"loading m-auto d-flex justify-content-center align-items-center"}>

                </div>
            </div>
        )
    }

}

export default RestaurantList;