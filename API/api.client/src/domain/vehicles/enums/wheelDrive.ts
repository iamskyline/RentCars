import { NeverUnreachable } from "../../../tools/errors/neverUnreachable";

export enum WheelDrive {
    RearWheelDrive = 1,
    FrontWheelDrive = 2,
    AllWheelDrive = 3
}

export namespace WheelDrive {
    export function getDisplayName(category: WheelDrive) {
        switch (category) {
            case WheelDrive.RearWheelDrive: return "Задний привод";
            case WheelDrive.FrontWheelDrive: return "Передний привод";
            case WheelDrive.AllWheelDrive: return "Полный привод";

            default: throw new NeverUnreachable(category)
        }
    }
}