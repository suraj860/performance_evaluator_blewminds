
import React from "react";
import axios from "axios";
import { AppContext } from "./context";
import {useHistory , Link} from "react-router-dom";
import jwt from "jsonwebtoken";
function Login(){
    const {api , admin , setAdmin , user , setUser} = React.useContext(AppContext)
    const{userName , setUserName , password , setPassword} =  React.useContext(AppContext)
   
    let history = useHistory()

    function handleChange(event){
        switch (event.target.name) {
            case "userEmail":
                setUserName(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
            default:
                break;
        }
    }

    async function loginData(){
        try{
            const response = await axios.post(api + "/login" , {
                email : userName,
                password : password
            })
           window.localStorage.setItem("token" , response.data.authToken)
            setUserName("")
            setPassword("")    
            verifyType()
        }catch(error){
            console.log(error)
        }
    }

    function verifyType(){
        const token = window.localStorage.getItem("token")
        const userD = jwt.decode(token)
        if(userD.type=== "admin"){
            history.push("/admin")
        }else if(userD.type=== "faculty"){
            history.push("/facultyLogged")
        }else{
            history.push("/userLogged")
        }
    }

    function submit(event){
        event.preventDefault()
        loginData()
    }

    return(
        <>
        {
            admin===false && user === false ? 
            <div>
                <div className="askType">
                    <button className="btns1" onClick={()=>{setAdmin(true)}}>ADMIN LOGIN</button>
                    <button className="btns2" onClick={()=>{setUser(true)}}>USER LOGIN</button>
                </div>
            </div> : admin===true ?
            <div className="adminlogging">
                <div className="logInforms">
                    <form onSubmit={submit}>
                        <div style={{textAlign:"center" , marginBottom:"20px"}}>
                            <i className="fas fa-user-alt fa-2x" style={{opacity:"0.7"}}></i>
                        </div>
                      
                        <input type="email" required className="form-control" placeholder="enter emailId" name="userEmail" value={userName} onChange={handleChange}/><br/>
                        <input type="password" className="form-control" required placeholder="enter password" name="password" value={password} onChange={handleChange}/><br/>
                        <button className="btn btn-primary btt1" type="submit">SUBMIT</button>
                        <button className="btn btn-primary" onClick={()=>{setAdmin(false)}}>BACK</button>
                    </form>
                </div>
            </div>  :
            <div className="adminlogging">
                 <div className="logInforms">
                    <form onSubmit={submit}>
                        <div style={{textAlign:"center" , marginBottom:"20px"}}>
                            <i className="fas fa-user-alt fa-2x" style={{opacity:"0.7"}}></i>
                        </div>
                        <input type="email" className="form-control" placeholder="enter emailId" name="userEmail" value={userName}  onChange={handleChange} required/><br/>
                        <input type="password" className="form-control" placeholder="enter password" name="password" value={password} onChange={handleChange} required/><br/>
                        <button className="btn btn-primary btt1" type="submit">SUBMIT</button>
                        <button className="btn btn-primary" onClick={()=>{setUser(false)}}>BACK</button><br/>
                        <hr style={{marginBottom:"0px"}}/>
                        <div style={{textAlign:"center" , paddingTop:"20px"}}>
                        <Link exact  to="/register">New User</Link>
                        </div>  
                    </form>
                </div>
            </div>
        }
       
        </>
    )
}

export default Login;