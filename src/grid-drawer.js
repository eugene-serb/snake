'use strict';

export class GridDrawer {
  constructor(container, width, height) {
    this.$container = container;
    this.width = width;
    this.height = height;

    this.draw();
  }

  draw() {
    this.$container.innerHTML = '';

    let $map = document.createElement('div');
    $map.classList.add('map');
    this.$container.appendChild($map);

    for (let y = this.height; y >= 1; y--) {
      for (let x = 1; x <= this.width; x++) {
        let $cell = document.createElement('div');
        $cell.classList.add('cell');
        $cell.setAttribute('x', x);
        $cell.setAttribute('y', y);
        $map.appendChild($cell);
      }
    }
  }
}

export default GridDrawer;
