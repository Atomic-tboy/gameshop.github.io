class Fetcher {
    static async getGamesArray () {
        const response = await fetch("gameInfo.json");

        const data = await response.json();

        return data;
    };
};
