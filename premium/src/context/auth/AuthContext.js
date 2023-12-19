import { createContext } from "react";
import { useContext, useState } from "react";

const AuthContext  = createContext();

export function useAuth(){
  return useContext(AuthContext);
}

export function AuthProvider(props){
  const [userId,setUserId] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userName,setUserName] = useState(null)

  const value = {
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName
  }

  return  (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )


}