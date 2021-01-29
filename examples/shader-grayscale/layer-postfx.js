import GrayScalePipelinePlugin from '../../plugins/grayscalepipeline-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var layer = this.add.layer();
        this.plugins.get('rexGrayScalePipeline').add(layer);

        const Between = Phaser.Math.Between;
        
        for (var i = 0; i < 20; i++) {
            let gameObject = this.add.circle(0, 0, 30, Between(0, 0x1000000))
                .setRandomPosition(100, 100, 600, 400)

            layer.add(gameObject);

            gameObject
                .setInteractive()
                .on('pointerover', function () {
                    layer.remove(gameObject)
                    gameObject.scene.add.existing(gameObject)
                })
                .on('pointerout', function () {
                    layer.add(gameObject);
                })
        }
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexGrayScalePipeline',
            plugin: GrayScalePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);