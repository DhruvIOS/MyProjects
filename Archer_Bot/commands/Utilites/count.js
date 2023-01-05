const {
  Message,
  Client,
  ApplicationCommandType,
  PermissionsBitField,
  ChannelType,
  EmbedBuilder,
  Role,
} = require("discord.js");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "count",
  aliases: ["mc"],
  description: "Sets",
  usage: "count",
  category: "Utilites",
  type: ApplicationCommandType.ChatInput,
  permissions: [PermissionsBitField.Flags.ManageChannels],
  perms: "Manage Channels",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return;

    const guild = client.guilds.cache.get(message.guild.id);

    var memberCount = message.guild.memberCount;

    var botCount = message.guild.members.cache.filter(
      (member) => member.user.bot
    ).size;

    var channelCount = (await guild.channels.fetch()).filter(
      (channel) => channel.type !== "GUILD_CATEGORY"
    ).size;

    var roleCount = message.guild.roles.cache.size;







    const finCat = await db.get(`CatId${message.guild.id}`);



    if (message.guild.channels.cache.has(finCat)) {
      message
        .reply(`${message.guild.name} Server Stats already exists`)
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 15000);
        });
    } else {
      try {
        await message.guild.channels.create({
          name: "Server Stats",
          type: ChannelType.GuildCategory,
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: message.guild.id,
              deny: [
                PermissionsBitField.Flags.Speak,
                PermissionsBitField.Flags.Connect,
              ],
            },
          ],
        });

        let category = message.guild.channels.cache.find(
          (cat) => cat.name === "Server Stats"
        );
        

        category = category.id;

        db.set(`CatId${message.guild.id}`,category);


        await message.guild.channels.create({
          name: `Members: ${memberCount}`,
          type: ChannelType.GuildVoice,
          parent: category,
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: message.guild.id,
              deny: [
                PermissionsBitField.Flags.Speak,
                PermissionsBitField.Flags.Connect,
              ],
            },
          ],
        }).then((ch) => {

           
    })









        await message.guild.channels.create({
          name: `Bot: ${botCount}`,
          type: ChannelType.GuildVoice,
          parent: category,
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: message.guild.id,
              deny: [
                PermissionsBitField.Flags.Speak,
                PermissionsBitField.Flags.Connect,
              ],
            },
          ],
        })

        await message.guild.channels.create({
          name: `Channels: ${channelCount}`,
          type: ChannelType.GuildVoice,
          parent: category,
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: message.guild.id,
              deny: [
                PermissionsBitField.Flags.Speak,
                PermissionsBitField.Flags.Connect,
              ],
            },
          ],
        })

        await message.guild.channels.create({
          name: `Roles: ${roleCount}`,
          type: ChannelType.GuildVoice,
          parent: category,
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: message.guild.id,
              deny: [
                PermissionsBitField.Flags.Speak,
                PermissionsBitField.Flags.Connect,
              ],
            },
          ],
        })


        const memCh = message.guild.channels.cache.find(channel => channel.name === `Members: ${memberCount}`);
        const BotCh = message.guild.channels.cache.find(channel => channel.name === `Bot: ${botCount}`);
        const ChannelCh = message.guild.channels.cache.find(channel => channel.name === `Channels: ${channelCount}`);
        const RoleCh = message.guild.channels.cache.find(channel => channel.name === `Roles: ${roleCount}`);



        db.set(`memCount}`, memCh.id)
        db.set(`BotCount}`, BotCh.id)
        db.set(`ChannelCount}`, ChannelCh.id)
        db.set(`RoleCount}`, RoleCh.id)




        const embed = new EmbedBuilder()
          .setColor("0x13FF00")
          .setDescription("✅ Successfully created server stats");

        message.channel.send({ embeds: [embed] });
      } catch (err) {
        console.log(err);
      }
    }


       
  },


  
};
