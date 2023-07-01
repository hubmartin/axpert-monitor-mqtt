# axpert-monitor-mqtt

Based on https://github.com/b48736/axpert-monitor

** Work in progress **

Send Axpert inverter data from HID/RS232 to MQTT.

Periodically send status over MQTT and react to some commands.

Commands are checked with `startsWith` to work as a firewall.

## Install steps

```
# Nodered
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)
sudo systemctl enable nodered.service

# MQTT broker
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl enable mosquitto.service

git clone https://github.com/hubmartin/axpert-monitor-mqtt.git
cd axpert-monitor-mqtt
npm install

sudo npm install pm2 -g
pm2 install pm2-logrotate
pm2 start index.js --name axpert-monitor-mqtt
```
On older RPI I had to run this before npm install: `sudo apt install libusb-dev libudev-dev`.

In node.red install 
`node-red-dashboard`
`node-red-contrib-persist`

Import node-red-flow.json file in Node-red

