/**
 * Created by serhii.kocherev on 4/7/16.
 */
export class ImageEditor {
    constructor (selector: string) {
        console.log('Init');
        var stage = new createjs.Stage(selector);

        var circle = new createjs.Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.x = 100;
        circle.y = 100;
        stage.addChild(circle);

        stage.update();
    }
}