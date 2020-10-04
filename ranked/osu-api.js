const osuAPI = require('osuapi-js');
const api = new osuAPI(APIKey, { beatmaps: { fetchCreatorInfo: false } });

osuAPI.getUser('XeKr')
    .then(user => {
        console.log(user);
    });