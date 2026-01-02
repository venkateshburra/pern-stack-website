import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";

import 'dotenv/config';

//init arcjet
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // sheild protects your app from common attacts ex: sql inhection XSS, CSRF attacks
        shield({mode: "LIVE"}),
        detectBot({
            mode: "LIVE",
            // block all bots exept search engine
            allow:[
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),
        //rate limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 20,
            interval: 5,
            capacity: 30
        })
    ]
})