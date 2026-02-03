const classes = [
    {
      id: "barbarian",
      name: "Barbarian",
      role: "Melee DPS / Tank",
      resource: "Fury",
      description:
        "Guerrier brutal maniant plusieurs armes, spécialisé dans les attaques de mêlée dévastatrices.",
      strengths: [
        "Très résistant",
        "Dégâts élevés en mêlée",
        "Grande mobilité"
      ]
    },
    {
      id: "sorcerer",
      name: "Sorcerer",
      role: "Ranged DPS",
      resource: "Mana",
      description:
        "Maître des éléments, capable de déchaîner le feu, la glace et la foudre à distance.",
      strengths: [
        "Dégâts élémentaires massifs",
        "Contrôle de foule",
        "Gameplay à distance"
      ]
    },
    {
      id: "druid",
      name: "Druid",
      role: "Hybrid DPS / Tank",
      resource: "Spirit",
      description:
        "Métamorphe maîtrisant la nature, capable d'alterner entre formes animales et magie naturelle.",
      strengths: [
        "Très polyvalent",
        "Tank ou DPS",
        "Invocations"
      ]
    },
    {
      id: "rogue",
      name: "Rogue",
      role: "Melee / Ranged DPS",
      resource: "Energy / Combo Points",
      description:
        "Assassin agile combinant attaques à distance et coups mortels en mêlée.",
      strengths: [
        "Très mobile",
        "Dégâts explosifs",
        "Gameplay rapide"
      ]
    },
    {
      id: "necromancer",
      name: "Necromancer",
      role: "Summoner / DPS",
      resource: "Essence",
      description:
        "Manipulateur de la mort, invoquant des armées de morts-vivants et des malédictions.",
      strengths: [
        "Invocations puissantes",
        "Très bon contrôle",
        "Gameplay stratégique"
      ]
    },
    {
      id: "spiritborn",
      name: "Sacresprit (Spiritborn)",
      role: "Melee / Hybrid DPS",
      resource: "Vigor",
      description:
        "Guerrier mystique de Nahantu, fusionnant arts martiaux et esprits animaux pour des attaques rapides et fluides.",
      strengths: [
        "Gameplay très dynamique",
        "Synergies avec esprits",
        "Excellente mobilité"
      ]
    },
    {
      id: "paladin",
      name: "Paladin",
      role: "Tank / Support / DPS",
      resource: "Faith",
      description:
        "Chevalier sacré maniant la lumière pour protéger ses alliés et anéantir les forces du mal.",
      strengths: [
        "Très résistant",
        "Support et buffs",
        "Dégâts sacrés"
      ],
      unofficial: true
    }
  ];
  
  export default classes;
  