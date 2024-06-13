import { NeverUnreachable } from "../../../tools/errors/neverUnreachable";

export enum VehicleClass {
    Comfort = 1,
    Business = 2,
    Premium = 3,
    Sport = 4
}

export namespace VehicleClass {
    export function getDisplayName(category: VehicleClass) {
        switch (category) {
            case VehicleClass.Comfort: return "Комфорт";
            case VehicleClass.Business: return "Бизнес";
            case VehicleClass.Premium: return "Премиум";
            case VehicleClass.Sport: return "Спорт";

            default: throw new NeverUnreachable(category)
        }
    }
}