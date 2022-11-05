import Joi from 'joi';
import { UserRoles } from 'api/db/models/User';
import { LoginReq, RegisterReq } from './types';

export const loginSchema = Joi.object<LoginReq>().keys({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(8).max(32).required(),
});

export const registrationSchema = loginSchema.append<RegisterReq>({
    role: Joi.number()
        .valid(...Object.values(UserRoles))
        .required(),
});
