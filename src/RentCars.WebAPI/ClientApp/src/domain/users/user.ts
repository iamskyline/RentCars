import { RoleType } from "./enums/roleType";

export class User {
    constructor(
        public id: string,
        public name: string,
        public tel: string,
        public login: string,
        public password: string,
        public photo: string | null,
        //public registrationDate: null,
        public role: string
    ) { }
}