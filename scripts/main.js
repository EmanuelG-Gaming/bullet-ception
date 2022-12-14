let bullets = new Seq();

Events.on(ClientLoadEvent, () => {
   Vars.ui.settings.addCategory("Bulletception", new TextureRegionDrawable(UnitTypes.merui.fullIcon), t => {
   
      t.sliderPref("divisions", 25, 0, 25, 1, i => i + "");
      t.sliderPref("initialFrag", 10, 0, 10, 1, i => i + "");
   });
 
   Vars.content.units().each(unit => {
      unit.weapons.each(w => {
         bullets.clear();
         
         w.bullet.despawnHit = true;
         
         let bul = w.bullet.copy();
         bul.fragBullets = 0; //prevent recursion crash
         w.bullet.fragBullets = Core.settings.getInt("bullet-ception-initialFrag"); //initial bullets
         for (let i = 0; i < Core.settings.getInt("bullet-ception-divisions"); i++) {
            bullets.add(w.bullet);
         }
         bullets.add(bul);
         
         w.bullet.fragBullet = bullets.first();
         for (let j = 1; j < bullets.size; j++) {
            let current = bullets.get(j), next = bullets.get(j + 1);
            current.fragBullet = next;
         }
      });
   });
});