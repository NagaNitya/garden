let uniq=0; // unique identifieer for each plant

document.addEventListener("DOMContentLoaded", function () {
    // Prevent form submissions globally
    document.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the form submission (and reload)
        console.log("Form submission prevented globally!");
    });

    // Prevent links with href="#" from reloading the page
    document.addEventListener("click", function (event) {
        if (event.target.tagName === "A" && event.target.getAttribute("href") === "#") {
            event.preventDefault(); // Stops the link's default behavior
            console.log("Link click prevented!");
        }
    });
});


function display_form() {
    if (document.getElementById('plantInfo').style.display == 'flex') {
        document.getElementById('plantInfo').style.display = 'none';
    }
    document.getElementById('plantForm').style.display = 'flex';
    document.getElementById('submitInfo').onclick = () => save_log();
}

function cancel_log(){
    document.getElementById('plantForm').reset();
    document.getElementById('plantForm').style.display = 'none';
}

function save_log(){
    // get the values from the form
    var plant = document.getElementById('plantName').value;
    var type = document.getElementById('plantType').value;
    var age = document.getElementById('plantAge').value;
    var water= document.getElementById('wateringSchedule').value;
    var notes = document.getElementById('plantNotes').value;

    // create a JSON object to store the values
    var plantData = {
        id: uniq,
        plant: plant,
        type: type,
        age: age,
        water: water,
        notes: notes,
        records: {}
    };

    // store the JSON object in local storage
    var plantDataString = JSON.stringify(plantData);
    localStorage.setItem(uniq, plantDataString);
    uniq++; // increment the unique identifier

    // create a button for the plant and add it to the plantTabs div
    const tab=document.createElement('button'); //create the button
    tab.innerHTML = plant+" - "+type;
    tab.id=plantData.id;
    tab.onclick = () => show_log(plantData.id);
    document.getElementById('plantTabs').appendChild(tab);
    
    // clear the form
    document.getElementById('plantForm').style.display = 'none';
    document.getElementById('plantName').value = '';
    document.getElementById('plantType').value = '';
    document.getElementById('plantAge').value = '';
    document.getElementById('wateringSchedule').value = '';
    document.getElementById('plantNotes').value = '';

    // display success messsage
    alert('Plant added successfully');
}

function show_log(plant_id) {
    console.log("show_info"); // for debugging
    var plantDataString = localStorage.getItem(plant_id); // get the plant data from local storage
    var plantData = JSON.parse(plantDataString);
    console.log(plantDataString); // for debugging

    // display the plant data in the plantInfo div
    document.getElementById('Name').innerHTML = plantData.plant;
    document.getElementById('Type').innerHTML = plantData.type;
    document.getElementById('Age').innerHTML = plantData.age;
    document.getElementById('Schedule').innerHTML = plantData.water;
    document.getElementById('Notes').innerHTML = plantData.notes;
    let rec=document.getElementById('Records');
    rec.innerHTML='';
    if (plantData.records) {
        for (var key in plantData.records) {
            rec.innerHTML+=key + ' - ' + plantData.records[key]+'<br>';
            //document.getElementById('plantRecords').appendChild(record);
        }
    }

    // create buttons for editing, deleting, and adding records
    var edit_button=document.createElement('button');
    edit_button.innerHTML='edit';
    if (document.getElementById('editButton')) {
        document.getElementById('plantInfo').removeChild(document.getElementById('editButton'));
    }
    edit_button.onclick = () => edit_log(plantData.id, event);
    edit_button.id='editButton';
    edit_button.className='form_button';
    document.getElementById('plantInfo').appendChild(edit_button);

    var delete_button=document.createElement('button');
    delete_button.innerHTML='delete';
    if (document.getElementById('deleteButton')) {
        document.getElementById('plantInfo').removeChild(document.getElementById('deleteButton'));
    }
    delete_button.onclick = () => delete_log(plantData.id);
    delete_button.id='deleteButton';
    delete_button.className='form_button';
    document.getElementById('plantInfo').appendChild(delete_button);

    var add_record_button=document.createElement('button');
    add_record_button.innerHTML='add record';
    if (document.getElementById('addRecordButton')) {
        document.getElementById('plantInfo').removeChild(document.getElementById('addRecordButton'));
    }
    add_record_button.onclick = () => show_record_input(plantData.id);
    add_record_button.id='addRecordButton';
    add_record_button.className='form_button';
    document.getElementById('plantInfo').appendChild(add_record_button);

    document.getElementById('plantInfo').style.display = 'block';
}

function edit_log(id) {
    var plantDataString = localStorage.getItem(id);
    var plantData = JSON.parse(plantDataString);
    document.getElementById('plantName').value = plantData.plant;
    document.getElementById('plantType').value = plantData.type;
    document.getElementById('plantAge').value = plantData.age;
    document.getElementById('wateringSchedule').value = plantData.water;
    document.getElementById('plantNotes').value = plantData.notes;
    document.getElementById('submitInfo').onclick = () => save_edited_log(id, event);
    document.getElementById('plantInfo').style.display = 'none';
    document.getElementById('plantForm').style.display = 'flex';
}

function save_edited_log(id){
    var plant = document.getElementById('plantName').value;
    var type = document.getElementById('plantType').value;
    var age = document.getElementById('plantAge').value;
    var water= document.getElementById('wateringSchedule').value;
    var notes = document.getElementById('plantNotes').value;
    var plantData = {
        id: id,
        plant: plant,
        type: type,
        age: age,
        water: water,
        notes: notes,
        records: {}
    };
    var plantDataString = JSON.stringify(plantData);
    localStorage.setItem(id, plantDataString);

    // replace button in plantTabs with new one
    var button = document.getElementById(id);
    button.innerHTML = plant+" - "+type;
    document.getElementById("plantForm").reset();
    document.getElementById('plantForm').style.display = 'none';
}

function delete_log(id){
    localStorage.removeItem(id);
    document.getElementById('plantInfo').style.display = 'none';
    var button = document.getElementById(id);
    document.getElementById('plantTabs').removeChild(button);
    document.getElementById('plantForm').style.display = 'none';
}

function show_record_input(plant_id){
    document.getElementById('plantRecord').style.display = 'block';
    document.getElementById('addNewRecord').onclick = () => add_record(plant_id, event);
    document.getElementById('cancelRecord').onclick = function () {
        document.getElementById('addRecord').value = '';
        document.getElementById('plantRecord').style.display = 'none';
    };
}

function add_record(id){
    var plantDataString = localStorage.getItem(id);
    var plantData = JSON.parse(plantDataString);
    var val=document.getElementById('addRecord').value;
    const dateData=new Date();
    let date=dateData.getDate()+'/'+dateData.getMonth()+'/'+dateData.getFullYear()+' '+dateData.getHours()+':'+dateData.getMinutes()+':'+dateData.getSeconds();
    console.log(plantData.records);
    plantData.records[date]=val; 
    plantDataString = JSON.stringify(plantData);
    localStorage.setItem(id, plantDataString);
    document.getElementById('addRecord').value = '';
    document.getElementById('plantRecord').style.display = 'none';
    console.log(plantDataString);
    show_log(id);
}

