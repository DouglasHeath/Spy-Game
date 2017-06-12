// ************************************************************************
// GAME ASSETS
// ************************************************************************
// define the size of the game field and map width
var screenWidth = 640;
var screenHeight = 640;
var levelHeight = 640;
var levelWidth = 1920;
var level2Height = 1736;
var level2Width = 640;

var lives = 3;

// load out music and sounds
Crafty.audio.add('scream', 'audio/wilhelm.mp3');
Crafty.audio.add('laugh', 'audio/evil.mp3');
Crafty.audio.add('bgMusic2', 'audio/resow.mp3');
Crafty.audio.add('intro', 'audio/intro.mp3');
Crafty.audio.add('flight', 'audio/flight.mp3');
Crafty.audio.add('end', 'audio/end.mp3');


// create all the different sprites

// player spritesheet
Crafty.sprite(32, "playerSheet.png", {
    Player: [0, 0]
});

// player chopper
Crafty.sprite("helicopter.png", {
    Chopper: [0, 0, 180, 96]
});
// sprite to place invisible "barriers" on background for characters to interact with
Crafty.sprite("transparent.png", {
    Floor: [0, 0, 32, 32],
    Wall: [0, 0, 32, 32],
    Crate: [0, 0, 32, 32]
});

// enemy missles
Crafty.sprite("missleDrop.png", {
    Drop: [0, 0, 32, 64]
});

// Spy logo
Crafty.sprite("spyWhite.png", {
    Spy: [0, 0, 256, 256]
});

// enemy agent
Crafty.sprite(32, "enemySheet.png", {
    Enemy: [0, 0]
});

// initialize the game field
Crafty.init(screenWidth, screenHeight, document.getElementById('game'));

// *******************************************************************************
// define the splash screen to start, put instructions here
// *******************************************************************************
Crafty.defineScene("HomeScreen", function () {
    Crafty.background("#000");
    Crafty.audio.play('intro', -1, 0.5);
    // instruct user to start
    Crafty.e("2D, DOM, Text, Tween, Keyboard")
        .attr({
            alpha: 0.0,
            w: 300,
            h: 20,
            x: -300,
            y: 200
        })
        .text("PRESS SPACE")
        .css({
            "text-align": "center"
        })
        .textFont({
            size: '20px',
            weight: 'bold'
        })
        .textColor("#FFFFFF")
        .tween({
            alpha: 1.0,
            x: 100
        }, 3000)
        .bind('KeyDown', function (e) {
            if (e.key == Crafty.keys.SPACE) {
                Crafty.enterScene("Instructions");
            }
        });
    // spy logo that moves in from bottom
    Crafty.e("Spy, 2D, DOM, Image, Tween")
        .attr({
            alpha: 1.0,
            x: 400,
            y: screenHeight + 256
        })
        .tween({
            alpha: 1.0,
            x: 400,
            y: screenHeight - 200
        }, 3000);
    // Game Title
    Crafty.e("2D, DOM, Text")
        .attr({
            w: 500,
            h: 40,
            x: 50,
            y: 50
        })
        .text("SPY GAME")
        .textFont({
            size: '80px',
            weight: 'bold'
        })
        .css({
            "text-align": "center"
        })
        .textColor("#FFFFFF");
});

//define instructions page
Crafty.defineScene("Instructions", function () {
    Crafty.background("#000");
    Crafty.e("2D, DOM, Text, Tween")
        .attr({
            alpha: 0.0,
            w: 400,
            h: 20,
            x: 120,
            y: 200
        })
        .text("Use the left and right arrow keys to move." +
            " Use the up arrow to jump." +
            " Avoid enemy agents and ESCAPE!")
        .css({
            "text-align": "center"
        })
        .textFont({
            size: '24px',
            weight: 'bold'
        })
        .textColor("#FFFFFF")
        .tween({
            alpha: 1.0
        }, 4000);

    Crafty.e("2D, DOM, Text, Tween, Keyboard")
        .attr({
            alpha: 0.0,
            w: 400,
            h: 20,
            x: 140,
            y: 400
        })
        .text("PRESS SPACE TO BEGIN")
        .css({
            "text-align": "center"
        })
        .textFont({
            size: '24px',
            weight: 'bold'
        })
        .textColor("#FFFFFF")
        .tween({
            alpha: 1.0
        }, 4000)
        .bind('KeyDown', function (e) {
            if (e.key == Crafty.keys.SPACE) {
                Crafty.enterScene("Level1");
            }
        });
});

// define what Level 1 will looks like, player functions
Crafty.defineScene("Level1", function () {

    // background image
    Crafty.background('#FFFFFF url(SpyGameMapBETA.png)');
    
    //start game audio
    Crafty.audio.stop();
    Crafty.audio.play('bgMusic2', -1);

    // create some things to interact with mostly walls and floor and crates
    // floor objects
    Crafty.e('Floor, 2D, DOM, Solid')
        .attr({
            x: 0,
            y: levelHeight - 32,
            w: levelWidth,
            h: 32
        });
    Crafty.e('Floor, 2D, DOM, Solid')
        .attr({
            x: 0,
            y: screenHeight - 160,
            h: 1,
            w: 180
        });
    Crafty.e('Floor, 2D, DOM, Solid')
        .attr({
            x: 472,
            y: screenHeight - 160,
            h: 1,
            w: 180
        });
    Crafty.e('Floor, 2D, DOM, Solid')
        .attr({
            x: 1112,
            y: 352,
            h: 1,
            w: 114
        });
    Crafty.e('Floor, 2D, DOM, Solid')
        .attr({
            x: 1330,
            y: 416,
            h: 1,
            w: 114
        });
    Crafty.e('Floor, 2D, DOM, Solid')
        .attr({
            x: 1588,
            y: screenHeight - 160,
            h: 1,
            w: 114
        });
    
    // wall objects
    Crafty.e('Wall, 2D, DOM, Solid').attr({
        x: levelWidth - 32,
        y: screenHeight - 64
    });
    Crafty.e('Wall, 2D, DOM, Solid').attr({
        x: 704,
        y: 320,
        w: 10,
        h: 320
    });
    Crafty.e('Wall, 2D, DOM, Solid').attr({
        x: 0,
        y: screenHeight - 64
    });  
        Crafty.e('Wall, 2D, DOM, Solid').attr({
        x: 472,
        y: screenHeight - 161,
        w: 1
    });  
     Crafty.e('Wall, 2D, DOM, Solid').attr({
        x: 200,
        y: screenHeight - 33
    });  Crafty.e('Wall, 2D, DOM, Solid').attr({
        x: 420,
        y: screenHeight - 33
    }); 
    Crafty.e('Wall, 2D, DOM, Solid').attr({
        x: 920,
        y: screenHeight - 33
    });
    Crafty.e('Wall, 2D, DOM, Solid').attr({
        x: 1280,
        y: screenHeight - 33
    });
     
    // crate objects
    Crafty.e('Crate, 2D, DOM, Solid').attr({
        x: 80,
        y: 416,
        h: 1
    });
    Crafty.e('Crate, 2D, DOM, Solid').attr({
        x: 584,
        y: 416,
        h: 1
    });
     Crafty.e('Crate, 2D, DOM, Solid').attr({
        x: 648,
        y: 352,
        h: 1
    });
    Crafty.e('Crate, 2D, DOM, Solid').attr({
        x: 1840,
        y: 542,
        h: 1
    });
    Crafty.e('Crate, 2D, DOM, Solid').attr({
        x: 304,
        y: screenHeight - 96,
        h: 1
    });
    Crafty.e('Crate, 2D, DOM, Solid').attr({
        x: 1164,
        y: screenHeight - 96,
        h: 1,
        w: 28
    });
    
    Crafty.e('Door, 2D, DOM, Collision')
        .attr({
            x: 1143,
            y: 300,
            h: 16,
            w: 16
        })
        .checkHits('Player')
        .bind('HitOn', function() {
            Crafty.enterScene("Intermission");
        });
    // function to call an enemy with ability to set starting location
    function SpawnEnemy(xLoc, yLoc) {
        Crafty.e('Enemy, 2D, DOM, SpriteAnimation, Gravity, Collision')
            .attr({
                x: xLoc,
                y: yLoc,
                h: 74,
                w: 60,
                speed: 2,
                xdir: 1,
                key: "left"
            })
            .reel('Idle', 22, 0, 0, 5)
            .gravity('Solid')
            .checkHits('Wall')
            .animate('Idle', -1)
        // enemy changes direction when hitting object
            .bind('HitOn', function (e) { 
                if (this.x > xLoc) {
                    this.key = "left";
                }
                if (this.x < xLoc) {
                    this.key = "right";
                }
            })
        // enemy movement in two directions
            .bind('EnterFrame', function (e) { 
                if (this.key == "left") {
                    this.flip("X");
                    this.x = this.x - this.speed * this.xdir;
                }
                if (this.key == "right") {
                    this.unflip("X");
                    this.x = this.x + this.speed * this.xdir;
                }
            });
    }
    // Let's spawn some baddies
    SpawnEnemy(400, levelHeight - 32);
    SpawnEnemy(1100, levelHeight - 32);
    SpawnEnemy(572, levelHeight- 160);
    SpawnEnemy(1650, 470);

    // create the player entity
    var player = Crafty.e('Player, 2D, DOM, SpriteAnimation, Solid, Twoway, Gravity, Collision')
        .attr({
            x: 32,
            y: levelHeight - 32,
            h: 56,
            w: 64
        })
        .reel('PlayerWalking', 22, 0, 1, 4)
        .reel('Jumping', 22, 0, 10, 3)
        .reel('Death', 22, 0, 15, 5)
        .reel('Idle', 22, 0, 0, 1)
        .twoway(200, 325)
        .gravity('Solid')
        .gravityConst(850)
        .collision(8, 4, 24, 4, 24, 28, 8, 28)
        .checkHits('Enemy')
        // Shift screen when player moves around
        .bind('Moved', function (event) { 
            if (this.x >= (screenWidth / 2)) {
                Crafty.viewport.x = (this.x - (screenWidth / 2)) * -0.9;
                document.getElementById("game").style.backgroundPosition = Crafty.viewport.x + "px";
            }
            // build walls and boundaries that player can't pass
            if (this.x > (levelWidth - 78)) {
                this.x = (levelWidth - 78);
            }
            if (this.x < 24) {
                this.x = 24;
            }
            if (this.x > 640  && this.x < 704 && this.y > 320) {
                this.x = 640;
            }
            if (this.x >= 702 && this.x < 720 && this.y > 320) {
                this.x = 720;
            }
            if (this.x > 748 && this.x < 752 && this.y > 192 && this.y < 512) {
                this.x = 750;
            }
        }) 
    //these change player animations depending on which key is pressed/released
        .bind('KeyDown', function (evt) {
            if (evt.key == Crafty.keys.RIGHT_ARROW) {
                player.unflip("X");
                player.animate('PlayerWalking', -1);
            }
        })
        .bind('KeyUp', function (evt) {
            if (evt.key == Crafty.keys.RIGHT_ARROW) {
                player.animate('PlayerWalking', 1);
            }
        })
        .bind('KeyDown', function (evt) {
            if (evt.key == Crafty.keys.LEFT_ARROW) {
                player.flip("X");
                player.animate('PlayerWalking', -1);
            }
        })
        .bind('KeyUp', function (evt) {
            if (evt.key == Crafty.keys.LEFT_ARROW) {
                player.animate('PlayerWalking', 1);
            }
        })
        .bind('KeyDown', function (evt) {
            if (evt.key == Crafty.keys.UP_ARROW) {
                player.animate('Jumping', 1);
            }
        })
        .bind('KeyUp', function (evt) {
            if (evt.key == Crafty.keys.UP_ARROW) {
                player.animate('Jumping', 1);
            }
        })
        .bind('HitOn', function () {
            
            lives--;
            if (lives === 0) {
                Crafty.enterScene("GameOver");
            } else {
                Crafty.enterScene("Captured");
            }
        });
});

// *********************************************************
// game over screen
// *********************************************************

Crafty.defineScene("GameOver", function () {
    Crafty.audio.stop();
    Crafty.stop();
    Crafty.audio.play('laugh', 1);
    Crafty.background("Black");
    Crafty.e("2D, DOM, Text, Tween")
        .attr({
            w: 400,
            h: 20,
            x: 160,
            y: 140
        })
        .text("GAME OVER!!")
        .textFont({
            size: '48px',
            weight: 'bold'
        })
        .textColor("White")
        .bind('KeyDown', function (e) {
            if (e.key == Crafty.keys.SPACE) {
                location.reload();
            }
        });
});

// ************************************************************
// player hits enemy Scene
// ************************************************************

Crafty.defineScene("Captured", function () {
    Crafty.audio.stop();
    Crafty.audio.play('scream', 1);
    Crafty.background("Red", 0.5);
    Crafty.e("2D, DOM, Text, Tween")
        .attr({
            alpha: 0.0,
            w: 400,
            h: 20,
            x: 120,
            y: 200
        })
        .text("YOU'VE BEEN CAPTURED!! Your life counter is now " + lives)
        .css({
            "text-align": "center"
        })
        .textFont({
            size: '30px',
            weight: 'bold'
        })
        .textColor("#FFFFFF")
        .tween({
            alpha: 1.0
        }, 100);

    Crafty.e("2D, DOM, Text, Tween, Keyboard")
        .attr({
            alpha: 0.0,
            w: 400,
            h: 20,
            x: 170,
            y: 400
        })
        .text("PRESS SPACE TO BEGIN")
        .css({
            "text-align": "center"
        })
        .textFont({
            size: '24px',
            weight: 'bold'
        })
        .textColor("#FFFFFF")
        .tween({
            alpha: 1.0
        }, 1000)
        .bind('KeyDown', function (e) {
            if (e.key == Crafty.keys.SPACE) {
                Crafty.enterScene("Level1");
            }
        });
});

// **********************************************************************
// scene 2 Interim and instructions
// *********************************************************************

Crafty.defineScene("Intermission", function () {
    Crafty.audio.stop();
    Crafty.audio.play('intro', -1, 0.5);
    Crafty.background("#000");
    Crafty.e("2D, DOM, Text, Tween")
        .attr({
            alpha: 0.0,
            w: 400,
            h: 20,
            x: 120,
            y: 200
        })
        .text("You've escaped the facility." +
            " Use the arrow keys to fly the chopper." +
            " Avoid the missles and fly out the top!")
        .css({
            "text-align": "center"
        })
        .textFont({
            size: '24px',
            weight: 'bold'
        })
        .textColor("#FFFFFF")
        .tween({
            alpha: 1.0
        }, 4000);

    Crafty.e("2D, DOM, Text, Tween, Keyboard")
        .attr({
            alpha: 0.0,
            w: 400,
            h: 20,
            x: 140,
            y: 400
        })
        .text("PRESS SPACE TO BEGIN")
        .css({
            "text-align": "center"
        })
        .textFont({
            size: '24px',
            weight: 'bold'
        })
        .textColor("#FFFFFF")
        .tween({
            alpha: 1.0
        }, 4000)
        .bind('KeyDown', function (e) {
            if (e.key == Crafty.keys.SPACE) {
                Crafty.enterScene("Level2");
            }
        });
});

// ***********************************************************************
// Level 2
// ***********************************************************************
Crafty.defineScene("Level2", function() {
    Crafty.background('#FFFFFF url(bgScene2.png)');
    Crafty.audio.stop();
    Crafty.audio.play('flight', -1, 0.6);
    Crafty.e('Floor, 2D, DOM, Solid')
        .attr({
            x: 0,
            y: levelHeight,
            w: levelWidth
        });
    // time 
    // chopper health and hit counter
    var health = 10;
    var hitText = Crafty.e('2D, DOM, Text')
        .attr({
            x: screenWidth - 200,
            y: 10
    });

hitText.text('HEALTH:' + health);

hitText.textFont({
  size: '24px',
  weight: 'bold'
});
    // let's make some random enemies
    function drop() {
    var randomx = Math.floor((Math.random() * levelWidth) + 50);
    Crafty.e('Drop, 2D, Canvas, Color, Solid, Gravity, Collision')
        .attr({x: randomx, y: 0, w: 16, h: 32})
        //.color('#FFFFFF')
        .gravity()
        .gravityConst(140)
        .checkHits('Chopper')
        .bind("HitOn", function(){
        // place logic to decrement health?
            this.destroy();
            health -= 2;
            hitText.text('HEALTH:' + health);
            })
        .bind("EnterFrame", function() {
            if (this.y > screenHeight)
              this.destroy();
        });
}
Crafty.bind("EnterFrame", function() {
    if (Crafty.frame() % 2 === 0)
    drop();
});
    
    // player chopper
    var playerChopper = Crafty.e('Chopper, 2D, DOM, SpriteAnimation, Solid, Fourway, Gravity, Collision')
    .attr({
        x: 320,
        y: 600,
        h: 48,
        w: 48
    })
    .reel('Flying', 21, 0, 0, 7)
    .fourway(200)
    .gravity('Solid')
    .gravityConst(600)
    .bind('Moved', function () {
        if(this.y > (screenHeight - 48)) {
            this.y = screenHeight - 48;
        }
        if (this.x > (screenWidth - 48)) {
                this.x = (screenWidth - 48);
            }
            if (this.x < 0) {
                this.x = 0;
            }
        if (health === 0) {
                Crafty.enterScene("GameOver");
        }
        if (this.y < 0) {
            Crafty.enterScene('Victory');
        }
    })
    .bind('KeyDown', function (evt) {
            if (evt.key == Crafty.keys.RIGHT_ARROW) {
                playerChopper.unflip("X");
                playerChopper.animate('Flying', -1);
            }
        })
    .bind('KeyDown', function (evt) {
            if (evt.key == Crafty.keys.LEFT_ARROW) {
                playerChopper.flip("X");
                playerChopper.animate('Flying', -1);
            }
        });    
});

// ****************************************************************
// Victory Scene
// ****************************************************************
Crafty.defineScene("Victory", function() {
    Crafty.stop();
    Crafty.background('#000000 url(win.png)');
    Crafty.audio.stop();
    Crafty.audio.play('end', 0.9);
    
});

// start at the homescreen
Crafty.enterScene("HomeScreen");