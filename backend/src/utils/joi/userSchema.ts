import Joi from 'joi';

const userSchema = Joi.object({
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')).required(),
  username: Joi.string().min(3).required(),
});

export default userSchema;