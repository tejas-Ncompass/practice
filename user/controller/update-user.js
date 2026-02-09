const { execute } = require('../../utils/database.js');
const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');

const updateUser = async (req, res) => {
        const userId = req.user.ssid; 
        const updates = req.body; 

        const userColumns = Object.keys(updates).filter(key => updates[key] !== undefined);
        
        const setFields = userColumns.map(cols => `${cols} = ?`).join(', ');
        const values = userColumns.map(cols => updates[cols]);

        const result = await execute(`UPDATE 
                                            users 
                                        SET 
                                            ${setFields} 
                                        WHERE 
                                            updatedBy = ?`,[...values,userId] );

        return responseHandler(res,200,"User Updated Successfully",result); 
} 

module.exports =  updateUser;

