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
    return await this.get("/api/characters");
  }

  async getCharacter(id) {
    return await this.get(`/api/characters/${id}`);
  }

  async getWeapons() {
    return await this.get("/api/weapons/");
  }

  async getWeapon(id) {
    return await this.get(`/api/weapons/${id}`);
  }

  async getPresets() {
    return await this.get("/api/presets");
  }
}

class CharacterManager {
  constructor() {}

  async init() {}

  async getDetail(id) {}
}

class WeaponData {
  constructor(api) {}

  async init() {}

  getByType(type) {}

  get(id) {}
}

class Application {
  constructor() {}
}
