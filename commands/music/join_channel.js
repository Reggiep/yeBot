const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');
const yecoin = require("../../yecoin.json");



function Playsong(connection, message){
  var server = servers[message.guild.id];
  server.dipatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}))
  server.queue.shift();
  server.dipatcher.on("end", function(){
    if(server.queue[0]){
      Playsong(connection,message);
    }
    else{
      connection.disconnect();
    }
  });
}

class JoinChannelCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
          name: 'play',
          group: 'music',
          memberName: 'play',
          description: 'Joins your voice channel and plays the song'
        });
    }

    async run(message, args)
    {
      if(args == ""){
        message.reply("use $play Youtubelink to play a song! This costs 10 yeCoin");
        return;
      }
      else if(yecoin[message.author.id].coin < 10){
        message.channel.reply("did you try not being poor?  Participate in the discord to earn more yeCoin");
        return;
      }
      else{
        if(message.member.voiceChannel)
        {
          if (!message.guild.voiceConnection)
          {
            if(!servers[message.guild.id]){
              servers[message.guild.id] = {queue:[]}
            }
            message.member.voiceChannel.join()
                .then(connection =>{
                  var server = servers[message.guild.id];
                  message.reply("I'm in!");
                  //take their currency
                  yecoin[message.author.id].coin -= 10;
                  //put the argument link into the queue
                  server.queue.push(args);
                  //play the queue
                  Playsong(connection, message);
                })
              }
          else
          {
            message.reply("Failed, join a voice channel and try again");
          }
          }
        }
      }
  }
module.exports = JoinChannelCommand;
