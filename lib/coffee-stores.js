const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}


export const fetchCoffeeStores = async (latLong = "43.653833032607096%2C-79.37896808855945",limit= 6) => {
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        },
    };

    const response = await fetch(
        getUrlForCoffeeStores(latLong, "coffee", limit),
        options
    );
    const data = await response.json();

    return data.results;

    //.catch ((err) => console.error(err));
}