/**
 * Copyright 2024 Jesper Schmitz Mouridsen and Cait Himes
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS”
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

const { Events, EmbedBuilder, UserFlags } = require('discord.js');
const { logChannelID, repo, suspiciousJoin } = require('../config.json');

// log suspicious joins to the log channel
async function logJoinToChannel(event, reasons) {
    event.client.channels.cache.get(logChannelID).send({
        embeds: [
            new EmbedBuilder()
                .setTitle(`Suspicious Join`)
                .setAuthor({
                    name: 'Beastie Bot',
                    iconURL: repo.icon,
                    url: repo.link
                })
                .setDescription(`A suspicious member has joined the server. This incident has been recorded in a backend database.`)
                .addFields(
                    { name: 'Log Reasons', value: reasons, inline: false },
                    { name: 'User ID', value: String(event.user.id), inline: true },
                    { name: 'User Username', value: String(event.user.username), inline: true },
                    { name: 'User Bot Bit', value: String(event.user.bot ? "Yes" : "No"), inline: true },
                    { name: 'User System Bit', value: String(event.user.system ? "Yes" : "No"), inline: true },
                    { name: 'User Partial Bit', value: String(event.user.partial ? "Yes" : "No"), inline: true },
                    { name: 'User Pending Bit', value: String(event.user.pending ? "Yes" : "No"), inline: true },
                    { name: 'User Join Timestamp', value: String(event.joinedTimestamp), inline: true },
                    { name: 'User Created Timestamp', value: String(event.user.createdTimestamp), inline: true },
                    { name: 'User Flag: ActiveDeveloper', value: event.user.flags.has(UserFlags.ActiveDeveloper) ? "Yes" : "No", inline: true },
                    { name: 'User Flag: Spammer', value: event.user.flags.has(UserFlags.Spammer) ? "Yes" : "No", inline: true },
                    { name: 'User Flag: Quarantined', value: event.user.flags.has(UserFlags.Quarantined) ? "Yes" : "No", inline: true }
                )
                .setTimestamp()
        ]
    });
}

// write user join to database backend
async function logJoinToDatabase(event) {
    // TODO: implement this
}

// log suspicious joins
module.exports = {
    name: Events.GuildMemberAdd,
    once: true,
    execute(event) {
        // is the user suspicious?
        let isSuspicious = false;
        let reasons = [];
        if ((event.joinedTimestamp - event.user.createdTimestamp) <= (suspiciousJoin.createToJoinDifferenceSeconds * 1000)) {
            // CASE: user account is too new
            isSuspicious = true;
            reasons.push("User account is newer than threshold.");
        }
        if (event.user.flags.has(UserFlags.Spammer)) {
            // CASE: Discord flagged the account as a spammer
            isSuspicious = true;
            reasons.push("Discord flagged the account as a spammer.");
        }
        if (event.user.flags.has(UserFlags.Spammer)) {
            // CASE: Discord quarantined the account
            isSuspicious = true;
            reasons.push("Discord quarantined the account.");
        }
        // log if suspicious
        if (isSuspicious) {
            logJoin(event, reasons.join(`\n`));
        }
    },
};
