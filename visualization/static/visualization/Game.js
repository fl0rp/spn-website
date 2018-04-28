"use strict";

function Game(assets, snakeMoveStrategy, container)
{
    this.ws = null;
    this.heading = 0;
    this.speed = 2;
    this.vis = new GameVisualization(assets, snakeMoveStrategy, container);

    this.protocol = new JsonProtocol();
    this.protocol.AddEventHandler('GameInfo', this.vis.HandleGameInfoMessage, this.vis);
    this.protocol.AddEventHandler('PlayerInfo', this.vis.HandlePlayerInfoMessage, this.vis);
    this.protocol.AddEventHandler('Tick', this.vis.HandleTickMessage, this.vis);
    this.protocol.AddEventHandler('WorldUpdate', this.vis.HandleWorldUpdateMessage, this.vis);
    this.protocol.AddEventHandler('BotSpawn', this.vis.HandleBotSpawnMessage, this.vis);
    this.protocol.AddEventHandler('BotKilled', this.vis.HandleBotKilledMessage, this.vis);
    this.protocol.AddEventHandler('FoodSpawn', this.vis.HandleFoodSpawnMessage, this.vis);
    this.protocol.AddEventHandler('FoodConsumed', this.vis.HandleFoodConsumedMessage, this.vis);
    this.protocol.AddEventHandler('FoodDecayed', this.vis.HandleFoodDecayedMessage, this.vis);
    this.protocol.AddEventHandler('BotMoved', this.vis.HandleBotMovedMessage, this.vis);
    this.protocol.AddEventHandler('BotsMovedDone', this.vis.HandleBotMovedMessagesDone, this.vis);
}

Game.prototype.Run = function()
{
    this.ConnectWebsocket();
    this.vis.Run();
};

Game.prototype.ConnectWebsocket = function()
{
    this.ws = new WebSocket(this.GetWebsocketURL());
    this.ws.binaryType = 'arraybuffer';
    let self = this;
    this.ws.addEventListener('open', function(event) {
       console.log("websocket connected");
    });
    this.ws.addEventListener('message', function(event) {
        self.protocol.HandleMessage(event);
    });
};

Game.prototype.GetWebsocketURL = function()
{
    let port = 80;
    return (window.location.protocol == "https:" ? "wss://" : "ws://") + window.location.hostname + ":" + port + "/websocket";
};