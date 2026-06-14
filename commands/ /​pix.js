const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'pix',
    async execute(message) {
        const embed = new EmbedBuilder()
            .setTitle("💰 ORCA COINS - Pagamento PIX")
            .setDescription("Para realizar uma recarga de moedas, siga as instruções abaixo:")
            .addFields(
                { name: 'Chave PIX:', value: 'INSIRA_SUA_CHAVE_AQUI', inline: false },
                { name: 'Instruções:', value: '1. Faça a transferência.\n2. Tire print do comprovante.\n3. Envie o print aqui no canal.\n4. Aguarde a confirmação de um Staff.', inline: false }
            )
            .setColor(0x0099FF)
            .setFooter({ text: 'ORCA APOSTAS - Segurança e Rapidez' });

        message.reply({ embeds: [embed] });
    }
};
