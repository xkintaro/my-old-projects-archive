module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot hazır: ${client.user.tag}`);
    }
};
