import React, { useState, useEffect, useRef } from 'react'
import "./MiddlebarMaschine.scss";
import Axios from 'axios';
 

function MiddlebarMaschine() {
   const [idMaschine, setIdMaschine] = useState('')
    const [IdTyp, setIdTyp] = useState('')
    const [Kennzeichen, setKennzeichen] = useState('')
    const [Nummer, setNummer] = useState('')
    const [Zustand, setZustand] = useState('')
    const [maschinenList, setMaschinenList] = useState([])
    const [typList, setTypList] = useState([])
    const Message = 'To select nothing';
    const [isTyp, setIsTyp] = useState(false);
    const [Bezeichnung, setBezeichnung] = useState('');
  
  

    useEffect(() => {
        getMaschine();
        getIdTyp();
        
    },[]);

    const getMaschine = () => {
        Axios.get('http://localhost:4000/api/get/Maschine', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        }).then((response) => {
            const responseMaschinen = response.data.result;
            setMaschinenList(responseMaschinen);
        }).catch(err => {
            console.log(err);
        });
    }

    const getIdTyp = () => {
        Axios.get('http://localhost:4000/api/get/IdTyp', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        }).then((response) => {
            setIsTyp(false);
            const responseIdTyp = response.data.result;
            setTypList(responseIdTyp);
        }).catch(err => {
            console.log(err);
        });
    }





    const submitMaschine = () => {
        console.log(IdTyp);
        Axios.post("http://localhost:4000/api/insert/Maschine",
            {
               idTyp:IdTyp, Kennzeichen:Kennzeichen, Nummer:Nummer, Zustand:Zustand
                
            });
        setIsTyp(false);        
        //Clear the field after click button
        setNummer("");
        setKennzeichen("");
        setZustand("");
        getMaschine(); 
    }
 


    const deleteMaschine = (idMaschine) => {
        console.log(idMaschine);
        Axios.post(`http://localhost:4000/api/delete/Maschine/${idMaschine}`);
        getMaschine();
    };


    const updateMaschine = (Maschine) => {
        console.log(Maschine);
        Axios.post("http://localhost:4000/api/update/maschine", {
            idMaschine: Maschine,
            Kennzeichen: Kennzeichen,
            Nummer: Nummer,
            idTyp: IdTyp,
            Zustand: Zustand        
        });
        setIsTyp(false);
        setNummer("");
        setKennzeichen("");
        setZustand("");     
        getMaschine();
    };

    const getIdT = async(maschine) => {
        console.log(maschine);
     const a = await  Axios.get(`http://localhost:4000/api/get/idT/${maschine}`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        })
        const b = a.data.q;
        console.log(b);
        return b;
       
    }

   

    const selectUser = (idMaschine) => {
        setIdMaschine(idMaschine);
        console.log(idMaschine);
      
        let t= getIdT(idMaschine);
        t.then((res)=>{
            console.log(res);
            let [item1] = typList.filter(item => item.idTyp === res);
            setBezeichnung(item1.idTyp + " "+ item1.Bezeichnung);
       
            
            
        })

        let [item] = maschinenList.filter(item => item.idMaschine === idMaschine)
        setIdTyp(item.idTyp)
        setKennzeichen(item.Kennzeichen)
        setZustand(item.Zustand)
        setNummer(item.Nummer)
         setIsTyp(true);
        
      
        
    }

    const choice=(isTyp)=>{
        
        if(isTyp){
            return Bezeichnung;
        }
        else{
            return Message;
        }

    }


    return (
        <div className="MiddlebarMaschine">
            
            <div className="MiddlebarMaschine1">

                <p className="MiddlebarMaschine1a">MASCHINE</p>
               
            </div>
            <div className="MiddlebarMaschine4">
            
                <div className="MiddlebarMaschine2">
                    <div className="MiddlebarMaschine2a">
                        <form>
                            <input type="text" name="" placeholder="Suche.."></input>
                            <input type="submit" name="" value="Q" ></input>

                        </form>
                    </div>

                    <div className="MiddlebarMaschine2b">
                        <table >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th >IdTyp</th>
                                    <th>Kennzeichen</th>
                                    <th>Nummer</th>                               
                                    <th>Zustand</th>
                                    <th className="actionsMaschine1">Aktionen</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {maschinenList.length>0 && maschinenList.map((val, i) => {                               
                                    return (
                                        <tr key={i}>
                                            <td>{val.idMaschine}</td>
                                            <td>{val.idTyp}</td>   
                                            <td>{val.Kennzeichen}</td>
                                            <td>{val.Nummer}</td>                                                                              
                                            <td>{val.Zustand}</td>
                                            <td className="actionsMaschine">                                                <button onClick={() => selectUser(val.idMaschine)}>Edit</button>
                                                <button onClick={() => deleteMaschine(val.idMaschine)}>Delete</button>                                                                  
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="MiddlebarMaschine3">
                    <div className="MiddlebarMaschine3a">
                            
                    <label >idTyp:</label>  
                        <select  onChange={
                            (e) => 
                            setIdTyp(e.target.value)
                         } >
                             <option value="0">{choice(isTyp)}</option>
                            {typList.length && typList.map((val, k)=>{
                                return(
                                    <option key={k}  value={val.idTyp}  >{val.idTyp} {val.Bezeichnung} </option>
                                )
                            })}                       
                        </select>
                        <label >Kennzeichen:</label>                           
                            <input  type="text" placeholder="Text.." name="Kennzeichen" value={Kennzeichen} maxLength={15} onChange={
                                (e) => setKennzeichen(e.target.value)

                            }
                            ></input> 

                        <label >Nummer:</label>
                        <input type="text" placeholder="Text.." name="Nummer" value={Nummer} maxLength={11} onChange={
                            (e) => 
                                setNummer(e.target.value)
                            
                        }
                        ></input>
                       
                        <label >Zustand:</label>
                        <input type="text" placeholder="Text.." name="Bemerkung" value={Zustand} maxLength={15} onChange={
                            (e) => 
                                setZustand(e.target.value)
                            
                        }


                        ></input>
                            
                        
                    </div>
                    <div className="MiddlebarMaschine3b">
                        <input type="submit" value="Neue Maschine anlegen" onClick={()=>{submitMaschine()}}/>  
                        <input type="submit" value="Speichern" onClick={()=>{updateMaschine(idMaschine)}}></input>                                                  
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MiddlebarMaschine
