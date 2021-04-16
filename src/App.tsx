import React from "react";

//Components
import GitSearch from "./components/GitSearch";
import Navbar from "./components/Navbar";

export default function App() {
    return (
        <>
            <Navbar />
            <div className="MainContent">
                <GitSearch />
            </div>
        </>
    );
}
