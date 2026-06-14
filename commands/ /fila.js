const { ChannelType } = require('discord.js');

module.exports = {
    name: 'fila',
    async execute(message) {
        const categoria = message.guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.children.cache.size < 8);
        const channel = await message.guild.channels.create({
            name: `fila-${message.author.username}`,
            type: ChannelType.GuildText,
            parent: categoria
        });
        message.reply(`Fila criada em ${channel}`);
    }
};
