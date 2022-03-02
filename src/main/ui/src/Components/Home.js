import React from "react";
import SearchForm from "./SearchForm";

function Home() {

    return (
        <div className={"container-fluid d-flex"}>
            <div className={"d-flex flex-column vh-100 w-100 justify-content-center"}>
                <h1 className={"text-center d-inline"}>Chowseeker</h1>
                <h5 className={"text-center"}>Find Your Favorite SF Food Trucks!</h5>
                <SearchForm/>
            </div>
        </div>
    );
}

export default Home;