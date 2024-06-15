import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IAuthContext {
    isAdmin: boolean
    isAuthenticated: boolean
    userId: string | null
    authorize: (token: string, isAdmin: boolean, userId: string) => void
    checkAuthorize: () => boolean,
    logout: () => Promise<void>,
}

const defaultValue: IAuthContext = {
    userId: null,
    isAuthenticated: false,
    isAdmin: false,
    checkAuthorize: () => false,
    authorize: () => { },
    logout: async() => { }
}

export const AuthContext = createContext<IAuthContext>(defaultValue)

function AuthProvider(props: PropsWithChildren) {
    function getDefaultValue(): IAuthContext {
        const isAdmin = localStorage.getItem('isAdmin')
        const userId = localStorage.getItem('userId')

        return {
            userId,
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

    function authorize(token: string, isAdmin: boolean, userId: string) {
        localStorage.setItem('token', token)
        localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false')
        localStorage.setItem('userId', userId)
        changeContext({ isAuthenticated: true, isAdmin, userId })
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