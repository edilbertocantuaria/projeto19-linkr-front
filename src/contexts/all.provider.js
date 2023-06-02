import { LoginProvider } from "./login.context.js";




export default function Provider({ children }) {
    return (

        <>
              <LoginProvider>
                    {children}
                </LoginProvider>         
        </>
    )
}