
const mqtt = require('mqtt')
const AxpertMonitor = require("axpert-monitor");

const host = '192.168.1.112'
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
    //port: "/dev/ttyUSB0", // When commented, uses HID, uncomment for UART
};

const axpert = new AxpertMonitor(options);

//axpert.request("POP02")

function test() {
    axpert.get.generalStatus().then( res => {console.log(res)
    
    client.publish("axpert/test", JSON.stringify(res), { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }
      })
    });
}

var interval = setInterval(test, 4000);