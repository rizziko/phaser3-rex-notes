## Introduction

Display text page by page on [text object](text.md), [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md).

- Author: Rex
- Behavior of text object

## Live demos

- [BBCode text + page + typing](https://codepen.io/rexrainbow/pen/yjZveb)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/textpage)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextextpageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextpageplugin.min.js', true);
    ```
- Add page behavior
    ```javascript
    var page = scene.plugins.get('rextextpageplugin').add(textGameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TextPagePlugin from 'phaser3-rex-plugins/plugins/textpage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTextPage',
                plugin: TextPagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add page behavior
    ```javascript
    var page = scene.plugins.get('rexTextPage').add(textGameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TextPage from 'phaser3-rex-plugins/plugins/textpage.js';
    ```
- Add page behavior
    ```javascript
    var page = new TextPage(textGameObject, config);
    ```

### Create instance

```javascript
var page = scene.plugins.get('rexTextPage').add(textGameObject, {
    // text: '',              // content in string or array
    // maxLines: undefined
});
```

- `textObject` : [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text boject](tagtext.md), or [bitmap text object](bitmaptext.md)
- `text` : content in string or array, optional
- `maxLines` : Max lines of a page.
    - `undefined` : Use style property `maxLines`, for [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text boject](tagtext.md). Default value.
    - A number : Max lines of a page, for [bitmap text object](bitmaptext.md)

### Set content

- Set text
    ```javascript
    page.setText(text);   // content in string or array
    ```
- Append text
    ```javascript
    page.appendText(text); // content in string or array
    ```

### Show page

- Display current page
    ```javascript
    page.showPage();
    ```
- Display next page
    ```javascript
    page.showNextPage();
    ```
- Display previous page
    ```javascript
    page.showPreviousPage();
    ```

!!! note
    Initial page index is `-1`, so user could call `page.showNextPage()` to display first page.

### Get lines of page

- Get lines of current page
    ```javascript
    var lines = page.getPage();
    ```
- Get lines of next page
    ```javascript
    var lines = page.getNextPage();
    ```
- Get lines of previous page
    ```javascript
    var lines = page.getPreviousPage();
    ```

### Other properties

- Is last page
    ```javascript
    var isLastPage = page.isLastPage;
    ```
- Is first page
    ```javascript
    var isLastPage = page.isFirstPage;
    ```
- Current page index
    ```javascript
    var pageIndex = page.pageIndex;
    ```
- Number of pages
    ```javascript
    var pageIndex = page.pageCount;
    ```