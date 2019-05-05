require('dotenv').config()
const moment = require('moment');
const { readYNAB } = require('./ynab-parse');

( async () => {
  const ynabAccountTransactions = await readYNAB('2019-02-01');

  console.log(`${ynabAccountTransactions.length} transactions found from ynab`);

})();

function compareTransactions() {}