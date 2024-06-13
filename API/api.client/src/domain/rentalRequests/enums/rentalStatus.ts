import { NeverUnreachable } from "../../../tools/errors/neverUnreachable";

export enum RentalStatus {
    Processing = 1,
    Executing = 2,
    Completed = 3
}

export namespace RentalStatus {
    export function getDisplayName(category: RentalStatus) {
        switch (category) {
            case RentalStatus.Processing: return "Обработка";
            case RentalStatus.Executing: return "Выполняется";
            case RentalStatus.Completed: return "Выполнена";

            default: throw new NeverUnreachable(category)
        }
    }
}