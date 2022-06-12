const { readdirSync }= require('fs');

module.exports = (client, Discord) =>{
    const commandFile = readdirSync('./commands');

    for(const folder of commandFile){
        const eventFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for(const file of eventFiles){
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name, command)
        };
    };






};

