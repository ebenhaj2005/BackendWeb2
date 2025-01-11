const express = require("express");
const { default: mongoose } = require("mongoose");
const Gebruiker = require("./models/Gebruiker");
const app = express();
app.use(express.json());
const path = require("path");
app.use(express.static("public/index.html"));
const PORT = process.env.PORT || 4000;
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

app.post("/gebruiker", async (req, res) => {
  const { naam, email, wachtwoord } = req.body;
  const gebruiker = new Gebruiker({ naam, email, wachtwoord });
  await gebruiker.save();
  res.json(gebruiker);
});

app.get("/gebruiker", async (req, res) => {
  try {
    const gebruiker = await Gebruiker.find();
    res.json(gebruiker);
  } catch (error) {
    console.log("fout bij ophealen gebruiker : ", error);
  }
});

app.get("/gebruiker/:id", async (req, res) => {
  try {
    const gebruiker = await Gebruiker.findById(req.params.id);
    res.json(gebruiker);
    if (!gebruiker) {
      return res.status(404).json({ error: "Gebruiker niet gevonden" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("fout bij ophealen gebruiker : ", error);
  }
});

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
    res.status(200).json(user);
  } catch (error) {
    console.log("fout bij updaten gebruiker : ", error);
  }
});

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

app.get("/gebruiker/max", async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const gebruiker = await Gebruiker.find()
      .skip(parseInt(offset))
      .limit(parseInt(limit));
    res.json(gebruiker);
  } catch (error) {
    console.log("fout bij ophalen gebruikers : ", error);
  }
});

app.get("/gebruiker/search", async (req, res) => {
  const { name } = req.query;
  try {
    const gebruiker = await Gebruiker.find({ name: new RegExp(name, "i") });
    res.json(gebruiker);
  } catch (error) {
    console.log("fout bij ophalen gebruiker : ", error);
  }
});

const nieuwspost = require("./models/Nieuws");

app.get("/nieuws", async (req, res) => {
  try {
    const nieuws = await nieuwspost.find();
    res.json(nieuws);
  } catch (error) {
    console.log("fout bij ophalen nieuws : ", error);
  }
});

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
