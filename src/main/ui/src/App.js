import React from "react";
import {Route} from "react-router-dom";
import Home from "./Components/Home";

function App() {
    return (
        <main className="main">
            <Route path={"/"} exact component={Home}/>
        </main>
    );
}

export default App;
