const Joi = require('joi');

const userSchema = Joi.object({
  ssid: Joi.string().max(5).alphanum(),
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  phNum: Joi.string().alphanum(),
  createdAt: Joi.date().timestamp(),
  updatedAt: Joi.date().timestamp(),
  createdBy: Joi.string().max(5).alphanum(),
  updatedBy: Joi.string().max(5).alphanum()
});

module.exports = userSchema;

