
import Nav from "./nav"
import React from "react";
import axios from "axios";
import { AppContext } from "./context";
import AddFaculty from "./addFaculty";
import UserList from "./userList";
import FeedBackForm from "./feedBackForm";

function Sat(){
    const{block , setUserList, setBlock , facultyList , setFacultyList } = React.useContext(AppContext)
    const{ setSingleFacData , api , userList } = React.useContext(AppContext)
    const{forms , setForm , allUser , setAllUser} = React.useContext(AppContext)

    const [showUserForm , setUserform] = React.useState(false)
    const[adminUser , setAdminUser] = React.useState(false)

    const [seeForm , setSeeForm] = React.useState({})

    const token = window.localStorage.getItem("token")
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })

   
    
    async function getFacultyList(){
        try{
            const response = await instance.get(api + "/faculty")
            setFacultyList(response.data)
           
        }catch(error){
            console.log(error)
        }
    }

    async function trail(){
        try{
            const response = await instance.get (api + "/users")
            setAllUser(response.data)
           
        }catch(error){
            console.log(error)
        }
    }

    React.useEffect(()=>{
        getFacultyList()
        trail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

   

    return(
        <>
        <Nav/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <div>
                        <div style={{marginTop:"20px"}}>
                            <button className="btn btn-outline-info  btn-block" onClick={()=>{
                                setBlock(!block)
                                setForm(false)
                                setAdminUser(false)
                                }}>ADD FACULTY</button>
                        </div>
                        <div  style={{marginTop:"20px"}}>
                            <button  className="btn btn-outline-info  btn-block" onClick={()=>{
                                setForm(false)
                                setAdminUser(false)
                                }}>ASSIGN FACULTY</button>
                        </div>
                        <div  style={{marginTop:"20px"}}>
                            <button  className="btn btn-outline-info  btn-block" onClick={()=>{
                                setForm(false)
                                setAdminUser(true)
                                }}>USER FORM</button>
                        </div>
                        <div  style={{marginTop:"20px"}}>
                            <button  className="btn btn-outline-info  btn-block" onClick={()=>{
                                setForm(true)
                                setAdminUser(false)
                                }}>FORM</button>
                        </div>
                       
                    </div>
                </div>
                <div className="col-lg-10">

                {
                    forms===false  && adminUser===false ?
                    <>
                    <div className="listFac">
                        <h4>Faculty Member List</h4>
                    </div>
                    <div>
                    <table className="table table-hover">
                        <tbody>
                           {
                               facultyList.map((item)=>{
                                   return(
                                    <tr key={item._id}>
                                    <td>
                                        <p>User Name : {item.userName}  {item.middle} {item.last}</p>
                                        <p>Email_Id : {item.email}</p>
                                        <p>Contact : {item.number}</p>
                                       {/* <p> <span style={item.assignedUser.length > 0 ? {color:"green"}:{color:"red"}}>
                                                Total user Assigned : {item.assignedUser.length}</span></p> */}
                                            <button className="btn btn-info"  style={{margin:"8px 20px 8px 0"}}
                                            onClick={()=>{
                                                setUserList(true)
                                                setSingleFacData(item)
                                                }}>Assign User / Assign Faculty</button>     
                                    </td>
                                    </tr> 
                                   )
                               })
                           }
                        </tbody>
                    </table>
                    </div>
                    </> : forms===true && adminUser===false ? <FeedBackForm/>:
                    <>
                    <div className="listFac">
                        <h4>User List</h4>
                    </div>
                     <div>
                        <table className="table table-hover">
                            <tbody>
                            {
                                allUser.map((item)=>{
                                    return(
                                        <tr key={item._id}>
                                        <td>
                                            <p>Name : {item.name}  {item.middleName} {item.last}</p>
                                            <p>Email_Id : {item.email}</p>
                                            <p>Assigned Faculty E-mail : {item.facultyEmail}</p>
                                            {
                                            item.formStatus===true ?
                                            <button className="btn btn-info"  style={{margin:"8px 20px 8px 0"}}
                                            onClick={()=>{
                                               setSeeForm(item)
                                               setUserform(!showUserForm)
                                                }}>View Submitted Form</button>  : null 
                                        }
                                         {
                                            showUserForm===true && seeForm.email===item.email ?
                                            <>
                                            <p style={{marginTop:"15px" , fontWeight:"bold"}}>Form Details : </p>
                                        
                                            <hr/>
                                            <p>Religion: {item.religion}</p>
                                            <p>Caste : {item.caste}</p>
                                            <p>Height:  {item.height} cm</p>
                                            <p>weight:  {item.weight} kg</p>
                                            <p>FeedBack to Faculty : {item.feed} </p></>:null
                                        } 
                                        </td>
                                        </tr> 
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    </>}
                </div>
            </div>
        </div>
        {
            block === true ? <AddFaculty/> : null
        }
        {
            userList ===true ? <UserList/>:null
        }
       
        </>
    )
}

export default Sat;