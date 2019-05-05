const moment = require('moment');

var exports = module.exports;

exports.dateWithinRange = function (date, fromDate, toDate = new Date()) {
  const transactionDate = moment(date).valueOf();
  const minDate = moment(fromDate).valueOf();
  const maxDate = moment(toDate).valueOf();

  return transactionDate >= minDate && transactionDate <= maxDate;
}

exports.ynabCurrenct = function (amount) {
  return amount / 1000;
}

exports.groupByDate = function (transactions) {
  return transactions.reduce( (transactionsByDate, transaction) => {
    const { date, ...transactionWithoutDate } = transaction;
    const prettyDate = moment().format('YYYY-MM-DD');

    if(!transactionsByDate[prettyDate]) {
      // create array for date
      transactionsByDate[prettyDate] = [];
    }

    transactionsByDate[prettyDate] = [ transactionWithoutDate, ...transactionsByDate[prettyDate] ];

    return transactionsByDate;
  }, {})
}