import React from 'react'
import "./MiddlebarHilfeChef.scss";

function MiddlebarHilfeChef() {
    return (
        <div className="MiddleHilfe">
            
            
            <p className="MiddleHilfe1">Profil ändern oder abmelden</p>
            <p>
                Wenn Sie Ihre Profildaten bearbeiten möchten, klicken Sie bitte auf das links stehende Bild.
                <br/> Rects oben steht der Button <b>"Ausloggen"</b>. 
            </p>
            <br/>
            <p className="MiddleHilfe1">Einsätze</p>
            <p>
                Beim Einloggen sehen Sie ihre Einsätze der näschten 2 Wochen. 
            </p>
           
            <br/>
            <p className="MiddleHilfe1">Bei Problemen</p>
            <p>Alles ist intuitiv zu finden. Sollte eventuelle Probleme auftreten, melden Sie sich bitte 
            bei dem <a class="mailto" href="mailto:s0573254@htw-berlin.de"> Administrator</a>. 
            </p>

        </div>

    )
}

export default MiddlebarHilfeChef
