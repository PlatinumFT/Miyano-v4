let discord = require('discord.js');

exports.run = async (client, message, args) => {
    let query = client.db;

    let res = await query(`select * from admins where user_id = '${args[0]}'`);
    if(res[0]) return message.channel.send(`That user is already an admin!`);

    query(`insert into admins values('${args[0]}', true, true)`);
    return await message.channel.send(`Added ${args[0]} to the list of admins.`);
}

exports.help = {
    name: "addadmin",
    description: "Checks the ping of the bot to the server.",
    usage: "addadmin",
}