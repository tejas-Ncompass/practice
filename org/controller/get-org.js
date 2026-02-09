const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');
const { query } = require('../../utils/database');
const checkUser = require('../utils/checkUser.js');


const getAllOrgs = async (req, res) => {

    const { role, active, sort } = req.query;
    const SSid = req.user.ssid;

    const isactive = active === undefined ? 1 : active;

    const sortOptions = ['orgName', 'dateOfJoin'];

    const sortBy = (sortOptions.includes(sort) ? sort : 'orgName');

    let getOrgsQuery = `
    SELECT 
        o.orgId,
        orgName,
        roleId,
        dateOfJoin
    FROM 
        employeeDetails AS ed
    RIGHT JOIN 
        organization AS o ON ed.orgId=o.orgId
    WHERE 
        ed.ssid= ?
    AND
        active=?
    `
    const orgValues = [SSid, isactive];

    if (role) {
        getOrgsQuery += `AND ed.roleId= ?`;
        orgValues.push(role);
    }

    getOrgsQuery += `ORDER BY ${sortBy}`;

    const result = await query(getOrgsQuery, orgValues);

    responseHandler(res, 200, "Organizations the user is part of", result);
};


// Get all the users belonging to the organization of the current user

const getAllUsers = async (req, res) => {

    const orgId = req.headers['orgid'];
    const { sort, name, email } = req.query;
    const SSid = req.user.ssid;
    let users;

    const sortOptions = ['name', 'ssid'];
    const sortby = sortOptions.includes(sort) ? sort : 'name';

    const row = checkUser(SSid,orgId);

    if (!(row)) {
        throw new customError(`Unauthorized access`, 403, `Forbidden`);
    }

    let selectAllusersQuery = `
            SELECT 
                ed.ssid,
                u.name,
                u.email,
                r.roleName                                  
            FROM 
                employeeDetails AS ed
            LEFT JOIN 
                users AS u ON ed.ssid=u.ssid
            LEFT JOIN 
                roles AS r ON ed.roleId=r.roleID 
            WHERE 
                ed.orgId= ?
            `
    const userValues = [orgId];

    if (name) {
        selectAllusersQuery += `AND u.name = ?`;
        userValues.push(name);
    }

    if (email) {
        selectAllusersQuery += `AND u.email = ?`;
        userValues.push(email);
    }

    selectAllusersQuery += `ORDER BY ${sortby}`;

    users = await query(selectAllusersQuery, userValues);

    return responseHandler(res, 200, "All Users", users);

}


module.exports = { getAllOrgs, getAllUsers };
