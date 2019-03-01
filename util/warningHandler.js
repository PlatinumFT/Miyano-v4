let Discord = require('discord.js');

module.exports = async (user, message, reason) => {
    let query = message.client.db;
    if(!user) return;

    let reasonSQL = reason.replaceAll("'", "''")

    let res = await query(`select * from warnings where user_id = '${user.id}' and guild_id = '${message.guild.id}'`);

    await user.send(await warnEmbed(reason, message.guild, res.length + 1));
    await query(`insert into warnings values('${user.id}', '${message.guild.id}', ${reason})`)
    
}

async function warnEmbed(reason, guild, count) {
    return new Discord.RichEmbed()
                           .setAuthor(`You have been warned in ${guild.name}`, guild.avatarURL)
                           .setDescription(`**Reason:** ${reason}\n**Warnings**: ${count}`)
                           .setColor('FF0000')
                           .setTimestamp();
}

String.prototype.replaceAll = function(search, replace)
{
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};