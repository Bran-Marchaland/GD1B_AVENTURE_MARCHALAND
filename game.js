class map_pt_1 extends Phaser.Scene {
    constructor() {
        super('map_pt_1');

    }

    preload(){
        this.load.tilemapTiledJSON("mapPt1","map/map_pt_1.json");
        this.load.image("phaser_assets", "map/tuile.png");
        this.load.spritesheet('perso','sprite/perso_pixel.png',
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


        murSolide.setCollisionByProperty({ estSolide: true }); 
        this.player = this.physics.add.sprite(18*32, 129*32, 'perso');
        this.physics.add.collider(this.player, murSolide);

        tp.setCollisionByExclusion(-1, true);
        this.cameras.main.setBounds(192, 32, 7968, 4768);
        this.cameras.main.zoom = 2;
        this.cameras.main.startFollow(this.player); 
        this.physics.add.collider(this.player,tp,this.phase2,null,this);
        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,SPACE,SHIFT');




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