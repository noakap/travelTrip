export const mapService = {
    initMap,
    addMarker,
    panTo,
    onGetSearchInp
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: {
                        lat,
                        lng
                    },
                    zoom: 15
                })
            console.log('Map!', gMap);
        })
        .then(() => onMapClicked())
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng, ) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
    gMap.setZoom(15);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyB0EIQREreMgVBQpkOR4tl56nYTMLlTn0c';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function onMapClicked() {
    gMap.addListener('click', onGetPos)
}

function onGetPos(ev) {
    panTo(ev.latLng.lat(), ev.latLng.lng())
}

function onGetSearchInp(input) {
    let searchApi = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + input +
        '&key=AIzaSyB0EIQREreMgVBQpkOR4tl56nYTMLlTn0c'
    onGetData(searchApi)
}

function onGetData(link) {
    const prm = getData(link);
    prm.then(renderData)
}

function getData(link) {
    const prm = axios.get(link)
        .then(res => res.data)
    return prm;
}

function renderData(prm) {
    const lat = prm.results[0].geometry.location.lat
    const lng = prm.results[0].geometry.location.lng
    panTo(lat, lng)
}