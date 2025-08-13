(function (Scratch) {
  "use strict";

  class HTTPBlocker {
    getInfo() {
      return {
        id: "httpBlocker",
        name: "HTTP Blocker",
        color1: "#d62828",
        color2: "#9e1b1b",
        blocks: [
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
      };
    }

    httpRequest() {
      // Block *every* HTTP request, always.
      return "Error: Network blocked";
    }
  }

  Scratch.extensions.register(new HTTPBlocker());
})(Scratch);
