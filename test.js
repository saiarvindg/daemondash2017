var unirest = require('unirest');
var moment = require('moment');

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
            //console.log(response.body['meetings'][0]['start_time']);
            //console.log(response.body['meetings'][0]['end_time']);
            var startTime = response.body['meetings'][0]['start_time'];
            var endTime = response.body['meetings'][0]['end_time']
            console.log("unformatted start time: " + startTime);
            console.log("unformatted end time: " + endTime);
            var startTimeFormatted = moment(startTime, ["h:mmA"]).format("HHmm");
            var endTimeFormatted = moment(endTime, ["h:mmA"]).format("HHmm");
            console.log("formatted start time: " + startTimeFormatted);
            console.log("formatted end time: " + endTimeFormatted);
        });
    });
});

