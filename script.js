main();

function main() {
    const today = new Date();
    writeTextBlock(today);
    createCalender(today);
   // whriteHistoricalHappenings(today); -> rausgenommen weil Historische Ereignisse schon beim laden der Seite da stehen.
}

function writeTextBlock(date) {
    zeigeDatum(date);

    zeigeDatumOhneJahr(date);
    zeigeWochentag(date);
    zeigeFeiertag(date);
    zeigeMonat(date);
    zeigeJahr(date);
    wieVielterWochentag(date);
    
}

function zeigeKalenderdatum() {
    const heute = new Date();
   const heutigerTag = heute.getDate();

   const kalender = document.getElementById("kalenderdatum");
   const tage = kalender.querySelectorAll("td");
   tage.forEach(function(td) {
        if (td.textContent == heutigerTag) {
        td.classList.add("heute");
        }
   });
}

          

function zeigeDatum(date) { 
    const formatiertesDatum = date.toLocaleDateString("de-DE"); 
    document.getElementById("datum1").textContent = formatiertesDatum;
    document.getElementById("datum2").textContent = formatiertesDatum;
} 

function zeigeWochentag(date) { 
        const tagIndex = date.getDay(); 
        const tagName = getWeekday(tagIndex); 
        document.getElementById("wochentage").textContent = tagName; 

    } 

function wieVielterWochentag(date) {
    const tagDesMonats = date.getDate();
    const wieVielterIndex = Math.floor((tagDesMonats - 1) / 7);
    document.getElementById("wievielte").textContent = getWeekdayCount(wieVielterIndex);
}


function zeigeMonat(date) {
    const monatIndex = date.getMonth();
    const monatName = getMonthName(monatIndex);
    document.getElementById("monat").textContent = monatName;
}

function zeigeJahr(date) {
    const jahr = date.getFullYear();
    document.getElementById("jahr").textContent = jahr;
}

function zeigeDatumOhneJahr(date) {

    const datumOhneJahr = date.toLocaleDateString("de-DE", {day: "2-digit", month: "2-digit"});
    document.getElementById("datumohnejahr").textContent = datumOhneJahr;
}

function zeigeFeiertag(date) {
    const e = document.getElementById("feiertag");
    if (datumIstFeiertag(date)) {
        e.textContent = "ein"
    }  else {
        e.textContent = "kein"
      }  
    }

function createCalender(date) {
    fortlaufenderKalender(date)
    HighlightToday(date)
    showMonth(date)
}

function HighlightToday(date) {
    const heute = new Date();
    const gleicherMonat =
    date.getMonth() === heute.getMonth() && //mit gleichen Tag vergleichen
    date.getFullYear() === heute.getFullYear();
    const kalender = document.getElementById("kalenderdatum");
    const tage = kalender.querySelectorAll("td");
    tage.forEach(function (td) {
        td.classList.remove("heute");
        if (gleicherMonat && td.textContent == heute.getDate()) {
            td.classList.add("heute");

             
        }
        });
    }

function getWeekday(i) {
    const days = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag"
    ];
    return days[i];
}

function getMonthName(i) {
    const months = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
    ];
    return months[i];    
}

function getWeekdayCount(i) {
    const count = [
        "erste",
        "zweite",
        "dritte",
        "vierte",
        "fünfte"
    ];
    return count[i]
}

function getOstern(jahr) {
    const a = jahr % 19;
    const b = Math.floor(jahr / 100);
    const c = jahr % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * 1) / 451);
    const monat = Math.floor((h + 1 - 7 * m + 114) / 31) - 1;
    const tag = ((h + 1 - 7 * m + 114) % 31) + 1;

    return new Date(jahr,monat,tag);
}

function datumIstFeiertag(date) {
    const jahr = date.getFullYear();
    const ostern = getOstern(jahr);
    const osterSonntagMonat = ostern.getMonth();
    const osterSonntagTag = ostern.getDate();
    const karfreitag = new Date(jahr, osterSonntagMonat, osterSonntagTag - 2);
    const ostermontag = new Date(jahr, osterSonntagMonat, osterSonntagTag + 1);
    const pfingstmontag = new Date(jahr, osterSonntagMonat, osterSonntagTag + 50);
    const christiHimmelfahrt = new Date(jahr, osterSonntagMonat, osterSonntagTag + 39);
    const feiertage = [
        new Date(jahr, 0, 1),
        new Date(jahr, 4, 1),
        new Date(jahr, 9, 3),
        new Date(jahr, 9, 31),
        new Date(jahr, 10, 18),
        new Date(jahr, 11, 25),
        new Date(jahr, 11, 26),
        new Date(jahr, 7, 6),
    ];

      

const istFeiertag = feiertage.some (f =>
    f.toDateString() === date.toDateString()
);


    if ( date.toDateString() === ostermontag.toDateString() || 
         date.toDateString() === karfreitag.toDateString() ||
         date.toDateString() === christiHimmelfahrt.toDateString() ||
         date.toDateString() === pfingstmontag.toDateString() ||
         istFeiertag

) {
         return true;
}
    else {
        return false;
    }

}

function fortlaufenderKalender(date) {
const kalender = document.getElementById("kalenderdatum");    
const jahr = date.getFullYear();
const monat = date.getMonth();
document.getElementById("monat2").textContent =
getMonthName(monat) + " ";

const tage = kalender.querySelectorAll("td");
const ersterTag = new Date(jahr,monat, 1);
const letzterTag = new Date(jahr, monat + 1, 0);
let start = ersterTag.getDay() - 1;

if (start === -1) {
    start = 6;
}

tage.forEach(td => {
    td.textContent ="";
    td.classList.remove("heute");
    td.classList.remove("feiertag");
});

for (let tag = 1; tag <= letzterTag.getDate(); tag++) {
    const td = tage[start + tag - 1];
    td.textContent = tag;
    td.classList.remove("feiertag");
    const datum = new Date(jahr, monat, tag);
    if(datumIstFeiertag(datum)) {
        td.classList.add("feiertag");
    }
}
}

let currentDate = new Date();

function showMonth(date) {
    const month = date.toLocaleDateString("de-DE", {
        month: "long",
    });
    document.getElementById("monat2").textContent = month;
}
    document.getElementById("vorherigerMonat").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    fortlaufenderKalender(currentDate);
    HighlightToday(currentDate);
    showMonth(currentDate);
})    
    document.getElementById("nächsterMonat").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    fortlaufenderKalender(currentDate);
    HighlightToday(currentDate);
    showMonth(currentDate);
});
showMonth(currentDate);

function whriteHistoricalHappenings(date) {
    ereignisseLaden(date)
}

async function ereignisseLaden() {
    const container = document.getElementById("ereignisse");
    const date = new Date();

    try {
        const monat = String(date.getMonth() + 1).padStart(2, "0");
        const tag = String(date.getDate()).padStart(2, "0");
        const response = await fetch(`https://history.muffinlabs.com/date/${monat}/${tag}`);
        if(!response.ok) {
            throw new Error("API konnte nicht geladen werden");
        }
        const daten =await response.json();
        container.innerHTML = "";

        const ereignisse = [...daten.data.Events]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
        ereignisse.forEach(ereignis => {
            const artikel = document.createElement("li");
         
        artikel.innerHTML = `   
            <strong>${ereignis.year}</strong>
            ${ereignis.text}
            `;

            container.appendChild(artikel);
        });
    }   catch (error) {
        container.innerHTML = `<li>Fehler beim Laden: ${error.message}</li>`;
    }}
