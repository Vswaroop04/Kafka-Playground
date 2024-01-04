const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});
async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Connected to Kafka Server!");

  rl.setPrompt("> ");
  rl.prompt();
  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" ");
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "Location Update",
          value: JSON.stringify({
            riderName,
            location,
          }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
    console.log("Producer Disconnected");
  });
}

init();
