class Fetcher {
    static getGamesArray () {
        fetch("gameInfo.json")
        .then(res => res.json())
        .then(data => {
            search(data, domElements.searchBar.value);
            change(data);
        });
    };
}
