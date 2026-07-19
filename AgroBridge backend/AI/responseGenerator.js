const QUESTIONS = {

    wage: "రోజుకు ఎంత వేతనం ఇస్తారు?",

    requiredworkers: "ఎంత మంది కార్మికులు కావాలి?",

    startdate: "పని ఎప్పుడు ప్రారంభమవుతుంది?",

    enddate: "పని ఎప్పుడు పూర్తవుతుంది?",

    workinghours: "రోజుకు ఎన్ని గంటలు పని ఉంటుంది?",

    food: "భోజనం ఏర్పాటు చేస్తారా?",

    accommodation: "వసతి కల్పిస్తారా?",

    experience: "ఎన్ని సంవత్సరాల అనుభవం కావాలి? అనుభవం అవసరం లేకపోతే 0 సంవత్సరాలు అని చెప్పండి.",

    distance: "పని ప్రదేశం ఎంత దూరంలో ఉంది?",

    village: "ఏ గ్రామంలో పని ఉంది?",

    worktype: "ఏ పని చేయాలి?",

    farmtype: "ఏ పంటకు పని ఉంది?",

    skills: "ఏమైనా ప్రత్యేక నైపుణ్యాలు కావాలా?"

};

const ACKNOWLEDGEMENTS = {

    wage: value =>
        `సరే, రోజుకు ₹${value} వేతనం నమోదు చేశాను.`,

    requiredworkers: value =>
        `సరే, ${value} మంది కార్మికులు అవసరం.`,

    startdate: value =>
        `సరే, పని ${value} ప్రారంభమవుతుంది.`,

    enddate: value =>
        `సరే, పని ${value} పూర్తవుతుంది.`,

    workinghours: value =>
        `సరే, రోజుకు ${value} పని ఉంటుంది.`,

    village: value =>
        `సరే, పని ${value} గ్రామంలో ఉంటుంది.`,

    distance: value =>
        `సరే, పని ${value} దూరంలో ఉంది.`,

    farmtype: value =>
        `సరే, ${value} పంటకు పని.`,

    worktype: value =>
        `సరే, ${value} పని.`,

    experience: value => {
            if (Number(value) === 0) {
                return "సరే, అనుభవం అవసరం లేదని నమోదు చేశాను.";
            }
            return `సరే, ${value} సంవత్సరాల అనుభవం నమోదు చేశాను.`;
        },

    food: value =>
        value
            ? `సరే, భోజనం అందిస్తారు.`
            : `సరే, భోజనం ఉండదు.`,

    accommodation: value =>
        value
            ? `సరే, వసతి అందిస్తారు.`
            : `సరే, వసతి ఉండదు.`,

    skills: value =>
        Array.isArray(value) && value.length
            ? `సరే, ప్రత్యేక నైపుణ్యాలు నమోదు చేశాను.`
            : ""
};


const generateTemplateReply = ({updates,correctedFields,nextField}) => {
    let acknowledgement = "";
    for (const key of Object.keys(updates)) {
        const fn = ACKNOWLEDGEMENTS[key];
        if (fn) {
            acknowledgement += fn(updates[key]) + "\n";
        }
    }
    if (correctedFields.length) {
        acknowledgement = "సరే, వివరాలను నవీకరించాను.\n";
    }
    const question = QUESTIONS[nextField] || "";
    return `${acknowledgement}\n${question}`.trim();
};

module.exports = { generateTemplateReply};