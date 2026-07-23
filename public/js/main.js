class ApiClient {
  constructor() {}

  async get(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  }

  async getCharacters() {
    return await this.get("/api/character");
  }

  async getCharacter(id) {
    return await this.get(`/api/character/${id}`);
  }

  async getWeapons() {
    return await this.get("/api/weapon/");
  }

  async getWeapon(id) {
    return await this.get(`/api/weapon/${id}`);
  }

  async getPresets() {
    return await this.get("/api/preset");
  }
}

class CharacterData {
  constructor(api) {
    this.api = api;
    this.characters = [];
  }

  async init() {
    this.characters = await this.api.getCharacters();
  }

  async getDetail(id) {
    return await this.api.getCharacter(id);
  }
}

class WeaponData {
  constructor(api) {
    this.api = api;
    this.weapons = [];
  }

  async init() {
    this.weapons = await this.api.getWeapons();
  }

  getByType(type) {
    return this.weapons.filter((weapon) => weapon.type === type);
  }

  async getDetail(id) {
    return await this.api.getWeapon(id);
  }
}

class Combobox {
  constructor(root) {
    this.root = root;
    this.input = root.querySelector('input[type="text"]');
    this.list = root.querySelector("ul");
    this.value = root.querySelector('input[type="hidden"]');
    this.items = [];
  }

  init() {
    this.input.addEventListener("focus", () => this.input.select());
    this.input.addEventListener("input", () => this.filterList());
    this.input.addEventListener("keydown", (e) => this.onKeyDown(e));
  }

  setItems(items) {
    this.items = items.map((item) => ({
      data: item,
      element: null,
    }));
    this.visible = this.items;
    this.selectedIndex = 0;

    this.list.textContent = "";
    for (const [i, item] of this.items.entries()) {
      item.element = document.createElement("li");
      item.element.dataset.id = item.data.id;
      item.element.textContent = item.data.name;
      item.element.addEventListener("mousedown", () => this.clickSelection(i));
      this.list.appendChild(item.element);
    }

    this.updateSelection();
  }

  filterList() {
    const keyword = this.hiraToKana(this.input.value);

    this.visible = this.items.filter((item) => {
      return item.data.kana.startsWith(keyword) || item.data.name.startsWith(keyword);
    });

    for (const item of this.items) {
      item.element.classList.toggle("hidden", !this.visible.includes(item));
    }

    this.selectedIndex = 0;
    this.updateSelection();
  }

  hiraToKana(str) {
    return str.replace(/[ぁ-ゖ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));
  }

  onKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.moveSelection(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        this.moveSelection(-1);
        break;
      case "Enter":
        e.preventDefault();
        this.selectItem();
        break;
    }
  }

  moveSelection(offset) {
    if (this.visible.length === 0) return;

    this.selectedIndex += offset;
    if (this.selectedIndex < 0) this.selectedIndex = this.visible.length - 1;
    if (this.selectedIndex >= this.visible.length) this.selectedIndex = 0;

    this.updateSelection();
  }

  updateSelection() {
    for (const item of this.items) item.element.classList.remove("selected");
    const selected = this.visible[this.selectedIndex];
    if (!selected) return;
    selected.element.classList.add("selected");
    const top = selected.element.offsetTop;
    const listHeight = this.list.clientHeight;
    const itemHeight = selected.element.clientHeight;
    this.list.scrollTop = top - listHeight / 2 + itemHeight / 2;
  }

  clickSelection(index) {
    this.selectedIndex = index;
    this.selectItem();
    this.filterList();
  }

  selectItem() {
    const selected = this.visible[this.selectedIndex];

    if (!selected) return;

    this.input.value = selected.data.name;
    this.value.value = selected.data.id;

    this.input.blur();
  }
}

class Application {
  constructor() {
    this.apiClient = new ApiClient();
    this.characters = new CharacterData(this.apiClient);
    this.weapons = new WeaponData(this.apiClient);

    this.characterCombo = new Combobox(document.getElementById("combobox"));
  }

  async init() {
    await this.characters.init();

    this.characterCombo.init();
    this.characterCombo.setItems(this.characters.characters);
  }
}

const app = new Application();
app.init();
