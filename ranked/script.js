const test = () => {
    return fetch("https://osu.ppy.sh/oauth/token", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "grant_type": "client_credentials",
            "client_id": 2914,
            "client_secret": "DuzliUBOmqBJ3NH6ljZLTCatUFN41guAlrnBvJ6h",
            "scope": "public"
        })
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json);
    })
}