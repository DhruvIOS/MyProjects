const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["latency", "lag"],
  descriptions: "Replie with the bots ping",
  cooldown: 5,
  

  async execute(message, args, commandName, client, Discord) {
    message.channel.send("Pinging...").then((msg) => {
      const ping = msg.createdTimestamp - message.createdTimestamp;

      msg.edit(`>>> Pong! \`${ping}\` MS`);
    });
  },
};




