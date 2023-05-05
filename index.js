const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = new Client({
    intents: [
      INTENTS,
    ],
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const { token } = require("./config.json");

/* LOAD SLASH COMMANDS */

readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./commands/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`[🟩 COMMAND] '${props.name}' loaded.`)

});

/* LOAD EVENTS */

readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });

console.log(`[🟩 EVENT] '${name}' loaded.`)

});

/* LOGIN CLIENT */

client.login(token).then(app => {
  console.log(`[🟩 BOT] Token login successful.`)
}).catch(app => {
  console.log(`[🟥 BOT] Token login failed.`)
})