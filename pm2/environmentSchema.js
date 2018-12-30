const yup = require('yup');

module.exports = yup.object().shape({
  PORT: yup
    .number()
    .required()
    .positive()
    .integer(),
  HOST: yup.string().required(),
  SECRET: yup.string().required(),
  API: yup.object({
    MAX_RETRIES: yup
      .number()
      .positive()
      .integer(),
    TIMEOUT: yup
      .number()
      .positive()
      .integer(),
    BASE_URL: yup.string(),
    TOKEN: yup.string(),
  }),
});
