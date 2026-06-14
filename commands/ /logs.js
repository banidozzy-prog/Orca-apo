const { SlashCommandBuilder } = require('discord.js');
const db = require('../models/Config'); // Assumindo que você tenha um model de Config

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Configura o canal de logs e transcripts')
        .addChannelOption(option => option.setName('canal').setDescription('Canal de logs').setRequired(true)),
    async execute(interaction) {
        const canal = interaction.options.getChannel('canal');
        await db.findOneAndUpdate({ guildId: interaction.guild.id }, { logChannel: canal.id }, { upsert: true });
        interaction.reply({ content: `Canal de logs definido para ${canal}`, ephemeral: true });
    }
};
