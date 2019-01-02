const yup = require('yup');

module.exports = yup.object().shape({
  PORT: yup
    .number()
    .required()
    .positive()
    .integer(),
  HOST: yup.string().required(),
  API: yup.object({
    BASE_URL: yup.string(),
    MAX_RETRIES: yup
      .number()
      .positive()
      .integer(),
    TIMEOUT: yup
      .number()
      .positive()
      .integer(),
  }),
  MERCADOLIBRE: yup.object({
    API: yup.object({
      BASE_URL: yup.string(),
      MAX_RETRIES: yup
        .number()
        .positive()
        .integer(),
      TIMEOUT: yup
        .number()
        .positive()
        .integer(),
    }),
  }),
});
