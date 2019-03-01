let discord = require('discord.js');

exports.run = async (client, message, args) => {
    let query = client.db;

    let res = await query(`select * from admins where user_id = '${args[0]}'`);
    if(!res[0]) return message.channel.send(`That user is not an admin!`);

    query(`delete from admins where user_id = '${args[0]}'`);
    return await message.channel.send(`Removed ${args[0]} to the list of admins.`);
}

exports.help = {
    name: "clearadmin",
    description: "Checks the ping of the bot to the server.",
    usage: "clearadmin",
}