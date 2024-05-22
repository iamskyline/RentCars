import { RoleType } from "./enums/roleType";

export class UserBlank {
    constructor(
        public id: string | null,
        public name: string | null,
        public tel: string | null,
        public login: string | null,
        public password: string | null,
        public photo: string | null,
        //public registrationDate: null,
        public role: RoleType | null
    ) { }

    public static empty() {
        return new UserBlank(null, null, null, null, null, null, null);
    }
}