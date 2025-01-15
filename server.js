const express = require("express");
const { default: mongoose } = require("mongoose");
const Gebruiker = require("./models/Gebruiker");
const app = express();
app.use(express.json());
const path = require("path");
app.use(express.static("public/index.html"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const mongouri =
  "mongodb+srv://elias:elias123456@backendweb.jvxel.mongodb.net/?retryWrites=true&w=majority&appName=Backendweb";
  

mongoose
  .connect(mongouri)
  .then(() => {
    console.log("geconnecteerd met database");
  })
  .catch((err) => {
    console.log("fout opgetreden : ", err);
  });
// Om in postman te testen gebruik je :   POST http://localhost:3000/gebruiker en in de body zet je : {"naam":"Elias","email": example@gmail.com","wachtwoord: wachtwoord"}
app.post("/gebruiker", async (req, res) => {
  const { naam, email, wachtwoord } = req.body;
  const gebruiker = new Gebruiker({ naam, email, wachtwoord });
  await gebruiker.save();
  res.json(gebruiker);
});
// Om in postman te testen gebruik je :   GET http://localhost:3000/gebruiker
app.get("/gebruiker", async (req, res) => {
  try {
    const gebruiker = await Gebruiker.find();
    res.json(gebruiker);
  } catch (error) {
    console.log("fout bij ophealen gebruiker : ", error);
  }
});
// Om in postman te testen gebruik je :   GET http://localhost:3000/gebruiker/10 dan krijg je de eerste 10 gebruikers
app.get("/gebruiker/10", async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const gebruiker = await Gebruiker.find()
      .skip(parseInt(offset, 10))
      .limit(parseInt(limit, 10));
    res.status(200).json(gebruiker);
  } catch (error) {
    console.log("fout bij ophalen gebruikers : ", error);
    res.status(500).json({ error: "Fout bij ophalen gebruikers" });
  }
});
// Om in postman te testen gebruik je :   GET http://localhost:3000/gebruiker/search?naam=elias dan krijg je alle gebruikers met de naam elias
app.get("/gebruiker/search", async (req, res) => {
  const { naam } = req.query;

  if (!naam) {
    return res.status(400).json({ error: "Naam parameter is vereist" });
  }

  try {
    // Use 'naam' field explicitly in the query
    const gebruiker = await Gebruiker.find({ naam: new RegExp(naam, "i") });

    if (gebruiker.length === 0) {
      return res.status(404).json({ success: true, data: [], message: "Geen gebruikers gevonden" });
    }

    res.status(200).json({ success: true, data: gebruiker });
  } catch (error) {
    console.error("Fout bij ophalen gebruiker: ", error);
    res.status(500).json({ error: "Fout bij ophalen gebruiker" });
  }
});

// Om in postman te testen gebruik je :   GET http://localhost:3000/gebruiker/{id} dan krijg je de gebruiker met het id
app.get("/gebruiker/:id", async (req, res) => {
  try {
    const gebruiker = await Gebruiker.findById(req.params.id);
    res.json(gebruiker);
    if (!gebruiker) {
      return res.status(404).json({ error: "Gebruiker niet gevonden" });
    }
    res.status(200).json(gebruiker);
  } catch (error) {
    console.log("fout bij ophealen gebruiker : ", error);
  }
});
// Om in postman te testen gebruik je : PUT http://localhost:3000/gebruiker/{id} en in de body zet je : {"naam":"updatenaam","email":"updateemail","wachtwoord":"updatewachtwoord"}

app.put("/gebruiker/:id", async (req, res) => {
  try {
    const gebruiker = await Gebruiker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!gebruiker) {
      return res.status(404).json({ error: "Gebruiker niet gevonden" });
    }
    res.status(200).json(gebruiker);
  } catch (error) {
    console.log("fout bij updaten gebruiker : ", error);
  }
});
// Om in postman te testen gebruik je : DELETE http://localhost:3000/gebruiker/{id} dan verwijder je de gebruiker met het id
app.delete("/gebruiker/:id", async (req, res) => {
  try {
    const gebruiker = await Gebruiker.findByIdAndDelete(req.params.id);
    if (!gebruiker) {
      return res.status(404).json({ error: "Gebruiker niet gevonden" });
    }
    res.json({ message: "Gebruiker verwijderd" });
  } catch (error) {
    console.log("fout bij verwijderen gebruiker : ", error);
  }
});



const nieuwspost = require("./models/Nieuws");
 // Om in postman te testen gebruik je :   GET http://localhost:3000/nieuws
app.get("/nieuws", async (req, res) => {
  try {
    const nieuws = await nieuwspost.find();
    res.json(nieuws);
  } catch (error) {
    console.log("fout bij ophalen nieuws : ", error);
  }
});
//  Om in postman te testen gebruik je :   POST http://localhost:3000/nieuws en in de body zet je : {"titel":"titel", "beschrijving":"beschrijving","datum":"1970-05-05",  "auteur":"auteur"}
app.post("/nieuws", async (req, res) => {
  const { titel, beschrijving, datum, auteur } = req.body;
  try {
    const nieuws = new nieuwspost({ titel, beschrijving, datum, auteur });
    await nieuws.save();
    res.json(nieuws);
  } catch (error) {
    console.log("fout bij opslaan nieuws : ", error);
  }
});
// Om in postman te testen gebruik je :   GET http://localhost:3000/nieuws/{id} dan krijg je de nieuws met het id
app.get("/nieuws/:id", async (req, res) => {
  try {
    const nieuws = await nieuwspost.findById(req.params.id);
    res.json(nieuws);
    if (!nieuws) {
      return res.status(404).json({ error: "Nieuws niet gevonden" });
    }
    res.status(200).json(nieuws);
  } catch (error) {
    console.log("fout bij ophalen nieuws : ", error);
  }
});
// Om in postman te testen gebruik je :   PUT http://localhost:3000/nieuws/{id} en in de body zet je : {"titel":"updatetitel", "beschrijving":"updatebeschrijving","datum":"1970-05-05",  "auteur":"updateauteur"}
app.put("/nieuws/:id", async (req, res) => {
  try {
    const nieuws = await nieuwspost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!nieuws) {
      return res.status(404).json({ error: "Nieuws niet gevonden" });
    }
    res.status(200).json(nieuws);
  } catch (error) {
    console.log("fout bij updaten nieuws : ", error);
  }
});
// Om in postman te testen gebruik je : DELETE http://localhost:3000/nieuws/{id} dan verwijder je de nieuws met het id
app.delete("/nieuws/:id", async (req, res) => {
  try {
    const verwijderpost = await nieuwspost.findByIdAndDelete(req.params.id);
    if (!verwijderpost) {
      return res.status(404).json({ error: "Nieuws niet gevonden" });
    }
    res.json({ message: "Nieuws verwijderd" });
  } catch (error) {
    console.log("fout bij verwijderen nieuws : ", error);
  }
});
