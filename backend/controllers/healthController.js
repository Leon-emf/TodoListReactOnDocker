const pool = require('../config/database');

// Check database connection
exports.checkDatabaseConnection = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.status(200).send('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
    const dbError = new Error('Database connection failed');
    dbError.statusCode = 500;
    next(dbError);
  }
};
