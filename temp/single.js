// Contains functions to help filter one person
function validateFirst(classes) {
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
