const Partida = require('../models/Partida');

module.exports = {
    name: 'simultanea',
    async execute(message) {
        const total = await Partida.countDocuments({ status: 'ativa' });
        message.reply({
            embeds: [{
                title: '<:simultanea:1514876848553725993> Filas Ativas',
                description: `No momento existem **${total}** filas simultâneas ativas no servidor.`,
                color: 0x00FF00
            }]
        });
    }
};
