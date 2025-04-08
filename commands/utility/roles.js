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
const { SlashCommandBuilder } = require('discord.js');
const { assignable_roles } = require("../../config.json");

// add a roles command that lists out all the assignable roles
module.exports = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Show available roles'),

  // this code runs when a user executes the command
  async execute(interaction) {
    // generate list
    let response = "# Self Assignable Roles\n";
    for (let i in assignable_roles) {
      if (!assignable_roles[i].hidden) {
        response += `- **${assignable_roles[i].name}**: ${assignable_roles[i].description}\n`;
      }
    }
    response += "*Use `/role <name>` to apply any role from this list.*\n";
    // respond to user interaction
    await interaction.reply({
      content: response,
      ephemeral: true
    });
  },
}
