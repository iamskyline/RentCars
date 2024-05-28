import { RoleType } from "./enums/roleType";

export class NameOfUser {
    constructor(
        public id: string,
        public name: string,
        public login: string,
    ) { }
}

export function mapToNameOfUser(data: any) {
    return new NameOfUser(
        data.id,
        data.name,
        data.login,
    );
}