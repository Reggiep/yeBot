const commando = require('discord.js-commando');

class ye extends commando.Command
{
    constructor(client)
    {
        super(client,{
          name: 'ye',
          group: 'function',
          memberName: 'ye',
          description: 'Shortform of $help'
        });
    }
//////Command Function
  // Generic Help function - Lists commands, there is also a defalt $help included with commando
    async run(message, args)
    {

        message.channel.sendMessage('Hi ' + message.author +', Try to start a game of $blackjack, $roulette or $play to spend your yeCoin!');
    }
  }
  module.exports = ye;
