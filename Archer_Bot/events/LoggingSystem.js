const client = require("../index");
const { EmbedBuilder, SlashCommandSubcommandGroupBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

client.on("messageContentEdited", async (message, oldContent, newContent) => {
  const channelName = await db.get(`channelid_${message.guild.id}`);

  const LogChannelName = client.channels.cache.get(channelName); // Replace with your channel id

  const iconURL = message.author.displayAvatarURL();

  const MessageEdited = new EmbedBuilder()
    .setAuthor({ name: `${message.author.tag}`, iconURL: `${iconURL}` })
    .setTitle(`Message edited in ${message.channel.name}`)
    .setColor("0x00C1FF")

    .addFields(
      { name: `\`BEFORE:\``, value: oldContent },
      { name: `\`AFTER: :\``, value: newContent }
    )
    .setTimestamp();

  // MessageEdited.setFooter(`ID: ${message.author.id} `);
  MessageEdited.setFooter({ text: `ID: ${message.author.id}` });

  if (LogChannelName === null || LogChannelName === undefined) return;

  return LogChannelName.send({
    embeds: [MessageEdited],
  });
});

client.on("messageDelete", async (message) => {
  const channelName = await db.get(`channelid_${message.guild.id}`);

  const LogChannelName = client.channels.cache.get(channelName); // Replace with your channel id

  const iconURL = message.author.displayAvatarURL();
  const embed = new EmbedBuilder()
    .setAuthor({ name: `${message.author.tag}`, iconURL: `${iconURL}` })
    .setTitle(`Message Deleted in ${message.channel.name}`)
    .setColor("0x7000FF")
    .setDescription(`*${message}*`)
    .setTimestamp();

  // embed.setFooter(`ID: ${message.author.id} `);
  embed.setFooter({ text: `ID: ${message.author.id}` });

  if (LogChannelName === null || LogChannelName === undefined) return;

  return LogChannelName.send({
    embeds: [embed],
  });
});

client.on("guildMemberAdd", async (member) => {
  


  
  
  const guild = client.guilds.cache.get(member.guild.id);
  
  
  var memberCount1 = db.get(`memCount`);


 
  var memberCountChannel = client.channels.cache.get(memberCount1);

  




  // var botCount = member.guild.members.cache.filter(
  //   (member) => member.user.bot
  // ).size

  // var channelCount = (await guild.channels.fetch()).filter(
  //   (channel) => channel.type !== "GUILD_CATEGORY"
  // ).size;

  // var roleCount = member.guild.roles.cache.size;


  var memberCount = member.guild.memberCount;


  console.log(member.user.tag)




  console.log(memberCountChannel.name)





  




});
 