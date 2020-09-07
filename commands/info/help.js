const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "help",
    description: "get my Commands!!",
    category: "info",
    run: async (client, message, args) => {
        if (args[0]) {
            const command = await client.commands.get(args[0]);
            if(!command) {
                return message.channel.send("unknown command: " + args[0]);
            }
            let embed = new MessageEmbed()
            .setAuthor(command.name, client.user.displayAvatarURL())
            .addField("description", command.description || "not provided:(")
            .addField("usage", "`" + command.usage + "`" || "not provided")
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("GREEN")
            return message.channel.send(embed)
        } else {
            const commands = await client.commands;
            let emx = new MessageEmbed()
            .setDescription("These are my commands!")
            .setColor("GREEN")
            .setFooter(client.user.username, client.user.displayAvatarURL());
            let com = {};
            for (let comm of commands.array()) {
                let category = comm.category || "none";
                let name = comm.name;

                if(!com[category]) {
                    com[category] = [];
                }
                com[category].push(name);
            }
            for(const [key, value] of Object.entries(com)) {
                let category = key;
                let desc = "`" + value.join("`, `") + "`";
                emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
            }
            return message.channel.send(emx)
        }
    }
}