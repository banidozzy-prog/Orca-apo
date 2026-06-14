const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'b',
    async execute(message) {
        const cargosSs = [config.cargo_ss_mob, config.cargo_ss_emu]; // Ajuste conforme seu JSON
        if (!message.member.roles.cache.some(r => cargosSs.includes(r.id))) return;

        await message.delete().catch(() => {});

        const modal = new ModalBuilder()
            .setCustomId('modal_blacklist_add')
            .setTitle('Adicionar à Blacklist');

        modal.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('id_alvo').setLabel('ID do Jogador').setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('motivo_alvo').setLabel('Motivo').setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('foto_alvo').setLabel('Link da Prova (SS)').setStyle(TextInputStyle.Short).setRequired(true))
        );

        await message.member.interaction.showModal(modal);
    }
};
