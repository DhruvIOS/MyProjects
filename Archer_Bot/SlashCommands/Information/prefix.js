const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");



const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: "prefix",
    description: "User can see server prefix.",
    usage: '/prefix',
    category: 'Informaton',
    type: ApplicationCommandType.ChatInput,
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args) => {
        let prefix = await db.get(`prefix_${interaction.guild.id}`);
        const embed = new EmbedBuilder()
            .setTitle(`Prefix for **${interaction.guild.name}** is \`${prefix}\``)
            .setColor(interaction.guild.members.me.displayHexColor);



        interaction.reply({ 
            embeds: [embed] ,
            ephemeral: true 

        })


       
    }
};