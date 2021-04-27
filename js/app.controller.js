<<<<<<< HEAD
import {
    locService
} from './services/loc.service.js'
import {
    mapService
} from './services/map.service.js'
=======
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/storage.service.js'
>>>>>>> 27c9f631d6c7f86c437968d185a777d6650480b0

window.onload = onInit;

function onInit() {
    addEventListenrs();
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

function addEventListenrs() {
    renderTable();
    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
        console.log('Panning the Map');
        mapService.panTo(35.6895, 139.6917);
    })
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        mapService.addMarker({
            lat: 32.0749831,
            lng: 34.9120554
        });
    })
    document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
        locService.getLocs()
            .then(locs => {
                console.log('Locations:', locs)
                document.querySelector('.locs').innerText = JSON.stringify(locs)
            })

    })
    document.querySelector('.btn-user-pos').addEventListener('click', (ev) => {
        getPosition()
            .then(pos => {
                console.log('User position is:', pos.coords);
                document.querySelector('.user-pos').innerText =
                    `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            })
            .catch(err => {
                console.log('err!!!', err);
            })
    })
    document.querySelector('.search-input').addEventListener('keypress', (ev) => {
        if (ev.keyCode === 13) {
            mapService.onGetSearchInp(document.querySelector('.search-input').value)
        }
    })
}




// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
<<<<<<< HEAD
=======
}

function renderTable() {
    console.log('renderTable');
    const locs = storageService.loadFromStorage('locs');
    if (locs === null) return
    let strHtml = '<tr> <th>name</th> <th>id</th> <th>lat</th> <th>lng</th> <th>weather</th> <th>createdAt</th> <th>updatedAt</th> </tr>';
    console.log(locs);
    locs.map((loc) => {
        strHtml += `<tr><td>${loc.name}</td>
        <td>${loc.id}</td>
        <td>${loc.lat}</td>
        <td>${loc.lng}</td>
        <td>${loc.weather}</td>
        <td>${loc.createdAt}</td>
        <td>${loc.updatedAt}</td>
        </tr>`
    })
    document.querySelector('.table-container').innerHTML += strHtml;

>>>>>>> 27c9f631d6c7f86c437968d185a777d6650480b0
}