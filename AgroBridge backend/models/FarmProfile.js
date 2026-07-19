const db = require("../config/db");

const FarmProfile = {};

// =====================================================
// Check if Farmer Profile Exists
// =====================================================

FarmProfile.findByFarmerId = (farmerId, callback) => {

    const sql = `
        SELECT *
        FROM farm_profiles
        WHERE farmerId = ?
    `;

    db.query(sql, [farmerId], callback);

};

// =====================================================
// Create Farm Profile
// =====================================================

FarmProfile.createProfile = (profile, callback) => {

    const sql = `
        INSERT INTO farm_profiles
        (
            farmerId,
            farmName,
            ownerName,
            farmType,
            totalArea,
            village,
            soilType,
            waterSource,
            primaryCrops,
            equipment,
            currentCrop,
            sowingDate,
            expectedHarvest,
            phone,
            email,
            farmPhoto
        )

        VALUES
        (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
        )
    `;

    db.query(

        sql,

        [

            profile.farmerId,
            profile.farmName,
            profile.ownerName,
            profile.farmType,
            profile.totalArea,
            profile.village,
            profile.soilType,
            profile.waterSource,
            profile.primaryCrops,
            profile.equipment,
            profile.currentCrop,
            profile.sowingDate,
            profile.expectedHarvest,
            profile.phone,
            profile.email,
            profile.farmPhoto

        ],

        callback

    );

};

// =====================================================
// Get Farmer Profile
// =====================================================

FarmProfile.getProfile = (farmerId, callback) => {

    const sql = `
        SELECT *
        FROM farm_profiles
        WHERE farmerId = ?
    `;

    db.query(sql, [farmerId], callback);

};

// =====================================================
// Update Farm Profile
// =====================================================

FarmProfile.updateProfile = (profile, callback) => {

    const sql = `
        UPDATE farm_profiles

        SET

            farmName=?,
            ownerName=?,
            farmType=?,
            totalArea=?,
            village=?,
            soilType=?,
            waterSource=?,
            primaryCrops=?,
            equipment=?,
            currentCrop=?,
            sowingDate=?,
            expectedHarvest=?,
            phone=?,
            email=?

        WHERE farmerId=?
    `;

    db.query(

        sql,

        [

            profile.farmName,
            profile.ownerName,
            profile.farmType,
            profile.totalArea,
            profile.village,
            profile.soilType,
            profile.waterSource,
            profile.primaryCrops,
            profile.equipment,
            profile.currentCrop,
            profile.sowingDate,
            profile.expectedHarvest,
            profile.phone,
            profile.email,
            profile.farmerId

        ],

        callback

    );

};

// =====================================================
// Update Farm Photo
// =====================================================

FarmProfile.updatePhoto = (

    farmerId,

    photo,

    callback

) => {

    const sql = `
        UPDATE farm_profiles

        SET

            farmPhoto = ?

        WHERE

            farmerId = ?
    `;

    db.query(

        sql,

        [

            photo,

            farmerId

        ],

        callback

    );

};

// =====================================================
// Delete Farm Profile (Optional - Admin)
// =====================================================

FarmProfile.deleteProfile = (

    farmerId,

    callback

) => {

    const sql = `
        DELETE
        FROM farm_profiles
        WHERE farmerId=?
    `;

    db.query(

        sql,

        [

            farmerId

        ],

        callback

    );

};

module.exports = FarmProfile;