import React, { useContext ,useState, useEffect,} from 'react'
import "./ProfilbarHilfe.scss";
import profilPicture from './profilPicture.png';
import { Context } from "../../../../provider/provider";
import { Link } from 'react-router-dom';
import Axios from 'axios';




function ProfilbarHilfe() {
    const { user } = useContext(Context); 
    const [Rolle, setRolle] = useState('');
    const [Bezeichnung, setBezeichnung] = useState('')


    useEffect(() => {
        getRolle(user.id);
        });
    
    
        const  getRolle = (idPerson) => {
            Axios.get(`http://localhost:4000/api/get/Rollen/${idPerson}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                },
            }).then((response) => {
                console.log(response);
                const responseRolle = response.data.result;
                setRolle(responseRolle[0].idRolle);
                getBezeichnung(responseRolle[0].idRolle);
                console.log(Rolle);
            }).catch(err => { 
                console.log(err);
            });
        }

        const  getBezeichnung = (idRolle) => {
            console.log(idRolle);
            Axios.get(`http://localhost:4000/api/get/Bezeichnung/${idRolle}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                },
            }).then((response) => {
                console.log(response);
                const responseBezeichnung = response.data.result;
                setBezeichnung(responseBezeichnung[0].Bezeichnung);
            }).catch(err => { 
                console.log(err);
            });
        }


    return (
        <div className="Profilbar">
            <div className="Profilbar1">
                <h1 className="Profilbar1a">{user.vorname} {user.name}</h1>
                <div className="Profilbar1e">
                    <Link to="/profilSeite">
                    <img src={profilPicture} alt="My profil pic" className="Profilbar1b"
                        title="My profil picture"></img></Link>
                    <p className="Profilbar1c">{Bezeichnung}</p>
                    <p className="Profilbar1d">{user.id}</p>

                </div>
            </div>

            <div className="Profilbar2">

                <Link to="/"><p className="Profilbar2a">Home</p></Link>
                <Link to="/"><p className="Profilbar2a">Personal</p></Link>
                <Link to="/hilfe"><p className="Profilbar2c">Hilfe</p></Link>
            </div>
            
        </div>
    )
}

export default ProfilbarHilfe
