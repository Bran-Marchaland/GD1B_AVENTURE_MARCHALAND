var HP = 10;
var invincible = false;
var CD = true;


class map_pt_1 extends Phaser.Scene {
    constructor() {
        super('map_pt_1');

    }

    preload(){
        this.load.tilemapTiledJSON("mapPt1","map/map_pt_1.json");
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
        this.enemie = this.physics.add.sprite(19*32, 130*32, 'monster');
        this.physics.add.collider(this.enemie, murSolide);

        murSolide.setCollisionByProperty({ estSolide: true }); 
        this.player = this.physics.add.sprite(18*32, 129*32, 'perso');
        this.physics.add.collider(this.player, murSolide);

        tp.setCollisionByExclusion(-1, true);
        this.cameras.main.setBounds(192, 32, 7968, 4768);
        this.cameras.main.zoom = 2;
        this.cameras.main.startFollow(this.player); 
        this.physics.add.collider(this.player,tp,this.phase2,null,this);
        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,E,SPACE,SHIFT');
        this.physics.add.overlap(this.player, this.enemie, this.PerdHP, null, this);
        this.vie=this.add.sprite(470,220,'HP').setScale(0.1).setScrollFactor(0);
        this.HB=this.physics.add.sprite(this.player.x+32,this.player.y,"hitBox");
        this.HB.disableBody()
        this.physics.add.overlap(this.HB,this.enemie,function(){this.enemie.disableBody(true,true)},null,this)



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
                }, 1000);
            }
        }

        if (this.clavier.Z.isDown) {
            this.player.setVelocityY(-260);
            this.player.anims.play('up', true);
            this.HB.x=this.player.x;
            this.HB.y=this.player.y-32;
        }
        else if (this.clavier.S.isDown) {
            this.player.setVelocityY(260);
            this.player.anims.play('down', true);
            this.HB.x=this.player.x;
            this.HB.y=this.player.y+32;
        }
        else if (this.clavier.Q.isDown) {
            this.player.setVelocityX(-260);
            this.player.anims.play('left', true);
            this.HB.x=this.player.x-32;
            this.HB.y=this.player.y;
        }
        else if (this.clavier.D.isDown) {
            this.player.setVelocityX(260);
            this.player.anims.play('right', true);
            this.HB.x=this.player.x+32;
            this.HB.y=this.player.y;
        }
        else {
            this.player.setVelocityX(0)
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
             

     
        

        var distance = Phaser.Math.Distance.Between(this.enemie.x, this.enemie.y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.setVelocityX(this.player.x-this.enemie.x)
            this.enemie.setVelocityY(this.player.y-this.enemie.y)
        }
        else{this.enemie.setVelocity(0)}


        
        
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
        this.load.spritesheet('perso','sprite/perso_pixel.png',
                { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('monster','sprite/enemie.png',
        { frameWidth: 32, frameHeight: 32 });
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


        murSolide.setCollisionByProperty({ estSolide: true });
        this.player = this.physics.add.sprite(129*32, 186*32, 'perso');
        this.physics.add.collider(this.player, murSolide);
        

        //tp.setCollisionByExclusion(-1, true);
        this.cameras.main.zoom = 2;
        this.cameras.main.startFollow(this.player); 
        //this.physics.add.collider(this.player,tp,phase2,null,this);
        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,SPACE,SHIFT');
        this.enemie = this.physics.add.sprite(130*32, 186*32, 'monster');
        this.physics.add.collider(this.enemie, murSolide);




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


    }




    update(){

        if (this.clavier.Z.isDown) {
            this.player.setVelocityY(-260);
            this.player.anims.play('up', true);
        }
        else if (this.clavier.S.isDown) {
            this.player.setVelocityY(260);
            this.player.anims.play('down', true);
        }
        else if (this.clavier.Q.isDown) {
            this.player.setVelocityX(-260);
            this.player.anims.play('left', true);
        }
        else if (this.clavier.D.isDown) {
            this.player.setVelocityX(260);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0)
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
        }

    }


    phase1(){
        this.Scene.start("map_pt_1")
    }
    //phase3(){
    //    this.Scene.start("map_pt_3")
    //}



} 