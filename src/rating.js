'use strict';

export class Rating {
  constructor(key) {
    this._key = key;
    this._value = [];
    this.#getLocalStorage();
  }

  get value() {
    this.#getLocalStorage();
    return this._value;
  }

  add(score, time) {
    if (!score || typeof score !== 'number') return;
    if (!time || typeof time !== 'string') return;

    const record = { date: Date.now(), score, time };

    this._value.push(record);
    this.#sort();
    this.#setLocalStorage();
  }

  clean() {
    this._value = [];
    this.#setLocalStorage();
  }

  #sort() {
    this._value.sort(function (a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
    });
  }

  #setLocalStorage() {
    localStorage.setItem(this._key, JSON.stringify(this._value));
  }

  #getLocalStorage() {
    (localStorage[this._key])
      ? this._value = JSON.parse(localStorage[this._key])
      : this._value = [];

    this.#sort();
  }
}

export default Rating;
