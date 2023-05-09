const cronJob = require('cron').CronJob;
const mongoDb = require('../config/mongodb')
const scheduleDate = (date,funct,parm,parms,timezone) =>{
     console.log(date);
     const job  = new cronJob(date,funct,parm,parms,timezone);
     mongoDb();
     job.start();
}

module.exports = scheduleDate