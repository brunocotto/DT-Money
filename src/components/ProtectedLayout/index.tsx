import { useAuth } from "../../contexts/AuthProvider/useAuth";
import { Login } from "../../pages/Login";

export const ProtectedLayout = ({ children }: { children: JSX.Element}) => {
  const auth = useAuth()

  if (!auth.token) {

    return <Login />

  }

  return children
}