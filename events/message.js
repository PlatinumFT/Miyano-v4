const Discord = require("discord.js");

module.exports = async message => {

    if(message.author.bot) return;
    var client = message.client;
    var settings = client.settings;
    var prefix = settings.prefix;
   
    let messageArray = message.content.split(' ');
    let args = messageArray.slice(1);
    let command = messageArray[0];
    let isOwner = false;

    if(settings.owner_id == message.author.id) isOwner = true;

    if(message.channel.type == 'dm') return dmAdmins(message);
    
    if(!command.startsWith(prefix)) return;

    let cmd = client.commands.get(command.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(command.slice(prefix.length)));

    if(!cmd) return;

    if(cmd.help.type == 'owner' && !isOwner) return;
    let bool = await require('../util/permsChecker.js')(cmd, message);
    if(bool) {
        cmd.run(client, message, args)
    };
};

async function dmAdmins(message) {
    let admins = await message.client.db(`select * from admins`);
    let embed = new Discord.RichEmbed()
                .setAuthor(`Message recieved from ${message.author.username}`, message.author.displayAvatarURL)
                .setColor(message.client.settings.colour)
                .setDescription(`Content: ${message.content}`)
                .setTimestamp()
                .setFooter(`${message.author.id}`);
                
    for(i=0;i<admins.length;i++) {
        wantsDms = admins[i].dms;
        if(wantsDms == true)
            message.client.users.get(admins[i].user_id).send(embed);
    }
}