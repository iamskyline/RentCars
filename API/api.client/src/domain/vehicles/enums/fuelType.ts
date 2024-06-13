import { NeverUnreachable } from "../../../tools/errors/neverUnreachable";

export enum FuelType {
    Gasoline = 1,
    Diesel = 2,
    Electric = 3,
    Hybrid = 4
}

export namespace FuelType {
    export function getDisplayName(category: FuelType) {
        switch (category) {
            case FuelType.Gasoline: return "Бензин";
            case FuelType.Diesel: return "Дизель";
            case FuelType.Electric: return "Электро";
            case FuelType.Hybrid: return "Гибрид";

            default: throw new NeverUnreachable(category)
        }
    }
}