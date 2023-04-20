/* eslint-disable no-fallthrough */
const WS = require("ws");
const http = require("http");
const Koa = require("koa");
const koaBody = require("koa-body");
const cors = require("koa-cors");
const Chat = require("./src/Chat");

const appChat = new Chat();
const app = new Koa();

app.use(cors());

app.use(
    koaBody({
        text: true,
        urlencoded: true,
        json: true,
        multipart: true,
    })
);

const server = http.createServer(app.callback()).listen(7070);

const WSServer = new WS.Server({ server });

WSServer.on("connection", (ws, req) => {
    ws.addEventListener("message", (msg) => {
        const { method, id, name, author, text } = JSON.parse(msg.data);

        switch (method) {
            case "getAllUsers":
                ws.send(JSON.stringify(appChat.getAllUsers()));
                break;
            case "getAllMessages":
                ws.send(JSON.stringify(appChat.getAllMessages()));
                break;
            case "createNewUser":
                appChat.createNewUser(name);
                ws.send(JSON.stringify(appChat.getAllUsers()));
                break;
            case "createNewMessage":
                appChat.createNewMessage(author, text);
                ws.send(JSON.stringify(appChat.getAllMessages()));
                break;
            default:
                ctx.response.status = 404;
                break;
        }
    });
});
