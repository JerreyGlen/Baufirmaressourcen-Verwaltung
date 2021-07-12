import React, {useState, useEffect, useContext} from 'react'
import './MiddleProfil.scss'
import Axios from 'axios';
import { Context } from "../../../../provider/provider";
import {AiOutlineEdit} from "react-icons/ai"
import  {HiOutlineSave} from "react-icons/hi"
import  {ImCancelCircle} from "react-icons/im"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'





toast.configure()
function MiddleProfil() {
    
    const { user } = useContext(Context);
    const [Name, setName] = useState('')
    const [Vorname, setVorname] = useState('')
    const [Nutzername, setNutzername] = useState('')
    const [Passwort, setPasswort] = useState('')
    const [Passwort1, setPasswort1] = useState('')
    const [ProfilList, setProfilList] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)



   useEffect(() => {
    getProfil(user.id);
    });


    const  getProfil = (idPerson) => {
   
        Axios.get(`http://localhost:4000/api/get/Profil/${idPerson}`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        }).then((response) => {
            const responseProfil = response.data.result;
            setProfilList(responseProfil);
        }).catch(err => {
            console.log(err);
        });
    }

    const notify =()=>{
        toast('Die beiden Passwörter stimmen nicht überein. Geben Sie bitte das Passwort wieder ein!');
    }

    const updatePerson = (Person) => {
        // eslint-disable-next-line
        if(Passwort1 == Passwort){
            console.log(Person);     
        Axios.post("http://localhost:4000/api/update/person", {
            idPerson: Person,
            Name: Name,
            Vorname: Vorname,
            Nutzername: Nutzername,
            Passwort: Passwort     
        });  
     getProfil(user.id);    
     setIsEditMode(false);   

        }else{
           notify();
        }
        
     
    };


    //The process will be canceld
    const  changeEditMode= () =>{
        setName(user.name);
        setVorname(user.vorname);    
        setNutzername(user.nutzername);
        setIsEditMode(!isEditMode);
        console.log(isEditMode);
        
    }

    
    return isEditMode?
        <div className="MiddleProfil1a">
             {ProfilList.length>0 && ProfilList.map((val, k)=>{
                    return(
                
                    <div>
                        <div >
                            <button className="MiddleProfil2"><ImCancelCircle size="20px" onClick={changeEditMode} title="Cancel" /></button>
                            <button className="MiddleProfil2"><HiOutlineSave size="20px" title="Save" onClick={()=>{updatePerson(val.idPerson)}}/></button>
                            
                        </div>
                    
                    
                    <div>
                    
                        <div key={k} className="MiddleProfil3">
                            <form className="MiddleProfil3a">
                                <label>Name:  </label>
                                <input type="text" Value={val.Name} name="Name"  onChange={
                                    (e) => 
                                    setName(e.target.value)
                                    
                                }
                            />
                            </form>
                            <form>
                                <label>Vorname:  </label>
                                <input type="text" Value={val.Vorname} name="Vorname" onChange={
                                    (e) => 
                                    setVorname(e.target.value)
                                    
                                }/>
                            </form>
                            <form>
                                <label>Nutzername:  </label>
                                <input type="text" Value={val.Nutzername} name="Nutzername" onChange={
                                    (e) => 
                                    setNutzername(e.target.value)
                                    
                                }/>
                            </form>
                            <form>
                                <label>Passwort:  </label>
                                <input type="password"  name="Passwort" placeholder="Passwort..." onChange={
                                    (e) => 
                                    setPasswort(e.target.value)
                                    
                                }/>
                            </form>
                            <form>
                                <label>Passwort:  </label>
                                <input type="password"  name="Passwort" placeholder="Passwort wiederholen" onChange={
                                    (e) => 
                                    setPasswort1(e.target.value)
                                    
                                }/>
                            </form>
                        
                        </div>
                        
                    
                    </div>
                    
                </div>
            )
            })}
    </div>

        :

        <div className="MiddleProfil1">
            
            <div>
                <div >
                    <button className="MiddleProfil2"><AiOutlineEdit size="20px" onClick={changeEditMode} title="Edit"/></button>
                    
                </div>
                
                
                <div>
                    {ProfilList.length>0 && ProfilList.map((val, k)=>{
                        return(
                            <div key={k}>
                                <p>Name: {val.Name}</p>
                                <p>Vorname: {val.Vorname}</p>
                                <p>Nutzername: {val.Nutzername}</p>
                                <p>Passwort: ...........................</p>
                            </div>
                        )
                    })}
                   
                </div>
                
            </div>

            
            

        </div>
        

     
    
    
   
    
}

export default MiddleProfil



