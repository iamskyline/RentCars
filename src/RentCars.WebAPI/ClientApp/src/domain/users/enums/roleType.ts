import { NeverUnreachable } from "../../../tools/errors/neverUnreachable";

export enum Role {
    Client = 1,
    Admin = 2
}

export namespace Role {
    export function getDisplayName(category: Role) {
        switch (category) {
            case Role.Admin: return "Админ";
            case Role.Client: return "Клиент";

            default: throw new NeverUnreachable(category)
        }
    }
}