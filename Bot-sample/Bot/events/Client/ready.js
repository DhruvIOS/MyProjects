const config = require('../../config/config.json')
const mongoes = require("mongoose");
const { readdirSync }= require('fs');


// module.exports ={
//     name: 'ready',
//     once: true,
//     execute(client){
//     const statsArray = [
//         {
//             type: 'PLAYING',
//             content: 'with discord.js',
//             status: 'online'
//         },
//         { 
//             type: 'WATCHING',
//             content: `over ${client.guilds.cache.size} server`,
//             status: 'online'
//         },
//         { 
//             type: 'LISTENING',
//             content: `commands`,
//             status: 'online'
//         },
//         { 
//             type: 'PLAYING',
//             content: `!help`,
//             status: 'online'
//         },
  
//     ]

//     async function pickPresence() {
//         const option = Math.floor(Math.random() * statsArray.length);

//         try{
//             await client.user.setPresence({
//                 activities: [
//                     {
//                         name: statsArray[option].content,
//                         type: statsArray[option].type
//                     },
//                 ],
//                 status: statsArray[option].status
//             });
//         }catch(error){
//             console.log(error);
//         }

//     }
//     setInterval(pickPresence, 8 * 1000)

//     console.log(`${client.user.tag} is now online `);
//     console.log(`Bot prefix is ${config.prefix}`)




//     }


// }



module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log('Bot Ready')
        client.user.setPresence({ activities: [{ name: `with Discord.js`, type: `PLAYING`}], status: 'online'})
       

    
    
    }

}
