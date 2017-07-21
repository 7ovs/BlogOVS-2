var exs = require("express");
var app = exs();
app.use(exs.static(__dirname));
var port = process.env.PORT || 3000;
app.listen(port);
console.log(`start server on port ${port}`);