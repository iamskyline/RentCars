import { RoleType } from "./enums/roleType";

export class User {
    constructor(
        public id: string,
        public name: string,
        public tel: string,
        public login: string,
        public password: string,
        public photo: string | null,
        public registrationDate: Date,
        public role: string
    ) { }
}

export function mapToUser(data: any) {
    return new User(
        data.id,
        data.name,
        data.tel,
        data.login,
        data.password,
        data.photo,
        new Date(data.registrationDate),
        data.role
    );
}