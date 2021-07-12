import "./ProfilSeite.scss";
import React from 'react'
import ProfilbarProfil from './Components/ProfilbarProfil/ProfilbarProfil'
import MiddleProfil from './Components/MiddleProfil/MiddleProfil'

function ProfilSeite() {
    const profilStyle = {
        paddingTop: "70px"
    }
    return (
        <div style={profilStyle}>
            <div className="profil1">
                <ProfilbarProfil/>
                <MiddleProfil/>
            </div>
            
        </div>
    )
}

export default ProfilSeite
