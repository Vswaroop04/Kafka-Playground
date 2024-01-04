const { kafka } = require("./client");

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Connected to Kafka Server!");

  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        partition: 0,
        key: "Location Update",
        value: JSON.stringify({
          name: "K V Vishnu Swaroop",
          location: "Hyderabad",
        }),
      },
    ],
  });
  console.log("Producer Sent Message ");

//   await producer.disconnect();
//   console.log("Producer Disconnected");
}

init();
