const {
  Message,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

const fs = require("fs");
module.exports = {
  name: "help",
  aliases: ["assist"],
  description: "List of all the commands",
  usage: "help",
  category: "Information",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return;

    if (!args[0]) {
      const directories = [
        ...new Set(client.commands.map((cmd) => cmd.directory)),
      ];

      const formatString = (str) =>
        `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

      const categories = directories.map((dir) => {
        const getCommands = client.commands
          .filter((cmd) => cmd.directory == dir)
          .map((cmd) => {
            return {
              name: cmd.name || "command is not ready",
              description:
                cmd.description || "command does not have description",
              usage: cmd.usage,
              aliases: cmd.aliases,
              category: cmd.category,
              permissions: cmd.permissions,
            };
          });

        return {
          directory: formatString(dir),
          commands: getCommands,
        };
      });

      const embed = new EmbedBuilder()
        .setTitle("Please choose a category from the menu")
        .setDescription(`Type ${prefix}help <command> for more Information`)
        .setColor("0x0046FF");

      const SlashEmbed = new EmbedBuilder()
        .setTitle("Help with Slash Command?")
        .setDescription(
          "Type `/help` for all the commands available in slash command"
        )
        .setColor("0xFF2D00");

      const components = (state) => [
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            
            .setCustomId("help-menu")
            .setPlaceholder("Please select a category.")
            .setDisabled(state)
            .addOptions(
              categories.map((cmd) => {
                return {
                  label: cmd.directory,
                  value: cmd.directory.toLowerCase(),
                  description: `Commands from ${cmd.directory} category
                                    `,
                };
              })
            )
        ),
      ];
      const intialMessage = await message.channel.send({
        embeds: [embed, SlashEmbed],
        components: components(false),
      });

      const filter = (interaction) => interaction.user.id == message.author.id;

      const collector = message.channel.createMessageComponentCollector({
        filter,
        componentsType: "SELECT_MENU",
        // time:10000
      });

      collector.on("collect", (interaction) => {
        const [directory] = interaction.values;
        const category = categories.find(
          (x) => x.directory.toLowerCase() === directory
        );

        const categoryEmbed = new EmbedBuilder()
          .setTitle(`${directory} commands`)
          .setDescription("Here are the list of commands")
          .addFields(
            category.commands.map((cmd) => {
              return {
                name: `\`${cmd.name}\``,
                value: `${cmd.description}`,
                inline: true,
              };
            })
          );

        interaction.update({ embeds: [categoryEmbed] });
      });

      collector.on("end", () => {
        intialMessage.edit({ components: components(true) });
      });
    } else {
      const member = message.author;
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      if (!command) {
        const embed = new EmbedBuilder()
          .setTitle("Not Found")
          .setDescription(
            `Command not found, Use \`${prefix}help\` for all commands available`
          )
          .setColor(message.guild.members.me.displayHexColor);
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new EmbedBuilder()
        .setTitle("Command Details")
        .addFields({
          name: "COMMAND:",
          value: command.name
            ? `\`${command.name}\``
            : "No name for this command",
        })
        .addFields({
          name: "DESCRIPTION",
          value: command.description
            ? command.description
            : "No description for this command.",
        })
        .addFields({
          name: "ALIASES:",
          value: command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command.",
        })
        .addFields({
          name: "USAGE:",
          value: command.usage
            ? `\`${prefix}${command.usage}\``
            : `\`${prefix}${command.name}\``,
        })

        .addFields({
          name: "PERMISSIONS:",
          value: command.permissions
            ? `\`${command.permissions.join("` `")}\``
            : "Permission not needed for this command.",
        })

        .setColor(message.guild.members.me.displayHexColor);

      embed.setFooter({
        text: `Requested by ${member.tag}`,
        iconURL: message.member.displayAvatarURL({ dynamic: true }),
      });

      return message.channel.send({ embeds: [embed] });
    }
  },
};
