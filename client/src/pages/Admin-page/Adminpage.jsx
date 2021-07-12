import React from 'react'
import "./Info.scss";
import ProfilbarAd from './Personal/ProfilbarAd/ProfilbarAd';
import MiddlebarAd from './Personal/MiddlebarAd/MiddlebarAd';



function Adminpage() {
    return (
        <div className="Admin"> 
            <div className="Admin_page">
                <ProfilbarAd/>
                <MiddlebarAd/>                                          
            </div> 
            
        </div>
    )
}

export default Adminpage
