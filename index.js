const { Collection, MessageEmbed } = require('discord.js')
const {prefix, token } = require("./config.json")
const fs = require('fs')
const Discord = require('discord.js')
const ms = require('ms')
const { GiveawaysManager } = require('discord-giveaways')
const client = new Discord.Client();
const db = require('quick.db')

//oops forgot some code we need to put here
//hi welcome back we are gonna create the handler today hope you enjoy : D

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on("ready", () => {
    console.log(`logged in as ${client.user.username}`)
})

client.GiveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountEvery: 5000, //updates count every 5 seconds
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "😃" //can be any emoji
    }
});

 client.on('guildMemberAdd', async member => {
     let wchannel = db.get(`Welcomechan_${member.guild.id}`)
     if(!wchannel) {
         return;
     }
     let autor = db.get(`autoRole_${member.guild.id}`)
     if(autor === null) return;
     const welBed = new MessageEmbed()
     .setTitle(`Welcome to ${member.guild.name}`)
     .setDescription(`Welcome ${member}`)
     member.roles.add(autor.id)
     client.channels.cache.get(wchannel).send(welBed)
 })

client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;

    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g); //i did n instead of m
    const cmd = args.shift().toLowerCase();

    //now get the command
    let command = client.commands.get(cmd);
    //if its not found now we do find it by alias
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command)
      command.run(client, message, args)
}); //now we done with index.js

client.login(token);
// i dint show what to install make sure to install fs, ascii-table and discord.js!!!!