const { MessageEmbed } = require("discord.js");
const config = require(".././/../config/config.json");
module.exports = {
  name: "purge",
  aliases: ["clear"],
  permissions: ["MANAGE_MESSAGES"],
  descriptions: "Deletes messages",
  cooldown: 5,
  usage: `${config.prefix}purge [amount]`,
  example: `${config.prefix}purge 20`,

  async execute(message, args, commandName, client, Discord) {
    const embed = new MessageEmbed()
      .setColor("RED")
      .setDescription("I cannnot clear more than 100 messages");

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    const ComandName = command.name;
    const CommandUsage = command.usage;
    const CommandDescription = command.descriptions;
    const CommandPermission = command.permissions.join(".");
    const CommandCoolDown = command.cooldown;
    const CommandExample = command.example;

    if (!CommandCoolDown) CommandCoolDown = "No Cooldown";
    if (!CommandPermission) CommandPermission = "Everyone";
    const info = new MessageEmbed()
      .setColor("BLACK")
      .setTitle(`Command: ${config.prefix}${ComandName}`)
      .setDescription(
        `**Description** ${CommandDescription}\n **CoolDown:** ${CommandCoolDown} \n **Usage: ${CommandUsage}**Example** ${CommandExample}`
      );

    // .addField('**Name:**', `${ComandName}`)
    // .addField('**Aliases:**', `{CommandAliases}`)
    // .addField('**Description:**', `${CommandDescription}`)
    // .addField('**Permission:**', `${CommandPermission}`)
    // .addField('**CoolDown:**', `${CommandCoolDown}`)

    const BotPermissions = new MessageEmbed()
      .setColor("RED")
      .setDescription("I don't have permission to use this command");

    if (!message.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.reply({ embeds: [BotPermissions] });
    const amount = args.slice(0).join(" ");

    if (!amount) return message.channel.send({ embeds: [info] });

    if (amount > 100) return message.channel.send({ embeds: [embed] });

    message.channel.messages.fetch({ limit: amount }).then((messages) => {
      message.channel.bulkDelete(messages);
    });
  },
};
