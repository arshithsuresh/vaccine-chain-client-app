import React, {useState, createContext} from "react";

export const UserContext = createContext()

export const UserContextProvider = (props)=>{

  const state ={
      "LoggedOut":0,
      "LoggedIn":1,
      "UnAuthorized":2,
      "Waiting":3
  }

    const [user, setUser] = useState({})
    const [userState, setUserState] = useState(state.LoggedOut)

    const LoginUser = (user)=>{
        setUser(user)
        setUserState(state.LoggedIn)
    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            userState,
            setUserState
        }}>
            {props.children}
        </UserContext.Provider>
    )
}