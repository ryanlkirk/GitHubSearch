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
    const [searchValue, setSearchValue] = useState<string>("");

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

    let clearSearch = () => {
        setProfileImage("");
        setProfileHeader("");
        setRepositories([]);
        setSearchValue("");
        setShowRepos(false);
    };

    let repoArr: string[] = [];

    let additionaProfileInfo = additionalInfo(repositories.length);

    repositories &&
        repositories.length > 0 &&
        repositories.forEach((element) => {
            repoArr.push(element.name);
        });

    return (
        <section className="searchArea">
            <article className="searchBarCard">
                <label htmlFor="site-search">
                    <Typography variant="h6" align="center">
                        Search for a GitHub User:
                    </Typography>
                </label>
                <TextField
                    value={searchValue}
                    id="site-search"
                    name="q"
                    aria-label="Search through site content"
                    variant="outlined"
                    placeholder="Username"
                    onChange={(e) => setSearchValue(e.target.value)}
                ></TextField>
                {searchValue && (
                    <Button size="small" onClick={clearSearch}>
                        <span className="text-grey">Clear</span>
                    </Button>
                )}

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
            </article>

            {showRepos && (
                <article className="searchBarCard right-content">
                    <Typography align="center" variant="h6">
                        Repositories
                    </Typography>
                    <Divider />
                    {additionaProfileInfo && (
                        <Typography variant="subtitle1" align="center">
                            {additionaProfileInfo.repoText}
                        </Typography>
                    )}

                    <aside className="reposDisplay">
                        {repoArr &&
                            showRepos &&
                            repoArr.map((repoName, id) => {
                                return (
                                    <span key={id} className="repos">
                                        <Typography align="center">
                                            {repoName}
                                        </Typography>
                                    </span>
                                );
                            })}
                    </aside>
                </article>
            )}
        </section>
    );
};

export default GitSearch;
