
      /*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
    
import { Sequelize } from "sequelize";
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'your-supabase-url';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'your-supabase-anon-key';

// Create Supabase client (optional, for direct Supabase features)
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Sequelize with PostgreSQL (Supabase uses PostgreSQL)
// Connection string format: postgresql://[user]:[password]@[host]:[port]/[database]
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres';

let sequelize;
try {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false // Set to console.log to see SQL queries
  });
  
  console.log('✅ Database connection configured successfully.');
} catch (error) {
  console.error('❌ Unable to configure database:', error.message);
  console.log('🔄 App will continue without database connection...');
  
  // Create a mock sequelize instance to prevent crashes
  sequelize = {
    authenticate: () => Promise.resolve(),
    sync: () => Promise.resolve(),
    define: () => ({}),
    transaction: () => Promise.resolve({ commit: () => {}, rollback: () => {} })
  };
}

export { sequelize };
