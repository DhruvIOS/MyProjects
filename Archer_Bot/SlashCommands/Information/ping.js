const { Client, CommandInteraction, MessageEmbed, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");



module.exports = {
    name: "ping",
    description: "returns websocket ping",
    usage: "/ping",
    category: "Information",
    type: ApplicationCommandType.ChatInput,
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await interaction.reply({ content: `${client.ws.ping}ms!`,ephemeral: true});





    },
};
