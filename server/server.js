var express = require("express");

const app = express();
var timeOut = true; 

setTimeout(function() {
    if(timeOut === true) {
        console.log("fkdjfkd");
    }
}, 2000);

app.post('/', (req, res) => {
    // console.log(req);
    console.log("YEET");
    timeOut = false;
    return res.send('Received a GET HTTP method');
});

app.listen(4000, () =>
  console.log(`Example app listening on port 4000!`),
);

