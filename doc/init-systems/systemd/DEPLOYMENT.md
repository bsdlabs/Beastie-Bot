# Deploying Beastie Bot on Systemd

Systemd is the recommended way to deploy Beastie Bot on a Linux container or
host. This is also the method used to run the bot on the FreeBSD Discord server.
Systemd has the full support of the development team.

## Disclaimer

This guide is for configuring Systemd only. You should have already...

- Set up the PostgreSQL server, including the `postgres` user and `beastiebot`
  database
- Installed NodeJS and NPM
- Cloned Beastie Bot's repo
- Ran `npm install` to install the required dependencies

## Step 1: Editing the service file

The `beastiebot.service` file was taken from a production container running Arch
Linux. Because of this, you may have to change the `USER` and `WorkingDirectory`
lines to match your setup.

## Step 2: Copying the service file

Consult your distro's documentation and make a symlink to the correct service
file directory. On Arch Linux, the command looks like this:

```sh
ln -s /home/arch/Beastie-Bot/doc/init-systems/systemd/beastiebot.service \
/usr/lib/systemd/system/beastiebot.service`
```

## Step 3: Run the service file

These steps should be the same across all Systemd-based distros

1. Reload the daemon to detect the new service file: `systemctl daemon-reload`
2. Start and keep the service running: `systemctl enable --now beastiebot`
3. Check for errors: `systemctl status beastiebot`

## Step 4: Done!

See? That wasn't so hard :3

