import {
  ActionRowBuilder,
  ActivityType,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Events,
  GatewayIntentBits,
  GuildMember,
} from "discord.js";
import cron from "node-cron";
import { load } from "std/dotenv";
import * as log from "std/log";

await load({ export: true });

log.setup({
  handlers: {
    console: new log.ConsoleHandler("INFO"),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers], });

client.once(Events.ClientReady, () => {
  log.info(`Logged in as ${client.user?.tag}`);
  updatePresence();

  const guild = client.guilds.cache.get(Deno.env.get("GUILD_ID")!);
  const channel = guild?.channels.cache.get(Deno.env.get("CHANNEL_ID")!);
  const mentionRole = guild?.roles.cache.get(Deno.env.get("MENTION_ROLE_ID")!);

  const button = new ButtonBuilder()
    .setCustomId("remind_me_button")
    .setLabel(Deno.env.get("REMIND_ME_TOO_BUTTON")!)
    .setStyle(ButtonStyle.Secondary);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  cron.schedule(
    Deno.env.get("CRON_SCHEDULE")!,
    () => {
      if (channel && "send" in channel) {
        channel.send({
          content: mentionRole?.toString() + " " + Deno.env.get("REMINDER_MESSAGE")!,
          components: [row],
        });
      }
    },
    {
      scheduled: true,
      timezone: Deno.env.get("CRON_TIMEZONE")!,
    },
  );

  cron.schedule("0 * * * *", updatePresence, {
    scheduled: true,
    timezone: Deno.env.get("CRON_TIMEZONE")!,
  });
});

function updatePresence() {
  const weekday = new Date().getDay();

  if (weekday === 2) {
    client.user?.setPresence({
      activities: [
        {
          name: "custom",
          state: Deno.env.get("PRESENCE_MESSAGE")!,
          type: ActivityType.Custom,
        },
      ],
      status: "online",
    });
    return;
  }

  client.user?.setPresence({
    activities: [{ name: "" }],
    status: "dnd",
  });
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) {
    return;
  }

  try {
    const member = interaction.member as GuildMember;

    if (!member) {
      log.error("No member found for this interaction.");
      return;
    }

    const roleId = Deno.env.get("MENTION_ROLE_ID")!;

    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(roleId);

      await interaction.reply({
        content: Deno.env.get("REMINDER_SIGN_DOWN_MESSAGE")!,
        ephemeral: true,
      });
      return;
    }

    await member.roles.add(roleId);

    await interaction.reply({
      content: Deno.env.get("REMINDER_SIGN_UP_MESSAGE")!,
      ephemeral: true,
    });
  } catch (err) {
    log.error("Failed to handle interaction, because:", err);
  }
});

client.login(Deno.env.get("TOKEN")!);
