require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// COLOQUE O SEU LINK DO MONGODB AQUI ENTRE AS ASPAS:
const MONGO_URI = "mongodb+srv://SEU_USUARIO:SUA_SENHA@cluster.mongodb.net/SEU_BANCO"; 

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Banco de dados conectado com sucesso!"))
    .catch(err => {
        console.error("❌ ERRO AO CONECTAR NO BANCO:");
        console.error(err);
    });

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

// O TOKEN AINDA PODE FICAR NO PAINEL DO SHARD CLOUD
client.login(process.env.TOKEN);

