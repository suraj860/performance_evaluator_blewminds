
import { useState } from "react";
import React  from "react";

export const AppContext = React.createContext()

export const ContextProvider = (props)=>{

    const[api] = useState("http://localhost:3001")
    const [admin , setAdmin] = useState(false)
    const [user , setUser] = useState(false)
    const [userName , setUserName] = useState("")
    const [password , setPassword] = useState("")
    const [block , setBlock] = useState(false)
    const [facultyList , setFacultyList] = useState([])
    const [userList , setUserList] = useState(false)
    const [allUser , setAllUser] = useState([])
    const [forms , setForm] = useState(false)
    const[singleFacData , setSingleFacData] = useState()
    const[trail , setTrail] = useState(false)
    return(
        <AppContext.Provider value={{api , admin , setAdmin , user , setUser ,userName , setUserName,
            password , setPassword , block , setBlock , facultyList , setFacultyList , userList , setUserList , allUser ,
             setAllUser , singleFacData , setSingleFacData , forms , setForm , trail , setTrail}}>
            {props.children}
        </AppContext.Provider>
    )
}