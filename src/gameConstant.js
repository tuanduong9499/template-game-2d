export const GameConstant = Object.freeze({
  PLATFORM_ANDROID : "Android",
  PLATFORM_IOS     : "iOS",

  GAME_WIDTH  : 720,
  GAME_HEIGHT : 1280,

  SCENE_LOADING : "LoadingScene",
  SCENE_PLAY    : "PlayScene",

  DEBUG_ON            : true,
  DEBUG_DRAW_COLLIDER : false,
  SOUND_ENABLED       : true,
  SHOW_GAME_TAG       : false,

  GAME_LIFE                       : Infinity,
  BACKGROUND_SPEED                : 100,
  BULLET_BOUND_OFFSET             : 100,
  SWIPE_MULTIPLIER                : 1,
  SHIP_SPEED                      : 15,
  SHIP_PURPLE_BULLET_DAMAGE       : 10,
  SHIP_GREEN_BULLET_DAMAGE        : 5,
  SHIP_WINGS_DURATION             : 10,
  SHIP_FX_IMMORTAL_DURATION       : 0.35,
  PLAYER_REVIVE_IMMORTAL_DURATION : 5,
  BULLET_LASER_DPS                : 50,
  BULLET_FROST_DAMAGE             : 10,
  BULLET_VELOCITY_DAMAGE          : 1,
  BOOSTER_MAGNET_SIZE             : 1200,
  BOOSTER_MAGNET_SPEED            : 800,
  BOOSTER_AUTO_COLLECT_TIMEOUT    : 3,
  WAVE_1_ENEMY_HP                 : 3,
  WAVE_2_ENEMY_HP                 : 30,
  WAVE_3_ENEMY_HP                 : 10,

  LOADING_DURATION: 0,

  WIN_UI_ENEMY_DURATION       : 0.5,
  WIN_UI_ENEMY_POSITION       : 5,
  WIN_UI_ENEMY_SPAWN_DURATION : 1.5,

  ENEMY_WAVE1_MOVE_DURATION  : 1,
  ENEMY_WAVE1_SHAKE_DURATION : 0.6,

  ENEMY_FIRE_BULLET_DELAY_DURATION: 2,
});
