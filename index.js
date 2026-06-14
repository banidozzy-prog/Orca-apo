require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Banco conectado!"))
    .catch(err => console.error("Erro no banco:", err));

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!sw')) require('./comandos/sw').execute(message);
});

client.on('interactionCreate', (interaction) => require('./eventos/interactionCreate')(client, interaction));

client.login(process.env.TOKEN);

