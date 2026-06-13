export type PokemonSetSymbol = {
  alt: string;
  sourceUrl: string;
  localPath: string;
};

export type PokemonSet = {
  id: string;
  name: string;
  year: number;
  era: string;
  setNumber: string;
  releaseOrder: number;
  images: PokemonSetSymbol[];
  checklistUrl: string;
};

export const pokemonSetSymbolSource = "https://octulos.nl/en/blogs/pokemon-tcg-blog/pokemon-tcg-set-symbols";

export const pokemonSets = [
  {
    "id": "2026-me4-1",
    "name": "Chaos Rising",
    "year": 2026,
    "era": "Mega Evolutions",
    "setNumber": "ME4",
    "releaseOrder": 1,
    "images": [
      {
        "alt": "Chaos Rising symbol 1",
        "sourceUrl": "https://archives.bulbagarden.net/media/upload/5/50/SetSymbolChaos_Rising.png",
        "localPath": "/pokemon-symbols/001-chaos-rising.png"
      }
    ],
    "checklistUrl": "https://d1i787aglh9bmb.cloudfront.net/assets/img/me-expansions/me04/gallery/_pdfs/ME04_Card_List_EN.pdf"
  },
  {
    "id": "2026-me3-2",
    "name": "Perfect Order",
    "year": 2026,
    "era": "Mega Evolution",
    "setNumber": "ME3",
    "releaseOrder": 2,
    "images": [
      {
        "alt": "undefined",
        "sourceUrl": "https://archives.bulbagarden.net/media/upload/0/09/SetSymbolPerfect_Order.png",
        "localPath": "/pokemon-symbols/002-perfect-order.png"
      }
    ],
    "checklistUrl": "https://d1i787aglh9bmb.cloudfront.net/assets/img/me-expansions/me03/gallery/_pdfs/P11218_ME03_Card_List_EN.pdf"
  },
  {
    "id": "2026-me2-5-3",
    "name": "Ascended Heroes",
    "year": 2026,
    "era": "Mega Evolution",
    "setNumber": "ME2.5",
    "releaseOrder": 3,
    "images": [
      {
        "alt": "undefined",
        "sourceUrl": "https://archives.bulbagarden.net/media/upload/0/0e/SetSymbolAscended_Heroes.png",
        "localPath": "/pokemon-symbols/003-ascended-heroes.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0550/9205/2174/files/asc_web_cardlist_en.pdf?v=1775989045"
  },
  {
    "id": "2025-me2-4",
    "name": "Phantasmal Flames",
    "year": 2025,
    "era": "Mega Evolution",
    "setNumber": "ME2",
    "releaseOrder": 4,
    "images": [
      {
        "alt": "undefined",
        "sourceUrl": "https://archives.bulbagarden.net/media/upload/7/7f/SetSymbolPhantasmal_Flames.png",
        "localPath": "/pokemon-symbols/004-phantasmal-flames.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0550/9205/2174/files/pfl_web_cardlist_en.pdf?v=1775989043"
  },
  {
    "id": "2025-me1-5",
    "name": "Mega Evolution",
    "year": 2025,
    "era": "Mega Evolution",
    "setNumber": "ME1",
    "releaseOrder": 5,
    "images": [
      {
        "alt": "Mega Evolution symbol 1",
        "sourceUrl": "https://archives.bulbagarden.net/media/upload/thumb/f/fc/SetSymbolMega_Evolution.png/40px-SetSymbolMega_Evolution.png",
        "localPath": "/pokemon-symbols/005-mega-evolution.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0550/9205/2174/files/meg_web_cardlist_en.pdf?v=1775989043"
  },
  {
    "id": "2025-rsv10-5-6",
    "name": "White Flare",
    "year": 2025,
    "era": "Scarlet & Violet",
    "setNumber": "RSV10.5",
    "releaseOrder": 6,
    "images": [
      {
        "alt": "undefined",
        "sourceUrl": "https://archives.bulbagarden.net/media/upload/4/49/SetSymbolWhite_Flare.png",
        "localPath": "/pokemon-symbols/006-white-flare.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0550/9205/2174/files/wht_web_cardlist_en.pdf?v=1775989043"
  },
  {
    "id": "2025-zsv10-5-7",
    "name": "Black Bolt",
    "year": 2025,
    "era": "Scarlet & Violet",
    "setNumber": "ZSV10.5",
    "releaseOrder": 7,
    "images": [
      {
        "alt": "undefined",
        "sourceUrl": "https://archives.bulbagarden.net/media/upload/7/78/SetSymbolBlack_Bolt.png",
        "localPath": "/pokemon-symbols/007-black-bolt.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0550/9205/2174/files/blk_web_cardlist_en.pdf?v=1775989043"
  },
  {
    "id": "2025-sv10-8",
    "name": "Destined Rivals",
    "year": 2025,
    "era": "Scarlet & Violet",
    "setNumber": "SV10",
    "releaseOrder": 8,
    "images": [
      {
        "alt": "undefined",
        "sourceUrl": "https://archives.bulbagarden.net/media/upload/d/d9/SetSymbolDestined_Rivals.png",
        "localPath": "/pokemon-symbols/008-destined-rivals.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0550/9205/2174/files/dri_web_cardlist_en.pdf?v=1775989433"
  },
  {
    "id": "2025-sv9-9",
    "name": "Journey Together",
    "year": 2025,
    "era": "Scarlet & Violet",
    "setNumber": "SV9",
    "releaseOrder": 9,
    "images": [
      {
        "alt": "undefined",
        "sourceUrl": "https://archives.bulbagarden.net/media/upload/5/51/SetSymbolJourney_Together.png",
        "localPath": "/pokemon-symbols/009-journey-together.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0550/9205/2174/files/jtg_web_cardlist_en.pdf?v=1775989433"
  },
  {
    "id": "2024-sv8-5-10",
    "name": "Prismatic Evolutions",
    "year": 2024,
    "era": "Scarlet & Violet",
    "setNumber": "SV8.5",
    "releaseOrder": 10,
    "images": [
      {
        "alt": "Prismatic Evolutions Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/148_prismatic_evolutions_logo.png?v=1732304982",
        "localPath": "/pokemon-symbols/010-prismatic-evolutions.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0550/9205/2174/files/pre_web_cardlist_en.pdf?v=1775989435"
  },
  {
    "id": "2024-sv8-11",
    "name": "Surging Sparks",
    "year": 2024,
    "era": "Scarlet & Violet",
    "setNumber": "SV8",
    "releaseOrder": 11,
    "images": [
      {
        "alt": "Surging Sparks Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/147_surging_sparks_logo.png?v=1724888723",
        "localPath": "/pokemon-symbols/011-surging-sparks.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/147_surging_sparks_set_checklist.pdf?v=1732304792"
  },
  {
    "id": "2024-146-12",
    "name": "Stellar Crown",
    "year": 2024,
    "era": "Scarlet & Violet",
    "setNumber": "146",
    "releaseOrder": 12,
    "images": [
      {
        "alt": "Shrouded Fable Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/146_stellar_crown_set_logo.png?v=1724888808",
        "localPath": "/pokemon-symbols/012-stellar-crown.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/146_stellar_crown_set_checklist.pdf?v=1726522551"
  },
  {
    "id": "2024-145-13",
    "name": "Shrouded Fable",
    "year": 2024,
    "era": "Scarlet & Violet",
    "setNumber": "145",
    "releaseOrder": 13,
    "images": [
      {
        "alt": "Shrouded Fable Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/145_shrouded_fable_logo.png?v=1717075464",
        "localPath": "/pokemon-symbols/013-shrouded-fable.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/145_shrouded_fable_checklist.pdf?v=1724888438"
  },
  {
    "id": "2024-144-14",
    "name": "Twilight Masquerade",
    "year": 2024,
    "era": "Scarlet & Violet",
    "setNumber": "144",
    "releaseOrder": 14,
    "images": [
      {
        "alt": "Twilight Masquerade Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/144_twilight_masquerade_logo.png?v=1717075458",
        "localPath": "/pokemon-symbols/014-twilight-masquerade.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/144_twilight_masquerade_checklist.pdf?v=1717075341"
  },
  {
    "id": "2024-143-15",
    "name": "Temporal Forces",
    "year": 2024,
    "era": "Scarlet & Violet",
    "setNumber": "143",
    "releaseOrder": 15,
    "images": [
      {
        "alt": "Temporal Forces Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/143_temporal_forces_logo.png?v=1706323160",
        "localPath": "/pokemon-symbols/015-temporal-forces.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/143_temporal_forces_checklist.pdf?v=1713010769"
  },
  {
    "id": "2024-142-16",
    "name": "Paldean Fates",
    "year": 2024,
    "era": "Scarlet & Violet",
    "setNumber": "142",
    "releaseOrder": 16,
    "images": [
      {
        "alt": "Paldean Fates Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/142_paldean_fates_logo.png?v=1701118288",
        "localPath": "/pokemon-symbols/016-paldean-fates.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/142_paldean_fates_checklist.pdf?v=1706323043"
  },
  {
    "id": "2023-141-17",
    "name": "Paradox Rift",
    "year": 2023,
    "era": "Scarlet & Violet",
    "setNumber": "141",
    "releaseOrder": 17,
    "images": [
      {
        "alt": "Paradox Rift Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/141_paradox_rift_set_logo.png",
        "localPath": "/pokemon-symbols/017-paradox-rift.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/141_paradox_rift_checklist.pdf?v=1699020895"
  },
  {
    "id": "2023-140-18",
    "name": "Pokemon 151",
    "year": 2023,
    "era": "Scarlet & Violet",
    "setNumber": "140",
    "releaseOrder": 18,
    "images": [
      {
        "alt": "Pokemon 151 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/140_pokemon_151_set_logo.png?v=17063242689",
        "localPath": "/pokemon-symbols/018-pokemon-151.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/140_pokemon_151_checklist.pdf?v=1696012236"
  },
  {
    "id": "2023-139-19",
    "name": "Obsidian Flames",
    "year": 2023,
    "era": "Scarlet & Violet",
    "setNumber": "139",
    "releaseOrder": 19,
    "images": [
      {
        "alt": "Obsidian Flames Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/139_obsidian_flames_seet_logo.png?v=1706324260",
        "localPath": "/pokemon-symbols/019-obsidian-flames.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/140_obsidian_flames_checklist.pdf?v=1691790986"
  },
  {
    "id": "2023-138-20",
    "name": "Paldea Evolved",
    "year": 2023,
    "era": "Scarlet & Violet",
    "setNumber": "138",
    "releaseOrder": 20,
    "images": [
      {
        "alt": "Paldea Evolved Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/138_paldea_evolved_set_logo.png?v=1706324252",
        "localPath": "/pokemon-symbols/020-paldea-evolved.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/138_paldea_evolved_checklist.pdf?v=1686791565"
  },
  {
    "id": "2023-137-21",
    "name": "Scarlet & Violet Base Set",
    "year": 2023,
    "era": "Scarlet & Violet",
    "setNumber": "137",
    "releaseOrder": 21,
    "images": [
      {
        "alt": "Scarlet & Violet Base Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/137_scarlet_violet_base_set_logo.png?v=1706324231",
        "localPath": "/pokemon-symbols/021-scarlet-and-violet-base-set.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/137_scarlet_violet_base_checklist.pdf"
  },
  {
    "id": "2023-136-22",
    "name": "Scarlet & Violet Promos",
    "year": 2023,
    "era": "Scarlet & Violet",
    "setNumber": "136",
    "releaseOrder": 22,
    "images": [
      {
        "alt": "Scarlet & Violet Promo Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/136_scarlet_violet_black_star_promos_pokemon_set_symbol.png?v=1706323393",
        "localPath": "/pokemon-symbols/022-scarlet-and-violet-promos.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2023-135-23",
    "name": "Crown Zenith",
    "year": 2023,
    "era": "Sword & Shield",
    "setNumber": "135",
    "releaseOrder": 23,
    "images": [
      {
        "alt": "Crown Zenith Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/135_crown-zenith_logo.png",
        "localPath": "/pokemon-symbols/023-crown-zenith.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/135_crown_zenith_checklist.pdf"
  },
  {
    "id": "2022-134-24",
    "name": "Silver Tempest",
    "year": 2022,
    "era": "Sword & Shield",
    "setNumber": "134",
    "releaseOrder": 24,
    "images": [
      {
        "alt": "Silver Tempest Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/134_silver_tempest_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/024-silver-tempest.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/134_silver_tempest_checklist.pdf"
  },
  {
    "id": "2022-133-25",
    "name": "Lost Origin",
    "year": 2022,
    "era": "Sword & Shield",
    "setNumber": "133",
    "releaseOrder": 25,
    "images": [
      {
        "alt": "Lost Origin Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/133_lost_origin_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/025-lost-origin.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/133_lost_origin_go_checklist.pdf"
  },
  {
    "id": "2022-132-26",
    "name": "Pokemon Go",
    "year": 2022,
    "era": "Sword & Shield",
    "setNumber": "132",
    "releaseOrder": 26,
    "images": [
      {
        "alt": "Pokemon GO Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/132_pokemon_go_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/026-pokemon-go.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/132_pokemon_go_checklist.pdf"
  },
  {
    "id": "2022-131-27",
    "name": "Astral Radiance",
    "year": 2022,
    "era": "Sword & Shield",
    "setNumber": "131",
    "releaseOrder": 27,
    "images": [
      {
        "alt": "Astral Radiance Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/131_astral_radiance.png",
        "localPath": "/pokemon-symbols/027-astral-radiance.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/131_astral_radiance_checklist.pdf"
  },
  {
    "id": "2022-130-28",
    "name": "Brilliant Stars",
    "year": 2022,
    "era": "Sword & Shield",
    "setNumber": "130",
    "releaseOrder": 28,
    "images": [
      {
        "alt": "Brilliant Stars Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/130_brilliant_stars_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/028-brilliant-stars.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/130_brilliant_stars_checklist.pdf"
  },
  {
    "id": "2021-129-29",
    "name": "Fusion Strike",
    "year": 2021,
    "era": "Sword & Shield",
    "setNumber": "129",
    "releaseOrder": 29,
    "images": [
      {
        "alt": "Fusion Strike Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/129_fusion_strike_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/029-fusion-strike.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/129_fusion_strike_checklist.pdf"
  },
  {
    "id": "2021-128-30",
    "name": "Celebrations",
    "year": 2021,
    "era": "Sword & Shield",
    "setNumber": "128",
    "releaseOrder": 30,
    "images": [
      {
        "alt": "Celebrations Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/128_celebrations_pokemon_set_symbol.png?v=1706324417",
        "localPath": "/pokemon-symbols/030-celebrations.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/128_celebrations_checklist.pdf"
  },
  {
    "id": "2021-127-31",
    "name": "Evolving Skies",
    "year": 2021,
    "era": "Sword & Shield",
    "setNumber": "127",
    "releaseOrder": 31,
    "images": [
      {
        "alt": "Evolving Skies Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/127_evolving_skies.png",
        "localPath": "/pokemon-symbols/031-evolving-skies.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/127_evolving_skies_checklist.pdf"
  },
  {
    "id": "2021-126-32",
    "name": "Chilling Reign",
    "year": 2021,
    "era": "Sword & Shield",
    "setNumber": "126",
    "releaseOrder": 32,
    "images": [
      {
        "alt": "Chilling Reign Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/126_chilling_reign.png",
        "localPath": "/pokemon-symbols/032-chilling-reign.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/126_chilling_reign_checklist.pdf"
  },
  {
    "id": "2021-125-33",
    "name": "Battle Styles",
    "year": 2021,
    "era": "Sword & Shield",
    "setNumber": "125",
    "releaseOrder": 33,
    "images": [
      {
        "alt": "Battle Styles Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/125_battle_styles.png",
        "localPath": "/pokemon-symbols/033-battle-styles.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/125_battle_styles_checklist.pdf"
  },
  {
    "id": "2021-124-34",
    "name": "Shining Fates",
    "year": 2021,
    "era": "Sword & Shield",
    "setNumber": "124",
    "releaseOrder": 34,
    "images": [
      {
        "alt": "Shining Fates Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/124_shining_fates.png",
        "localPath": "/pokemon-symbols/034-shining-fates.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/124_shining_fates_checklist.pdf"
  },
  {
    "id": "2020-123-35",
    "name": "Vivid Voltage",
    "year": 2020,
    "era": "Sword & Shield",
    "setNumber": "123",
    "releaseOrder": 35,
    "images": [
      {
        "alt": "Vivid Voltage Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/123_vivid_voltage.png",
        "localPath": "/pokemon-symbols/035-vivid-voltage.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/123_vivid_voltage_checklist.pdf"
  },
  {
    "id": "2020-122-36",
    "name": "Champion's Path",
    "year": 2020,
    "era": "Sword & Shield",
    "setNumber": "122",
    "releaseOrder": 36,
    "images": [
      {
        "alt": "Champion's Path Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/122_champions_path.png",
        "localPath": "/pokemon-symbols/036-champion-s-path.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/122_champions_path_checklist.pdf"
  },
  {
    "id": "2020-121-37",
    "name": "Darkness Ablaze",
    "year": 2020,
    "era": "Sword & Shield",
    "setNumber": "121",
    "releaseOrder": 37,
    "images": [
      {
        "alt": "Darkness Ablaze Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/121_darkness_ablaze.png",
        "localPath": "/pokemon-symbols/037-darkness-ablaze.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/121_darkness_ablaze_checklist.pdf"
  },
  {
    "id": "2020-120-38",
    "name": "Rebel Clash",
    "year": 2020,
    "era": "Sword & Shield",
    "setNumber": "120",
    "releaseOrder": 38,
    "images": [
      {
        "alt": "Rebel Clash Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/120_sword_shield_rebel_clash.png",
        "localPath": "/pokemon-symbols/038-rebel-clash.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/120_rebel_clash_checklist.pdf"
  },
  {
    "id": "2020-119-39",
    "name": "Sword & Shield Base Set",
    "year": 2020,
    "era": "Sword & Shield",
    "setNumber": "119",
    "releaseOrder": 39,
    "images": [
      {
        "alt": "Sword & Shield Base Set Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/119_sword_shield_base.png",
        "localPath": "/pokemon-symbols/039-sword-and-shield-base-set.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/119_sword_shield_base_checklist.pdf"
  },
  {
    "id": "2020-118-40",
    "name": "Sword & Shield Promos",
    "year": 2020,
    "era": "Sword & Shield",
    "setNumber": "118",
    "releaseOrder": 40,
    "images": [
      {
        "alt": "Sword & Shield Promos Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/118_sword_and_shield_promo.png",
        "localPath": "/pokemon-symbols/040-sword-and-shield-promos.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2019-117-41",
    "name": "Cosmic Eclipse",
    "year": 2019,
    "era": "Sun & Moon",
    "setNumber": "117",
    "releaseOrder": 41,
    "images": [
      {
        "alt": "Cosmic Eclipse Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/117_cosmic_eclipse.png",
        "localPath": "/pokemon-symbols/041-cosmic-eclipse.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/117_cosmic_eclipse_checklist.pdf"
  },
  {
    "id": "2019-116-42",
    "name": "Hidden Fates",
    "year": 2019,
    "era": "Sun & Moon",
    "setNumber": "116",
    "releaseOrder": 42,
    "images": [
      {
        "alt": "Hidden Fates Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/116_hidden_fates.png",
        "localPath": "/pokemon-symbols/042-hidden-fates.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/116_hidden_fates_checklist.pdf"
  },
  {
    "id": "2019-115-43",
    "name": "Unified Minds",
    "year": 2019,
    "era": "Sun & Moon",
    "setNumber": "115",
    "releaseOrder": 43,
    "images": [
      {
        "alt": "Unified Minds Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/115_unified_minds.png",
        "localPath": "/pokemon-symbols/043-unified-minds.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/115_unified_minds_checklist.pdf"
  },
  {
    "id": "2019-114-44",
    "name": "Unbroken Bonds",
    "year": 2019,
    "era": "Sun & Moon",
    "setNumber": "114",
    "releaseOrder": 44,
    "images": [
      {
        "alt": "Unbroken Bonds Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/114_unbroken_bonds.png",
        "localPath": "/pokemon-symbols/044-unbroken-bonds.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/114_unbroken_bonds_checklist.pdf"
  },
  {
    "id": "2019-113-45",
    "name": "Detective Pikachu",
    "year": 2019,
    "era": "Sun & Moon",
    "setNumber": "113",
    "releaseOrder": 45,
    "images": [
      {
        "alt": "Detective Pikachu Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/113_detective_pikachu.png",
        "localPath": "/pokemon-symbols/045-detective-pikachu.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/113_detective_pikachu_checklist.pdf"
  },
  {
    "id": "2019-112-46",
    "name": "Team Up",
    "year": 2019,
    "era": "Sun & Moon",
    "setNumber": "112",
    "releaseOrder": 46,
    "images": [
      {
        "alt": "Team Up Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/112_team_up.png",
        "localPath": "/pokemon-symbols/046-team-up.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/112_team_up_checklist.pdf"
  },
  {
    "id": "2018-111-47",
    "name": "Lost Thunder",
    "year": 2018,
    "era": "Sun & Moon",
    "setNumber": "111",
    "releaseOrder": 47,
    "images": [
      {
        "alt": "Lost Thunder Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/111_sm_lost_thunder.png",
        "localPath": "/pokemon-symbols/047-lost-thunder.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/111_lost_thunder_checklist.pdf"
  },
  {
    "id": "2018-110-48",
    "name": "Dragon Majesty",
    "year": 2018,
    "era": "Sun & Moon",
    "setNumber": "110",
    "releaseOrder": 48,
    "images": [
      {
        "alt": "Dragon Majesty Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/110_dragon_majesty.png",
        "localPath": "/pokemon-symbols/048-dragon-majesty.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/110_dragon_majesty_checklist.pdf"
  },
  {
    "id": "2018-109-49",
    "name": "Celestial Storm",
    "year": 2018,
    "era": "Sun & Moon",
    "setNumber": "109",
    "releaseOrder": 49,
    "images": [
      {
        "alt": "Celestial Storm Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/109_celestial_storm.png",
        "localPath": "/pokemon-symbols/049-celestial-storm.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/109_celestial_storm_checklist.pdf"
  },
  {
    "id": "2018-108-50",
    "name": "Forbidden Light",
    "year": 2018,
    "era": "Sun & Moon",
    "setNumber": "108",
    "releaseOrder": 50,
    "images": [
      {
        "alt": "Forbidden Light Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/108_sun_and_moon_forbidden_light.png",
        "localPath": "/pokemon-symbols/050-forbidden-light.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/108_forbidden_light_checklist.pdf"
  },
  {
    "id": "2018-107-51",
    "name": "Ultra Prism",
    "year": 2018,
    "era": "Sun & Moon",
    "setNumber": "107",
    "releaseOrder": 51,
    "images": [
      {
        "alt": "Ultra Prism Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/107_sun_and_moon_ultra_prism.png",
        "localPath": "/pokemon-symbols/051-ultra-prism.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/107_ultra_prism_checklist.pdf"
  },
  {
    "id": "2017-106-52",
    "name": "Crimson Invasion",
    "year": 2017,
    "era": "Sun & Moon",
    "setNumber": "106",
    "releaseOrder": 52,
    "images": [
      {
        "alt": "Crimson Invasion Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/106_crimson_invasion.png",
        "localPath": "/pokemon-symbols/052-crimson-invasion.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/106_crimson_invasion_checklist.pdf"
  },
  {
    "id": "2017-105-53",
    "name": "Shining Legends",
    "year": 2017,
    "era": "Sun & Moon",
    "setNumber": "105",
    "releaseOrder": 53,
    "images": [
      {
        "alt": "Shining Legends Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/105_shining_legends.png",
        "localPath": "/pokemon-symbols/053-shining-legends.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/105_shining_legends_checklist.pdf"
  },
  {
    "id": "2017-104-54",
    "name": "Burning Shadows",
    "year": 2017,
    "era": "Sun & Moon",
    "setNumber": "104",
    "releaseOrder": 54,
    "images": [
      {
        "alt": "Burning Shadows Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/104_burning_shadows.png",
        "localPath": "/pokemon-symbols/054-burning-shadows.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/104_burning_shadows_checklist.pdf"
  },
  {
    "id": "2017-103-55",
    "name": "Guardians Rising",
    "year": 2017,
    "era": "Sun & Moon",
    "setNumber": "103",
    "releaseOrder": 55,
    "images": [
      {
        "alt": "Guardians Rising Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/103_guardians_rising.webp",
        "localPath": "/pokemon-symbols/055-guardians-rising.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/103_guardians_rising_checklist.pdf"
  },
  {
    "id": "2017-101-56",
    "name": "Sun & Moon Base Set",
    "year": 2017,
    "era": "Sun & Moon",
    "setNumber": "101",
    "releaseOrder": 56,
    "images": [
      {
        "alt": "Sun & Moon Base Set Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/101_sun_and_moon_base_set.png",
        "localPath": "/pokemon-symbols/056-sun-and-moon-base-set.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/101_sun_moon_base_checklist.pdf"
  },
  {
    "id": "2016-100-57",
    "name": "Sun & Moon Promos",
    "year": 2016,
    "era": "Sun & Moon",
    "setNumber": "100",
    "releaseOrder": 57,
    "images": [
      {
        "alt": "Sun & Moon Promos Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/100-sun-and-moon-promos.png",
        "localPath": "/pokemon-symbols/057-sun-and-moon-promos.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/100_sun_moon_promos.pdf"
  },
  {
    "id": "2016-99-58",
    "name": "Evolutions",
    "year": 2016,
    "era": "XY",
    "setNumber": "99",
    "releaseOrder": 58,
    "images": [
      {
        "alt": "Evolutions Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/099_evolutions.png",
        "localPath": "/pokemon-symbols/058-evolutions.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/099_evolutions_checklist.pdf"
  },
  {
    "id": "2016-98-59",
    "name": "Steam Siege",
    "year": 2016,
    "era": "XY",
    "setNumber": "98",
    "releaseOrder": 59,
    "images": [
      {
        "alt": "Steam Siege Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/098_steam_siege.png",
        "localPath": "/pokemon-symbols/059-steam-siege.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/098_steam_siege_checklist.pdf"
  },
  {
    "id": "2016-97-60",
    "name": "Fates Collide",
    "year": 2016,
    "era": "XY",
    "setNumber": "97",
    "releaseOrder": 60,
    "images": [
      {
        "alt": "Fates Collide Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/097_fates_collide.webp",
        "localPath": "/pokemon-symbols/060-fates-collide.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/097_fates_collide_checklist.pdf"
  },
  {
    "id": "2016-95-61",
    "name": "Generations",
    "year": 2016,
    "era": "XY",
    "setNumber": "95",
    "releaseOrder": 61,
    "images": [
      {
        "alt": "Generations Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/095_generations_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/061-generations.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/095_generations_checklist.pdf"
  },
  {
    "id": "2016-94-62",
    "name": "BREAKpoint",
    "year": 2016,
    "era": "XY",
    "setNumber": "94",
    "releaseOrder": 62,
    "images": [
      {
        "alt": "BREAKpoint Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/094_breakpoint.webp",
        "localPath": "/pokemon-symbols/062-breakpoint.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/094_breakpoint_checklist.pdf"
  },
  {
    "id": "2015-93-63",
    "name": "BREAKthrough",
    "year": 2015,
    "era": "XY",
    "setNumber": "93",
    "releaseOrder": 63,
    "images": [
      {
        "alt": "BREAKthrough Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/093_breakthrough.webp",
        "localPath": "/pokemon-symbols/063-breakthrough.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/093_breakthrough_checklist.pdf"
  },
  {
    "id": "2015-92-64",
    "name": "Ancient Origins",
    "year": 2015,
    "era": "XY",
    "setNumber": "92",
    "releaseOrder": 64,
    "images": [
      {
        "alt": "Ancient Origins Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/092_ancient_origins.webp",
        "localPath": "/pokemon-symbols/064-ancient-origins.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/092_ancient_origins_checklist.pdf"
  },
  {
    "id": "2015-91-65",
    "name": "Roaring Skies",
    "year": 2015,
    "era": "XY",
    "setNumber": "91",
    "releaseOrder": 65,
    "images": [
      {
        "alt": "Roaring Skies Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/091_roaring_skies.webp",
        "localPath": "/pokemon-symbols/065-roaring-skies.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/091_roaring_skies_checklist.pdf"
  },
  {
    "id": "2015-89-66",
    "name": "Double Crisis",
    "year": 2015,
    "era": "XY",
    "setNumber": "89",
    "releaseOrder": 66,
    "images": [
      {
        "alt": "Double Crisis Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/089_double_crisis.png",
        "localPath": "/pokemon-symbols/066-double-crisis.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/089_double_crisis_checklist.pdf"
  },
  {
    "id": "2015-88-67",
    "name": "Primal Clash",
    "year": 2015,
    "era": "XY",
    "setNumber": "88",
    "releaseOrder": 67,
    "images": [
      {
        "alt": "Primal Clash Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/088_primal_clash.webp",
        "localPath": "/pokemon-symbols/067-primal-clash.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/088_primal_clash_checklist.pdf"
  },
  {
    "id": "2014-86-68",
    "name": "Phantom Forces",
    "year": 2014,
    "era": "XY",
    "setNumber": "86",
    "releaseOrder": 68,
    "images": [
      {
        "alt": "Phantom Forces Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/086_phantom_forces.webp",
        "localPath": "/pokemon-symbols/068-phantom-forces.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/086_phantom_forces_checklist.pdf"
  },
  {
    "id": "2014-85-69",
    "name": "Furious Fists",
    "year": 2014,
    "era": "XY",
    "setNumber": "85",
    "releaseOrder": 69,
    "images": [
      {
        "alt": "Furious Fists Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/085_furious_fists.webp",
        "localPath": "/pokemon-symbols/069-furious-fists.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/085_furious_fists_checklist.pdf"
  },
  {
    "id": "2014-83-70",
    "name": "Flashfire",
    "year": 2014,
    "era": "XY",
    "setNumber": "83",
    "releaseOrder": 70,
    "images": [
      {
        "alt": "Flashfire Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/083_flashfire.webp",
        "localPath": "/pokemon-symbols/070-flashfire.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/083_flashfire_checklist.pdf"
  },
  {
    "id": "2014-82-71",
    "name": "XY Base Set",
    "year": 2014,
    "era": "XY",
    "setNumber": "82",
    "releaseOrder": 71,
    "images": [
      {
        "alt": "XY Base Set Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/082_xy_base_set.webp",
        "localPath": "/pokemon-symbols/071-xy-base-set.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/082_xy_base_checklist.pdf"
  },
  {
    "id": "2013-81-72",
    "name": "Kalos Starter Set",
    "year": 2013,
    "era": "XY",
    "setNumber": "81",
    "releaseOrder": 72,
    "images": [
      {
        "alt": "Kalos Starter Set Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/081_xy-kalos-starter-set.png",
        "localPath": "/pokemon-symbols/072-kalos-starter-set.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/081_kalos_starter_set_checklist.pdf"
  },
  {
    "id": "2013-80-73",
    "name": "XY Promos",
    "year": 2013,
    "era": "XY",
    "setNumber": "80",
    "releaseOrder": 73,
    "images": [
      {
        "alt": "XY Promos Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/080_xy_promos.png",
        "localPath": "/pokemon-symbols/073-xy-promos.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/080_xy_black_star_promo_checklist.pdf"
  },
  {
    "id": "2013-79-74",
    "name": "Legendary Treasures",
    "year": 2013,
    "era": "Black & White",
    "setNumber": "79",
    "releaseOrder": 74,
    "images": [
      {
        "alt": "Legendary Treasures Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/079_legendary_treasures.webp",
        "localPath": "/pokemon-symbols/074-legendary-treasures.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/079_legendary_treasures_checklist.pdf"
  },
  {
    "id": "2013-78-75",
    "name": "Plasma Blast",
    "year": 2013,
    "era": "Black & White",
    "setNumber": "78",
    "releaseOrder": 75,
    "images": [
      {
        "alt": "Plasma Blast Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/078_plasma_blast.webp",
        "localPath": "/pokemon-symbols/075-plasma-blast.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/078_plasma_blast_checklist.pdf"
  },
  {
    "id": "2013-77-76",
    "name": "Plasma Freeze",
    "year": 2013,
    "era": "Black & White",
    "setNumber": "77",
    "releaseOrder": 76,
    "images": [
      {
        "alt": "Plasma Freeze Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/077_plasma_freeze.webp",
        "localPath": "/pokemon-symbols/076-plasma-freeze.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/077_plasma_freeze_checklist.pdf"
  },
  {
    "id": "2012-76-77",
    "name": "Plasma Storm",
    "year": 2012,
    "era": "Black & White",
    "setNumber": "76",
    "releaseOrder": 77,
    "images": [
      {
        "alt": "Plasma Storm Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/076_plasma_storm.webp",
        "localPath": "/pokemon-symbols/077-plasma-storm.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/076_plasma_storm_checklist.pdf"
  },
  {
    "id": "2012-75-78",
    "name": "Boundaries Crossed",
    "year": 2012,
    "era": "Black & White",
    "setNumber": "75",
    "releaseOrder": 78,
    "images": [
      {
        "alt": "Boundaries Crossed Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/075_boundaries_crossed.webp",
        "localPath": "/pokemon-symbols/078-boundaries-crossed.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/075_boundaries_crossed_checklist.pdf"
  },
  {
    "id": "2012-74-79",
    "name": "Dragon Vault",
    "year": 2012,
    "era": "Black & White",
    "setNumber": "74",
    "releaseOrder": 79,
    "images": [
      {
        "alt": "Dragon Vault Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/074_dragon_vault.png",
        "localPath": "/pokemon-symbols/079-dragon-vault.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/074_dragon_vault_checklist.pdf"
  },
  {
    "id": "2012-73-80",
    "name": "Dragons Exalted",
    "year": 2012,
    "era": "Black & White",
    "setNumber": "73",
    "releaseOrder": 80,
    "images": [
      {
        "alt": "Dragons Exalted Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/073_dragons_exalted.webp",
        "localPath": "/pokemon-symbols/080-dragons-exalted.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/073_dragons_exalted_checklist.pdf"
  },
  {
    "id": "2012-72-81",
    "name": "Dark Explorers",
    "year": 2012,
    "era": "Black & White",
    "setNumber": "72",
    "releaseOrder": 81,
    "images": [
      {
        "alt": "Dark Explorers Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/072_dark_explorers.webp",
        "localPath": "/pokemon-symbols/081-dark-explorers.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/072_dark_explorers_checklist.pdf"
  },
  {
    "id": "2012-71-82",
    "name": "Next Destinies",
    "year": 2012,
    "era": "Black & White",
    "setNumber": "71",
    "releaseOrder": 82,
    "images": [
      {
        "alt": "Next Destinies Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/071_next_destinies.webp",
        "localPath": "/pokemon-symbols/082-next-destinies.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/071_next_destinies_checklist.pdf"
  },
  {
    "id": "2011-70-83",
    "name": "Noble Victories",
    "year": 2011,
    "era": "Black & White",
    "setNumber": "70",
    "releaseOrder": 83,
    "images": [
      {
        "alt": "Noble Victories Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/070_noble_victories.webp",
        "localPath": "/pokemon-symbols/083-noble-victories.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/070_noble_victories_checklist.pdf"
  },
  {
    "id": "2011-68-84",
    "name": "Emerging Powers",
    "year": 2011,
    "era": "Black & White",
    "setNumber": "68",
    "releaseOrder": 84,
    "images": [
      {
        "alt": "Emerging Powers Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/068_emerging_powers.webp",
        "localPath": "/pokemon-symbols/084-emerging-powers.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/068_emerging_powers_checklist.pdf"
  },
  {
    "id": "2011-67-85",
    "name": "Black and White Base Set",
    "year": 2011,
    "era": "Black & White",
    "setNumber": "67",
    "releaseOrder": 85,
    "images": [
      {
        "alt": "Black and White Base Set Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/067_black_and_white_base_set.png",
        "localPath": "/pokemon-symbols/085-black-and-white-base-set.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/067_black_and_white_checklist.pdf"
  },
  {
    "id": "2011-66-86",
    "name": "Black and White Promos",
    "year": 2011,
    "era": "Black & White",
    "setNumber": "66",
    "releaseOrder": 86,
    "images": [
      {
        "alt": "Black and White Promos Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/066_black-and-white-promos.png",
        "localPath": "/pokemon-symbols/086-black-and-white-promos.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/066_black_and_white_black_star_promo_checklist.pdf?v=1694023733"
  },
  {
    "id": "2011-65-87",
    "name": "Call of Legends",
    "year": 2011,
    "era": "HeartGold & SoulSilver",
    "setNumber": "65",
    "releaseOrder": 87,
    "images": [
      {
        "alt": "Call of Legends Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/065_call_of_legends.png",
        "localPath": "/pokemon-symbols/087-call-of-legends.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/065_call_of_legends_checklist.pdf"
  },
  {
    "id": "2010-64-88",
    "name": "Triumphant",
    "year": 2010,
    "era": "HeartGold & SoulSilver",
    "setNumber": "64",
    "releaseOrder": 88,
    "images": [
      {
        "alt": "Triumphant Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/064_triumphant.png",
        "localPath": "/pokemon-symbols/088-triumphant.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/064_triumphant_checklist.pdf"
  },
  {
    "id": "2010-63-89",
    "name": "Undaunted",
    "year": 2010,
    "era": "HeartGold & SoulSilver",
    "setNumber": "63",
    "releaseOrder": 89,
    "images": [
      {
        "alt": "Undaunted Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/063_undaunted.png",
        "localPath": "/pokemon-symbols/089-undaunted.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/063_undaunted_checklist.pdf"
  },
  {
    "id": "2010-62-90",
    "name": "Unleashed",
    "year": 2010,
    "era": "HeartGold & SoulSilver",
    "setNumber": "62",
    "releaseOrder": 90,
    "images": [
      {
        "alt": "Unleashed Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/062_unleashed.png",
        "localPath": "/pokemon-symbols/090-unleashed.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/062_unleashed_checklist.pdf"
  },
  {
    "id": "2010-60-91",
    "name": "HeartGold and SoulSilver Base Set",
    "year": 2010,
    "era": "HeartGold & SoulSilver",
    "setNumber": "60",
    "releaseOrder": 91,
    "images": [
      {
        "alt": "HeartGold and SoulSilver Base Set Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/060_heartgold_and_soulsilver_base_set.png",
        "localPath": "/pokemon-symbols/091-heartgold-and-soulsilver-base-set.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/060_heartgold_soulsilver_base_checklist.pdf"
  },
  {
    "id": "2010-59-92",
    "name": "HeartGold and SoulSilver Promos",
    "year": 2010,
    "era": "HeartGold & SoulSilver",
    "setNumber": "59",
    "releaseOrder": 92,
    "images": [
      {
        "alt": "HeartGold and SoulSilver Promos Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/059_heartgold-and-soulsilver-promos.png",
        "localPath": "/pokemon-symbols/092-heartgold-and-soulsilver-promos.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/059_heartgold_and_soulsilver_black_star_promo_checklist.pdf?v=1694023909"
  },
  {
    "id": "2009-58-93",
    "name": "Arceus",
    "year": 2009,
    "era": "Platinum",
    "setNumber": "58",
    "releaseOrder": 93,
    "images": [
      {
        "alt": "Arceus Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/058_arceus.png",
        "localPath": "/pokemon-symbols/093-arceus.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/058_arceus_checklist.pdf"
  },
  {
    "id": "2009-57-94",
    "name": "Supreme Victors",
    "year": 2009,
    "era": "Platinum",
    "setNumber": "57",
    "releaseOrder": 94,
    "images": [
      {
        "alt": "Supreme Victors Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/057_supreme_victors.png",
        "localPath": "/pokemon-symbols/094-supreme-victors.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/057_supreme_victors_checklist.pdf"
  },
  {
    "id": "2009-56-95",
    "name": "Rising Rivals",
    "year": 2009,
    "era": "Platinum",
    "setNumber": "56",
    "releaseOrder": 95,
    "images": [
      {
        "alt": "Rising Rivals Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/056_rising_rivals.png",
        "localPath": "/pokemon-symbols/095-rising-rivals.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/056_rising_rivals_checklist.pdf"
  },
  {
    "id": "2009-54-96",
    "name": "Platinum Base Set",
    "year": 2009,
    "era": "Platinum",
    "setNumber": "54",
    "releaseOrder": 96,
    "images": [
      {
        "alt": "Platinum Base Set Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/054_platinum_base_set.png",
        "localPath": "/pokemon-symbols/096-platinum-base-set.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/054_platinum_base_checklist.pdf"
  },
  {
    "id": "2008-52-97",
    "name": "Stormfront",
    "year": 2008,
    "era": "Diamond & Pearl",
    "setNumber": "52",
    "releaseOrder": 97,
    "images": [
      {
        "alt": "Stormfront Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/052_stormfront.webp",
        "localPath": "/pokemon-symbols/097-stormfront.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/052_stormfront_checklist.pdf"
  },
  {
    "id": "2008-51-98",
    "name": "Legends Awakened",
    "year": 2008,
    "era": "Diamond & Pearl",
    "setNumber": "51",
    "releaseOrder": 98,
    "images": [
      {
        "alt": "Legends Awakened Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/051_legends_awakened.webp",
        "localPath": "/pokemon-symbols/098-legends-awakened.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/051_legends_awakened_checklist.pdf"
  },
  {
    "id": "2008-50-99",
    "name": "Majestic Dawn",
    "year": 2008,
    "era": "Diamond & Pearl",
    "setNumber": "50",
    "releaseOrder": 99,
    "images": [
      {
        "alt": "Majestic Dawn Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/050_majestic_dawn.webp",
        "localPath": "/pokemon-symbols/099-majestic-dawn.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/050_majestic_dawn_checklist.pdf"
  },
  {
    "id": "2008-48-100",
    "name": "Great Encounters",
    "year": 2008,
    "era": "Diamond & Pearl",
    "setNumber": "48",
    "releaseOrder": 100,
    "images": [
      {
        "alt": "Great Encounters Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/048_great_encounters.webp",
        "localPath": "/pokemon-symbols/100-great-encounters.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/048_great_encounters_checklist.pdf"
  },
  {
    "id": "2007-47-101",
    "name": "Secret Wonders",
    "year": 2007,
    "era": "Diamond & Pearl",
    "setNumber": "47",
    "releaseOrder": 101,
    "images": [
      {
        "alt": "Secret Wonders Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/047_secret_wonders.webp",
        "localPath": "/pokemon-symbols/101-secret-wonders.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/047_secret_wonders_checklist.pdf"
  },
  {
    "id": "2007-44-102",
    "name": "Mysterious Treasures",
    "year": 2007,
    "era": "Diamond & Pearl",
    "setNumber": "44",
    "releaseOrder": 102,
    "images": [
      {
        "alt": "Mysterious Treasures Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/044_mysterious_treasures.webp",
        "localPath": "/pokemon-symbols/102-mysterious-treasures.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/044_mysterious_treasures_checklist.pdf"
  },
  {
    "id": "2007-43-103",
    "name": "Diamond & Pearl Base Set",
    "year": 2007,
    "era": "Diamond & Pearl",
    "setNumber": "43",
    "releaseOrder": 103,
    "images": [
      {
        "alt": "Diamond & Pearl Base Set Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/043_diamond_and_pearl_base_set.webp",
        "localPath": "/pokemon-symbols/103-diamond-and-pearl-base-set.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/043_diamond_and_pearl_base_checklist.pdf"
  },
  {
    "id": "2007-42-104",
    "name": "Diamond & Pearl Promos",
    "year": 2007,
    "era": "Diamond & Pearl",
    "setNumber": "42",
    "releaseOrder": 104,
    "images": [
      {
        "alt": "Diamond & Pearl Promos Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/042_diamond-and-pearl-promos.png",
        "localPath": "/pokemon-symbols/104-diamond-and-pearl-promos.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/042_diamond_and_pearl_black_star_promo_checklist.pdf?v=1694024157"
  },
  {
    "id": "2007-40-105",
    "name": "Power Keepers",
    "year": 2007,
    "era": "EX",
    "setNumber": "40",
    "releaseOrder": 105,
    "images": [
      {
        "alt": "Power Keepers Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/040_power_keepers.webp",
        "localPath": "/pokemon-symbols/105-power-keepers.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/040_power_keepers_checklist.pdf"
  },
  {
    "id": "2006-39-106",
    "name": "Dragon Frontiers",
    "year": 2006,
    "era": "EX",
    "setNumber": "39",
    "releaseOrder": 106,
    "images": [
      {
        "alt": "Dragon Frontiers Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/039_dragon_frontiers.webp",
        "localPath": "/pokemon-symbols/106-dragon-frontiers.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/039_dragon_frontiers_checklist.pdf"
  },
  {
    "id": "2006-38-107",
    "name": "Crystal Guardians",
    "year": 2006,
    "era": "EX",
    "setNumber": "38",
    "releaseOrder": 107,
    "images": [
      {
        "alt": "Crystal Guardians Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/038_crystal_guardians.png",
        "localPath": "/pokemon-symbols/107-crystal-guardians.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/038_crystal_guardians_checklist.pdf"
  },
  {
    "id": "2006-36-108",
    "name": "Holon Phantoms",
    "year": 2006,
    "era": "EX",
    "setNumber": "36",
    "releaseOrder": 108,
    "images": [
      {
        "alt": "Holon Phantoms Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/036_holon_phantoms.png",
        "localPath": "/pokemon-symbols/108-holon-phantoms.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/036_holon_phantoms_checklist.pdf"
  },
  {
    "id": "2006-33-109",
    "name": "Legend Maker",
    "year": 2006,
    "era": "EX",
    "setNumber": "33",
    "releaseOrder": 109,
    "images": [
      {
        "alt": "Legend Maker Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/033_legend_maker.png",
        "localPath": "/pokemon-symbols/109-legend-maker.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/033_legend_maker_checklist.pdf"
  },
  {
    "id": "2006-32-110",
    "name": "Delta Species",
    "year": 2006,
    "era": "EX",
    "setNumber": "32",
    "releaseOrder": 110,
    "images": [
      {
        "alt": "Delta Species Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/032_delta_species.png",
        "localPath": "/pokemon-symbols/110-delta-species.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/032_delta_species_checklist.pdf"
  },
  {
    "id": "2006-31-111",
    "name": "Unseen Forces",
    "year": 2006,
    "era": "EX",
    "setNumber": "31",
    "releaseOrder": 111,
    "images": [
      {
        "alt": "Unseen Forces Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/031_unseen_forces.png",
        "localPath": "/pokemon-symbols/111-unseen-forces.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/031_unseenforces_checklist.pdf"
  },
  {
    "id": "2006-29-112",
    "name": "Emerald",
    "year": 2006,
    "era": "EX",
    "setNumber": "29",
    "releaseOrder": 112,
    "images": [
      {
        "alt": "Emerald Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/029_emerald.png",
        "localPath": "/pokemon-symbols/112-emerald.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/029_emerald_checklist.pdf"
  },
  {
    "id": "2006-28-113",
    "name": "Deoxys",
    "year": 2006,
    "era": "EX",
    "setNumber": "28",
    "releaseOrder": 113,
    "images": [
      {
        "alt": "Deoxys Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/028_deoxys.png",
        "localPath": "/pokemon-symbols/113-deoxys.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/028_deoxys_checklist.pdf"
  },
  {
    "id": "2004-27-114",
    "name": "Team Rocket Returns",
    "year": 2004,
    "era": "EX",
    "setNumber": "27",
    "releaseOrder": 114,
    "images": [
      {
        "alt": "Team Rocket Returns Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/027_team_rocket_returns.png",
        "localPath": "/pokemon-symbols/114-team-rocket-returns.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/027_team_rocket_returns_checklist.pdf"
  },
  {
    "id": "2004-25-115",
    "name": "Fire Red and Leaf Green",
    "year": 2004,
    "era": "EX",
    "setNumber": "25",
    "releaseOrder": 115,
    "images": [
      {
        "alt": "Fire Red and Leaf Green Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/025_firered_and_leafgreen.png",
        "localPath": "/pokemon-symbols/115-fire-red-and-leaf-green.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/025_fire_red_leaf_green_checklist.pdf"
  },
  {
    "id": "2004-24-116",
    "name": "Hidden Legends",
    "year": 2004,
    "era": "EX",
    "setNumber": "24",
    "releaseOrder": 116,
    "images": [
      {
        "alt": "Hidden Legends Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/024_hidden_legends.png",
        "localPath": "/pokemon-symbols/116-hidden-legends.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/024_hidden_legends_checklist.pdf"
  },
  {
    "id": "2004-22-117",
    "name": "Team Magma vs Team Aqua",
    "year": 2004,
    "era": "EX",
    "setNumber": "22",
    "releaseOrder": 117,
    "images": [
      {
        "alt": "Team Magma vs Team Aqua Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/022_team_magma_vs_team_aqua.png",
        "localPath": "/pokemon-symbols/117-team-magma-vs-team-aqua.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/022_team_magma_vs_team_aqua_checklist.pdf"
  },
  {
    "id": "2003-21-118",
    "name": "Dragon",
    "year": 2003,
    "era": "EX",
    "setNumber": "21",
    "releaseOrder": 118,
    "images": [
      {
        "alt": "Dragon Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/021_dragon.png",
        "localPath": "/pokemon-symbols/118-dragon.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/021_dragon_checklist.pdf"
  },
  {
    "id": "2003-20-119",
    "name": "Sandstorm",
    "year": 2003,
    "era": "EX",
    "setNumber": "20",
    "releaseOrder": 119,
    "images": [
      {
        "alt": "Sandstorm Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/020_sandstorm.png",
        "localPath": "/pokemon-symbols/119-sandstorm.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/020_sandstorm_checklist.pdf"
  },
  {
    "id": "2003-19-120",
    "name": "Ruby and Sapphire",
    "year": 2003,
    "era": "EX",
    "setNumber": "19",
    "releaseOrder": 120,
    "images": [
      {
        "alt": "Ruby and Sapphire Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/019_ruby_and_sapphire.png",
        "localPath": "/pokemon-symbols/120-ruby-and-sapphire.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/019_rubysapphire_checklist.pdf"
  },
  {
    "id": "2003-18-121",
    "name": "Skyridge",
    "year": 2003,
    "era": "E-Reader",
    "setNumber": "18",
    "releaseOrder": 121,
    "images": [
      {
        "alt": "Skyridge Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/018_skyridge_pokemon_set_symbol.webp",
        "localPath": "/pokemon-symbols/121-skyridge.webp"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/018_skyridge_checklist.pdf"
  },
  {
    "id": "2003-17-122",
    "name": "Nintendo Black Star Promos",
    "year": 2003,
    "era": "E-Reader",
    "setNumber": "17",
    "releaseOrder": 122,
    "images": [
      {
        "alt": "Nintendo Black Star Promos Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/017_nintendo_black_star_promos_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/122-nintendo-black-star-promos.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/017_nintendo_black_star_promo_checklist.pdf?v=1694025025"
  },
  {
    "id": "2003-16-123",
    "name": "Aquapolis",
    "year": 2003,
    "era": "E-Reader",
    "setNumber": "16",
    "releaseOrder": 123,
    "images": [
      {
        "alt": "Aquapolis Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/016_aquapolis_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/123-aquapolis.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/016_aquapolis_checklist.pdf"
  },
  {
    "id": "2002-15-124",
    "name": "Expedition",
    "year": 2002,
    "era": "E-Reader",
    "setNumber": "15",
    "releaseOrder": 124,
    "images": [
      {
        "alt": "Expedition Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/015_expedition_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/124-expedition.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/015_expedition_checklist.pdf"
  },
  {
    "id": "2002-14-125",
    "name": "Legendary Collection",
    "year": 2002,
    "era": "Legendary Collection",
    "setNumber": "14",
    "releaseOrder": 125,
    "images": [
      {
        "alt": "Legendary Collection Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/014_legendary_collection_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/125-legendary-collection.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/014_legendary_collection_checklist.pdf"
  },
  {
    "id": "2002-13-126",
    "name": "Neo Destiny",
    "year": 2002,
    "era": "Neo",
    "setNumber": "13",
    "releaseOrder": 126,
    "images": [
      {
        "alt": "Neo Destiny Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/013_neo_destiny_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/126-neo-destiny.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/013_neo_destiny_checklist.pdf"
  },
  {
    "id": "2001-12-127",
    "name": "Neo Revelation",
    "year": 2001,
    "era": "Neo",
    "setNumber": "12",
    "releaseOrder": 127,
    "images": [
      {
        "alt": "Neo Revelation Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/012_neo_revelation.png",
        "localPath": "/pokemon-symbols/127-neo-revelation.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/012_neo_revelation_checklist.pdf"
  },
  {
    "id": "2001-11-128",
    "name": "Southern Islands",
    "year": 2001,
    "era": "Neo",
    "setNumber": "11",
    "releaseOrder": 128,
    "images": [
      {
        "alt": "Southern Islands Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/011_southern_islands.png",
        "localPath": "/pokemon-symbols/128-southern-islands.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/011_southern_islands_checklist.pdf"
  },
  {
    "id": "2001-10-129",
    "name": "Neo Discovery",
    "year": 2001,
    "era": "Neo",
    "setNumber": "10",
    "releaseOrder": 129,
    "images": [
      {
        "alt": "Neo Discovery Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/010_neo_discovery.png",
        "localPath": "/pokemon-symbols/129-neo-discovery.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/010_neo_discovery_checklist.pdf"
  },
  {
    "id": "2000-9-130",
    "name": "Neo Genesis",
    "year": 2000,
    "era": "Neo",
    "setNumber": "9",
    "releaseOrder": 130,
    "images": [
      {
        "alt": "Neo Genesis Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/009_neo_genesis.png",
        "localPath": "/pokemon-symbols/130-neo-genesis.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/009_neo_genesis_checklist.pdf"
  },
  {
    "id": "2000-8-131",
    "name": "Gym Challenge",
    "year": 2000,
    "era": "Base Series",
    "setNumber": "8",
    "releaseOrder": 131,
    "images": [
      {
        "alt": "Gym Challenge Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/008_gym_challenge.png",
        "localPath": "/pokemon-symbols/131-gym-challenge.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/008_gym_challenge_checklist.pdf"
  },
  {
    "id": "2000-7-132",
    "name": "Gym Heroes",
    "year": 2000,
    "era": "Base Series",
    "setNumber": "7",
    "releaseOrder": 132,
    "images": [
      {
        "alt": "Gym Heroes Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/007_gym_heroes.png",
        "localPath": "/pokemon-symbols/132-gym-heroes.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/007_gym_heroes_checklist.pdf"
  },
  {
    "id": "2000-6-133",
    "name": "Team Rocket",
    "year": 2000,
    "era": "Base Series",
    "setNumber": "6",
    "releaseOrder": 133,
    "images": [
      {
        "alt": "Team Rocket Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/006_team_rocket.png",
        "localPath": "/pokemon-symbols/133-team-rocket.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/006_team_rocket_checklist.pdf"
  },
  {
    "id": "2000-5-134",
    "name": "Base Set 2",
    "year": 2000,
    "era": "Base Series",
    "setNumber": "5",
    "releaseOrder": 134,
    "images": [
      {
        "alt": "Base Set 2 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/005_base_set_2.png",
        "localPath": "/pokemon-symbols/134-base-set-2.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/005_base_set_2_checklist.pdf"
  },
  {
    "id": "2000-4-135",
    "name": "Fossil",
    "year": 2000,
    "era": "Base Series",
    "setNumber": "4",
    "releaseOrder": 135,
    "images": [
      {
        "alt": "Fossil Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/004_fossil.png",
        "localPath": "/pokemon-symbols/135-fossil.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/004_fossil_checklist.pdf"
  },
  {
    "id": "1999-3-136",
    "name": "Wizards Black Star Promos",
    "year": 1999,
    "era": "Base Series",
    "setNumber": "3",
    "releaseOrder": 136,
    "images": [
      {
        "alt": "Wizards Black Star Promos Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/003_wizards_black_star_promos_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/136-wizards-black-star-promos.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/003_black_star_promo_checklist.pdf?v=1679586538"
  },
  {
    "id": "1999-2-137",
    "name": "Jungle",
    "year": 1999,
    "era": "Base Series",
    "setNumber": "2",
    "releaseOrder": 137,
    "images": [
      {
        "alt": "Jungle Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/002_jungle.png",
        "localPath": "/pokemon-symbols/137-jungle.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/002_jungle_checklist.pdf"
  },
  {
    "id": "1999-1-138",
    "name": "Base Set",
    "year": 1999,
    "era": "Base Series",
    "setNumber": "1",
    "releaseOrder": 138,
    "images": [],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/001_base_set_checklist.pdf?v=1667158071"
  },
  {
    "id": "2024-tot2-139",
    "name": "Trick or Trade",
    "year": 2024,
    "era": "Scarlet & Violet",
    "setNumber": "ToT2",
    "releaseOrder": 139,
    "images": [
      {
        "alt": "Trick or Trade Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/Trick-or-Trade-2024-Logo.webp?v=1729000197",
        "localPath": "/pokemon-symbols/139-trick-or-trade.webp"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2022-tot1-140",
    "name": "Trick or Trade",
    "year": 2022,
    "era": "Sword & Shield",
    "setNumber": "ToT1",
    "releaseOrder": 140,
    "images": [
      {
        "alt": "Trick or Trade Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/2022_Trick_or_Trade.png?v=1729000120",
        "localPath": "/pokemon-symbols/140-trick-or-trade.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2009-pop9-141",
    "name": "POP Series 9",
    "year": 2009,
    "era": "Platinum",
    "setNumber": "POP9",
    "releaseOrder": 141,
    "images": [
      {
        "alt": "POP Series 9 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/055_pop_series_9.png",
        "localPath": "/pokemon-symbols/141-pop-series-9.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/055_pop_series_9_checklist.pdf"
  },
  {
    "id": "2008-pop8-142",
    "name": "POP Series 8",
    "year": 2008,
    "era": "Diamond & Pearl",
    "setNumber": "POP8",
    "releaseOrder": 142,
    "images": [
      {
        "alt": "POP Series 8 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/053_pop_series_8.png",
        "localPath": "/pokemon-symbols/142-pop-series-8.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/053_pop_series_8_checklist.pdf"
  },
  {
    "id": "2008-pop7-143",
    "name": "POP Series 7",
    "year": 2008,
    "era": "Diamond & Pearl",
    "setNumber": "POP7",
    "releaseOrder": 143,
    "images": [
      {
        "alt": "POP Series 7 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/049_pop_series_7.png",
        "localPath": "/pokemon-symbols/143-pop-series-7.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/049_pop_series_7_card_checklist.pdf"
  },
  {
    "id": "2007-pop6-144",
    "name": "POP Series 6",
    "year": 2007,
    "era": "Diamond & Pearl",
    "setNumber": "POP6",
    "releaseOrder": 144,
    "images": [
      {
        "alt": "POP Series 6 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/046_pop_series_6.png",
        "localPath": "/pokemon-symbols/144-pop-series-6.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/046_pop_series_6_checklist.pdf"
  },
  {
    "id": "2007-pop5-145",
    "name": "POP Series 5",
    "year": 2007,
    "era": "EX",
    "setNumber": "POP5",
    "releaseOrder": 145,
    "images": [
      {
        "alt": "POP Series 5 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/041_pop_series_5.png",
        "localPath": "/pokemon-symbols/145-pop-series-5.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/041_pop_series_5_checklist.pdf"
  },
  {
    "id": "2006-pop4-146",
    "name": "POP Series 4",
    "year": 2006,
    "era": "EX",
    "setNumber": "POP4",
    "releaseOrder": 146,
    "images": [
      {
        "alt": "POP Series 4 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/037_pop_series_4.png",
        "localPath": "/pokemon-symbols/146-pop-series-4.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/037_pop_series_4_checklist.pdf"
  },
  {
    "id": "2006-pop3-147",
    "name": "POP Series 3",
    "year": 2006,
    "era": "EX",
    "setNumber": "POP3",
    "releaseOrder": 147,
    "images": [
      {
        "alt": "POP Series 3 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/035_pop_series_3.png",
        "localPath": "/pokemon-symbols/147-pop-series-3.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/035_pop_series_3_checklist.pdf"
  },
  {
    "id": "2005-pop2-148",
    "name": "POP Series 2",
    "year": 2005,
    "era": "EX",
    "setNumber": "POP2",
    "releaseOrder": 148,
    "images": [
      {
        "alt": "POP Series 2 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/030_pop_series_2.png",
        "localPath": "/pokemon-symbols/148-pop-series-2.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/030_pop_series_2_checklist.pdf"
  },
  {
    "id": "2004-pop1-149",
    "name": "POP Series 1",
    "year": 2004,
    "era": "EX",
    "setNumber": "POP1",
    "releaseOrder": 149,
    "images": [
      {
        "alt": "POP Series 1 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/026_pop_series_1.png",
        "localPath": "/pokemon-symbols/149-pop-series-1.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/026_pop_series_1_checklist.pdf"
  },
  {
    "id": "2024-pps4-150",
    "name": "Prize Pack Series 4",
    "year": 2024,
    "era": "Scarlet & Violet",
    "setNumber": "PPS4",
    "releaseOrder": 150,
    "images": [
      {
        "alt": "Play Prize Pack Series Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/pps_prize_pack_series_set_symbol.png?v=1716309550",
        "localPath": "/pokemon-symbols/150-prize-pack-series-4.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/pps4_prize_pack_series_4_checklist.pdf?v=1716309053"
  },
  {
    "id": "2023-pps3-151",
    "name": "Prize Pack Series 3",
    "year": 2023,
    "era": "Sword & Shield",
    "setNumber": "PPS3",
    "releaseOrder": 151,
    "images": [
      {
        "alt": "Play Prize Pack Series Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/pps_prize_pack_series_set_symbol.png?v=1716309550",
        "localPath": "/pokemon-symbols/151-prize-pack-series-3.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/pps3_prize_pack_series_3_checklist.pdf?v=1716309053"
  },
  {
    "id": "2023-pps2-152",
    "name": "Prize Pack Series 2",
    "year": 2023,
    "era": "Sword & Shield",
    "setNumber": "PPS2",
    "releaseOrder": 152,
    "images": [
      {
        "alt": "Play Prize Pack Series Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/pps_prize_pack_series_set_symbol.png?v=1716309550",
        "localPath": "/pokemon-symbols/152-prize-pack-series-2.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/pps2_prize_pack_series_2_checklist.pdf?v=1716309053"
  },
  {
    "id": "2022-pps1-153",
    "name": "Prize Pack Series 1",
    "year": 2022,
    "era": "Sword & Shield",
    "setNumber": "PPS1",
    "releaseOrder": 153,
    "images": [
      {
        "alt": "Play Prize Pack Series Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/pps_prize_pack_series_set_symbol.png?v=1716309550",
        "localPath": "/pokemon-symbols/153-prize-pack-series-1.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/pps1_prize_pack_series_1_checklist.pdf?v=1716309053"
  },
  {
    "id": "2023-md12-154",
    "name": "McDonald’s Match Battle 2023",
    "year": 2023,
    "era": "Scarlet & Violet",
    "setNumber": "MD12",
    "releaseOrder": 154,
    "images": [
      {
        "alt": "Mcdonalds 2023 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD12_mcdonalds_2023_pokemon_set_symbol.png?v=1716308871",
        "localPath": "/pokemon-symbols/154-mcdonald-s-match-battle-2023.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2022-md11-155",
    "name": "McDonald’s Match Battle 2022",
    "year": 2022,
    "era": "Sword & Shield",
    "setNumber": "MD11",
    "releaseOrder": 155,
    "images": [
      {
        "alt": "Mcdonalds 2022 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD11_mcdonalds_2022_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/155-mcdonald-s-match-battle-2022.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2021-md10-156",
    "name": "McDonald’s 2021",
    "year": 2021,
    "era": "Sword & Shield",
    "setNumber": "MD10",
    "releaseOrder": 156,
    "images": [
      {
        "alt": "McDonalds 2021 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD10_mcdonalds_2021_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/156-mcdonald-s-2021.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD10_mcdonalds_2021_checklist.pdf"
  },
  {
    "id": "2019-md9-157",
    "name": "McDonald’s 2019",
    "year": 2019,
    "era": "Sun & Moon",
    "setNumber": "MD9",
    "releaseOrder": 157,
    "images": [
      {
        "alt": "McDonalds 2019 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD9_mcdonalds_2019.png",
        "localPath": "/pokemon-symbols/157-mcdonald-s-2019.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD9_mcdonalds_2019_checklist.pdf"
  },
  {
    "id": "2018-md8-158",
    "name": "McDonald’s 2018",
    "year": 2018,
    "era": "Sun & Moon",
    "setNumber": "MD8",
    "releaseOrder": 158,
    "images": [
      {
        "alt": "McDonalds 2018 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD8_mcdonalds_2018.png",
        "localPath": "/pokemon-symbols/158-mcdonald-s-2018.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD8_mcdonalds_2018_checklist.pdf"
  },
  {
    "id": "2017-md7-159",
    "name": "McDonald’s 2017",
    "year": 2017,
    "era": "Sun & Moon",
    "setNumber": "MD7",
    "releaseOrder": 159,
    "images": [
      {
        "alt": "McDonalds 2017 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD7_mcdonalds_2017_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/159-mcdonald-s-2017.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD7_mcdonalds_2017_checklist.pdf"
  },
  {
    "id": "2016-md6-160",
    "name": "McDonald’s 2016",
    "year": 2016,
    "era": "XY",
    "setNumber": "MD6",
    "releaseOrder": 160,
    "images": [
      {
        "alt": "McDonalds 2016 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD6_mcdonalds_2016.png",
        "localPath": "/pokemon-symbols/160-mcdonald-s-2016.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD6_mcdonalds_2016_checklist.pdf"
  },
  {
    "id": "2015-md5-161",
    "name": "McDonald’s 2015",
    "year": 2015,
    "era": "XY",
    "setNumber": "MD5",
    "releaseOrder": 161,
    "images": [
      {
        "alt": "McDonalds 2015 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD5_mcdonalds_2015.png",
        "localPath": "/pokemon-symbols/161-mcdonald-s-2015.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD5_mcdonalds_2015_checklist.pdf"
  },
  {
    "id": "2014-md4-162",
    "name": "McDonald’s 2014",
    "year": 2014,
    "era": "XY",
    "setNumber": "MD4",
    "releaseOrder": 162,
    "images": [
      {
        "alt": "McDonalds 2014 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD4_mcdonalds_2014.png",
        "localPath": "/pokemon-symbols/162-mcdonald-s-2014.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD4_mcdonalds_2014_checklist.pdf"
  },
  {
    "id": "2013-md3-163",
    "name": "McDonald’s 2013",
    "year": 2013,
    "era": "Black & White",
    "setNumber": "MD3",
    "releaseOrder": 163,
    "images": [
      {
        "alt": "McDonalds 2013 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD3_mcdonalds_2013.png",
        "localPath": "/pokemon-symbols/163-mcdonald-s-2013.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD3_mcdonalds_2013_checklist.pdf"
  },
  {
    "id": "2012-md2-164",
    "name": "McDonald’s 2012",
    "year": 2012,
    "era": "Black & White",
    "setNumber": "MD2",
    "releaseOrder": 164,
    "images": [
      {
        "alt": "McDonalds 2012 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD2_mcdonalds_2012.png",
        "localPath": "/pokemon-symbols/164-mcdonald-s-2012.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD2_mcdonalds_2012_checklist.pdf"
  },
  {
    "id": "2011-md1-165",
    "name": "McDonald’s 2011",
    "year": 2011,
    "era": "Black & White",
    "setNumber": "MD1",
    "releaseOrder": 165,
    "images": [
      {
        "alt": "McDonalds 2011 Set Symbol",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD1_mcdonalds_2011.png",
        "localPath": "/pokemon-symbols/165-mcdonald-s-2011.png"
      }
    ],
    "checklistUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/MD1_mcdonalds_2011_checklist.pdf"
  },
  {
    "id": "2017-tk10-166",
    "name": "Trainer Kit – Lycanroc & Alolan Raichu",
    "year": 2017,
    "era": "Sun & Moon",
    "setNumber": "TK10",
    "releaseOrder": 166,
    "images": [
      {
        "alt": "Trainer Kit – Lycanroc & Alolan Raichu symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/102_sun_moon_trainer_kit_lycanroc.png",
        "localPath": "/pokemon-symbols/166-trainer-kit-lycanroc-and-alolan-raichu.png"
      },
      {
        "alt": "Trainer Kit – Lycanroc & Alolan Raichu symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/102_sun_moon_trainer_kit_alolan_raichu.png",
        "localPath": "/pokemon-symbols/166-trainer-kit-lycanroc-and-alolan-raichu-2.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2016-tk9-167",
    "name": "Trainer Kit – Pikachu Libre & Suicune",
    "year": 2016,
    "era": "XY",
    "setNumber": "TK9",
    "releaseOrder": 167,
    "images": [
      {
        "alt": "Trainer Kit – Pikachu Libre & Suicune symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/096_xy_trainer_kit_pikachu_libre.png",
        "localPath": "/pokemon-symbols/167-trainer-kit-pikachu-libre-and-suicune.png"
      },
      {
        "alt": "Trainer Kit – Pikachu Libre & Suicune symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/096_xy_trainer_kit_suicune.png",
        "localPath": "/pokemon-symbols/167-trainer-kit-pikachu-libre-and-suicune-2.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2015-tk8-168",
    "name": "Trainer Kit – Latias & Latios",
    "year": 2015,
    "era": "XY",
    "setNumber": "TK8",
    "releaseOrder": 168,
    "images": [
      {
        "alt": "Trainer Kit – Latias & Latios symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/090_xy_trainer_kit_latias.png",
        "localPath": "/pokemon-symbols/168-trainer-kit-latias-and-latios.png"
      },
      {
        "alt": "Trainer Kit – Latias & Latios symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/090_xy_trainer_kit_latios.png",
        "localPath": "/pokemon-symbols/168-trainer-kit-latias-and-latios-2.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2014-tk7-169",
    "name": "Trainer Kit – Bisharp & Wigglytuff",
    "year": 2014,
    "era": "XY",
    "setNumber": "TK7",
    "releaseOrder": 169,
    "images": [
      {
        "alt": "Trainer Kit – Bisharp & Wigglytuff symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/087_xy_trainer_kit_bisharp.png",
        "localPath": "/pokemon-symbols/169-trainer-kit-bisharp-and-wigglytuff.png"
      },
      {
        "alt": "Trainer Kit – Bisharp & Wigglytuff symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/087_xy_trainer_kit_wigglytuff.png",
        "localPath": "/pokemon-symbols/169-trainer-kit-bisharp-and-wigglytuff-2.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2014-tk6-170",
    "name": "Trainer Kit – Sylveon & Noivern",
    "year": 2014,
    "era": "XY",
    "setNumber": "TK6",
    "releaseOrder": 170,
    "images": [
      {
        "alt": "Trainer Kit – Sylveon & Noivern symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/084_xy_trainer_kit_sylveon.png",
        "localPath": "/pokemon-symbols/170-trainer-kit-sylveon-and-noivern.png"
      },
      {
        "alt": "Trainer Kit – Sylveon & Noivern symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/084_xy_trainer_kit_noivern.png",
        "localPath": "/pokemon-symbols/170-trainer-kit-sylveon-and-noivern-2.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2011-tk5-171",
    "name": "Trainer Kit – Excadrill & Zoroark",
    "year": 2011,
    "era": "Black & White",
    "setNumber": "TK5",
    "releaseOrder": 171,
    "images": [
      {
        "alt": "Trainer Kit – Excadrill & Zoroark symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/069_excadrill_trainer_kit.png",
        "localPath": "/pokemon-symbols/171-trainer-kit-excadrill-and-zoroark.png"
      },
      {
        "alt": "Trainer Kit – Excadrill & Zoroark symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/069_zoroark_trainer_kit.png",
        "localPath": "/pokemon-symbols/171-trainer-kit-excadrill-and-zoroark-2.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2010-tk4-172",
    "name": "Trainer Kit – Gyarados & Raichu",
    "year": 2010,
    "era": "HeartGold & SoulSilver",
    "setNumber": "TK4",
    "releaseOrder": 172,
    "images": [
      {
        "alt": "Trainer Kit – Gyarados & Raichu symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/061_gyarados_trainer_kit_symbol.png",
        "localPath": "/pokemon-symbols/172-trainer-kit-gyarados-and-raichu.png"
      },
      {
        "alt": "Trainer Kit – Gyarados & Raichu symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/061_raichu_trainer_kit_symbol.png",
        "localPath": "/pokemon-symbols/172-trainer-kit-gyarados-and-raichu-2.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2007-tk3-173",
    "name": "Trainer Kit – Manaphy & Lucario",
    "year": 2007,
    "era": "Diamond & Pearl",
    "setNumber": "TK3",
    "releaseOrder": 173,
    "images": [
      {
        "alt": "Trainer Kit – Manaphy & Lucario symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/045_diamond_and_pearl_trainer_kit_manaphy_pokemon_set_symbol.webp",
        "localPath": "/pokemon-symbols/173-trainer-kit-manaphy-and-lucario.webp"
      },
      {
        "alt": "Trainer Kit – Manaphy & Lucario symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/045_diamond_and_pearl_trainer_kit_lucario_pokemon_set_symbol.png",
        "localPath": "/pokemon-symbols/173-trainer-kit-manaphy-and-lucario-2.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2006-tk2-174",
    "name": "EX Trainer Kit - Plusle & Minun",
    "year": 2006,
    "era": "EX",
    "setNumber": "TK2",
    "releaseOrder": 174,
    "images": [
      {
        "alt": "EX Trainer Kit - Plusle & Minun symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/034_ex_trainer_kit_2_plusle.png",
        "localPath": "/pokemon-symbols/174-ex-trainer-kit-plusle-and-minun.png"
      },
      {
        "alt": "EX Trainer Kit - Plusle & Minun symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/034_ex_trainer_kit_2_minun.png",
        "localPath": "/pokemon-symbols/174-ex-trainer-kit-plusle-and-minun-2.png"
      }
    ],
    "checklistUrl": ""
  },
  {
    "id": "2004-tk1-175",
    "name": "EX Trainer Kit - Latias & Latios",
    "year": 2004,
    "era": "EX",
    "setNumber": "TK1",
    "releaseOrder": 175,
    "images": [
      {
        "alt": "EX Trainer Kit - Latias & Latios symbol 1",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/023_trainer_kit_latias_set_symbol.png",
        "localPath": "/pokemon-symbols/175-ex-trainer-kit-latias-and-latios.png"
      },
      {
        "alt": "EX Trainer Kit - Latias & Latios symbol 2",
        "sourceUrl": "https://cdn.shopify.com/s/files/1/0663/9612/7517/files/023_trainer_kit_latios_set_symbol.png",
        "localPath": "/pokemon-symbols/175-ex-trainer-kit-latias-and-latios-2.png"
      }
    ],
    "checklistUrl": ""
  }
] satisfies PokemonSet[];
