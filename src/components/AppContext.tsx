import { createContext, useEffect, useState } from "react"
import { getAllLocalStorage } from "../services/storage"

interface IAppContext {
    user: string,
    email: string,
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void
    setUser: (userName: string) => void
    setEmail: (email: string) => void
}
  
export const AppContext = createContext({} as IAppContext)
  
export const AppContextProvider = ({ children }: any) => {
    const [ user, setUser ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

    const storage = getAllLocalStorage()

    useEffect(() => {
      if(storage){
        const { login, userName, email } = JSON.parse(storage)
        setIsLoggedIn(login)
        setUser(userName)
        setEmail(email)
      }
    }, [])

    return (
      <AppContext.Provider value={{ user, setUser, email, setEmail, isLoggedIn, setIsLoggedIn }}>
        { children }
      </AppContext.Provider>
    )
}
