const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Each board keeps an array of draw segments so late joiners can reconstruct the canvas.
const boardState = new Map();

function getBoard(boardId) {
  if (!boardState.has(boardId)) {
    boardState.set(boardId, { segments: [] });
  }
  return boardState.get(boardId);
}

io.on("connection", (socket) => {
  socket.on("join_board", (boardIdRaw) => {
    const boardId = String(boardIdRaw || "set1").trim() || "set1";
    socket.join(boardId);

    const board = getBoard(boardId);
    socket.emit("board_snapshot", board.segments);
  });

  socket.on("draw_segment", ({ boardId, segment }) => {
    if (!boardId || !segment) return;

    const board = getBoard(boardId);
    board.segments.push(segment);

    // Keep recent history bounded for long sessions.
    if (board.segments.length > 25000) {
      board.segments = board.segments.slice(-25000);
    }

    socket.to(boardId).emit("draw_segment", segment);
  });

  socket.on("clear_board", (boardIdRaw) => {
    const boardId = String(boardIdRaw || "set1").trim() || "set1";
    const board = getBoard(boardId);
    board.segments = [];
    io.to(boardId).emit("clear_board");
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(PORT, () => {
  console.log(`AIBoard running on http://localhost:${PORT}`);
});
