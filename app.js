// app.js

let currentQuantity = 120;

const timeline = document.getElementById("timeline");

function updateTime() {

  const now = new Date();

  document.getElementById("liveTime").textContent =
    now.toLocaleTimeString();

}

function createEvent(message, color = "#3b82f6") {

  const event = document.createElement("div");

  event.classList.add("timeline-event");

  event.style.borderLeftColor = color;

  const time = new Date().toLocaleTimeString();

  event.innerHTML = `
    <small>${time}</small>
    <strong>${message}</strong>
  `;

  timeline.prepend(event);

  if (timeline.children.length > 6) {
    timeline.removeChild(timeline.lastChild);
  }

}

function generateTelemetry() {

  const change = Math.floor(Math.random() * 21) - 10;

  currentQuantity += change;

  if (currentQuantity < 0) {
    currentQuantity = 0;
  }

  let state = "Stable";
  let alert = "None";
  let color = "#3b82f6";

  if (change >= 8) {
    state = "Restocked";
    color = "#22c55e";

    createEvent(`Shelf Restocked (+${change} units)`, color);

  } else if (change > 0) {

    state = "Added";
    color = "#38bdf8";

    createEvent(`${change} units added`, color);

  } else if (change <= -8) {

    state = "Empty";
    alert = "Low Stock Warning";
    color = "#ef4444";

    createEvent(`Critical depletion detected (${change})`, color);

  } else if (change < 0) {

    state = "Removed";
    color = "#f97316";

    createEvent(`${Math.abs(change)} units removed`, color);
  }

  const battery = Math.floor(Math.random() * 20) + 80;

  document.getElementById("stockQuantity").textContent =
    currentQuantity;

  document.getElementById("stockState").textContent =
    state;

  document.getElementById("movementDelta").textContent =
    `${change > 0 ? "+" : ""}${change}`;

  document.getElementById("consumptionRate").textContent =
    `${Math.floor(Math.random() * 25)}%`;

  document.getElementById("batteryStatus").textContent =
    `${battery}%`;

  document.getElementById("systemAlerts").textContent =
    alert;

  document.getElementById("deviceHealth").textContent =
    battery < 85 ? "Sensor Check Required" : "Healthy";

  document.getElementById("iotStatus").textContent =
    Math.random() > 0.2 ? "Awake" : "Sleep";

}

setInterval(updateTime, 1000);

setInterval(generateTelemetry, 4000);

updateTime();
generateTelemetry();
