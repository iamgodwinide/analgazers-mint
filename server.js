const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./client/build"));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

const PORT = 9045;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));

server{
    server_name test.analgazers.wtf www.www.test.analgazers.wtf;
    location / {
        proxy_pass http://localhost:9045; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}