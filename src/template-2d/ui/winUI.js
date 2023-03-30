import { Container } from "pixi.js";
import { Game } from "../../game";
import { Util } from "../../helpers/utils";
import { Tween } from "../../systems/tween/tween";
import { ObjectFactory } from "../objectFactory";
import pathMove from "../../../assets/jsons/pathMove.json";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { GameState, GameStateManager } from "../../pureDynamic/systems/gameStateManager";

export class WinUI extends Container {
  constructor() {
    super();
    this.onResize();
    GameResizer.registerOnResizeCallback(this.onResize, this);
  }

  onResize() {
    
  }

  update() {
    
  }

  destroy() {
    super.destroy();
    GameResizer.removeOnResizeCallback(this.onResize, this);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}