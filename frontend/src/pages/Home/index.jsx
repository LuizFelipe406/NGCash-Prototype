import React from "react";
import { useContext } from "react";
import Context from "../../context";

function Home() {
    const { user } = useContext(Context);
    console.log(user);
    return (
        <div className="home-container">
            <h1>Home Page!</h1>
        </div>
    )
}

export default Home;