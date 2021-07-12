import React, { useContext } from 'react'
import "./ProfilbarAd.scss";
import profilPicture from './profilPicture.png';
import { Context } from "../../../../provider/provider";
import { Link } from 'react-router-dom';

function ProfilbarAd() {
    const { user } = useContext(Context);
    return (
        
        <div className="Profilbar">
             <div className="Profilbar1">
                 <div className="Profil">
                    <p className="Profilbar1a">{user.vorname} {user.name}</p>
                    <div className="Profilbar1e">
                        <Link to="/profilSeite">
                        <img src={profilPicture} alt="My profil" className="Profilbar1b"
                        title="My profil picture"></img></Link>
                        <p className="Profilbar1c">ADMIN</p>
                        <p className="Profilbar1d">{user.id}</p>
                                    
                    </div> 
                    </div>           
                </div>
                <div className="Profilbar2">
                <Link to="/"><p className="Profilbar2a">Home</p></Link>
                <Link to="/"><p className="Profilbar2a">Personal</p></Link>
                <Link to="/hilfe"><p  className="Profilbar2c">Hilfe</p></Link>
                    
                
                                    
                </div>
            
            
        </div>
    )
}

export default ProfilbarAd
