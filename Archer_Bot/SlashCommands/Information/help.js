const {
  Client,
  CommandInteraction,
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");

const { readdirSync } = require("fs");
module.exports = {
  name: "help",
  description: "All the commands in slash commands",
  usage: "/help",
  category: "Information",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "command",
      description: "Name of the command",
      type: ApplicationCommandOptionType.String,
      require: false,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (!args[0]) {
      let categories = [];

      readdirSync("./SlashCommands/").forEach((dir) => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../SlashCommands/${dir}/${command}`);
          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();
        data = {
          name: dir.toUpperCase(),
          value: cmds.lenght === 0 ? "In progress." : cmds.join(" | "),
        };
        categories.push(data);
      });

      const embed = new EmbedBuilder()
        .setTitle("Commands")
        .addFields(categories)
        .setDescription(
          `Use \`/help\` followed by a command name to get more additional information on a command. for example: \`/help ping\``
        );
      // .setFooter(`Requested by ${interaction.user.tag}`, interaction.member.displayAvatarURL({ dynamic: true }))
      embed
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.member.displayAvatarURL({ dynamic: true }),
        })

        .setColor(interaction.guild.members.me.displayHexColor);
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } else {
      const command =
        client.slashCommands.get(args[0].toLowerCase()) ||
        client.slashCommands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      if (!command) {
        const embed = new EmbedBuilder()
          .setTitle("Not Found")
          .setDescription(
            `Command not found, Use \`/help\` for all commands available`
          )
          .setColor(interaction.guild.me.displayHexColor);
        return interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
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
          value: command.usage ? `\`${command.usage}\`` : `\`${command.name}\``,
        })

        .setColor(interaction.guild.members.me.displayHexColor);
      embed.setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.member.displayAvatarURL({ dynamic: true }),
      });

      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
  },
};
