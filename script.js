function zeigeDatum() { 
    const heute = new Date(); 
    const formatiertesDatum = heute.toLocaleDateString("de-DE"); 
    document.getElementById("datum1").textContent = formatiertesDatum;
    document.getElementById("datum2").textContent = formatiertesDatum;
} 
function zeigeWochentag() { 
    try 
        { const wochentage = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag" ];
          const today = new Date(); 
        const tagIndex = today.getDay(); 
        const tagName = wochentage[tagIndex]; 
        document.getElementById("wochentage").textContent = tagName; 

    } 
    
    catch (error) 
       
        { console.error("Fehler beim Ermitten des Wochtentags:", error); 
         document.getElementById("wochentage").textContent = "Fehler"; 

} } 
   


function wieVielterWochentag() {
    const wieVielter = ["erste", "zweite", "dritte", "vierte", "fünfte"];
    const heute = new Date();
    const tagDesMonats = heute.getDate();
    const wieVielterIndex = Math.floor((tagDesMonats - 1) / 7);
    document.getElementById("wievielte").textContent = wieVielter[wieVielterIndex];
}


function zeigeMonat() {
    const heute = new Date();
    const monat = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const monatIndex = heute.getMonth();
    const monatName = monat[monatIndex];
    document.getElementById("monat").textContent = monatName;
    document.getElementById("monat2").textContent = monatName;
}

function zeigeJahr() {
    const heute = new Date();
    const jahr = heute.getFullYear();
    document.getElementById("jahr").textContent = jahr;
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

function prüfeFeiertag() {
    const datum = new Date();
    const jahr = datum.getFullYear();
    const ostern = getOstern(jahr);
    const karfreitag = new Date(ostern);
    karfreitag.setDate(karfreitag.getDate() - 2);
    const ostermontag = new Date(ostern);
    ostermontag.setDate(ostermontag.getDate() + 1);
    const pfingstmontag = new Date(ostern);
    pfingstmontag.setDate(pfingstmontag.getDate() + 50);
    const christiHimmelfahrt = new Date(ostern);
    christiHimmelfahrt.setDate(christiHimmelfahrt.getDate() + 39);
    const feiertage = [
        new Date(jahr, 0, 1),
        new Date(jahr, 4, 1),
        new Date(jahr, 9, 3),
        new Date(jahr, 9, 31),
        new Date(jahr, 10, 18),
        new Date(jahr, 11, 25),
        new Date(jahr, 11, 26),
    ];

const istFeiertag = feiertage.some (f =>
    f.toDateString() === datum.toDateString()
);


    if ( datum.toDateString() === ostermontag.toDateString() || 
         datum.toDateString() === karfreitag.toDateString() ||
         datum.toDateString() === christiHimmelfahrt.toDateString() ||
         datum.toDateString() === pfingstmontag.toDateString() ||
         istFeiertag

) {
         document.getElementById("feiertag").textContent = "ein";
}
    else {
        document.getElementById("feiertag").textContent = "kein";
    }
}


    


function zeigeDatumOhneJahr() { 
    const heute = new Date();
    const datumOhneJahr = heute.toLocaleDateString("de-DE", {day: "2-digit", month: "2-digit"});
    document.getElementById("datumohnejahr").textContent = datumOhneJahr;
}


zeigeDatum();
zeigeWochentag();
zeigeMonat();
zeigeJahr();
zeigeDatumOhneJahr();
wieVielterWochentag();
prüfeFeiertag();





