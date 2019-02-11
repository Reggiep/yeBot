const Commando = require('discord.js-commando');
var auth = require('./auth.json');
const yecoin = require("./yecoin.json");
const fs = require("fs");
const bot = new Commando.Client({
  commandPrefix: '$',
  token: auth.token
});


//Tell the bot where the games commands are located
bot.registry.registerGroup('games', 'Games');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('function', 'Function');
bot.registry.registerCommandsIn(__dirname + "/commands");
bot.registry.registerDefaults();

global.servers = {};
//Lets the bot recieve messages
bot.on('message', function(message){

  ///Every message sent in the channel will add 1 yeCoin to the user, this is stored in a json file in the project.
  if(!yecoin[message.author.id]){
    yecoin[message.author.id] = {
    coin: 0
   };
  }
  yecoin[message.author.id].coin ++;
  fs.writeFile("./yecoin.json", JSON.stringify(yecoin), (err) =>{
    if(err){
      console.log(err);
    }
  });
})

bot.login(auth.token);



///Bot require FFMPEG/FFMPEGbinaries to run the music application

// Link to install
//    https://discordapp.com/oauth2/authorize?&client_id=542416964614619137&scope=bot&permissions=8
