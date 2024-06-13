import { NeverUnreachable } from "../../../tools/errors/neverUnreachable";

export enum RoleType {
    Client = 1,
    Admin = 2
}

export namespace RoleType {
    export function getDisplayName(category: RoleType) {
        switch (category) {
            case RoleType.Admin: return "Админ";
            case RoleType.Client: return "Клиент";

            default: throw new NeverUnreachable(category)
        }
    }
}