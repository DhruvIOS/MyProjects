const {
  Client,
  Intents,
  Collection,
  MessageEmbed,
  Discord,
} = require("discord.js");

const client = new Client({ intents: 32767 });
const config = require("./config/config.json");
const parseTime = require("parse-duration").default;
const prettyMilliseconds = require("pretty-ms");

client.commands = new Collection();
client.cooldowns = new Collection();



["eventsHandlers", "commandHandlers"].forEach((handler) => {
  require(`./Handlers/${handler}`)(client, Discord);
});

// client.on("messageCreate", (message) => {
//   // if (!message.content.startsWith(config.prefix)) return;

//   const messageArray = message.content.split(" ");
//   const messageArray2 = message.content.split(" ");
//   const Converter = require("timestamp-conv");

//   const cmd = messageArray[0];
//   const args = messageArray.slice(1);
//   const alliaise = messageArray2[0];

//   if (cmd === `${config.prefix}kick`) {
//     if (!args[0])
//       return message.reply(
//         "Please mention or put the users id or username to use this command"
//       );
//     let reason1 = args.slice(1).join(" ");
//     if (!reason1) reason1 = "Not Giving";
//     const member =
//       message.mentions.members.first() ||
//       message.guild.members.cache.get(args[0]) ||
//       message.guild.members.cache.find(
//         (x) =>
//           x.user.username.toLowerCase() === args.slice(0).join(" ") ||
//           x.user.username === args[0]
//       );
//     const embed = new MessageEmbed()
//       .setColor("GREEN")
//       .setTitle(`✅ **${member.user.tag} was kicked**`);

//     if (!message.member.permissions.has("KICK_MEMBERS"))
//       return message.reply("You don't have permission to use this command");
//     if (!message.guild.me.permissions.has("KICK_MEMBERS"))
//       return message.reply("I don't have permission to kick people");
//     if (message.member.id === member.id)
//       return message.reply("You can't kick your self");
//     member.kick(reason1);
//     message.channel.send({ embeds: [embed] });
//   }
//   if (cmd === `${config.prefix}ban`) {
//     if (!args[0])
//       return message.reply(
//         "Please mention or put the users id or username to use this command"
//       );
//     let reason = args.slice(1).join(" ");
//     if (!reason) reason = "Not Giving";
//     const member =
//       message.mentions.members.first() ||
//       message.guild.members.cache.get(args[0]) ||
//       message.guild.members.cache.find(
//         (x) =>
//           x.user.username.toLowerCase() === args.slice(0).join(" ") ||
//           x.user.username === args[0]
//       );
//     const embed1 = new MessageEmbed()
//       .setColor("GREEN")
//       .setTitle(`✅ *${member.user.tag} was banned*`);

//     if (!message.member.permissions.has("BAN_MEMBERS"))
//       return message.reply("You don't have permission to use this command");
//     if (!message.guild.me.permissions.has("BAN_MEMBERS"))
//       return message.reply("I don't have permission to kick people");
//     if (message.member.id === member.id)
//       return message.reply("You can't ban your self");
//     member.ban({ days: 7, reason: `${reason}` }).then(console.log);

//     message.channel.send({ embeds: [embed1] });
//   }
//   if(cmd === `${config.prefix}test`){
//     message.channel.send('Test answred')
//   }
// });




client.login(config.token)
