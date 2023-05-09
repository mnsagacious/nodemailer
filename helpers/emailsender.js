const cronJob = require('cron').CronJob;

const scheduleEmail = (date,funct,parm,parms,timezone) =>{
  const job = new cronJob(date,funct,parm,parms,timezone);
  job.start();
}

module.exports = scheduleEmail