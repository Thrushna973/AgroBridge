const Job = require("../models/Jobs");

const REQUIRED_FIELDS = [
    "wage",
    "requiredworkers",
    "startdate",
    "enddate",
    "workinghours",
    "food",
    "accommodation",
    "experience",
    "distance",
    "village",
    "worktype",
    "farmtype",
    "skills"
];


const getMissingFields = (jobData) => {
    return REQUIRED_FIELDS.filter(field => {
        const value = jobData[field];
        if (value === undefined ||value === null ||value === "") {
            return true;
        }
        if (Array.isArray(value) && value.length === 0) {
            return true;
        }
        return false;
    });
};


const validateJob = (jobData) => {
    const missingFields = getMissingFields(jobData);
    if (missingFields.length > 0) {
        throw {
            status: 400,
            message: "Please fill all required fields.",
            missingFields
        };
    }
};
const validateFieldValues = (jobData) => {
    const errors = {};
    const start = new Date(jobData.startdate);
    const end = new Date(jobData.enddate);
    if (isNaN(start.getTime())) {
        errors.startdate = "ప్రారంభ తేదీ సరైనది కాదు.";
    }
    if (isNaN(end.getTime())) {
        errors.enddate = "ముగింపు తేదీ సరైనది కాదు.";
    }
    if (!errors.startdate && !errors.enddate && end < start) {
        errors.enddate = "ముగింపు తేదీ ప్రారంభ తేదీ తర్వాత ఉండాలి.";
    }
    if (typeof jobData.workinghours !== "number" ||jobData.workinghours < 1 ||jobData.workinghours > 24) {
        errors.workinghours = "పని గంటలు 1 నుండి 24 మధ్య ఉండాలి.";
    }
    return errors;
};

const prepareJobData = (jobData,options = {}) => {
    const finalJob = {
        ...jobData
    };
    
    if (Array.isArray(finalJob.skills)) {
        finalJob.skills = JSON.stringify(finalJob.skills);
    }

    if (typeof finalJob.food === "boolean") {
        finalJob.food = finalJob.food ? "Yes" : "No";
    }

    if (typeof finalJob.accommodation === "boolean") {
        finalJob.accommodation = finalJob.accommodation ? "Yes" : "No";
    }

    if (finalJob.workinghours != null) {
        finalJob.workinghours = String(finalJob.workinghours);
    }

    if (finalJob.distance != null) {
        finalJob.distance = String(finalJob.distance);
    }
   
    if (!finalJob.title) {
        if (finalJob.farmtype && finalJob.worktype) {
            finalJob.title = `${finalJob.farmtype} ${finalJob.worktype}`;
        }
        else if (finalJob.worktype) {
            finalJob.title = finalJob.worktype;
        }

        else if (finalJob.farmtype) {
            finalJob.title = finalJob.farmtype;
        }
    }

    if (!finalJob.description) {
        finalJob.description = `${finalJob.requiredworkers || "Required"} workers needed for ${finalJob.title}.`;
    }
    console.log("========== PREPARED JOB ==========");
    console.log(finalJob);
    return {
        ...finalJob,
        farmerId: options.farmerId,
        photo: options.photo ?? null,
        status: options.status ?? "open"
    };
};

const checkDuplicateJob = (jobData) => {
    return new Promise((resolve, reject) => {
        Job.findDuplicateJob(jobData, (err, duplicate) => {
            if (err) {
                return reject({
                    status: 500,
                    message: err.message
                });
            }
            if (duplicate.length > 0) {
                return reject({
                    status: 409,
                    message: "You have already posted this job."
                });
            }
            resolve();
        });
    });
};


const createJob = async (jobData) => {
    validateJob(jobData);
    await checkDuplicateJob(jobData);
    return new Promise((resolve, reject) => {
        Job.create(jobData, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return reject({
                        status: 409,
                        message: "You have already posted this job."
                    });
                }
                return reject({
                    status: 500,
                    message: err.message
                });
            }
            resolve({
                jobId: result.insertId,
                message: "Job created successfully."
            });
        });
    });
};

module.exports = {REQUIRED_FIELDS,getMissingFields,validateJob,validateFieldValues, prepareJobData,checkDuplicateJob,createJob};