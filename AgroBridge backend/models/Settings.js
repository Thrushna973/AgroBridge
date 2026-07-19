const db = require("../config/db");

const Settings = {

    // ===========================
    // Admin Profile
    // ===========================

    getAdminProfile: (id, callback) => {

        const sql = `
            SELECT
                id,
                name,
                email,
                phone
            FROM users
            WHERE id = ?
            AND role = 'admin'
        `;

        db.query(sql, [id], callback);

    },

    updateAdminProfile: (id, profileData, callback) => {

        const sql = `
            UPDATE users
            SET
                name = ?,
                email = ?,
                phone = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                profileData.name,
                profileData.email,
                profileData.phone,
                id
            ],
            callback
        );

    },

    // ===========================
    // Password
    // ===========================

    getPassword: (id, callback) => {

        const sql = `
            SELECT password
            FROM users
            WHERE id = ?
        `;

        db.query(sql, [id], callback);

    },

    changePassword: (id, hashedPassword, callback) => {

        const sql = `
            UPDATE users
            SET password = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                hashedPassword,
                id
            ],
            callback
        );

    },

    // ===========================
    // Platform Settings
    // ===========================

    getSettings: (callback) => {

        const sql = `
            SELECT *
            FROM settings
            LIMIT 1
        `;

        db.query(sql, callback);

    },

    updateSettings: (settingsData, callback) => {

        const sql = `
            UPDATE settings
            SET
                supportEmail = ?,
                supportPhone = ?,
                version = ?,
                emailNotifications = ?,
                smsNotifications = ?,
                pushNotifications = ?
            WHERE id = 1
        `;

        db.query(
            sql,
            [
                settingsData.supportEmail,
                settingsData.supportPhone,
                settingsData.version,
                settingsData.emailNotifications,
                settingsData.smsNotifications,
                settingsData.pushNotifications
            ],
            callback
        );

    },



// module.exports = Settings;


// const db = require("../config/db");

// const Settings = {};

// ================================================
// Get User Profile
// ================================================

getProfile :(userId, callback) => {

    const sql = `
        SELECT
            id,
            name,
            phone,
            email,
            language,
            theme,
            notifyApplications,
            notifyAttendance,
            notifyPayments,
            notifyReports
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], callback);

},

// ================================================
// Update User Profile
// ================================================
updateProfile : (userId, data, callback) => {

    const sql = `
        UPDATE users
        SET
            name = ?,
            phone = ?,
            email = ?
        WHERE id = ?
    `;

    db.query(

        sql,

        [
            data.name,
            data.phone,
            data.email,
            userId
        ],

        callback

    );

},

// ================================================
// Get Password
// ================================================

getPassword :(userId, callback) => {

    const sql = `
        SELECT password
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], callback);

},

// ================================================
// Update Password
// ================================================

updatePassword : (

    userId,

    hashedPassword,

    callback

) => {

    const sql = `
        UPDATE users
        SET password = ?
        WHERE id = ?
    `;

    db.query(

        sql,

        [

            hashedPassword,

            userId

        ],

        callback

    );

},

// ================================================
// Get Preferences
// ================================================

getPreferences : (

    userId,

    callback

) => {

    const sql = `
        SELECT

            language,

            theme

        FROM users

        WHERE id = ?
    `;

    db.query(

        sql,

        [

            userId

        ],

        callback

    );

},

// ================================================
// Update Preferences
// ================================================

updatePreferences :(

    userId,

    preferences,

    callback

) => {

    const sql = `
        UPDATE users

        SET

            language = ?,

            theme = ?

        WHERE id = ?
    `;

    db.query(

        sql,

        [

            preferences.language,

            preferences.theme,

            userId

        ],

        callback

    );

},

// ================================================
// Get Notification Settings
// ================================================

getNotifications: (

    userId,

    callback

) => {

    const sql = `
        SELECT

            notifyApplications,

            notifyAttendance,

            notifyPayments,

            notifyReports

        FROM users

        WHERE id = ?
    `;

    db.query(

        sql,

        [

            userId

        ],

        callback

    );

},

// ================================================
// Update Notification Settings
// ================================================

updateNotifications : (

    userId,

    notifications,

    callback

) => {

    const sql = `
        UPDATE users

        SET

            notifyApplications = ?,

            notifyAttendance = ?,

            notifyPayments = ?,

            notifyReports = ?

        WHERE id = ?
    `;

    db.query(

        sql,

        [

            notifications.notifyApplications,

            notifications.notifyAttendance,

            notifications.notifyPayments,

            notifications.notifyReports,

            userId

        ],

        callback

    );

},

// ================================================
// Delete Account (Soft Delete)
// ================================================

deleteAccount : (

    userId,

    callback

) => {

    const sql = `
        UPDATE users

        SET isDeleted = TRUE

        WHERE id = ?
    `;

    db.query(

        sql,

        [

            userId

        ],

        callback

    );

},

// =====================================================
// Check Duplicate Email
// =====================================================

checkEmailExists : (

    email,

    userId,

    callback

) => {

    const sql = `

        SELECT id

        FROM users

        WHERE

        email = ?

        AND

        id != ?

    `;

    db.query(

        sql,

        [

            email,

            userId

        ],

        callback

    );

},

// =====================================================
// Check Duplicate Phone
// =====================================================

checkPhoneExists : (

    phone,

    userId,

    callback

) => {

    const sql = `

        SELECT id

        FROM users

        WHERE

        phone = ?

        AND

        id != ?

    `;

    db.query(

        sql,

        [

            phone,

            userId

        ],

        callback

    );

},


};


Settings.getLabourProfile = (labourId) => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT * FROM users
        `;

        db.query(sql,[labourId],(err,result)=>{

            if(err){

                return reject(err);

            }

            resolve(result);

        });

    });

};

module.exports = Settings;