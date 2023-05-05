const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { ActivityType } = require("discord.js");
const config = require("../config.json");

module.exports = async (client) => {

  const rest = new REST({ version: "10" }).setToken(config.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }

    console.log(`[🟩] ${client.user.tag} Active! ❤️`);
    const acType = config.activityType;
	client.user.setPresence({
		activities: [{ name: config.activityName, type: ActivityType.acType }],
		status: config.activityStatus,
	});
  console.log(`[🟩] ${client.user.tag} status is set to [{ name: ${config.activityName}, type: ActivityType.${config.activityType}, status: ${config.activityStatus} }]`);

};