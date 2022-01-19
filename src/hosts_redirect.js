const fs = require("fs")

const PORT = process.env.PORT || 7813;

const domain_file_content = fs.readFileSync('./src/domains.map', 'utf8');
const domain_file_lines = domain_file_content.split('\n');

const domains = domain_file_lines.reduce((all, line) => {
    let [key, value] = line.split("=");
    return {
        ...all,
        [key]: value
    }
}, {});

// start express server and redirect from domains to domains[domain] + path + query
const express = require('express')
const app = express()

app.get("*", (req, res) => {
    let domain = req.hostname;
    let url = domains[domain]
    if (url) {
        let args = new URLSearchParams(req.query);
        url = url + req.path + "?" + args.toString();
        res.redirect(url);
    } else {
        res.send("please add domain mapping for " + domain);
    }
})

// start app
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});