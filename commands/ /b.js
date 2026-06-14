const User = require('../models/User');

module.exports = {
    name: 'b',
    async execute(message) {
        // Verifica se quem digitou é Administrador
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply("❌ Apenas membros da administração podem usar este comando.");
        }

        // Pega o usuário mencionado (ex: !b @usuario)
        const target = message.mentions.users.first();
        if (!target) {
            return message.reply("❌ Você precisa mencionar um usuário! Exemplo: `!b @usuario`");
        }

        try {
            // Procura o usuário no banco ou cria um se ele não existir
            // e marca isBlacklisted como true
            await User.findOneAndUpdate(
                { userId: target.id },
                { $set: { isBlacklisted: true } },
                { upsert: true, new: true }
            );
            
            message.reply(`✅ O usuário **${target.username}** foi adicionado à blacklist com sucesso.`);
        } catch (error) {
            console.error(error);
            message.reply("❌ Erro ao tentar adicionar este usuário à blacklist.");
        }
    }
};
