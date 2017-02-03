var socket = io();

socket.on('give data', function(dataInfo) {
    console.log(dataInfo)
    document.getElementById('queryInfo').style.display = "none";

    if (dataInfo.data.hasOwnProperty('type')) {
        // error case
        let centerIt = document.createElement('center');
        let errDiv = document.createElement('div');
        errDiv.style.color = 'red';
        errDiv.innerHTML = dataInfo.data.message;
        centerIt.appendChild(errDiv);
        document.getElementById('scheduleInfo').appendChild(centerIt);
        return;
    } else if (dataInfo.data.length == 0) {
        // no matching schedule case
        let centerIt = document.createElement('center');
        let noDataDiv = document.createElement('div');
        noDataDiv.style.color = 'purple';
        noDataDiv.innerHTML = "No schedules with matching classes found!?!";
        centerIt.appendChild(noDataDiv);
        document.getElementById('scheduleInfo').appendChild(centerIt);
        return;
    } else {
        // regular case
        let centerIt = document.createElement('center');
        let noDataDiv = document.createElement('div');
        noDataDiv.style.color = 'DarkGreen';
        noDataDiv.innerHTML = "Max number of classes togeter is: <b>" + dataInfo.max + "</b>";

        centerIt.appendChild(noDataDiv);
        document.getElementById('scheduleInfo').appendChild(centerIt);
    }
    
    
    for (let pair of dataInfo.data) {
        
        let table1 = document.createElement('table');
        table1.style.cssFloat = 'right';
        let headerRow = document.createElement('tr');
        let d = document.createElement('caption')
        d.innerHTML = "Student 2"
        table1.appendChild(d);

        d = document.createElement('th')
        d.innerHTML = "Section"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "M"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "Tu"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "W"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "Th"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "F"
        headerRow.appendChild(d);
        table1.appendChild(headerRow);

        console.log("\n----\n s1");
        for (let section of pair.s1) {
            let row = document.createElement('tr');
            let Marray = [];
            let Tuarray = [];
            let Warray = [];
            let Tharray = [];
            let Farray = [];

            data = document.createElement('td');
            data.innerHTML = section.section;
            row.appendChild(data);
            for (let time of section.times) {
                if (time.days == 'M'){
                    Marray.push(time.start + " - " + time.end);
                }
                else if (time.days == 'Tu') {
                    Tuarray.push(time.start + " - " + time.end);
                }
                else if (time.days == 'W') {
                    Warray.push(time.start + " - " + time.end);
                }
                else if (time.days == 'Th') {
                    Tharray.push(time.start + " - " + time.end);
                }
                else if (time.days == 'F') {
                    Farray.push(time.start + " - " + time.end);
                }
            }

            data = document.createElement('td');
            data.innerHTML = Marray.toString().replace(',', "<br />");
            row.appendChild(data);

            data = document.createElement('td');
            data.innerHTML = Tuarray.toString().replace(',', "<br />");
            row.appendChild(data);

            data = document.createElement('td');
            data.innerHTML = Warray.toString().replace(',', "<br />");
            row.appendChild(data);

            data = document.createElement('td');
            data.innerHTML = Tharray.toString().replace(',', "<br />");
            row.appendChild(data);

            data = document.createElement('td');
            data.innerHTML = Farray.toString().replace(',', "<br />");
            row.appendChild(data);

            table1.appendChild(row);
        }


        let table2 = document.createElement('table');
        headerRow = document.createElement('tr');
        d = document.createElement('caption')
        d.innerHTML = "Student 1"
        table2.appendChild(d);

        d = document.createElement('th')
        d.innerHTML = "Section"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "M"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "Tu"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "W"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "Th"
        headerRow.appendChild(d);
        d = document.createElement('th')
        d.innerHTML = "F"
        headerRow.appendChild(d);
        table2.appendChild(headerRow);

        console.log("---- s2");
        for (let section of pair.s2) {
            let row = document.createElement('tr');
            let Marray = [];
            let Tuarray = [];
            let Warray = [];
            let Tharray = [];
            let Farray = [];

            data = document.createElement('td');
            data.innerHTML = section.section;
            row.appendChild(data);
            for (let time of section.times) {
                if (time.days == 'M'){
                    Marray.push(time.start + " - " + time.end);
                }
                else if (time.days == 'Tu') {
                    Tuarray.push(time.start + " - " + time.end);
                }
                else if (time.days == 'W') {
                    Warray.push(time.start + " - " + time.end);
                }
                else if (time.days == 'Th') {
                    Tharray.push(time.start + " - " + time.end);
                }
                else if (time.days == 'F') {
                    Farray.push(time.start + " - " + time.end);
                }
            }

            data = document.createElement('td');
            data.innerHTML = Marray.toString().replace(',', "<br />");
            row.appendChild(data);

            data = document.createElement('td');
            data.innerHTML = Tuarray.toString().replace(',', "<br />");
            row.appendChild(data);

            data = document.createElement('td');
            data.innerHTML = Warray.toString().replace(',', "<br />");
            row.appendChild(data);

            data = document.createElement('td');
            data.innerHTML = Tharray.toString().replace(',', "<br />");
            row.appendChild(data);

            data = document.createElement('td');
            data.innerHTML = Farray.toString().replace(',', "<br />");
            row.appendChild(data);

            table2.appendChild(row);
        }

        var divRow = document.createElement('div');
        //divRow.className = 'row';
        divRow.style.display = 'inline-block';
        divRow.appendChild(table1);
        divRow.appendChild(table2);
        document.getElementById('scheduleInfo').appendChild(divRow);
    }
});