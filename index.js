const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const token = process.env.TOKEN;
const PREFIX = "!";

var servers = {};


bot.on('ready', () => {
    console.log('Bot is online !!!');
});


bot.on('message', (message)=>{
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'play':
            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else{
                        connection.disconnect();
                    }
                });
            }
            if(!args[1]){
                message.reply("You need to provide a link");                
            }
            if(!message.member.voice.channel){
                message.channel.send("Must be in a voice channel");
                break;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue:[]
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

                        
            if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
                play(connection, message);
            })
            break;
        case 'dc':
            if(message.guild.voice.connection){ 
                message.reply("Ima remember that");
                message.guild.voice.connection.disconnect();                
            }
            break;            
        case 'shanu':            
            message.channel.send('My best friend <3');
            break;
        case 'bindi':
            message.channel.send('Coolest person');
            break;
        case 'melisa':
            message.channel.send('is a cutie');
            break;
        case 'goran':
            message.channel.send('point GOD');
            break;
        case 'clear':
            if(!args[1]) return message.reply("Specify amount of messages to delete");
            message.channel.bulkDelete(args[1]);
            break;
        case 'hello':
            message.react('😃')
            .then(message.reply(`Wattap`))
            .catch(console.error);
            break;
        case 'invite':
            message.channel.createInvite()
            .then(invite => message.channel.send(`Created an invite with a code of ${invite.code}`))
            .catch(console.error);
            break;
    }   
})

bot.login(token);