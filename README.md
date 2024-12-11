# axpert-monitor-mqtt

Based on https://github.com/b48736/axpert-monitor

** Work in progress **

Send Axpert inverter data from HID/RS232 to MQTT.

Periodically send status over MQTT and react to some commands.

Commands are checked with `startsWith` to work as a firewall.

## Install steps

```
# Nodered
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered) --confirm-install --confirm-pi
cd ~/.node-red
npm install node-red-dashboard node-red-contrib-persist
cd
sudo systemctl enable nodered.service
sudo systemctl start nodered.service

# MQTT broker
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl enable mosquitto.service
sudo systemctl start mosquitto.service

sudo apt install -y git
git clone https://github.com/hubmartin/axpert-monitor-mqtt.git
cd axpert-monitor-mqtt
sudo apt install libusb-1.0-0-dev
# if node is too new, try nvm install 18.15.0
npm install

sudo npm install pm2 -g
pm2 install pm2-logrotate
pm2 start index.js --name axpert-monitor-mqtt
#pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
pm2 save

curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```
On older RPI I had to run this before npm install: `sudo apt install libusb-dev libudev-dev`.

Import node-red-flow.json file in Node-red

