// --- DENTRO DO SEU interactionCreate.js ---

// 1. Quando o Staff enviar o formulário de Blacklist
if (interaction.customId === 'modal_blacklist_add') {
    const id = interaction.fields.getTextInputValue('id_alvo');
    const motivo = interaction.fields.getTextInputValue('motivo_alvo');
    const foto = interaction.fields.getTextInputValue('foto_alvo');

    await Blacklist.create({ idAlvo: id, motivo: motivo, provaUrl: foto, autorId: interaction.user.id });
    await interaction.reply({ content: `✅ Jogador **${id}** adicionado à blacklist!`, ephemeral: true });
}

// 2. Quando o usuário clicar em "Verificar ID"
if (interaction.customId === 'verificar_id') {
    const modal = new ModalBuilder().setCustomId('modal_consulta').setTitle('Consultar ID');
    modal.addComponents(new ActionRowBuilder().addComponents(
        new TextInputBuilder().setCustomId('id_consulta').setLabel('Digite o ID').setStyle(TextInputStyle.Short)
    ));
    await interaction.showModal(modal);
}

// 3. Resultado da Consulta (Embed com foto e avatar do Staff)
if (interaction.customId === 'modal_consulta') {
    const idConsulta = interaction.fields.getTextInputValue('id_consulta');
    const res = await Blacklist.findOne({ idAlvo: idConsulta });

    if (!res) return interaction.reply({ content: "✅ Jogador limpo!", ephemeral: true });

    const staff = await interaction.client.users.fetch(res.autorId);
    const embed = new EmbedBuilder()
        .setTitle("🚫 Jogador na Blacklist")
        .setDescription(`**ID:** ${res.idAlvo}\n**Motivo:** ${res.motivo}`)
        .setImage(res.provaUrl)
        .setThumbnail(staff.displayAvatarURL())
        .setFooter({ text: `Punido por: ${staff.username}`, iconURL: staff.displayAvatarURL() });

    await interaction.reply({ embeds: [embed], ephemeral: true });
}
