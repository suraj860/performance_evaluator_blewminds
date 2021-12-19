

import React from "react";
import axios from "axios";
import { AppContext } from "./context"
import {useHistory} from "react-router-dom";

function RegisterForm(){
    let history = useHistory()
    const[firstName , setFirstName] = React.useState("")
    const[middleName , setMiddleName] = React.useState("")
    const[LastName , setLastName] = React.useState("")
    const[email , setEmail] = React.useState("")
    const[password , setPassword] = React.useState("")
    


    const{api } = React.useContext(AppContext)

    async function register(){
        try{
            await axios.post(api + "/register",{
                email: email,
                name: firstName,
                middleName : middleName,
                last:LastName,
                password: password,
            })
            history.push("/")
        }catch(error){

        }
    }

    function handleChange(event){
        switch (event.target.name) {
            case "firstName":
                setFirstName(event.target.value)
                break;
            case "middleName":
                setMiddleName(event.target.value)
                break;
            case "LastName":
                setLastName(event.target.value)
                break;
             case "email":
                setEmail(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)    
                break;
            default:
                break;
        }
    }

    function submit(event){
        event.preventDefault()
        register()  
    }

    return(
        <>
        <div className="feedbackFormDiv">
            <form className="feedbackForm" onSubmit={submit}>
                <div style={{textAlign:"center" , marginBottom:"20px"}}>
                <i className="fas fa-user-plus fa-3x" style={{opacity:"0.7"}}></i>
                </div>
                <input type="text" className="form-control" required name="firstName" value={firstName} onChange={handleChange} placeholder="enter first name"/><br/>
                <input type="text" className="form-control" required name="middleName" value={middleName} onChange={handleChange} placeholder="enter middleName"/><br/>
                <input type="text" className="form-control" required name="LastName" value={LastName} onChange={handleChange} placeholder="enter lastName"/><br/>
                <input type="email" className="form-control" required name="email" value={email} onChange={handleChange} placeholder="enter email"/><br/>
                <input type="password" required  className="form-control" name="password" value={password} onChange={handleChange} placeholder="enter password"/>
                <hr/>  
                <button  className="btn btn-success btt1" type="submit">Register</button>
                <button className="btn btn-danger" onClick={()=>{history.push("/")}}>Cancel</button>
            </form>
        </div>
        </>
    )
}

export default RegisterForm;