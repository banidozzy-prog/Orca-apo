module.exports = {
    log: (message) => {
        console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
    },
    error: (message) => {
        console.error(`[${new Date().toLocaleTimeString()}] ERRO: ${message}`);
    }
};
