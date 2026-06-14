module.exports = {
    name: 'configurar',
    async execute(message) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Apenas ADMs.");
        message.reply("⚙️ **Configuração:** O bot está operando em modo automático. Nenhuma configuração de ID necessária!");
    }
};
