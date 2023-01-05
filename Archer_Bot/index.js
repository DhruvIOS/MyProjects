const { Client, Collection, GatewayIntentBits, Partials,  } = require("discord.js");

// const client = new Client({ 
//     allowedMentions: { parse: ['users', 'roles'] } ,
//      intents: 32767
//     });


const { User, Message, GuildMember, ThreadMember, Channel }= Partials

const client = new Client({

  // intents: [
	// 	GatewayIntentBits.Guilds,
	// 	GatewayIntentBits.GuildMessages,
	// 	GatewayIntentBits.MessageContent,
	// 	GatewayIntentBits.GuildMembers,

	// ],


  intents: 65535,

  partials: [User, Message, GuildMember, ThreadMember, Channel]



});

module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");


const fs = require("fs");
const chalk = require("chalk") // Since this is ES5 you have to do this " npm i chalk@4.1.2 "
const jsonDataa = require("./server.json"); // Requiring the servers.json file

function run(jsonData) { fs.writeFile( // Simple function to lower amount of code in later files
  "./server.json",
  JSON.stringify(jsonData),
  function (err, result) {
    if (err) console.log("err", result);
  }
)

};

client.once('ready', (async) => { // When the bot turns on it will update the server amount WITH 100% ACCURACY
  jsonDataa["server"] = `${client.guilds.cache.size}`; 
  jsonDataa["users"] = `${client.guilds.cache.reduce((a, g) => a+g.memberCount, 0)}`
  console.log(chalk.blue(`Bot on, updated server amount to`) + chalk.green(` [ ${client.guilds.cache.size} ]`)), run(jsonDataa)
  console.log(chalk.green(`Bot on updated user amount to`) + chalk.blue (` [ ${client.guilds.cache.reduce((a, g) => a+g.memberCount, 0)} ]`)), run(jsonDataa)
})

client.on("guildCreate", (async) => { // Guild create is when the bot enters a servers
  jsonDataa["server"] = `${parseInt(jsonDataa["server"]) + 1}`; // Using the "jsonData" require to find the specific key, then editing it using "="
  console.log(chalk.blue(`Updated server amount to`) + chalk.green(` [ ${parseInt(jsonDataa["server"]) + 1} ]`)), run(jsonDataa)
  // Writing the edited jsonData to your servers.json file.
});

client.on("guildDelete", (async) => { // Guild delete is when the bot leaves a server, if it's offline it WILL not register thats why we need the code in the client.once function too
  jsonDataa["server"] = `${parseInt(jsonDataa["server"]) - 1}`; 
  console.log(chalk.blue(`Updated server amount to`) + chalk.red(` [ ${parseInt(jsonDataa["server"]) - 1} ]`)), run(jsonDataa)
});
// Initializing the project
require("./handler")(client);



client.login(client.config.token);

