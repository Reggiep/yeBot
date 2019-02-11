const commando = require('discord.js-commando');

class LeaveChannelCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
          name: 'leave',
          group: 'music',
          memberName: 'leave',
          description: 'leaves your voice channel'
        });
    }

    async run(message, args)
    {

      if (message.guild.voiceConnection)
      {
        message.member.guild.voiceConnection.disconnect();
      }
      else
      {
          message.reply("I'm not even in one.");
      }

    }
  }
module.exports = LeaveChannelCommand;
