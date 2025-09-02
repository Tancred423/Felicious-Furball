# Felicious Furball

The Felicious Furball Discord Bot is a specialized bot created to send reminders for updating your FFXIV Island Sanctuary.
You have the flexibility to establish your own reminder schedule or utilize the pre-set schedule available in the [config file](config.json-skel).
The default schedule aligns with the days when the Overseas Casual community posts their solution suggestions.
Reminders are dispatched at 18:00 (6 PM) on Tuesdays by default.

## Features

- **Cron-based Scheduling**: The bot allows you to specify reminder messages using cron syntax, providing flexibility in setting up recurring reminders.
- **Channel Selection**: You can choose the specific channel on your Discord server where the reminder messages will be posted.
- **Role Mention Selection**: You can provide a role that will be mentioned in the reminder message.
- **Customizable Messages**: The bot supports customizable reminder messages, allowing you to tailor the content to your specific needs.

## Installation

To install and run the Island Reminder Discord Bot, follow these steps:

1. Clone the repository: `git clone https://github.com/Tancred423/felicious-furball.git`
2. Install the required dependencies: `npm ci`
3. Create a Discord Application at the [Discord Developer Portal](https://discord.com/developers/docs/intro) with your desired Bot name.
4. Copy the `config.json-skel` file and name it `config.json`.
5. Configure the bot by editing the `config.json` file and providing your Discord bot token and other necessary settings.
6. Start the bot: `npm run start`
7. Make sure the bot has the permissions: `Manage Roles`, `Send Messages`.
8. Make sure the role that provides the bot with the aforementioned permissions is higher in hierarchy than the role to be mentioned.

## Usage

Once the bot is up and running, you can start seeing the configured reminder and the bot's status.

## License

This project is licensed under the ISC License. See the [ISC.md](ISC.md) file for details.
