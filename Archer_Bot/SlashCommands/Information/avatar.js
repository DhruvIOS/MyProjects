const { Client, CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");


module.exports = {
  name: "avatar",
  description: "Get users avatar",
  usage: "/avatar <@user>",
  category: "Information",
  type: ApplicationCommandType.ChatInput,
  // options: [
  //   {
  //     name: "user",
  //     description: "Member to get picture form",
  //     type: ApplicationCommandOptionType.User,
  //     require: false,
  //   },
  // ],

  options: [{
    name: 'user',
    description: 'Member to get picture form',
    type: ApplicationCommandOptionType.User,
    require: false,

  }],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const member = interaction.options.getUser("user") || interaction.user
    const Member = interaction.guild.members.cache.get(member.id);

    const role = Member.roles.cache.map((r) => r);
    const Embedcolor = Member.roles.highest.hexColor;

    const url = member.displayAvatarURL({ dynamic: true, size: 2048 });
    const embed = new EmbedBuilder()
      .setColor(Embedcolor)
      .setTitle(`${member.tag} Avatar URL`)
      .setImage(url)
      // .setFooter(`Requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: `Requested by: ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      await interaction.reply({ 
        embeds: [embed] ,
        ephemeral: true 
    });

  },
};
