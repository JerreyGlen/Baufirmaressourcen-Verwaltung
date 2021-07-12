import "./Maschine.scss";
import React from 'react';
import ProfilbarMaschine from './Components/ProfilbarMaschine/ProfilbarMaschine';
import MiddlebarMaschine from './Components/MiddlebarMaschine/MiddlebarMaschine';

function Maschine() {

    const maschineStyle = {
        paddingTop: "70px"
        
    }

    return (
        <div style={maschineStyle}>
            <div className="Maschine1">
                <ProfilbarMaschine/>
                <MiddlebarMaschine/>
            </div>
        </div>
    )
}

export default Maschine;
