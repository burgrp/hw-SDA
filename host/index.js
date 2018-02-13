let mqtt = require("mqtt")
let client = mqtt.connect("mqtt://localhost")

client.on("connect", () => {

    function send(bytes) {
        client.publish("esp8266_115CC6/spi/write", Buffer.from(bytes));
    }

    send([0x00,
        0, 2, 0, 129,
        0, 1, 0, 128,
        1, 128 * 128 / 256, 0, 0xFF, 0xFF, 0xFF
    ]);

    send([0x00,
        0, 3, 0, 128,
        0, 2, 0, 127,        
        1, 126 * 126 / 256, 4, 0x00, 0x00, 0xFF
    ]);

    client.end();
})
