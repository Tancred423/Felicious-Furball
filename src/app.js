const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require('discord.js')
const cron = require('node-cron')
const config = require('../config.json')

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
})

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`)

  const guild = client.guilds.cache.get(config.guildId)
  const channel = guild.channels.cache.get(config.channelId)
  const mentionRole = guild.roles.cache.get(config.mentionRoleId)

  const button = new ButtonBuilder()
    .setCustomId('remind_me_button')
    .setLabel(config.remindMeTooButton)
    .setStyle(ButtonStyle.Secondary)

  const row = new ActionRowBuilder().addComponents(button)

  cron.schedule(
    config.cronSchedule,
    () => {
      channel.send({
        content: mentionRole.toString() + ' ' + config.reminderMessage,
        components: [row],
      })
    },
    {
      scheduled: true,
      timezone: config.cronTimezone,
    },
  )

  cron.schedule(
    '0 * * * *',
    () => {
      const weekday = new Date().getDay()

      switch (weekday) {
        case 0:
        case 1:
        case 6:
          client.user.setPresence({
            activities: [{ name: '' }],
            status: 'dnd',
          })
          break
        case 2:
          client.user.setPresence({
            activities: [{ name: 'cycle 2!', type: ActivityType.Watching }],
            status: 'online',
          })
          break
        case 3:
          client.user.setPresence({
            activities: [{ name: 'cycle 3!', type: ActivityType.Watching }],
            status: 'online',
          })
          break
        case 4:
          client.user.setPresence({
            activities: [{ name: 'cycle 4!', type: ActivityType.Watching }],
            status: 'online',
          })
          break
        case 5:
          client.user.setPresence({
            activities: [
              { name: 'cycle 5, 6 and 7!', type: ActivityType.Watching },
            ],
            status: 'online',
          })
          break
      }
    },
    {
      scheduled: true,
      timezone: config.cronTimezone,
    },
  )
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) {
    return
  }

  try {
    const member = interaction.member

    if (!member) {
      console.error('No member found for this interaction.')
      return
    }

    const roleId = config.mentionRoleId

    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(roleId)

      await interaction.reply({
        content: `You will **no longer** be reminded!`,
        ephemeral: true,
      })
      return
    }

    await member.roles.add(roleId)

    await interaction.reply({
      content: `You will be reminded next time!`,
      ephemeral: true,
    })
  } catch (err) {
    console.error('Failed to handle interaction, because:', err)
  }
})

client.login(config.token)
