export default class DataResult<T = null> {
    public isSuccess: boolean

    constructor(
        public errors: string[],
        public data: T = <any>null
    ) {
        this.isSuccess = errors.length <= 0
    }

    public static success<T>(value: T): DataResult<T> {
        return new DataResult<T>([], value)
    }

    public static fail(error: string): DataResult {
        return new DataResult([error])
    }

}

export function mapToDataResult<T>(data: any): DataResult<T> {
    return new DataResult(data.errors, data)
}