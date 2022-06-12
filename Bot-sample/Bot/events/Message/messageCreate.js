const { Client, Message, Collection , Permissions} = require("discord.js");
// const MessageEmbed = require('discord.js')
const { MessageEmbed } = require("discord.js")

const config = require('../../config/config.json')
const prefix = `;`
module.exports = {
  name: "messageCreate",
  /**
   * @param {Client} client
   * @param {Message} message
   */

  async execute(client, message, Discord) {


    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // if (message.author.bot || message.channel.type === "dm") return message.reply('dms');
    // if (!message.content.startsWith(prefix)) return message.reply('cmd');



    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      ); 

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (x) =>
          x.user.username.toLowerCase() === args.slice(0).join(" ") ||
          x.user.username === args[0]
      );

    if (!command) return;

    if (command) {

      // const authorPerms = message.channel.permissionsFor(message.author);
      if (!message.member.permissions.has(command.permissions || [])) {
        const NoPerms = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `You don't have required permission to use tho command you need ${command.permissions}`
          );
        return message.reply({ embeds: [NoPerms] }).then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2000);
        });
      }

      try {
        command.execute(message, args, commandName, client, Discord);
      } catch {
  
          console.log(error);
          const errorEmbed = new MessageEmbed()
          .setColor("RED")
          .setDescription(`An error happended whole trying to run this command.`);
  
        message.channel.send({ embeds: [errorEmbed] });
      }

    }
    const Admin = new MessageEmbed()
      .setColor('RED')
      .setDescription("You can't use this command on administrator")

    
    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const exipratoinTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < exipratoinTime) {
        const timeLeft = (exipratoinTime - now) / 1000;
        const timeLeftEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Please wait another ${timeLeft.toFixed(1)} more second tp be able to run this command right`);

        return message.channel.send({ embeds: [timeLeftEmbed] }).then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2000);
        });
      }
    }



    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    // try {
    //   command.execute(message, args, commandName, client, Discord);
    // } catch {

    //     console.log(error);
    //     const errorEmbed = new MessageEmbed()
    //     .setColor("RED")
    //     .setDescription(`An error happended whole trying to run this command.`);

    //   message.channel.send({ embeds: [errorEmbed] });
    // }

  }
};
