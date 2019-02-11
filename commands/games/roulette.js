const commando = require('discord.js-commando');
const yecoin = require("../../yecoin.json");

class roulette extends commando.Command
{
    constructor(client)
    {
        super(client,{
          name: 'roulette',
          group: 'games',
          memberName: 'roulette',
          description: 'plays a game of roulette, goodluck!'
        });
    }
//////Command Function

    async run(message, args)
    {
      let rnum = 0;
      //explin how to bet
      if(args == ""){
        message.reply("Welcome to roulette, use !roulette # to choose your number 0-36, including OO, the bet is always 5, winning gives 150");
        return;
      }
      if(yecoin[message.author.id].coin < 5){
        message.channel.reply("did you try not being poor?  Participate in the discord to earn more yeCoin");
        return;
      }
      //check to see if they made a bet
      if(!isNaN(args) && args < 37 && args >= 0 && yecoin[message.author.id].coin >= 5){
          rnum = Math.floor(Math.random() * 36);
          yecoin[message.author.id].coin -= 5;
          //win
        if(args == rnum){
          message.reply("Winner! wheel stopped on " + rnum);
          yecoin[message.author.id].coin += 150;
        }
        //loss
        else{
          message.reply("Sorry! It stopped on " + rnum + ", better luck next time.");
        }
      }
      else if(args == "OO" && yecoin[message.author.id].coin >= 5){
        rnum = Math.floor(Math.random() * 37);
        yecoin[message.author.id].coin -= 5;
        if(rnum == 37){
          message.reply("Winner! wheel stopped on OO");
          yecoin[message.author.id].coin += 150;
        }
        else{
          message.reply("Sorry! It stopped on " + rnum + ", better luck next time.");
        }
      }
      else{
        message.reply("Try guessing a number 0-36 or OO");
      }


    }
  }
  module.exports = roulette;
