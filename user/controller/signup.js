const { genHash } = require('../../utils/bcryptHash.js'); 
const { execute, startTransact, commit, rollback } = require('../../utils/database');
const responseHandler = require('../../utils/response-handler.js');
const customError = require('../../utils/errorClass.js');

const signupUserQuery=`
INSERT INTO 
            users (id,
            ssid, 
            name, 
            email, 
            phNum, 
            active) 
VALUES (?, ?, ?, ?, ?, ?)`

const insertSecretQuery=`
INSERT INTO 
          secrets (id, password) 
VALUES (?, ?)`

const signUp = async (req, res) => {

    let connection;
    try {
         
        const { ssid, name, email, phNum, active, password } = req.body;

        const userCred = await genHash(password);
        
        const usersValue=[userCred.id, ssid, name, email, phNum, active];

        connection = await startTransact();

        const user = await execute(signupUserQuery,usersValue, connection);
        const userCredential = await execute(insertSecretQuery, [userCred.id, userCred.password], connection);

        await commit(connection);

        responseHandler(res,200,"Signup Successful!",{ });

    } catch (err) {
        if(connection)
        {
            await rollback(connection);
        }
        next(err);
    }
};

module.exports = signUp ;
