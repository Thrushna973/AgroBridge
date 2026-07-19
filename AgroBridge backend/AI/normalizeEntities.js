const crops = require("./constants/crops");
const workTypes = require("./constants/worktypes");

const normalizeValue = (value, dictionary) => {
    if (!value) return value;
    const input = value.toString().toLowerCase().trim();
    const words = input.split(/\s+/);
    for (const canonical in dictionary) {
        const aliases = dictionary[canonical];
        const matched = aliases.some(alias => { 
            alias = alias.toLowerCase();
            return (
                input.includes(alias) ||
                words.includes(alias)
            );
        });
        if (matched) {
            return canonical;
        }
    }
    return value;
};



const normalizeEntities = (data) => {
    const farmSource = [data.farmtype,data.description,data.title].filter(Boolean).join(" ");
    const workSource = [data.worktype,data.description,data.title].filter(Boolean).join(" ");
    return {
        ...data,
        farmtype: normalizeValue(farmSource,crops),

        worktype: normalizeValue(workSource,workTypes)
    };
};

module.exports = normalizeEntities;