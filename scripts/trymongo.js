require('dotenv').config({ path: 'sample.env' });

const { MongoClient } = require('mongodb');
// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
const url = process.env.DB_URL || 'mongodb://localhost/issuetracker';


async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB URL', process.env.DB_URL);
    const db = client.db();
    const collection = db.collection('employees');
    const employee = { id: 2, name: 'B. Async', age: 16 };
    const result = await collection.insertOne(employee);
    console.log('Result of insert:\n', result.insertedId);
    const docs = await collection.find({ _id: result.insertedId })
      .toArray();
    console.log('Result of find:\n', docs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithAsync();
