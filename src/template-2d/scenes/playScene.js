import { Container } from "pixi.js";
import { Game } from "../../game";
import { GameConstant } from "../../gameConstant";
import { Scene } from "../../pureDynamic/PixiWrapper/scene/scene";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { GameState, GameStateManager } from "../../pureDynamic/systems/gameStateManager";
import { TutorialUI } from "../ui/tutorialUI";
import { WinUI } from "../ui/winUI";

export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_PLAY);
  }

  create() {
    super.create();
    this._initGameplay();
    this._initUI();
    this.resize();
    GameStateManager.state = GameState.Tutorial;
  }

  onStart() {
    GameStateManager.state = GameState.Playing;
    Game.onStart();
    this.tutorialUI.visible = false;
  }

  onPause() {
    super.onPause();
  }

  onResume() {
    super.onResume();
  }

  resize() {
    super.resize();
    this.gameplay.x = GameResizer.width / 2;
    this.gameplay.y = GameResizer.height / 2;
  }

  lose() {
    GameStateManager.state = GameState.Lose;
    Game.onLose();
    this.winUI.show();
  }

  win() {
    GameStateManager.state = GameState.Win;
    Game.onWin();
    this.winUI.show();
  }

  _initUI() {
    // TODO: Add UI Manager
    this.tutorialUI = new TutorialUI();
    this.tutorialUI.registerOnTutorialCompleteCallback(this.onStart, this);
    this.addChild(this.tutorialUI);
    this.winUI = new WinUI();
    this.winUI.hide();
    this.addChild(this.winUI);
    this.initGameTag();
  }

  _initGameplay() {
    this.gameplay = new Container();
    this.addChild(this.gameplay);
  }
}
