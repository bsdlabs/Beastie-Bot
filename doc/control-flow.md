# Control Flow

This file breaks down how each part of the bot code interacts with each other.

## Initialization

When the bot loads using `node start`, it calls `index.js` for initialization. It first scans the `init` directory and executes the main method of each JS file found in that directory. This is where the bot sends the slash commands to Discord and other initialization tasks can be added later.

After the init scripts are finished executing, the bot creates a Discord client instance and starts registering commands and events. Each subdirectory under `:/commands` is checked for JS files and they are added to the collection of slash commands, provided that the JS file contains all required fields. The events directory is then checked for JS files containing event hooks and they are registered to execute when those events are received.

After all command and event scripts are loaded, the bot logs into Discord and begins the main loop.

## Main Loop

The entire bot is based on events. If a slash command is executed by a user, the bot receives that command and executes the script associated with that command. Each command may contain its own logic for extra features such as database processing and/or autocomplete for command options. Other events are based on changes to the server, such as a user sending/editing/deleting messages. The bot will execute the entrypoint for that event processing script.

Generally speaking, all commands are named after the actual command seen in the Discord. For example, the `/helpers` command is found inside the `helpers.js` file. Likewise, the `messageDelete` event is processed by a script called `messageDelete.js`. Some features like antispam and message logging break this convention to clarify what can be found inside as these scripts are far more complex.

## Database Operations

Some modules use a PostgreSQL backend. The driver for the database is found in `:/db.js`. Each time a command or event needs to use the database, it makes a new connection to the database and executes the necessary queries.

## Summary

That is all. The bot just loads script files from different directories and then calls their entrypoints as needed. Additional behavior can be added by placing additional script files in the appropriate directory. Likewise, behaviors can be removed by deleting the associated script files.
