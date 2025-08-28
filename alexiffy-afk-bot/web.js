const express = require("express");
const mineflayer = require("mineflayer");
const settings = require("./settings.json");

const app = express();
const port = process.env.PORT || 3000;

// Servidor web para mantener vivo el bot
app.get("/", (req, res) => {
  res.send("MC AFK Bot corriendo en Render 🚀");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
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

bot.on("error", (err) => {
  console.error(`Error del bot: ${err}`);
});

bot.on("respawn", () => {
  console.log("Bot reconectado.");
});

// Manejo de errores adicionales
process.on("uncaughtException", (err) => {
  console.error("Error no capturado:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Rechazo no manejado:", promise, "razón:", reason);
  process.exit(1);
});
