import { NeverUnreachable } from "../../../tools/errors/neverUnreachable";

export enum TransmissionType {
    Manual = 1,
    Automatic = 2
}

export namespace TransmissionType {
    export function getDisplayName(category: TransmissionType) {
        switch (category) {
            case TransmissionType.Manual: return "Механическая";
            case TransmissionType.Automatic: return "Автоматическая";

            default: throw new NeverUnreachable(category)
        }
    }
}