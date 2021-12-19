

import React from "react";
import axios from "axios";
import Nav from "./nav";
import jwt from "jsonwebtoken";
import { AppContext } from "./context";
// import {useHistory} from "react-router-dom";
import FeedBackForm from "./feedBackForm";

function UserDashboard(){
    const[userGotData , setUserGotData] = React.useState({})
    const{api} = React.useContext(AppContext)
    const{forms , setForm , trail} = React.useContext(AppContext)

    const token = window.localStorage.getItem("token")
    const userD = jwt.decode(token)

    // let history = useHistory()

    console.log(userD)

   
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })

    async function userFinalData(){
        try{
            const response = await instance.post(api + "/singleUser" ,{
                email:userD.email
            })
            setUserGotData(response.data)
           
        }catch(error){
            console.log(error)
        }
    }

    React.useEffect(()=>{
        userFinalData()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <>
        <Nav/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <div style={{marginTop:"20px"}}>
                        <button className="btn btn-outline-info  btn-block" disabled ={userGotData.formStatus=== 1 && trail=== false ? false : true} onClick={()=>{
                            setForm(true)
                        }}>FEEDBACK FORM</button>
                    </div>
                   
                </div>
                <div className="col-lg-10">
                    {
                        forms === false ?
                        <>
                        <div style={{padding:"15px 15px 15px 0px"}}>
                            <h4>Employee Data</h4>
                        </div>
                        <hr style={{marginTop:"0px"}}/>
                        <p>Name : {userGotData.name}</p>
                        <p>Email-Id : {userGotData.email}</p>
                        <p>Position : {userGotData.type}</p>
                        {userGotData.formStatus===true || trail=== true ? <p style={{color:"yellowgreen"}}>Your Form is Submitted Successfully</p>
                        : null}
                        <hr/>
                        </> : 
                        <FeedBackForm email={userGotData.email}/>
                    }
                   
                </div>
            </div>
        </div>
        </>
    )
}

export default UserDashboard;