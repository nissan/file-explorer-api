export default () => ({
    port: parseInt(process.env.API_PORT, 10) || 4000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
  });