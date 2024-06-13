export class Result {
    constructor(
        public errors: string[],
        public isSuccess: boolean
    ) { }

    public get errorsString(): string {
        return this.errors.join('. ')
    }
};

export function mapToResult(data: any): Result {
    return new Result(data.errors, data.isSuccess)
}