export class AuthResponse {
    constructor(
        public token: string,
        public isAdmin: boolean,
    ) { }
}

export function mapToAuthResponse(data: any): AuthResponse {
    return new AuthResponse(data.token, data.isAdmin)
}