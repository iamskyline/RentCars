export class AuthResponse {
    constructor(
        public token: string,
        public isAdmin: boolean,
        public userId: string
    ) { }
}

export function mapToAuthResponse(data: any): AuthResponse {
    return new AuthResponse(data.token, data.isAdmin, data.userId)
}