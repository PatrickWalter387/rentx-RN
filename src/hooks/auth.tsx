import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { database } from "../database";
import { User as ModelUser } from '../database/models/User';
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
        try {
            const response = await api.post('/sessions', {
                email,
                password
            });
        
            const { token, user } = response.data;
        
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
            const userCollection = database.get<ModelUser>('users')
        
            await database.write(async () => {
                await userCollection.create(( newUser ) => {
                    newUser.user_id = user.id,
                    newUser.name = user.name,
                    newUser.email = user.email,
                    newUser.driver_license = user.driver_license,
                    newUser.avatar = user.avatar,
                    newUser.token = token
                })
            });
        
            setUser({ ...user, token  });
        } 
        catch (error: any) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        (async function loadUserData(){
            const userCollection = database.get('users');
            const response = await userCollection.query().fetch();

            if (response.length > 0) {
                const userData = response[0]._raw as unknown as User;
                api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
                setUser(userData);
                console.log(userData);
            }
        })();


    }, [])

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