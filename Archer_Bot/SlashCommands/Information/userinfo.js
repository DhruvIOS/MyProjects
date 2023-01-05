const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField} = require("discord.js");


const moment = require("moment");

module.exports = {
    name: "userinfo",
    description: "Gets user information",
    usage: '/userinfo <@user>',
    category: 'information',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
          name: "user",
          description: "Member to get information form",
          type: ApplicationCommandOptionType.User,
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

        {
            var permissions = [];
            var acknowledgements = "No Speical Position";
      
            // if(!args[0]) return message.reply( "Please mention or put the users id or username to use this command")
            const Target1 = interaction.options.getMember("user") || interaction.member

            const Target = interaction.options.getUser("user") || interaction.member

              

            const Member = interaction.guild.members.cache.get(Target.id);
      
            const url = Target.displayAvatarURL({ dynamic: true, size: 256 });
      




            if (Target1.permissions.has(PermissionsBitField.Flags.KickMembers)) {
              permissions.push("Kick Members");
            }
      
            if (Target1.permissions.has(PermissionsBitField.Flags.BanMembers)) {
              permissions.push("Ban Members");
            }
      
            if (Target1.permissions.has(PermissionsBitField.Flags.Administrator)) {
              permissions.push("Administrator");
              acknowledgements = "Administrator";
            }
      
            if (Target1.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
              permissions.push("Manage Messages");
            }
      
            if (Target1.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
              permissions.push("Manage Channels");
            }
      
            if (Target1.permissions.has(PermissionsBitField.Flags.MentionEveryone)) {
              permissions.push("Mention Everyone");
            }
      
            if (Target1.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
              permissions.push("Manage Nicknames");
            }
      
            if (Target1.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
              permissions.push("Manage Roles");
            }
      
            if (Target1.permissions.has(PermissionsBitField.Flags.ManageWebhooks)) {
              permissions.push("Manage Webhooks");
            }
      
            if (Target1.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) {
              permissions.push("Manage Emojis");
            }
            if (permissions.length == 0) {
              permissions.push("No Key Permissions Found");
            }
      
            if (Target1.id == interaction.guild.ownerId) {
              acknowledgements = "Server Owner";
            }


      
            // const roles  = message.guild.member(Member).roles.cache;
      
            const role = Member.roles.cache.map((r) => r);
            const Embedcolor = Member.roles.highest.hexColor;
            // console.log(color)
            const embed = new EmbedBuilder()
              .setTitle(`${Target.tag}`)
              .setDescription(`${Target}`)
              .setThumbnail(url)
              .addFields(
                {
                  name: "Joined",
                  value: `${moment.utc(Target.joinedAt).format("LLL")}`,
                  inline: true,
                },
                {
                  name: "Account Created",
                  value: `${moment.utc(Target.createdAt).format("LLL")}`,
                  inline: true,
                }
              )
      
              // .addField('Account Created' ,`${moment.utc(Target.user.createdAt).format('LLL')}`, true)
      
              .addFields({
                
                name: `Roles [${role.length - 1}]`,
                value: `${Member.roles.cache
                  .map((r) => r)
                  .join(" ")
                  .replace("@everyone", " ")}`
                })

              .addFields({
                name: " Key Permission",
                value: `${permissions.join(` | `)}`,
              })
              .addFields({
                name: "Highest Position",
                value: `${acknowledgements}`,
              })
              .setColor(Embedcolor)
      
              .setFooter({ text: `${Target.id}` })
              .setTimestamp();
      

            interaction.reply({ 
                embeds: [embed] ,
                ephemeral: true 
            });
          }
    }
};