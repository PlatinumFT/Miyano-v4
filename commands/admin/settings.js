let discord = require('discord.js');

exports.run = async (client, message, args) => {
    async function embed(text) {
        return new discord.RichEmbed().setDescription(text).setColor(client.settings.colour);
    }

    let query = client.db;
    let res = await query(`select * from admins where user_id = '${message.author.id}'`);
    if(!res[0]) return message.channel.send(`You are not an admin.`);

    if(!args[0]) {
        let embed = new discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setDescription(`Forward dms: ${res[0].dms}\nBypass filters: ${res[0].filters}`)
                    .setColor('ffffff');

        return message.channel.send(embed);
    } else if(args[0]) {
        let eventState = res[0][args[0]];

        if(!(eventState == true || eventState == false)) 
            return message.channel.send(await embed(`${message.author}, this event doesn't exist.`));
    
        if(eventState == true) {
            await client.db(`update admins set ${args[0]} = false where user_id = '${message.author.id}'`);
            return message.channel.send(await embed(`${message.author}, updated ${args[0]} to false.`));
        } else {
            await client.db(`update admins set ${args[0]} = true where user_id = '${message.author.id}'`);
            return message.channel.send(await embed(`${message.author}, updated ${args[0]} to true.`));
        }
        
    }
}

exports.help = {
    name: "settings",
    description: "Checks your settings. Admin only.",
    usage: "settings",
}