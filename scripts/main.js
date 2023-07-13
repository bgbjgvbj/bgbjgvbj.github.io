

function GetTimeString(today) {
    hour = ("0" + today.getHours()).slice(-2);
    minute = ("0" + today.getMinutes()).slice(-2);
    second = ("0" + today.getSeconds()).slice(-2);
    thestring = hour + ":" + minute + ":" + second;
    return thestring
}

function GetDateString(today) {
    const days = [
        "Minggu", 
        "Senin", 
        "Selasa", 
        "Rabu", 
        "Kamis", 
        "Jumat", 
        "Sabtu"
    ]
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ]
    year = today.getFullYear();
    month = months[today.getMonth()];
    date = today.getDate();
    day = days[today.getDay()];
    thestring = day + ", " + date + " " + month + " " + year;
    return thestring
}

function Refresh() {
    let today = new Date()
    const elements_hari = document.getElementsByName("hari_ini");
    const elements_jam = document.getElementsByName("jam_sekarang");
    if (elements_hari) {
        for (let i = 0; i < elements_hari.length; i++) {
            elements_hari[i].innerHTML = GetDateString(today);
        }
    }
    if (elements_jam) {
        for (let i = 0; i < elements_jam.length; i++) {
            elements_jam[i].innerHTML = GetTimeString(today);
        }
    }
}

setInterval(Refresh, 1000)