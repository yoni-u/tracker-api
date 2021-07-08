const { MongoClient } = require('mongodb');
require('dotenv').config({ path: 'sample.env' });

let db;

async function connectToDb() {
  // Atlas URL - replace UUU with user, PPP with password, XXX with hostname
  const url = process.env.DB_URL || 'mongodb+srv://Yon:jOwW910yY5rIjkMX@yfirstcluster.nisig.mongodb.net/issuetracker';
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
