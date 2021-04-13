const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const { connect } = require('mongoose');

require('dotenv').config();

const ecommerceRouter = require('./src/routers/ecommerceRouter');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

connect(process.env.DDBB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/ecommerce', ecommerceRouter);

app.listen(port, () => debug(`Server running in ${chalk.green(port)}`));
