import React, { useState, useEffect } from "react";
import "./MiddlebarAd.scss";
import Axios from 'axios'


function MiddlebarAd() {

  // const [idPerson, setIdPerson] = useState("");
  // eslint-disable-next-line
  const [idPerson, setIdPerson] = useState("");
  const [Name, setName] = useState("");
  const [Vorname, setVorname] = useState("");
  const [Nutzername, setNutzername] = useState("");
  const [Passwort, setPasswort] = useState("");
  const [Rolle, setRolle] = useState("");
  const [personenList, setpersonenList] = useState([]);
  const [rolleList, setrolleList] = useState([]);
  const [Rolles, setRolles] = useState("");
  const [rollenList, setRollenList]= useState([]);
  const [CheikhAntaDiop, setCheikhAntaDiop] = useState("Klicken Sie auf 'Neue Person anlegen', bevor Sie eine neue Person einfügen. Wählen Sie immer 'erste Rolle'");
  const [CheikhAnta, setCheikhAnta] = useState("Klicken sie auf der Namen einer Person, um ihre Informationen zu bekommen und zu bearbeiten");
  const [iRolle, setiRolle] = useState("");


  useEffect(() => {
    getPersonen();
    getRollen();
    getRole();

  }, []);

  const getPersonen = () => {
    Axios.get("http://localhost:4000/api/get/personen").then((response) => {
      console.log(response);
      const responsePersonen = response.data.result;
      setpersonenList(responsePersonen);
    }).catch(error => {
      console.log(error);
    });
  }

    const findRole = (id) => {
      //setIdPerson(id);
   switch (id) {
            case 1:
                return "Admin"
            case 2:
                return "Chef"
            case 3:
                return "Bauleiter"
            case 4:
                return "Polier"
            case 5:
                return "Bauarbeiter"

            default:
                return ""
        }

    }

    const findid = (Bezeichnung) => {
      //setIdPerson(id);
      setRolle(Bezeichnung);
   switch (Bezeichnung) {
            case "Admin":
                return 1
            case "Chef":
                return 2
            case "Bauleiter":
                return 3
            case "Polier":
                return 4
            case "Bauarbeiter":
                return 5

            default:
                return ""
        }

    }
    const find = (Bezeichnung) => {
      setiRolle(findid(Bezeichnung));

    }

  const getRole = () => {
    Axios.get("http://localhost:4000/api/get/rollen").then(response => {
        const responseRoles = response.data.result;
        setRollenList(responseRoles);
    }).then(err => {
        console.log(err);
    })

}
  const getRollen = (idPerson) => {
    Axios.get(`http://localhost:4000/idrolle/${idPerson}`).then((response) => {
      console.log(response);
      const responserollen = response.data.result;
      setIdPerson(idPerson);
      setrolleList(responserollen);
    }).catch(error => {
      //setpersonenList(response.data);
      console.log(error);
    });
  }


  //
  const submit = () => {
    console.log(Name);
    console.log(Rolle);
    console.log(Nutzername);
    console.log(iRolle);
    Axios.post("http://localhost:4000/api/insert/personen",
      { Name: Name, Vorname: Vorname, Nutzername: Nutzername, Passwort: Passwort,
        Rolles: Rolles, rolle: Rolle , iRolle: iRolle})
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setIdPerson("");
          setName("");
          setVorname("");
          setNutzername("");
          setPasswort("");
          setRolle("");
          getPersonen();
          setCheikhAntaDiop("Klicken Sie auf 'Neue Person anlegen', bevor Sie eine neue Person einfügen. Wählen Sie immer 'erste Rolle'");
          setCheikhAnta("Klicken sie auf der Namen einer Person, um ihre Informationen zu bekommen und zu bearbeiten");


        }
      }).catch(error => {
        console.log(error);
      }
      );
  }


  const deletePersonen = (id) => {
    console.log(id);
    Axios.post(`http://localhost:4000/api/delete/personen/${id}`)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          //deleteRollen(id);
          
          setrolleList("");
          setIdPerson("");
          setName("");
          setVorname("");
          setNutzername("");
          setPasswort("");
          setRolle("");
          getPersonen();
          setCheikhAntaDiop("Klicken Sie auf 'Neue Person anlegen', bevor Sie eine neue Person einfügen. Wählen Sie immer 'erste Rolle'");
          setCheikhAnta("Klicken sie auf der Namen einer Person, um ihre Informationen zu bekommen und zu bearbeiten");

        }
      })
      .catch((err) => {
        console.log(err);
      });

  };

  //setCheikhAntaDiop("Cliquez sur 'Neue Person anlegen, bbevor Sie eine neue Person einfügen.'");
  //setCheikhAnta("");

  const deleteRollen = (id) => {
    console.log(id);
    Axios.post(`http://localhost:4000/delete/rollen/${id}`)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          //setrolleList("");
        }
        getRollen(idPerson);
        setCheikhAntaDiop("Eine Person ohne Rolle kann sich nicht einlogen. Eine Rolle kann immer eingefügt werden, obwohl die ubrig bleibende Rolle gelöscht wurde. Wenn Sie eine Rolle ändern möchte, dann fügen Sie die gewünschte ein und löschen Sie die unerwünschte.");
        setCheikhAnta("Klicken sie auf der Namen einer Person, um ihre Informationen zu bekommen und zu bearbeiten");

      })
      .catch((err) => {
        console.log(err);
      });

  };



  const updatePerson = (person) => {
    console.log(person);
    console.log(Rolles);
    Axios.post("http://localhost:4000/api/update/personundrolle", {
      idPerson: person,
      Name: Name,
      Vorname: Vorname,
      Nutzername: Nutzername,
      Passwort: Passwort,
      Rolles: Rolles,
      Rolle: Rolle
    });
    setIdPerson("");
    setName("");
    setVorname("");
    setNutzername("");
    setPasswort("");
    setRolle("");
    getPersonen();
    setrolleList("");
    setCheikhAntaDiop("Klicken Sie auf 'Neue Person anlegen', bevor Sie eine neue Person einfügen. Wählen Sie immer 'erste Rolle'");
    setCheikhAnta("Klicken sie auf der Namen einer Person, um ihre Informationen zu bekommen und zu bearbeiten");

  };
  
  const neuePerson=()=>{
    setrolleList("");
    setIdPerson("");
    setName("");
    setVorname("");
    setNutzername("");
    setPasswort("");
    getPersonen();
    setRolles(0)
    setCheikhAntaDiop("Geben Sie die Informationen der neuen Person ein und klicken Sie immer auf 'erste Rolle', sowie auf der gewünschten Rolle");
    setCheikhAnta("Klicken Sie auf 'Schicken', damit die neue Person ganz unten in der Liste erscheint. Für weitere Rollen und Informationenänderungen klicken Sie auf der Namen der schon eingefügten Person. Viel Spaß!");

  }

  const selectUser = (idPerson) => {
    console.log(idPerson);
    setIdPerson(idPerson);
    getRollen(idPerson);
    let [item] = personenList.filter(item => item.idPerson === idPerson)
    //setRolles(1);
    setName(item.Name);
    setVorname(item.Vorname);
    setNutzername(item.Nutzername);
    setCheikhAntaDiop("Klicken Sie auf 'Weitere rolle', bevor Sie eine neue rolle einfügen. Klicken Sie immer auf die Rolle Ihrer Wahl sonst passiert nichts. Es passiert nichts wenn nichts geändert wurde.");
    setCheikhAnta("Sie können eine Rolle löschen und die Informationen ändern. Nochmal, um eine weitere Rolle einzufügen klicken Sie immer auf 'weitere Rolle', auf die gewünschnte Rolle und nur auf 'Speichern'. Die verbleibende Rolle ist nicht zu löschen, aber die Person schon. Viel Spaß!");

  }
  
  //checked={CheikhAntaDiop} onChange={() => { setRolles(0) }}
  //checked={CheikhAnta} onChange={() => { setRolles(1) }}
  console.log(personenList);

  return (
    <div className="MidlebarA">

      <div className="MidlebarA1">

        <p className="MidlebarA1a">PERSONAL</p>
        <div className="personLoeroro">
        <button className="neuePerson"  onClick={() => { neuePerson()}}>Neue Person anlegen</button>
          
        </div>
        
      </div>
      
      <div className="MidlebarA4">
        <div className="MidlebarA2">
          
          <div className="MidlebarA2b">
            <div className="list">
              <table >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Namen</th>
                    
                  </tr>
                </thead>

                <tbody>


                  {personenList.length > 0 && personenList.map((val, j) => {
                    return (<tr key={j}>

                      <td>{val.idPerson}</td>
                      <td className="personR" onClick={() => { selectUser(val.idPerson) }}><nav className="personRow">
                        
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
        <div className="MidlebarA3b">
          Rollenliste für {idPerson}
              {rolleList.length > 0 && rolleList.map((val, j) => {
                    return (<div key={j} className="personDiva">
                      
                      <div className="rolle">{findRole(val.idRolle)}</div><button className="personLoero" onClick={() => { deleteRollen(val.idPerson_Rolle) }}>Löschen</button>
                    </div>
                    );
                  })
                  }
              </div>


        <div className="MidlebarA3">
         
          <div className="MidlebarA3a">
          <div className="form">
              Name
              <input
                type="text"
                name="Name"
                placeholder="Der Name eingeben..."
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
              Vorname
              <input
                type="text"
                name="Vorname"
                placeholder="Vorname..."
                value={Vorname}
                onChange={(e) => {
                  setVorname(e.target.value);
                }}
                required
              />
              Nutzername
              <input
                type="text"
                name="Nutzername"
                placeholder="Nutzername..."
                value={Nutzername}
                onChange={(e) => {
                  setNutzername(e.target.value);
                }}
                required
              />
              Passwort
              <input
                type="password"
                name="Passwort"
                placeholder="Passwort..."
                value={Passwort}
                onChange={(e) => {
                  setPasswort(e.target.value);
                }}
                required
              />
              <input type="radio" name="gen" value="m"  onClick={() => { setRolles(0) }} /> Erste Rolle
               <input type="radio" name="gen" value="f"  onClick={() => { setRolles(1) }} /> Weitere Rolle
               
              <div className="rolles">Rolle

              <select>
                <option value="0">Bitte immer auswählen</option>
                {rollenList.length>0 && rollenList.map((val, j) => {
                  return (
                    <option key={j} onChange={() => { find(val.Bezeichnung) }} onClick={() => { find(val.Bezeichnung) }}>{val.Bezeichnung}</option>

                  )

                }

                )}

              </select>
              </div>
              <div className="Midlebar3b">
                <button className="personLoev" onClick={() => { submit()}}>Schicken</button>
                <button className="personLoev" onClick={() => { updatePerson(idPerson) }}>Speichern</button>
                <button className="personLoev" onClick={() => { deletePersonen(idPerson) }}>Person Löschen</button>
              </div>

            </div>
          </div>

        </div>
        

        <div className="intructions">
        <div className="firstInstruction">
                Anweisung
        </div>
        <div className="firstInstruction">
                {CheikhAntaDiop}
        </div>
        <div className="SecondInstruction">
                {CheikhAnta}
        </div>
          
        </div>




      </div>
    </div>
  )
}

//onClick={() => { setRolles(1) }}   {CheikhAntaDiop}   {CheikhAnta}
export default MiddlebarAd
