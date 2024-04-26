# Deploying Beastie Bot on FreeBSD

FreeBSD deployment is a little more complicated than Systemd on Linux. NodeJS
services will start up correctly but can not stop or restart. If anyone has a
workaround for this, please get in contact with us.

**Run this in a jail!!!**

## Disclaimer

This guide is for configuring the init system only. You should have already...

- Set up the PostgreSQL server, including the `postgres` user and `beastiebot`
  database
- Installed NodeJS and NPM
- Cloned Beastie Bot's repo
- Ran `npm install` to install the required dependencies

## Step 1: Editing the service file

These files were taken from a classic jail running FreeBSD 14.0-Release. Bot
files were cloned to the home directory of the unprivileged `beastie` user.

Make sure you change the following lines to match your setup:

- Change the `command=` line in `beastiebot`
- Change the `cd` line in `start`
- Change the `su` user in `start`

## Step 2: Copying the service file

The specific path depends on where you cloned the bot files. In general, you
will need to symlink the service file to the correct directory. The command
should look similar to this:

```sh
ln -s /home/beastie/Beastie-Bot/doc/init-systems/freebsd/beastiebot \
/etc/rc.d/beastiebot`
```

## Step 3: Run the service file

1. Run the bot: `service beastiebot start`
2. Automatically run the bot on startup: `sysrc beastiebot_enable="YES"`

**NOTE**: FreeBSD is unable to stop or restart the service. Both
`service beastiebot stop` and `service beastie restart` will stall for a few
seconds and then display and error. You should ***stop/restart the entire
jail*** instead of using the `service` command.

## Step 4: Done!

See? That wasn't so hard :3

