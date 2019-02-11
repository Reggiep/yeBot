const commando = require('discord.js-commando');
const yecoin = require("../../yecoin.json");
let gameover;
let bet;
let dealer =[];
let player =[];

/////Function because I'm going to use both multiple times!
function Draw(){
var  tempcard = Math.floor(Math.random() * 13) + 2;
  if(tempcard > 11){
    tempcard = 10;
  }
    return tempcard;
}

function Sum(array){
  var sum = 0;
  for(var k = 0; k < array.length; k++){
    sum += array[k];
    }
  return sum;
}
//////////////////////////

class blackjack extends commando.Command
{
    constructor(client)
    {
        super(client,{
          name: 'blackjack',
          group: 'games',
          memberName: 'blackjack',
          description: 'plays a game of blackjack, goodluck!'
        });
    }
//////Command Function
    async run(message, args)
    {
      let i = 0;
      let j = 0;
      let k = 0;
      let tempcard = 0;
      let sump = 0;
      let sumd = 0;
      //explain how to make a bet if no argument is made
      if(args == " "){
        message.channel.reply("Use $blackjack # to place a bet, then $blackjack hit and $blackjack stay to play!");
      }
////start a new game if argument is a number
      if(yecoin[message.author.id].coin < args){
        message.channel.reply("did you try not being poor?  Participate in the discord to earn more yeCoin");
        return;
      }
      if(!isNaN(args) && yecoin[message.author.id].coin >= args){
         yecoin[message.author.id].coin -= args;
         bet = args;
         gameover = false;
         dealer.length = 0;
         player.length = 0;
         //dealer1
         dealer[0] = Draw();
         //player1
         player[0] = Draw();
         //player 2
         player[1] = Draw();
      }

    ////If player wants to hit
      if(args == "hit"){
        player[player.length] = Draw();
      }
    ////If player wants to stay, dealer draws until at least 17
      if(args == "stay"){
          while(sumd <17){
            sumd = 0;
            dealer[dealer.length] = Draw();
              sumd = Sum(dealer);
          }
          sump = Sum(player);
//          message.reply("sumd = " + sumd + "sump = " + sump);
          ////and checks to see who won
          if(sump > sumd){
            message.reply("Wins! doubled your yeCoin bet!");
            yecoin[message.author.id].coin += bet + bet;
            gameover = true;
          }
          else if(sumd > 21){
            message.reply("Wins! doubled your yeCoin bet!");
            yecoin[message.author.id].coin += bet + bet;
            gameover = true;
          }
          else if(sump == sumd){
            message.channel.send("Push, close one");
            gameover = true;
          }
          else{
            message.channel.send("ye wins..");
            gameover = true;
          }
      }
      ////Calculate dealer and player sums
      sumd = 0;
      sumd = Sum(dealer);
      sump = 0;
      sump = Sum(player);
/////check to see if the game is over
      if(sump == 21 && player.length == 2){
        ////blackjack
        message.reply("Blackjack! 3x your yeCoin bet!");
        yecoin[message.author.id].coin += bet + bet + bet;
        gameover = true;
      }
      else if(sump > 21){
        ////if player has an ace reduce it's value to 1
        if(player.includes(11)){
          player[player.indexOf(11)] = 1;
        }
        ////if not they Bust
        else{
          message.reply("Busted.");
          gameover = true;
        }
      }
      //  message.reply(dealer + sump + sumd + player + dealer.length + player.length);
        message.reply("Dealer has " + dealer + ", for sum of " + sumd);
        message.reply("Player has " + player + ", for sum of " + sump);
        if(gameover == false){
          message.channel.send("use $blackjack hit or $blackjack stay to continue");
        }

    }




}

module.exports = blackjack;
