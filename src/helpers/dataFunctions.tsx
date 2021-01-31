const additionalInfo = (repos: number) => {
    let repoText =
        repos === 0
            ? "No Public Repos Found"
            : repos === 1
            ? "1 Public Repo:"
            : `${repos} Public Repos:`;
    let date = new Date();
    return { repoText: repoText, requestDate: date };
};

export { additionalInfo };
