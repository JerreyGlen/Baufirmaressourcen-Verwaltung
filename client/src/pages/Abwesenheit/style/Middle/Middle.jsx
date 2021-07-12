import React, { useState, useEffect } from "react";
import "./Middle.scss";
import Axios from 'axios'

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'

function Middle() {

  //Personen
  // const [idPerson, setIdPerson] = useState("");
  /*const [Name, setName] = useState("");
  const [Vorname, setVorname] = useState("");
  const [Nutzername, setNutzername] = useState("");
  const [Passwort, setPasswort] = useState("");
  const [Rolle, setRolle] = useState("");*/
  const [personenList, setpersonenList] = useState([]);

  const [idPerson, setIdPerson] = useState("");
  // const [newVorname, setNewVorname] = useState("");
  // const [newNutzername, setNewNutzername] = useState("");
  // const [newPasswort, setNewPasswort] = useState("");
  // const [newBezeichnung, setNewBezeichnung] = useState("");

  //Krankfälle

  const [date, setDate] = useState({
    start: new Date('2021-05-05'),
    end: new Date('2021-07-05')
  })

  const handleChangeStartDate = (date) => {
    date.setHours(0)
    setDate(prevValue => ({
        ...prevValue,
        start: date
    }))
}

const handleChangeEndDate = (date) => {
    date.setHours(0)
    setDate(prevValue => ({
        ...prevValue,
        end: date
    }))
}


  const [Von, setVon] = useState("");
  const [Bis, setBis] = useState("");
  // eslint-disable-next-line
  
  const [Bezeichnung, setBezeichnung] = useState("");

  const [urlaubeList, seturlaubeList] = useState([]);

  // eslint-disable-next-line
  const [idUrlaub, setidUrlaub] = useState("");
  const [idKrankheit, setidKrankheit] = useState("");
  const [krankheitenList, setkrankheitenList] = useState([]);
  // const [newVorname, setNewVorname] = useState("");
  // const [newNutzername, setNewNutzername] = useState("");
  // const [newPasswort, setNewPasswort] = useState("");
  // const [newBezeichnung, setNewBezeichnung] = useState("");


  useEffect(() => {
    getPersonen();
    /*getUrlaube();*/
    getUrlaube();
    getKrankheit();
  }, []);

  const getPersonen = () => {
    Axios.get("http://localhost:4000/api/get/personen", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      console.log(response);
      const responsePersonen = response.data.result;

      setpersonenList(responsePersonen);
    }).catch(error => {
      //setpersonenList(response.data);
      console.log(error);
    });
  }

  //selectionner les urlaube
  const getUrlaube = (idPerson) => {
    Axios.get(`http://localhost:4000/urlaube/${idPerson}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      console.log(response);
      const responseUrlaube = response.data.result;
      seturlaubeList(responseUrlaube);
    }).catch(error => {
      //setpersonenList(response.data);
      console.log(error);
    });
  }

  //selectionner les krankheiten
  const getKrankheit = (idPerson) => {
    Axios.get(`http://localhost:4000/krankheit/${idPerson}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      console.log(response);
      const responsekrank = response.data.result;
      setkrankheitenList(responsekrank);
    }).catch(error => {
      //setpersonenList(response.data);
      console.log(error);
    });

  }
  //haz

  const submiturla = () => {
    date.start.setHours(2)
    date.end.setHours(2)
    Axios.post("http://localhost:4000/api/insert/urlaube",
      {
        Bezeichnung: Bezeichnung, idPerson: idPerson, 
        Von:  date.start.toISOString().slice(0, 19).replace("T", " "), 
        Bis: date.end.toISOString().slice(0, 19).replace("T", " ")

      });
      
    setBezeichnung("");
    setVon("");
    setBis("");


    getUrlaube(idPerson);
  }
  const submitkrank = () => {
    date.start.setHours(2)
    date.end.setHours(2)
    Axios.post("http://localhost:4000/api/insert/krankheit",
      {
        Bezeichnung: Bezeichnung, idPerson: idPerson, 
        Von: date.start.toISOString().slice(0, 19).replace("T", " "), 
        Bis: date.end.toISOString().slice(0, 19).replace("T", " ")//, Beschreibung: Beschreibung

      });
      
    setBezeichnung("");
    setVon("");
    setBis("");


    getKrankheit(idPerson);
  }

  //haz

  //submit Id in the field
  const [submitid, setSubmitid] = useState("")


  const submitId = (idPerson) => {
    console.log(idPerson);
    setSubmitid(idPerson);
    setIdPerson(idPerson);
    /*setBezeichnung(Bezeichnung);
    setVon(Von)
    setBis(Bis)*/
    setBezeichnung("");
    setVon("");
    setBis("");

        /*getKrankheiten();
        getUrlaube();*/;

    getUrlaube(idPerson);
    getKrankheit(idPerson)
  }

  const SubmitURL = (idUrlaub) => {
    console.log(idUrlaub);
    let [item] = urlaubeList.filter(item => item.idUrlaub === idUrlaub)
    console.log(item);
    
    setidUrlaub(item.idUrlaub);
    setBezeichnung(item.Bezeichnung);
    handleChangeStartDate(new Date(item.Von));
    handleChangeEndDate(new Date(item.Bis));
    /*setidUrlaub(idUrlaube);
    console.log(idUrlaube);
    let item=urlaubeList[idUrlaube];*/
    /*getKrankheiten();
    getUrlaube();*/
  }
  const SubmitKRA = (idKrankheit) => {
    console.log(idKrankheit);

    console.log(krankheitenList)
    let [item] = krankheitenList.filter(item => item.idKrankheit === idKrankheit)
    setidKrankheit(item.idKrankheit);
    setBezeichnung(item.Bezeichnung);
    handleChangeStartDate(new Date(item.Von));
    handleChangeEndDate(new Date(item.Bis));
        /*getKrankheiten();
        getUrlaube();*/
  }


  //Updatekrankheit
  const updateKrankheit = (Krankheit) => {
    console.log(idPerson);
    date.start.setHours(2)
    date.end.setHours(2)
    Axios.post("http://localhost:4000/api/update/krankheit",
      {
        idKrankheit: Krankheit, Bezeichnung: Bezeichnung, idPerson: idPerson, 
        Von: date.start.toISOString().slice(0, 19).replace("T", " "), 
        Bis: date.end.toISOString().slice(0, 19).replace("T", " ")


      });
    setBezeichnung("");
    /*handleChangeStartDate("");
    handleChangeEndDate("");*/

    getKrankheit(idPerson);
  }
  //updateurlaub
  const updateUrlaub = (Urlaub) => {
    console.log(idPerson);
    date.start.setHours(2)
    date.end.setHours(2)
    Axios.post("http://localhost:4000/api/update/urlaube",
      {
        idUrlaub: Urlaub, Bezeichnung: Bezeichnung, idPerson: idPerson, 
        Von: date.start.toISOString().slice(0, 19).replace("T", " "), 
        Bis: date.end.toISOString().slice(0, 19).replace("T", " ")


      });
    setBezeichnung("");
    /*handleChangeStartDate("");
    handleChangeEndDate("");*/

    getUrlaube(idPerson);
  }

  const theme = createMuiTheme({
    palette: {
        primary: {  // primary color
            contrastText: "#FFFFFF",
            dark: "#000000",
            main: "#1fab89",  // black
            light: "#000000"
        }
    }
})

  /*setpersonenList([...personenList, {
    Name: Name,
    Vorname: Vorname, Nutzername: Nutzername,
    Passwort: Passwort
  },]);
  setRolle("");*/

  //Delete Krankheiten
  const deleteKrankheiten = (id) => {
    console.log(id);
    Axios.post(`http://localhost:4000/api/delete/krankheiten/${id}`)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          getKrankheit(idPerson);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      getKrankheit(idPerson);
      setBezeichnung("");
  };
  //Delete urlaube
  const deleteUrlaube = (idkra) => {
    console.log(idkra);
    Axios.post(`http://localhost:4000/api/delete/urlaube/${idkra}`)
      .then((responseurl) => {
        console.log(responseurl);
        if (responseurl.data.success) {
          getUrlaube(idPerson);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      getUrlaube(idPerson);
      setBezeichnung("");
  };
  const timeChange= (time) => {
    let Time=new Date(time);
    let moi=Time.getMonth()+1;
    let jour=Time.getDate();

    return jour+"."+moi+"."+Time.getFullYear();
  }
  /*const timeSend= (time) => {
    let Time=new Date(time);
    let moi=Time.getMonth();
    let jour=Time.getDate()+1;
    let date=new Date(jour+"/"+moi+"/"+Time.getFullYear());
    return date;
  }*/




  /*function selectUser(idBaustelle)
  {
      let item=baustelleList[idBaustelle-1];
      setNewAuftragsnummer(item.newAuftragsnummer)
      setNewAuftraggeber(item.newAuftraggeber)
      setNewPLZ(item.newPLZ)
      setNewOrt(item.newOrt)
      setNewStrasse(item.newStrasse)
      setNewBeginn(item.newBeginn)
      setNewEnde(item.newEnde)
      setNewBemerkung(item.setNewBemerkung)
      setNewBezeichnung(item.newBezeichnung)
      setNewUmfang(item.newUmfang)
      setNewNr(item.newNr)
  }
  
  <input type="text"  onChange={(e)=>{
                      
setNewName(e.target.value);}}/>
  */


  return (
    <div className="Midle">

      <div className="Midle1">

        <p className="Midle1a">ABWESENHEIT</p>

      </div>
      <div className="">

      </div>
      <div className="Midle4">
        <div className="Midle2AB">
         
          <div className="Midle2bb">
            <div className="list">
            <table >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Namen</th>
                    
                  </tr>
                </thead>

                <tbody>
              {(personenList && personenList.length > 0) && personenList.map((val, j) => {
                return (<tr key={j}>

                      <td className="id">{val.idPerson}</td>
                      <td className="personR" onClick={() => { submitId(val.idPerson) }}><nav className="personRow">
                        
                          {val.Vorname} {val.Name}

                      </nav>
                      </td>
                      
                    </tr>
                );
              })
              }
              </tbody>
              </table>

            </div>
          </div>

        </div>
        <div className="Midle2">

          <div className="Midle2b">


            <h2>Krankheit(en) vom</h2>
            <div className="list">
            <table >
                <thead>
                  <tr>
                    <th></th>
                    <th>Actions</th>
                    
                  </tr>
                </thead>

                <tbody>

              {krankheitenList.length > 0 && krankheitenList.map((kra, k) => {
                return (<tr className="Rose" key={k}>
                
                  <td className="namefall" onClick={() => { SubmitKRA(kra.idKrankheit) }}>
                      {timeChange(kra.Von)}
                  </td>
                  <td className="Actionstd"><div className="Actions"><button className="personLoe" onClick={() => { deleteKrankheiten(kra.idKrankheit) }}>X</button>
                  <button className="personName" id="updateInput" onClick={() => { updateKrankheit(kra.idKrankheit) }}>
                    Speichern</button></div></td>
                  
                </tr>
                );
              })
              }
              </tbody>
              </table>

            </div>
            <h2>Urlaub(e) vom</h2>
            <div className="list">
            <table >
                <thead>
                  <tr>
                    <th></th>
                    <th>Actions</th>
                    
                  </tr>
                </thead>

                <tbody>

              {urlaubeList.length > 0 && urlaubeList.map((url, u) => {
                return (<tr className="Rose" key={u}>
                
                <td className="namefall" onClick={() => { SubmitURL(url.idUrlaub) }}>
                    {timeChange(url.Von)}
                </td>
                <td className="Actionstd"><div className="Actions"><button className="personLoe" onClick={() => { deleteUrlaube(url.idUrlaub) }}>X</button>
                <button className="personName" id="updateInput" onClick={() => { updateUrlaub(url.idUrlaub) }}>
                  Speichern</button></div></td>
                
              </tr>
                );
              })
              }
              </tbody>
              </table>

            </div>
          </div>
        </div>
        <div className="Midle3">
          <div className="Midle3a">
            <div className="form">
              Id Person
              <input
                type="text"
                className="Person"
                name="IdPerson"
                placeholder="Klicken SIe auf der Person..."
                value={submitid}
                onChange={(e) => {
                  setIdPerson(e.target.value);
                }}
                required
              />
              Bezeichnung
              <input
                type="text"
                name="Bezeichnung"
                placeholder="Geben Sie die Bezeichnung..."
                value={Bezeichnung}
                onChange={(e) => {
                  setBezeichnung(e.target.value);
                }}
                required
              />
              <ThemeProvider theme={theme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog1"
                                    label="Von"
                                    format="dd.MM.yyyy"
                                    value={date.start}
                                    onChange={handleChangeStartDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog2"
                                    label="Bis"
                                    format="dd.MM.yyyy"
                                    value={date.end}
                                    onChange={handleChangeEndDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
              </ThemeProvider>


              <div className="Midle3b">
                <input type="submit" value="Krankfall melden" onClick={() => submitkrank()} />
                <input type="submit" value="Urlaube melden" onClick={() => submiturla()} ></input>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
/*<select>
                <option value="0">To select nothing</option>
                <option value="" >Krankheit</option>
                <option value="" >Urlaub</option>                    
              </select>
              
              Von
              <DatePicker value={Von}
                selected={Von}
                onChange={date => setVon(date)}
                dateFormat='dd/MM/yyyy'
              />
              Bis
              <DatePicker value={Bis}
                selected={Bis}
                onChange={date => setBis(date)}
                dateFormat='dd/MM/yyyy'
              />
              
              */

export default Middle
