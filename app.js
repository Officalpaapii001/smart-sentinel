function updateTime(){

  const now = new Date();

  document.getElementById("liveTime").innerHTML =
    now.toLocaleTimeString();

}

setInterval(updateTime,1000);

updateTime();
