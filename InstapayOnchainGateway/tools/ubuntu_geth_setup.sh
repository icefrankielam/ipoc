#!/bin/bash

sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum

cat > geth.service <<- EOM
[Unit]
Description=Geth

[Service]
Type=simple
User=root
Restart=always
WorkingDirectory=/root
ExecStart=/usr/bin/geth --fast --ropsten --wsorigins="*" --datadir /.ropsten --cache 512 --ws --wsaddr 0.0.0.0 --wsport 8545 --rpc --rpcaddr 0.0.0.0 --rpcport 8546

[Install]
WantedBy=default.target
EOM

sudo cp ./geth.service /etc/systemd/system/geth.service
sudo systemctl daemon-reload
sudo systemctl enable geth.service

sudo systemctl start geth
