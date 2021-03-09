const moment = require('moment')
const dbQuery = require('../db/query')
const {
  hashPassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
  comparePassword
} = require('../utils/validations')
const {
  errorMessage, successMessage, status,
} = require('../utils/status')

const createUser = async (req, res) => {
  const {
    email, full_name, address, phone, password,
  } = req.body;

  const created = moment(new Date());
  if (isEmpty(email) || isEmpty(full_name) || isEmpty(address) || isEmpty(phone) || isEmpty(password)) {
    errorMessage.error = 'Todos los campos son obligatorios';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'El correo ingresado es invalido';
    return res.status(status.bad).send(errorMessage);
  }
  if (!validatePassword(password)) {
    errorMessage.error = 'La contrasena debe poseer al menos 5 caracteres';
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = hashPassword(password);
  const createUserQuery = `INSERT INTO
      users(email, full_name, address, phone, password, created)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
  const values = [
    email,
    full_name,
    address,
    phone,
    hashedPassword,
    created,
  ];

  try {
    const rows = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    successMessage.data.expiresIn = 3600;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'El correo registrado ya pertenece a un cuenta en el sistema';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'La operación no fue completada';
    return res.status(status.error).send(errorMessage);
  }
};

const siginUser = async (req, res) => {
  const {email, password} = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Todos los campos son obligatorios';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'La contraseña o correo son inválidos';
    return res.status(status.bad).send(errorMessage);
  }
  const signinUserQuery = 'SELECT * FROM users WHERE email = $1';
  try {
    const rows = await dbQuery.query(signinUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'No existe ningún usuario con ese correo registrado en el sistema\n';
      return res.status(status.notfound).send(errorMessage);
    }
    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'Contraseña invalida';
      return res.status(status.bad).send(errorMessage);
    }
    const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name);
    delete dbResponse.password;
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    successMessage.data.expiresIn = 3600;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'La operación no fue completada';
    return res.status(status.error).send(errorMessage);
  }
};

const deleteUser = async (req, res) => {
  const email = req.body.email;

  if (isEmpty(email)) {
    errorMessage.error = 'El correo es un campo obligatorio';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'Correo invalido';
    return res.status(status.bad).send(errorMessage);
  }
  const signinUserQuery = 'DELETE FROM users WHERE email = $1';
  try {
    await dbQuery.query(signinUserQuery, [email]);
    return res.status(status.success).send(successMessage.status);
  } catch (error) {
    errorMessage.error = 'La operación no fue completada';
    return res.status(status.error).send(errorMessage);
  }
};

const getAllUsers = async (req, res) => {
  const signinUserQuery = 'SELECT id, full_name FROM users';

  try {
    const rows = await dbQuery.query(signinUserQuery);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'No existe ningún Registro de usuario';
      return res.status(status.notfound).send(errorMessage);
    }
    return res.status(status.success).send(rows);
  } catch (error) {
    errorMessage.error = 'La operación no fue completada';
    return res.status(status.error).send(errorMessage);
  }
};

module.exports = {createUser, siginUser, deleteUser, getAllUsers};
