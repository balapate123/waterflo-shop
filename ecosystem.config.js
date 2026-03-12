module.exports = {
  apps: [{
    name: 'waterflo',
    script: 'server/index.js',
    instances: 2,
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
