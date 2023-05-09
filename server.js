const express = require("express");
const app = express();
const dotenv = require("dotenv");
const jobScheduler = require("./helpers/jobsetter");
const emailRoute = require('./Routes/email.routes');
const bodyparser = require('body-parser');
const runServer = () => {
  app.use(bodyparser.json());
  jobScheduler(
    "* * * * * ",
    () => {
      console.log("job is running");
    },
    null,
    true,
    process.env.TZ
  );
  app.use('/api',emailRoute)
  dotenv.config();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};
runServer();
