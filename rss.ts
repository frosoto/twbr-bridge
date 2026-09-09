// import discord.js
import { ChannelManager, Client, EmbedBuilder, Events, GatewayIntentBits, Message, Partials, TextChannel, ActivityType, ButtonStyle, ButtonBuilder, Options } from "discord.js";

// create a new Client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Partials.Channel, 
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
});
// listen for the client to be ready
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// login with the token from .env.local
client.login(process.env.TOKEN)