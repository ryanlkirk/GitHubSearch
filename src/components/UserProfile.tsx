import React from "react";

//UI Elements
import Typography from "@material-ui/core/Typography";

//Types
import IRepos from "../types/custom";
interface IUserProps {
    title: string;
    picture: string;
    repositories: IRepos[];
}

const UserProfile = (props: IUserProps) => {
    return (
        <main className="userprofile">
            <Typography variant="h4" align="center">
                {props.title}
            </Typography>
            {props.picture && props.title !== "No user found!" && (
                <img id="profileimg" alt="profile" src={props.picture}></img>
            )}
        </main>
    );
};
export default UserProfile;
