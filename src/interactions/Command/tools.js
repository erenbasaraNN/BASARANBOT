const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools')
        .setDescription('Use some cool tools')
        .addSubcommand(subcommand =>
            subcommand
                .setName('button')
                .setDescription('Create a button')
                .addStringOption(option => option.setName('url').setDescription('The url for the button').setRequired(true))
                .addStringOption(option => option.setName('text').setDescription('The text for the button').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pwdgen')
                .setDescription('Generate a password')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('qrcode')
                .setDescription('Sends a qrcode photo of text you have given')
                .addStringOption(option => option.setName('text').setDescription('The text you want to convert').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('sourcebin')
                .setDescription('Upload code to source bin')
                .addStringOption(option => option.setName('language').setDescription('The language of your code').setRequired(true))
                .addStringOption(option => option.setName('code').setDescription('Your code').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('url')
                .setDescription('Make a shortend url')
                .addStringOption(option => option.setName('site').setDescription('The link to the website').setRequired(true))
                .addStringOption(option => option.setName('code').setDescription('The code for the url').setRequired(true))
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};

