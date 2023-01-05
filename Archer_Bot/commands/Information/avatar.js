const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av", "pfp", "picture"],
  description: "Get users avatar",
  usage: "avatar <@user>",
  category: "Information",


  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return; 

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    const Member = message.guild.members.cache.get(member.id);

    const role = Member.roles.cache.map((r) => r);
    const Embedcolor = Member.roles.highest.hexColor;

    const url = member.displayAvatarURL({ dynamic: true, size: 2048 });
    const embed = new EmbedBuilder()
      .setColor(Embedcolor)
      .setTitle(`${member.user.tag} Avatar URL`)
      .setImage(url);
    message.channel.send({ embeds: [embed] });
  },
};
