const crypto = require('crypto');

const salt = process.env.TOKEN_SALT;
const algorithm = process.env.TOKEN_ALGORITHM;
const password = process.env.TOKEN_SEED;

function encrypt(token) {
    const key = crypto.scryptSync(password, salt, 24);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function decrypt(tokenhash) {

    const key = crypto.scryptSync(password, salt, 24);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    // Encrypted using same algorithm, key and iv.
    let decrypted = decipher.update(tokenhash, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}


module.exports = {
    encrypt,
    decrypt
}