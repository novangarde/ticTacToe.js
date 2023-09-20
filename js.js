"use strict";

const ticTacToe = {
  gameTableElement: document.getElementById("game"),
  status: "playing",
  mapValues: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  phase: "X",

  init() {
    this.renderMap();
    this.initEventHandlers();
  },

  renderMap() {
    for (let row = 0; row < 3; row++) {
      const tr = document.createElement("tr");
      this.gameTableElement.appendChild(tr);
      for (let col = 0; col < 3; col++) {
        const td = document.createElement("td");

        td.dataset.row = row; // в новый тег td добавляется аттрибут data-row с номером строки
        td.dataset.col = col; // в новый тег td добавляется аттрибут data-col с номером колонки

        tr.appendChild(td);
      }
    }
  },

  initEventHandlers() {
    this.gameTableElement.addEventListener("click", (event) =>
      this.cellClickHandler(event)
    );
  },

  cellClickHandler(event) {
    if (!this.isClickCorrect(event)) {
      return;
    }

    this.fillCell(event);

    if (this.hasWon()) {
      this.sayStatusStopped();
      this.sayWonPhrase();
    }
    
    this.switchPhase();
  },

  isClickCorrect(event) {
    return this.isCellEmpty(event) && this.isStatusPlaying();
  },

  isCellEmpty(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    return this.mapValues[row][col] === "";
  },

  isStatusPlaying() {
    return this.status === "playing";
  },

  fillCell(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    
    this.mapValues[row][col] = this.phase;
    event.target.textContent = this.phase;
  },

  sayStatusStopped() {
    this.status = "stopped";
  },

  hasWon() {
    return (
      this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
      this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
      this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

      this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
      this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
      this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

      this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
      this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 })
    );
  },

  isLineWon(a, b, c) {
    const value =
      this.mapValues[a.y][a.x] +
      this.mapValues[b.y][b.x] +
      this.mapValues[c.y][c.x];
    return value === "XXX" || value === "000";
  },

  sayWonPhrase() {
    const figure = this.phase === "X" ? "крестики" : "нолики";
    setTimeout(() => alert(`Победили ${figure}`), 1);
  },

  switchPhase() {
    this.phase = this.phase === "X" ? "0" : "X";
  }
};