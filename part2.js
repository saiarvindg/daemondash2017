getOverlaps = function(scheduleArr1, schedulesArr2) {
    //schedules is an array of "schedule" 
    //A schedule is an array of sections
    var absoluteMax = 1;
    var perfectPairs;
    //Go through all schedules in first student

    scheduleArr1.forEach((schedule1) => {
        scheduleArr2.forEach((schedule2) => {
            var localMax = numClassesInCommon(schedule1, schedule2);
            
            if (localMax <= 0) {
                continue; //no classes in common so move on to next schedule2
            }
            else if (localMax == absoluteMax) {
                perfectPairs.push(makePair(schedule1, schedule2));
            }
            else { //case when localMax > absMax, it's the new absMax
                absoluteMax = localMax;
                perfectPairs = []; //empty to make room
                perfectPairs.push(makePair(schedule1, schedule2));
            }
        });

    });

    return perfectPairs;
}