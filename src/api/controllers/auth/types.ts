import { UserRoles } from 'api/db/models/User';

export interface LoginReq {
    username: string;
    password: string;
}

export interface RegisterReq extends LoginReq {
    role: UserRoles;
}
