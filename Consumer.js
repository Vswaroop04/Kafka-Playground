const { kafka } = require("./client");

async function init() {
  const consumer = kafka.consumer({ groupId: "user1" });

  await consumer.connect();
    await consumer.subscribe({ topics: ["rider-updates"] , fromBeginning : true});
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => { 
            console.log(`Received message on ${topic}[${partition}]:`,message);
        }
    })
}

init();
