var unirest = require('unirest');
var moment = require('moment');

/*

{
    className: [
        {
            section: fdsaf
            times: [
                {
                    days: MWF,
                    start: fdsa,
                    end: fewage
                },
            ]
        },
        ...
    ],
    ...
}

*/
testFunction = () => {

    var sections = [];
    var classes = {};

    unirest
    .get('http://api.umd.io/v0/courses/ENES100')
    .end((response) => {
        sections = response.body['sections'];
        //console.log(response.body['sections']);
        var className = response.body['course_id'];
        classes[className] = [];
        sections.map((section) => {
            unirest
            .get('http://api.umd.io/v0/courses/sections/' + section)
            .end((response) => {
                //console.log(response.body);
                console.log(response.body['section_id']);
                //console.log(response.body['meetings'][0]['start_time']);
                //console.log(response.body['meetings'][0]['end_time']);

                var sectionName = response.body['section_id'];
                var meetingTimes = [];
                response.body['meetings'].map((meeting) => {
                    var startTime = meeting['start_time'];
                    var endTime = meeting['end_time']
                    var startTimeFormatted = moment(startTime, ["h:mmA"]).format("HHmm");
                    var endTimeFormatted = moment(endTime, ["h:mmA"]).format("HHmm");
                    console.log(response.body['meetings'][0]['days']);

                    meetingTimes.push({
                        days: response.body['meetings'][0]['days'],
                        start: startTimeFormatted,
                        end: endTimeFormatted
                    });
                });

                classes[className].push({
                    section: sectionName,
                    times: meetingTimes
                });
            });
        });
        console.log(classes);
    });
}

module.exports = testFunction;
