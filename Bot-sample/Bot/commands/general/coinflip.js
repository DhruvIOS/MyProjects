const { MessageEmbed } = require("discord.js");
const coinflip = require("coinflip");
module.exports = {
  name: "coinflip",
  aliases: ["flip", "toss"],
  descriptions: "It does a coinflip",
  cooldown: 5,

  async execute(message, args, commandName, client, Discord) {
    if (coinflip()) {
      message.reply("Heads");
    } else {
      message.reply("Tails");
    }
  
};




