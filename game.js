import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    background: [0, 0, 0, 1],
});

loadRoot('./assets/');
loadSprite('coin', 'coin.png');
loadSprite('goomba', 'goomba-left.png');
loadSprite('brick', 'brick.png');
loadSprite('block', 'block.png');
loadSprite('mario', 'mario.png');
loadSprite('mushroom', 'mushroom.png');
loadSprite('surprise', 'surprise.png');
loadSprite('unboxed', 'block.png');
loadSprite('pipe-top-left', 'pipe-top-left.png');
loadSprite('pipe-top-right', 'pipe-top-right.png');
loadSprite('pipe-bottom-right', 'pipe-bottom-right.png');
loadSprite('pipe-bottom-left', 'pipe-bottom-left.png');

scene('game', () => {
    layers(['bg', 'obj', 'ui'], 'obj');

    const map = [
        '                                                         ',
        '                                                         ',
        '                                                         ',
        '                                                         ',
        '                                                         ',
        '                                                         ',
        '                                                         ',
        '                                                         ',
        '         $ $ $          =*=%                             ',
        '                                                         ',
        '                                                -+       ',
        '                               ^  ^             ()       ',
        '====================================   =================='
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': () => [sprite("brick"), area(), solid()],
        '$': () => [sprite("coin"), area()],
        '%': () => [sprite("surprise"), area(), solid()],
        '}': () => [sprite("unboxed"), area(), solid()],
        '*': () => [sprite("mushroom"), area()],
        '^': () => [sprite("goomba"), area(), solid()],
        '-': () => [sprite("pipe-top-left"), area(), solid(), scale(0.5)],
        '+': () => [sprite("pipe-top-right"), area(), solid(), scale(0.5)],
        '(': () => [sprite("pipe-bottom-left"), area(), solid(), scale(0.5)],
        ')': () => [sprite("pipe-bottom-right"), area(), solid(), scale(0.5)],
    }

    const gameLevel = addLevel(map, levelCfg)
});

go("game");