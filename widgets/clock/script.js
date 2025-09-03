const clock = document.getElementById("clock");
const title = document.getElementById("title");
const time = document.getElementById("time");
const amPm = document.getElementById("am-pm");
const backgroundColorSelect = document.getElementById("background-color");
const fontColorSelect = document.getElementById("font-color");

const urlParams = new URLSearchParams(window.location.search);
const label = urlParams.get("label")
const timeZone = urlParams.get("timezone")

title.innerText = label ? label : timeZone;


// Default values
let requiredBackgroundColor = urlParams.get("bc") ?? "LM-Default";
let requiredFontColor = urlParams.get("fc") ?? "LM-Default";

let is24Hour = urlParams.get("24h") === "true";
let backgroundColor = requiredBackgroundColor.startsWith('#') ? requiredBackgroundColor : getBackgroundColor(requiredBackgroundColor);
let fontColor = requiredFontColor.startsWith('#') ? requiredFontColor : getFontColor(requiredFontColor);

function getFontColor(colorName) {
    // Light mode colors
    switch (colorName) {
        case "LM-Default":
            return "#37352F";
        case "LM-Grey":
            return "#787774";
        case "LM-Brown":
            return "#9F6B53";
        case "LM-Orange":
            return "#D9730D";
        case "LM-Yellow":
            return "#CB912F";
        case "LM-Green":
            return "#448361";
        case "LM-Blue":
            return "#337EA9";
        case "LM-Purple":
            return "#9065B0";
        case "LM-Pink":
            return "#C14C8A";
        case "LM-Red":
            return "#D44C47";
    }

    // Dark mode colors
    switch (colorName) {
        case "DM-Grey":
            return "#979A9B";
        case "DM-White":
            return "#D4D4D4";
        case "DM-Brown":
            return "#937264";
        case "DM-Orange":
            return "#FFA344";
        case "DM-Yellow":
            return "#FFDC49";
        case "DM-Green":
            return "#4DAB9A";
        case "DM-Blue":
            return "#529CCA";
        case "DM-Purple":
            return "#9A6DD7";
        case "DM-Pink":
            return "#E255A1";
        case "DM-Red":
            return "#FF7369";
    }

    return "#37352F";
}

function getBackgroundColor(colorName) {
    // Light mode colors
    switch (colorName) {
        case "LM-Default":
            return "#FFFFFF";
        case "LM-Off-White":
            return "#F7F6F3";
        case "LM-Grey":
            return "#F1F1EF";
        case "LM-Brown":
            return "#F4EEEE";
        case "LM-Orange":
            return "#FAEBDD";
        case "LM-Yellow":
            return "#FBF3DB";
        case "LM-Green":
            return "#EDF3EC";
        case "LM-Blue":
            return "#E7F3F8";
        case "LM-Purple":
            return "#F6F3F9";
        case "LM-Pink":
            return "#FAF1F5";
        case "LM-Red":
            return "#FDEBEC";
    }

    // Dark mode colors
    switch (colorName) {
        case "DM-Default":
            return "#191919";
        case "DM-Hover":
            return "#262626";
        case "DM-Sidebar":
            return "#202020";
        case "DM-Brown":
            return "#434040";
        case "DM-Orange":
            return "#594A3A";
        case "DM-Yellow":
            return "#59563B";
        case "DM-Green":
            return "#354C4B";
        case "DM-Blue":
            return "#364954";
        case "DM-Purple":
            return "#443F57";
        case "DM-Pink":
            return "#533B4C";
        case "DM-Red":
            return "#594141";
    }

    return "#FFFFFF";
}

function getCityHour(timeZone) {
    const hour = new Intl.DateTimeFormat('es-MX', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: is24Hour
    }).format(new Date());

    return hour.replace(" a.m.", "").replace(" p.m.", "");
}

function updateTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    time.innerText = getCityHour(timeZone)
    if (!is24Hour) {
        let amPmValue = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        amPm.innerText = amPmValue;
    } else {
        amPm.innerText = "";
    }

    clock.style.color = fontColor;
    document.body.style.color = fontColor;
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.opacity = 1;
}


// got page opacity on 0 while is loading, then set it to 1 once the content is loaded with a transition
document.body.style.opacity = 0;
document.body.style.transition = "opacity 0.5s ease-in-out";

document.addEventListener("DOMContentLoaded", function () {
    setInterval(updateTime, 1000);
});