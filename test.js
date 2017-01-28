var unirest = require('unirest');
var moment = require('moment');

var sections = [];
var classes = {};
var flag = 1;
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

testFunction = function() {
    unirest
    .get('http://api.umd.io/v0/courses/ENES100')
    .end((response) => {
        sections = response.body['sections'];
        //console.log(response.body['sections']);
        var className = response.body['course_id'];
        flag = sections.length;
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

                flag--;
                if (flag == 0) {
                    //console.log(classes)
                    asdf(classes);
                    return classes;
                }
            });
        });
    });
};

/*
while (flag != 0) {
    console.log(flag);
}
console.log(classes);*/

// Contains functions to help filter one person
validateFirst = function(classes) {
    var goodOnes = [[]];
    var notPossible = false;
    //contains sets of valid MeetingTimes
    var count;
    //Go through all classes
    for (count = 0; count < classes.length; count++) {
        var newGoodOnes = [[]];
        //Go through all the section times per class
        for each (var meeting in c.times) {
            var foundMatch = false;
            //MeetingTimes in the class
            if (count == 0) { //add array with the single meeting to goodOnes
                var tmp = [];
                tmp.push(meeting);
                goodOnes.push(tmp);
            } else {
                //Current  set of already compatible section times in goodOnes 
                for each (var possibleMeetings in goodOnes) {
                    //no conflicts with this possibleMeeting combination
                    if (!hasConflict(meeting, possibleMeetings)) {
                       newGoodOnes.push(possibleMeetings.push(meeting)); 
                       foundMatch = true;
                    }
                }
            }
            
            if (!foundMatch) {
                return null;
            }        
        }
        
        goodOnes = newGoodOnes;
    }
    
    return goodOnes;
}


//Determines if a meeting conflicts with a set of already validated meetings
hasConflict = function(curr, sections) {
    for each (var t in curr.times) { // times is a field in the meetingTimes object.
        for each (var s in sections) {
            for each (var st in s.times) {
                if (t.day == st.day) {
                    if ((t.start > st.start && t.start < st.end) || (t.end > st.start && t.end < st.end)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}


testFunction();