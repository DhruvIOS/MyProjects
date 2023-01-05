const client = require("../index");

const { PermissionsBitField, EmbedBuilder } = require("discord.js");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

client.on('messageCreate', async (message) => {
  // let prefix = await db.fetch(`prefix_${message.guild.id}`)


  let prefix = await db.get(`prefix_${message.guild.id}`);


  if (prefix == null) {
    prefix = client.config.prefix;
  } else {
    prefix = prefix;
  }


  
  
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;


  


  const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

    if (!message.member.permissions.has(command.permissions || [])) {
        const NoPerms = new EmbedBuilder()
          .setColor("0xFF0000")
          .setDescription(
            `You don't have required permission to use this command you need \`${command.perms}\` permission`
          );
        return message.reply({ embeds: [NoPerms] }).then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 10000);
        });
      }




  if (!command) return;

  await command.run(client, message, args, prefix);







});





