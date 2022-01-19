# Hosts Redirect Process
Do you hate always having to type github.com or getting recommended wrong domains? Customize your own domain settings. Type `gh/USERNAME` to go to `github.com/USERNAME`

**Disclaimer:** 

I was bored, hate searchbar recommendations and prever not to type full domains if the recommendation from my browser is too specific. idk what I am doing honestly. but it works \o/

**Default Port**: 7813

# Setup (Mac OS)

## Check if local ip is available
```
ping 13.0.0.78
```
if it responds, choose a different local ip

## Forward 13.0.0.78 to localhost:7813
```bash
sudo ifconfig lo0 13.0.0.78 alias
echo "rdr pass on lo0 inet proto tcp from any to 13.0.0.78 port 80 -> 127.0.0.1 port 7813" | sudo pfctl -ef -
```

## Setup /etc/hosts
Add the following to the /etc/hosts file
```
13.0.0.78  DOMAIN_KEYS
```
Example:
```
13.0.0.78  gh
```

## Setup domains.map
Copy `domains.map.example` to `domains.map`
```
cp domains.map.example domains.map
```

Setup your own domains (that you setup in the hosts file aswell)

```
gh=https://github.com
```

# Start
Either you can just start it via `npm start`
OR
run it in the background via `forver`

```
npm install forever -g
npm run forever
```
