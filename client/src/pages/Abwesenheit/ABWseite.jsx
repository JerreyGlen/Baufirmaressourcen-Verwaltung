import React from 'react';
import "./Info.scss";
import Middle from './style/Middle/Middle';
import BauleiterProfile from '../../reuseable-components/bauleiter-profile/bauleiter-profile.component';

function ABWseite() {
    return (
        <div className="ABW"> 
            <div className="ABWs">
                <BauleiterProfile/>
                <Middle/>   

            </div> 
            
        </div>
    )
    //ha
}

export default ABWseite

