const Discord = require('discord.js');
const client = new Discord.Client();
      client.db = require('./util/pg');
      client.warn = require('./util/warningHandler');

require('./util/eventLoader')(client);

run();

async function run() {
    let res = await client.db(`select * from settings`);
    client.settings = res[0];
    client.login(client.settings.token);
}

// Query


// create table settings(token text, prefix text, owner_id varchar(30), colour text);
// create table admins(user_id varchar(30), dms boolean, filters boolean);
// create table warnings(user_id varchar(30), id bigint, guild_id varchar(30), mod_id varchar(30), reason text, time timestamp);

/* 
guild_id | id | user_id | reason | time | mod_id
----------+----+---------+--------+------+-------- */