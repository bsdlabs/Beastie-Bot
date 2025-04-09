# BeastieBot

This is a bot for managing the FreeBSD Discord server.

## Documentation

High level documentation can be found inside `:/doc`. Code comments are provided in each file to explain each section of code from a lower level. **Read the high level documentation first before reading the code. It will help a lot.**

Here are some helpful links for developers:
- [Discord.JS Framework][2]
- [Discord Developer Documentation][3]

## Deployment

Deployment documentation can be found inside `:/doc/init-systems/SYSTEM/` along with example config files for the chosen init system. `SYSTEM` is the name of the init system being used. For `freebsd`, the execution environment is assumed to be a FreeBSD system. Both `openrc` and `systemd` are assumed to be on a Linux system. 

## Support

Feel free to reach out to the infrastructure team if you need help with the bot or want to contribute. You can find them on [the FreeBSD Discord server][1].

## License

All BeastieBot code is licensed under the BSD 3-Clause license unless explicitly stated elsewhere.

The unmodified code in `:/db.js` is licensed under MIT by the [node-postgres][0] project. Modifications are by BSDLabs (us).

[0]: https://node-postgres.com/
[1]: https://wiki.freebsd.org/Discord/DiscordServer
[2]: https://discordjs.guide/
[3]: https://discord.com/developers/docs/intro
