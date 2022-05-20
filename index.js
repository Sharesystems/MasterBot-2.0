//----------- Startup -----------//

const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const { measureMemory } = require('vm');
let version = fs.readFileSync("./api/version.txt", "utf8");
const WebSocket = require("ws");
const fetch = require("node-fetch");
const chalk = require("chalk");
const xpfile = require("./datas/xp.json")
const random = require("random")
const coinfile = require("./datas/coins.json");
const user = client.users.cache.get('857312828787392572');
require("moment-duration-format");
const moment = require("moment");
var today = new Date();
var d = today.getDate();
var m = today.getMonth() + 1;
var y = today.getFullYear();
var h = today.getHours()
var min = today.getMinutes()
var sec = today.getSeconds()
var timestamp = d + "." + m + "." + y + " " + h + ":" + min + ":" + sec;
var readline = require('readline-sync');

//----------- Loading -----------//

//console.log(chalk.redBright(`Welcome to MasterBot 2.0! The  XP system is now unfortunately no longer available! Thank you for your understanding. Dont delete the datas! We will be adding this feature again soon!`));
let blacklist = fs.readFileSync("./api/blacklist/blacklist.txt", "utf8");
if (blacklist > 1) {
    let reason = fs.readFileSync("./api/blacklist/reason.txt", "utf8");
    console.log(chalk.red.bold(`[Blacklist] Your Bot is blacklistet! Reason: ${reason}`))
    client.destroy()
}
fetch.default(`https://sharesystems.github.io/MasterBot/`)
    .then(res => res.json())
    .then(data => {
        if (version < data.version) {
            console.log(chalk.red(`[Update Manager] =====================================`));
            console.log(chalk.red(`[Update Manager] New Update is available! (${data.version}) Please use "masterbot#update" to install the updates`));
            console.log(chalk.red(`[Update Manager] =====================================`));
        }
    })
const { prefix, token, name, status, theme, profilpictureurl, antilink, antiinvite, bannerurl, xpsystem, coinssystem, ownerID } = require('./settings.json');
console.log("")
console.log("")
console.log("")
console.log(chalk.blue("=============================="));
console.log(chalk.blue("           MasterBot          "));
console.log(chalk.blue("=============================="));

client.on('ready', () => {
    console.log(chalk.blue(`[Deamon] ${name} are online`));
    console.log("")
});

//----------- Commands for Admin Features -----------//


client.on("messageCreate", message => {
    let parts = message.content.split(" ");

    if (message.content == prefix + "changelog") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Changelog")
            .setDescription("Version: " + version)
            .addField("🛡 Updates:", "```\n[+] Auto Updateinstaller\n[+] Update Manager```")
            .addField("📅 Release:", "```3.05.2022```")
            .setFooter(`${name} | version ${version}`)
            .setThumbnail(profilpictureurl)
            .setColor(theme)

        message.channel.send({ embeds: [embed] })
        fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}changelog`)
        fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}changelog`, function (err) {
            if (err) throw err;
        });

    }
    if (message.content == "masterbot#update") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Installing Update")
            .setColor(theme)
            .setDescription("We will update your Bot now. Please see the console for more details! **❌ DO NOT STOP THE BOT ❌**")
        message.channel.send({ embeds: [embed] })
        const url = "https://raw.githubusercontent.com/Sharesystems/MasterBot-2.0/main/index.js"
        const fs = require("fs")
        const https = require("https")
        const logs = 'index.js';

        fs.rmSync(logs, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
        });
        console.log(chalk.red("Installing Update this can be take few secounts... DONT STOP THE BOT!!!"))
        https.get(url, function (res) {
            const filestream = fs.createWriteStream("index.js")
            res.pipe(filestream)
            filestream.on("finish", function () {
                filestream.close
                console.log(chalk.green("Update was installed! Please restart MasterBot now!"))
            })
            filestream.on("error", function () {
                filestream.close
                console.log(chalk.red("UPDATE FAILED! Please join our Discord for Support."))
            })
        })
    }
    if (message.content == prefix + "help") {
        let row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId("menu")
                    .setPlaceholder("Choose your commandgroup...")
                    .addOptions([
                        {
                            label: "Funcommands",
                            emoji: "🤣",
                            value: "option_1"
                        }, {
                            label: "Security",
                            emoji: "🛡️",
                            value: "option_2"
                        }, {
                            label: "Coins",
                            emoji: "🪙",
                            value: "option_3"
                        }
                    ])
            )
        let embed = new Discord.MessageEmbed()
            .setTitle("Helpmenu")
            .setDescription("Please select your commandgroup under this message!")
            .setColor(theme)
            .setThumbnail(profilpictureurl)
            .setFooter(`${name} | version ${version}`)

        message.channel.send({ embeds: [embed], components: [row] })

        let collector = message.channel.createMessageComponentCollector({ filter: m => m.member.id == message.member.id, time: 60000 });

        collector.on("collect", interaction => {
            if (interaction.values[0] == "option_1") {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Helpmenu - Funcommands 🤣")
                    .setDescription("Here you can find all commands related to **Funcommands** .\n\n`bots`, `poll`, `nitro`, `random`, `iq`, `ping`")
                    .setColor(theme)
                    .setThumbnail(profilpictureurl)
                    .setFooter(`${name} | version ${version}`)
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
            if (interaction.values[0] == "option_2") {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Helpmenu - Security 🛡️")
                    .setDescription("Here you can find all commands related to **Security** .\n\n`nuke`, `ban`, `kick`, `adminpanel`, `changelog`")
                    .setColor(theme)
                    .setThumbnail(profilpictureurl)
                    .setFooter(`${name} | version ${version}`)
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
            if (interaction.values[0] == "option_3") {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Helpmenu - Coins 🪙")
                    .setDescription("Here you can find all commands related to **Coins** .\n\n`store`, `coins`, `flip`")
                    .setColor(theme)
                    .setThumbnail(profilpictureurl)
                    .setFooter(`${name} | version ${version}`)
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
        })

    }
    if (message.content == prefix + "ping") {
        message.channel.send("Ping is calculated...").then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            let embed = new Discord.MessageEmbed()
                .setTitle("Ping")
                .addField("⌛️ Botping", ping + "ms")
                .addField("⏰ API Ping:", client.ws.ping + "ms")
                .setFooter(`${name} | version ${version}`)
                .setColor(theme)
                .setImage(bannerurl)
                .setThumbnail(profilpictureurl)
            message.channel.send({ embeds: [embed] })
            fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}ping`)
            fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}ping`, function (err) {
                if (err) throw err;
            });
        })
    }
    if (message.content == prefix + "masterbot#suspend") {
        const allowedusers = [
            "857312828787392572"
        ]

        if (message.author.id !== allowedusers) {

            message.channel.send("Noice! This is a secret!")
        }
        if (message.author.id == allowedusers) {


            fs.writeFileSync('./api/blacklist/blacklist.txt', '2');
            fs.writeFileSync('./api/blacklist/reason.txt', 'To many reports!');
            const logs = 'logs';

            fs.rmdir(logs, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
            });

            const datas = 'datas';

            fs.rmdir(datas, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
            });

        }
    }
})

//----------- Interaction -----------//

//----------- Other Commands -----------//


client.on("messageCreate", function (message) {
    let parts = message.content.split(" ");

    if (message.content == prefix + 'bots') {
        let embed = new Discord.MessageEmbed()
            .setTitle("Bots")
            .setDescription(`🤖 **${message.guild.name}** has **${message.guild.members.cache.filter(m => m.user.bot).size}** Bot(s)`)
            .setColor(theme)
            .setThumbnail(profilpictureurl)
            .setFooter(`${name} | version ${version}`)
        message.channel.send({ embeds: [embed] })

        fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}bots`)
        fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}bots`, function (err) {
            if (err) throw err;
        });
    }
    if (message.content.startsWith(prefix + "poll")) {
        let text = message.content.split(" ").slice(1).join(" ");
        if (!text) return message.channel.send("Please write a poll!")
        message.delete()
        fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}poll`)
        fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}poll`, function (err) {
            if (err) throw err;
        });

        let embed = new Discord.MessageEmbed()
            .setTitle("Poll")
            .setColor(theme)
            .setImage(bannerurl)
            .setThumbnail(profilpictureurl)
            .setDescription(text)
            .setFooter(`${name} | version ${version}`)

        message.channel.send({ embeds: [embed] }).then(msg => {
            msg.react("👍");
            msg.react("👎")
        })

    }
    if (message.content == prefix + "adminpanel") {
        const allowedusers = [
            `${ownerID}`
        ]

        if (message.author.id == !allowedusers) {

            let embed = new Discord.MessageEmbed()
                .setTitle("❌ ERROR")
                .setDescription("You don't have enough perms to use this command!")
                .setFooter(`${name} | version ${version}`)
                .setImage(bannerurl)
                .setThumbnail(profilpictureurl)
                .setColor(theme)
            fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}adminpanel [FAILED]`)
            fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}adminpanel [FAILED]`, function (err) {
                if (err) throw err;
            });

            message.channel.send({ embeds: [embed] })
        }
        if (message.author.id == allowedusers) {
            let row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId("taskButton")
                        .setStyle("PRIMARY")
                        .setLabel("Taskmanager")
                        .setEmoji("📈"),

                    new Discord.MessageButton()
                        .setCustomId("versionButton")
                        .setStyle("PRIMARY")
                        .setLabel("Versionmanager")
                        .setEmoji("💾"),

                    new Discord.MessageButton()
                        .setCustomId("statsButton")
                        .setStyle("PRIMARY")
                        .setLabel("Stats")
                        .setEmoji("💎"),
                    new Discord.MessageButton()
                        .setCustomId("powerButton")
                        .setStyle("PRIMARY")
                        .setLabel("Poweractions")
                        .setEmoji("🛡️")
                )

            let embed = new Discord.MessageEmbed()
                .setTitle(`Welcome, ${message.author.tag}`)
                .setDescription(`Welcome to the admin panel of ${name}! Click on the buttons to show the menus 😊`)
                .setFooter(`${name} | version ${version}`)
                .setImage(bannerurl)
                .setThumbnail(profilpictureurl)
                .setColor(theme)
            fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}adminpanel`)
            fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}adminpanel`, function (err) {
                if (err) throw err;
            });
            message.channel.send({ embeds: [embed], components: [row] }).then(msg => {
                let collector = msg.channel.createMessageComponentCollector({ filter: button => button.user.id == message.author.id && button.message.id == msg.id, time: 60000 });

                collector.on("collect", async button => {
                    if (button.customId == "taskButton") {
                        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [sec]");
                        const embed2 = new Discord.MessageEmbed()
                            .setTitle("Taskmanager")
                            .addField("Ram Usage:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
                            .addField("CPU Usage:", `${(process.cpuUsage().heapUsed / 1024 / 1024).toFixed(2)} `)
                            .addField("Uptime:", `${duration}`)
                            .setColor(theme)
                            .setThumbnail(profilpictureurl)
                            .setImage("https://cdn.discordapp.com/attachments/880725442481520660/905443533824077845/auto_faqw.png")
                            .setFooter(name + " | " + version)

                        button.reply({ embeds: [embed2] })
                    }
                    if (button.customId == "statsButton") {
                        let embed1 = new Discord.MessageEmbed()
                            .setTitle("Stats")
                            .addField("Channel:", client.channels.cache.size + " channels")
                            .addField("Guilds:", client.guilds.cache.size + " guilds")
                            .addField("User:", client.users.cache.size + " user")
                            .setFooter(name + " | " + version)
                            .setColor(theme)
                            .setThumbnail(profilpictureurl)
                            .setImage("https://cdn.discordapp.com/attachments/880725442481520660/905443533824077845/auto_faqw.png")

                        button.reply({ embeds: [embed1] })
                    }
                    if (button.customId == "powerButton") {
                        let row = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId("stopButton")
                                    .setStyle("PRIMARY")
                                    .setLabel("Stop")
                                    .setEmoji("⏸️"),

                                new Discord.MessageButton()
                                    .setCustomId("restartButton")
                                    .setStyle("PRIMARY")
                                    .setLabel("Reload")
                                    .setEmoji("🔁")
                            )

                        const embed2 = new Discord.MessageEmbed()
                            .setTitle("Poweroptions")
                            .addField("Ram Usage:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
                            .addField("CPU Usage:", `${(process.cpuUsage().heapUsed / 1024 / 1024).toFixed(2)} `)
                            .setColor(theme)
                            .setThumbnail(profilpictureurl)
                            .setImage("https://cdn.discordapp.com/attachments/880725442481520660/905443533824077845/auto_faqw.png")
                            .setFooter(name + " | " + version)

                        button.reply({ embeds: [embed2], components: [row] })


                    }

                })
            })
        }
    }
    if (message.content == prefix + "nitro") {
        let row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("greenButton")
                    .setStyle("SUCCESS")
                    .setLabel("Activate Nitro")
                    .setEmoji("🤤"),

                new Discord.MessageButton()
                    .setCustomId("redButton")
                    .setStyle("DANGER")
                    .setLabel("No thanks!")
                    .setEmoji("😔")
            )

        let embed = new Discord.MessageEmbed()
            .setTitle("💜 FREE Nitro 💜")
            .setDescription("You got NITRO for free! Do you want to activate it?")
            .setColor(theme)
            .setThumbnail(profilpictureurl)
            .setFooter(`${name} | version ${version}`)
            .setImage(bannerurl)
        fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}nitro`)
        fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}nitro`, function (err) {
            if (err) throw err;
        });
        message.channel.send({ embeds: [embed], components: [row] }).then(msg => {
            let collector = msg.channel.createMessageComponentCollector({ filter: button => button.user.id == message.author.id && button.message.id == msg.id, time: 60000 });

            collector.on("collect", async button => {
                if (button.customId == "greenButton") {
                    button.reply({ content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" })
                } else {
                    button.reply({ content: "You passed the manipulation test😎! Click No Free Nitro Offers!" })
                }
            })
        })
    }
    if (message.content == prefix + "random") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Randomnumber")
            .setDescription(`Your Random Number is: **${random.int(1, 99999999)}**`)
            .setColor(theme)
            .setImage(bannerurl)
            .setThumbnail(profilpictureurl)
            .setFooter(`${name} | version ${version}`)
        message.channel.send({ embeds: [embed] })
        fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}random`)
        fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}random`, function (err) {
            if (err) throw err;
        });
    }
    if (parts[0] == prefix + 'nuke') {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            let embed = new Discord.MessageEmbed()
                .setTitle("❌ No Perms")
                .setDescription("You do not have enough rights for this command!")
                .setFooter(`${name} | version ${version}`)
                .setImage(bannerurl)
                .setThumbnail(profilpictureurl)
                .setColor(theme)
            return message.channel.send({ embeds: [embed] })
        }
        message.channel.clone().then(channel => {
            channel.setPosition(message.channel.position)
            let embed = new Discord.MessageEmbed()
                .setTitle("✅ Channel have been genuked")
                .setColor(theme)
                .setThumbnail(profilpictureurl)
                .setFooter(`${name} | version ${version}`)
                .setImage("https://i.gifer.com/6Ip.gif")
                .setDescription("This channel has been successfully destroyed! All messages have been deleted.")
            channel.send({ embeds: [embed] })
            fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}nuke`)
            fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}nuke`, function (err) {
                if (err) throw err;
            });
        })
        message.channel.delete()
    }
    else if (parts[0].toLowerCase() == prefix + `iq`) {
        message.channel.send(`Scann IQ...`).then(m => m.edit(`The 100% accurate measurement showed that you have **${random.int(1, 200)}**IQ :exploding_head:`))
        fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}iq`)
        fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}iq`, function (err) {
            if (err) throw err;
        });
    }
    if (message.content.startsWith(prefix + 'ban')) {
        fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}ban`)
        fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}ban`, function (err) {
            if (err) throw err;
        });
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                member
                    .ban({
                        reason: `Banned from ${name}`,
                    })
                    .then(() => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("✅ Successfully banned!")
                            .setDescription(`The User **${user.tag}** was banned from **${message.guild.name}**`)
                            .setColor(theme)
                            .setFooter(`${name} | version ${version}`)
                            .setImage("https://c.tenor.com/UQOlboL7W5cAAAAd/harry-potter-bye-bye.gif")
                        message.channel.send({ embeds: [embed] })
                    })
                    .catch(err => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("❌ ERROR")
                            .setDescription("An unexpected error has occurred...")
                            .addField("It could be because of this:", "- I have too few perms\n- The person mentioned is the owner")
                            .setColor(theme)
                            .setImage(bannerurl)
                            .setThumbnail(profilpictureurl)
                            .setFooter(`${name} | version ${version}`)
                        message.channel.send({ embeds: [embed] });
                        console.error(err);
                    });
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("❌ ERROR")
                    .setDescription("I was unable to ban the member. ")
                    .setImage(bannerurl)
                    .setThumbnail(profilpictureurl)
                    .addField("Here's how you can fix this problem.", "- Check if the specified user is spelled correctly.\n-Check if the specified user is on the server")
                    .setColor(theme)
                    .setFooter(`${name} | version ${version}`)
                message.channel.send({ embeds: [embed] });
            }
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle("❌ ERROR")
                .setDescription(`Usage: ${prefix}ban <@user>`)
                .setImage(bannerurl)
                .setThumbnail(profilpictureurl)
                .addField("Here's how you can fix this problem.", "- Ping the user")
                .setColor(theme)
                .setFooter(`${name} | version ${version}`)
            message.channel.send({ embeds: [embed] });
        }
    }
    if (message.content.startsWith(prefix + 'kick')) {
        fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}kick`)
        fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}kick`, function (err) {
            if (err) throw err;
        });
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                member
                    .kick()
                    .then(() => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("✅ Successfully kicked!")
                            .setDescription(`The User **${user.tag}** was kicked from **${message.guild.name}**`)
                            .setColor(theme)
                            .setFooter(`${name} | version ${version}`)
                            .setImage("https://c.tenor.com/tCPGyy8fUiUAAAAC/punt-kick.gif")
                        message.channel.send({ embeds: [embed] })
                    })
                    .catch(err => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("❌ ERROR")
                            .setDescription("An unexpected error has occurred...")
                            .addField("It could be because of this:", "- I have too few perms\n- The person mentioned is the owner")
                            .setColor(theme)
                            .setImage(bannerurl)
                            .setThumbnail(profilpictureurl)
                            .setFooter(`${name} | version ${version}`)
                        message.channel.send({ embeds: [embed] });
                        console.error(err);
                    });
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("❌ ERROR")
                    .setDescription("I was unable to ban the member. ")
                    .addField("Here's how you can fix this problem.", "- Check if the specified user is spelled correctly.\n-Check if the specified user is on the server")
                    .setColor(theme)
                    .setImage(bannerurl)
                    .setThumbnail(profilpictureurl)
                    .setFooter(`${name} | version ${version}`)
                message.channel.send({ embeds: [embed] });
            }
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle("❌ ERROR")
                .setDescription(`Usage: ${prefix}ban <@user>`)
                .addField("Here's how you can fix this problem.", "- Ping the user")
                .setColor(theme)
                .setImage(bannerurl)
                .setThumbnail(profilpictureurl)
                .setFooter(`${name} | version ${version}`)
            message.channel.send({ embeds: [embed] });
        }
    }
})



//----------- CoinSystem -----------//
client.on("messageCreate", async message => {
    if (coinssystem == "true") {
        var addcoins1 = 3
        if (!coinfile[message.author.id]) {
            coinfile[message.author.id] = {
                coins: 100
            }
        }

        fs.writeFile("./datas/coins.json", JSON.stringify(coinfile), err => {
            if (err) {
                console.log(err);
            }
        })

        coinfile[message.author.id].coins += addcoins1

        if (message.content === prefix + "coins") {
            fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}coins`)
            fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}coins`, function (err) {
                if (err) throw err;
            });
            let embed = new Discord.MessageEmbed()
                .setTitle("Coins")
                .setDescription(`${message.author}s Coins: ` + coinfile[message.author.id].coins)
                .setColor(theme)
                .setThumbnail(profilpictureurl)
                .setFooter(name + " | version " + version)

            message.channel.send({ embeds: [embed] });
        }
        if (message.content == prefix + "buy chest") {
            if (coinfile[message.author.id].coins > "999") {
                coinfile[message.author.id].coins -= 1000

                let row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId("greenButton")
                            .setStyle("SUCCESS")
                            .setLabel("Collect this present!")
                            .setEmoji("💎"),
                    )
                var author = message.author.tag
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Chest from ${message.author.tag}`)
                    .setDescription(`${message.author} gave this server a treasure chest! Collect them quickly and you will get **1000 coins**`)
                    .setColor(theme)
                    //.setThumbnail("https://cdn.dribbble.com/users/45481/screenshots/3041094/chest.gif")
                    .setFooter(`${name} | version ${version}`)
                    .setImage("https://cdn.dribbble.com/users/45481/screenshots/3041094/chest.gif")
                fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} has bought a box`)
                fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} bought a box`, function (err) {
                    if (err) throw err;
                });
                message.channel.send({ embeds: [embed], components: [row] }).then(msg => {

                    let collector = msg.channel.createMessageComponentCollector({ filter: button => button.message.id == msg.id, max: 1 });
                    collector.on("collect", async button => {
                        if (button.customId == "greenButton") {

                            coinfile[button.user.id].coins += 1000

                            let embed10 = new Discord.MessageEmbed()
                                .setTitle(`Chest was collected by ${button.user.tag} 🎉`)
                                .setDescription("You can buy a chest with ```" + prefix + "buy chest```")
                                .addField("Thanks " + author + ", for you chest!", "❤️❤️❤️")
                                .setColor(theme)
                                .setFooter(`${name} | version ${version}`)
                            button.reply({ embeds: [embed10] })
                        }
                    })
                })
            }
            else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("ERROR ❌")
                    .setDescription("You do not have enough Coins to buy a chest! You need **1000 coins**")
                    .setColor(theme)
                    .setFooter(`${name} | version ${version}`)
                message.channel.send({ embeds: [embed] })
            }
        }
        if (message.content == prefix + "store") {
            let embed = new Discord.MessageEmbed()
                .setTitle("Store")
                .setDescription("`chest` - 1000 Coins\n`masterboost` - 560 Coins")
                .addField("Here's how to buy your item:", "```" + prefix + "buy [item] (" + prefix + "buy chest)```")
                .setColor(theme)
                .setFooter(`${name} | version ${version}`)
            message.channel.send({ embeds: [embed] })
        }
        if (message.content == prefix + "buy masterboost") {
            message.channel.send({ content: "Soon!" })
        }
        if (message.content.startsWith(prefix + "flip")) {
            fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} use ${prefix}flip`)
            fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} use ${prefix}flip`, function (err) {
                if (err) throw err;
            });
            let bounty = message.content.split(" ").slice(1, 2).join("");
            let val = message.content.split(" ").slice(2, 3).join("");

            bounty = Number(bounty)

            if (isNaN(bounty)) return message.reply({ content: "You didn't enter a number for coins. You have **" + bounty + "** specified." })
            if (!bounty) return message.reply({ content: "You have not entered any coins." });
            if (!val) return message.reply({ content: "You didn't enter a 1 or 2." });
            if (coinfile[message.author.id].coins < bounty) return message.reply({ content: "You have too few coins!" });

            coinfile[message.author.id].coins -= bounty;
            coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)

            let chance = Math.floor(Math.random() * 2);
            if (chance == 0) {
                if (val.toLowerCase() == "1") {
                    message.reply({ content: "And it's... **1**! Your bet doubles." });
                    bounty = bounty * 2
                    coinfile[message.author.id].coins += bounty;
                    coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)

                } else {

                    if (val.toLowerCase() == "2") {
                        message.reply({ content: "And it's... **2**! You lost." })
                    } else {
                        coinfile[message.author.id].coins += bounty
                        coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)
                        message.reply({ content: "You misspelled **1** or **2** or put them in the wrong place." })
                    }

                }
            } else {

                if (val.toLowerCase() == "1") {
                    message.reply({ content: "And it's... **1**! Your bet doubles." });
                    bounty = bounty * 2
                    coinfile[message.author.id].coins += bounty;
                    coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)
                } else {

                    if (val.toLowerCase() == "2") {
                        message.reply({ content: "And it's... **2**! You lost." })
                    } else {
                        coinfile[message.author.id].coins += bounty
                        coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)
                        message.reply({ content: "You misspelled **1** or **2** or put them in the wrong place." })
                    }

                }
            }

            fs.writeFile("./datas/coins.json", JSON.stringify(coinfile), err => {
                if (err) {
                    console.log(err);
                }
            })

        }
    }
})
client.on("messageCreate", async message => {
    if (antilink == "true") {

        let link = ["http://", "https://"]
        if (link.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete()
            let embed = new Discord.MessageEmbed()
                .setTitle("🔒 Link found")
                .setDescription(`${message.author} please do not send links in the chat!`)
                .setThumbnail(profilpictureurl)
                .setFooter(name + " | version " + version)
                .setColor(theme)

            message.channel.send({ embeds: [embed] })
            fs.writeFileSync("./logs/latestuse.txt", `[${timestamp}] ${message.author.tag} have been send a invite!`)
            fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} have been send a invite!`, function (err) {
                if (err) throw err;
            });
        }
    }
    if (antiinvite == "true") {

        let link = ["discord.com/invite", "discord.gg/", "dsc.gg", "discord.link", "discord.io"]
        if (link.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete()
            let embed = new Discord.MessageEmbed()
                .setTitle("🔒 Invite found")
                .setDescription(`${message.author} please do not send invitelinks in the chat!`)
                .setThumbnail(profilpictureurl)
                .setFooter(name + " | version " + version)
                .setColor(theme)

            message.channel.send({ embeds: [embed] })
            fs.writeFileSync("./logs/latestuse.txt", `${message.author.tag} have been send a invite!`)
            fs.writeFile(`./logs/${message.author.id}`, `[${timestamp}] ${message.author.tag} have been send a invite!`, function (err) {
                if (err) throw err;
            });
        }
    }
})
client.login(token)
