const additionalInfo = (repos: number) => {
    let repoText;

    if (!repos) {
        repoText = "No Public Repos Found";
    } else if (repos === 1) {
        repoText = "1 Public Repo:";
    } else {
        repoText = `${repos} Public Repos:`;
    }

    let date = new Date();
    return { repoText: repoText, requestDate: date };
};

export { additionalInfo };
