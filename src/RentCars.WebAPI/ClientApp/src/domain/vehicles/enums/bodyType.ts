import { NeverUnreachable } from "../../../tools/errors/neverUnreachable";

export enum BodyType {
    Hatchback = 1,
    Coupe = 2,
    Minivan = 3,
    SUV = 4,
    Sedan = 5,
    Wagon = 6,
    Convertible = 7,
    PickupTruck = 8
}

export namespace BodyType {
    export function getDisplayName(category: BodyType) {
        switch (category) {
            case BodyType.Hatchback: return "Хэтчбэк";
            case BodyType.Coupe: return "Купе";
            case BodyType.Minivan: return "Минивэн";
            case BodyType.SUV: return "SUV";
            case BodyType.Sedan: return "Седан";
            case BodyType.Wagon: return "Универсал";
            case BodyType.Convertible: return "Кабриолет";
            case BodyType.PickupTruck: return "Пикап";

            default: throw new NeverUnreachable(category)
        }
    }
}