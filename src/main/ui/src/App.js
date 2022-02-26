import React from "react";
import {Route} from "react-router-dom";
import Home from "./Components/Home";
import ResultList from "./Components/ResultList";

function App() {
    return (
        <main className="main">
            <Route path={"/"} exact component={Home}/>
            <Route path={"/search"} exact component={ResultList}/>
        </main>
    );
}

export default App;
