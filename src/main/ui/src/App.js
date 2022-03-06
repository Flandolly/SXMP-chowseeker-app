import React, {Fragment, useEffect} from "react";
import {Route} from "react-router-dom";
import Home from "./Components/Home";
import RestaurantList from "./Components/RestaurantList";
import ShowRestaurant from "./Components/CRUDs/ShowRestaurant";

function App() {

    useEffect(() => {
        localStorage.setItem("ratedRestaurant", "false");
    })

    return (
        <main className="main">
            <Route path={"/"} exact component={Home}/>
            <Fragment>
                <Route path={"/search"} exact component={RestaurantList}/>
                <Route path={"/restaurant/:id"} exact component={ShowRestaurant}/>
            </Fragment>
        </main>
    );
}

export default App;
