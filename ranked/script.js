/*fetch("https://osu.ppy.sh/oauth/token", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "grant_type": "authorization_code",
        "client_id": 2916,
        "client_secret": "TYmwL7OxPFxQkesGMxGQG42qcA1TTz8tGUzWiazA",
        "redirect_uri": "https://mrlucky974.github.io/ranked/",
        "code": "def5020030627c3f10bdf9e2d6498e4b217e97651ee107613c62a0459c78d6ba0cf3639617b524b0f69b1607e6b8c6013829b1aaa6071b3319aea9e69416f52121814b3e44f10beecd430540906d1e1a400247fb3ece31252ccbaa8fcced5626523ebba6af40b904075456efea57b0fed8e6aa86bab0a2949e2e3f89570a0860e5a45c7125835ca3a73991d0552fa7db49ffaabd3127a56b0a7ffa2f9fd6c42b5210c6b6247a1116c7d1cf563885ae5ee8196ba66ea099f3fd43fac02a3112ebd57c1cd4d7510e4e81b66799f0e4a919929b86bffd461764d505df5f40a5b39640626d72c82dd3b2b580d7b8746efef4072f9723a925f60735cc87b98046411dfd5e8cee5622103ac902b58e5a25bee13751c64c9af9f6bbf70028e4b607570bf78bdc7bce16d2e19ec3499ff6817745c00c6a3a473abb66b60ddf1b734dc9744c3ed7f2b7b022db6056ee6f9b41cd204be0edf83622afc195afb360039692daf2877cd3cc85e17b5bcd89e1b9dd1fbaeb9fa8b697246e0471b6fb89f203c93ded99"
    })
})
.then(response => {
    return response.json();
});*/

const url = new URL("https://osu.ppy.sh/api/v2/users/9358042/osu");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
.then(response => response.json())
.then(json => console.log(json));