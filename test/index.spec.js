import fs from 'fs';
import {PIXI} from '../src/index';

describe ('index', function () {
    this.timeout(5000);

    it ('should test PIXI', (cb) => {

        const app = new PIXI.Application({backgroundColor: 0xff0000});

        PIXI.loader.add('che', 'https://www.famousbirthdays.com/headshots/che-guevara-1.jpg');

        let has_error = false;
        PIXI.loader.onComplete.add(() => {

            const che = new PIXI.Sprite(PIXI.loader.resources.che.texture);

            // Setup the position of che
            che.x = app.renderer.width / 2;
            che.y = app.renderer.height / 2;

            // Rotate around the center
            che.anchor.x = 0.5;
            che.anchor.y = 0.5;

            // Add che to the scene we are building
            app.stage.addChild(che);

            app.render();

            fs.writeFileSync('che.jpg', app.view.toBuffer());

            if (!has_error) cb();
        });

        PIXI.loader.onError.add((err) => {
            has_error = true;
            cb(err);
        });

        PIXI.loader.load();
    });
});
