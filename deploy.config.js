module.exports = {
  app: [{
    name: 'pc-meituan',
    script: 'server/index.js',
    env: {
      COMMON_VARIABLE: 'true'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '47.105.106.4',
      ref: 'origin/master',
      repo: '',
      path: '/www/pc-meituan/production',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'npm install && npm run build && npm start && pm2 startOrRestar deploy.config.js --env production',

    }
  }
}