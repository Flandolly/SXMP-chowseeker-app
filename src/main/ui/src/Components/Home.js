import React, {useState} from "react";
import {Button, FormGroup, Input} from "reactstrap";
import {Link} from "react-router-dom";

function Home() {

    // const axios = require("axios");
    //
    // useEffect(() => {
    //     axios.get(`${APIURL}/restaurants`)
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (err) {
    //             console.log(err);
    //         })
    // });

    const [input, setInput] = useState("");

    function handleChange(input) {
        return setInput(input);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className={"container-fluid d-flex"}>
            <div className={"d-flex flex-column vh-100 w-100 justify-content-center"}>
                <h1 className={"text-center d-inline"}>Chowseeker</h1>
                <h5 className={"text-center"}>Find Your Favorite SF Food Trucks!</h5>
                <FormGroup>
                    <Input className={"w-75 mx-auto"} onChange={(event => handleChange(event.target.value))} value={input} type={"search"} name={"search"} placeholder={"Search... (Enter a food or address)"}/>
                </FormGroup>
                <Link className={"text-center"} to={{
                    pathname: "/search",
                    search: `?query=${input}`
                }}>
                    <Button className={"w-25 mx-auto my-2"} onSubmit={(event => handleSubmit(event))} type={"submit"} name={"submitSearch"} color={"primary"}>Submit</Button>
                </Link>
            </div>
        </div>
    );
}

export default Home;