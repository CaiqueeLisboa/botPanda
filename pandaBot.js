const Discord = require('discord.js');
const bot =  new Discord.Client();
const ytdl = require('ytdl-core');

/*Aqui estão as configurações do streaming de musica*/
const streamOptions = {seek: 0, volume: 1};

const token = 'aqui vai o token do bot';
bot.login(token);

/*Aqui você inicia o bot */
bot.on('ready', () => {
    console.log('Estou pronto');

})
/*bot recebe mensage */
bot.on('message', msg => {
    /*Caso a mensagem for do próprio bot nada acontece */
    if (msg.author.bot) {
        return;
    }

    /*Se o bot ver uma mensagem iniciada com o emoji "👀" ele responde o emoji "👀"*/
    if (msg.content.startsWith("👀")){
        msg.channel.send("👀");
    }  

    /*Se o bot ver uma mensagem iniciada com o emoji "🫂"(people hugging) ele responde o emoji "🫂"(people hugging) */
    if (msg.content.startsWith("🫂")){
        msg.channel.send("🫂");
    }  

    /*Se o bot ver uma mensagem iniciada em "pipoca" ele responde "Você disse "pipoca?"*/
    if (msg.content.toLocaleLowerCase().startsWith("pipoca")){
        msg.channel.send('Você disse pipoca?');
    }  

    /*Se o bot ver uma mensagem iniciada em "bom dia" ele responde "Bom Dia"*/
    if (msg.content.toLocaleLowerCase().startsWith("bom dia")){
        msg.channel.send('Bom Dia');
    }  

    /*Se o bot ver uma mensagem iniciada em "boa tarde" ele responde "Boa Tarde"*/
    if (msg.content.toLocaleLowerCase().startsWith("boa tarde")){
        msg.channel.send('Boa Tarde');
    }  

    /*Se o bot ver uma mensagem iniciada em "boa noite" ele responde "boa noite"*/
    if (msg.content.toLocaleLowerCase().startsWith("boa noite")){
        msg.channel.send('Boa Noite');
    }  

    /*Se o bot ver a mensagem "?Play" ele responde "som na caixa dj" e toca uma música pré definida*/
    if (msg.content.toLowerCase().startsWith("?play")){
        msg.channel.send('Som na caixa DJ!!!');

        /*variavel que recebe o canal de voz do discord*/
        let VoiceChannel = msg.guild.channels.cache.find( channel => channel.id === 'Aqui vai o id do canal');

        /*Verifica se existe um canal de voz*/
        if (VoiceChannel == null) {
            console.log('Canal não foi encontrado!');
        }

        /*Se o bot encontra o canal de voz ele continua*/
        if (VoiceChannel != null) {
            console.log('Canal encontrado!');
            
            /*Bot entra no canal de voz*/
            VoiceChannel.join()
            .then(connection => {
                /*Musica que o bot vai tocar*/
                const stream = ytdl('https://www.youtube.com/watch?v=XZZe2gS3mNY&ab_channel=1981markku',
                {filtrer: 'audioonly'});

                /*Bot cota a musica que está na constante "stream" com as opções que estão na constante "stramOptions"*/
                const DJ = connection.play(stream, streamOptions);
                /*Quando o bot termina a música ele sai do canal*/
                DJ.on('end', end => {
                    VoiceChannel.leave();
                });
            })
            .catch(console.error);
        }
    }
})