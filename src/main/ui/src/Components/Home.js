import React from "react";
import SearchBar from "./SearchBar";

function Home() {

    return (
        <div className={"container-fluid d-flex home"}>
            <div className={"d-flex flex-column vh-100 w-100 justify-content-center"}>
                <h1 className={"text-center d-inline display-1 "}>Chowseeker</h1>
                <h5 className={"text-center display-6"}>Find Your Favorite San Francisco Food Trucks!</h5>
                <SearchBar/>
            </div>
        </div>
    );
}

export default Home;