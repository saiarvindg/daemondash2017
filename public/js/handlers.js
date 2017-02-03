$(document).ready( function () {
    //var courseName = "CMCS216";
    //var liTemplate = "<li class='list-group-item'>" + courseName + 
    //"<span class='pull-right'> <button class='btn btn-xs btn-danger deleteCourseBtn'> <span class='glyphicon 
    // glyphicon-trash'></span></button></span></li>";
    var student1Courses = [];
    var student2Courses = [];
    const regex = /^[a-zA-z]{4}\d{3}[a-zA-z]{0,1}$/; //matches 4 letters, 3 digits, optionally 1 letter

    $('#student1Textbox').on('input',function(e){
        if (regex.test($('#student1Textbox').val())) {
            document.getElementById('student1Btn').disabled = false;
        } else {
            document.getElementById('student1Btn').disabled = true;
        }
    });

    $('#student2Textbox').on('input',function(e){
        if (regex.test($('#student2Textbox').val())) {
            document.getElementById('student2Btn').disabled = false;
        } else {
            document.getElementById('student2Btn').disabled = true;
        }
    });

    $('#student1Btn').click(function() {
        liTemplate = "<li class='list-group-item'>" + $('#student1Textbox').val().toUpperCase() + 
        "<span class='pull-right'> <button class='btn btn-xs btn-danger deleteCourseBtn'> <span class='glyphicon glyphicon-trash'></span></button></span></li>";
        $('#courseListStudent1').append(liTemplate);
        $('.deleteCourseBtn').click(function() {
            console.log("deleted course");
            $(this).parent().parent().remove();
        });
    });

    $('#student2Btn').click(function() {
        liTemplate = "<li class='list-group-item'>" + $('#student2Textbox').val().toUpperCase() + 
        "<span class='pull-right'> <button class='btn btn-xs btn-danger deleteCourseBtn'> <span class='glyphicon glyphicon-trash'></span></button></span></li>";
        $('#courseListStudent2').append(liTemplate);
        courseName = $('#student2Textbox').val();
        $('.deleteCourseBtn').click(function() {
            console.log("deleted course");
            $(this).parent().parent().remove();
        });
    });

    $('#generate').click(function(){
        student1Courses = [];
        student2Courses = [];
        console.log("clicked generate");
        $('#courseListStudent1 li').each(function() {
            student1Courses.push($(this).text().trim());
            console.log(student1Courses);
        });
        $('#courseListStudent2 li').each(function() {
            student2Courses.push($(this).text().trim());
        });
        socket.emit('get data', {s1: student1Courses, s2: student2Courses});
    });
});