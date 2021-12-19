
import React from "react";
import { AppContext } from "./context";
import axios from "axios";


function UserList(){

    const{setUserList , api} = React.useContext(AppContext)
    const{allUser , setAllUser , singleFacData } = React.useContext(AppContext)

    const token = window.localStorage.getItem("token")
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })

    async function trail(){
        try{
            const response = await instance.get (api + "/users")
            setAllUser(response.data)
        }catch(error){
            console.log(error)
        }
    }

    React.useEffect(()=>{
        trail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function addingUser(value){
        try{
            const response = await instance.put(api+"/adduserToFaculty",{
                facultyEmail:singleFacData.email , 
                userEmail : value.email,
                name : value.name,
                position : value.type
            })
            await instance.put(api + "/assigner" , {
                email: value.email
            })
            trail()
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <div className = "parent">


            <div className = "child">
                <div style={{padding:"15px 20px"}}>
                    <h4>User's List</h4>
                </div>
            <div className="scroll" style={allUser.length===0?{height:"100px"}:allUser.length===1?{height:"200px"}:{height:"340px"}}>
            <table className="table table-hover">
                <tbody>
                { 
                allUser.map((item) => {
                    return (
                    <tr key={item._id}>
                        <td>
                        <p>Name : {item.name} {item.last}</p>
                        <p>Email_Id : {item.email}</p>
                        <p>Posititon : {item.type}</p>
                        <button className="btn btn-outline-primary" disabled={item.assign===true ? true : false} 
                        onClick={()=>{
                            addingUser(item)
                        }}>Add</button>
                        </td>
                    </tr>
                    );
                })
                }
                </tbody>
            </table>
            </div>
            <div>
                <button className="btns btn btn-outline-primary" onClick={()=>{
                   setUserList(false)
                }}>Back</button>
                
            </div>
            </div>


        </div>
        </>
    )
}

export default UserList;