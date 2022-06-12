const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const parseTime = require("parse-duration").default;
const ms = require("ms");
const prettyMilliseconds = require("pretty-ms");
const config = require(".././/../config/config.json");
module.exports = {
  name: "timeout",
  aliases: ["mute"],
  permissions: ["MODERATE_MEMBERS"],
  descriptions: "Puts user in timeout",
  cooldown: 5,
  usage: `${config.prefix}timeout [user][time][reason]`,
  example: `${config.prefix}timeout @NoobFriend 20sec toxic`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(message, args, commandName, client, Discord) {
    const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
    const ComandName = command.name;
    const CommandUsage = command.usage;
    const CommandDescription = command.descriptions;
    const CommandCoolDown = command.cooldown;
    const CommandExample = command.example;

    if (!CommandCoolDown) CommandCoolDown = "No Cooldown";

    const info = new MessageEmbed()
      .setColor("BLACK")
      .setTitle(`Command: ${config.prefix}${ComandName}`)
      .setDescription(
        `**Description** ${CommandDescription}\n **CoolDown:** ${CommandCoolDown} \n **Usage:** ${CommandUsage} \n **Example:** ${CommandExample}`
      );

    const Admin = new MessageEmbed()
        .setColor('RED')
        .setDescription("❌ You cannot use this command on administrator")

    const BotPermissions = new MessageEmbed()
        .setColor('RED')
        .setDescription("❌ I don't have permission to use this command")

    
    const guild = message.guild;

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (x) =>
          x.user.username.toLowerCase() === args.slice(0).join(" ") ||
          x.user.username === args[0]
      );
      if (!args[0])
        return message.channel.send({ embeds: [info] })
        // .then((sent) => {
        //   setTimeout(() => {
        //     sent.delete();
        //   }, 2000);
        // });
    guild.members.fetch(member).then();
    if (member.permissions.has('ADMINISTRATOR')){

     return message.reply({ embeds: [Admin]}).then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 2000);
      });
    }





    if (!message.guild.me.permissions.has("MODERATE_MEMBERS"))
      return message
        .reply({ embeds:[BotPermissions]})
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2000);
        });
    if (message.member.id === member.id)
      return message
        .reply("You can't put your self in timeout")
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2000);
        });

    let time = args.slice(1).join(" ");
    let reason = args.slice(2).join(" ");
    if (!reason) reason = "Not Giving";
    if (!time) return message.reply("Plese provide duration for timeout");
    let parsedTime = parseTime(time);

    if (parsedTime < ms("1ms") || parsedTime > ms("28d")) {
      return message.reply("The duration porvided cannot be used");
    }
    const embed1 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        `✅ **${member.user.tag} is now on timeout until ${prettyMilliseconds(
          parsedTime
        )} for ${reason}**`
      );
    member.timeout(parsedTime, reason);
    message.channel.send({ embeds: [embed1] }).then((sent) => {
      setTimeout(() => {
        sent.delete();
      }, 5000);
    });
  },
};
