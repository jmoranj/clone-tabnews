import { Client } from "pg";

async function query(queryObject){
  const client = new Client({
    host: process.env.POSTGRES_HOST ?? "localhost",
    port: process.env.POSTGRES_PORT ?? 5432,
    user: process.env.POSTGRES_USER ?? "postgres",
    database: process.env.POSTGRES_DB ?? "postgres",
    password: process.env.POSTGRES_PASSWORD ?? "local_pass",
    ssl: getSSLValues(),
  })
  
  try {
    await client.connect()
    const result = await client.query(queryObject)
    return result    
  } catch (error) {
    console.log(error);
    throw(error)
  } finally {
    await client.end()
  }

}

export default {
  query: query
}

function getSSLValues(){
  if(process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    }
  }

  return process.env.NODE_ENV === 'development' ? false : true;
}

