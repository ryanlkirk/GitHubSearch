import { additionalInfo } from "./helpers/dataFunctions";

describe("User Profile", () => {
    it("Returns a string stating no repos found if 0 was passed in as the first parameter", () => {
        let info = additionalInfo(0);
        expect(info.repoText).toEqual("No Public Repos Found");
    });
    it("Returns a string stating 1 repo found when 1 is passed to the first parameter", () => {
        let info = additionalInfo(1);
        expect(info.repoText).toEqual("1 Public Repo:");
    });

    it("Returns a string stating X repos found when a number greater than 1 is passed to the first parameter", () => {
        let info = additionalInfo(182);
        expect(info.repoText).toEqual("182 Public Repos:");
    });

    it("Returns todays data for the date of when the request was made", () => {
        let info = additionalInfo(1);
        let today = new Date();
        expect(info.requestDate).toEqual(today);
    });
});
