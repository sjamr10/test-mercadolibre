const crypto = require('crypto');

const { SECRET } = TEST_MERCADOLIBRE;

const encrypt = (data) => {
  const cipher = crypto.createCipher('aes192', SECRET);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (data) => {
  const cipher = crypto.createDecipher('aes192', SECRET);
  let decrypted = cipher.update(data, 'hex', 'utf8');
  decrypted += cipher.final('utf8');
  return decrypted;
};

module.exports = {
  encrypt,
  decrypt,
};
