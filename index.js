const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

// A string de conexão fixa (substitua pelo seu link real)
const mongoURI = "COLE_AQUI_O_SEU_LINK_DO_MONGODB_COMPLETO";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Banco de dados conectado!"))
    .catch(err => console.error("❌ Erro na conexão ao banco:", err));

client.on('ready', () => {
    console.log(`🚀 ORCA APOSTAS online como ${client.user.tag}`);
});

client.on('interactionCreate', (interaction) => {
    require('./eventos/interactionCreate')(client, interaction);
});

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!sw')) {
        require('./comandos/sw').execute(message);
    }
});

// O TOKEN pode continuar no painel, mas se der erro aqui também, 
// troque process.env.TOKEN pelo seu token real entre aspas.
client.login(process.env.TOKEN);
