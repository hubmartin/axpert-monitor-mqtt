# axpert-monitor-mqtt

Based on https://github.com/b48736/axpert-monitor

** Work in progress **

Send Axpert inverter data from HID/RS232 to MQTT.

Periodically send status over MQTT and react to some commands.

Commands are checked with `startsWith` to work as a firewall.