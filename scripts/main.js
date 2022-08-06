Events.on(ClientLoadEvent, () => {
   Vars.ui.settings.addCategory("Bulletception", new TextureRegionDrawable(UnitTypes.merui.fullIcon), t => {
   
      t.sliderPref("divisions", 25, 0, 25, 1, i => i + "");
   });
 
   Vars.content.units().each(unit => {
      unit.weapons.each(w => {
         let bullets = new Seq();
         
         w.bullet.despawnHit = true;
         
         let bul = w.bullet.copy();
         bul.fragBullets = 0; //prevent recursion crash
         w.bullet.fragBullets = 1; //initial bullets
         for (let i = 0; i < Core.settings.getInt("bullet-ception-divisions"); i++) {
            bullets.add(w.bullet);
         }
         bullets.add(bul);
         
         w.bullet.fragBullet = bullets.first();
         for (let j = 0; j < bullets.size - 1; j++) {
            let current = bullets.get(j);
            let next = bullets.get(j + 1);
            current.fragBullet = next;
         }
      });
   });
});