import k from './kaboom.js'

let MOVE_SPEED = 220;
const JUMP_FORCE = 520;
const BIG_JUMP_FORCE = 650;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const ENEMY_SPEED = 40;
let isJumping = true;
const FALL_DEATH = 1000;

k.scene('game', ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj');

    // Cartes des niveaux
    const maps = [
        [
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                   =*=%                                  ',
            '         $ $ $                                           ',
            '                                             -           ',
            '                               ^  ^                      ',
            '====================================   =================='
        ],
        [
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '                                                         ',
            '           =*=%                                 -        ',
            '                               ^                         ',
            '=====================  ============   ==================='
        ]
    ];

    const levelCfg = {
        width: 32,
        height: 32,
        '=': () => [sprite("brick"), area(), solid()],
        '$': () => [sprite("coin"), "coin", area()],
        '%': () => [sprite("surprise"), "coin-surprise", area(), solid()],
        '*': () => [sprite("surprise"), "mushroom-surprise", area(), solid()],
        '}': () => [sprite("unboxed"), area(), solid()],
        '#': () => [sprite("mushroom"), "mushroom", body(), area()],
        '^': () => [sprite("goomba"), "goomba", area(), solid()],
        '-': () => [sprite("pipe"), "pipe", area(), solid()],
    }

    const gameLevel = addLevel(maps[level], levelCfg);

    // Information du niveau 
    const scoreLabel = add([
        text("Coins: 0", { size: 12 }),
        pos(30, 7),
        layer("ui"),
        fixed(),
        { value: 0 }
    ]);

    add([
        text("level " + parseInt(level + 1), { size: 12 }),
        pos(30, 20),
        fixed(),
    ])

    function big() {
        let timer = 0;
        let isBig = false;
        return {
            update() {
                if (isBig) {
                    CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
                    time -= dt();
                    if (timer <= 0) {
                        this.smallify();
                    }
                }
            },
            isBig() {
                return isBig;
            },
            smallify() {
                CURRENT_JUMP_FORCE = JUMP_FORCE;
                player.use(sprite("mario"));
                timer = 0;
                isBig = false
            },
            biggify() {
                player.use(sprite("super-mario"));
                timer = time;
                isBig = true
            }
        }
    }

    // Joueur (Mario)
    const player = add([
        sprite("mario"), area(), solid(), pos(30, 0), body(), big(), origin("bot")
    ]);

    onUpdate("mushroom", (m) => {
        m.move(40, 0);
    });

    player.on("headbutt", (obj) => {
        if (obj.is("coin-surprise")) {
            gameLevel.spawn(obj.is("coin-surprise") ? "$" : "#", obj.gridPos.sub(0, 1));
            destroy(obj);
            gameLevel.spawn("}", obj.gridPos.sub(0, 0));
        }
        if (obj.is("mushroom-surprise")) {
            gameLevel.spawn(obj.is("coin-surprise") ? "$" : "#", obj.gridPos.sub(0, 1));
            destroy(obj);
            gameLevel.spawn("}", obj.gridPos.sub(0, 0));
        }
    });

    player.onCollide("mushroom", (m) => {
        destroy(m);
        player.biggify(6)
    });

    player.onCollide("coin", (c) => {
        destroy(c);
        scoreLabel.value += 1;
        scoreLabel.text = "Coins:" + scoreLabel.value
    });

    onUpdate("goomba", (g) => {
        g.move(-ENEMY_SPEED, 0);
    });

    player.onCollide("goomba", (g) => {
        if (isJumping) {
            destroy(g);
        } else if (player.isBig()) {
            player.use(sprite("mario"));
        } else {
            player.use(sprite(player.isBig() ? "super-mario-dead" : "mario-dead"));
            //loadSound("dead", "sounds/mario-dead.wav")
            wait(3, () => {
                destroy(player);
                go("lose", { score: scoreLabel.value })
            })
        }
    });

    player.onCollide("pipe", (g) => {
        onKeyPress("down", () => {
            go("game", {
                level: (level + 1),
                score: scoreLabel.value
            })

        });
    });

    player.onUpdate(() => {
        camPos(player.pos);
        if (player.pos.y >= FALL_DEATH) {
            go("lose", { score: scoreLabel.value })
        }
        if (player.isGrounded()) {
            player.use(sprite(player.isBig() ? "super-mario" : "mario"));
            isJumping = false;
        }
    });

    // Contrôles
    onKeyDown("left", () => {
        player.flipX(true);
        player.move(-MOVE_SPEED, 0);
    });
    onKeyDown("right", () => {
        if (player.isGrounded()) {
            player.use(sprite(player.isBig() ? "super-mario-walk1" : "mario-walk1"));
        }
        player.move(MOVE_SPEED, 0);
    });
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.use(sprite(player.isBig() ? "super-mario-jump" : "mario-jump"));
            isJumping = true;
            player.jump(CURRENT_JUMP_FORCE)
        }
    });


});

k.scene("lose", ({ score }) => {
    add([
        text(score + " coins !", 32),
        origin("center"),
        pos(width() / 2, height() / 2)
    ]);
})

// Démarrage du jeu
go("game", { level: 0, score: 0 });


const music = new Audio("./assets/musics/main-theme.mp3");

/* const music = play("./assets/musics/main-theme.mp3", {
    volume: 0.8,
    loop: true
}) */
music.muted = true;

music.play();