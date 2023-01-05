const client = require("../index");


const { QuickDB } = require("quick.db");

const { ActivityType } = require('discord.js')


const db = new QuickDB();

client.on("ready", async () => {
  // const statsArray = [
  //   {
  //     type: "PLAYING",
  //     content: "with discord.js",
  //     status: "online",
  //   },
  //   {
  //     type: "WATCHING",
  //     content: `over ${client.guilds.cache.size} server`,
  //     status: "online",
  //   },
  //   {
  //     type: "LISTENING",
  //     content: `commands`,
  //     status: "online",
  //   },
  //   {
  //     type: "PLAYING",
  //     content: `!help`,
  //     status: "online",
  //   },
  //   {
  //     type: "LISTENING",
  //     content: `commands from ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users`,
  //     status: "online"

  //   }

  // ];



  const options = [
    {
      type: ActivityType.Playing,
      text: "with discord.js v14",
      status: "online",
    },
    {
      type: ActivityType.Watching,
      text: `over ${client.guilds.cache.size} servers`,
      status: "online",
    },
    {
      type: ActivityType.Playing,
      text: `with !help`,
      status: "online",
    },
    {
      type: "LISTENING",
      text: `commands from ${client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
      )} users`,
      status: "online",
    },
  ];
  async function pickPresence() {
    const option = Math.floor(Math.random() * options.length);

    try {
      await client.user.setPresence({
        activities: [
          {
            name: options[option].text,
            type: options[option].type,
          },
        ],
        status: options[option].status,
      });
    } catch (error) {
      console.log(error);
    }
  }
  setInterval(pickPresence, 10 * 1000);



  console.log(`${client.user.tag} logged in`);






 
    



 



 
});
