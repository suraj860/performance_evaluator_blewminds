

import React from "react";
import axios from "axios";
import Nav from "./nav";
import { AppContext } from "./context"
import jwt from "jsonwebtoken";

function FacultyDash(){
    const [facultyuser , setFacultyUser] = React.useState([])
    const{api} = React.useContext(AppContext)
    const [showUserForm , setUserform] = React.useState(false)
    const [seeForm , setSeeForm] = React.useState({})

    const token = window.localStorage.getItem("token")
    const userD = jwt.decode(token)
    
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })

    async function getfacultyAllUsers(){
        try{
            const response = await instance.post(api + "/facultyAssigned",{
                email: userD.email
            })
            setFacultyUser(response.data)
           
        }catch(error){
            console.log(error)
        }
    }


    React.useEffect(()=>{
        getfacultyAllUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    async function allowForm(value){
        try{
           await instance.put(api + "/allowUserAccess" , {
                email: value.email
            })
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <Nav/>
        <div className="container">
            <div className="listFac">
                <h4>User's under you</h4>
            </div>
        <table className="table table-hover">
        <tbody>
            { 
                facultyuser.map((item)=>{
                    return(
                        <tr key={item.email}>
                        <td>
                        <p>Name : {item.name}</p>
                        <p>Email_Id : {item.email}</p>
                        <p>Posititon : {item.type}</p>
                        <button className="btn btn-outline-primary" 
                        disabled={item.formStatus===1 || item.formStatus=== true ? true : null} 
                        onClick={()=>{
                            allowForm(item)
                        }}>Send Form</button>
                        {
                            item.formStatus=== true ? 
                            <button className="btn btn-outline-primary" style={{marginLeft:"20px"}}
                            onClick={()=>{
                                setUserform(!showUserForm)
                                setSeeForm(item)
                            }}> View Submitted Form</button> : null
                        }
                        {
                            showUserForm===true && seeForm.email===item.email ?
                            <>
                            <p style={{marginTop:"15px" , fontWeight:"bold"}}>Form Details : </p>
                           
                            <hr/>
                            <p>Religion: <span style={{color:"red" , fontSize:"12px" , fontWeight:"bold"}}> * Admin can view</span></p>
                            <p>Caste : <span style={{color:"red" , fontSize:"12px" , fontWeight:"bold"}}> * Admin can view</span></p>
                            <p>Height:  {item.height} cm</p>
                            <p>weight:  {item.weight} kg</p>
                            <p>FeedBack to Faculty : <span style={{color:"red" , fontSize:"12px" , fontWeight:"bold"}}>
                                 * Admin can view</span></p></>:null
                        }
                       
                        </td>
                    </tr>
                    )
                }) 
            }
        </tbody>
        </table>
        </div>
        </>
    )
}
export default FacultyDash;