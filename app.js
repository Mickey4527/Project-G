//สร้างตัวแปร app และกำหนดค่าให้กับตัวแปร app ด้วยค่าที่สร้างขึ้นมาจาก PIXI.Application
const app = new PIXI.Application({ 
    background: '#1099bb' ,
    width: 1792,
    height: 768
}); 
document.body.appendChild(app.view); //เพิ่ม app.view ลงใน body

//สร้างตัวแปร texture และกำหนดค่าให้กับตัวแปร texture ด้วยค่าที่สร้างขึ้นมาจาก PIXI.Texture.from
const texture = PIXI.Texture.from('1.png'); 

//
const Background = PIXI.Sprite.from('xp.jpg');
Background.width = app.screen.width;
Background.height = app.screen.height;
app.stage.addChild(Background);


// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;


for (let i = 0; i < 10; i++) {
    createBunny(
        Math.floor(Math.random() * app.screen.width),
        Math.floor(Math.random() * app.screen.height),
    );
}

function createBunny(x, y) {
    //สร้างตัวแปร bunny และกำหนดค่าให้กับตัวแปร bunny ด้วยค่าที่สร้างขึ้นมาจาก PIXI.Sprite
    const bunny = new PIXI.Sprite(texture);

    //เปิดใช้งานให้ตัวแปร bunny สามารถตอบสนองกับเหตุการณ์ของเมาส์และแท็บเท็คได้
    bunny.interactive = true;

    //เปลี่ยนเป็นเหมือนเมาส์
    bunny.cursor = 'pointer';

    //กำหนดจุดศูนย์กลางของตัวแปร bunny
    bunny.anchor.set(0.5);

    // make it a bit bigger, so it's easier to grab
    bunny.scale.set(3);

    // setup events for mouse + touch using
    // the pointer events
    bunny.on('pointerdown', onDragStart, bunny);//เมื่อมีการกดเมาส์บนตัวแปร bunny ให้เรียกใช้ฟังก์ชัน onDragStart

    // move the sprite to its designated position
    bunny.x = x;
    bunny.y = y;

    // add it to the stage
    app.stage.addChild(bunny);//เพิ่มตัวแปร bunny ลงใน app.stage
}

let dragTarget = null;

app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

function onDragMove(event) {
    if (dragTarget) {
        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
}

function onDragStart() { 
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    // this.data = event.data;
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
}

function onDragEnd() {
    if (dragTarget) {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}