// mosquitto_sub -h test.mosquitto.org -p 8081 -t '/kim_test/#' -v

var connected_flag = 0;
var reconnectTimeout = 2000;
var mqtt;
var host = 'test.mosquitto.org';
var port = '8081';
var topic = '/kim_test';

function onConnectionLost() {
    console.log('Connection lost');
    connected_flag = 0;
}

function onFailure(message) {
    console.log('Failed');
    setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(r_message) {
    let out_message = "Message received " + r_message.payloadString + "<br>";
    console.log(out_message);
}

function onConnected(recon, url) {
    console.log("in onConnected " + recon);
}

function onConnect() {
    connected_flag = 1;
	console.log("on Connect " + connected_flag);
}

function MQTTconnect() {
    // var first_name = document.forms['connect_form']['first_name'].value;

    // if (first_name != '') {
    //     console.log('first_name');
    //     form = parseInt(first_name); // 8081
    //     console.log('first_name ' + form);
    // }

    var x = Math.floor(Math.random() * 10000);
    var cname = 'orderform-' + x;
    mqtt = new Paho.MQTT.Client(host, Number(port), cname);

    var options = {
        useSSL: true,
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;

    mqtt.connect(options);
	return false;
}

function sendMessage(msg) {
    if (connected_flag === 0 ) {
        out_message = 'Can not send the message';
        console.log(out_message);
        return false;
    } 
    message = new Paho.MQTT.Message(msg);
    console.log(msg);

    if (msg === '') {
        message.destinationName = 'test_topic';
    }
    else {
        message.destinationName = topic;
    }
    mqtt.send(message);
}