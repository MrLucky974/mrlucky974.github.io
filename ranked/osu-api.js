fetch("https://osu.ppy.sh/oauth/token", {
    method: 'post',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "grant_type": "authorization_code",
        "client_id": 2914,
        "client_secret": "DuzliUBOmqBJ3NH6ljZLTCatUFN41guAlrnBvJ6h",
        "redirect_uri": "https://notarealaddress.local/oauth/osu",
        "code": "code"
    })
}).then(response => {
    return response.json();
});