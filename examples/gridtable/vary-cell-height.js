import GridTablePlugin from '../../plugins/gridtable-plugin.js';

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
        var onCellVisible = function (cell) {
            var scene = cell.scene;
            var cellIdx = cell.index;
            cell.height = (cellIdx % 2) ? 40 : 80;  // Set height of visible cell

            var color = (cellIdx % 2) ? COLOR_PRIMARY : COLOR_DARK;
            var bg = scene.add.rectangle(0, 0, cell.width, cell.height, color)
                .setStrokeStyle(2, COLOR_LIGHT)
                .setOrigin(0);
            var txt = scene.add.text(5, 5, cellIdx);
            var container = scene.add.container(0, 0, [bg, txt]);

            cell.setContainer(container);
            //console.log('Cell ' + cell.index + ' visible');
        };
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellWidth: 240,
            cellHeight: 1,
            cellsCount: 20,
            columns: 1,
            cellVisibleCallback: onCellVisible.bind(this),
            mask: {
                padding: 2,
            }
        });

        // Draw bound
        this.add.graphics()
            .lineStyle(2, 0xff0000)
            .strokeRectShape(table.getBounds())
            .setDepth(1);

        // Drag table content
        table.setInteractive();
        table.on('pointermove', function (pointer) {
            if (!pointer.isDown) {
                return;
            }
            var dx = pointer.x - pointer.prevPosition.x;
            var dy = pointer.y - pointer.prevPosition.y;
            table.addTableOXY(dx, dy).updateTable();
        });

        var print = this.add.text(0, 0, '');
        table.on('cellheightchange', function () {
            print.text = table.tableHeight;
        })
        table.emit('cellheightchange');
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
            key: 'rexGridTable',
            plugin: GridTablePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);