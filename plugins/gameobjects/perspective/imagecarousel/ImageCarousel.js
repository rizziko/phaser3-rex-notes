import Carousel from '../carousel/Carousel.js';
import RenderTexture from '../rendertexture/Base.js';
import GetFaceSize from './GetFaceSize.js';
import GetIndexOffsetMap from './GetIndexOffsetMap.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Wrap = Phaser.Math.Wrap;

class ImageCarousel extends Carousel {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        if (config === undefined) {
            config = {};
        }

        var faceWidth, faceHeight;
        var images = GetValue(config, 'images');
        var faceSize = GetFaceSize(scene, images);
        if (faceSize) {
            faceWidth = faceSize.width;
            faceHeight = faceSize.height;
        } else {
            faceWidth = GetValue(config, 'width');
            faceHeight = GetValue(config, 'height');
        }

        // Create 4 render-texture faces
        var faceCount = GetValue(config, 'faceCount', 4);
        var face, faces = [];
        for (var i = 0; i < faceCount; i++) {
            face = new RenderTexture(scene, 0, 0, faceWidth, faceHeight, config);
            scene.add.existing(face);
            faces.push(face);
        }

        config.faces = faces;
        super(scene, x, y, config);
        this.type = 'rexPerspectiveImageCarousel';

        this.images = images;
        this.indexOffsetMap = GetIndexOffsetMap(faceCount);
        this.repeat = GetValue(config, 'repeat', true);
        this
            .setImageIndex(GetValue(config, 'index', 0))
            .updateTexture();
    }

    setImageIndex(index) {
        this.currentImageIndex = Wrap(index, 0, this.images.length);
        return this;
    }

    get isFirstImage() {
        return (this.images.length === 0) || (this.currentImageIndex === 0);
    }

    get isLastImage() {
        return (this.images.length === 0) || (this.currentImageIndex === (this.images.length - 1));
    }

    updateTexture() {
        var totalKeys = this.images.length;
        var totalFaces = this.faces.length;

        this.indexOffsetMap.forEach(function (indexOffset) {
            var textureIndex = Wrap(this.currentImageIndex + indexOffset, 0, totalKeys);
            var faceIndex = Wrap(this.currentFaceIndex + indexOffset, 0, totalFaces);

            var textureKey = this.images[textureIndex];
            this.faces[faceIndex].rt.drawFrame(textureKey.key, textureKey.frame);
        }, this)

        return this;
    }

    toNext(duration) {
        if (!this.repeat && this.isLastImage) {
            return this;
        }

        if (this.roll.isRunning) {
            return this;
        }

        this.setImageIndex(this.currentImageIndex + 1);
        this.roll
            .toNext(duration)
            .once('complete', this.updateTexture, this)

        return this;
    }

    toPrevious(duration) {
        if (!this.repeat && this.isFirstImage) {
            return this;
        }

        if (this.roll.isRunning) {
            return this;
        }

        this.setImageIndex(this.currentImageIndex - 1);
        this.roll
            .toPrevious(duration)
            .once('complete', this.updateTexture, this)

        return this;
    }

    toRight(duration) {
        if (!this.rtl) {
            this.toNext(duration);
        } else {
            this.toPrevious(duration);
        }
        return this;
    }

    toLeft(duration) {
        if (!this.rtl) {
            this.toPrevious(duration);
        } else {
            this.toNext(duration);
        }
        return this;
    }
}

export default ImageCarousel;