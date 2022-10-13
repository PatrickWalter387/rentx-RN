import { createContext, ReactNode, useContext, useState } from "react";
import api from "../services/api";

interface Props{
    children: ReactNode
}

interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface IAuthContextData {
    user: User;
    signIn: (credentials : SignInCredentials) => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children } : Props) {
    const [user, setUser] = useState({} as User);

    async function signIn({ email, password } : SignInCredentials){
        const response = await api.post('/sessions', {
            email,
            password
        });

        console.log(response.data);
    }

    return (
        <AuthContext.Provider value={{ signIn, user }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() : IAuthContextData {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };