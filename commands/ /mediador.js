const Mediador = require('../models/Mediador');

module.exports = {
    name: 'mediador',
    async execute(message, args) {
        // Exemplo: !mediador remover @usuario
        if (args[0] === 'remover') {
            const user = message.mentions.users.first();
            await Mediador.deleteOne({ userId: user.id });
            return message.reply('Mediador removido da fila!');
        }
        // Lógica de rodízio: busca quem tem a menor ordem
        const proximo = await Mediador.findOne({}).sort({ ordem: 1 });
        await Mediador.updateOne({ userId: proximo.userId }, { $inc: { ordem: 1 } });
        message.reply(`O próximo mediador é <@${proximo.userId}>`);
    }
};
