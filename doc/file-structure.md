# File Structure

## :/

This directory contains most of the essential files. An explanation of each file is found below.

- `.gitignore`: Ignores useless files and those generated at build/runtime.
- `command-cache.json`: Stores the JSON data sent to Discord about available slash commands. Delete this to resend all commands.
- `config-example.json`: A demonstration of a config file. See `:/doc/config.md` for more information on how to configure the bot.
- `config.json`: The real config file used by the bot at runtime.
- `db.js`: The PostgreSQL driver used by many parts of the codebase.
- `index.js`: The entrypoint for the bot source code. It manages the initialization and loading of modules.
- `LICENSE`: The software license of the bot.
- `package-lock.json`: Stores information about node modules currently installed.
- `package.json`: Stores package and dependency information about the bot.
- `README.md`: General information about the repository.

## :/commands

This directory stores all bot slash commands. There are different subdirectories here for different types of commands. This directory split has no effect on the bot at runtime. It is purely a visual split for better code organization.

### :/commands/info

This directory stores all informational commands. These commands **do not** change anything on the Discord server and only provide general information to the command sender as they request it.

### :/commands/utility

This directory stores utility commands. These commands **do** change things on the Discord server such as a user's roles.

## :/doc

This directory stores all documentation about how the bot works. These documents provide high level overviews to complement the code comments in each JS file.

See the subdirectory, `:/doc/init-systems` for information on how to set up the bot for use with different init systems.

## :/events

This directory stores scripts for processing Discord events. A Discord event is anything that causes the server to change state, such as a user sending/editing/deleting a message. Most of the event-based scripts are for moderation since they can validate server activity as things happen.

## :/init

This directory stores initialization scripts. These are the **first** scripts to load and execute when the bot is started and they run **before** the Discord bot library is initialized. This is where maintenance tasks or environmental configuration scripts should go.

See `:/doc/control-flow.md` for more information on how the bot code ties together.

## :/node-modules

This directory contains dependencies for the bot. Everything in this directory can be ignored.
