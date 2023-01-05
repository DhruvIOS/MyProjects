const { Message, Client, EmbedBuilder, Permissions } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB(); 
module.exports = {
  name: "setprefix",
  aliases: ["spre"],
  description: "Allows the admin to change the server prefix",
  usage: "setprefix <new prefix>",
  category: "Utilites",
  permissions: ["ADMINISTRATOR"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    // const member = message.author
    if (!message.content.startsWith(prefix)) return;


    // if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command")
    const newprefix = args[0];
    if (!newprefix)
      return message.reply("Please provide a prefix").then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 5000);
      });

    if (newprefix.length >= 3)
      return message
        .reply("New prefix cannot be longer than 3 characters long")
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 5000);
        });

        const successEmbed = new EmbedBuilder()
            .setTitle("Prefix successfully changed")
            .setDescription(`Prefix of **${message.guild.name}** is changed to *__${newprefix}__*`)
            .setColor('0x13FF00')

        message.channel.send({ embeds: [successEmbed]})

        db.set(`prefix_${message.guild.id}`, newprefix)


  },
};
