const moment = require('moment');
var date = moment();
console.log(date.format('MMM Do, YYYY'));
//10:30 am
console.log(date.format('h:mm a'));

var someTimeStamp = date.valueOf();
console.log(someTimeStamp);