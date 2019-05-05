require('dotenv').config()
const moment = require('moment');
const { readYNAB } = require('./ynab-parse');

( async () => {
  let ynabAccountTransactions = await readYNAB('2019-02-01');

  // console.log(ynabAccountTransactions);
  for(let i = 0; i < 10; i++) {
    console.log(ynabAccountTransactions[i]);
  }
  // ynabAccountTransactions.forEach( (transaction) => console.log(transaction));

})();

function compareTransactions() {}