const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); 

async function genHash(password) {
    const id = uuidv4(); 
    const hashPass = await bcrypt.hash(password, 10);
    return { id, password: hashPass };
}

module.exports = { genHash };