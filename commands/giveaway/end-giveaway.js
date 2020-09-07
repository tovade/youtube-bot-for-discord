const ms = require('ms')
module.exports = {
    name: "endgiveaway",
    description: "end a giveaway simple",
    category: "giveaway",
    usage: "endgiveaway <id>",
    aliases: ["end"],
    run: async (client, message, args, color) => {
        if(!message.member.hasPermission('MANAGE_MESSAGE') && !message.member.roles.cache.some((r) => r.name === "giveaway manager")){
           return message.channel.send('you need the role giveaway manager or manage messages permissions to use this');
        }
        //since you need id you need a error message when no giveaway id was givin
        if(!args[0]){
            return message.channel.send('please give the id before ending');
        }
        //now we check if the giveaway exist
        let giveaway =
        client.GiveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        //search with the id
        client.GiveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        //if giveaway doesnt exist
        if(!giveaway){
            return message.channel.send('giveaway is not found!');
        }
        client.GiveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
        //when it worked
        .then(() => {
            message.channel.send('giveaway will end soon!');
        })
        .catch((e) => {
            if(e.startsWith(`giveaway has already ended`)){
                message.channel.send('this giveaway is already ended')
            } else {
                console.error(e);
                message.channel.send('an error was ocured');
            }
        });
    }
};