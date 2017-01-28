var unirest = require('unirest');
var moment = require('moment');

var sections = [];
var classes = {};
var innerFlag = 0;
var please = "11";

/*

{
    className: [
        {
            section: CMSC132-0101
            times: [
                {
                    days: MWF,
                    start: fdsa,
                    end: fewage
                },
                ...
            ]
        },
        ...
    ],
    ...
}

*/



testFunction = function(classNames) {
    for (let k = 0; k < classNames.length; k++) {
        unirest
        .get('http://api.umd.io/v0/courses/' + classNames[k])
        .end((response) => {
            sections = response.body['sections'];
            //console.log(response.body['sections']);
            var className = response.body['course_id'];
            innerFlag += sections.length;
            classes[className] = [];
            sections.map(function(section) {
                unirest
                .get('http://api.umd.io/v0/courses/sections/' + section)
                .end(function(response) {
                    //console.log(response.body);
                    //console.log(response.body['section_id']);
                    //console.log(response.body['meetings'][0]['start_time']);
                    //console.log(response.body['meetings'][0]['end_time']);

                    var sectionName = response.body['section_id'];
                    var meetingTimes = [];
                    response.body['meetings'].map((meeting) => {
                        var startTime = meeting['start_time'];
                        if (startTime == "")
                            return;
                        
                        var endTime = meeting['end_time']
                        var startTimeFormatted = moment(startTime, ["h:mmA"]).format("HHmm");
                        var endTimeFormatted = moment(endTime, ["h:mmA"]).format("HHmm");
                        //console.log(response.body['meetings'][0]['days']);

                        var dayString = response.body['meetings'][0]['days'].toString();

                        for (let i = 0; i < dayString.length - 1; i++) {
                            var dayChar = "";
                            if (dayString[i] != 'T') {
                                dayChar = dayString[i];
                            } else {
                                dayChar = dayString[i] + dayString[i + 1];
                                i++;
                            }
                            
                            var sectionObj = {
                                days: dayChar,
                                start: startTimeFormatted,
                                end: endTimeFormatted
                            }
                            //console.log(sectionObj);
                            
                            meetingTimes.push(sectionObj);
                        }
                    });

                    classes[className].push({
                        section: sectionName,
                        times: meetingTimes
                    });

                    innerFlag--;
                    if (innerFlag == 0) {
                        //console.log(classes)
                        asdf(classes);
                        return classes;
                    }
                });
            });
        });
    }
};

/*
while (flag != 0) {
    console.log(flag);
}
console.log(classes);*/
asdf = function(mess) {
    console.log(mess);

}

testFunction(['ENES100', 'CMSC131']);