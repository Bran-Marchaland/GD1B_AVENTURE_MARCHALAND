var HP = 10;
var invincible = false;
var CD = true;
var i = 0;
var nbrP = 1;
var crossbow = false;
class map_pt_1 extends Phaser.Scene {
    constructor() {
        super('map_pt_1');

    }

    preload(){
        this.load.tilemapTiledJSON("mapPt1","map/map_pt_1.json");
        this.load.image("potion", "sprite/potion.png");
        this.load.image("phaser_assets", "map/tuile.png");
        this.load.image("hitBox", "sprite/hitbox.png");
        this.load.spritesheet('perso','sprite/perso_pixel.png',
                { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('monster','sprite/enemie.png',
                { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('HP','sprite/barre_de_vie.png',
                { frameWidth:2560, frameHeight: 128});
    }

    create(){
        
        const carteDuNiveau = this.add.tilemap("mapPt1");        
        const tileset = carteDuNiveau.addTilesetImage("Tuile","phaser_assets");
        //const plateforme = carteDuNiveau.createLayer("map_base",tileset);
        const Sol = carteDuNiveau.createLayer('map_base',tileset);
        const Sol2 = carteDuNiveau.createLayer('map_enemie_bonus',tileset);
        const murSolide = carteDuNiveau.createLayer('mur',tileset);
        const collectible = carteDuNiveau.createLayer('collectible',tileset);
        const tp = carteDuNiveau.createLayer('Teleporteur',tileset);
        this.potion = this.physics.add.sprite(365,270, 'potion').setScale(1).setScrollFactor(0);
        this.texteDuDialogue= this.add.text(385 ,260, nbrP, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 30 }).setScale(0.6).setScrollFactor(0);



        this.enemie = this.physics.add.group ()
            this.enemie.create(40*32, 125*32, 'monster');
            this.enemie.create(44*32, 135*32, 'monster');
            this.enemie.create(68*32, 139*32, 'monster');
            this.enemie.create(100*32, 129*32, 'monster');
            this.enemie.create(107*32, 141*32, 'monster');
            this.enemie.create(173*32, 129*32, 'monster');
            this.enemie.create(176*32, 134*32, 'monster');
            this.enemie.create(185*32, 134*32, 'monster');
            this.enemie.create(198*32, 120*32, 'monster');
            this.enemie.create(214*32, 129*32, 'monster');
            this.enemie.create(213*32, 112*32, 'monster');
            this.enemie.create(227*32, 109*32, 'monster');
            this.enemie.create(212*32, 79*32, 'monster');
            this.enemie.create(226*32, 80*32, 'monster');
            this.enemie.create(205*32, 62*32, 'monster');
            this.enemie.create(215*32, 21*32, 'monster');
            this.enemie.create(203*32, 17*32, 'monster');
            this.enemie.create(177*32, 9*32, 'monster');
            this.enemie.create(182*32, 36*32, 'monster');
            this.enemie.create(164*32, 43*32, 'monster');
            this.enemie.create(137*32, 16*32, 'monster');
            this.enemie.create(131*32, 18*32, 'monster');
            this.enemie.create(110*32, 27*32, 'monster');
            this.enemie.create(103*32, 15*32, 'monster');
            this.enemie.create(85*32, 38*32, 'monster');
            this.enemie.create(64*32, 28*32, 'monster');
            this.enemie.create(68*32, 55*32, 'monster');
            this.enemie.create(61*32, 62*32, 'monster');
            this.enemie.create(56*32, 57*32, 'monster');
            this.enemie.create(74*32, 65*32, 'monster');
            this.enemie.create(57*32, 51*32, 'monster');
            this.enemie.create(49*32, 39*32, 'monster');
            this.enemie.create(64*32, 33*32, 'monster');
            this.enemie.create(40*32, 53*32, 'monster');
        murSolide.setCollisionByProperty({ estSolide: true }); 
        this.player = this.physics.add.sprite(23*32, 133*32, 'perso');
        this.physics.add.collider(this.player, murSolide);
        this.physics.add.overlap(this.player, this.potion,this.Drop,null,this);


        tp.setCollisionByExclusion(-1, true);
        this.cameras.main.setBounds(192, 32, 7968, 4768);
        this.cameras.main.zoom = 2;
        this.cameras.main.startFollow(this.player); 
        this.physics.add.collider(this.player,tp,this.phase2,null,this);
        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,E,SPACE,SHIFT');

        this.vie=this.add.sprite(470,220,'HP').setScale(0.1).setScrollFactor(0);
        this.HB=this.physics.add.sprite(this.player.x+32,this.player.y,"hitBox");
        this.HB.disableBody()

        this.physics.add.collider(this.enemie.getChildren()[0], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[1], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[2], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[3], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[4], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[5], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[6], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[7], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[8], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[9], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[10], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[11], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[12], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[13], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[14], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[15], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[16], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[17], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[18], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[19], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[20], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[21], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[22], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[23], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[24], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[25], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[26], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[27], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[28], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[29], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[30], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[31], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[32], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[33], murSolide);


        this.physics.add.overlap(this.player, this.enemie.getChildren()[0], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[1], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[2], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[3], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[4], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[5], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[6], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[7], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[8], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[9], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[10], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[11], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[12], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[13], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[14], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[15], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[16], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[17], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[18], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[19], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[20], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[21], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[22], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[23], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[24], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[25], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[26], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[27], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[28], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[29], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[30], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[31], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[32], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[33], this.PerdHP, null, this);


        this.physics.add.overlap(this.HB,this.enemie.getChildren()[0],function(){this.enemie.getChildren()[0].disableBody(true,true);this.kill(0)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[1],function(){this.enemie.getChildren()[1].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[2],function(){this.enemie.getChildren()[2].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[3],function(){this.enemie.getChildren()[3].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[4],function(){this.enemie.getChildren()[4].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[5],function(){this.enemie.getChildren()[5].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[6],function(){this.enemie.getChildren()[6].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[7],function(){this.enemie.getChildren()[7].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[8],function(){this.enemie.getChildren()[8].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[9],function(){this.enemie.getChildren()[9].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[10],function(){this.enemie.getChildren()[10].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[11],function(){this.enemie.getChildren()[11].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[12],function(){this.enemie.getChildren()[12].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[13],function(){this.enemie.getChildren()[13].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[14],function(){this.enemie.getChildren()[14].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[15],function(){this.enemie.getChildren()[15].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[16],function(){this.enemie.getChildren()[16].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[17],function(){this.enemie.getChildren()[17].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[18],function(){this.enemie.getChildren()[18].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[19],function(){this.enemie.getChildren()[19].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[20],function(){this.enemie.getChildren()[20].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[21],function(){this.enemie.getChildren()[21].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[22],function(){this.enemie.getChildren()[22].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[23],function(){this.enemie.getChildren()[23].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[24],function(){this.enemie.getChildren()[24].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[25],function(){this.enemie.getChildren()[25].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[26],function(){this.enemie.getChildren()[26].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[27],function(){this.enemie.getChildren()[27].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[28],function(){this.enemie.getChildren()[28].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[29],function(){this.enemie.getChildren()[29].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[30],function(){this.enemie.getChildren()[30].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[31],function(){this.enemie.getChildren()[31].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[32],function(){this.enemie.getChildren()[32].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[33],function(){this.enemie.getChildren()[33].disableBody(true,true)},null,this)


        this.physics.add.collider(this.enemie,this.enemie);


        this.anims.create({
            key: 'Tright',
            frames: this.anims.generateFrameNumbers('perso', { start: 33, end: 35 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'Tleft',
            frames: this.anims.generateFrameNumbers('perso', { start: 36, end: 38 }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', { start: 11, end: 18 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', { start: 11, end: 18 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        });


        this.anims.create({
            key: 'HP1',
            frames: this.anims.generateFrameNumbers('HP', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP2',
            frames: this.anims.generateFrameNumbers('HP', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP3',
            frames: this.anims.generateFrameNumbers('HP', { start: 2, end: 2 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP4',
            frames: this.anims.generateFrameNumbers('HP', { start: 3, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP5',
            frames: this.anims.generateFrameNumbers('HP', { start: 4, end: 4 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP6',
            frames: this.anims.generateFrameNumbers('HP', { start: 5, end: 5 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'HP7',
            frames: this.anims.generateFrameNumbers('HP', { start: 6, end: 6 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'HP8',
            frames: this.anims.generateFrameNumbers('HP', { start: 7, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP9',
            frames: this.anims.generateFrameNumbers('HP', { start: 8, end: 8 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP10',
            frames: this.anims.generateFrameNumbers('HP', { start: 9, end: 9 }),
            frameRate: 4,
            repeat: -1
        });

        
    }




    update(){


        
        
        if(this.clavier.E.isDown){
            if(CD==true){
                CD=false
                this.HB.enableBody()
                setTimeout(() => {
                   CD=true
                   this.HB.disableBody() 
                }, 100);
            }
        }

        if (this.clavier.Z.isDown) {
            this.player.setVelocityY(-200);
            this.player.anims.play('up', true);
            this.HB.x=this.player.x;
            this.HB.y=this.player.y-32;
        }
        else if (this.clavier.S.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);
            this.HB.x=this.player.x;
            this.HB.y=this.player.y+32;
        }
        else if (this.clavier.Q.isDown) {
            if (this.clavier.E.isDown){
                this.player.anims.play('Tleft', true);
            }
            else{
                this.player.anims.play('left', true);
            }
            this.player.setVelocityX(-200);
            this.HB.x=this.player.x-32;
            this.HB.y=this.player.y;
        }
        else if (this.clavier.D.isDown) {
            if (this.clavier.E.isDown){
                this.player.anims.play('Tright', true);
            }
            else{
                this.player.anims.play('right', true);
            }
            this.player.setVelocityX(200);
            this.HB.x=this.player.x+32;
            this.HB.y=this.player.y;
        }
        else {
            this.player.setVelocityX(0)
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
             

     
        

        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[0].x, this.enemie.getChildren()[0].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[0].setVelocityX(this.player.x-this.enemie.getChildren()[0]            .x)
            this.enemie.getChildren()[0].setVelocityY(this.player.y-this.enemie.getChildren()[0]            .y)
        }
        else{this.enemie.getChildren()[0].setVelocity(0)}
        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[1].x, this.enemie.getChildren()[1].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[1].setVelocityX(this.player.x-this.enemie.getChildren()[1]            .x)
            this.enemie.getChildren()[1].setVelocityY(this.player.y-this.enemie.getChildren()[1]            .y)
        }
        else{this.enemie.getChildren()[1].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[2].x, this.enemie.getChildren()[2].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[2].setVelocityX(this.player.x-this.enemie.getChildren()[2]            .x)
            this.enemie.getChildren()[2].setVelocityY(this.player.y-this.enemie.getChildren()[2]            .y)
        }
        else{this.enemie.getChildren()[2].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[3].x, this.enemie.getChildren()[3].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[3].setVelocityX(this.player.x-this.enemie.getChildren()[3]            .x)
            this.enemie.getChildren()[3].setVelocityY(this.player.y-this.enemie.getChildren()[3]            .y)
        }
        else{this.enemie.getChildren()[3].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[4].x, this.enemie.getChildren()[4].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[4].setVelocityX(this.player.x-this.enemie.getChildren()[4]            .x)
            this.enemie.getChildren()[4].setVelocityY(this.player.y-this.enemie.getChildren()[4]            .y)
        }
        else{this.enemie.getChildren()[4].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[5].x, this.enemie.getChildren()[5].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[5].setVelocityX(this.player.x-this.enemie.getChildren()[5]            .x)
            this.enemie.getChildren()[5].setVelocityY(this.player.y-this.enemie.getChildren()[5]            .y)
        }
        else{this.enemie.getChildren()[5].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[6].x, this.enemie.getChildren()[6].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[6].setVelocityX(this.player.x-this.enemie.getChildren()[6]            .x)
            this.enemie.getChildren()[6].setVelocityY(this.player.y-this.enemie.getChildren()[6]            .y)
        }
        else{this.enemie.getChildren()[6].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[7].x, this.enemie.getChildren()[7].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[7].setVelocityX(this.player.x-this.enemie.getChildren()[7]            .x)
            this.enemie.getChildren()[7].setVelocityY(this.player.y-this.enemie.getChildren()[7]            .y)
        }
        else{this.enemie.getChildren()[7].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[8].x, this.enemie.getChildren()[8].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[8].setVelocityX(this.player.x-this.enemie.getChildren()[8]            .x)
            this.enemie.getChildren()[8].setVelocityY(this.player.y-this.enemie.getChildren()[8]            .y)
        }
        else{this.enemie.getChildren()[8].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[9].x, this.enemie.getChildren()[9].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[9].setVelocityX(this.player.x-this.enemie.getChildren()[9]            .x)
            this.enemie.getChildren()[9].setVelocityY(this.player.y-this.enemie.getChildren()[9]            .y)
        }
        else{this.enemie.getChildren()[9].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[10].x, this.enemie.getChildren()[10].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[10].setVelocityX(this.player.x-this.enemie.getChildren()[10]            .x)
            this.enemie.getChildren()[10].setVelocityY(this.player.y-this.enemie.getChildren()[10]            .y)
        }
        else{this.enemie.getChildren()[10].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[11].x, this.enemie.getChildren()[11].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[11].setVelocityX(this.player.x-this.enemie.getChildren()[11]            .x)
            this.enemie.getChildren()[11].setVelocityY(this.player.y-this.enemie.getChildren()[11]            .y)
        }
        else{this.enemie.getChildren()[11].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[12].x, this.enemie.getChildren()[12].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[12].setVelocityX(this.player.x-this.enemie.getChildren()[12]            .x)
            this.enemie.getChildren()[12].setVelocityY(this.player.y-this.enemie.getChildren()[12]            .y)
        }
        else{this.enemie.getChildren()[12].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[13].x, this.enemie.getChildren()[13].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[13].setVelocityX(this.player.x-this.enemie.getChildren()[13]            .x)
            this.enemie.getChildren()[13].setVelocityY(this.player.y-this.enemie.getChildren()[13]            .y)
        }
        else{this.enemie.getChildren()[13].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[14].x, this.enemie.getChildren()[14].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[14].setVelocityX(this.player.x-this.enemie.getChildren()[14]            .x)
            this.enemie.getChildren()[14].setVelocityY(this.player.y-this.enemie.getChildren()[14]            .y)
        }
        else{this.enemie.getChildren()[14].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[15].x, this.enemie.getChildren()[15].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[15].setVelocityX(this.player.x-this.enemie.getChildren()[15]            .x)
            this.enemie.getChildren()[15].setVelocityY(this.player.y-this.enemie.getChildren()[15]            .y)
        }
        else{this.enemie.getChildren()[15].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[16].x, this.enemie.getChildren()[16].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[16].setVelocityX(this.player.x-this.enemie.getChildren()[16]            .x)
            this.enemie.getChildren()[16].setVelocityY(this.player.y-this.enemie.getChildren()[16]            .y)
        }
        else{this.enemie.getChildren()[16].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[17].x, this.enemie.getChildren()[17].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[17].setVelocityX(this.player.x-this.enemie.getChildren()[17]            .x)
            this.enemie.getChildren()[17].setVelocityY(this.player.y-this.enemie.getChildren()[17]            .y)
        }
        else{this.enemie.getChildren()[17].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[18].x, this.enemie.getChildren()[18].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[18].setVelocityX(this.player.x-this.enemie.getChildren()[18]            .x)
            this.enemie.getChildren()[18].setVelocityY(this.player.y-this.enemie.getChildren()[18]            .y)
        }
        else{this.enemie.getChildren()[18].setVelocity(0)}

        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[19].x, this.enemie.getChildren()[19].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[19].setVelocityX(this.player.x-this.enemie.getChildren()[19]            .x)
            this.enemie.getChildren()[19].setVelocityY(this.player.y-this.enemie.getChildren()[19]            .y)
        }
        else{this.enemie.getChildren()[19].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[20].x, this.enemie.getChildren()[20].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[20].setVelocityX(this.player.x-this.enemie.getChildren()[20]            .x)
            this.enemie.getChildren()[20].setVelocityY(this.player.y-this.enemie.getChildren()[20]            .y)
        }
        else{this.enemie.getChildren()[20].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[21].x, this.enemie.getChildren()[21].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[21].setVelocityX(this.player.x-this.enemie.getChildren()[21]            .x)
            this.enemie.getChildren()[21].setVelocityY(this.player.y-this.enemie.getChildren()[21]            .y)
        }
        else{this.enemie.getChildren()[21].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[22].x, this.enemie.getChildren()[22].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[22].setVelocityX(this.player.x-this.enemie.getChildren()[22]            .x)
            this.enemie.getChildren()[22].setVelocityY(this.player.y-this.enemie.getChildren()[22]            .y)
        }
        else{this.enemie.getChildren()[22].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[23].x, this.enemie.getChildren()[23].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[23].setVelocityX(this.player.x-this.enemie.getChildren()[23]            .x)
            this.enemie.getChildren()[23].setVelocityY(this.player.y-this.enemie.getChildren()[23]            .y)
        }
        else{this.enemie.getChildren()[23].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[24].x, this.enemie.getChildren()[24].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[24].setVelocityX(this.player.x-this.enemie.getChildren()[24]            .x)
            this.enemie.getChildren()[24].setVelocityY(this.player.y-this.enemie.getChildren()[24]            .y)
        }
        else{this.enemie.getChildren()[24].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[25].x, this.enemie.getChildren()[25].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[25].setVelocityX(this.player.x-this.enemie.getChildren()[25]            .x)
            this.enemie.getChildren()[25].setVelocityY(this.player.y-this.enemie.getChildren()[25]            .y)
        }
        else{this.enemie.getChildren()[25].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[26].x, this.enemie.getChildren()[26].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[26].setVelocityX(this.player.x-this.enemie.getChildren()[26]            .x)
            this.enemie.getChildren()[26].setVelocityY(this.player.y-this.enemie.getChildren()[26]            .y)
        }
        else{this.enemie.getChildren()[26].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[27].x, this.enemie.getChildren()[27].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[27].setVelocityX(this.player.x-this.enemie.getChildren()[27]            .x)
            this.enemie.getChildren()[27].setVelocityY(this.player.y-this.enemie.getChildren()[27]            .y)
        }
        else{this.enemie.getChildren()[27].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[28].x, this.enemie.getChildren()[28].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[28].setVelocityX(this.player.x-this.enemie.getChildren()[28]            .x)
            this.enemie.getChildren()[28].setVelocityY(this.player.y-this.enemie.getChildren()[28]            .y)
        }
        else{this.enemie.getChildren()[28].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[29].x, this.enemie.getChildren()[29].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[29].setVelocityX(this.player.x-this.enemie.getChildren()[29]            .x)
            this.enemie.getChildren()[29].setVelocityY(this.player.y-this.enemie.getChildren()[29]            .y)
        }
        else{this.enemie.getChildren()[29].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[30].x, this.enemie.getChildren()[30].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[30].setVelocityX(this.player.x-this.enemie.getChildren()[30]            .x)
            this.enemie.getChildren()[30].setVelocityY(this.player.y-this.enemie.getChildren()[30]            .y)
        }
        else{this.enemie.getChildren()[30].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[31].x, this.enemie.getChildren()[31].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[31].setVelocityX(this.player.x-this.enemie.getChildren()[31]            .x)
            this.enemie.getChildren()[31].setVelocityY(this.player.y-this.enemie.getChildren()[31]            .y)
        }
        else{this.enemie.getChildren()[31].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[32].x, this.enemie.getChildren()[32].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[32].setVelocityX(this.player.x-this.enemie.getChildren()[32]            .x)
            this.enemie.getChildren()[32].setVelocityY(this.player.y-this.enemie.getChildren()[32]            .y)
        }
        else{this.enemie.getChildren()[32].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[33].x, this.enemie.getChildren()[33].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[33].setVelocityX(this.player.x-this.enemie.getChildren()[33]            .x)
            this.enemie.getChildren()[33].setVelocityY(this.player.y-this.enemie.getChildren()[33]            .y)
        }
        else{this.enemie.getChildren()[33].setVelocity(0)}
        
        
        if (HP == 10) {
                this.vie.anims.play("HP1", true);
            }
            if (HP == 9) {
                this.vie.anims.play("HP2", true);
            }
            if (HP == 8) {
                this.vie.anims.play("HP3", true);
            }
            if (HP == 7) {
                this.vie.anims.play("HP4", true);
            }
            if (HP == 6) {
                this.vie.anims.play("HP5", true);
            }
            if (HP == 5) {
                this.vie.anims.play("HP6", true);
            }
            if (HP == 4) {
                this.vie.anims.play("HP7", true);
            }
            if (HP == 3) {
                this.vie.anims.play("HP8", true);
            }
            if (HP == 2) {
                this.vie.anims.play("HP9", true);
            }
            if (HP == 1) {
                this.vie.anims.play("HP10", true);
            }
            if (HP == 0) {
                this.scene.stop()
            }
    }

    PerdHP() {
        if (invincible == false) {
            this.player.setTint("#ff0000")
            invincible = true
            HP -= 1
            setTimeout(() => {
                this.player.clearTint()
                invincible = false
            }, 1000);
        }
    }



    kill(i) {
        console.log("kill")
        this.enemie.getChildren()[0].disableBody(true, true);
        this.potion = this.add.sprite(this.enemie.getChildren()[0].x, this.enemie.getChildren()[0].y, "potion")
    } 

   Drop() {
        console.log("drop");
        this.potion.disableBody(true, true);
        nbrP += 1;
    }

    phase2(){
        this.scene.start("map_pt_2")
    }
}
















class map_pt_2 extends Phaser.Scene {
    constructor() {
        super('map_pt_2');

    }



    preload(){
        this.load.tilemapTiledJSON("mapPt2","map/map_pt_2.json");
        this.load.image("phaser_assets", "map/tuile.png");
        this.load.image("potion", "sprite/potion.png");
        this.load.image("hitBox", "sprite/hitbox.png");
        this.load.spritesheet('perso','sprite/perso_pixel.png',
                { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('monster','sprite/enemie.png',
        { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('HP','sprite/barre_de_vie.png',
        { frameWidth:2560, frameHeight: 128});
    }

    create(){
        
        const carteDuNiveau = this.add.tilemap("mapPt2");        
        const tileset = carteDuNiveau.addTilesetImage("Tuile","phaser_assets");
        //const plateforme = carteDuNiveau.createLayer("map_base",tileset);
        const Sol = carteDuNiveau.createLayer('map_base',tileset);
        const Sol2 = carteDuNiveau.createLayer('mur_inférieur',tileset);
        const murSolide = carteDuNiveau.createLayer('mur',tileset);
        //const collectible = carteDuNiveau.createLayer('collectible',tileset);
        //const tp = carteDuNiveau.createLayer('teleporteur',tileset);
        //const collectible = carteDuNiveau.createLayer('collectible',tileset);
        const tp1 = carteDuNiveau.createLayer('Teleporteur_1',tileset);
        const tp2 = carteDuNiveau.createLayer('Teleporteur_2',tileset);
        this.enemie = this.physics.add.group ()
            this.enemie.create(131*32, 184*32, 'monster');
            this.enemie.create(152*32, 184*32, 'monster');
            this.enemie.create(139*32, 159*32, 'monster');
            this.enemie.create(122*32, 175*32, 'monster');
            this.enemie.create(106*32, 180*32, 'monster');
            this.enemie.create(100*32, 158*32, 'monster');
            this.enemie.create(86*32, 186*32, 'monster');
            this.enemie.create(74*32, 170*32, 'monster'); 
            this.enemie.create(44*32, 189*32, 'monster');
            this.enemie.create(41*32, 176*32, 'monster');
            this.enemie.create(26*32, 192*32, 'monster');
            this.enemie.create(23*32, 171*32, 'monster');
            this.enemie.create(32*32, 168*32, 'monster');
            this.enemie.create(19*32, 161*32, 'monster');
            this.enemie.create(5*32, 181*32, 'monster');
            this.enemie.create(12*32, 189*32, 'monster');
            this.enemie.create(7*32, 186*32, 'monster');
            this.enemie.create(16*32, 174*32, 'monster');
            this.enemie.create(149*32, 151*32, 'monster');
            this.enemie.create(174*32, 174*32, 'monster');
            this.enemie.create(192*32, 180*32, 'monster');
            this.enemie.create(198*32, 155*32, 'monster');
            this.enemie.create(217*32, 176*32, 'monster');
            this.enemie.create(205*32, 166*32, 'monster');
            this.enemie.create(177*32, 148*32, 'monster');
            this.enemie.create(139*32, 140*32, 'monster');
            this.enemie.create(154*32, 137*32, 'monster');
            this.enemie.create(155*32, 121*32, 'monster');
            this.enemie.create(182*32, 126*32, 'monster');
            this.enemie.create(170*32, 113*32, 'monster');
            this.enemie.create(155*32, 100*32, 'monster');
            this.enemie.create(174*32, 99*32, 'monster');
            this.enemie.create(172*32, 50*32, 'monster');
            this.enemie.create(143*32, 51*32, 'monster');
            this.enemie.create(158*32, 70*32, 'monster');
            this.enemie.create(189*32, 52*32, 'monster');
            this.enemie.create(184*32, 32*32, 'monster');
            this.enemie.create(145*32, 55*32, 'monster');
            this.enemie.create(131*32, 44*32, 'monster');
            this.enemie.create(146*32, 26*32, 'monster');
            this.enemie.create(98*32, 44*32, 'monster');
            this.enemie.create(92*32, 34*32, 'monster');
            this.enemie.create(92*32, 24*32, 'monster');
            this.enemie.create(75*32, 29*32, 'monster');
            this.enemie.create(67*32, 39*32, 'monster');
            this.enemie.create(58*32, 18*32, 'monster');
            this.enemie.create(43*32, 41*32, 'monster');
            this.enemie.create(46*32, 23*32, 'monster');
            this.enemie.create(47*32, 20*32, 'monster');
            this.enemie.create(44*32, 16*32, 'monster');
            this.enemie.create(39*32, 40*32, 'monster');
            this.enemie.create(42*32, 47*32, 'monster');
            this.enemie.create(54*32, 53*32, 'monster');
            this.enemie.create(80*32, 37*32, 'monster');
            this.enemie.create(121*32, 23*32, 'monster');
            this.enemie.create(149*32, 63*32, 'monster');
            this.enemie.create(169*32, 32*32, 'monster');
            this.enemie.create(158*32, 76*32, 'monster');
            this.enemie.create(174*32, 134*32, 'monster');
            this.enemie.create(162*32, 150*32, 'monster');
            this.enemie.create(164*32, 153*32, 'monster');

        Sol.setCollisionByProperty({estSolide: true});
        murSolide.setCollisionByProperty({ estSolide: true }); 
        this.player = this.physics.add.sprite(53*32, 54*32, 'perso');
        this.physics.add.collider(this.player, murSolide);
        this.physics.add.collider(this.player, Sol);

    
        tp1.setCollisionByExclusion(-1, true);
        tp2.setCollisionByExclusion(-1, true);
        this.cameras.main.setBounds(0, 0, 258*32, 200*32);
        this.cameras.main.zoom = 2;
        this.cameras.main.startFollow(this.player); 
        this.physics.add.collider(this.player,tp1,this.phase3,null,this);
        this.physics.add.collider(this.player,tp2,this.phase1,null,this);
        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,E,SPACE,SHIFT');
        this.potion = this.physics.add.sprite(365,190, 'potion').setScale(1).setScrollFactor(0);

        this.vie=this.add.sprite(470,220,'HP').setScale(0.1).setScrollFactor(0);
        this.HB=this.physics.add.sprite(this.player.x+32,this.player.y,"hitBox");
        this.HB.disableBody()
        
        this.physics.add.collider(this.enemie.getChildren()[0], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[0], Sol);
        this.physics.add.collider(this.enemie.getChildren()[1], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[1], Sol);
        this.physics.add.collider(this.enemie.getChildren()[2], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[2], Sol);
        this.physics.add.collider(this.enemie.getChildren()[3], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[3], Sol);
        this.physics.add.collider(this.enemie.getChildren()[4], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[4], Sol);
        this.physics.add.collider(this.enemie.getChildren()[5], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[5], Sol);
        this.physics.add.collider(this.enemie.getChildren()[6], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[6], Sol);
        this.physics.add.collider(this.enemie.getChildren()[7], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[7], Sol);
        this.physics.add.collider(this.enemie.getChildren()[8], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[8], Sol);
        this.physics.add.collider(this.enemie.getChildren()[9], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[9], Sol);
        this.physics.add.collider(this.enemie.getChildren()[10], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[10], Sol);
        this.physics.add.collider(this.enemie.getChildren()[11], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[11], Sol);
        this.physics.add.collider(this.enemie.getChildren()[12], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[12], Sol);
        this.physics.add.collider(this.enemie.getChildren()[13], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[13], Sol);
        this.physics.add.collider(this.enemie.getChildren()[14], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[14], Sol);
        this.physics.add.collider(this.enemie.getChildren()[15], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[15], Sol);
        this.physics.add.collider(this.enemie.getChildren()[16], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[16], Sol);
        this.physics.add.collider(this.enemie.getChildren()[17], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[17], Sol);
        this.physics.add.collider(this.enemie.getChildren()[18], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[18], Sol);
        this.physics.add.collider(this.enemie.getChildren()[19], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[19], Sol);
        this.physics.add.collider(this.enemie.getChildren()[20], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[20], Sol);
        this.physics.add.collider(this.enemie.getChildren()[21], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[21], Sol);
        this.physics.add.collider(this.enemie.getChildren()[22], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[22], Sol);
        this.physics.add.collider(this.enemie.getChildren()[23], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[23], Sol);
        this.physics.add.collider(this.enemie.getChildren()[24], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[24], Sol);
        this.physics.add.collider(this.enemie.getChildren()[25], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[25], Sol);
        this.physics.add.collider(this.enemie.getChildren()[26], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[26], Sol);
        this.physics.add.collider(this.enemie.getChildren()[27], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[27], Sol);
        this.physics.add.collider(this.enemie.getChildren()[28], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[28], Sol);
        this.physics.add.collider(this.enemie.getChildren()[29], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[29], Sol);
        this.physics.add.collider(this.enemie.getChildren()[30], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[30], Sol);
        this.physics.add.collider(this.enemie.getChildren()[31], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[31], Sol);
        this.physics.add.collider(this.enemie.getChildren()[32], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[32], Sol);
        this.physics.add.collider(this.enemie.getChildren()[33], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[33], Sol);
        this.physics.add.collider(this.enemie.getChildren()[34], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[34], Sol);
        this.physics.add.collider(this.enemie.getChildren()[35], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[35], Sol);
        this.physics.add.collider(this.enemie.getChildren()[36], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[36], Sol);
        this.physics.add.collider(this.enemie.getChildren()[37], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[37], Sol);
        this.physics.add.collider(this.enemie.getChildren()[38], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[38], Sol);
        this.physics.add.collider(this.enemie.getChildren()[39], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[39], Sol);
        this.physics.add.collider(this.enemie.getChildren()[40], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[40], Sol);
        this.physics.add.collider(this.enemie.getChildren()[41], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[41], Sol);
        this.physics.add.collider(this.enemie.getChildren()[42], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[42], Sol);
        this.physics.add.collider(this.enemie.getChildren()[43], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[43], Sol);
        this.physics.add.collider(this.enemie.getChildren()[44], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[44], Sol);
        this.physics.add.collider(this.enemie.getChildren()[45], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[45], Sol);
        this.physics.add.collider(this.enemie.getChildren()[46], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[46], Sol);
        this.physics.add.collider(this.enemie.getChildren()[47], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[47], Sol);
        this.physics.add.collider(this.enemie.getChildren()[48], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[48], Sol);
        this.physics.add.collider(this.enemie.getChildren()[49], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[49], Sol);
        this.physics.add.collider(this.enemie.getChildren()[50], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[50], Sol);
        this.physics.add.collider(this.enemie.getChildren()[51], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[51], Sol);
        this.physics.add.collider(this.enemie.getChildren()[52], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[52], Sol);
        this.physics.add.collider(this.enemie.getChildren()[53], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[53], Sol);
        this.physics.add.collider(this.enemie.getChildren()[54], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[54], Sol);
        this.physics.add.collider(this.enemie.getChildren()[55], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[55], Sol);
        this.physics.add.collider(this.enemie.getChildren()[56], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[56], Sol);
        this.physics.add.collider(this.enemie.getChildren()[57], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[57], Sol);
        this.physics.add.collider(this.enemie.getChildren()[58], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[58], Sol);
        this.physics.add.collider(this.enemie.getChildren()[59], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[59], Sol);
        this.physics.add.collider(this.enemie.getChildren()[60], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[60], Sol);
        
        this.physics.add.overlap(this.player, this.enemie.getChildren()[0], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[1], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[2], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[3], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[4], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[5], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[6], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[7], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[8], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[9], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[10], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[11], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[12], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[13], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[14], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[15], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[16], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[17], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[18], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[19], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[20], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[21], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[22], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[23], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[24], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[25], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[26], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[27], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[28], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[29], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[30], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[31], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[32], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[33], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[34], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[35], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[36], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[37], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[38], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[39], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[40], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[41], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[42], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[43], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[44], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[45], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[46], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[47], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[48], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[49], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[50], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[51], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[52], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[53], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[54], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[55], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[56], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[57], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[58], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[59], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[60], this.PerdHP, null, this);




        this.physics.add.overlap(this.HB,this.enemie.getChildren()[0],function(){this.enemie.getChildren()[0].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[1],function(){this.enemie.getChildren()[1].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[2],function(){this.enemie.getChildren()[2].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[3],function(){this.enemie.getChildren()[3].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[4],function(){this.enemie.getChildren()[4].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[5],function(){this.enemie.getChildren()[5].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[6],function(){this.enemie.getChildren()[6].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[7],function(){this.enemie.getChildren()[7].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[8],function(){this.enemie.getChildren()[8].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[9],function(){this.enemie.getChildren()[9].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[10],function(){this.enemie.getChildren()[10].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[11],function(){this.enemie.getChildren()[11].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[12],function(){this.enemie.getChildren()[12].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[13],function(){this.enemie.getChildren()[13].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[14],function(){this.enemie.getChildren()[14].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[15],function(){this.enemie.getChildren()[15].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[16],function(){this.enemie.getChildren()[16].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[17],function(){this.enemie.getChildren()[17].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[18],function(){this.enemie.getChildren()[18].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[19],function(){this.enemie.getChildren()[19].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[20],function(){this.enemie.getChildren()[20].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[21],function(){this.enemie.getChildren()[21].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[22],function(){this.enemie.getChildren()[22].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[23],function(){this.enemie.getChildren()[23].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[24],function(){this.enemie.getChildren()[24].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[25],function(){this.enemie.getChildren()[25].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[26],function(){this.enemie.getChildren()[26].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[27],function(){this.enemie.getChildren()[27].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[28],function(){this.enemie.getChildren()[28].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[29],function(){this.enemie.getChildren()[29].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[30],function(){this.enemie.getChildren()[30].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[31],function(){this.enemie.getChildren()[31].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[32],function(){this.enemie.getChildren()[32].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[33],function(){this.enemie.getChildren()[33].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[34],function(){this.enemie.getChildren()[34].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[35],function(){this.enemie.getChildren()[35].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[36],function(){this.enemie.getChildren()[36].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[37],function(){this.enemie.getChildren()[37].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[38],function(){this.enemie.getChildren()[38].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[39],function(){this.enemie.getChildren()[39].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[40],function(){this.enemie.getChildren()[40].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[41],function(){this.enemie.getChildren()[41].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[42],function(){this.enemie.getChildren()[42].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[43],function(){this.enemie.getChildren()[43].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[44],function(){this.enemie.getChildren()[44].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[45],function(){this.enemie.getChildren()[45].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[46],function(){this.enemie.getChildren()[46].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[47],function(){this.enemie.getChildren()[47].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[48],function(){this.enemie.getChildren()[48].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[49],function(){this.enemie.getChildren()[49].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[50],function(){this.enemie.getChildren()[50].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[51],function(){this.enemie.getChildren()[51].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[52],function(){this.enemie.getChildren()[52].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[53],function(){this.enemie.getChildren()[53].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[54],function(){this.enemie.getChildren()[54].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[55],function(){this.enemie.getChildren()[55].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[56],function(){this.enemie.getChildren()[56].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[57],function(){this.enemie.getChildren()[57].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[58],function(){this.enemie.getChildren()[58].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[59],function(){this.enemie.getChildren()[59].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[60],function(){this.enemie.getChildren()[60].disableBody(true,true)},null,this)

    

    
        this.physics.add.collider(this.enemie,this.enemie);
    
    
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', { start: 11, end: 18 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', { start: 11, end: 18 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        });


        this.anims.create({
            key: 'HP1',
            frames: this.anims.generateFrameNumbers('HP', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP2',
            frames: this.anims.generateFrameNumbers('HP', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP3',
            frames: this.anims.generateFrameNumbers('HP', { start: 2, end: 2 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP4',
            frames: this.anims.generateFrameNumbers('HP', { start: 3, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP5',
            frames: this.anims.generateFrameNumbers('HP', { start: 4, end: 4 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP6',
            frames: this.anims.generateFrameNumbers('HP', { start: 5, end: 5 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'HP7',
            frames: this.anims.generateFrameNumbers('HP', { start: 6, end: 6 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'HP8',
            frames: this.anims.generateFrameNumbers('HP', { start: 7, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP9',
            frames: this.anims.generateFrameNumbers('HP', { start: 8, end: 8 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP10',
            frames: this.anims.generateFrameNumbers('HP', { start: 9, end: 9 }),
            frameRate: 4,
            repeat: -1
        });
    
            
    }
    
    
    
    
    update(){


        
        
        if(this.clavier.E.isDown){
            this.player.anims.play('Tleft', true);
            if(CD==true){
                CD=false
                this.HB.enableBody()
                setTimeout(() => {
                   CD=true
                   this.HB.disableBody() 
                }, 100);
            }
        }

        if (this.clavier.Z.isDown) {
            this.player.setVelocityY(-200);
            this.player.anims.play('up', true);
            this.HB.x=this.player.x;
            this.HB.y=this.player.y-32;
        }
        else if (this.clavier.S.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);
            this.HB.x=this.player.x;
            this.HB.y=this.player.y+32;
        }
        else if (this.clavier.Q.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
            this.HB.x=this.player.x-32;
            this.HB.y=this.player.y;
        }
        else if (this.clavier.D.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
            this.HB.x=this.player.x+32;
            this.HB.y=this.player.y;
        }
        else {
            this.player.setVelocityX(0)
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
             

     
        

        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[0].x, this.enemie.getChildren()[0].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[0].setVelocityX(this.player.x-this.enemie.getChildren()[0]            .x)
            this.enemie.getChildren()[0].setVelocityY(this.player.y-this.enemie.getChildren()[0]            .y)
        }
        else{this.enemie.getChildren()[0].setVelocity(0)}
        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[1].x, this.enemie.getChildren()[1].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[1].setVelocityX(this.player.x-this.enemie.getChildren()[1]            .x)
            this.enemie.getChildren()[1].setVelocityY(this.player.y-this.enemie.getChildren()[1]            .y)
        }
        else{this.enemie.getChildren()[1].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[2].x, this.enemie.getChildren()[2].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[2].setVelocityX(this.player.x-this.enemie.getChildren()[2]            .x)
            this.enemie.getChildren()[2].setVelocityY(this.player.y-this.enemie.getChildren()[2]            .y)
        }
        else{this.enemie.getChildren()[2].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[3].x, this.enemie.getChildren()[3].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[3].setVelocityX(this.player.x-this.enemie.getChildren()[3]            .x)
            this.enemie.getChildren()[3].setVelocityY(this.player.y-this.enemie.getChildren()[3]            .y)
        }
        else{this.enemie.getChildren()[3].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[4].x, this.enemie.getChildren()[4].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[4].setVelocityX(this.player.x-this.enemie.getChildren()[4]            .x)
            this.enemie.getChildren()[4].setVelocityY(this.player.y-this.enemie.getChildren()[4]            .y)
        }
        else{this.enemie.getChildren()[4].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[5].x, this.enemie.getChildren()[5].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[5].setVelocityX(this.player.x-this.enemie.getChildren()[5]            .x)
            this.enemie.getChildren()[5].setVelocityY(this.player.y-this.enemie.getChildren()[5]            .y)
        }
        else{this.enemie.getChildren()[5].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[6].x, this.enemie.getChildren()[6].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[6].setVelocityX(this.player.x-this.enemie.getChildren()[6]            .x)
            this.enemie.getChildren()[6].setVelocityY(this.player.y-this.enemie.getChildren()[6]            .y)
        }
        else{this.enemie.getChildren()[6].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[7].x, this.enemie.getChildren()[7].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[7].setVelocityX(this.player.x-this.enemie.getChildren()[7]            .x)
            this.enemie.getChildren()[7].setVelocityY(this.player.y-this.enemie.getChildren()[7]            .y)
        }
        else{this.enemie.getChildren()[7].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[8].x, this.enemie.getChildren()[8].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[8].setVelocityX(this.player.x-this.enemie.getChildren()[8]            .x)
            this.enemie.getChildren()[8].setVelocityY(this.player.y-this.enemie.getChildren()[8]            .y)
        }
        else{this.enemie.getChildren()[8].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[9].x, this.enemie.getChildren()[9].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[9].setVelocityX(this.player.x-this.enemie.getChildren()[9]            .x)
            this.enemie.getChildren()[9].setVelocityY(this.player.y-this.enemie.getChildren()[9]            .y)
        }
        else{this.enemie.getChildren()[9].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[10].x, this.enemie.getChildren()[10].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[10].setVelocityX(this.player.x-this.enemie.getChildren()[10]            .x)
            this.enemie.getChildren()[10].setVelocityY(this.player.y-this.enemie.getChildren()[10]            .y)
        }
        else{this.enemie.getChildren()[10].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[11].x, this.enemie.getChildren()[11].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[11].setVelocityX(this.player.x-this.enemie.getChildren()[11]            .x)
            this.enemie.getChildren()[11].setVelocityY(this.player.y-this.enemie.getChildren()[11]            .y)
        }
        else{this.enemie.getChildren()[11].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[12].x, this.enemie.getChildren()[12].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[12].setVelocityX(this.player.x-this.enemie.getChildren()[12]            .x)
            this.enemie.getChildren()[12].setVelocityY(this.player.y-this.enemie.getChildren()[12]            .y)
        }
        else{this.enemie.getChildren()[12].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[13].x, this.enemie.getChildren()[13].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[13].setVelocityX(this.player.x-this.enemie.getChildren()[13]            .x)
            this.enemie.getChildren()[13].setVelocityY(this.player.y-this.enemie.getChildren()[13]            .y)
        }
        else{this.enemie.getChildren()[13].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[14].x, this.enemie.getChildren()[14].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[14].setVelocityX(this.player.x-this.enemie.getChildren()[14]            .x)
            this.enemie.getChildren()[14].setVelocityY(this.player.y-this.enemie.getChildren()[14]            .y)
        }
        else{this.enemie.getChildren()[14].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[15].x, this.enemie.getChildren()[15].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[15].setVelocityX(this.player.x-this.enemie.getChildren()[15]            .x)
            this.enemie.getChildren()[15].setVelocityY(this.player.y-this.enemie.getChildren()[15]            .y)
        }
        else{this.enemie.getChildren()[15].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[16].x, this.enemie.getChildren()[16].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[16].setVelocityX(this.player.x-this.enemie.getChildren()[16]            .x)
            this.enemie.getChildren()[16].setVelocityY(this.player.y-this.enemie.getChildren()[16]            .y)
        }
        else{this.enemie.getChildren()[16].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[17].x, this.enemie.getChildren()[17].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[17].setVelocityX(this.player.x-this.enemie.getChildren()[17]            .x)
            this.enemie.getChildren()[17].setVelocityY(this.player.y-this.enemie.getChildren()[17]            .y)
        }
        else{this.enemie.getChildren()[17].setVelocity(0)}

        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[18].x, this.enemie.getChildren()[18].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[18].setVelocityX(this.player.x-this.enemie.getChildren()[18]            .x)
            this.enemie.getChildren()[18].setVelocityY(this.player.y-this.enemie.getChildren()[18]            .y)
        }
        else{this.enemie.getChildren()[18].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[19].x, this.enemie.getChildren()[19].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[19].setVelocityX(this.player.x-this.enemie.getChildren()[19]            .x)
            this.enemie.getChildren()[19].setVelocityY(this.player.y-this.enemie.getChildren()[19]            .y)
        }
        else{this.enemie.getChildren()[19].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[20].x, this.enemie.getChildren()[20].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[20].setVelocityX(this.player.x-this.enemie.getChildren()[20]            .x)
            this.enemie.getChildren()[20].setVelocityY(this.player.y-this.enemie.getChildren()[20]            .y)
        }
        else{this.enemie.getChildren()[20].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[21].x, this.enemie.getChildren()[21].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[21].setVelocityX(this.player.x-this.enemie.getChildren()[21]            .x)
            this.enemie.getChildren()[21].setVelocityY(this.player.y-this.enemie.getChildren()[21]            .y)
        }
        else{this.enemie.getChildren()[21].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[22].x, this.enemie.getChildren()[22].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[22].setVelocityX(this.player.x-this.enemie.getChildren()[22]            .x)
            this.enemie.getChildren()[22].setVelocityY(this.player.y-this.enemie.getChildren()[22]            .y)
        }
        else{this.enemie.getChildren()[22].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[23].x, this.enemie.getChildren()[23].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[23].setVelocityX(this.player.x-this.enemie.getChildren()[23]            .x)
            this.enemie.getChildren()[23].setVelocityY(this.player.y-this.enemie.getChildren()[23]            .y)
        }
        else{this.enemie.getChildren()[23].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[24].x, this.enemie.getChildren()[24].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[24].setVelocityX(this.player.x-this.enemie.getChildren()[24]            .x)
            this.enemie.getChildren()[24].setVelocityY(this.player.y-this.enemie.getChildren()[24]            .y)
        }
        else{this.enemie.getChildren()[24].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[25].x, this.enemie.getChildren()[25].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[25].setVelocityX(this.player.x-this.enemie.getChildren()[25]            .x)
            this.enemie.getChildren()[25].setVelocityY(this.player.y-this.enemie.getChildren()[25]            .y)
        }
        else{this.enemie.getChildren()[25].setVelocity(0)}
        

        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[26].x, this.enemie.getChildren()[26].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[26].setVelocityX(this.player.x-this.enemie.getChildren()[26]            .x)
            this.enemie.getChildren()[26].setVelocityY(this.player.y-this.enemie.getChildren()[26]            .y)
        }
        else{this.enemie.getChildren()[26].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[27].x, this.enemie.getChildren()[27].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[27].setVelocityX(this.player.x-this.enemie.getChildren()[27]            .x)
            this.enemie.getChildren()[27].setVelocityY(this.player.y-this.enemie.getChildren()[27]            .y)
        }
        else{this.enemie.getChildren()[27].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[28].x, this.enemie.getChildren()[28].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[28].setVelocityX(this.player.x-this.enemie.getChildren()[28]            .x)
            this.enemie.getChildren()[28].setVelocityY(this.player.y-this.enemie.getChildren()[28]            .y)
        }
        else{this.enemie.getChildren()[28].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[29].x, this.enemie.getChildren()[29].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[29].setVelocityX(this.player.x-this.enemie.getChildren()[29]            .x)
            this.enemie.getChildren()[29].setVelocityY(this.player.y-this.enemie.getChildren()[29]            .y)
        }
        else{this.enemie.getChildren()[29].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[30].x, this.enemie.getChildren()[30].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[30].setVelocityX(this.player.x-this.enemie.getChildren()[30]            .x)
            this.enemie.getChildren()[30].setVelocityY(this.player.y-this.enemie.getChildren()[30]            .y)
        }
        else{this.enemie.getChildren()[30].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[31].x, this.enemie.getChildren()[31].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[31].setVelocityX(this.player.x-this.enemie.getChildren()[31]            .x)
            this.enemie.getChildren()[31].setVelocityY(this.player.y-this.enemie.getChildren()[31]            .y)
        }
        else{this.enemie.getChildren()[31].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[32].x, this.enemie.getChildren()[32].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[32].setVelocityX(this.player.x-this.enemie.getChildren()[32]            .x)
            this.enemie.getChildren()[32].setVelocityY(this.player.y-this.enemie.getChildren()[32]            .y)
        }
        else{this.enemie.getChildren()[32].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[33].x, this.enemie.getChildren()[33].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[33].setVelocityX(this.player.x-this.enemie.getChildren()[33]            .x)
            this.enemie.getChildren()[33].setVelocityY(this.player.y-this.enemie.getChildren()[33]            .y)
        }
        else{this.enemie.getChildren()[33].setVelocity(0)}
        

        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[34].x, this.enemie.getChildren()[34].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[34].setVelocityX(this.player.x-this.enemie.getChildren()[34]            .x)
            this.enemie.getChildren()[34].setVelocityY(this.player.y-this.enemie.getChildren()[34]            .y)
        }
        else{this.enemie.getChildren()[34].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[35].x, this.enemie.getChildren()[35].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[35].setVelocityX(this.player.x-this.enemie.getChildren()[35]            .x)
            this.enemie.getChildren()[35].setVelocityY(this.player.y-this.enemie.getChildren()[35]            .y)
        }
        else{this.enemie.getChildren()[35].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[36].x, this.enemie.getChildren()[36].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[36].setVelocityX(this.player.x-this.enemie.getChildren()[36]            .x)
            this.enemie.getChildren()[36].setVelocityY(this.player.y-this.enemie.getChildren()[36]            .y)
        }
        else{this.enemie.getChildren()[36].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[37].x, this.enemie.getChildren()[37].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[37].setVelocityX(this.player.x-this.enemie.getChildren()[37]            .x)
            this.enemie.getChildren()[37].setVelocityY(this.player.y-this.enemie.getChildren()[37]            .y)
        }
        else{this.enemie.getChildren()[37].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[38].x, this.enemie.getChildren()[38].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[38].setVelocityX(this.player.x-this.enemie.getChildren()[38]            .x)
            this.enemie.getChildren()[38].setVelocityY(this.player.y-this.enemie.getChildren()[38]            .y)
        }
        else{this.enemie.getChildren()[38].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[39].x, this.enemie.getChildren()[39].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[39].setVelocityX(this.player.x-this.enemie.getChildren()[39]            .x)
            this.enemie.getChildren()[39].setVelocityY(this.player.y-this.enemie.getChildren()[39]            .y)
        }
        else{this.enemie.getChildren()[39].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[40].x, this.enemie.getChildren()[40].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[40].setVelocityX(this.player.x-this.enemie.getChildren()[40]            .x)
            this.enemie.getChildren()[40].setVelocityY(this.player.y-this.enemie.getChildren()[40]            .y)
        }
        else{this.enemie.getChildren()[40].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[41].x, this.enemie.getChildren()[41].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[41].setVelocityX(this.player.x-this.enemie.getChildren()[41]            .x)
            this.enemie.getChildren()[41].setVelocityY(this.player.y-this.enemie.getChildren()[41]            .y)
        }
        else{this.enemie.getChildren()[41].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[42].x, this.enemie.getChildren()[42].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[42].setVelocityX(this.player.x-this.enemie.getChildren()[42]            .x)
            this.enemie.getChildren()[42].setVelocityY(this.player.y-this.enemie.getChildren()[42]            .y)
        }
        else{this.enemie.getChildren()[42].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[43].x, this.enemie.getChildren()[43].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[43].setVelocityX(this.player.x-this.enemie.getChildren()[43]            .x)
            this.enemie.getChildren()[43].setVelocityY(this.player.y-this.enemie.getChildren()[43]            .y)
        }
        else{this.enemie.getChildren()[43].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[44].x, this.enemie.getChildren()[44].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[44].setVelocityX(this.player.x-this.enemie.getChildren()[44]            .x)
            this.enemie.getChildren()[44].setVelocityY(this.player.y-this.enemie.getChildren()[44]            .y)
        }
        else{this.enemie.getChildren()[44].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[45].x, this.enemie.getChildren()[45].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[45].setVelocityX(this.player.x-this.enemie.getChildren()[45]            .x)
            this.enemie.getChildren()[45].setVelocityY(this.player.y-this.enemie.getChildren()[45]            .y)
        }
        else{this.enemie.getChildren()[45].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[46].x, this.enemie.getChildren()[46].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[46].setVelocityX(this.player.x-this.enemie.getChildren()[46]            .x)
            this.enemie.getChildren()[46].setVelocityY(this.player.y-this.enemie.getChildren()[46]            .y)
        }
        else{this.enemie.getChildren()[46].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[47].x, this.enemie.getChildren()[47].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[47].setVelocityX(this.player.x-this.enemie.getChildren()[47]            .x)
            this.enemie.getChildren()[47].setVelocityY(this.player.y-this.enemie.getChildren()[47]            .y)
        }
        else{this.enemie.getChildren()[47].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[48].x, this.enemie.getChildren()[48].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[48].setVelocityX(this.player.x-this.enemie.getChildren()[48]            .x)
            this.enemie.getChildren()[48].setVelocityY(this.player.y-this.enemie.getChildren()[48]            .y)
        }
        else{this.enemie.getChildren()[48].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[49].x, this.enemie.getChildren()[49].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[49].setVelocityX(this.player.x-this.enemie.getChildren()[49]            .x)
            this.enemie.getChildren()[49].setVelocityY(this.player.y-this.enemie.getChildren()[49]            .y)
        }
        else{this.enemie.getChildren()[49].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[50].x, this.enemie.getChildren()[50].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[50].setVelocityX(this.player.x-this.enemie.getChildren()[50]            .x)
            this.enemie.getChildren()[50].setVelocityY(this.player.y-this.enemie.getChildren()[50]            .y)
        }
        else{this.enemie.getChildren()[50].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[51].x, this.enemie.getChildren()[51].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[51].setVelocityX(this.player.x-this.enemie.getChildren()[51]            .x)
            this.enemie.getChildren()[51].setVelocityY(this.player.y-this.enemie.getChildren()[51]            .y)
        }
        else{this.enemie.getChildren()[51].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[52].x, this.enemie.getChildren()[52].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[52].setVelocityX(this.player.x-this.enemie.getChildren()[52]            .x)
            this.enemie.getChildren()[52].setVelocityY(this.player.y-this.enemie.getChildren()[52]            .y)
        }
        else{this.enemie.getChildren()[52].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[53].x, this.enemie.getChildren()[53].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[53].setVelocityX(this.player.x-this.enemie.getChildren()[53]            .x)
            this.enemie.getChildren()[53].setVelocityY(this.player.y-this.enemie.getChildren()[53]            .y)
        }
        else{this.enemie.getChildren()[53].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[54].x, this.enemie.getChildren()[54].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[54].setVelocityX(this.player.x-this.enemie.getChildren()[54]            .x)
            this.enemie.getChildren()[54].setVelocityY(this.player.y-this.enemie.getChildren()[54]            .y)
        }
        else{this.enemie.getChildren()[54].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[55].x, this.enemie.getChildren()[55].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[55].setVelocityX(this.player.x-this.enemie.getChildren()[55]            .x)
            this.enemie.getChildren()[55].setVelocityY(this.player.y-this.enemie.getChildren()[55]            .y)
        }
        else{this.enemie.getChildren()[55].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[56].x, this.enemie.getChildren()[56].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[56].setVelocityX(this.player.x-this.enemie.getChildren()[56]            .x)
            this.enemie.getChildren()[56].setVelocityY(this.player.y-this.enemie.getChildren()[56]            .y)
        }
        else{this.enemie.getChildren()[56].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[57].x, this.enemie.getChildren()[57].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[57].setVelocityX(this.player.x-this.enemie.getChildren()[57]            .x)
            this.enemie.getChildren()[57].setVelocityY(this.player.y-this.enemie.getChildren()[57]            .y)
        }
        else{this.enemie.getChildren()[57].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[58].x, this.enemie.getChildren()[58].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[58].setVelocityX(this.player.x-this.enemie.getChildren()[58]            .x)
            this.enemie.getChildren()[58].setVelocityY(this.player.y-this.enemie.getChildren()[58]            .y)
        }
        else{this.enemie.getChildren()[58].setVelocity(0)}
        

        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[59].x, this.enemie.getChildren()[59].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[59].setVelocityX(this.player.x-this.enemie.getChildren()[59]            .x)
            this.enemie.getChildren()[59].setVelocityY(this.player.y-this.enemie.getChildren()[59]            .y)
        }
        else{this.enemie.getChildren()[59].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[60].x, this.enemie.getChildren()[60].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[60].setVelocityX(this.player.x-this.enemie.getChildren()[60]            .x)
            this.enemie.getChildren()[60].setVelocityY(this.player.y-this.enemie.getChildren()[60]            .y)
        }
        else{this.enemie.getChildren()[60].setVelocity(0)}



        
        
        if (HP == 10) {
                this.vie.anims.play("HP1", true);
            }
            if (HP == 9) {
                this.vie.anims.play("HP2", true);
            }
            if (HP == 8) {
                this.vie.anims.play("HP3", true);
            }
            if (HP == 7) {
                this.vie.anims.play("HP4", true);
            }
            if (HP == 6) {
                this.vie.anims.play("HP5", true);
            }
            if (HP == 5) {
                this.vie.anims.play("HP6", true);
            }
            if (HP == 4) {
                this.vie.anims.play("HP7", true);
            }
            if (HP == 3) {
                this.vie.anims.play("HP8", true);
            }
            if (HP == 2) {
                this.vie.anims.play("HP9", true);
            }
            if (HP == 1) {
                this.vie.anims.play("HP10", true);
            }
            if (HP == 0) {
                this.scene.stop()
            }
    }
    
    PerdHP() {
        if (invincible == false) {
            this.player.setTint("#FF0000 ")
            invincible = true
            HP -= 1
            setTimeout(() => {
                this.player.clearTint()
                invincible = false
            }, 1000);
        }
    }

    phase1(){
        this.scene.start("map_pt_1")
    }
    phase3(){
        this.scene.start("map_pt_3")
    }



} 


class map_pt_3 extends Phaser.Scene {
    constructor() {
        super('map_pt_3');

    }


    preload(){
        this.load.tilemapTiledJSON("mapPt3","map/map_pt_3.json");
        this.load.image("phaser_assets", "map/tuile.png");
        this.load.image("hitBox", "sprite/hitbox.png");
        this.load.spritesheet('perso','sprite/perso_pixel.png',
                { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('monster','sprite/enemie.png',
        { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('HP','sprite/barre_de_vie.png',
        { frameWidth:2560, frameHeight: 128});
    }

    create(){
        
        const carteDuNiveau = this.add.tilemap("mapPt3");        
        const tileset = carteDuNiveau.addTilesetImage("Tuile","phaser_assets");
        //const plateforme = carteDuNiveau.createLayer("map_base",tileset);
        const Sol = carteDuNiveau.createLayer('map_base',tileset);
        //const Sol2 = carteDuNiveau.createLayer('mur_inférieur',tileset);

        const murSolide = carteDuNiveau.createLayer('mur',tileset);
        const Sol2 = carteDuNiveau.createLayer('mur2',tileset);

        Sol.setCollisionByProperty({estSolide: true});
        Sol2.setCollisionByProperty({estSolide: true});
        murSolide.setCollisionByProperty({ estSolide: true }); 
        this.player = this.physics.add.sprite(42*32, 4*32, 'perso');
        this.physics.add.collider(this.player, murSolide);
        this.physics.add.collider(this.player, Sol);
        this.physics.add.collider(this.player, Sol2);

    
        //tp1.setCollisionByExclusion(-1, true);
        //tp2.setCollisionByExclusion(-1, true);
        this.cameras.main.setBounds(0, 0, 60*32, 50*32);
        this.cameras.main.zoom = 2;
        this.cameras.main.startFollow(this.player); 
        //this.physics.add.collider(this.player,tp1,this.phase3,null,this);
        //this.physics.add.collider(this.player,tp2,this.phase1,null,this);
        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,E,SPACE,SHIFT');

        this.vie=this.add.sprite(470,220,'HP').setScale(0.1).setScrollFactor(0);
        this.HB=this.physics.add.sprite(this.player.x+32,this.player.y,"hitBox");
        this.HB.disableBody()

        this.enemie = this.physics.add.group ()
            this.enemie.create(29*32, 13*32, 'monster');
            this.enemie.create(8*32, 15*32, 'monster');
            this.enemie.create(49*32, 24*32, 'monster');
            this.enemie.create(31*32, 37*32, 'monster');
            this.enemie.create(13*32, 43*32, 'monster');
            this.enemie.create(19*32, 35*32, 'monster');
            this.enemie.create(24*32, 40*32, 'monster');
            this.enemie.create(6*32, 9*32, 'monster'); 
            this.enemie.create(23*32, 23*32, 'monster');
            this.enemie.create(7*32, 22*32, 'monster');
            this.enemie.create(18*32, 14*32, 'monster');
            this.enemie.create(18*32, 25*32, 'monster');
            this.enemie.create(32*32, 22*32, 'monster');
            this.enemie.create(7*32, 33*32, 'monster');
            this.enemie.create(25*32, 31*32, 'monster');
            this.enemie.create(30*32, 35*32, 'monster');
            this.enemie.create(30*32, 16*32, 'monster');



        this.physics.add.collider(this.enemie.getChildren()[0], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[0], Sol);
        this.physics.add.collider(this.enemie.getChildren()[1], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[1], Sol);
        this.physics.add.collider(this.enemie.getChildren()[2], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[2], Sol);
        this.physics.add.collider(this.enemie.getChildren()[3], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[3], Sol);
        this.physics.add.collider(this.enemie.getChildren()[4], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[4], Sol);
        this.physics.add.collider(this.enemie.getChildren()[5], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[5], Sol);
        this.physics.add.collider(this.enemie.getChildren()[6], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[6], Sol);
        this.physics.add.collider(this.enemie.getChildren()[7], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[7], Sol);
        this.physics.add.collider(this.enemie.getChildren()[8], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[8], Sol);
        this.physics.add.collider(this.enemie.getChildren()[9], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[9], Sol);
        this.physics.add.collider(this.enemie.getChildren()[10], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[10], Sol);
        this.physics.add.collider(this.enemie.getChildren()[11], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[11], Sol);
        this.physics.add.collider(this.enemie.getChildren()[12], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[12], Sol);
        this.physics.add.collider(this.enemie.getChildren()[13], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[13], Sol);
        this.physics.add.collider(this.enemie.getChildren()[14], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[14], Sol);
        this.physics.add.collider(this.enemie.getChildren()[15], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[15], Sol);
        this.physics.add.collider(this.enemie.getChildren()[16], murSolide);
        this.physics.add.collider(this.enemie.getChildren()[16], Sol);


        this.physics.add.overlap(this.player, this.enemie.getChildren()[0], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[1], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[2], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[3], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[4], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[5], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[6], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[7], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[8], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[9], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[10], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[11], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[12], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[13], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[14], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[15], this.PerdHP, null, this);
        this.physics.add.overlap(this.player, this.enemie.getChildren()[16], this.PerdHP, null, this);


        this.physics.add.overlap(this.HB,this.enemie.getChildren()[0],function(){this.enemie.getChildren()[0].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[1],function(){this.enemie.getChildren()[1].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[2],function(){this.enemie.getChildren()[2].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[3],function(){this.enemie.getChildren()[3].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[4],function(){this.enemie.getChildren()[4].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[5],function(){this.enemie.getChildren()[5].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[6],function(){this.enemie.getChildren()[6].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[7],function(){this.enemie.getChildren()[7].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[8],function(){this.enemie.getChildren()[8].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[9],function(){this.enemie.getChildren()[9].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[10],function(){this.enemie.getChildren()[10].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[11],function(){this.enemie.getChildren()[11].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[12],function(){this.enemie.getChildren()[12].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[13],function(){this.enemie.getChildren()[13].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[14],function(){this.enemie.getChildren()[14].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[15],function(){this.enemie.getChildren()[15].disableBody(true,true)},null,this)
        this.physics.add.overlap(this.HB,this.enemie.getChildren()[16],function(){this.enemie.getChildren()[16].disableBody(true,true)},null,this)
    
    
        

    
    }











    update(){


        
        
        if(this.clavier.E.isDown){
            if(CD==true){
                CD=false
                this.HB.enableBody()
                setTimeout(() => {
                   CD=true
                   this.HB.disableBody() 
                }, 100);
            }
        }

        if (this.clavier.Z.isDown) {
            this.player.setVelocityY(-200);
            this.player.anims.play('up', true);
            this.HB.x=this.player.x;
            this.HB.y=this.player.y-32;
        }
        else if (this.clavier.S.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);
            this.HB.x=this.player.x;
            this.HB.y=this.player.y+32;
        }
        else if (this.clavier.Q.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
            this.HB.x=this.player.x-32;
            this.HB.y=this.player.y;
        }
        else if (this.clavier.D.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
            this.HB.x=this.player.x+32;
            this.HB.y=this.player.y;
        }
        else {
            this.player.setVelocityX(0)
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
             





        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[0].x, this.enemie.getChildren()[0].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[0].setVelocityX(this.player.x-this.enemie.getChildren()[0]            .x)
            this.enemie.getChildren()[0].setVelocityY(this.player.y-this.enemie.getChildren()[0]            .y)
        }
        else{this.enemie.getChildren()[0].setVelocity(0)}
        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[1].x, this.enemie.getChildren()[1].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[1].setVelocityX(this.player.x-this.enemie.getChildren()[1]            .x)
            this.enemie.getChildren()[1].setVelocityY(this.player.y-this.enemie.getChildren()[1]            .y)
        }
        else{this.enemie.getChildren()[1].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[2].x, this.enemie.getChildren()[2].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[2].setVelocityX(this.player.x-this.enemie.getChildren()[2]            .x)
            this.enemie.getChildren()[2].setVelocityY(this.player.y-this.enemie.getChildren()[2]            .y)
        }
        else{this.enemie.getChildren()[2].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[3].x, this.enemie.getChildren()[3].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[3].setVelocityX(this.player.x-this.enemie.getChildren()[3]            .x)
            this.enemie.getChildren()[3].setVelocityY(this.player.y-this.enemie.getChildren()[3]            .y)
        }
        else{this.enemie.getChildren()[3].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[4].x, this.enemie.getChildren()[4].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[4].setVelocityX(this.player.x-this.enemie.getChildren()[4]            .x)
            this.enemie.getChildren()[4].setVelocityY(this.player.y-this.enemie.getChildren()[4]            .y)
        }
        else{this.enemie.getChildren()[4].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[5].x, this.enemie.getChildren()[5].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[5].setVelocityX(this.player.x-this.enemie.getChildren()[5]            .x)
            this.enemie.getChildren()[5].setVelocityY(this.player.y-this.enemie.getChildren()[5]            .y)
        }
        else{this.enemie.getChildren()[5].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[6].x, this.enemie.getChildren()[6].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[6].setVelocityX(this.player.x-this.enemie.getChildren()[6]            .x)
            this.enemie.getChildren()[6].setVelocityY(this.player.y-this.enemie.getChildren()[6]            .y)
        }
        else{this.enemie.getChildren()[6].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[7].x, this.enemie.getChildren()[7].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[7].setVelocityX(this.player.x-this.enemie.getChildren()[7]            .x)
            this.enemie.getChildren()[7].setVelocityY(this.player.y-this.enemie.getChildren()[7]            .y)
        }
        else{this.enemie.getChildren()[7].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[8].x, this.enemie.getChildren()[8].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[8].setVelocityX(this.player.x-this.enemie.getChildren()[8]            .x)
            this.enemie.getChildren()[8].setVelocityY(this.player.y-this.enemie.getChildren()[8]            .y)
        }
        else{this.enemie.getChildren()[8].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[9].x, this.enemie.getChildren()[9].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[9].setVelocityX(this.player.x-this.enemie.getChildren()[9]            .x)
            this.enemie.getChildren()[9].setVelocityY(this.player.y-this.enemie.getChildren()[9]            .y)
        }
        else{this.enemie.getChildren()[9].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[10].x, this.enemie.getChildren()[10].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[10].setVelocityX(this.player.x-this.enemie.getChildren()[10]            .x)
            this.enemie.getChildren()[10].setVelocityY(this.player.y-this.enemie.getChildren()[10]            .y)
        }
        else{this.enemie.getChildren()[10].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[11].x, this.enemie.getChildren()[11].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[11].setVelocityX(this.player.x-this.enemie.getChildren()[11]            .x)
            this.enemie.getChildren()[11].setVelocityY(this.player.y-this.enemie.getChildren()[11]            .y)
        }
        else{this.enemie.getChildren()[11].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[12].x, this.enemie.getChildren()[12].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[12].setVelocityX(this.player.x-this.enemie.getChildren()[12]            .x)
            this.enemie.getChildren()[12].setVelocityY(this.player.y-this.enemie.getChildren()[12]            .y)
        }
        else{this.enemie.getChildren()[12].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[13].x, this.enemie.getChildren()[13].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[13].setVelocityX(this.player.x-this.enemie.getChildren()[13]            .x)
            this.enemie.getChildren()[13].setVelocityY(this.player.y-this.enemie.getChildren()[13]            .y)
        }
        else{this.enemie.getChildren()[13].setVelocity(0)}

        
        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[14].x, this.enemie.getChildren()[14].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[14].setVelocityX(this.player.x-this.enemie.getChildren()[14]            .x)
            this.enemie.getChildren()[14].setVelocityY(this.player.y-this.enemie.getChildren()[14]            .y)
        }
        else{this.enemie.getChildren()[14].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[15].x, this.enemie.getChildren()[15].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[15].setVelocityX(this.player.x-this.enemie.getChildren()[15]            .x)
            this.enemie.getChildren()[15].setVelocityY(this.player.y-this.enemie.getChildren()[15]            .y)
        }
        else{this.enemie.getChildren()[15].setVelocity(0)}


        var distance = Phaser.Math.Distance.Between(this.enemie.getChildren()[16].x, this.enemie.getChildren()[16].y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.getChildren()[16].setVelocityX(this.player.x-this.enemie.getChildren()[16]            .x)
            this.enemie.getChildren()[16].setVelocityY(this.player.y-this.enemie.getChildren()[16]            .y)
        }
        else{this.enemie.getChildren()[16].setVelocity(0)}




        if (HP == 10) {
            this.vie.anims.play("HP1", true);
        }
        if (HP == 9) {
            this.vie.anims.play("HP2", true);
        }
        if (HP == 8) {
            this.vie.anims.play("HP3", true);
        }
        if (HP == 7) {
            this.vie.anims.play("HP4", true);
        }
        if (HP == 6) {
            this.vie.anims.play("HP5", true);
        }
        if (HP == 5) {
            this.vie.anims.play("HP6", true);
        }
        if (HP == 4) {
            this.vie.anims.play("HP7", true);
        }
        if (HP == 3) {
            this.vie.anims.play("HP8", true);
        }
        if (HP == 2) {
            this.vie.anims.play("HP9", true);
        }
        if (HP == 1) {
            this.vie.anims.play("HP10", true);
        }
        if (HP == 0) {
            this.scene.stop()
        }
    }

    PerdHP() {
    if (invincible == false) {
        this.player.setTint("#FF0000 ")
        invincible = true
        HP -= 1
        setTimeout(() => {
            this.player.clearTint()
            invincible = false
        }, 1000);
    }

    }
}
