import UIPlugin from '../../templates/ui/ui-plugin.js';
import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var sizer = this.rexUI.add.sizer({
            x: 400,
            y: 300,
            width: 750,
            orientation: 'x'
        })
        for (var i = 0; i < 3; i++) {
            sizer.add(
                createItems(this), // child
                1, // proportion
                'center', // align
                0, // paddingConfig
                true // expand
            )
        }
        sizer
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

var createItems = function (scene) {
    var sizer = scene.rexUI.add.fixWidthSizer({
        space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            item: 8,
            line: 8,
        }
    });
    for (var i = 0; i < 20; i++) {
        sizer.add(createItem(scene));
    }
    return sizer;
}

var createItem = function (scene) {
    var word = GetRandomWord(3, 6);
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_PRIMARY),
        text: scene.add.text(0, 0, word, {
            fontSize: 18
        }),
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        }
    });
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);