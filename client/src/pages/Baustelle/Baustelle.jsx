import React from 'react'
import "./Baustelle.scss";
import Profilbar from './components/Profilbar/Profilbar';
import Middlebar from './components/Middlebar/Middlebar';


function Baustelle() {
    return (
        <div className="Baustelle">
            <div className="Baustelle1">
                <Profilbar/>
                <Middlebar />                           
            </div>      
        </div>       
    )
}

export default Baustelle


