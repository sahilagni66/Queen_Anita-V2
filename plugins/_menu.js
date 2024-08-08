const os = require("os");
const Config = require("../config");
let { fancytext, tiny, runtime, formatp, prefix} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const trend_usage = (() => {
    const trendNumber = ((min, max) => {
      const random = () => Math.random();
      const floor = (x) => Math.floor(x);
      const multiply = (a, b) => a * b;
      const add = (a, b) => a + b;
      const subtract = (a, b) => a - b;
      const randomValue = multiply(random(), subtract(max, min + 1));
      const result = add(floor(randomValue), min);
      return result;
    })(1, 99);
    return trendNumber;
  })();
  
  const database_info = (() => {
    const dbNumber = ((min, max) => {
      const random = () => Math.random();
      const floor = (x) => Math.floor(x);
      const multiply = (a, b) => a * b;
      const add = (a, b) => a + b;
      const subtract = (a, b) => a - b;
      const randomValue = multiply(random(), subtract(max, min + 1));
      const result = add(floor(randomValue), min);
      return result;
    })(1, 499);
    return dbNumber;
  })();

astro_patch.smd(
  {
    cmdname: "menu",
    desc: "Help list",
    react: "✨",
    desc: "To show all avaiable commands.",
    type: "user",
    filename: __filename,
  },
  async (message, input) => {
    try {
      const { commands } = require("../lib");
      if (input.split(" ")[0]) {
        let commandDetails = [];
        const foundCommand = commands.find(
          (cmd) => cmd.pattern === input.split(" ")[0].toLowerCase(),
        );
        if (foundCommand) {
          commandDetails.push("*🔉Command:* " + foundCommand.pattern);
          if (foundCommand.category) {
            commandDetails.push("*💁Category:* " + foundCommand.category);
          }
          if (foundCommand.alias && foundCommand.alias[0]) {
            commandDetails.push("*💁Alias:* " + foundCommand.alias.join(", "));
          }
          if (foundCommand.desc) {
            commandDetails.push("*💁Description:* " + foundCommand.desc);
          }
          if (foundCommand.use) {
            commandDetails.push(
              "*〽️Usage:*\n ```" +
                prefix +
                foundCommand.pattern +
                " " +
                foundCommand.use +
                "```",
            );
          }
          if (foundCommand.usage) {
            commandDetails.push(
              "*〽️Usage:*\n ```" + foundCommand.usage + "```",
            );
          }
          await message.reply(commandDetails.join("\n"));
        }
      }

      let menuThemeType;
      let menuThemeHeader;
      let menuThemeFooter;
      let menuThemeCategoryHeader;
      let menuThemeCategoryFooter;
      let menuThemeCommandPrefix;
      let menuThemeCommandFooter;

      if (Config.menu === "") {
        menuThemeType = Math.floor(Math.random() * 4) + 1;
      }

      if (
        menuThemeType === 1 ||
        Config.menu.trim().startsWith("1") ||
        Config.menu.toLowerCase().includes("menu1")
      ) {
        menuThemeHeader = "┏﹝ *" + Config.botname + "* ﹞";
        menuThemeCommandPrefix = "┃ ✗";
        menuThemeFooter = "┗═════════════〤";
        menuThemeCategoryHeader = "┌『";
        menuThemeCategoryFooter = "』";
        menuThemeCommandPrefix = " | ";
        menuThemeCommandFooter = "\n└═════════════〤";
      } else if (
        menuThemeType === 2 ||
        Config.menu.trim().startsWith("2") ||
        Config.menu.toLowerCase().includes("menu2")
      ) {
        menuThemeHeader = "┌═[ *" + Config.botname + "* ]";
        menuThemeCommandPrefix = "¤│▸";
        menuThemeFooter = "╰════════════···▸";
        menuThemeCategoryHeader = "┌〈";
        menuThemeCategoryFooter = "〉";
        menuThemeCommandPrefix = "♟️⃝̷̸̶ׁׂ֪֪֪͠   ";
        menuThemeCommandFooter = "\n│╰══════════···▸▸";
      } else {
        menuThemeHeader = "╭〘  " + Config.botname + "  〙";
        menuThemeCommandPrefix = "│ │";
        menuThemeFooter = "╰═══════════════⊷";
        menuThemeCategoryHeader = "╭─❏";
        menuThemeCategoryFooter = "❏";
        menuThemeCommandPrefix = "│";
        menuThemeCommandFooter = "╰════════════─⊷";
      }

      const categorizedCommands = {};
      commands.map(async (command, index) => {
        if (
          command.dontAddCommandList === false &&
          command.pattern !== undefined
        ) {
          if (!categorizedCommands[command.category]) {
            categorizedCommands[command.category] = [];
          }
          categorizedCommands[command.category].push(command.pattern);
        }
      });

      const currentTime = message.time;
      const currentDate = message.date;
      let menuText = `
  ${menuThemeHeader}
  ${menuThemeCommandPrefix} *𝐎ω𐓣𝖾𝗋:* ${Config.ownername}
  ${menuThemeCommandPrefix} *𝐔ρ𝗍𝗂ꭑ𝖾:* ${runtime(process.uptime())}
  ${menuThemeCommandPrefix} *𝐑αꭑ 𝐔𝗌α𝗀𝖾:* ${formatp(os.totalmem() - os.freemem())}
  ${menuThemeCommandPrefix} *𝐓𝗂ꭑ𝖾:* ${currentTime}
  ${menuThemeCommandPrefix} *𝐃α𝗍𝖾:* ${currentDate}
  ${menuThemeCommandPrefix} *𝐂ⱺꭑꭑα𐓣ᑯ𝗌:* ${commands.length}
  ${menuThemeCommandPrefix} *𝐔𝗌α𝗀𝖾 𝐓𝗋𝖾𐓣ᑯ𝗌:* ${trend_usage}
  ${menuThemeCommandPrefix} *𝐃α𝗍αᑲα𝗌𝖾:* ${database_info}
  ${menuThemeFooter}\n ┌┤✑  𝐓ɦα𐓣𝗄𝗌 𝐅ⱺ𝗋 𝐂ɦⱺⱺ𝗌𝗂𐓣𝗀 𝐅𝖾ᥣ𝗂𝗑 𝐁ⱺ𝗍🎀ᩙ
│└────────────┈ ⳹        
│*©𝐅𝖾ᥣ𝗂𝗑 𝐍ααꭑ 𝐓ⱺɦ 𝐒υ𐓣α 𝐇𝗂 𝐇ⱺ𝗀α🧺ᩙᩖ*
└─────────────────┈ ⳹
  \n${readmore}\n`;

      for (const category in categorizedCommands) {
        menuText += `${menuThemeCategoryHeader} *${tiny(category)}* ${menuThemeCategoryFooter}\n`;
        if (input.toLowerCase() === category.toLowerCase()) {
          menuText = `${menuThemeCategoryHeader} *${tiny(category)}* ${menuThemeCategoryFooter}\n`;
          for (const command of categorizedCommands[category]) {
            menuText += `${menuThemeCommandPrefix} ${fancytext(command, 1)}\n`;
          }
          menuText += `${menuThemeCommandFooter}\n`;
          break;
        } else {
          for (const command of categorizedCommands[category]) {
            menuText += `${menuThemeCommandPrefix} ${fancytext(command, 1)}\n`;
          }
          menuText += `${menuThemeCommandFooter}\n`;
        }
      }
      menuText += Config.caption;

      const messageOptions = {
        caption: menuText,
        ephemeralExpiration: 3000,
      };
      return await message.sendUi(message.chat, messageOptions, message);
    } catch (error) {
      await message.error(error + "\nCommand: menu", error);
    }
  },
);
