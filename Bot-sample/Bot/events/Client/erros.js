
module.exports = {
    name: 'erros',
    async execute(client) {
        client.on('unhandledRejection', error => {
            console.error('Unhandled promise rejection:', error);
        });
    }
}