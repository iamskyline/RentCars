import { PropsWithChildren, createContext, useContext, useState } from 'react'

interface IAuthContext {
    isAdmin: boolean
    userId: string | null
    isAuthenticated: boolean
    userName: string | null
    authorize: (token: string, isAdmin: boolean, userId: string, userName: string) => void
    checkAuthorize: () => boolean,
    logout: () => Promise<void>,
}

const defaultValue: IAuthContext = {
    userId: null,
    isAdmin: false,
    userName: null,
    isAuthenticated: false,
    checkAuthorize: () => false,
    authorize: () => { },
    logout: async () => { }
}

export const AuthContext = createContext<IAuthContext>(defaultValue)

function AuthProvider(props: PropsWithChildren) {
    function getDefaultValue(): IAuthContext {
        const isAdmin = localStorage.getItem('isAdmin')
        const userId = localStorage.getItem('userId')
        const userName = localStorage.getItem('userName')

        return {
            userId,
            userName,
            isAdmin: isAdmin === "true",
            isAuthenticated: checkAuthorize(),
            authorize,
            checkAuthorize,
            logout
        }
    }

    const [authContext, setAuthContext] = useState<IAuthContext>(getDefaultValue())

    function changeContext(context: Partial<IAuthContext>) {
        setAuthContext((prevContext) => ({ ...prevContext, ...context }))
    }

    function authorize(token: string, isAdmin: boolean, userId: string, userName: string) {
        localStorage.setItem('token', token)
        localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false')
        localStorage.setItem('userId', userId)
        localStorage.setItem('userName', userName)
        changeContext({ isAuthenticated: true, isAdmin, userId, userName })
    }

    function checkAuthorize(): boolean {
        const token = localStorage.getItem('token')
        return token != null
    }

    async function logout() {
        localStorage.clear()
        changeContext(getDefaultValue())
    }

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    return context
}

export default AuthProvider