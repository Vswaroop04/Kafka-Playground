const { kafka } = require("./client");

async function init() {
  // create a admin  instance
  // admin is responsible for creating partitions in db
  const admin = kafka.admin();
  console.log("Admin Connecting ...");
  admin.connect();
  console.log("Admin Connection is succesful");

  // creating partitions
  console.log("Creating partitions");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topics Created Succesfully");

  console.log("Disconnectin Admin");
  await admin.disconnect();
}


init()