const user = {
    method: 'post',
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
}

fetch("https://osu.ppy.sh/oauth/token", user);
.then(response => {
    return response.json();
});