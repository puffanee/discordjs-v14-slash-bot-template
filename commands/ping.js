const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping", // Command name
  description: "Check bot ping.", // Command description
  type: 1, // https://discord.com/developers/docs/interactions/application-commands
  options: [], // https://discord.com/developers/docs/interactions/application-commands
  dm_permission: false, // Does it work in DM messages?

  run: async(client, interaction) => {
    await interaction.deferReply(); // Send loading message

    interaction.editReply(`:ping_pong: Pong! Client Ping: ${client.ws.ping}ms`);
  }

};