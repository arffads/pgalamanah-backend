module.exports = {
  apps: [
    {
      name: 'pgalamanah',
      script: './server.js',
      watch: false,
      force: true,
      env: {
        PORT: 8000,
        NODE_ENV: 'development'
      },
    },
  ],
};
