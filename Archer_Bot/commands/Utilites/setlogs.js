const { Message, Client, MessageEmbed, Permissions } = require("discord.js");
const { copyFileSync } = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "setlogs",
  aliases: ["logs"],
  description: "Setup a channel where logs goes",
  usage: `setlogs <admin role id>`,
  category: "Utilites",
  permissions: ["ADMINISTRATOR"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return; 

    const channelName = `${message.guild.name} Logs`;

    const channelID = await db.get(`channelid_${message.guild.id}`);

    if (message.guild.channels.cache.has(channelID)) {
      message
        .reply(
          `${message.guild.name} Logs already exists click <#${channelID}> to access it.`
        )
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 15000);
        });
    } else {
      message.guild.channels
        .create("Server Logs", {
          type: "GUILD_CATEGORY",
          permissionOverwrites: [
            {
              id: message.guild.id,
              deny: ["VIEW_CHANNEL"],
            },
          ],
        })


        // let category = message.guild.channels.find(cat=> cat.name === 'Server Logs')
        let category = message.guild.channels.cache.find(cat => cat.name === 'Server Logs')

        console.log(category.id)
          message.guild.channels
          .create(channelName, {
            parent: category.id,
            type: "text",
            permissionOverwrites: [
              {
                id: message.guild.id,
                deny: ["VIEW_CHANNEL"],
              },
            ],
          })
          .then((ch) => {
            message.channel
              .send({ content: `Click ${ch} to access the logs channel` })
              .then((sent) => {
                setTimeout(() => {
                  sent.delete();
                }, 10000);
              });

            const embed = new MessageEmbed()
              .setTitle("Successfully added log channel")
              .setDescription(
                `✅ Administrator can view channel \n\n ❌ @everyone can't view`
              )

              .setColor("GREEN");

            ch.send({ embeds: [embed] });

            db.set(`channelid_${message.guild.id}`, ch.id);
          })

    }
  },
};
