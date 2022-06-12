const { MessageEmbed } = require("discord.js");
const config = require(".././/../config/config.json");

module.exports = {
  name: "av",
  aliases: ["avatar"],
  permisions: [],
  descriptions: "Shows users profile picture",
  usage: `${config.prefix}av or ${config.prefix}av [user]`,
  cooldown: 5,
  example: `${config.prefix}av or ${config.prefix}av @NoobFriend`,
  async execute(message, args, commandName, client, Discord) {
    const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;
    const Member = message.guild.members.cache.get(member.id);




    // const info = new MessageEmbed()
    //   .setColor('BLACK')
    //   .addField('name', `${name}`)
    const role = Member.roles.cache.map((r) => r);
      const Embedcolor = Member.roles.highest.hexColor;

    const url = member.displayAvatarURL({ dynamic: true, size: 256 });
    const embed = new MessageEmbed()
      .setColor(Embedcolor)
      .setTitle(`${member.user.tag} Avatar URL`)
      .setImage(url);
    message.channel.send({ embeds: [embed] });
  },
};
