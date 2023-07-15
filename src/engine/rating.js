'use strict';

/** Class Rating for rating. */
export class Rating {
  /**
   * Create Rating class instance.
   * @param {string} key Unique key to use in local storage.
   */
  constructor(key) {
    this._key = key;
    this._value = [];
    this.#getLocalStorage();
  }

  /**
   * Get the current rating state.
   * @returns {Array<object<{date: Date, score: number, time: string}>>} Rating state.
   */
  get value() {
    this.#getLocalStorage();
    return this._value;
  }

  /**
   * Add new record to the rating.
   * @param {number} score Score of the record.
   * @param {string} time Time of the record.
   */
  add(score, time) {
    if (!score || typeof score !== 'number') return;
    if (!time || typeof time !== 'string') return;

    const record = { date: Date.now(), score, time };

    this._value.push(record);
    this.#sort();
    this.#setLocalStorage();
  }

  /**
   * Delete all records.
   */
  clean() {
    this._value = [];
    this.#setLocalStorage();
  }

  /**
   * Sort records.
   * @private
   */
  #sort() {
    this._value.sort(function (a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
    });
  }

  /**
   * Set record state to the local storage.
   */
  #setLocalStorage() {
    localStorage.setItem(this._key, JSON.stringify(this._value));
  }

  /**
   * Get record state from the local storage.
   */
  #getLocalStorage() {
    localStorage[this._key]
      ? (this._value = JSON.parse(localStorage[this._key]))
      : (this._value = []);

    this.#sort();
  }
}

export default Rating;
