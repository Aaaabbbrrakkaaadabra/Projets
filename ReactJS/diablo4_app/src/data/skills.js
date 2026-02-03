const skills = {
    barbarian: [
      { id: "bash", name: "Bash", type: "Basic", description: "Attaque de mêlée générant de la Fureur." },
      { id: "lunging_strike", name: "Lunging Strike", type: "Basic", description: "Frappe en avançant vers l’ennemi." },
      { id: "whirlwind", name: "Whirlwind", type: "Core", description: "Tourbillonne en infligeant des dégâts continus." },
      { id: "hammer_of_the_ancients", name: "Hammer of the Ancients", type: "Core", description: "Frappe le sol avec une puissance ancestrale." },
      { id: "leap", name: "Leap", type: "Mobility", description: "Bond vers une zone et inflige des dégâts." },
      { id: "challenging_shout", name: "Challenging Shout", type: "Defensive", description: "Provoque les ennemis et réduit les dégâts subis." }
    ],
  
    sorcerer: [
      { id: "fire_bolt", name: "Fire Bolt", type: "Basic", description: "Projette une boule de feu." },
      { id: "frost_bolt", name: "Frost Bolt", type: "Basic", description: "Inflige des dégâts de glace et ralentit." },
      { id: "fireball", name: "Fireball", type: "Core", description: "Explosion de feu à l’impact." },
      { id: "chain_lightning", name: "Chain Lightning", type: "Core", description: "Éclairs rebondissant entre ennemis." },
      { id: "teleport", name: "Teleport", type: "Mobility", description: "Téléportation instantanée." },
      { id: "ice_armor", name: "Ice Armor", type: "Defensive", description: "Barrière protectrice de glace." }
    ],
  
    druid: [
      { id: "storm_strike", name: "Storm Strike", type: "Basic", description: "Attaque électrique qui affaiblit l’ennemi." },
      { id: "earth_spike", name: "Earth Spike", type: "Basic", description: "Pic de terre surgissant du sol." },
      { id: "pulverize", name: "Pulverize", type: "Core", description: "Attaque écrasante en forme d’ours." },
      { id: "tornado", name: "Tornado", type: "Core", description: "Invoque des tornades errantes." },
      { id: "trample", name: "Trample", type: "Mobility", description: "Charge en forme d’ours." },
      { id: "earthen_bulwark", name: "Earthen Bulwark", type: "Defensive", description: "Bouclier de pierre protecteur." }
    ],
  
    rogue: [
      { id: "puncture", name: "Puncture", type: "Basic", description: "Lance des lames infligeant Vulnérable." },
      { id: "invigorating_strike", name: "Invigorating Strike", type: "Basic", description: "Frappe rapide générant de l’énergie." },
      { id: "twisting_blades", name: "Twisting Blades", type: "Core", description: "Lames tournoyantes revenant vers le joueur." },
      { id: "rapid_fire", name: "Rapid Fire", type: "Core", description: "Tirs rapides concentrés." },
      { id: "dash", name: "Dash", type: "Mobility", description: "Dash rapide infligeant des dégâts." },
      { id: "dark_shroud", name: "Dark Shroud", type: "Defensive", description: "Ombres réduisant les dégâts subis." }
    ],
  
    necromancer: [
      { id: "bone_splinters", name: "Bone Splinters", type: "Basic", description: "Projectiles d’os perforants." },
      { id: "decompose", name: "Decompose", type: "Basic", description: "Canalise des dégâts d’ombre." },
      { id: "bone_spear", name: "Bone Spear", type: "Core", description: "Lance une lance d’os perforante." },
      { id: "blight", name: "Blight", type: "Core", description: "Zone de corruption infligeant des dégâts d’ombre." },
      { id: "corpse_explosion", name: "Corpse Explosion", type: "Utility", description: "Explose un cadavre." },
      { id: "blood_mist", name: "Blood Mist", type: "Defensive", description: "Transformation temporaire en brume." }
    ],
  
    spiritborn: [
      { id: "jaguar_strike", name: "Jaguar Strike", type: "Basic", description: "Attaque rapide imprégnée d’énergie spirituelle." },
      { id: "eagle_claw", name: "Eagle Claw", type: "Basic", description: "Frappe précise inspirée de l’aigle." },
      { id: "spirit_flurry", name: "Spirit Flurry", type: "Core", description: "Enchaînement rapide d’attaques spirituelles." },
      { id: "serpent_fury", name: "Serpent Fury", type: "Core", description: "Dégâts progressifs liés aux esprits." },
      { id: "eagle_dash", name: "Eagle Dash", type: "Mobility", description: "Dash rapide vers l’avant." },
      { id: "spirit_guard", name: "Spirit Guard", type: "Defensive", description: "Protection spirituelle temporaire." }
    ],
  
    paladin: [
      { id: "smite", name: "Smite", type: "Basic", description: "Frappe sacrée infligeant des dégâts lumineux." },
      { id: "holy_bolt", name: "Holy Bolt", type: "Basic", description: "Projectile sacré perforant." },
      { id: "blessed_hammer", name: "Blessed Hammer", type: "Core", description: "Marteaux sacrés tournoyants." },
      { id: "zeal", name: "Zeal", type: "Core", description: "Enchaînement rapide d’attaques." },
      { id: "charge", name: "Charge", type: "Mobility", description: "Charge vers l’ennemi." },
      { id: "holy_shield", name: "Holy Shield", type: "Defensive", description: "Bouclier sacré protecteur." }
    ]
  };
  
  export default skills;
  