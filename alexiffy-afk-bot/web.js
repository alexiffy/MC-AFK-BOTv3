const express = require("express");
const mineflayer = require("mineflayer");
const settings = require("./settings.json");

const app = express();
const port = process.env.PORT || 3000;

// Servidor web para mantener vivo el bot
app.get("/", (req, res) => {
  res.send("MC AFK Bot corriendo en Render 🚀");
});

app.listen(port, () => {
  console.log(`Servidor web escuchando en http://localhost:${port}`);
});

// Crear el bot de Minecraft
const bot = mineflayer.createBot({
  host: settings.server.ip,
  port: settings.server.port,
  username: settings["bot-account"].username,
  version: settings.server.version,
});

bot.on("login", () => {
  console.log(`Bot logueado como ${bot.username}`);
});

bot.on("end", () => {
  console.log("Bot desconectado, intentando reconectar...");
  setTimeout(() => {
    process.exit(1); // Render lo reinicia
  }, 5000);
});
