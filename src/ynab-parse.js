const fetch = require('node-fetch');
const { Headers } = require('node-fetch');
const btoa = require('btoa');
const moment = require('moment');
const token = process.env.YNAB_TOKEN;
const api = process.env.YNAB_API_BASE;
const budgetid = process.env.YNAB_BUDGET_ID;
const accountid = process.env.YNAB_ACCOUNT_ID;
const endpoints = {
  transactions: `/budgets/${budgetid}/accounts/${accountid}/transactions/`
};

var exports = module.exports;

exports.readYNAB = function (fromDate, toDate = new Date()) {
  return new Promise( async (resolve, reject) => {
    console.log({ fromDate, toDate });

    try {
      resolve(await getAccountTransactions());
    }
    catch (e) {
      reject(e);
    }
  });
}

function getAccountTransactions() {
  return new Promise( (resolve, reject) => {
    let url = `${api}${endpoints['transactions']}`;

    fetch(url, {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
    })
    .then( async (response) => {
      let json = await response.json();
      resolve(json['data']['transactions']);
    })
    .catch( (e) => {
      reject(e);
    });
  });
}
