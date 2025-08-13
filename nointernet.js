(function (Scratch) {
  "use strict";

  class AirplaneModeBlocker {
    constructor() {
      this.airplaneModeOn = false;
    }

    getInfo() {
      return {
        id: "airplaneModeBlocker",
        name: "Airplane Mode Blocker",
        color1: "#ff0000",
        color2: "#aa0000",
        blocks: [
          {
            opcode: "setAirplaneMode",
            blockType: Scratch.BlockType.COMMAND,
            text: "set airplane mode to [MODE]",
            arguments: {
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: "onOff",
                defaultValue: "on",
              },
            },
          },
          {
            opcode: "httpRequest",
            blockType: Scratch.BlockType.REPORTER,
            text: "HTTP GET request to [URL]",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://example.com",
              },
            },
          },
        ],
        menus: {
          onOff: {
            acceptReporters: true,
            items: [
              { text: "on", value: "on" },
              { text: "off", value: "off" },
            ],
          },
        },
      };
    }

    setAirplaneMode(args) {
      this.airplaneModeOn = args.MODE === "on";
    }

    httpRequest(args) {
      if (this.airplaneModeOn) {
        // Block the request
        return "Error: Network blocked by Airplane Mode";
      }
      // Allow request normally
      return fetch(args.URL)
        .then((response) => {
          if (!response.ok) throw new Error("Network error");
          return response.text();
        })
        .catch(() => "Error: Request failed");
    }
  }

  Scratch.extensions.register(new AirplaneModeBlocker());
})(Scratch);
