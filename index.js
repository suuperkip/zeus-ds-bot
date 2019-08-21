const Discord = require('discord.js');
const settings = require('./settings.json');
const fs = require('fs');
const fetch = require('snekfetch');
const client = new Discord.Client();

client.commands = new Discord.Collection();

//#region Commands

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.config.name, command);
}

//#endregion



client.on('message', function(msg){
  if(msg.author.bot) return;
    if (msg.content === "SSS"){
        return msg.channel.send("Claudia SSSSSSt er op los!")
    }
    if (msg.content.toLowerCase() === "no u"){
      return msg.channel.send("no u")
    }

    const prefix = settings.prefix;
    if (!msg.content.startsWith(`${prefix}`) || msg.author.bot) return;

    const args = msg.content
      .toLowerCase()
      .slice(1)
      .split(' ');
    const command = args[0];
    //console.log(command);
    try {
      client.commands.get(command).execute(client, msg, args);
    } catch (error) {
      console.log(error);
      msg.channel.send('Command not found!');
    }
});



// blacklisted words

client.on('message', async message => {
  if(message.author.bot) return;

  let blacklisted = ['gey','gee','gay','gei','g33','g3e','ge3'];
  let foundInText = false;
  for (var i in blacklisted){
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }
  if (foundInText){
    message.delete();
  }
})

//

client.on('ready', function(){
    console.log('Botke is klaar!');
    client.user.setActivity('SEND HELP aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah', {type: "playing"});
});

client.login(process.env.BOT_TOKEN);
