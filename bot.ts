// import discord.js
import { ChannelManager, Client, EmbedBuilder, Events, GatewayIntentBits, Message, Partials, TextChannel, ActivityType, ButtonStyle, ButtonBuilder, Options } from "discord.js";
function rng(floor: number, ceiling: number) {
    return (Math.floor(Math.random() * (ceiling + 1 - floor)) + floor)
}

async function respond(
    msg: Message,
    content: unknown,
    reply = false,
    pings: unknown = []
): Promise<void> {
    const fallbackText = "HELP HELP HELP !~!!";
    let newContent: string;
    try {
        newContent = String(content ?? fallbackText)
            .replace(/(?<=\b\w+)ing\b/g, "ong")
            .replace(/thong/g, "thing")
            .slice(0, 115);
        if (!newContent.trim()) {
            newContent = fallbackText;
        }
    } catch (err) {
        console.error("uh ohh:", err);
        newContent = fallbackText;
    }
    const validPings = Array.isArray(pings)
        ? pings.filter(
            (id): id is string =>
                typeof id === "string" && /^\d{17,20}$/.test(id)
        )
        : [];
    const payload = {
        content: newContent,
        allowedMentions: validPings.length > 0
            ? { users: validPings }
            : { parse: [] as never[] }
    };
    try {
        if (rng(1, 50) === 42 && payload.content.startsWith("?") && typeof msg.reply === "function") {
            await msg.reply({
                content: "im so sorry but the response i shouldve sent died in a car crash",
                allowedMentions: { parse: [] }
            });
            return;
        }

        if (reply && typeof msg.reply === "function") {
            await msg.reply(payload);
            return;
        }
        if (msg.channel && typeof msg.channel.send === "function") {
            await msg.channel.send(payload);
            return;
        }
        if (typeof msg.reply === "function") {
            await msg.reply({
                content: fallbackText,
                allowedMentions: { parse: [] }
            });
        }
    } catch (err) {
        console.error("uh oh:", err);
        try {
            if (typeof msg.reply === "function") {
                await msg.reply({
                    content: fallbackText,
                    allowedMentions: { parse: [] }
                });
            }
        } catch (fallbackErr) {
            console.error("Fallback response also failed:", fallbackErr);
        }
    }
}
function jabber(msg: Message, amnt: number) {
    respond(msg, gibberish("../assets/text/vocabulary.md", amnt).slice(0,1999), false, ["1244108884277465131"])
}

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

client.on("messageCreate", async msg => {
    const args = msg.content.split(' ')
    let content = msg.content.trim()
    content = content.replace(/epstein/g, "███████")
    content = `[${msg.author.displayName}]: ` + content
    if (msg.channelId === "1224889071885881425") { // brook
	content.replace("[", "[💧")
    } else if (msg.channelId === "1503871789737181384") { // tangerine
	content.replace("[","[🍊")
    }

    if (msg.channelId === "1224889071885881425" && msg.author != client.user) {
        if (msg.attachments.at(0) != null) {
            ( client.channels.cache.get("1503871789737181384") as TextChannel).send({
                content: `[${msg.author.displayName}]: ${content}`,
                files: [msg.attachments.at(0)?.url]
            })
            console.log("hee hee haw")
        } else {
            ( client.channels.cache.get("1503871789737181384") as TextChannel).send("[" + msg.author.displayName + "]: " + content)
        }
    } else if (msg.channelId === "1503871789737181384" && msg.author != client.user) {
        if (msg.attachments.at(0) != null) {
            ( client.channels.cache.get("1224889071885881425") as TextChannel).send({
                content: `[${msg.author.displayName}]: ${content}`,
                files: [msg.attachments.at(0).url]
            })
            console.log("hee hee haw")
        } else {
        ( client.channels.cache.get("1224889071885881425") as TextChannel).send("[" + msg.author.displayName + "]: " + content)
        }
    }

})
