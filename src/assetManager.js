import { TextureAtlas } from "@pixi-spine/base";
import { AtlasAttachmentLoader, SkeletonJson } from "@pixi-spine/runtime-3.8";
import { BaseTexture, Texture } from "@pixi/core";
import { Spritesheet } from "@pixi/spritesheet";
import { Howl } from "howler";
import assetData from "../dist/assets/assetData.json";
import { Debug } from "./helpers/debug";
import { SoundManager } from "./soundManager";

export class AssetManager {
  static load(onLoaded) {
    this.loaded = false;
    this._onLoaded = onLoaded;
    // this._loadTextures();
    this._loadAtlases();
    this._loadSpines();
    SoundManager.load(assetData.sound, assetData.soundData, this._checkLoad.bind(this));
  }

  static _loadAtlases() {
    console.time("load atlas");
    this.TOTAL_ATLASES = 3;
    this._loadedAtlases = 0;
    this._allAtlasesLoaded = false;

    if (assetData.atlas) {
      this._loadAtlas("atlas", assetData.atlas, assetData.atlasData, this._onOneAtlasLoaded.bind(this, "Atlas"));
    }
    else {
      this._onOneAtlasLoaded("Atlas");
    }

    if (assetData.atlas8) {
      this._loadAtlas("atlas8", assetData.atlas8, assetData.atlas8Data, this._onOneAtlasLoaded.bind(this, "Atlas8"));
    }
    else {
      this._onOneAtlasLoaded("Atlas8");
    }

    if (assetData.atlas32) {
      this._loadAtlas("atlas32", assetData.atlas32, assetData.atlas32Data, this._onOneAtlasLoaded.bind(this, "Atlas32"));
    }
    else {
      this._onOneAtlasLoaded("Atlas32");
    }
  }

  static _loadAtlas(key, texture, data, onLoad) {
    this._loadTexture(key, texture, () => {
      let sheet = new Spritesheet(Texture.from(key), data);
      sheet.parse().then(() => {
        onLoad && onLoad();
      });
      // sheet.parse(() => onLoad && onLoad());
    });
  }

  static _onOneAtlasLoaded(name) {
    Debug.log("AssetManager", "Loaded Atlas:", name);
    this._loadedAtlases++;
    if (this._loadedAtlases >= this.TOTAL_ATLASES) {
      this._allAtlasesLoaded = true;
      this._checkLoad();
    }
  }

  static _loadTextures() {
    let keys = Object.keys(assetData.textures);
    this._allTexturesLoaded = false;
    this.TOTAL_TEXTURES = keys.length;
    if (this.TOTAL_TEXTURES <= 0) {
      this._allTexturesLoaded = true;
      this._checkLoad();
    }

    this._loadedTextures = 0;
    keys.forEach((key) => {
      this._loadTexture(key, assetData.textures[key], this._onOneTextureLoaded.bind(this));
    });
  }

  static _onOneTextureLoaded() {
    this._loadedTextures++;
    if (this._loadedTextures >= this.TOTAL_TEXTURES) {
      this._allTexturesLoaded = true;
      this._checkLoad();
    }
  }

  static _loadTexture(key, data, onLoad) {
    let img = new Image();
    img.onload = () => {
      var baseTexture = new BaseTexture(img);
      var texture = new Texture(baseTexture);
      Texture.addToCache(texture, key);
      onLoad();
    };
    img.src = data;
  }

  static _onTextureImageLoaded(img, key) {
    var baseTexture = new BaseTexture(img);
    var texture = Texture.from(baseTexture);
    Texture.addToCache(texture, key);

  }

  static _loadSpines() {
    this.spines = {};
    this._allSpinesLoaded = false;
    let keys = Object.keys(assetData.spines);
    this.TOTAL_SPINES = keys.length;
    if (this.TOTAL_SPINES <= 0) {
      this._onSpineLoaded();
    }

    this._loadedSpines = 0;
    keys.forEach((key) => this._loadSpine(key, this._onOneSpineLoaded.bind(this)));
  }

  static _onOneSpineLoaded() {
    this._loadedSpines++;
    if (this._loadedSpines >= this.TOTAL_SPINES) {
      this._onSpineLoaded();
    }
  }

  static _onSpineLoaded() {
    this._allSpinesLoaded = true;
    this._checkLoad();
  }

  static _loadSpine(key, onLoad) {
    var rawSpineData = assetData.spines[key];
    this._loadTexture(key, rawSpineData.tex, () => {
      // eslint-disable-next-line no-undef
      var atlas = new TextureAtlas(rawSpineData.txt, function(path, callback) {
        callback(Texture.from(key));
      });
      // eslint-disable-next-line no-undef
      var spineAtlasLoader = new AtlasAttachmentLoader(atlas);
      // eslint-disable-next-line no-undef
      var spineJsonParser = new SkeletonJson(spineAtlasLoader);
      var spineData = spineJsonParser.readSkeletonData(rawSpineData.json);
      this.spines[key] = spineData;
      onLoad && onLoad();
    });
  }

  static _loadAudio() {
    this._audioReadied = false;
    this.audio = new Howl({
      src    : assetData.sound,
      sprite : assetData.soundData,
      onload : () => {
        this._audioReadied = true;
      },
    });
  }

  static _checkLoad() {
    Debug.debug("AssetManager", "Check Load", this._allAtlasesLoaded,SoundManager.loaded);
    if (this._allAtlasesLoaded && SoundManager.loaded) {
      this.loaded = true;
      this._onLoaded && this._onLoaded();
    }
  }
}
