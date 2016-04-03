'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // Sever Domain name
  domain: process.env.DOMAIN || 'localhost',
  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'secret'
  },
  // RethinkDB database config
  dbConfig: {
    host: '10.102.200.112',
    port: 28015,
    db: 'test',
    authKey: '',
    maxPoolSize: 10 // Max number of simultaneous DB connections (set to 1 to disable pooling)
  }
};