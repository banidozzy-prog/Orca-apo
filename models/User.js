const User = require('../models/User');

module.exports = {
    name: 'b',
    async execute(message) {
        // Verifica se quem digitou é admin (opcional, ou você pode remover esta linha)
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Apenas ADMs podem usar este comando.");

        const target = message.mentions.users.first();
        if (!target) return message.reply("Marque o usuário que deseja adicionar à blacklist.");

        try {
            // Atualiza ou cria o usuário no banco marcando ele como banido
            await User.findOneAndUpdate(
                { userId: target.id },
                { $set: { isBlacklisted: true } },
                { upsert: true, new: true }
            );
            message.reply(`✅ Usuário ${target.tag} foi adicionado à blacklist com sucesso.`);
        } catch (error) {
            console.error(error);
            message.reply("❌ Erro ao adicionar à blacklist.");
        }
    }
};
