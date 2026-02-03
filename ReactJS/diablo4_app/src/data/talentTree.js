const talentTree = {
    barbarian: [
      { id: "bash", name: "Bash", tier: 1 },
      { id: "lunging_strike", name: "Lunging Strike", tier: 1 },
      { id: "war_cry", name: "War Cry", tier: 1 },
      { id: "whirlwind", name: "Whirlwind", tier: 2, requires: ["bash"] },
      { id: "hammer", name: "Hammer of the Ancients", tier: 2, requires: ["lunging_strike"] },
      { id: "ground_slam", name: "Ground Slam", tier: 2, requires: ["war_cry"] },
      { id: "call_of_the_ancients", name: "Call of the Ancients", tier: 3, requires: ["whirlwind", "hammer"] },
      { id: "reckless_swing", name: "Reckless Swing", tier: 3, requires: ["ground_slam"] },
      { id: "avalanche", name: "Avalanche", tier: 4, requires: ["call_of_the_ancients", "reckless_swing"] }
    ],
  
    sorcerer: [
      { id: "fire_bolt", name: "Fire Bolt", tier: 1 },
      { id: "frost_bolt", name: "Frost Bolt", tier: 1 },
      { id: "arcane_missile", name: "Arcane Missile", tier: 1 },
      { id: "fireball", name: "Fireball", tier: 2, requires: ["fire_bolt"] },
      { id: "chain_lightning", name: "Chain Lightning", tier: 2, requires: ["frost_bolt"] },
      { id: "ice_shard", name: "Ice Shard", tier: 2, requires: ["arcane_missile"] },
      { id: "meteor", name: "Meteor", tier: 3, requires: ["fireball", "chain_lightning"] },
      { id: "blizzard", name: "Blizzard", tier: 3, requires: ["ice_shard"] },
      { id: "elemental_mastery", name: "Elemental Mastery", tier: 4, requires: ["meteor", "blizzard"] }
    ],
  
    druid: [
      { id: "storm_strike", name: "Storm Strike", tier: 1 },
      { id: "earth_spike", name: "Earth Spike", tier: 1 },
      { id: "vine_grasp", name: "Vine Grasp", tier: 1 },
      { id: "pulverize", name: "Pulverize", tier: 2, requires: ["storm_strike"] },
      { id: "tornado", name: "Tornado", tier: 2, requires: ["earth_spike"] },
      { id: "thorn_barrage", name: "Thorn Barrage", tier: 2, requires: ["vine_grasp"] },
      { id: "trample", name: "Trample", tier: 3, requires: ["pulverize", "tornado"] },
      { id: "earthquake", name: "Earthquake", tier: 3, requires: ["thorn_barrage"] },
      { id: "nature_mastery", name: "Nature Mastery", tier: 4, requires: ["trample", "earthquake"] }
    ],
  
    rogue: [
      { id: "puncture", name: "Puncture", tier: 1 },
      { id: "invigorating_strike", name: "Invigorating Strike", tier: 1 },
      { id: "shadow_step", name: "Shadow Step", tier: 1 },
      { id: "twisting_blades", name: "Twisting Blades", tier: 2, requires: ["puncture"] },
      { id: "rapid_fire", name: "Rapid Fire", tier: 2, requires: ["invigorating_strike"] },
      { id: "poison_dagger", name: "Poison Dagger", tier: 2, requires: ["shadow_step"] },
      { id: "dark_shroud", name: "Dark Shroud", tier: 3, requires: ["twisting_blades", "rapid_fire"] },
      { id: "rain_of_arrows", name: "Rain of Arrows", tier: 3, requires: ["poison_dagger"] },
      { id: "assassinate", name: "Assassinate", tier: 4, requires: ["dark_shroud", "rain_of_arrows"] }
    ],
  
    necromancer: [
      { id: "bone_splinters", name: "Bone Splinters", tier: 1 },
      { id: "decompose", name: "Decompose", tier: 1 },
      { id: "skeleton_summon", name: "Summon Skeleton", tier: 1 },
      { id: "bone_spear", name: "Bone Spear", tier: 2, requires: ["bone_splinters"] },
      { id: "blight", name: "Blight", tier: 2, requires: ["decompose"] },
      { id: "golem_summon", name: "Summon Golem", tier: 2, requires: ["skeleton_summon"] },
      { id: "corpse_explosion", name: "Corpse Explosion", tier: 3, requires: ["bone_spear", "blight"] },
      { id: "bone_wall", name: "Bone Wall", tier: 3, requires: ["golem_summon"] },
      { id: "master_of_death", name: "Master of Death", tier: 4, requires: ["corpse_explosion", "bone_wall"] }
    ],
  
    spiritborn: [
      { id: "jaguar_strike", name: "Jaguar Strike", tier: 1 },
      { id: "eagle_claw", name: "Eagle Claw", tier: 1 },
      { id: "spirit_bolt", name: "Spirit Bolt", tier: 1 },
      { id: "spirit_flurry", name: "Spirit Flurry", tier: 2, requires: ["jaguar_strike"] },
      { id: "serpent_fury", name: "Serpent Fury", tier: 2, requires: ["eagle_claw"] },
      { id: "spirit_guard", name: "Spirit Guard", tier: 2, requires: ["spirit_bolt"] },
      { id: "eagle_dash", name: "Eagle Dash", tier: 3, requires: ["spirit_flurry", "serpent_fury"] },
      { id: "spirit_wildfire", name: "Spirit Wildfire", tier: 3, requires: ["spirit_guard"] },
      { id: "spirit_mastery", name: "Spirit Mastery", tier: 4, requires: ["eagle_dash", "spirit_wildfire"] }
    ],
  
    paladin: [
      { id: "smite", name: "Smite", tier: 1 },
      { id: "holy_bolt", name: "Holy Bolt", tier: 1 },
      { id: "divine_touch", name: "Divine Touch", tier: 1 },
      { id: "blessed_hammer", name: "Blessed Hammer", tier: 2, requires: ["smite"] },
      { id: "zeal", name: "Zeal", tier: 2, requires: ["holy_bolt"] },
      { id: "shield_slam", name: "Shield Slam", tier: 2, requires: ["divine_touch"] },
      { id: "holy_shield", name: "Holy Shield", tier: 3, requires: ["blessed_hammer", "zeal"] },
      { id: "divine_storm", name: "Divine Storm", tier: 3, requires: ["shield_slam"] },
      { id: "light_of_justice", name: "Light of Justice", tier: 4, requires: ["holy_shield", "divine_storm"] }
    ]
  };
  
  export default talentTree;
  