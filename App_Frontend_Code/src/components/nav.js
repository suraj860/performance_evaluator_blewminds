
import jwt from "jsonwebtoken"
import React from "react";
import { useHistory } from "react-router-dom";

function Nav(){
    const token = window.localStorage.getItem("token")
    const userD = jwt.decode(token)
    let history = useHistory()
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Performance Evaluator</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{justifyContent:"flex-end"}}>
                <ul className="navbar-nav ">
                <li className="nav-item active" style={{marginRight:"30px" , display:"flex"}}>
                   
                    <a className="nav-link" href="/">{userD.email} <span className="sr-only">(current)</span></a>
                    <i className="fas fa-circle" style={{color:"yellowgreen"  , marginTop:"14px"}}></i>
                </li>
                <li className="nav-item" style={{marginRight:"20px"}}>
                    <button  style={{cursor:"pointer" , border:"none" , marginTop:"6px" ,borderRadius:"0.3rem" , padding:"3px 8px"}}
                     onClick={()=>{
                       window.localStorage.clear() 
                       history.push("/")
                    }}>LogOut</button>
                </li>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Nav;