
const mqtt = require('mqtt')
const AxpertMonitor = require("axpert-monitor");

const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: '',
  password: '',
  reconnectPeriod: 1000,
})

connected = false;
payload = "";

client.on('connect', () => {
    console.log('Connected')

    topic = "axpert/cmd";
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
        connected = true;
    })
})

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())

    pstr = payload.toString();

    if(topic == "axpert/cmd")
    {
        if(pstr.startsWith('POP0'))
        {
            axpert.request(pstr);
            console.log("POP!");
        }
    }
})

const options = {
    port: "/dev/serial/by-path/platform-3f980000.usb-usb-0\:1.5\:1.0-port0", // When commented, uses HID, uncomment for UART
    // port: "/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4:1.0-port0"  // RPI4, lower left port
};

const axpert = new AxpertMonitor(options);

//axpert.request("POP02")

function fastReading() {
    axpert.get.generalStatus().then( res => {console.log(res)
        client.publish("axpert/generalStatus", JSON.stringify(res), { qos: 0, retain: false }, (error) => {
            if (error) {
            console.error(error)
            }
        })
    });
}

function slowReading()
{
    axpert.get.sendAndParse("QET").then( res => {console.log(res)
        client.publish("axpert/totalEnergyProduced", JSON.stringify(res), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    });
    
    axpert.get.mode().then( res => {console.log(res)
        client.publish("axpert/mode", JSON.stringify(res), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    });
}

var interval = setInterval(fastReading, 1000);
var interval = setInterval(slowReading, 10000);
