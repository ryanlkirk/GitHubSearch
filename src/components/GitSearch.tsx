import React from "react";
import { useState } from "react";

//Components
import UserProfile from "./UserProfile";
import { additionalInfo } from "../helpers/dataFunctions";

//UI Elements
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

//Types
import IRepos from "../types/custom";

const GitSearch = () => {
    const [profileImage, setProfileImage] = useState<string>("");
    const [profileHeader, setProfileHeader] = useState<string>("");
    const [repositories, setRepositories] = useState<IRepos[]>([]);
    const [showRepos, setShowRepos] = useState<boolean>(false);

    let fetchUser = () => {
        var nameValue = (document.getElementById(
            "site-search"
        ) as HTMLInputElement).value;

        fetch(`https://api.github.com/users/${nameValue}`)
            .then(function (response) {
                // The API call was successful!
                return response.json();
            })
            .then(function (data) {
                if (data.message && data.message === "Not Found") {
                    setProfileHeader("No user found!");
                } else {
                    // This is the JSON from our response
                    setProfileHeader(data.login);
                    setProfileImage(data.avatar_url);
                }
                showRepos && setShowRepos(false);
            })
            .catch(function (err) {
                // There was an error
                console.warn("Something went wrong.", err);
            });

        //Fetch list of repos
        fetch(`https://api.github.com/users/${nameValue}/repos`)
            .then(function (response) {
                // The API call was successful!
                return response.json();
            })
            .then(function (data) {
                // This is the JSON from our response
                setRepositories(data);
            })
            .catch(function (err) {
                // There was an error
                console.warn("Something went wrong.", err);
            });
    };

    let toggleRepo = () => {
        setShowRepos(!showRepos);
    };

    let repoArr: string[] = [];

    let additionaProfileInfo = additionalInfo(repositories.length);

    repositories &&
        repositories.length > 0 &&
        repositories.forEach((element) => {
            repoArr.push(element.name);
        });

    return (
        <div className="searchBar">
            <div className="searchBarCard">
                <label htmlFor="site-search">
                    <Typography variant="h6" align="center">
                        GitHub User Search
                    </Typography>
                </label>
                <TextField
                    type="search"
                    id="site-search"
                    name="q"
                    aria-label="Search through site content"
                    variant="outlined"
                    placeholder="Username"
                ></TextField>

                <Button onClick={fetchUser}>Search</Button>
                {profileHeader && repositories && (
                    <>
                        <UserProfile
                            title={profileHeader}
                            picture={profileImage}
                            repositories={repositories}
                        />

                        {profileHeader !== "No user found!" && (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setShowRepos(!showRepos)}
                            >
                                {!showRepos
                                    ? "Show Repositories"
                                    : "Hide Repositories"}
                            </Button>
                        )}
                    </>
                )}
            </div>

            {showRepos && (
                <div className="searchBarCard right-content">
                    <Typography align="center" variant="h6">
                        Repositories
                    </Typography>
                    <Divider />
                    {additionaProfileInfo && (
                        <Typography variant="subtitle1" align="center">
                            {additionaProfileInfo.repoText}
                        </Typography>
                    )}

                    <div className="reposDisplay">
                        {repoArr &&
                            showRepos &&
                            repoArr.map((e, id) => {
                                return (
                                    <span key={id} className="repos">
                                        <Typography align="center">
                                            {e}
                                        </Typography>
                                    </span>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GitSearch;
