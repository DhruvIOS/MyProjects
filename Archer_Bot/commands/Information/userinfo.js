const { Message, Client, EmbedBuilder } = require("discord.js");
const moment = require("moment");


module.exports = {
  name: "userinfo",
  aliases: ["info",'whois'],
  description: "Get user information",
  usage: "userinfo <@user>",
  category: "information",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return; 

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
      const embed = new EmbedBuilder()
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

        .addFields({
          name: `Roles [${role.length - 1}]`,
          value:`${Member.roles.cache
            .map((r) => r)
            .join(" ")
            .replace("@everyone", " ")}`
           })
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
