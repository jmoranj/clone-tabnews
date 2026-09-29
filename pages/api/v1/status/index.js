import database from "@/infra/database";


async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query('SHOW server_version');
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query('SHOW max_connections')
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseOpenedConnectionsResult = await database.query("SELECT * FROM pg_stat_activity WHERE datname = 'local_db';");
  const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows.length;
  
  const dependencies = {
    database: {
      database_version: databaseVersionValue,
      database_max_connections: parseInt(databaseMaxConnectionsValue),
      database_opened_connections: databaseOpenedConnectionsValue
    }
  }


  response.status(200).json({
    updated_at: updatedAt,
    dependencies,
  });
}

export default status