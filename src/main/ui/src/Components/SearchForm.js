import React, {useState} from "react";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {Link, useHistory} from "react-router-dom";

function SearchForm() {

    const [input, setInput] = useState("");
    const hist = useHistory();

    function handleChange(input) {
        return setInput(input.target.value);
    }

    return (
        <div className={"mt-4"}>
            <InputGroup className={"w-75 mx-auto"}>
                <Input onChange={(event) => handleChange(event)}
                       onKeyPress={(event) => {
                           if (event.key === "Enter") {
                               hist.push(`/search?query=${input}`);
                           }
                       }}
                       type={"search"} value={input} name={"search"} placeholder={"Search... (Enter a food or address)"}/>
                <InputGroupAddon addonType={"prepend"}>
                    <Link className={"text-center"} to={{
                        pathname: "/search",
                        search: `?query=${input}`
                    }}>
                        <Button className={""} type={"submit"} name={"submitSearch"} color={"primary"}>Find
                            Food</Button>
                    </Link>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

export default SearchForm;