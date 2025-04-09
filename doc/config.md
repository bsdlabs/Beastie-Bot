# config.js Explanation

## Creation

To begin, clone the `:/config-example.json` file into `:/config.js` file. Now open it up in your preferred text editor. See the information below to explain each field and what it does.

## Token (`token`)

The token is a string that contains the bot API key. You can find this on the [Discord Developer Portal][0]. Once the new application is made, you can generate the token under the Bot tab.

A token looks like a long alphanumerical hash.

## Client ID (`clientId`)

The client ID is the same as the application ID. You can find this on the [Discord Developer Portal][0]. Once the new application is made, you can copy the application ID from the General Information tab or client ID from the OAuth2 tab. **Both of these will be the same number, just pick a place.**

A client/application ID looks like a big integer.

## Client Secret (`clientSecret`)

The client secret lets the bot log into Discord. You can find this on the [Discord Developer Portal][0]. Once the new application is made, you can copy the client secret from the OAuth2 tab.

A client secret field looks like a small alphanumerical hash.

# Guild ID (`guildId`)

This is the Guild ID of the Discord server in which the bot is being installed. From your Discord client, [enable developer mode][1] and then right click on the server icon. Click `Copy Server ID` and paste it here.

A guild ID field looks like a big integer.

## Log Channel ID (`logChannelID`)

This is the ID of the channel where the bot will write server logs. From your Discord client, [enable developer mode][1] and then create or locate the channel where logs will be written. Right click on the channel name. Click `Copy Channel ID` and paste it here.

A channel ID field looks like a big integer.

## Repo (`repo`)

Repo contains information about the repository. This is mainly used by the `/sourcecode` command.

### Repo: Link (`repo.link`)

This is a link to the repository where the source code lives. I hope you can figure out what this is and where to find it. You wouldn't have access to this file if you didn't already know where it is.

The repo link field is a typical URL.

### Repo: Icon (`repo.icon`)

This is a link to an image which is used for some messages in the logs channel. I recommend using the link the bot's icon. You can find this on the [Discord Developer Portal][0]. Once the new application is made, set the icon and copy the link to it.

The repo icon field is a typical URL.

## Info (`info`)

Info contains information referenced by informational commands (found under `:/commands/info`).

### Info: Rules (`info.rules`)

This is a link to the FreeBSD Wiki where it talks about the rules for the Discord server.

The rules field is a typical URL.

### Info: Helpers (`info.helpers`)

This is a link to the FreeBSD Wiki where it talks about the FreeBSD Community Helpers.

The helpers field is a typical URL.

## Deploy Commands (`deployCommands`)

Used by `:/init/deployCommands` to store cached information.

### Deploy Commands: Command Cache Path (`deployCommands.commandCachePath`)

A file path to where the slash command cache will be stored. The file must end in `.json`.

The commandCachePath field looks like a file path and ends in `.json`

## PostgreSQL (`postgresql`)

PostgreSQL contains connection information for the PostgreSQL server.

### PostgreSQL: Address (`postgresql.address`)

This is the IP address of the PostgreSQL server. If it is running locally, you can use localhost.

The address field should comply with IPv4 standards.

### PostgreSQL: Port (`postgresql.port`)

This is the port number of the PostgreSQL server. The default port is `5432`.

The port field looks like an integer.

### PostgreSQL: Username (`postgresql.username`)

This is the username of the PostgreSQL account that the bot will use to execute queries.

The username field looks like a string.

### PostgreSQL: Password (`postgresql.password`)

This is the password of the PostgreSQL account that the bot will use to execute queries.

The password field looks like a string.

### PostgreSQL: Database Name (`postgresql.database_name`)

This is the name of the PostgreSQL database where the bot will execute queries.

The database field looks like a string.

## Logger (`logger`)

Logger contains settings used by the `:/events/logger.js` script. It stores information about messages in every channel.

### Logger: Table Name (`logger.tableName`)

This is the name of the table were the logger will store message history.

The table name field looks like a string.

### Logger: Max Records (`logger.maxRecords`)

This is the maximum number of messages that will be stored in the logger's table per channel per user.

The max records field is an integer.

## Antispam (`antispam`)

Antispam contains settings used by the `:/events/antispam.js` script.

### Antispam: Lock Table Name (`antispam.lockTableName`)

This is the name of the table where the antispam will store lock information. Locks are used to avoid users from being flagged if their database entries are currently being accessed/modified.

The lock table name field looks like a string.

### Antispam: Max Message Repeats (`antispam.maxMessageRepeats`)

This is the maximum number of messages that can have the same hash before triggering the antispam detection.

The max message repeats field is an integer.

### Antispam: Max Message Time Difference (`antispam.maxMessageTimeDifference`)

This is the maximum difference between user messages before triggering the antispam detection.

The max message time difference field is an integer.

### Antispam: Scan Delay Seconds (`antispam.scanDelaySeconds`)

This is the amount of time to wait before the antispam detection runs on a message. This is supposed to give other scripts time to process their events before it potentially gets deleted.

The scan delay seconds field is an integer.

### Antispam: Delete Delay Seconds (`antispam.deleteDelaySeconds`)

This is the amount of time to wait before antispam deletes all user messages referenced in the logger's table. This is supposed to give other scripts and bots time to process those messages before they get deleted.

The delete delay seconds field is an integer.

### Antispam: Member Timeout Minutes (`antispam.memberTimeoutMinutes`)

This is how long to time out a user after they trigger the antispam detection.

The member timeout minutes field is an integer.

### Antispam: Notified Role ID (`antispam.notifiedRoleId`)

This is the role to ping whenever antispam gets triggered against a user. This value should be long enough for a human to review and process the incident.

From your Discord client, [enable developer mode][1] and then open up the Discord server the bot is managing. Click on the server name in the top left and then click Server Settings. Click on the Roles tab. Right click on the role that should be pinged. Click `Copy Role ID` and paste it here.

The notified role ID field looks like an integer.

### Antispam: Protected Role IDs (`antispam.protectedRoleIds`)

These roles are immune from antispam detection. This should be reserved for moderators and other staff.

The protected role IDs field looks like an array of integers.

## Assignable Roles

These roles are able to be assigned to anybody who requests them via the `:/commands/utility/role.js` script. The `:/commands/utility/roles.js` script also references this information in order for users to view a list of self-assignable roles.

The assignable roles field should look like an array of objects in this format:

```json
{
    "name": "NAME_GOES_HERE",
    "description": "DESCRIPTION_GOES_HERE",
    "group": "GROUP_GOES_HERE",
    "hidden": false,
    "id": "ID_GOES_HERE"
}
```

See each subsection for how to set these fields.

### Assignable Roles: Name (`assignable_roles[].name`)

This is the name of the role *as it appears to the user*. It can vary from what Discord actually calls it. It is recommended to make sure the role name is as close as possible to the real role on Discord in order to avoid confusion. For example, the Discord role `Red` can be named as `red` in the bot but `color1` should be avoided since users will not know what that means.

The name field is a regular string.

### Assignable Roles: Description (`assignable_roles[].description`)

This is the description of the role as it will be shown to the user.

The description field is a regular string.

### Assignable Roles: Group (`assignable_roles[].group`)

This is the group the role belongs to. Only one role can be assigned from each group. If a user has a role from this group already assigned, it will be removed when the new one is added. This is useful for color roles where adding a second color can conflict with the first color.

The group field is a regular string.

### Assignable Roles: Hidden (`assignable_roles[].hidden`)

This determines if the role should appear in the assignable roles list. This is useful for having secret roles for people who are aware of them and for pranking people.

The hidden field is a boolean.

### Assignable Roles: ID (`assignable_roles[].id`)

From your Discord client, [enable developer mode][1] and then open up the Discord server the bot is managing. Click on the server name in the top left and then click `Server Settings`. Click on the `Roles` tab. Right click on the role that should be pinged. Click `Copy Role ID` and paste it here.

The role id field looks like an integer.

[0]: https://discord.com/developers/applications
[1]: https://www.howtogeek.com/714348/how-to-enable-or-disable-developer-mode-on-discord/
