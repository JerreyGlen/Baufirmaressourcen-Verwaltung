import React, { useContext } from 'react'
import "./ProfilbarMaschine.scss";
import profilPicture from './profilPicture.png';
import { Context } from "../../../../provider/provider";
import { Link } from 'react-router-dom';




function ProfilbarMaschine() {
    const { user } = useContext(Context);
    

    return (
        <div className="Profilbar">
            <div className="Profilbar1">
                <h1 className="Profilbar1a">{user.vorname} {user.name}</h1>
                <div className="Profilbar1e">
                    <Link to="/profilSeite">
                    <img src={profilPicture} alt="My profil pic" className="Profilbar1b"
                        title="My profil picture"></img></Link>
                    <p className="Profilbar1c">Chef</p>
                    <p className="Profilbar1d">{user.id}</p>

                </div>
            </div>

            <div className="Profilbar2">

                <Link to="/"><p className="Profilbar2a">Home</p></Link>
                <Link to="/"><p className="Profilbar2a">Baustelle</p></Link>
                <Link to="/maschine"><p className="Profilbar2a">Maschine</p></Link>
                <Link to="/"><p className="Profilbar2a">Zusammenarbeit</p></Link>
                <Link to="/hilfe"><p className="Profilbar2b">Hilfe</p></Link>

            </div>
            
        </div>
    )
}

export default ProfilbarMaschine
