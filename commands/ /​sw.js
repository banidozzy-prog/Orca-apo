const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    name: 'sw',
    async execute(message) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('wo').setLabel('W.O.').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('fechar').setLabel('Fechar').setStyle(ButtonStyle.Success)
        );
        await message.reply({ content: 'Gerenciador da partida:', components: [row] });
    }
};

