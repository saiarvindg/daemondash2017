var unirest = require('unirest');

var sections = [];

unirest
.get('http://api.umd.io/v0/courses/ENES100')
.end((response) => {
    sections = response.body['sections'];
    //console.log(response.body['sections']);

    sections.map((section) => {
        unirest
        .get('http://api.umd.io/v0/courses/sections/' + section)
        .end((response) => {
            //console.log(response.body);
            console.log(response.body['section_id']);
            console.log(response.body['meetings'][0]['days']);
            console.log(response.body['meetings'][0]['start_time']);
            console.log(response.body['meetings'][0]['end_time']);
        });
    });
});