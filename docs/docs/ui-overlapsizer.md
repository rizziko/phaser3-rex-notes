## Introduction

Layout children game objects overlapped.

- Author: Rex
- Game object

## Live demos

- [Overlap](https://codepen.io/rexrainbow/pen/MWKWpyX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-overlapsizer)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add sizer object
    ```javascript
    var sizer = scene.rexUI.add.overlapSizer(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add sizer object
    ```javascript
    var sizer = scene.rexUI.add.overlapSizer(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { OverlapSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add sizer object
    ```javascript
    var sizer = new OverlapSizer(scene, config);
    sscene.add.existing(sizer);
    ```

### Add sizer object

```javascript
var sizer = scene.rexUI.add.overlapSizer({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // space: { left: 0, right:0, top:0, bottom:0 }
});
```

or

```javascript
var sizer = scene.rexUI.add.sizer(x, y, {
    // width: undefined,
    // height: undefined,
    // anchor: undefined,
    // space: { left: 0, right:0, top:0, bottom:0 }
});
```

or

```javascript
var sizer = scene.rexUI.add.sizer(x, y, width, height, {
    // anchor: undefined,
    // space: { left: 0, right:0, top:0, bottom:0 }
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
- `width`, `height` : Minimum width, minimum height.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.

### Custom class

- Define class
    ```javascript
    class MySizer extends RexPlugins.UI.OverlapSizer {
        constructor(scene, x, y, minWidth, minHeight, config) {
            super(scene, x, y, minWidth, minHeight, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var sizer = new MySizer(scene, x, y, minWidth, minHeight, config);
    ```

### Add background

```javascript
sizer.addBackground(child);
```

or

```javascript
sizer.addBackground(child, {left: 0, right: 0, top: 0, bottom: 0}, key);
```

- `left`, `right`, `top`, `bottom` : Extra padded space. Default is 0.
- `key` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
    - `undefined` : Don't add this child. Default value.

### Add child

Add a game obejct to sizer

```javascript
sizer.add(child);
```

or

```javascript
sizer.add(child, key, align, padding, expand);
```

or

```javascript
sizer.add(child,
    {
        key: undefined,
        align: 'center',
        padding: {left: 0, right: 0, top: 0, bottom: 0},
        expand: true
    }
);
```

- `child` : A game object.
- `key` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
    - `undefined` : Use current timestamp as key.
- `align` :
    - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
    - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
    - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `'top'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at top-center.
    - `'bottom'`, or `Phaser.Display.Align.BOTTOM_CENTER` : Align game object at bottom-center.
    - `'left-top'` , or `Phaser.Display.Align.TOP_LEFT` : Align game object at left-top.
    - `'left-center'` , or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
    - `'left-bottom'` , or `Phaser.Display.Align.BOTTOM_LEFT` : Align game object at left-bottom.
    - `'center-top'` , or `Phaser.Display.Align.TOP_CENTER` : Align game object at center-top.
    - `'center-center'` , or `Phaser.Display.Align.CENTER` : Align game object at center-center.
    - `'center-bottom'` , or `Phaser.Display.Align.BOTTOM_CENTER` : Align game object at center-bottom.
    - `'right-top'` , or `Phaser.Display.Align.TOP_RIGHT` : Align game object at right-top.
    - `'right-center'` , or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `'right-bottom'` , or `Phaser.Display.Align.BOTTOM_RIGHT` : Align game object at right-bottom.
- `padding` : Extra padded space. Default is 0.
    - A number for left/right/top/bottom bounds,
    - Or a plain object.
        ```javascript
        {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        ```
- `expand` :
    - Boolean value
        - `true` : Expand width and height of child. Default value.
        - `false` : Don't expand width or height of child.
    - A plain object
        - `{width: true}` : Only expand width of child.
        - `{height: true}` : only expand height of child.
        - `{width: true, height: true}` : Expand width and height of child.

### Layout children

Arrange position of all children.

```javascript
sizer.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Remove child

- Remove a child
    ```javascript
    sizer.remove(child);
    ```
    or
    ```javascript
    sizer.remove(key);
    ```
- Remove and destroy a child
    ```javascript
    sizer.remove(child, true);
    ```
    or
    ```javascript
    sizer.remove(key, true);
    ```
- Remove all children
    ```javascript
    sizer.removeAll();
    ```
- Remove and destroy all children
    ```javascript
    sizer.removeAll(true);
    ```   
- Remove all children and backgrounds
    ```javascript
    sizer.clear();
    ```
- Remove and destroy all children and backgrounds
    ```javascript
    sizer.clear(true);
    ```

### Get element

- Get element
    - All children items
        ```javascript
        var items = sizer.getElement('items');
        ```
    - A child
        ```javascript
        var item = sizer.getElement('items[' + key + ']');
        ```
- Get by name
    ```javascript
    var gameObject = sizer.getElement('#' + name);
    // var gameObject = sizer.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = sizer.getByName('#' + name);
    // var gameObject = sizer.getByName('#' + name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Other properties

See [base sizer object](ui-basesizer.md).