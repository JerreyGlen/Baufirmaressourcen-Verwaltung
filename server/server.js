require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");


const app = express();
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000", "https://api.developmore.net", "https://bau.developmore.net"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: process.env.COOKIE,
    key: "userid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24
    }
}));

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Middleware to verify token in requests
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("Yo, we need a token, please give it to us next time.");
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "You failed to authenticate" });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

//Baustelle Seite
app.get('/api/get', verifyJWT, (req, res) => {
    const sqlSelect = "SELECT * FROM baustellen";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ result });
        }

    }
    );
}
)

//Maschine Seite
app.get('/api/get/Maschine', verifyJWT, (req, res) => {
    const sqlSelect = "SELECT * FROM maschinen";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ result });
        }

    }
    );
}
)

//Get idTyp 
app.get('/api/get/IdTyp', verifyJWT, (req, res) => {
    const sqlSelect = "SELECT * FROM typen";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ result });
        }

    }
    );
}
)

//Get profil
app.get('/api/get/Profil/:idPerson', verifyJWT, (req, res) => {

   const idPersons = req.params.idPerson;
    const sqlSelect = "SELECT * FROM personen WHERE idPerson= ?";
    db.query(sqlSelect, idPersons,  (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ result });
        }

    }
    );
}
)



//Get Rollen
app.get('/api/get/Rollen/:idPerson', verifyJWT, (req, res) => {

    const idPersons = req.params.idPerson;
    const sqlSelect = "SELECT idRolle FROM person_rolle WHERE idPerson = ?";
    db.query(sqlSelect, idPersons, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.json({ result});
        }

    }
    );
}
);

//Get Rollen-Bezeichnung
app.get('/api/get/Bezeichnung/:idRolle', verifyJWT, (req, res) => {

    const idRolles = req.params.idRolle;
    const sqlSelect = "SELECT Bezeichnung FROM rollen WHERE idRolle = ?";
    db.query(sqlSelect, idRolles, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.json({ result});
        }

    }
    );
}
);

app.get('/api/get/idPerson/:idBaustelle', verifyJWT, (req, res) => {

    const idBaustelles = req.params.idBaustelle;
    const sqlSelect = "SELECT idPerson FROM person_buchung WHERE idBaustelle = ?";
    db.query(sqlSelect, idBaustelles, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            const q= result[0].idPerson;
            res.json({ q});
        }

    }
    );
}
);


app.get('/api/get/idT/:idMaschine', verifyJWT, (req, res) => {

    const idMaschines = req.params.idMaschine;
    const sqlSelect = "SELECT idTyp FROM maschinen WHERE idMaschine = ?";
    db.query(sqlSelect, idMaschines, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            const q = result[0].idTyp;
            res.json({ q});
        }

    }
    );
}
);

//Get Bild
app.get('/api/get/Bild/:Name', verifyJWT, (req, res) => {

    const Names = req.params.Name;
    const sqlSelect = "SELECT Bild FROM personen WHERE Name = ?";
    db.query(sqlSelect, Names, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.json({ result});
        }

    }
    );
}
);

//Get Bauleiter's name
app.get('/api/get/Bauleiters', verifyJWT, (req, res) => {
    const sqlSelect
        = "SELECT * FROM person_rolle WHERE idRolle = '3'";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {

            let bauleiterList = [];
            for (let j = 0; j < result.length; j++) {
                db.query(
                    "SELECT * FROM personen WHERE idPerson = ?",
                    result[j].idPerson,
                    (err, resultBauleiter) => {
                        if (err) {
                            console.log(err);
                        } else {
                            bauleiterList.push(resultBauleiter[0]);
                            if (j === result.length - 1) {
                                res.json({ bauleiter: bauleiterList });
                            }
                        }
                    }

                )

            }
        }

    }
    );
}
)


// A new Baustelle will be inserted
app.post("/api/insert",
    (req, res) => {

        const idBaustelle = req.body.idBaustelle
        const Auftragsnummer = req.body.Auftragsnummer
        const Auftraggeber = req.body.Auftraggeber
        const PLZ = req.body.PLZ
        const Ort = req.body.Ort
        const Strasse = req.body.Strasse
        const Beginn = req.body.Beginn
        const Ende = req.body.Ende
        const Bemerkung = req.body.Bemerkung
        const Bezeichnung = req.body.Bezeichnung
        const Umfang = req.body.Umfang
        const Nr = req.body.Nr
        const idBauleiter = req.body.idPerson
        const sqlInsert = "INSERT INTO baustellen (Auftragsnummer, Auftraggeber, PLZ, Ort, Strasse, Beginn, Ende, Bemerkung, Bezeichnung, Umfang, Nr) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
        db.query(sqlInsert, [Auftragsnummer, Auftraggeber, PLZ, Ort, Strasse, Beginn, Ende, Bemerkung, Bezeichnung, Umfang, Nr], (err, result) => {
            if(err){
                console.log(err);
            } else {
                db.query(
                    "INSERT INTO person_buchung (idBaustelle, idPerson, von, bis) VALUES(?,?,?,?)",
                    [idBaustelle, idBauleiter, Beginn, Ende], 
                    (err) => {
                        if(err){
                            console.log(err);
                        }
                    }

                )
            }
        }
        )
    }
)

// Einer Person wird eine Baustelle zugewiesen


// A new Maschine will be inserted
app.post("/api/insert/Maschine",
    (req, res) => {

        const IdTyp = req.body.idTyp
        const Kennzeichen = req.body.Kennzeichen
        const Nummer = req.body.Nummer
        const Zustand = req.body.Zustand

        const sqlInsert = "INSERT INTO maschinen (idTyp, Kennzeichen, Nummer, Zustand) VALUES(?,?,?,?)"
        db.query(sqlInsert, [IdTyp, Kennzeichen, Nummer, Zustand], (err, result) => {
            console.log(result);
        }
        )
    }
)

// insert IdBaustelle in Person_Buchung
/*app.post("/api/insertP/:idBaustelle",
    (req, res) => {
        const idBaustelles = req.params.idBaustelle
        const sqlInsert = "INSERT INTO person_buchung  idBaustelle VALUES(?)"
        db.query(sqlInsert, idBaustelles, (err, result) => {
            console.log(result);
        }
        )
    }
)*/

//A baustelle will be deleted
app.post("/api/delete/:idBaustelle", (req, res) => {
    const idBaustelles = req.params.idBaustelle
    db.query(
        "DELETE FROM kolonne_baustelle WHERE idBaustelle=? ",
        idBaustelles,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "DELETE FROM person_buchung WHERE idBaustelle=? ",
                    idBaustelles,
                    (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            db.query(
                                "DELETE FROM baustellen WHERE idBaustelle=? ",
                                idBaustelles,
                                (err) => {
                                   
                                if (err) console.log(err);
                                    else {
                                    res.json({ success: "success" });
                                    }
                                }         
                                                               
                            )

                        }
                    }
                )

            }

        }
    )

});

//A Maschine will be deleted

app.post("/api/delete/Maschine/:idMaschine", (req, res) => {
    const idMaschines = req.params.idMaschine
    db.query(
        "DELETE FROM person_kolonne_maschine WHERE idMaschine=? ",
        idMaschines,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "DELETE FROM maschine_buchung WHERE idMaschine=? ",
                    idMaschines,
                    (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            db.query(
                                "DELETE FROM maschinen WHERE idMaschine=? ",
                                idMaschines,
                                (err) => {
                                   
                                if (err) console.log(err);
                                    else {
                                    res.json({ success: "success" });
                                    }
                                }         
                                                               
                            )

                        }
                    }
                )

            }

        }
    )

});





//The Baustelle will be updated
app.post("/api/update/baustelle", (req, res)=>{
    const idBaustelles = req.body.idBaustelle;
    const Auftragsnummers = req.body.Auftragsnummer;
    const Auftraggebers = req.body.Auftraggeber;
    const PLZs = req.body.PLZ;
    const Orts = req.body.Ort;
    const Strasses = req.body.Strasse;
    const Beginns = req.body.Beginn;
    const Endes = req.body.Ende;
    const Bemerkungs = req.body.Bemerkung;
    const Bezeichnungs = req.body.Bezeichnung;
    const Umfangs = req.body.Umfang;
    const Nrs = req.body.Nr;
    const idBauleiter = req.body.idPerson;
    const sqlUpdateBaustelle = "UPDATE baustellen SET Auftragsnummer = ?, Auftraggeber = ?, PLZ = ?, Ort = ?, Strasse = ?, Beginn = ?, Ende = ?, Bemerkung = ?, Bezeichnung = ?, Umfang = ?, Nr = ? Where idBaustelle = ?";
    const sqlUpdatePersonBuchung = "UPDATE person_buchung SET idPerson = ?, von = ?, bis = ? Where idBaustelle = ?";
    db.query(sqlUpdateBaustelle, [Auftragsnummers, Auftraggebers, PLZs, Orts, Strasses, Beginns, Endes, Bemerkungs, Bezeichnungs, Umfangs, Nrs, idBaustelles],
        (err, result)=>{
            if(err) {
                console.log(err);
            }else{
                db.query(
                    sqlUpdatePersonBuchung,
                    [idBauleiter, Beginns, Endes, idBaustelles],
                    (err)=>{
                        if (err) {
                            console.log(err);
                        }
                    }
                )
            }
            
        });
});


//The machine will be updated
app.post("/api/update/maschine", (req, res) => {
    const idMaschines = req.body.idMaschine;
    const idTyps = req.body.idTyp;
    const Kennzeichens = req.body.Kennzeichen;
    const Nummers = req.body.Nummer;
    const Zustands = req.body.Zustand;    
    const sqlUpdate = "UPDATE maschinen SET idTyp = ?, Kennzeichen = ?, Nummer = ?, Zustand = ? Where idMaschine = ?";
    db.query(sqlUpdate, [idTyps, Kennzeichens, Nummers, Zustands, idMaschines], (err, result) => {
        if (err) console.log(err);
    }
    );

}

);

//Person will be updated
app.post("/api/update/person", (req, res) => {
    const idPersons = req.body.idPerson;
    const Names = req.body.Name;
    const Vornames = req.body.Vorname;
    const Nutzernames = req.body.Nutzername;
    const Passworts = req.body.Passwort;    
    const sqlUpdate = "UPDATE personen SET Name = ?, Vorname = ?, Nutzername = ?, Passwort = ? Where idPerson = ?";
    const sqlUpdate1 = "UPDATE personen SET Name = ?, Vorname = ?, Nutzername = ? Where idPerson = ?";

    bcrypt.hash(Passworts, saltRounds, (err, hash)=>{
        if (err) console.log(err);

        if(Passworts.length>0){

            db.query(sqlUpdate, [Names, Vornames, Nutzernames, hash, idPersons], (err, result) => {
                if (err) console.log(err);
            }
            );
        }else{

            db.query(sqlUpdate1, [Names, Vornames, Nutzernames, idPersons], (err, result) => {
                if (err) console.log(err);
            }
            );
        }

        
    })
    

}

);




// Bauarbeiter get schedule
app.get("/schedule", verifyJWT, (req, res) => {
    const personId = req.session.user;

    db.query(
        "SELECT * FROM person_buchung WHERE idPerson = ?",
        personId,
        (err, resultBuchung) => {
            if (err) {
                console.log(err);
            } else {
                let baustellen = [];
                for (let j = 0; j < resultBuchung.length; j++) {
                    db.query(
                        "SELECT * FROM baustellen WHERE idBaustelle = ?",
                        resultBuchung[j].idBaustelle,
                        (err, resultBaustelle) => {
                            if (err) {
                                console.log(err);
                            } else {
                                baustellen.push(resultBaustelle[0]);
                                if (j === resultBuchung.length - 1) {
                                    res.json({ schedule: resultBuchung, baustellen: baustellen });
                                }
                            }
                        }

                    )

                }
            }

        }
    )
});

// for testing JWT
app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send("Yo, you are authenticated. Congrats!")
});

// register route
app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const rolle = req.body.rolle;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }

        db.query(
            "SELECT * FROM personen WHERE Nutzername = ?",
            username,
            (err, result) => {
                if (result.length > 0) {
                    res.send({ message: "Nutzername existiert schon. Bitte einen anderen Nutzernamen verwenden" });
                } else {
                    db.query(
                        "INSERT INTO personen (Nutzername, Passwort) VALUES (?, ?)",
                        [username, hash],
                        (err, resultPerson) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );

                    db.query(
                        "SELECT * FROM rollen WHERE Bezeichnung = ?",
                        rolle,
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                const rolleId = result[0].idRolle;
                                db.query(
                                    "SELECT * FROM personen WHERE Nutzername = ?",
                                    username,
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            const personId = result[0].idPerson;
                                            db.query(
                                                "INSERT INTO person_rolle (idPerson, idRolle) VALUES (?, ?)",
                                                [personId, rolleId],
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );


                }
            }
        )


    });
});



/* update route
app.post("/api/update/personundrolle", (req, res) => {
    const idPersons = req.body.idPerson;
    const Names = req.body.Name;
    const Vornames = req.body.Vorname;
    const Nutzernames = req.body.Nutzername;
    const Passworts = req.body.Passwort;
    const rolle = req.body.rolle;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }

        db.query(
            "SELECT * FROM personen WHERE Nutzername = ?",
            username,
            (err, result) => {
                if (result.length > 0) {
                    res.send({ message: "Nutzername existiert schon. Bitte einen anderen Nutzernamen verwenden" });
                } else {
                    db.query(
                        "UPDATE personen SET Name = ?, Vorname = ?, Nutzername = ?, Passwort = ? Where idPerson = ?",
                        [Names, Vornames, Nutzernames, Passworts, idPersons],
                        (err, resultPerson) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );

                    db.query(
                        "SELECT * FROM rollen WHERE Bezeichnung = ?",
                        rolle,
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                const rolleId = result[0].idRolle;
                                db.query(
                                    "SELECT * FROM personen WHERE Nutzername = ?",
                                    username,
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            const personId = result[0].idPerson;
                                            db.query(
                                                "UPDATE person_rolle SET idRolle = ?, Where idPerson = ?",
                                                [personId, rolleId],
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );


                }
            }
        )


    });
});*/

// check available roles of a certain person
app.post("/checkbeforelogin", (req, res) => {
    const username = req.body.username
    db.query(
        "SELECT * FROM personen WHERE Nutzername = ?",
        username,
        (err, resultPerson) => {
            if (err) {
                console.log(err);
            } else if (resultPerson.length > 0) {
                const [user] = resultPerson;
                db.query(
                    "SELECT * FROM person_rolle WHERE idPerson = ?",
                    user.idPerson,
                    (error, resultRollen) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json({ resultRollen, auth: false })
                        }
                    }
                )
            } else {
                res.json({ auth: false, message: "Nutzer existiert nicht!" });
            }
        }
    )
})

// login route
app.get("/login", verifyJWT, (req, res) => {
    if (req.session.user) {
        const personId = req.session.user;
        const role = req.headers["x-access-role"]
        db.query(
            "SELECT * FROM personen WHERE idPerson = ?",
            personId,
            (err, resultPerson) => {
                if (err) {
                    console.log(err);
                } else {
                    const [user] = resultPerson;
                    db.query(
                        "SELECT * FROM person_rolle WHERE idPerson_Rolle = ?",
                        role,
                        (error, resultRolle) => {
                            if (error) {
                                console.log(error);
                            } else {
                                res.json({
                                    auth: true,
                                    user: {
                                        name: user.Name,
                                        id: user.idPerson,
                                        vorname: user.Vorname,
                                        nutzername: user.Nutzername,
                                        rolle: resultRolle[0].idRolle
                                    }
                                });
                            }
                        }
                    )
                }
            }
        )

    } else {
        res.send({ auth: false })
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role

    db.query(
        "SELECT * FROM personen WHERE Nutzername = ?",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                const [user] = result;
                bcrypt.compare(password, user.Passwort, (error, isSame) => {
                    if (isSame) {
                        const id = user.id;
                        const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
                            expiresIn: "7d",
                        })
                        req.session.user = user.idPerson;


                        db.query(
                            "SELECT * FROM person_rolle WHERE idPerson_Rolle = ?",
                            role,
                            (err, resultRolle) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.json({
                                        auth: true,
                                        token: token,
                                        idPerson_Rolle: role,
                                        user: {
                                            name: user.Name,
                                            id: user.idPerson,
                                            vorname: user.Vorname,
                                            nutzername: user.Nutzername,
                                            rolle: resultRolle[0].idRolle
                                        }
                                    });
                                }
                            }
                        )
                    } else {
                        res.json({ auth: false, message: "Falsche Kombination aus Nutzername und Passwort!" });
                    }
                })
            } else {
                res.json({ auth: false, message: "Nutzer existiert nicht!" });
            }
        }
    );
});

// logout route
app.post("/logout", verifyJWT, (req, res) => {
    req.session.destroy();
    res.clearCookie(process.env.COOKIE);
    res.clearCookie("role");
});

// Reset password
app.post("/reset", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            db.query(
                "UPDATE personen SET Passwort = ? WHERE Nutzername = ?",
                [hash, username],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("RESET");
                    }
                }
            )
        }
    })
});

//#region einplanung-page

// get maschine
app.get("/getmaschinen", verifyJWT, (req, res) => {
    db.query(
        "SELECT * FROM maschinen", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ maschinen: result })
            }
        }
    )
})

// remove maschine from a contruction work
app.post("/removemaschine", verifyJWT, (req, res) => {
    const idMaschine_Buchung = req.body.idMaschine_Buchung

    db.query(
        "DELETE FROM maschine_buchung WHERE idMaschine_Buchung = ?",
        idMaschine_Buchung,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("success");
            }
        }
    )
})

// remove worker from a construction work
app.post("/removebooking", verifyJWT, (req, res) => {
    const idPerson_Buchung = req.body.idPerson_Buchung

    db.query(
        "DELETE FROM person_buchung WHERE idPerson_Buchung = ?",
        idPerson_Buchung,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("success");
            }
        }
    )
})

// Add maschine to contruction work
app.post("/addmaschinetoconstruction", verifyJWT, (req, res) => {
    const idMaschine = req.body.idMaschine,
        idBaustelle = req.body.idBaustelle,
        von = req.body.von,
        bis = req.body.bis
    
    db.query(
        "INSERT INTO maschine_buchung (idMaschine, idBaustelle, von, bis) VALUES (?,?,?,?)",
        [idMaschine, idBaustelle, von, bis],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("success");
            }
        }
    )
})

// Add worker / bauarbeiter to construction work
app.post("/addworkertoconstuction", verifyJWT, (req, res) => {
    const idPerson = req.body.idPerson,
        idBaustelle = req.body.idBaustelle,
        von = req.body.von,
        bis = req.body.bis;

    db.query(
        "INSERT INTO person_buchung (idPerson, idBaustelle, von, bis) VALUES (?,?,?,?)",
        [idPerson, idBaustelle, von, bis],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("success")
            }
        }
    );
});

// Update maschine booking for a construction work (I know it should be machine but just let it be)
app.post("/updatemaschinebooking", verifyJWT, (req, res) => {
    const start = req.body.start,
        end = req.body.end,
        idMaschine_Buchung = req.body.idMaschine_Buchung

    db.query(
        "UPDATE maschine_buchung SET von = ?, bis = ? WHERE idMaschine_Buchung = ?",
        [start, end, idMaschine_Buchung],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("success");
            }
        }
    )
})

// Update person booking for a contruction work
app.post("/updatepersonbooking", verifyJWT, (req, res) => {
    const start = req.body.start,
        end = req.body.end,
        idPerson_Buchung = req.body.idPerson_Buchung

    db.query(
        "UPDATE person_buchung SET von = ?, bis = ? WHERE idPerson_Buchung = ?",
        [start, end, idPerson_Buchung],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("update success");
            }
        }
    )
});

// Get person_buchung and maschine_buchung
app.get("/bookings/:idBaustelle", verifyJWT, (req, res) => {
    const idBaustelle = req.params.idBaustelle;
    db.query(
        "SELECT * FROM person_buchung WHERE idBaustelle = ?",
        idBaustelle,
        (err, resultPersonBuchung) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "SELECT * FROM maschine_buchung WHERE idBaustelle = ?",
                    idBaustelle,
                    (error, resultMaschineBuchung) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json({ personBookings: resultPersonBuchung, maschineBookings: resultMaschineBuchung });
                        }
                    }
                )
            }
        }
    );
});

// Get persons and roles
app.get("/personsandroles", verifyJWT, (req, res) => {
    db.query(
        "SELECT * FROM personen", (err, resultPersonen) => {
            if (err) {
                console.log(err);
            } else {
                let personen = [];
                resultPersonen.forEach(person => {
                    personen.push({
                        name: person.Name,
                        vorname: person.Vorname,
                        idPerson: person.idPerson
                    });
                });
                db.query(
                    "SELECT * FROM person_rolle", (error, resultRollen) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json({ personen: personen, rollen: resultRollen })
                        }
                    }
                )
            }
        }
    )
});

// Get Kranheiten and Urlaube
app.get("/krankheitenundurlaube/:idPerson", verifyJWT, (req, res) => {
    const idPerson = req.params.idPerson
    db.query(
        "SELECT * FROM urlaube WHERE idPerson = ?",
        idPerson,
        (err, resultUrlaube) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "SELECT * FROM krankheiten WHERE idPerson = ?",
                    idPerson,
                    (error, resultKrankheiten) => {
                        if (error) {
                            console.log(err);
                        } else {
                            res.json({ urlaube: resultUrlaube, krankheiten: resultKrankheiten });
                        }
                    }
                )
            }
        }
    )
})
//#endregion

app.post("/api/delete/krankheiten/:idKrankheit", (req, res) => {
    const IdKrankheit = req.params.idKrankheit
    const sqlDelete = "DELETE FROM krankheiten WHERE idKrankheit=? ";
    db.query(sqlDelete, IdKrankheit, (err, result) => {
        if (err) console.log(err);
    }
    );

}

);

app.post("/api/delete/urlaube/:idUrlaub", (req, res) => {
    const IdUrlaub = req.params.idUrlaub
    const sqlDelete = "DELETE FROM urlaube WHERE idUrlaub=? ";
    db.query(sqlDelete, IdUrlaub, (err, result) => {
        if (err) console.log(err);
    }
    );

}

);
app.post("/api/insert/urlaube",
    (req, res) => {

        const idPerson = req.body.idPerson
        const Bezeichnung = req.body.Bezeichnung
        const Von = req.body.Von
        const Bis = req.body.Bis

        const sqlInsert = "INSERT INTO urlaube (Bezeichnung, idPerson, Von, Bis) VALUES (?, ?, ?, ?)";
        db.query(sqlInsert, [Bezeichnung, idPerson, Von, Bis], (err, result) => {
            console.log(result);
        }
        )
    }
)
app.post("/api/insert/krankheit",
    (req, res) => {

        const idPerson = req.body.idPerson
        const Bezeichnung = req.body.Bezeichnung
        const Von = req.body.Von
        const Bis = req.body.Bis

        const sqlInsert = "INSERT INTO krankheiten (Bezeichnung, idPerson, Von, Bis) VALUES (?, ?, ?, ?)";
        db.query(sqlInsert, [Bezeichnung, idPerson, Von, Bis], (err, result) => {
            console.log(result);
        }
        )
    }
)
//update krankheit
app.post("/api/update/krankheit",
    (req, res) => {
        const idKrankheits=req.body.idKrankheit
        const Bezeichnungs = req.body.Bezeichnung
        const Vons = req.body.Von
        const Biss = req.body.Bis

        const sqlInsert = "UPDATE krankheiten SET Bezeichnung = ?, Von = ?, Bis = ? WHERE idKrankheit= ?";
        db.query(sqlInsert, [Bezeichnungs, Vons, Biss, idKrankheits], (err, result) => {
            console.log(result);
        }
        )
    }
)
//update urlaub
app.post("/api/update/urlaube",
    (req, res) => {
        const idUrlaubs=req.body.idUrlaub
        const Bezeichnungs = req.body.Bezeichnung
        const Vons = req.body.Von
        const Biss = req.body.Bis

        const sqlInsert = "UPDATE urlaube SET Bezeichnung = ?, Von = ?, Bis = ? WHERE idUrlaub= ?";
        db.query(sqlInsert, [Bezeichnungs, Vons, Biss, idUrlaubs], (err, result) => {
            console.log(result);
        }
        )
    }
)

/*/insert fall
app.get("/api/get/rollenperson/:idPerson", verifyJWT, (req, res) => {
    const IdPerson = req.params.idPerson;
    db.query(
        "SELECT * FROM person_rolle WHERE idPerson = ?",
        IdPerson,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ result });
            }
        }
    );
});*/


//Krankheiten Seite
app.get("/krankheit/:idPerson", verifyJWT, (req, res) => {
    const IdPerson = req.params.idPerson;
    db.query(
        "SELECT * FROM krankheiten WHERE idPerson = ?",
        IdPerson,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ result });
            }
        }
    );
});

//urlaube Seite
app.get("/urlaube/:idPerson", verifyJWT, (req, res) => {
    const IdPerson = req.params.idPerson;
    db.query(
        "SELECT * FROM urlaube WHERE idPerson = ?",
        IdPerson,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ result });
            }
        }
    );
});
/*/urlaube Seite
app.get('/api/get/urlaube', verifyJWT, (req, res) => {
    const sqlSelect = "SELECT * FROM urlaube";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ result });
        }

    }
    );
}
)*/
app.get('/api/get/rollen', (req, res) => {
    const sqlSelect = "SELECT * FROM rollen";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ result });
        }

    }
    );
}
)
//get rolle
/*const username = req.body.username
    db.query(
        "SELECT * FROM personen WHERE Nutzername = ?",
        username,
        (err, resultPerson) => {
            if (err) {
                console.log(err);
            } else if (resultPerson.length > 0) {
                const [user] = resultPerson;
                db.query(
                    "SELECT * FROM person_rolle WHERE idPerson = ?",
                    user.idPerson,
                    (error, resultRollen) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json({ resultRollen, auth: false })
                        }
                    }
                )
            } else {
                res.json({ auth: false, message: "Nutzer existiert nicht!" });
            }
        }
    )*/

app.get("/idrolle/:idPerson", (req, res) => {
    const idPerson = req.params.idPerson;
    db.query(
        "SELECT * FROM person_rolle WHERE idPerson = ?",
        idPerson,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ result });
                console.log(result);
            }
        }
    );
});

//delete rollen

app.post("/delete/rollen/:idPerson_Rolle", (req, res) => {
    const idPersonRollle = req.params.idPerson_Rolle;
    db.query(
    "SELECT idPerson FROM person_rolle WHERE idPerson_Rolle= ?",
    idPersonRollle,
    (err, result) => {
        if (err) {
             console.log(err);
        } else{
            db.query(
                "SELECT * FROM person_rolle WHERE idPerson= ?",
                result,
                (err, result) => {
                    if (err) {
                         console.log(err);
                    } else if(result.length==1){
                        res.json({ message: "Die Person muss gelöscht werden, wenn Sie keine Rolle hat." });
                        res.json({ result });
                        console.log(result);
                    }
                        else{
                        db.query(
                        "SET FOREIGN_KEY_CHECKS=0",
                        (err) => {
                             if (err) {
                                console.log(err);
                            } else {
                                db.query(
                                    "DELETE FROM person_rolle WHERE idPerson_Rolle = ?",
                                    idPersonRollle,
                                    (err, result) => {
                                        if (err) {
                                             console.log(err);
                                        } else {
                                            res.json({ result });
                                            console.log(result);
                                        }
                                    }
                                )}
                        }
                    )}
                }

            
             
        );}

        }
         
    );
});


///Personen anzeigen
app.get('/api/get/personen', (req, res) => {
    const sqlSelect = "SELECT * FROM personen";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ result });
        }

    });
});
//Personen einfügen
app.post('/api/insert/personen', (req, res) => {
    const Name = req.body.Name;
    const Vorname = req.body.Vorname;
    const Nutzername = req.body.Nutzername;
    const Passwort = req.body.Passwort;
    const rolle = req.body.rolle;
    const Rolles=req.body.Rolles;
    const iRolle=req.body.iRolle;
    /*const sqlInsert = "INSERT INTO personen (Name, Vorname, Nutzername) VALUES (?,?,?);";
    db.query(sqlInsert, [Name, Vorname, Nutzername], (err, result) => {
        console.log(result);
    });*/
    bcrypt.hash(Passwort, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }
        if(Rolles==0){
            if(Passwort.length>0){
        db.query(
            "SELECT * FROM personen WHERE Nutzername = ?",
            Nutzername,
            (err, result) => {
                if (result.length > 0) {
                    res.send({ message: "Nutzername existiert schon. Bitte einen anderen Nutzernamen verwenden" });
                } else {
                    db.query(
                        "INSERT INTO personen (Name, Vorname, Nutzername, Passwort) VALUES (?, ?, ?, ?)",
                        [Name, Vorname, Nutzername, hash],
                        (err, resultPerson) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );

                    /*db.query( 
                        "SELECT * FROM rollen WHERE Bezeichnung = ?",
                        rolle,
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {*/
                                //const rolleId = result[0].idRolle;
                                
                                db.query(
                                    "SELECT * FROM personen WHERE Nutzername = ?",
                                    Nutzername,
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            const personId = result[0].idPerson;
                                            db.query(
                                                "INSERT INTO person_rolle (idPerson, idRolle) VALUES (?, ?)",
                                                [personId, iRolle],
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        res.json({ success: "success" })
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                                    /*db.query(
                                        "INSERT INTO person_rolle (idPerson, idRolle) VALUES (?, ?)",
                                        [personId, iRolle],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                res.json({ success: "success" })
                                            }
                                        }
                                    );
                                //}*/
                            /*}
                        }
                    );*/


                }
            }
        )
        } else{
        res.send({ message: "Geben Sie Bitte alle Dateien" });
        
        }
        } else
        {
            res.send({ message: "Neue Person = erste Rolle" });
        }
    });


});
//Personen löschen
// DELETE FROM person_beruf_abschluss WHERE idPerson = ? idPerson,
app.post("/api/delete/personen/:idPerson", (req, res) => {
    const idPerson = req.params.idPerson;
    db.query(
        "SET FOREIGN_KEY_CHECKS=0",
        (err) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "DELETE FROM person_rolle WHERE idPerson = ?",
                    idPerson,
                    (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            db.query(
                                "DELETE FROM person_schein WHERE idPerson = ?",
                                idPerson,
                                (err) => {
                                    if (err) console.log(err);
                                    else {
                                        db.query(
                                            "DELETE FROM person_buchung WHERE idPerson = ?",
                                            idPerson,
                                            (err) => {
                                                if (err) console.log(err);
                                                else {
                                                    db.query("DELETE FROM person_fahrzeug WHERE idPerson = ?",
                                                    idPerson,
                                                    (err) => {
                                                        if (err) console.log(err);
                                                        else {
                                                            db.query("DELETE FROM person_beruf_abschluss WHERE idPerson = ?",
                                                            idPerson,
                                                            (err) => {
                                                                if (err) console.log(err);
                                                                else{
                                                                    db.query("DELETE FROM person_kolonne_maschine WHERE idPerson = ?",
                                                                    idPerson,
                                                                    (err) => {
                                                                        if (err) console.log(err);
                                                                        else{   
                                                                            db.query("DELETE FROM urlaube WHERE idPerson = ?",
                                                                            idPerson,
                                                                            (err) => {
                                                                            if (err) console.log(err);
                                                                            else{   
                                                                                db.query("DELETE FROM krankheiten WHERE idPerson = ?",
                                                                                idPerson,
                                                                                (err) => {
                                                                                    if (err) console.log(err);
                                                                                    else{
                                                                                         db.query("DELETE FROM personen WHERE idPerson = ?",
                                                                                        idPerson,
                                                                                        (err) => {
                                                                                        if (err) console.log(err);
                                                                                        else {
                                                                                        res.json({ success: "success" });
                                                                                        }
                                                                                        }
                                                                                        )}
                                                                                    })}
                                                                                })}
                                                                            })}
                                                            })}
                                                                    });

                                                }
                                            }
                                        )

                                    }
                                }
                            )

                        }
                    }
                )

            }

        }
    )

});


/*personen update
app.put('/api/update/personen', (req, res) => {
    const name = req.body.Name;
    const Vorname = req.body.Vorname;
    const Nutzername = req.body.Nutzername;
    const Passwort = req.body.Passwort;
    const sqlUpdate =
        "UPDATE personen  SET Name= ? WHERE Vorname= ?";
    db.query(sqlUpdate, [name, Vorname, Nutzername, Passwort], (err, result) => {
        if (err) console.log(err);
    });
});*/
app.post("/api/update/personundrolle", (req, res) => {
    
    const Names = req.body.Name;
    const Rolles= req.body.Rolles;
    const Vornames = req.body.Vorname;
    const Nutzernames = req.body.Nutzername;
    const Passworts = req.body.Passwort;
    const idPersons = req.body.idPerson;
    const rolles = req.body.Rolle;
    /*const sqlInsert = "INSERT INTO personen (Name, Vorname, Nutzername) VALUES (?,?,?);";
    db.query(sqlInsert, [Name, Vorname, Nutzername], (err, result) => {
        console.log(result);
    });*/
    bcrypt.hash(Passworts, saltRounds, (err, hash) => {
        
        if (Passworts.length>0) {
                if(Rolles==1){
                    db.query(
                        "UPDATE personen SET Name=?, Vorname=?, Nutzername=?, Passwort=? Where idPerson = ?",
                        [Names, Vornames, Nutzernames, hash, idPersons],
                        (err, resultPerson) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                    if (rolles){
                    db.query( 
                        "SELECT * FROM rollen WHERE Bezeichnung = ?",
                        rolles,
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                const rolleId = result[0].idRolle;
                                db.query(
                                "INSERT INTO person_rolle (idPerson, idRolle) VALUES (?, ?)",
                                [idPersons, rolleId],
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.json({ success: "success" })
                                        }
                                    }
                                );
                                        
                            }
                        }
                    )}else{}
                }
                else{
                    db.query(
                        "UPDATE personen SET Name=?, Vorname=?, Nutzername=?, Passwort=? Where idPerson = ?",
                        [Names, Vornames, Nutzernames, hash, idPersons],
                        (err, resultPerson) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                    
                }
                    
        }else {
            if(Rolles===1){
                db.query(
                    "UPDATE personen SET Name=?, Vorname=?, Nutzername=? Where idPerson = ?",
                    [Names, Vornames, Nutzernames, idPersons],
                    (err, resultPerson) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
                if (rolles){
                db.query( 
                    "SELECT * FROM rollen WHERE Bezeichnung = ?",
                    rolles,
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const rolleId = result[0].idRolle;
                            db.query(
                            "INSERT INTO person_rolle (idPerson, idRolle) VALUES (?, ?)",
                            [idPersons, rolleId],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.json({ success: "success" })
                                    }
                                }
                            );
                                    
                        }
                    }
                )} else{}
            }else{ 
                db.query(
                    "UPDATE personen SET Name=?, Vorname=?, Nutzername=? Where idPerson = ?",
                    [Names, Vornames, Nutzernames, idPersons],
                    (err, resultPerson) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
                
                
            }
        }
    


    });


});

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is running on port 4000");
});
