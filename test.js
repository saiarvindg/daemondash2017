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
                        for (let i = 0; i < dayString.length; i++) {
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
                        validateFirst(classes);
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

asdf = function(classes1) {
    console.log(classes1);
}

// Contains functions to help filter one person
validateFirst = function(classes1) {
    console.log(classes1)
    var goodOnes = [];
    var notPossible = false;
    var isFirst = true;
    
    //Go through all classes
    for (let c in classes1) {
        var newGoodOnes = [];
        //console.log("Class");
        //console.log(c);
        //Give classname c, get all of c's sections as an array
        //each section is passed in the forEach
        classes1[c].forEach((section) => {
            var foundMatch = false;
            //sections for the first class, add them all to goodOnes
            if (isFirst) { 
                //console.log("First");
                var tmp = [];
                tmp.push(section);
                goodOnes.push(tmp);
                //console.log(goodOnes.length);
                //console.log(goodOnes);
            } else {
                //Current set of already compatible section times in goodOnes
                //console.log(goodOnes.length);
                goodOnes.forEach((goodSchedule) => {
                    //no conflicts with this combination
                   
                    if (!hasConflict(section, goodSchedule)) {
                        var combined = goodSchedule.concat(section); //add section number that fits
                        newGoodOnes.push(combined); //now add the sections to the newGoodOnes
                        foundMatch = true;
                        //console.log("Putting!");
                    }
                });
            }
            //console.log("After");
            
            //console.log(goodOnes);
            
            if (!foundMatch) {
                return null;
            }        
        });
        if (newGoodOnes.length != 0) {
            goodOnes = newGoodOnes;
            console.log("New good");
        }
        //console.log(goodOnes);
        isFirst = false;

    }
    
    console.log(goodOnes);
}


//Determines if a meeting conflicts with a set of already validated meetings
hasConflict = function(curr, sections) {
    let returnValue = false;
    sections.forEach((section) => {
        section.times.forEach((st) => {
            if (curr.day == st.day) {
                if ((curr.start > st.start && curr.start < st.end) || (curr.end > st.start && curr.end < st.end)) {
                    returnValue = true;    
                }
            }
        });
    });
    return returnValue;
}

/* TEST CASES FOR hasConflict

var tempCurr = {
    day: "M",
    start: 1100,
    end: 1150
}

var tempSections = [
    {
        section: "Myclass100",
        times: [{
            day: "Tu",
            start: 1000,
            end: 1050
        },
        {
            day: "Th",
            start: 1100,
            end: 1150
        },
        {
            day: "M",
            start: 1000,
            end: 1050
        }]
    },
    {
        section: "Myclass101",
        times: [{
            day: "Tu",
            start: 1030,
            end: 1130
        },
        {
            day: "Th",
            start: 1100,
            end: 1150
        },
        {
            day: "M",
            start: 1200,
            end: 1230
        }]
    }
]

console.log(hasConflict(tempCurr, tempSections));
*/
testFunction(['HACS208C', 'HACS100']);

