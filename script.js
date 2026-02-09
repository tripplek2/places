function FavouritePlaces() {
    this.visitedplaces= {};
    this.currentId= 0;

}

FavouritePlaces.prototype.assignId= function() {
    this.currentId++;
    return this.currentId;

}

FavouritePlaces.prototype.addVisitedPlaces= function(visitedplace) {
    visitedplace.id = this.assignId()
    this.visitedplaces[visitedplace.id] = visitedplace

}

FavouritePlaces.prototype.deleteVisitedPlace = function(id) {
    if (this.visitedplaces[id]) {
        delete this.visitedplaces[id];
        return true;
    }
    return false;
}


function visitedPlace (location, landmark, timeOfTheYear, notes, imageUrl) {
    this.location = location;
    this.landmark = landmark;
    this.timeOfTheYear = timeOfTheYear;
    this.notes = notes;
    this.imageUrl = imageUrl;
    
}

const favouritePlaces = new FavouritePlaces();
const listEl = document.getElementById("list-of-places")

const defaultPlaces = [
    new visitedPlace("Nairobi", "Uhuru park", "1st June 2024", "Horse riding", "https://images.unsplash.com/photo-1573751055635-a0ad5937fd37?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvcnNlc3xlbnwwfHwwfHx8MA%3D%3D"),
    new visitedPlace("Mombasa", "Beach", "15th July 2025", "Swimming and surfing","https://images.unsplash.com/photo-1614270261057-3b9131d2d31d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3dpbW1pbmclMjBhbmQlMjBzdXJmaW5nfGVufDB8fDB8fHww" ),
    new visitedPlace("Naivasha", "Town", "12th Dec 2025", "Family time and trying out amazing cuisines", "https://plus.unsplash.com/premium_photo-1695297515191-5870e86dcbe0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGN1aXNpbmVzfGVufDB8fDB8fHww" )
]

defaultPlaces.forEach(place => favouritePlaces.addVisitedPlaces(place));
renderFavouritePlaces();


function handleAddVisitedPlaces() {
    const locationIn = document.getElementById("location");
    const landmarkIn = document.getElementById("landmark");
    const timeOfTheYearIn = document.getElementById("timeOfTheYear");
    const notesIn = document.getElementById("notes")
    const imageIn = document.getElementById("imageUrl");


    if (locationIn.value.trim() === "") {
        alert("please enter a place location.");
        return;
    }


    const newPlace = new visitedPlace(
        locationIn.value,
        landmarkIn.value,
        timeOfTheYearIn.value,
        notesIn.value,
        imageIn.value
    );


favouritePlaces.addVisitedPlaces(newPlace);

renderFavouritePlaces();


locationIn.value = "";
landmarkIn.value = "";
timeOfTheYearIn.value = "";
notesIn.value = "";
imageIn.value = "";
}

function renderFavouritePlaces() {
  listEl.innerHTML = "";
  
  Object.values(favouritePlaces.visitedplaces).forEach(place => {
        const li = document.createElement("li");
        li.textContent = place.location;
        li.setAttribute("onclick", `showPlaceDetails(${place.id})`);
        listEl.appendChild(li);
    });
}

function showPlaceDetails(id) {
    const place = favouritePlaces.visitedplaces[id];
    const detailsDiv = document.getElementById("places-details");

    detailsDiv.innerHTML = 
        `<h2>Place Details</h2>
        <p><strong>Location:</strong> ${place.location}</p>
        <p><strong>Landmark:</strong> ${place.landmark}</p>
        <p><strong>Time of the Year:</strong> ${place.timeOfTheYear}</p>
        <p><strong>Notes:</strong> ${place.notes ? place.notes : "None"}</p>
        ${place.imageUrl ? `<img src="${place.imageUrl}" style="max-width:300px;">` : ""}`
}








