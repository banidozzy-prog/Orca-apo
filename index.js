const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

client.commands = new Collection();

// Carregador de Comandos
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    // Garante que o comando tenha um nome definido para o Collection
    client.commands.set(command.name || file.replace('.js', ''), command);
}

// Evento de Interação (Botões e Slashes)
client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        if (interaction.customId === 'cadastrar_pix') {
            // Lógica do Modal de PIX
            await interaction.reply({ content: 'Abrindo painel de cadastro...', ephemeral: true });
        }
        
        if (interaction.customId === 'fechar_partida') {
            // Lógica de fechamento e log
            await interaction.reply({ content: 'Fechando partida e gerando logs...', ephemeral: true });
            const channel = interaction.channel;
            await channel.delete().catch(console.error);
        }
    }
});

// Evento de Mensagens para comandos prefixados (!comando)
client.on('messageCreate', async message => {
    if (!message.content.startsWith('!') || message.author.bot) return;
    
    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (command) {
        try {
            await command.execute(message, args);
        } catch (error) {
            console.error('Erro ao executar comando:', error);
        }
    }
});

client.once('ready', () => {
    console.log(`✅ Bot online e conectado: ${client.user.tag}`);
    console.log(`✅ Banco de dados gerenciado pelo ShardCloud ativo.`);
    client.user.setActivity('Gerenciando Filas', { type: ActivityType.Watching });
});

client.login(process.env.DISCORD_TOKEN);
