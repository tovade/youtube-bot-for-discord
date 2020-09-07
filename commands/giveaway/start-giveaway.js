const ms = require('ms')
const { hostedBy, everyoneMention } = require('../../config.json');
const discord = require('discord.js')
module.exports = {
    name: "startgiveaway",
    description: "start a giveaway",
    category: "giveaways",
    run: async (client, message, args, color) => {

        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "giveaway manager")){
            return message.channel.send('you need manage messages permissions or giveaway manager role to start giveaways');
        }
        let giveawayChannel = message.mentions.channels.first();
        if(!giveawayChannel){
            return message.channel.send('mention a channel please');
        }
        let giveawayDuration = args[1];
        if(!giveawayDuration || isNaN(ms(giveawayDuration))){
            return message.channel.send('you need to specify a valid duration');
        }
        let giveawayNumberWinners = args[2];
        if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
            return message.channel.send('specify a number of winners');
        }
        let giveawayPrize = args.slice(3).join(' ');
        if(!giveawayPrize){
            return message.channel.send('you need to specify a prize');
        }

        //now we start the giveaway
        client.GiveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayNumberWinners,
            hostedBy: hostedBy ? message.author : null,
            messages: {
                giveaway: (everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 giveaway time 🎉🎉",
                giveawayEnded: (everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 giveaway ended 🎉🎉",
                timeRemaining: "time remaining {duration}",
                inviteToParticipate: "react with 🎉 to enter",
                winMessage: "congratulation {winners} you have won {prize}",
                embedFooter: "by tovade on  youtube!",
                noWinner: "no one joined so no giveaway",
                hostedBy: "hosted by {user}",
                winners: "winner(s)",
                endedAt: "ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false //not needed
                }
            }
        });
        message.channel.send(`giveaway started in ${giveawayChannel}`);
    }
};