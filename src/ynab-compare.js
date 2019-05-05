require('dotenv').config()
const { readYNAB } = require('./ynab-parse');
const { readCSV, getDateRange } = require('./csv-parse');
const { groupByDate } = require('./utils');
const moment = require('moment');

( async () => {
  try {
    const csvTransactions = await readCSV(process.argv[2]);
    const { min, max } = getDateRange(csvTransactions);

    const ynabTransactions = await readYNAB(min, max);
    // console.log(`${ynabTransactions.length} ynab and ${csvTransactions.length} csv transactions found form dates ${moment(min).format('YYYY-MM-DD') } to ${moment(max).format('YYYY-MM-DD') }`);

    const groupedYNAB = groupByDate(ynabTransactions);
    const groupedCSV = groupByDate(csvTransactions);

    // console.log(Object.keys(groupedYNAB));
    // console.log(Object.keys(groupedCSV));

    const ynabUnmatched = compareTwoTransactions(groupedYNAB, groupedCSV);
    const csvUnmatched = compareTwoTransactions(groupedCSV, groupedYNAB);

    console.log('Unmatched ynab transactions:', ynabUnmatched.length);
    console.log('Unmatched csv transactions:', csvUnmatched.length);
  }
  catch(e) {
    console.log(e);
    process.exit(1);
  }

})();

function compareTwoTransactions(trans1, trans2) {
  const keys = Object.keys(trans1);

  return keys.reduce( (unmatched, day) => {
    // for each day find unmatched
    const daysUnmatched = findUnmatched(trans1[day], trans2[day]);
    const unmatchedWithDate = daysUnmatched.map( (transaction) => {
      return {
        ...transaction,
        date: day
      };
    })

    return [...unmatched, ...unmatchedWithDate];
  }, []);
}

function findUnmatched(needles, haystacks) {
  // for each needle remove needle and haystack if match found
  needles.forEach( (needle, i, arr ) => {
    let j = haystacks.findIndex( (transaction, j) => transaction['amount'] == needle['amount']);

    if(j > -1) {
       needles.splice(i, 1);
       haystacks.splice(j, 1);
    }
  });

  return needles;
}
