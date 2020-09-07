const Discord = require('discord.js');
const db = require('quick.db') //i already installed quick.db 

module.exports = {
    name: "setwelcome",
    description: "Set the welcome channel",
    category: "config",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
        return message.channel.send('You need manage channels permissions')

        let channel = message.mentions.channels.first();
        if(!channel) {
            return message.channel.send('Please mention a channel!')
        } //quick.db time

        db.set(`Welcomechan_${message.guild.id}`, channel.id)
        message.channel.send('succes')
    }
}