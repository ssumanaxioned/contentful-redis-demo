require('dotenv').config();

const RedisContentful = require('redis-contentful');

const client = new RedisContentful({
  redis: {
    database: 0, // Optional param, default - 0
    host: process.env.REDIS_HOST, // Optional param, default - 127.0.0.1
    port: process.env.REDIS_PORT, // Optional param, default - 6379
  },
  contentful: {
    space: process.env.CONTENTFUL_SPACE,
    // accessToken: 'WcQGwDb3sYIZolBhCRVzRzBHsId5pKqYkOx2R-j2d2M',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    locale: 'en-US', // Optional param, default - en-US
    environment: process.env.CONTENTFUL_ENVIRONMENT    , // contentful environment, default is master
    identifier: 'content-type', // Optional param, default - sys.id
  },
});


async function main() {
    const data =  await client.sync();
    console.log("🚀 ~ main ~ data:", data)
    console.log("🚀 ~ main ~ client:", client)
    const newData =  await client.get('portfolioIndividual');
    console.log("🚀 ~ main ~ data:", newData)
  }
  
  main();
  
//   const redis = require('redis');
//   const contentful = require('contentful');
  
  
//   // Initialize Contentful client
//   const contentfulClient = contentful.createClient({
//     space: 'h4tt3y7ev6pr',
//     accessToken: 'Ix7gmGoXOEA8FO7MFf6RKK_FDnAsJ-jGvX79Kq4hYIk',
//   });
  
//   // Function to fetch all entries from Contentful and store them in Redis
//   async function syncContentfulToRedis() {
//     try {
//       const redisClient = await redis.createClient()
//       .on('error', err => console.log('Redis Client Error', err))
//       .connect();

//       const entries = await contentfulClient.getEntries();
//     console.log("🚀 ~ syncContentfulToRedis ~ entries:", entries.items[0])
    
//     entries.items.forEach(async (entry) => {
//       const entryId = entry.sys.id;
//       const content = JSON.stringify(entry);
      
//       // Store entry in Redis
//       const dataItems = await redisClient.set(entryId, content);
//       console.log("🚀 ~ entries.items.forEach ~ dataItems:", dataItems)
      
//       // Optionally set expiration time (e.g., 1 hour)
//       // await redisClient.expire(entryId, 3600);
//     });
    
//     console.log('Content synced from Contentful to Redis successfully.');
//   } catch (error) {
//     console.error('Error syncing content:', error);
//   }
// }

// // Call the function to start the synchronization process
// syncContentfulToRedis();