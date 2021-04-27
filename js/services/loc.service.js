export const locService = {
    getLocs
}
var locs = [
    { name: 'Loc1', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Loc2', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function saveLocs(name, lat, lng, weather) {
    locs.push({
        name,
        lat,
        lng,
        weather,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        id: ++gId
    });
    storageService.saveToStorage('locs', locs)
}
