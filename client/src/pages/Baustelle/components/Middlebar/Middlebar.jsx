import React, { useState, useEffect } from "react";
import "./Middlebar.scss";
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"



function Middlebar() {


    const [idBaustelle, setIdBaustelle] = useState('')
    const [Auftragsnummer, setAuftragsnummer] = useState('')
    const [Auftraggeber, setAuftraggeber] = useState('')
    const [PLZ, setPLZ] = useState('')
    const [Ort, setOrt] = useState('')
    const [Strasse, setStrasse] = useState('')
    const [Beginn, setBeginn] = useState(new Date('2020-01-01'))
    const [Ende, setEnde] = useState(new Date('2020-01-01'))
    const [Bemerkung, setBemerkung] = useState('')
    const [Bezeichnung, setBezeichnung] = useState('')
    const [Umfang, setUmfang] = useState('')
    const [Nr, setNr] = useState('')
    const [baustelleList, setBaustelleList] = useState([]);
    const [bauleiterList, setBauleiterList] = useState([]);
    const [idBauleiter, setIdBauleiter] = useState('');
    const [idBaustelles, setIdBaustelles] = useState('')
    const [Names, setNames] = useState('')
    const Message = 'To select nothing'
    const [isBauleiter, setIsBauleiter] = useState(false)


   

    useEffect(() => {
        getBaustelle();
        getBauleiter();
    },[]);

    const getBaustelle = () => {
        Axios.get('http://localhost:4000/api/get', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        }).then((response) => {     
            console.log(response);
            const responseBaustellen = response.data.result;
            setBaustelleList(responseBaustellen);
            setIdBaustelles(responseBaustellen[responseBaustellen.length-1].idBaustelle);

            
        }).catch(err => {
            console.log(err);
        });
    }

    const getIdPerson = async (baustelle) => {
        console.log(baustelle);
       const a= await Axios.get(`http://localhost:4000/api/get/idPerson/${baustelle}`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        })

        const b = a.data.q;
        console.log(b);
        return b;
    }


    const getBauleiter = () =>
    {
        Axios.get('http://localhost:4000/api/get/Bauleiters', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        }).then((response)=>
        {
            setIsBauleiter(false);
            console.log("bauleiter" + response);
            const responseBauleiter = response.data.bauleiter;
            setBauleiterList(responseBauleiter);
        }
        ).catch(err => {
            console.log(err);
        });
    }



    const submitBaustelle = () => {
       
        Axios.post(`http://localhost:4000/api/insert`,
            {
                 idPerson:idBauleiter, idBaustelle: idBaustelles+1, Auftragsnummer: Auftragsnummer, Auftraggeber: Auftraggeber, PLZ: PLZ, Ort: Ort, Strasse: Strasse, 
                 Beginn: timeSend( Beginn)
                , Ende: timeSend(Ende), Bemerkung: Bemerkung, Bezeichnung: Bezeichnung, Umfang: Umfang, Nr: Nr
            });
           
            console.log(idBauleiter);
            console.log(idBaustelles);
            getBaustelle();    
            setIsBauleiter(false);
            setAuftragsnummer("");
            setAuftraggeber("");
            setPLZ("");
            setOrt("");
            setStrasse("");
            setBeginn(new Date('2020-01-01'));
            setEnde(new Date('2020-01-01'));
            setBemerkung("");
            setBezeichnung("");
            setUmfang("");
            setNr("");   
    }



    const deleteBaustelle = (baustelle) => {
        Axios.post(`http://localhost:4000/api/delete/${baustelle}`);    
        console.log(baustelle);
       getBaustelle();
    };


    const updateBaustelle = (Baustelle) =>{
        console.log(Baustelle);
        Axios.post("http://localhost:4000/api/update/baustelle", {
            idBaustelle: Baustelle,
            Auftragsnummer: Auftragsnummer,
            Auftraggeber: Auftraggeber,
            PLZ: PLZ,
            Ort: Ort,
            Strasse: Strasse,
            Beginn: timeSend(Beginn),
            Ende: timeSend( Ende),
            Bemerkung: Bemerkung,
            Bezeichnung: Bezeichnung,
            Umfang: Umfang,
            Nr: Nr,
            idPerson: idBauleiter
        });
        setIsBauleiter(false);
        setAuftragsnummer("");
        setAuftraggeber("");
        setPLZ("");
        setOrt("");
        setStrasse("");
        setBeginn(new Date('2020-01-01'));
        setEnde(new Date('2020-01-01'));
        setBemerkung("");
        setBezeichnung("");
        setUmfang("");
        setNr("");
        getBaustelle();
    };



    const selectUser = (idBaustelle) => {      
       
        
        let t=  getIdPerson(idBaustelle);
        t.then((res)=>{
            console.log(res);
            let [item1] =  bauleiterList.filter(item => item.idPerson === res);
            setNames(item1.Name + " "+ item1.Vorname);
        })

        setIsBauleiter(true);
        setIdBaustelle(idBaustelle);
        let [item] = baustelleList.filter(item => item.idBaustelle === idBaustelle);
        setAuftragsnummer(item.Auftragsnummer)
        setAuftraggeber(item.Auftraggeber)
        setPLZ(item.PLZ)
        setOrt(item.Ort)
        setBeginn(new Date( item.Beginn))
        setEnde(new Date( item.Ende))
        setStrasse(item.Strasse)
        setBemerkung(item.Bemerkung)
        setBezeichnung(item.Bezeichnung)
        setUmfang(item.Umfang)
        setNr(item.Nr)
   

    }

    const choice=(isbauleiter)=>{
        if(isbauleiter){
            return Names;
        }
        else{
            return Message;
        }

    }

  
    const timeChange= (time) => {
        let Time=new Date(time);
        let moi=Time.getMonth()+1;
        let jour=Time.getDate();
    
        return jour+"."+moi+"."+Time.getFullYear();
      }

      const timeSend= (time) => {
        let Time=new Date(time);
        let moi=Time.getMonth()+1;
        let jour=Time.getDate()+1;
        let date=new Date(Time.getFullYear()+"."+moi+"."+jour);
        return date;
       
       
      }

    return (
        <div className="Middlebar" >
            
            <div className="Middlebar1">

                <p className="Middlebar1a">BAUSTELLE</p>
               
            </div>
            <div className="Middlebar4">
            
                <div className="Middlebar2">
                <div className="Middlebar2a">
                        <form>
                            <input type="text" name="" placeholder="Suche.."></input>
                            <input type="submit" name="" value="Q" ></input>

                        </form>
                    </div>
                    
                    <div className="Middlebar2b">
                        <table >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Auftragsnummer</th>
                                    <th>Auftraggeber</th>
                                    <th >Umfang</th>
                                    <th >Beginn</th>
                                    <th className="actions1">Aktionen</th>
                                </tr>
                            </thead>
                            
                            <tbody >
                                {baustelleList.length>0 && baustelleList.map((val, i) => {
                                    return (
                                        <tr key={i} className="actionsColor1">
                                            <td>{val.idBaustelle}</td>
                                            <td>{val.Auftragsnummer}</td>
                                            <td>{val.Auftraggeber}</td>
                                            <td>{val.Umfang}</td>
                                            <td>{timeChange( val.Beginn)}</td>
                                            <td className="actions">
                                                <button onClick={() => selectUser(val.idBaustelle)}
                                               
                                                >Edit</button>
                                                <button  onClick={() => deleteBaustelle(val.idBaustelle)}>Delete</button>        
                                            </td>
                                        </tr>
                                        
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                               
                    </div>
                </div>
                <div className="Middlebar3">
                    <div className="Middlebar3a">
                            
                        <div>

                            <label >Auftragsnummer:</label>                           
                                <input  type="text" placeholder="Text.." name="Auftragsnummer" value={Auftragsnummer}  maxLength={15} onChange={
                                    (e) => setAuftragsnummer(e.target.value)

                                }
                                ></input> 
                                                                                                                            
                            <label >Auftraggeber:</label>
                            <input type="text" placeholder="Text.." name="Auftraggeber" value={Auftraggeber} maxLength={15} onChange={
                                (e) => 
                                    setAuftraggeber(e.target.value)
                                
                            }

                            ></input>
                            <label >Bezeichnung:</label>
                            <input type="text" placeholder="Text.." name="Bezeichnung" value={Bezeichnung} onChange={
                                (e) => 
                                    setBezeichnung(e.target.value)
                                
                            }


                            ></input>
                            <label >Bemerkung:</label>
                            <input type="text" placeholder="Text.." name="Bemerkung" value={Bemerkung} onChange={
                                (e) => 
                                    setBemerkung(e.target.value)
                                
                            }


                            ></input>
                            <label>  PLZ:<br></br></label>
                            <input type="text" name="PLZ" placeholder="Text.." value={PLZ} maxLength={5} onChange={
                                (e) => 
                                    setPLZ(e.target.value)
                                
                            }

                            ></input>
                            <label> <br></br>  Ort: <br></br></label>
                            <input type="text" placeholder="Text.." name="Ort" value={Ort} onChange={
                                (e) => 
                                    setOrt(e.target.value)
                                
                            }

                            ></input>
                            <label >Straße:</label>
                            <input type="text" placeholder="Text.." name="Straße" value={Strasse} onChange={
                                (e) => 
                                    setStrasse(e.target.value)
                                
                            }
                            ></input>
                            <label><br></br>Hausnummer:<br></br></label>
                            <input type="text" placeholder="Text.." name="Nr" value={Nr} maxLength={15} onChange={
                                (e) => 
                                    setNr(e.target.value)
                                
                            }

                            ></input>
                            <label >Beginn:</label>
                            <DatePicker value={Beginn}
                            selected ={Beginn}
                            onChange= {date => setBeginn(date)}
                            dateFormat= 'dd.MM.yyyy' 
                            />               
                            <label >Ende:</label>
                            <DatePicker value={Ende}
                            selected ={Ende}
                            onChange= {date => setEnde(date)}
                            dateFormat= 'dd.MM.yyyy' 
                            />   
                            <label >Umfang:</label>
                            <input type="text" placeholder="Text.." name="Umfang" value={Umfang} maxLength={15} onChange={
                                (e) => 
                                    setUmfang(e.target.value)
                                
                            }

                            ></input>
                            
                        </div>
                        <p>Bauleiter:</p>
                            <select onChange={
                                (e) => 
                                setIdBauleiter(e.target.value)
                                
                            }>
                               
                                <option value="0">{choice(isBauleiter)}</option>
                                {bauleiterList.length>0 && bauleiterList.map((val, j)=>
                                    {
                                        return (

                                            <option key={j}   value={val.idPerson} >{val.Name} {val.Vorname}</option>
                                        
                                        )                   
                                       
                                    }
                                    
                                )}                              
                                            
                            </select>

                           
                        
                        
                    </div>
                    
                        <div className="Middlebar3b" >
                            <input type="submit" value="Neue Baustelle anlegen"  onClick={()=>{submitBaustelle()}}/>  
                            <input type="submit" value="Speichern" onClick={()=>{updateBaustelle(idBaustelle)}}></input>                                             
                    
                        </div>
                   
                </div>
            </div>

        </div>
    )
}



export default Middlebar
