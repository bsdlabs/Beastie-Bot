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

const { Events, time } = require('discord.js');
const { query } = require('../db.js');
const { createHash } = require('crypto');
const { logger } = require('../config.json');

async function insertMessage(channelID, userID, messageID, messageHash, timestamp) {
    // TODO: implement this
    console.log(`[INFO] Logger: Logging message with following data [${channelID}, ${userID}, ${messageID}, ${messageHash}, ${timestamp}]`);
    // Ensure the table exists
    await query(
        'CREATE TABLE IF NOT EXISTS $1 (CHANNEL_ID TEXT NOT NULL, AUTHOR_ID TEXT NOT NULL, MESSAGE_ID TEXT NOT NULL, MESSAGE_HASH TEXT NOT NULL, TIMESTAMP INTEGER NOT NULL);',
        [logger.tableName]
    ).catch((reason) => {
        console.error(`[ERROR] Logger: Failed to create "${logger.tableName}" table. Error: ${reason}`);
    });
    // Write entry into table
    await query(
        'INSERT INTO $1 VALUES ($2, $3, $4, $5, $6);',
        [logger.tableName, channelID, userID, messageID, messageHash, timestamp]
    ).catch((reason) => {
        console.error(
            `[ERROR] Logger: Failed to log message.
                \tTable data:
                    \t\tChannel ID:   ${channelID},
                    \t\tUser ID:      ${userID},
                    \t\tMessage ID:   ${messageID},
                    \t\tMessage Hash: ${messageHash},
                    \t\tTimestamp:    ${timestamp}
                \tError:
                    \t\t${reason}`
        );
    });
}

// log all messages
module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        console.log(`Message created: ${JSON.stringify(message)}}\n\n\n`);
        insertMessage(message.channelId, message.author.id, message.id, createHash('sha512').update(message.content).digest('hex'), message.createdTimestamp);
    }
};