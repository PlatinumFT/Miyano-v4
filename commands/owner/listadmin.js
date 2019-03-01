let discord = require('discord.js');

exports.run = async (client, message, args) => {
    let query = client.db;

    let res = await query(`select * from admins`);

    let _admins = res.length,
        _user;
    if (_admins == 0) _string = "There are no Admins. Assign one!"
    for (i = 0; i < _admins; i++) {
        _user = client.users.get(admins[i]);
        _string+=`${user.username}#${user.discriminator}`
    }

    let _embed = new Discord.RichEmbed()
    .setAuthor(`List of Admins`, client.user.avatarURL)
    .setColor(client.settings.colour)
    .setDescription(_string)

    message.channel.send(_embed);   
}

exports.help = {
    name: "listadmin",
    description: "Lists admins.",
    usage: "listadmin",
}