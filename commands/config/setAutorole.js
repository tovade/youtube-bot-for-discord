const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: "setautorole",
    description: "gives a role to someone upon joining",
    category: "config",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES"))
        return message.channel.send('You need MANAGE ROLES permission!')

        let role = message.mentions.roles.first()
        if(!role) {
            return message.channel.send('Mention a role first please thank you!')
        }
        db.set(`autoRole_${message.guild.id}`, role)
        message.channel.send(`Succes!`)
    }
}