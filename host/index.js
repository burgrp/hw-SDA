const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost")

client.on("connect", () => {

    function send(bytes) {
        client.publish("esp8266_115CC6/screen/write", Buffer.from(bytes));
    }

    // gray frame
    send([0x00,
        0, 2, 0, 129,
        0, 1, 0, 128,
        1, 128 * 128 / 256, 0, 0xAA, 0xAA, 0xAA
    ]);

    // red fill
    send([0x00,
        0, 3, 0, 128,
        0, 2, 0, 127,        
        1, 126 * 126 / 256, 4, 0x00, 0x00, 0xFF
    ]);

    // white rectange
    send([0x00,
        0, 10, 0, 12,
        0, 10, 0, 12,
        1, 0, 3*3, 0xFF, 0xFF, 0xFF
    ]);

    // almost black point to test repeat escape
    send([0x00,
        0, 11, 0, 11,
        0, 11, 0, 11,
        1, 0, 0,
        0,
        0
    ]);


    client.end();
})
