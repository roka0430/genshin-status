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
    this.characters = this.api.getCharacters();
  }

  async getDetail(id) {
    return this.api.getCharacter(id);
  }
}

class WeaponData {
  constructor(api) {
    this.api = api;
    this.weapons = [];
  }

  async init() {
    this.weapons = this.api.getWeapons();
  }

  getByType(type) {
    return this.weapons.filter((weapon) => weapon.type === type);
  }

  async getDetail(id) {
    return this.api.getWeapon(id);
  }
}

class Application {
  constructor() {
    this.apiClient = new ApiClient();
    this.characters = new CharacterData(this.apiClient);
    this.weapons = new WeaponData(this.apiClient);
  }
}
