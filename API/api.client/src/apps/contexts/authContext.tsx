import { PropsWithChildren, createContext, useContext, useState } from 'react'

interface IAuthContext {
    authorize: (token: string, isAdmin: boolean) => void
    isAdmin: boolean
    checkAuthorize: () => boolean
    isAuthenticated: boolean
}

const defaultValue: IAuthContext = {
    isAuthenticated: false,
    isAdmin: false,
    checkAuthorize: () => false,
    authorize: () => { }
}

export const AuthContext = createContext<IAuthContext>(defaultValue)

function AuthProvider(props: PropsWithChildren) {

    function getDefaultValue(): IAuthContext {
        const isAdmin = localStorage.getItem('isAdmin')

        return {
            authorize: authorize,
            isAdmin: isAdmin === "true",
            isAuthenticated: checkAuthorize(),
            checkAuthorize
        }
    }

    const [authContext, setAuthContext] = useState<IAuthContext>(getDefaultValue())

    function changeContext(context: Partial<IAuthContext>) {
        setAuthContext((prevContext) => ({ ...prevContext, context }))
    }

    function authorize(token: string, isAdmin: boolean) {
        localStorage.setItem('token', token)
        localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false')
        changeContext({ isAuthenticated: true, isAdmin })
    }

    function checkAuthorize(): boolean {
        const token = localStorage.getItem('token')
        return token != null
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