import { Navigate } from "react-router-dom"
import { useAuthContext } from "./contexts/authContext"

function ProtectedRoute({ children }: any) {
    const { checkAuthorize } = useAuthContext()

    if (!checkAuthorize()) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute