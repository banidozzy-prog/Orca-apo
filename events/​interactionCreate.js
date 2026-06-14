module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'wo') await interaction.reply("W.O. marcado!");
    if (interaction.customId === 'fechar') await interaction.reply("Partida fechada!");
};
