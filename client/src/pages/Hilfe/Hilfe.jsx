import React, { useContext ,useState, useEffect,} from 'react'
import { Context } from "../../provider/provider";
import Axios from 'axios';

import "./Hilfe.scss";
import ProfilbarHilfe from './Components/ProfilbarHilfe/ProfilbarHilfe'
import MiddlebarHilfeChef from './Components/MiddlebarHilfe/MiddlebarHilfeChef'
import MiddlebarHilfeAdmin from './Components/MiddlebarHilfe/MiddlebarHilfeAdmin'
import MiddlebarHilfeBauleiter from './Components/MiddlebarHilfe/MiddlebarHilfeBauleiter'
import MiddlebarHilfeArbeiter from './Components/MiddlebarHilfe/MiddlebarHilfeArbeiter'



function Hilfe() {

    const { user } = useContext(Context); 
    const [Rolle, setRolle] = useState('');

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
                console.log(Rolle);
            }).catch(err => { 
                console.log(err);
            });
        }


        const choice = ()=>{
            // eslint-disable-next-line
            if (Rolle=="1"){
                return <MiddlebarHilfeAdmin/>;
            }
            // eslint-disable-next-line
            else if (Rolle=="2") {
                return <MiddlebarHilfeChef/>;
            }
            // eslint-disable-next-line
            else if (Rolle=="3") {
                return <MiddlebarHilfeBauleiter/>;
            }
            else{
                return <MiddlebarHilfeArbeiter/>;
            }
        }
    const HilfeStyle = {
        paddingTop: "70px"
    }
    return (

        <div style={HilfeStyle}>
            <div className="Hilfe1">
                <ProfilbarHilfe/>
               {choice()}
                

            </div>     
        </div>
    )

          
          
    

}

export default Hilfe
