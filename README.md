# Felicious Furball

The Felicious Furball Discord Bot is a specialized bot created to send reminders for updating your FFXIV Island
Sanctuary. You have the flexibility to establish your own reminder schedule or utilize the pre-set schedule available in
the [environment file](env.skel). The default schedule aligns with the days when the Overseas Casual community posts
their solution suggestions. Reminders are dispatched at 18:00 (6 PM) on Tuesdays by default.

## Features

- **Cron-based Scheduling**: The bot allows you to specify reminder messages using cron syntax, providing flexibility in
  setting up recurring reminders.
- **Channel Selection**: You can choose the specific channel on your Discord server where the reminder messages will be
  posted.
- **Role Mention Selection**: You can provide a role that will be mentioned in the reminder message.
- **Customizable Messages**: The bot supports customizable reminder messages, allowing you to tailor the content to your
  specific needs.

## For developers

### Development Setup

1. Build and start the container

```bash
docker compose up -d
```

2. Connect to the container

```bash
docker exec -it felicious-furball-dev bash
```

3. Run commands inside the container

### Production Setup

Build and start the container

```bash
docker compose -f docker-compose.prod.yml up -d
```

## License

MIT
