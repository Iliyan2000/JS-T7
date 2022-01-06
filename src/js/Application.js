import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    this._load();

    this.emit(Application.events.READY);
  }

  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }

  async _load()
  {
    const url = 'https://swapi.boom.dev/api/planets';

    let res = await fetch(url);
    let data = res.json();
    this._create(data);
    this._stopLoading();
  }

  _create(response)
  {
    response.forEach(element => {
      const box = document.createElement("div");
      box.classList.add("box");
      box.innerHTML = this._render(element.name, element.terrain, element.population);  
      document.body.querySelector(".main").appendChild(box);
    });
  }

  _startLoading()
  {

  }

  _stopLoading()
  {
    const bar = document.querySelector('progressbar');
    bar.setAttribute('hidden');
  }
}
