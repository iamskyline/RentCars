import { RoleType } from "./enums/roleType";
import { User } from "./user";

export class UserBlank {
    constructor(
        public id: string | null,
        public name: string | null,
        public tel: string | null,
        public login: string | null,
        public password: string | null,
    ) { }

    public static empty() {
        return new UserBlank(null, null, null, null, null);
    }

    public static toBlank(user: User) {
        return new UserBlank(user.id, user.name, user.tel, user.login, user.password)
    }
}