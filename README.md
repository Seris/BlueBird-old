BlueBird
========
#### (FR) Cahier des charges
https://docs.google.com/document/d/1EkLz7UlYpTLVbBUgb-Lok3LzbyrJwYkPAZxRt4Eecb0
#### How to test it
Download node-webkit on github 
=> https://github.com/rogerwang/node-webkit

    git clone https://github.com/Seris/BlueBird ./BlueBird
    cd BlueBird
    npm install
    # Now configure files in etc/ (remove .sample) and configure your api key in keys.json, users.json and in test/apiKey.js
    nw ./ # Will start the application
    # nw is the executable of node-webkit
#### Running test
    mocha 
