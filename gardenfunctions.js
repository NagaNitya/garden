let uniq=0; // unique identifieer for each plant

function display_form() {
    if (document.getElementById('plantInfo').style.display == 'block') {
        document.getElementById('plantInfo').style.display = 'none';
    }
    document.getElementById('plantForm').style.display = 'block';
}

function show_info(plant) {
    console.log("show_info");
    var plantDataString = localStorage.getItem(plant);
    var plantData = JSON.parse(plantDataString);
    console.log(plantDataString);
    document.getElementById('Name').innerHTML = plantData.plant;
    document.getElementById('Type').innerHTML = plantData.type;
    document.getElementById('Age').innerHTML = plantData.age;
    document.getElementById('Schedule').innerHTML = plantData.water;
    document.getElementById('Notes').innerHTML = plantData.notes;
    if (plantData.records) {
        for (var key in plantData.records) {
            var record = document.createElement('div');
            record.id='record';
            record.innerHTML = key + ' - ' + plantData.records[key];
            document.getElementById('Records').appendChild(record);
        }
    }
    document.getElementById('plantInfo').style.display = 'block';
}

function edit_info(event) {
    event.preventDefault();
    var plant = document.getElementById('Name').innerHTML;
    var plantDataString = localStorage.getItem(plant);
    var plantData = JSON.parse(plantDataString);
    document.getElementById('plantName').value = plantData.plant;
    document.getElementById('plantType').value = plantData.type;
    document.getElementById('plantAge').value = plantData.age;
    document.getElementById('wateringSchedule').value = plantData.water;
    document.getElementById('plantNotes').value = plantData.notes;
    document.getElementById('submitInfo').innerHTML = 'edit';
    document.getElementById('plantInfo').style.display = 'none';
    document.getElementById('plantForm').style.display = 'block';
}

function store_info(event) {
    event.preventDefault();
    var plant = document.getElementById('plantName').value;
    var type = document.getElementById('plantType').value;
    var age = document.getElementById('plantAge').value;
    var water= document.getElementById('wateringSchedule').value;
    var notes = document.getElementById('plantNotes').value;
    var plantData = {
        id: uniq,
        plant: plant,
        type: type,
        age: age,
        water: water,
        notes: notes,
        records: {}
    };
    var plantDataString = JSON.stringify(plantData);
    const tab=document.createElement('button');
    tab.innerHTML = plant+" - "+type;
    tab.id = plant;
    tab.className='tab';
    document.getElementById('plantTabs').appendChild(tab);
    localStorage.setItem(plant, plantDataString);
    tab.onclick = () => show_info(plant);
    document.getElementById('plantForm').style.display = 'none';
    document.getElementById('plantName').value = '';
    document.getElementById('plantType').value = '';
    document.getElementById('plantAge').value = '';
    document.getElementById('wateringSchedule').value = '';
    document.getElementById('plantNotes').value = '';
    console.log(localStorage.getItem(plant));
}

function edit_info(){
    var plant = document.getElementById('Name').innerHTML;
    var plantDataString = localStorage.getItem(plant);
    var plantData = JSON.parse(plantDataString);
    plantData.plant = document.getElementById('plantName').value;
    plantData.type = document.getElementById('plantType').value;
    plantData.age = document.getElementById('plantAge').value;
    plantData.water = document.getElementById('wateringSchedule').value;
    plantData.notes = document.getElementById('plantNotes').value;
    plantDataString = JSON.stringify(plantData);
    localStorage.setItem(plant, plantDataString);
    document.getElementById('plantInfo').style.display = 'none';
    document.getElementById('plantForm').style.display = 'none';
    console.log(localStorage.getItem(plant));
}

function delete_info(){
    var plant = document.getElementById('Name').innerHTML;
    localStorage.removeItem(plant);
    document.getElementById('plantInfo').style.display = 'none';
    var button = document.getElementById(plant);
    document.getElementById('plantTabs').removeChild(button);
    document.getElementById('plantForm').style.display = 'none';
}

function show_input(){
    document.getElementById('plantRecord').style.display = 'block';
}

function add_record(event){
    event.preventDefault();
    var plant = document.getElementById('Name').innerHTML;
    var plantDataString = localStorage.getItem(plant);
    var plantData = JSON.parse(plantDataString);
    var val=document.getElementById('addRecord').value;
    const dateData=new Date();
    let date=dateData.getDate()+'/'+dateData.getMonth()+'/'+dateData.getFullYear()+' '+dateData.getHours()+':'+dateData.getMinutes();
    plantData.records[date]=val;
    plantDataString = JSON.stringify(plantData);
    localStorage.setItem(plant, plantDataString);
    document.getElementById('plantRecord').style.display = 'none';
    console.log(plantDataString);
    show_info(plant);
}
