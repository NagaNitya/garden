function display_form() {
    if (document.getElementById('plantInfo').style.display == 'block') {
        document.getElementById('plantInfo').style.display = 'none';
    }
    document.getElementById('plantForm').style.display = 'block';
}

function show_info() {
    var plant = this.innerHTML;
    var plantDataString = localStorage.getItem(plant);
    var plantData = JSON.parse(plantDataString);
    console.log(plantData.age);
    document.getElementById('Name').innerHTML = plantData.plant;
    document.getElementById('Type').innerHTML = plantData.type;
    document.getElementById('Age').innerHTML = plantData.age;
    document.getElementById('Schedule').innerHTML = plantData.water;
    document.getElementById('Notes').innerHTML = plantData.notes;
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
        plant: plant,
        type: type,
        age: age,
        water: water,
        notes: notes
    };

    var existingButton = document.getElementById(plant);

    if (existingButton) {
        console.log("Plant exists. Replacing the button.");
        document.getElementById('plantTabs').removeChild(existingButton); // Remove old button
    }

    var plantDataString = JSON.stringify(plantData);
    const tab=document.createElement('button');
    tab.innerHTML = plant;
    tab.id = plant;
    tab.className='tab';
    tab.onclick = show_info
    document.getElementById('plantTabs').appendChild(tab);
    localStorage.setItem(plant, plantDataString);
    document.getElementById('plantForm').style.display = 'none';
}

function delete_info(){
    var plant = document.getElementById('Name').innerHTML;
    localStorage.removeItem(plant);
    document.getElementById('plantInfo').style.display = 'none';
    var button = document.getElementById(plant);
    document.getElementById('plantTabs').removeChild(button);
    document.getElementById('plantForm').style.display = 'none';
}

// add functionality to keep adding new information (add record)
