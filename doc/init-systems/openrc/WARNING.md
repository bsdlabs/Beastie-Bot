# OPENRC IS NOT SUPPORTED!!!

OpenRC does not know how to stop or restart a NodeJS daemon. This script was
designed to run inside an Alpine Linux container where the bot repo was cloned
inside the cloud user's home directory.

You can use this service file to *start* the bot but it will **not** be able to stop
or restart. As a workaround, configure this service file to start on the default
runlevel and then use your container management tool to stop or restart it.

Please note that we do not support or maintain this OpenRC file. It was only
provided as an example.
