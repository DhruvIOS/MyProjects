const { Message, Client, ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    description: "returns websocket ping",
    usage: 'ping',
    category: 'Information',
    type: ApplicationCommandType.ChatInput,



    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, prefix) => {
        // if (!message.content.startsWith(prefix)) return;

        message.channel.send(`${client.ws.ping} ws ping`);
    },
};
