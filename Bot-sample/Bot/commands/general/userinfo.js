const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const ms = require("ms");
const prettyMilliseconds = require("pretty-ms");
const config = require(".././/../config/config.json");

module.exports = {
  name: "userinfo",
  aliases: ["info"],
  descriptions: "Shows mentioned users information",
  cooldown: 5,
  usage: `${config.prefix}av [user]`,
  example: `${config.prefix}userino or ${config.prefix}userinfo @NoobFriend`,

  async execute(message, args, commandName, client, Discord) {
    {
      var permissions = [];
      var acknowledgements = "No Speical Position";

      // if(!args[0]) return message.reply( "Please mention or put the users id or username to use this command")
      const Target =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.member;
      const Member = message.guild.members.cache.get(Target.id);

      const url = Target.displayAvatarURL({ dynamic: true, size: 256 });

      if (Target.permissions.has("KICK_MEMBERS")) {
        permissions.push("Kick Members");
      }

      if (Target.permissions.has("BAN_MEMBERS")) {
        permissions.push("Ban Members");
      }

      if (Target.permissions.has("ADMINISTRATOR")) {
        permissions.push("Administrator");
        acknowledgements = "Administrator";
      }

      if (Target.permissions.has("MANAGE_MESSAGES")) {
        permissions.push("Manage Messages");
      }

      if (Target.permissions.has("MANAGE_CHANNELS")) {
        permissions.push("Manage Channels");
      }

      if (Target.permissions.has("MENTION_EVERYONE")) {
        permissions.push("Mention Everyone");
      }

      if (Target.permissions.has("MANAGE_NICKNAMES")) {
        permissions.push("Manage Nicknames");
      }

      if (Target.permissions.has("MANAGE_ROLES")) {
        permissions.push("Manage Roles");
      }

      if (Target.permissions.has("MANAGE_WEBHOOKS")) {
        permissions.push("Manage Webhooks");
      }

      if (Target.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
        permissions.push("Manage Emojis");
      }
      if (permissions.length == 0) {
        permissions.push("No Key Permissions Found");
      }

      if (Target.user.id == message.guild.ownerId) {
        acknowledgements = "Server Owner";
      }

      // const roles  = message.guild.member(Member).roles.cache;

      const role = Member.roles.cache.map((r) => r);
      const Embedcolor = Member.roles.highest.hexColor;
      // console.log(color)
      const embed = new MessageEmbed()
        .setTitle(`${Target.user.tag}`)
        .setDescription(`${Target}`)
        .setThumbnail(url)
        .addFields(
          {
            name: "Joined",
            value: `${moment.utc(Target.joinedAt).format("LLL")}`,
            inline: true,
          },
          {
            name: "Account Created",
            value: `${moment.utc(Target.user.createdAt).format("LLL")}`,
            inline: true,
          }
        )

        // .addField('Account Created' ,`${moment.utc(Target.user.createdAt).format('LLL')}`, true)

        .addField(
          `Roles [${role.length - 1}]`,
          `${Member.roles.cache
            .map((r) => r)
            .join(" ")
            .replace("@everyone", " ")}`
        )
        .addFields({
          name: " Key Permission",
          value: `${permissions.join(` | `)}`,
        })
        .addFields({
          name: "Highest Position",
          value: `${acknowledgements}`,
        })
        .setColor(Embedcolor)

        .setFooter({ text: `${Target.user.id}` })
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }
  },
};
