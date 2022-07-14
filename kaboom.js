import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

// Configurations globales
export const k = kaboom({
    global: true,
    background: [134, 135, 247],
    fullscreen: true,
    scale: 1.5,
    debug: true,
});

// Chargement des sprites
loadRoot('./assets/sprites/');
loadSprite('coin', 'coin.gif');
loadSprite('block', 'block.gif');
loadSprite('goomba', 'goomba.gif');
loadSprite('squashed-goomba', 'squashed-goomba.gif');
loadSprite('brick', 'brick.gif');
loadSprite('mushroom', 'mushroom.gif');
loadSprite('surprise', 'surprise.gif');
loadSprite('unboxed', 'unboxed.gif');
loadSprite('pipe', 'pipe.gif');
loadSprite('mario', 'mario.gif');
loadSprite('mario-walk1', 'mario-walk1.gif');
loadSprite('mario-walk2', 'mario-walk2.gif');
loadSprite('mario-walk3', 'mario-walk3.gif');
loadSprite('mario-jump', 'mario-jump.gif');
loadSprite('mario-dead', 'mario-dead.gif');
loadSprite('super-mario', 'super-mario.gif');
loadSprite('super-mario-walk1', 'super-mario-walk1.gif');
loadSprite('super-mario-walk2', 'super-mario-walk2.gif');
loadSprite('super-mario-walk3', 'super-mario-walk3.gif');
loadSprite('super-mario-down', 'super-mario-down.gif');
loadSprite('super-mario-jump', 'super-mario-jump.gif');

export default k