const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed frontend URLs
const allowedOrigins = [
  'https://four-ai-dev.vercel.app',
  'https://four-ai.vercel.app',
  'https://four-ai-frontend.vercel.app',
  'https://four-ai-frontend-git-main-abdullahasim1.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// MySQL Connection Pool (better for serverless)
const mysqlConfig = {
  host: process.env.MYSQL_ADDON_HOST || process.env.MYSQL_HOST || process.env.DB_HOST,
  user: process.env.MYSQL_ADDON_USER || process.env.MYSQL_USER || process.env.DB_USER,
  password: process.env.MYSQL_ADDON_PASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQL_ADDON_DB || process.env.MYSQL_DATABASE || process.env.DB_NAME,
  port: process.env.MYSQL_ADDON_PORT || process.env.MYSQL_PORT || process.env.DB_PORT || 3306,
  // Connection pool settings for serverless
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Debug .env values
console.log('✅ ENV Check:', {
  MYSQL_ADDON_HOST: process.env.MYSQL_ADDON_HOST,
  MYSQL_ADDON_USER: process.env.MYSQL_ADDON_USER,
  MYSQL_ADDON_PASSWORD: !!process.env.MYSQL_ADDON_PASSWORD ? '✅ set' : '❌ missing',
  MYSQL_ADDON_DB: process.env.MYSQL_ADDON_DB,
  MYSQL_ADDON_PORT: process.env.MYSQL_ADDON_PORT
});

console.log('Connecting to MySQL with:', {
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  database: mysqlConfig.database,
  port: mysqlConfig.port
});

// Create connection pool
const pool = mysql.createPool(mysqlConfig);

// Test pool connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL pool connection failed:', err);
    return;
  }
  console.log('✅ MySQL pool connected successfully');
  
  // Create users table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('❌ Failed to create users table:', err);
    } else {
      console.log('✅ Users table is ready');
    }
    connection.release();
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ Four-AI backend is running on Railway');
});

// Test endpoint for CORS
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// Database health check endpoint
app.get('/api/db-test', async (req, res) => {
  try {
    const [result] = await pool.promise().query('SELECT 1 as test');
    res.json({ 
      success: true, 
      message: 'Database connection working!',
      dbState: 'connected',
      test: result[0]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message,
      dbState: 'disconnected'
    });
  }
});

// Handle CORS preflight requests
app.options('*', cors());

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  // Set CORS headers explicitly
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  const { name, email, password } = req.body;

  try {
    const [existingUsers] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const [result] = await pool.promise().query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      userId: result.insertId
    });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating user',
      error: error.message 
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.promise().query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ success: false, message: 'Error during login' });
  }
});

// Forgot Password endpoint
app.post('/api/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Email and new password are required.' });
  }
  try {
    const [result] = await pool.promise().query(
      'UPDATE users SET password = ? WHERE email = ?',
      [newPassword, email]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ success: false, message: 'Error updating password.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
