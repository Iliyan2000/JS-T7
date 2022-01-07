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
    document.querySelector('.progress').style.display = "none";

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

  _loading = document.querySelector('progress');

  async _load()
  {
    let url = 'https://swapi.boom.dev/api/planets';
    let planet_pages = [];

    let res = await fetch(url);
    let data = res.json();
    planet_pages.push(data);
    for (let i = 2; i < 7; i++) {
      url = 'https://swapi.boom.dev/api/planets?page='.concat(i.toString());
      res = await fetch(url);
      data = res.json();
      planet_pages.push(data);
    }
    this._create(planet_pages);
  }

  _create(response)
  {
    for (let i = 0; i < response.length; i++) {
      for (let j = 0; j < response[i].results.length; j++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = this._render(element.name, element.terrain, element.population);  
        document.body.querySelector(".main").appendChild(box);
      }
    }
  }

  _startLoading()
  {

  }

  _stopLoading()
  {

  }
}
