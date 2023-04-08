var vie = 5;




class map_pt_1 extends Phaser.Scene {
    constructor() {
        super('map_pt_1');

    }

    preload(){
        this.load.tilemapTiledJSON("mapPt1","map/map_pt_1.json");
        this.load.image("phaser_assets", "map/tuile.png");
        this.load.spritesheet('perso','sprite/perso_pixel.png',
                { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('monster','sprite/enemie.png',
                { frameWidth: 32, frameHeight: 32 });
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
        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,SPACE,SHIFT');
        this.physics.add.overlap(this.player, this.enemygrp, this.damage, null, this);




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

        


        

        var distance = Phaser.Math.Distance.Between(this.enemie.x, this.enemie.y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemie.setVelocityX(this.player.x-this.enemie.x)
            this.enemie.setVelocityY(this.player.y-this.enemie.y)
        }
        else{this.enemie.setVelocity(0)}


        
        
        if (vie == 5) {
                vie.anims.play("5", true);
            }
            if (vie == 4) {
                vie.anims.play("4", true);
            }
            if (vie == 3) {
                vie.anims.play("3", true);
            }
            if (vie == 2) {
                vie.anims.play("2", true);
            }
            if (vie == 1) {
                vie.anims.play("1", true);
            }
            if (vie == 0) {
                scene.stop()
            }
    }

    Perdvie() {
        vie -= 1
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