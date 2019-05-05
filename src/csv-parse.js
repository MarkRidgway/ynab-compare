const csvtojson = require("csvtojson");
const { dateWithinRange, ynabCurrenct } = require('./utils');
const moment = require('moment');

var exports = module.exports;

exports.readCSV = function (filePath) {
  return new Promise( async (resolve, reject) => {
    try {
      const csvJSON = await csvtojson().fromFile(filePath);

      let transactions = csvJSON.map( (transaction) => {
        return {
          date: moment(transaction['Posting Date']).valueOf(),
          description: transaction['Description'],
          amount: transaction['Amount'],
        };
      });

      resolve(transactions);
    }
    catch(e) {
      reject(e);
    }
  });
}

exports.getDateRange = function(csvTransactions) {
  // get all dates in a single array
  const allDates = csvTransactions.map( (transaction) => {
    return moment(new Date(transaction['date'])).valueOf();
  });

  return {
    min: Math.min(...allDates),
    max: Math.max(...allDates)
  };
}
