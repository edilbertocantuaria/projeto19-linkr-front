import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {

    const [sentLogin, setSentLogin] = useState(false)

    return (
        <LoginContext.Provider value={{ sentLogin, setSentLogin }}>
            {children}
        </LoginContext.Provider>
    )
}