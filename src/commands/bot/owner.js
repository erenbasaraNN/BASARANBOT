const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Owner name",
            value: `Eren Başaran`,
            inline: true,
        },
        {
            name: "🏷┆Discord tag",
            value: `</erenbasaran>`,
            inline: true,
        },
        {
            name: "🏢┆Organization",
            value: `ERN`,
            inline: true,
        },
        {
            name: "🌐┆Website",
            value: `[https://erenbasaran.com.tr](https://erenbasaran.com.tr)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

