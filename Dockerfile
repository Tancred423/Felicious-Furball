FROM denoland/deno:2.5.6

WORKDIR /app

COPY deno.json deno.lock* ./
COPY src ./src

RUN deno cache src/app.ts

CMD ["deno", "task", "start"]

