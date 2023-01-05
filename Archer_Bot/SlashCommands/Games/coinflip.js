const { Client, CommandInteraction,  } = require("discord.js");


module.exports = {
    name: "flip",
    description: "Flips a coin",
    usage: "/flip",
    category: "Games",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const max = 2;
        var number = Math.floor(Math.random() * max);
        const user = interaction.user;


        if(number == 0){

            await interaction.reply({content: `<@${user.id}> Heads`, allowedMentions: { users: [user.id] }});

        }else{

            await interaction.reply({content: `<@${user.id}> Tails`, allowedMentions: { users: [user.id] }});






        }

  


        
    }   
}
