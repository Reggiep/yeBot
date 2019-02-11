const commando = require('discord.js-commando');
const yecoin = require("../../yecoin.json");

class coin extends commando.Command
{
    constructor(client)
    {
        super(client,{
          name: 'coin',
          group: 'function',
          memberName: 'coin',
          description: 'Check your yeCoin balance'
        });
    }
//////Command Function
  ////Displays how many yeCoin the asker currently has
    async run(message, args)
    {
      message.reply("you currently have " + yecoin[message.author.id].coin.toString() + " yeCoin, you can play games or music with it!");

    }
  }
  module.exports = coin;
