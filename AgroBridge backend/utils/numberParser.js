const UNITS = {
    "సున్నా":0,

    "ఒక":1,
    "ఒకటి":1,
    "ఒక్కడు":1,

    "రెండు":2,

    "మూడు":3,
    "ముగ్గురు":3,

    "నాలుగు":4,

    "ఐదు":5,

    "ఆరు":6,

    "ఏడు":7,

    "ఎనిమిది":8,

    "తొమ్మిది":9
};

const TEENS = {

    "పది":10,

    "పదకొండు":11,

    "పన్నెండు":12,

    "పదమూడు":13,

    "పద్నాలుగు":14,

    "పదిహేను":15,

    "పదహారు":16,

    "పదిహేడు":17,

    "పద్దెనిమిది":18,

    "పంతొమ్మిది":19

};

const TENS = {

    "ఇరవై":20,

    "ముప్పై":30,

    "నలభై":40,

    "యాభై":50,

    "అరవై":60,

    "డెబ్బై":70,

    "ఎనభై":80,

    "తొంభై":90

};

function extractNumberFromText(message) {
    if (!message)
        return null;
    const digit = message.match(/\d+/);
    if (digit)
        return Number(digit[0]);

    message = message
        .replace(/రోజుకు|రోజుకి|రూపాయలు|రూపాయి|మంది|గంటలు|గంట|కిలోమీటర్లు|కిలోమీటర్|సంవత్సరాలు|సంవత్సరం/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    let total = 0;

    if (message.includes("వెయ్యి")) {
        const parts = message.split("వెయ్యి");
        const before = parts[0].trim();
        if (before === "") {
            total += 1000;
        } else {
            const key = Object.keys(UNITS).find(k => before.includes(k));
            total += ((UNITS[key] || 1) * 1000);
        }
        message = parts[1];
    }

  
    if (message.includes("వంద")) {
        const parts = message.split("వంద");
        const before = parts[0].trim();
        if (before === "") {
            total += 100;
        } else {
            const key = Object.keys(UNITS).find(k => before.includes(k));
            total += ((UNITS[key] || 1) * 100);
        }
        message = parts[1];
    }
    for (const key of Object.keys(TEENS)) {
        if (message.includes(key)) {
            total += TEENS[key];
            return total;
        }
    }
    for (const key of Object.keys(TENS)) {
        if (message.includes(key)) {
            total += TENS[key];
            message = message.replace(key, "");
            break;
        }
    }
    for (const key of Object.keys(UNITS)) {
        if (message.includes(key)) {
            total += UNITS[key];
            break;
        }
    }
    return total === 0 ? null : total;
}

module.exports={extractNumberFromText};