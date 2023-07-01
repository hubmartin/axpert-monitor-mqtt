# axpert-monitor-mqtt

Based on https://github.com/b48736/axpert-monitor

** Work in progress **

Send Axpert inverter data from HID/RS232 to MQTT.

Periodically send status over MQTT and react to some commands.

Commands are checked with `startsWith` to work as a firewall.

## Install steps

```
git clone https://github.com/hubmartin/axpert-monitor-mqtt.git
cd axpert-monitor-mqtt
npm install
```
On older RPI I had to run this before npm install: `sudo apt install libusb-dev libudev-dev`.

