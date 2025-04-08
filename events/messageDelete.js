/**
 * Copyright 2025 Jesper Schmitz Mouridsen and Cait Himes
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

// import required modules
const { Events, EmbedBuilder } = require('discord.js');
const { logChannelID, repo } = require('../config.json');

// log message deletions
module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        // do not process bot messages
        if (message.author.id == message.client.user.id) {
            return;
        }
        // log deletion
        message.client.channels.cache.get(logChannelID).send({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Message Deletion`)
                    .setAuthor({
                        name: 'Beastie Bot',
                        iconURL: repo.icon,
                        url: repo.link
                    })
                    .setDescription(`> ${message.content}`)
                    .addFields(
                        { name: 'Author ID', value: String(message.author.id), inline: true },
                        { name: 'Author Username', value: String(message.author.username), inline: true },
                        { name: 'Old Message ID', value: String(message.id), inline: true },
                        { name: 'Newest Timestamp', value: String(message.editedTimestamp ? message.editedTimestamp : message.createdTimestamp), inline: true }
                    )
                    .setTimestamp()
            ]
        });
    },
};
