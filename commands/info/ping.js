module.exports = {
    name: "ping",
    category: "info",
    description: "get latency from the bot",
    run: async (client, message, args) => {
        message.channel.send(`pong ${client.ws.ping}`)
    }
}