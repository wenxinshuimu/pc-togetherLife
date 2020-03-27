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
      host: '120.76.112.200',
      ref: 'origin/master',
      repo: 'https://gitee.com/wenxinshuimu/meituan.git',
      path: '/www/mpc-meituan/production',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'npm install && npm run build && npm start && pm2 startOrRestar deploy.config.js --env production',

    }
  }
}