import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import Home from "./Components/Home";
import ResultList from "./Components/ResultList";
import NavigationBar from "./Components/NavigationBar";

function App() {
    return (
        <main className="main">
            <Route path={"/"} exact component={Home}/>
            <Fragment>
                <NavigationBar/>
                <Route path={"/search"} exact component={ResultList}/>
            </Fragment>
        </main>
    );
}

export default App;
