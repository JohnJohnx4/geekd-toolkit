export type MtgSetSymbol = {
  alt: string;
  sourceUrl: string;
  localPath: string;
};

export type MtgSet = {
  id: string;
  name: string;
  year: number;
  releasedAt: string;
  code: string;
  setType: string;
  cardCount: number;
  releaseOrder: number;
  icon: MtgSetSymbol;
  scryfallUrl: string;
};

export const mtgSetSymbolSource = "https://scryfall.com/docs/api/sets";

export const mtgSets = [
  {
    "id": "a38c10be-90b1-4bb9-bd74-46784a751ac3",
    "name": "Star Trek Commander",
    "year": 2026,
    "releasedAt": "2026-11-20",
    "code": "TRC",
    "setType": "Commander",
    "cardCount": 1,
    "releaseOrder": 1,
    "icon": {
      "alt": "Star Trek Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0001-trc-star-trek-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/trc"
  },
  {
    "id": "b47039dc-da5a-448c-8feb-e77d458108a6",
    "name": "Star Trek",
    "year": 2026,
    "releasedAt": "2026-11-20",
    "code": "TRK",
    "setType": "Expansion",
    "cardCount": 0,
    "releaseOrder": 2,
    "icon": {
      "alt": "Star Trek set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0002-trk-star-trek.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/trk"
  },
  {
    "id": "6595985e-39cf-4ca3-b43d-dd3e64749fdc",
    "name": "Reality Fracture",
    "year": 2026,
    "releasedAt": "2026-10-02",
    "code": "FRA",
    "setType": "Expansion",
    "cardCount": 7,
    "releaseOrder": 3,
    "icon": {
      "alt": "Reality Fracture set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fra.svg?1780891200",
      "localPath": "/mtg-symbols/0003-fra-reality-fracture.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fra"
  },
  {
    "id": "59218c23-cb7a-4fde-9cff-3f2f71af1308",
    "name": "The Hobbit",
    "year": 2026,
    "releasedAt": "2026-08-14",
    "code": "HOB",
    "setType": "Expansion",
    "cardCount": 39,
    "releaseOrder": 4,
    "icon": {
      "alt": "The Hobbit set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hob.svg?1780891200",
      "localPath": "/mtg-symbols/0004-hob-the-hobbit.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/hob"
  },
  {
    "id": "a185c905-5359-4f40-85c3-a3eae2ca4ff0",
    "name": "The Hobbit Commander",
    "year": 2026,
    "releasedAt": "2026-08-14",
    "code": "HOC",
    "setType": "Commander",
    "cardCount": 7,
    "releaseOrder": 5,
    "icon": {
      "alt": "The Hobbit Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hoc.svg?1780891200",
      "localPath": "/mtg-symbols/0005-hoc-the-hobbit-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/hoc"
  },
  {
    "id": "4be6c17a-b478-4a20-b1a7-4b7905323074",
    "name": "The Hobbit Tokens",
    "year": 2026,
    "releasedAt": "2026-08-14",
    "code": "THOB",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 6,
    "icon": {
      "alt": "The Hobbit Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hob.svg?1780891200",
      "localPath": "/mtg-symbols/0006-thob-the-hobbit-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/thob"
  },
  {
    "id": "5af51a69-f5a9-4151-8bc7-69c159d010e0",
    "name": "Marvel Super Heroes Jumpstart Front Cards",
    "year": 2026,
    "releasedAt": "2026-06-26",
    "code": "FMSC",
    "setType": "Memorabilia",
    "cardCount": 61,
    "releaseOrder": 7,
    "icon": {
      "alt": "Marvel Super Heroes Jumpstart Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/msc.svg?1780891200",
      "localPath": "/mtg-symbols/0007-fmsc-marvel-super-heroes-jumpstart-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fmsc"
  },
  {
    "id": "9d739461-c5ac-43a1-af41-3d5a585b5c8d",
    "name": "Marvel Super Heroes Commander",
    "year": 2026,
    "releasedAt": "2026-06-26",
    "code": "MSC",
    "setType": "Commander",
    "cardCount": 645,
    "releaseOrder": 8,
    "icon": {
      "alt": "Marvel Super Heroes Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/msc.svg?1780891200",
      "localPath": "/mtg-symbols/0008-msc-marvel-super-heroes-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/msc"
  },
  {
    "id": "ba9bf625-681c-4a4e-ab48-399b2fecac6b",
    "name": "Marvel Super Heroes",
    "year": 2026,
    "releasedAt": "2026-06-26",
    "code": "MSH",
    "setType": "Expansion",
    "cardCount": 453,
    "releaseOrder": 9,
    "icon": {
      "alt": "Marvel Super Heroes set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/msh.svg?1780891200",
      "localPath": "/mtg-symbols/0009-msh-marvel-super-heroes.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/msh"
  },
  {
    "id": "1a555c51-d5da-4f1d-ac1c-5cce81d5d8dc",
    "name": "Marvel Super Heroes Commander Tokens",
    "year": 2026,
    "releasedAt": "2026-06-26",
    "code": "TMSC",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 10,
    "icon": {
      "alt": "Marvel Super Heroes Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/msc.svg?1780891200",
      "localPath": "/mtg-symbols/0010-tmsc-marvel-super-heroes-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmsc"
  },
  {
    "id": "1226146b-024f-4456-be60-edf06fc054df",
    "name": "Marvel Super Heroes Tokens",
    "year": 2026,
    "releasedAt": "2026-06-26",
    "code": "TMSH",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 11,
    "icon": {
      "alt": "Marvel Super Heroes Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/msh.svg?1780891200",
      "localPath": "/mtg-symbols/0011-tmsh-marvel-super-heroes-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmsh"
  },
  {
    "id": "2fd19b90-7ba4-4f33-b876-3367d15ab426",
    "name": "Alchemy: Secrets of Strixhaven",
    "year": 2026,
    "releasedAt": "2026-05-19",
    "code": "YSOS",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 12,
    "icon": {
      "alt": "Alchemy: Secrets of Strixhaven set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y26.svg?1780891200",
      "localPath": "/mtg-symbols/0012-ysos-alchemy-secrets-of-strixhaven.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ysos"
  },
  {
    "id": "16b35ba7-ab4d-4d0f-8d29-4de7d30d0e22",
    "name": "Secrets of Strixhaven Art Series",
    "year": 2026,
    "releasedAt": "2026-04-24",
    "code": "ASOS",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 13,
    "icon": {
      "alt": "Secrets of Strixhaven Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sos.svg?1780891200",
      "localPath": "/mtg-symbols/0013-asos-secrets-of-strixhaven-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/asos"
  },
  {
    "id": "ad780626-4b50-4b92-b5c1-49e060bd597d",
    "name": "Secrets of Strixhaven Promos",
    "year": 2026,
    "releasedAt": "2026-04-24",
    "code": "PSOS",
    "setType": "Promo",
    "cardCount": 80,
    "releaseOrder": 14,
    "icon": {
      "alt": "Secrets of Strixhaven Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sos.svg?1780891200",
      "localPath": "/mtg-symbols/0014-psos-secrets-of-strixhaven-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psos"
  },
  {
    "id": "f57497ce-4c8f-45e3-9cd9-395148357189",
    "name": "Secrets of Strixhaven Mystical Archive",
    "year": 2026,
    "releasedAt": "2026-04-24",
    "code": "SOA",
    "setType": "Masterpiece",
    "cardCount": 195,
    "releaseOrder": 15,
    "icon": {
      "alt": "Secrets of Strixhaven Mystical Archive set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/soa.svg?1780891200",
      "localPath": "/mtg-symbols/0015-soa-secrets-of-strixhaven-mystical-archive.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/soa"
  },
  {
    "id": "97fab8d1-480a-419d-ab14-663968e29b9c",
    "name": "Secrets of Strixhaven Commander",
    "year": 2026,
    "releasedAt": "2026-04-24",
    "code": "SOC",
    "setType": "Commander",
    "cardCount": 426,
    "releaseOrder": 16,
    "icon": {
      "alt": "Secrets of Strixhaven Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/soc.svg?1780891200",
      "localPath": "/mtg-symbols/0016-soc-secrets-of-strixhaven-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/soc"
  },
  {
    "id": "e487c9ce-5e76-4756-bcd0-e4b7db5c38a3",
    "name": "Secrets of Strixhaven",
    "year": 2026,
    "releasedAt": "2026-04-24",
    "code": "SOS",
    "setType": "Expansion",
    "cardCount": 368,
    "releaseOrder": 17,
    "icon": {
      "alt": "Secrets of Strixhaven set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sos.svg?1780891200",
      "localPath": "/mtg-symbols/0017-sos-secrets-of-strixhaven.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sos"
  },
  {
    "id": "cb590d57-927c-437a-934c-7f774881d1c9",
    "name": "Secrets of Strixhaven Commander Tokens",
    "year": 2026,
    "releasedAt": "2026-04-24",
    "code": "TSOC",
    "setType": "Token",
    "cardCount": 30,
    "releaseOrder": 18,
    "icon": {
      "alt": "Secrets of Strixhaven Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/soc.svg?1780891200",
      "localPath": "/mtg-symbols/0018-tsoc-secrets-of-strixhaven-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tsoc"
  },
  {
    "id": "2c5a240e-9938-418e-a85d-8c4b098144bc",
    "name": "Secrets of Strixhaven Tokens",
    "year": 2026,
    "releasedAt": "2026-04-24",
    "code": "TSOS",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 19,
    "icon": {
      "alt": "Secrets of Strixhaven Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sos.svg?1780891200",
      "localPath": "/mtg-symbols/0019-tsos-secrets-of-strixhaven-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tsos"
  },
  {
    "id": "27d8aebd-ed26-42a9-8f32-2d52d68b9305",
    "name": "Teenage Mutant Ninja Turtles Art Series",
    "year": 2026,
    "releasedAt": "2026-03-06",
    "code": "ATMT",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 20,
    "icon": {
      "alt": "Teenage Mutant Ninja Turtles Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tmt.svg?1780891200",
      "localPath": "/mtg-symbols/0020-atmt-teenage-mutant-ninja-turtles-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/atmt"
  },
  {
    "id": "02e8ceb3-e98d-443d-bc52-52e91ff0f2e9",
    "name": "Teenage Mutant Ninja Turtles Eternal Front Cards",
    "year": 2026,
    "releasedAt": "2026-03-06",
    "code": "FTMC",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 21,
    "icon": {
      "alt": "Teenage Mutant Ninja Turtles Eternal Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tmc.svg?1780891200",
      "localPath": "/mtg-symbols/0021-ftmc-teenage-mutant-ninja-turtles-eternal-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ftmc"
  },
  {
    "id": "59aecbd0-4c5b-4dd7-a0f2-ba16b4403c56",
    "name": "Teenage Mutant Ninja Turtles Source Material",
    "year": 2026,
    "releasedAt": "2026-03-06",
    "code": "PZA",
    "setType": "Masterpiece",
    "cardCount": 20,
    "releaseOrder": 22,
    "icon": {
      "alt": "Teenage Mutant Ninja Turtles Source Material set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pza.svg?1780891200",
      "localPath": "/mtg-symbols/0022-pza-teenage-mutant-ninja-turtles-source-material.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pza"
  },
  {
    "id": "178a07bb-cd54-4443-8b62-675e0c52cfe3",
    "name": "Teenage Mutant Ninja Turtles Eternal",
    "year": 2026,
    "releasedAt": "2026-03-06",
    "code": "TMC",
    "setType": "Eternal",
    "cardCount": 132,
    "releaseOrder": 23,
    "icon": {
      "alt": "Teenage Mutant Ninja Turtles Eternal set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tmc.svg?1780891200",
      "localPath": "/mtg-symbols/0023-tmc-teenage-mutant-ninja-turtles-eternal.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmc"
  },
  {
    "id": "03990f52-1d8a-4ce8-828a-c9bf633f0de6",
    "name": "Teenage Mutant Ninja Turtles",
    "year": 2026,
    "releasedAt": "2026-03-06",
    "code": "TMT",
    "setType": "Expansion",
    "cardCount": 320,
    "releaseOrder": 24,
    "icon": {
      "alt": "Teenage Mutant Ninja Turtles set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tmt.svg?1780891200",
      "localPath": "/mtg-symbols/0024-tmt-teenage-mutant-ninja-turtles.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmt"
  },
  {
    "id": "1b3d029e-609e-44de-a210-8c6a531dffc4",
    "name": "Teenage Mutant Ninja Turtles Eternal Tokens",
    "year": 2026,
    "releasedAt": "2026-03-06",
    "code": "TTMC",
    "setType": "Token",
    "cardCount": 31,
    "releaseOrder": 25,
    "icon": {
      "alt": "Teenage Mutant Ninja Turtles Eternal Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tmc.svg?1780891200",
      "localPath": "/mtg-symbols/0025-ttmc-teenage-mutant-ninja-turtles-eternal-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ttmc"
  },
  {
    "id": "914ad085-2264-40ad-84cb-b7e3d63bb5fe",
    "name": "Teenage Mutant Ninja Turtles Tokens",
    "year": 2026,
    "releasedAt": "2026-03-06",
    "code": "TTMT",
    "setType": "Token",
    "cardCount": 10,
    "releaseOrder": 26,
    "icon": {
      "alt": "Teenage Mutant Ninja Turtles Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tmt.svg?1780891200",
      "localPath": "/mtg-symbols/0026-ttmt-teenage-mutant-ninja-turtles-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ttmt"
  },
  {
    "id": "20083173-c2da-4009-a6bd-5d56da78968d",
    "name": "Year of the Horse 2026",
    "year": 2026,
    "releasedAt": "2026-02-17",
    "code": "PL26",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 27,
    "icon": {
      "alt": "Year of the Horse 2026 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0027-pl26-year-of-the-horse-2026.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pl26"
  },
  {
    "id": "1898a31a-88cb-48ef-9d6b-f91822e509b7",
    "name": "Alchemy: Lorwyn Eclipsed",
    "year": 2026,
    "releasedAt": "2026-02-03",
    "code": "YECL",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 28,
    "icon": {
      "alt": "Alchemy: Lorwyn Eclipsed set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y26.svg?1780891200",
      "localPath": "/mtg-symbols/0028-yecl-alchemy-lorwyn-eclipsed.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/yecl"
  },
  {
    "id": "dc87145e-8510-47bf-989f-330b6156ea8c",
    "name": "Lorwyn Eclipsed Art Series",
    "year": 2026,
    "releasedAt": "2026-01-23",
    "code": "AECL",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 29,
    "icon": {
      "alt": "Lorwyn Eclipsed Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ecl.svg?1780891200",
      "localPath": "/mtg-symbols/0029-aecl-lorwyn-eclipsed-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aecl"
  },
  {
    "id": "805b5a0c-f8bb-4555-86ea-eb9ec36a011a",
    "name": "Lorwyn Eclipsed Commander",
    "year": 2026,
    "releasedAt": "2026-01-23",
    "code": "ECC",
    "setType": "Commander",
    "cardCount": 176,
    "releaseOrder": 30,
    "icon": {
      "alt": "Lorwyn Eclipsed Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ecc.svg?1780891200",
      "localPath": "/mtg-symbols/0030-ecc-lorwyn-eclipsed-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ecc"
  },
  {
    "id": "5d293ad8-a749-4725-bd5c-c4e1db828bd0",
    "name": "Lorwyn Eclipsed",
    "year": 2026,
    "releasedAt": "2026-01-23",
    "code": "ECL",
    "setType": "Expansion",
    "cardCount": 408,
    "releaseOrder": 31,
    "icon": {
      "alt": "Lorwyn Eclipsed set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ecl.svg?1780891200",
      "localPath": "/mtg-symbols/0031-ecl-lorwyn-eclipsed.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ecl"
  },
  {
    "id": "7b7b61ef-e1f4-4ac6-818e-c3489d954298",
    "name": "Lorwyn Eclipsed Promos",
    "year": 2026,
    "releasedAt": "2026-01-23",
    "code": "PECL",
    "setType": "Promo",
    "cardCount": 87,
    "releaseOrder": 32,
    "icon": {
      "alt": "Lorwyn Eclipsed Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ecl.svg?1780891200",
      "localPath": "/mtg-symbols/0032-pecl-lorwyn-eclipsed-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pecl"
  },
  {
    "id": "8c48e6a3-51df-467b-b251-aaa17095787b",
    "name": "Lorwyn Eclipsed Commander Tokens",
    "year": 2026,
    "releasedAt": "2026-01-23",
    "code": "TECC",
    "setType": "Token",
    "cardCount": 13,
    "releaseOrder": 33,
    "icon": {
      "alt": "Lorwyn Eclipsed Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ecc.svg?1780891200",
      "localPath": "/mtg-symbols/0033-tecc-lorwyn-eclipsed-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tecc"
  },
  {
    "id": "f5380338-65e9-4885-8989-b23350cd27de",
    "name": "Lorwyn Eclipsed Tokens",
    "year": 2026,
    "releasedAt": "2026-01-23",
    "code": "TECL",
    "setType": "Token",
    "cardCount": 13,
    "releaseOrder": 34,
    "icon": {
      "alt": "Lorwyn Eclipsed Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ecl.svg?1780891200",
      "localPath": "/mtg-symbols/0034-tecl-lorwyn-eclipsed-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tecl"
  },
  {
    "id": "a33565f7-90cd-43d7-83cf-84d50ee2add4",
    "name": "MagicFest 2026",
    "year": 2026,
    "releasedAt": "2026-01-01",
    "code": "PF26",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 35,
    "icon": {
      "alt": "MagicFest 2026 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0035-pf26-magicfest-2026.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pf26"
  },
  {
    "id": "6e547347-15c9-4756-b176-74ed3cd18fb2",
    "name": "Wizards Play Network 2026",
    "year": 2026,
    "releasedAt": "2026-01-01",
    "code": "PW26",
    "setType": "Promo",
    "cardCount": 16,
    "releaseOrder": 36,
    "icon": {
      "alt": "Wizards Play Network 2026 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0036-pw26-wizards-play-network-2026.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pw26"
  },
  {
    "id": "ff17e3ce-4121-48bf-9463-fa6d3781bb38",
    "name": "Final Fantasy Scene Box",
    "year": 2025,
    "releasedAt": "2025-12-05",
    "code": "AFIC",
    "setType": "Memorabilia",
    "cardCount": 24,
    "releaseOrder": 37,
    "icon": {
      "alt": "Final Fantasy Scene Box set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fic.svg?1780891200",
      "localPath": "/mtg-symbols/0037-afic-final-fantasy-scene-box.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/afic"
  },
  {
    "id": "8b34342c-6a98-482f-82bf-358e500fd8ff",
    "name": "Avatar: the Last Airbender Art Series",
    "year": 2025,
    "releasedAt": "2025-11-21",
    "code": "ATLA",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 38,
    "icon": {
      "alt": "Avatar: the Last Airbender Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tla.svg?1780891200",
      "localPath": "/mtg-symbols/0038-atla-avatar-the-last-airbender-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/atla"
  },
  {
    "id": "73e4a8a8-2b32-4832-bb09-9c94b47a2b2b",
    "name": "Avatar: the Last Airbender Eternal Art Series",
    "year": 2025,
    "releasedAt": "2025-11-21",
    "code": "ATLE",
    "setType": "Memorabilia",
    "cardCount": 12,
    "releaseOrder": 39,
    "icon": {
      "alt": "Avatar: the Last Airbender Eternal Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tle.svg?1780891200",
      "localPath": "/mtg-symbols/0039-atle-avatar-the-last-airbender-eternal-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/atle"
  },
  {
    "id": "e8aa0534-a9fc-4954-8f4e-d4b3710fc3cf",
    "name": "Avatar: The Last Airbender Beginner Box Front Cards",
    "year": 2025,
    "releasedAt": "2025-11-21",
    "code": "FTLA",
    "setType": "Memorabilia",
    "cardCount": 10,
    "releaseOrder": 40,
    "icon": {
      "alt": "Avatar: The Last Airbender Beginner Box Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tla.svg?1780891200",
      "localPath": "/mtg-symbols/0040-ftla-avatar-the-last-airbender-beginner-box-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ftla"
  },
  {
    "id": "95083f2b-0a39-4878-8c18-baa51aa22677",
    "name": "Avatar: The Last Airbender Jumpstart Front Cards",
    "year": 2025,
    "releasedAt": "2025-11-21",
    "code": "JTLA",
    "setType": "Memorabilia",
    "cardCount": 46,
    "releaseOrder": 41,
    "icon": {
      "alt": "Avatar: The Last Airbender Jumpstart Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tla.svg?1780891200",
      "localPath": "/mtg-symbols/0041-jtla-avatar-the-last-airbender-jumpstart-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/jtla"
  },
  {
    "id": "60e818be-1263-4006-a196-7011fb9076c8",
    "name": "Avatar: The Last Airbender Promos",
    "year": 2025,
    "releasedAt": "2025-11-21",
    "code": "PTLA",
    "setType": "Promo",
    "cardCount": 80,
    "releaseOrder": 42,
    "icon": {
      "alt": "Avatar: The Last Airbender Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tla.svg?1780891200",
      "localPath": "/mtg-symbols/0042-ptla-avatar-the-last-airbender-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptla"
  },
  {
    "id": "118f7e64-5caa-4cb7-99a8-184f4d3a7422",
    "name": "Avatar: The Last Airbender",
    "year": 2025,
    "releasedAt": "2025-11-21",
    "code": "TLA",
    "setType": "Expansion",
    "cardCount": 394,
    "releaseOrder": 43,
    "icon": {
      "alt": "Avatar: The Last Airbender set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tla.svg?1780891200",
      "localPath": "/mtg-symbols/0043-tla-avatar-the-last-airbender.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tla"
  },
  {
    "id": "a75e6ceb-d62c-4063-8e96-f269e3a0b025",
    "name": "Avatar: The Last Airbender Eternal",
    "year": 2025,
    "releasedAt": "2025-11-21",
    "code": "TLE",
    "setType": "Eternal",
    "cardCount": 317,
    "releaseOrder": 44,
    "icon": {
      "alt": "Avatar: The Last Airbender Eternal set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tle.svg?1780891200",
      "localPath": "/mtg-symbols/0044-tle-avatar-the-last-airbender-eternal.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tle"
  },
  {
    "id": "89b3c0da-5cc2-4895-b592-36e754f856b8",
    "name": "Avatar: The Last Airbender Tokens",
    "year": 2025,
    "releasedAt": "2025-11-21",
    "code": "TTLA",
    "setType": "Token",
    "cardCount": 22,
    "releaseOrder": 45,
    "icon": {
      "alt": "Avatar: The Last Airbender Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tla.svg?1780891200",
      "localPath": "/mtg-symbols/0045-ttla-avatar-the-last-airbender-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ttla"
  },
  {
    "id": "746b850e-380b-45a3-90c7-32a660789828",
    "name": "Avatar: The Last Airbender Eternal Tokens",
    "year": 2025,
    "releasedAt": "2025-11-21",
    "code": "TTLE",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 46,
    "icon": {
      "alt": "Avatar: The Last Airbender Eternal Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tle.svg?1780891200",
      "localPath": "/mtg-symbols/0046-ttle-avatar-the-last-airbender-eternal-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ttle"
  },
  {
    "id": "dd42508d-39e5-46f3-a5a9-eb7bd0002878",
    "name": "Marvel Legends Series Inserts",
    "year": 2025,
    "releasedAt": "2025-09-30",
    "code": "LMAR",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 47,
    "icon": {
      "alt": "Marvel Legends Series Inserts set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0047-lmar-marvel-legends-series-inserts.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/lmar"
  },
  {
    "id": "017a97c4-45f6-4184-95ce-f6e545e9ee17",
    "name": "Marvel's Spider-Man Art Series",
    "year": 2025,
    "releasedAt": "2025-09-26",
    "code": "ASPM",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 48,
    "icon": {
      "alt": "Marvel's Spider-Man Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/spm.svg?1780891200",
      "localPath": "/mtg-symbols/0048-aspm-marvel-s-spider-man-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aspm"
  },
  {
    "id": "159f2a38-6a67-48fb-b583-2538554d70a3",
    "name": "Marvel Universe",
    "year": 2025,
    "releasedAt": "2025-09-26",
    "code": "MAR",
    "setType": "Masterpiece",
    "cardCount": 100,
    "releaseOrder": 49,
    "icon": {
      "alt": "Marvel Universe set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mar.svg?1780891200",
      "localPath": "/mtg-symbols/0049-mar-marvel-universe.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mar"
  },
  {
    "id": "bc339a49-60cb-4500-aede-0a887b693297",
    "name": "Marvel's Spider-Man Promos",
    "year": 2025,
    "releasedAt": "2025-09-26",
    "code": "PSPM",
    "setType": "Promo",
    "cardCount": 68,
    "releaseOrder": 50,
    "icon": {
      "alt": "Marvel's Spider-Man Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/spm.svg?1780891200",
      "localPath": "/mtg-symbols/0050-pspm-marvel-s-spider-man-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pspm"
  },
  {
    "id": "57f25bcf-c541-418d-87c2-57361d57d35e",
    "name": "Marvel's Spider-Man Eternal",
    "year": 2025,
    "releasedAt": "2025-09-26",
    "code": "SPE",
    "setType": "Eternal",
    "cardCount": 26,
    "releaseOrder": 51,
    "icon": {
      "alt": "Marvel's Spider-Man Eternal set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/spe.svg?1780891200",
      "localPath": "/mtg-symbols/0051-spe-marvel-s-spider-man-eternal.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/spe"
  },
  {
    "id": "a1c7b891-9e96-434c-9994-be58b62b27f1",
    "name": "Marvel's Spider-Man",
    "year": 2025,
    "releasedAt": "2025-09-26",
    "code": "SPM",
    "setType": "Expansion",
    "cardCount": 286,
    "releaseOrder": 52,
    "icon": {
      "alt": "Marvel's Spider-Man set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/spm.svg?1780891200",
      "localPath": "/mtg-symbols/0052-spm-marvel-s-spider-man.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/spm"
  },
  {
    "id": "6a930c14-c228-45d6-8580-05218153815a",
    "name": "Marvel's Spider-Man Tokens",
    "year": 2025,
    "releasedAt": "2025-09-26",
    "code": "TSPM",
    "setType": "Token",
    "cardCount": 7,
    "releaseOrder": 53,
    "icon": {
      "alt": "Marvel's Spider-Man Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/spm.svg?1780891200",
      "localPath": "/mtg-symbols/0053-tspm-marvel-s-spider-man-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tspm"
  },
  {
    "id": "55244c74-8af5-429e-ae99-2172acd7830b",
    "name": "Arena Anthology 3",
    "year": 2025,
    "releasedAt": "2025-09-23",
    "code": "AA3",
    "setType": "Box",
    "cardCount": 25,
    "releaseOrder": 54,
    "icon": {
      "alt": "Arena Anthology 3 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0054-aa3-arena-anthology-3.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aa3"
  },
  {
    "id": "67354f6b-6620-4cdc-ad3e-8bc0f3bcc614",
    "name": "Arena Anthology 4",
    "year": 2025,
    "releasedAt": "2025-09-23",
    "code": "AA4",
    "setType": "Box",
    "cardCount": 28,
    "releaseOrder": 55,
    "icon": {
      "alt": "Arena Anthology 4 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0055-aa4-arena-anthology-4.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aa4"
  },
  {
    "id": "8de005d3-cce0-4cc3-ae71-aa66f1d38487",
    "name": "Through the Omenpaths",
    "year": 2025,
    "releasedAt": "2025-09-23",
    "code": "OM1",
    "setType": "Expansion",
    "cardCount": 189,
    "releaseOrder": 56,
    "icon": {
      "alt": "Through the Omenpaths set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/om1.svg?1780891200",
      "localPath": "/mtg-symbols/0056-om1-through-the-omenpaths.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/om1"
  },
  {
    "id": "9ce7c941-1aa8-4455-aa05-493196674aed",
    "name": "Through the Omenpaths Bonus Sheet",
    "year": 2025,
    "releasedAt": "2025-09-23",
    "code": "OMB",
    "setType": "Masterpiece",
    "cardCount": 40,
    "releaseOrder": 57,
    "icon": {
      "alt": "Through the Omenpaths Bonus Sheet set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/omb.svg?1780891200",
      "localPath": "/mtg-symbols/0057-omb-through-the-omenpaths-bonus-sheet.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/omb"
  },
  {
    "id": "ecbf5a1a-ccdd-4279-856c-928977171f05",
    "name": "2023 Heroes of the Realm",
    "year": 2025,
    "releasedAt": "2025-08-24",
    "code": "PH23",
    "setType": "Funny",
    "cardCount": 2,
    "releaseOrder": 58,
    "icon": {
      "alt": "2023 Heroes of the Realm set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0058-ph23-2023-heroes-of-the-realm.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ph23"
  },
  {
    "id": "f89f6503-2fba-4920-a97d-6d55a2f6f4d8",
    "name": "Arena Anthology 1",
    "year": 2025,
    "releasedAt": "2025-08-19",
    "code": "AA1",
    "setType": "Box",
    "cardCount": 26,
    "releaseOrder": 59,
    "icon": {
      "alt": "Arena Anthology 1 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0059-aa1-arena-anthology-1.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aa1"
  },
  {
    "id": "fd3518b9-cf68-447a-a71c-67d36bc56c4d",
    "name": "Arena Anthology 2",
    "year": 2025,
    "releasedAt": "2025-08-19",
    "code": "AA2",
    "setType": "Box",
    "cardCount": 25,
    "releaseOrder": 60,
    "icon": {
      "alt": "Arena Anthology 2 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0060-aa2-arena-anthology-2.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aa2"
  },
  {
    "id": "9383ab27-10b2-49ce-9004-61587a6a477b",
    "name": "Alchemy: Edge of Eternities",
    "year": 2025,
    "releasedAt": "2025-08-19",
    "code": "YEOE",
    "setType": "Alchemy",
    "cardCount": 40,
    "releaseOrder": 61,
    "icon": {
      "alt": "Alchemy: Edge of Eternities set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y25.svg?1780891200",
      "localPath": "/mtg-symbols/0061-yeoe-alchemy-edge-of-eternities.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/yeoe"
  },
  {
    "id": "96ca2500-2ba9-4d63-b73c-608096f69db5",
    "name": "Edge of Eternities Art Series",
    "year": 2025,
    "releasedAt": "2025-08-01",
    "code": "AEOE",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 62,
    "icon": {
      "alt": "Edge of Eternities Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eoe.svg?1780891200",
      "localPath": "/mtg-symbols/0062-aeoe-edge-of-eternities-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aeoe"
  },
  {
    "id": "b6ec8c6b-b4e6-4cb4-84d6-06234ace3b44",
    "name": "Edge of Eternities Commander",
    "year": 2025,
    "releasedAt": "2025-08-01",
    "code": "EOC",
    "setType": "Commander",
    "cardCount": 191,
    "releaseOrder": 63,
    "icon": {
      "alt": "Edge of Eternities Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eoc.svg?1780891200",
      "localPath": "/mtg-symbols/0063-eoc-edge-of-eternities-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/eoc"
  },
  {
    "id": "452951cf-378b-4472-b7fe-572fe2af2ac0",
    "name": "Edge of Eternities",
    "year": 2025,
    "releasedAt": "2025-08-01",
    "code": "EOE",
    "setType": "Expansion",
    "cardCount": 400,
    "releaseOrder": 64,
    "icon": {
      "alt": "Edge of Eternities set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eoe.svg?1780891200",
      "localPath": "/mtg-symbols/0064-eoe-edge-of-eternities.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/eoe"
  },
  {
    "id": "538306e5-d40a-44c0-b9df-2f6c4b130c9f",
    "name": "Edge of Eternities: Stellar Sights",
    "year": 2025,
    "releasedAt": "2025-08-01",
    "code": "EOS",
    "setType": "Masterpiece",
    "cardCount": 180,
    "releaseOrder": 65,
    "icon": {
      "alt": "Edge of Eternities: Stellar Sights set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eos.svg?1780891200",
      "localPath": "/mtg-symbols/0065-eos-edge-of-eternities-stellar-sights.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/eos"
  },
  {
    "id": "0a8482de-062d-460f-8558-39044fed4a24",
    "name": "The Big Score Promos",
    "year": 2025,
    "releasedAt": "2025-08-01",
    "code": "PBIG",
    "setType": "Promo",
    "cardCount": 14,
    "releaseOrder": 66,
    "icon": {
      "alt": "The Big Score Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/big.svg?1780891200",
      "localPath": "/mtg-symbols/0066-pbig-the-big-score-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pbig"
  },
  {
    "id": "7163fd7f-bf43-4380-a718-de52ba50bb78",
    "name": "Edge of Eternities Promos",
    "year": 2025,
    "releasedAt": "2025-08-01",
    "code": "PEOE",
    "setType": "Promo",
    "cardCount": 160,
    "releaseOrder": 67,
    "icon": {
      "alt": "Edge of Eternities Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eoe.svg?1780891200",
      "localPath": "/mtg-symbols/0067-peoe-edge-of-eternities-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/peoe"
  },
  {
    "id": "a447114b-d795-4222-b903-b578f7ce8c23",
    "name": "Edge of Eternities Commander Tokens",
    "year": 2025,
    "releasedAt": "2025-08-01",
    "code": "TEOC",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 68,
    "icon": {
      "alt": "Edge of Eternities Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eoc.svg?1780891200",
      "localPath": "/mtg-symbols/0068-teoc-edge-of-eternities-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/teoc"
  },
  {
    "id": "8c318768-896e-4388-9211-48462b98245e",
    "name": "Edge of Eternities Tokens",
    "year": 2025,
    "releasedAt": "2025-08-01",
    "code": "TEOE",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 69,
    "icon": {
      "alt": "Edge of Eternities Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eoe.svg?1780891200",
      "localPath": "/mtg-symbols/0069-teoe-edge-of-eternities-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/teoe"
  },
  {
    "id": "77b0f33a-10f6-4559-b53a-1c9f0e15149c",
    "name": "Final Fantasy Art Series",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "AFIN",
    "setType": "Memorabilia",
    "cardCount": 53,
    "releaseOrder": 70,
    "icon": {
      "alt": "Final Fantasy Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fin.svg?1780891200",
      "localPath": "/mtg-symbols/0070-afin-final-fantasy-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/afin"
  },
  {
    "id": "5f2176db-3c44-459d-8a57-7c51e770a476",
    "name": "Final Fantasy: Through the Ages",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "FCA",
    "setType": "Masterpiece",
    "cardCount": 66,
    "releaseOrder": 71,
    "icon": {
      "alt": "Final Fantasy: Through the Ages set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fca.svg?1780891200",
      "localPath": "/mtg-symbols/0071-fca-final-fantasy-through-the-ages.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fca"
  },
  {
    "id": "30659956-4558-4cbf-a65f-34cd00c89579",
    "name": "Final Fantasy Commander",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "FIC",
    "setType": "Commander",
    "cardCount": 486,
    "releaseOrder": 72,
    "icon": {
      "alt": "Final Fantasy Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fic.svg?1780891200",
      "localPath": "/mtg-symbols/0072-fic-final-fantasy-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fic"
  },
  {
    "id": "d7beb4b7-e1ff-4d35-ab07-5700f17ea1ea",
    "name": "Final Fantasy",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "FIN",
    "setType": "Expansion",
    "cardCount": 599,
    "releaseOrder": 73,
    "icon": {
      "alt": "Final Fantasy set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fin.svg?1780891200",
      "localPath": "/mtg-symbols/0073-fin-final-fantasy.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fin"
  },
  {
    "id": "ff405aba-0309-4694-a6d5-e657024f7ad0",
    "name": "Final Fantasy Promos",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "PFIN",
    "setType": "Promo",
    "cardCount": 94,
    "releaseOrder": 74,
    "icon": {
      "alt": "Final Fantasy Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fin.svg?1780891200",
      "localPath": "/mtg-symbols/0074-pfin-final-fantasy-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pfin"
  },
  {
    "id": "02ffcfa7-6d81-4f7b-9e22-f3d207834014",
    "name": "FIN Standard Showdown",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "PSS5",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 75,
    "icon": {
      "alt": "FIN Standard Showdown set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0075-pss5-fin-standard-showdown.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pss5"
  },
  {
    "id": "07300e67-c2bb-4200-b526-204574a5ed45",
    "name": "Final Fantasy Regional Promos",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "RFIN",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 76,
    "icon": {
      "alt": "Final Fantasy Regional Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fin.svg?1780891200",
      "localPath": "/mtg-symbols/0076-rfin-final-fantasy-regional-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/rfin"
  },
  {
    "id": "40f74ca2-e802-4278-ba9d-5fb5da32e2ab",
    "name": "Final Fantasy Commander Tokens",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "TFIC",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 77,
    "icon": {
      "alt": "Final Fantasy Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fic.svg?1780891200",
      "localPath": "/mtg-symbols/0077-tfic-final-fantasy-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tfic"
  },
  {
    "id": "e6f97941-6b02-4951-966f-522722cb6339",
    "name": "Final Fantasy Tokens",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "TFIN",
    "setType": "Token",
    "cardCount": 37,
    "releaseOrder": 78,
    "icon": {
      "alt": "Final Fantasy Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fin.svg?1780891200",
      "localPath": "/mtg-symbols/0078-tfin-final-fantasy-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tfin"
  },
  {
    "id": "89c17dd0-1974-49b4-a026-ea42d1fb2e60",
    "name": "FIN Asia WPN Promo Tokens",
    "year": 2025,
    "releasedAt": "2025-06-13",
    "code": "WFIN",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 79,
    "icon": {
      "alt": "FIN Asia WPN Promo Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fin.svg?1780891200",
      "localPath": "/mtg-symbols/0079-wfin-fin-asia-wpn-promo-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wfin"
  },
  {
    "id": "f254a2f7-eeac-4aeb-8487-8583bf39811c",
    "name": "Pioneer Anthology 1",
    "year": 2025,
    "releasedAt": "2025-05-05",
    "code": "PA1",
    "setType": "Box",
    "cardCount": 11,
    "releaseOrder": 80,
    "icon": {
      "alt": "Pioneer Anthology 1 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0080-pa1-pioneer-anthology-1.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pa1"
  },
  {
    "id": "f7d41f5e-b377-4b58-b13e-9b07dc39668c",
    "name": "Alchemy: Tarkir",
    "year": 2025,
    "releasedAt": "2025-04-29",
    "code": "YTDM",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 81,
    "icon": {
      "alt": "Alchemy: Tarkir set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y25.svg?1780891200",
      "localPath": "/mtg-symbols/0081-ytdm-alchemy-tarkir.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ytdm"
  },
  {
    "id": "8e84d6a0-e29e-41da-884c-ece6a65e84be",
    "name": "Tarkir: Dragonstorm Art Series",
    "year": 2025,
    "releasedAt": "2025-04-11",
    "code": "ATDM",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 82,
    "icon": {
      "alt": "Tarkir: Dragonstorm Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tdm.svg?1780891200",
      "localPath": "/mtg-symbols/0082-atdm-tarkir-dragonstorm-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/atdm"
  },
  {
    "id": "f17bfc1b-a0dc-45df-9585-84d8d433124f",
    "name": "Tarkir: Dragonstorm Promos",
    "year": 2025,
    "releasedAt": "2025-04-11",
    "code": "PTDM",
    "setType": "Promo",
    "cardCount": 160,
    "releaseOrder": 83,
    "icon": {
      "alt": "Tarkir: Dragonstorm Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tdm.svg?1780891200",
      "localPath": "/mtg-symbols/0083-ptdm-tarkir-dragonstorm-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptdm"
  },
  {
    "id": "bca9779c-0a0b-4ac1-8794-f3fc25549cf4",
    "name": "Tarkir: Dragonstorm Commander",
    "year": 2025,
    "releasedAt": "2025-04-11",
    "code": "TDC",
    "setType": "Commander",
    "cardCount": 413,
    "releaseOrder": 84,
    "icon": {
      "alt": "Tarkir: Dragonstorm Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tdc.svg?1780891200",
      "localPath": "/mtg-symbols/0084-tdc-tarkir-dragonstorm-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdc"
  },
  {
    "id": "1361ca81-1304-49a8-b2e6-e76a4aa4a8c3",
    "name": "Tarkir: Dragonstorm",
    "year": 2025,
    "releasedAt": "2025-04-11",
    "code": "TDM",
    "setType": "Expansion",
    "cardCount": 427,
    "releaseOrder": 85,
    "icon": {
      "alt": "Tarkir: Dragonstorm set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tdm.svg?1780891200",
      "localPath": "/mtg-symbols/0085-tdm-tarkir-dragonstorm.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdm"
  },
  {
    "id": "2a667754-20c4-4deb-b2b6-d9f7c018c190",
    "name": "Tarkir: Dragonstorm Commander Tokens",
    "year": 2025,
    "releasedAt": "2025-04-11",
    "code": "TTDC",
    "setType": "Token",
    "cardCount": 34,
    "releaseOrder": 86,
    "icon": {
      "alt": "Tarkir: Dragonstorm Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tdc.svg?1780891200",
      "localPath": "/mtg-symbols/0086-ttdc-tarkir-dragonstorm-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ttdc"
  },
  {
    "id": "0c9ae251-ec77-4906-b505-02820b7ccedb",
    "name": "Tarkir: Dragonstorm Tokens",
    "year": 2025,
    "releasedAt": "2025-04-11",
    "code": "TTDM",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 87,
    "icon": {
      "alt": "Tarkir: Dragonstorm Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tdm.svg?1780891200",
      "localPath": "/mtg-symbols/0087-ttdm-tarkir-dragonstorm-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ttdm"
  },
  {
    "id": "6fe6aa88-9964-45fe-bce1-f9eb8f721fe5",
    "name": "Love Your LGS 2025",
    "year": 2025,
    "releasedAt": "2025-03-26",
    "code": "PLG25",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 88,
    "icon": {
      "alt": "Love Your LGS 2025 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0088-plg25-love-your-lgs-2025.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plg25"
  },
  {
    "id": "b8dfdf6c-a559-4ca6-9e21-32a132b818bb",
    "name": "Alchemy: Aetherdrift",
    "year": 2025,
    "releasedAt": "2025-03-04",
    "code": "YDFT",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 89,
    "icon": {
      "alt": "Alchemy: Aetherdrift set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y25.svg?1780891200",
      "localPath": "/mtg-symbols/0089-ydft-alchemy-aetherdrift.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ydft"
  },
  {
    "id": "d983636f-97f5-4ab7-9a43-0260e10bb753",
    "name": "Secret Lair Showcase Planes",
    "year": 2025,
    "releasedAt": "2025-02-21",
    "code": "PSSC",
    "setType": "Memorabilia",
    "cardCount": 10,
    "releaseOrder": 90,
    "icon": {
      "alt": "Secret Lair Showcase Planes set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0090-pssc-secret-lair-showcase-planes.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pssc"
  },
  {
    "id": "e10cf192-68e9-4c3f-ab44-31fe594cc7d4",
    "name": "Aetherdrift Art Series",
    "year": 2025,
    "releasedAt": "2025-02-14",
    "code": "ADFT",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 91,
    "icon": {
      "alt": "Aetherdrift Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dft.svg?1780891200",
      "localPath": "/mtg-symbols/0091-adft-aetherdrift-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/adft"
  },
  {
    "id": "23464cc2-a69c-427d-b8a7-08e5d80235d7",
    "name": "Aetherdrift",
    "year": 2025,
    "releasedAt": "2025-02-14",
    "code": "DFT",
    "setType": "Expansion",
    "cardCount": 553,
    "releaseOrder": 92,
    "icon": {
      "alt": "Aetherdrift set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dft.svg?1780891200",
      "localPath": "/mtg-symbols/0092-dft-aetherdrift.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dft"
  },
  {
    "id": "d33ef7a4-41bb-4f16-bad3-b3ee13c257e6",
    "name": "Aetherdrift Commander",
    "year": 2025,
    "releasedAt": "2025-02-14",
    "code": "DRC",
    "setType": "Commander",
    "cardCount": 184,
    "releaseOrder": 93,
    "icon": {
      "alt": "Aetherdrift Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/drc.svg?1780891200",
      "localPath": "/mtg-symbols/0093-drc-aetherdrift-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/drc"
  },
  {
    "id": "cc05a3a1-fb38-4d6d-b3d3-032e90b49d00",
    "name": "Aetherdrift Promos",
    "year": 2025,
    "releasedAt": "2025-02-14",
    "code": "PDFT",
    "setType": "Promo",
    "cardCount": 160,
    "releaseOrder": 94,
    "icon": {
      "alt": "Aetherdrift Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dft.svg?1780891200",
      "localPath": "/mtg-symbols/0094-pdft-aetherdrift-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdft"
  },
  {
    "id": "d0c670b6-e070-4ba9-9bf1-9c661ba9c7c5",
    "name": "Year of the Snake 2025",
    "year": 2025,
    "releasedAt": "2025-02-14",
    "code": "PL25",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 95,
    "icon": {
      "alt": "Year of the Snake 2025 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0095-pl25-year-of-the-snake-2025.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pl25"
  },
  {
    "id": "3916f769-ad69-4527-9700-33b266113013",
    "name": "Aetherdrift Tokens",
    "year": 2025,
    "releasedAt": "2025-02-14",
    "code": "TDFT",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 96,
    "icon": {
      "alt": "Aetherdrift Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dft.svg?1780891200",
      "localPath": "/mtg-symbols/0096-tdft-aetherdrift-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdft"
  },
  {
    "id": "f51d00d3-6ab4-4fa9-90ce-702aed612e9b",
    "name": "Aetherdrift Commander Tokens",
    "year": 2025,
    "releasedAt": "2025-02-14",
    "code": "TDRC",
    "setType": "Token",
    "cardCount": 17,
    "releaseOrder": 97,
    "icon": {
      "alt": "Aetherdrift Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/drc.svg?1780891200",
      "localPath": "/mtg-symbols/0097-tdrc-aetherdrift-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdrc"
  },
  {
    "id": "6a1e8cf5-a516-4fc2-8d99-96862f4117f9",
    "name": "Japan Standard Cup",
    "year": 2025,
    "releasedAt": "2025-02-09",
    "code": "PJSC",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 98,
    "icon": {
      "alt": "Japan Standard Cup set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0098-pjsc-japan-standard-cup.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pjsc"
  },
  {
    "id": "03368b5a-dcb8-4742-bf70-f194718d0bc8",
    "name": "Innistrad Remastered Art Series",
    "year": 2025,
    "releasedAt": "2025-01-24",
    "code": "AINR",
    "setType": "Memorabilia",
    "cardCount": 25,
    "releaseOrder": 99,
    "icon": {
      "alt": "Innistrad Remastered Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/inr.svg?1780891200",
      "localPath": "/mtg-symbols/0099-ainr-innistrad-remastered-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ainr"
  },
  {
    "id": "b9618c8c-9f31-4b42-9798-2991893c27bf",
    "name": "Innistrad Remastered",
    "year": 2025,
    "releasedAt": "2025-01-24",
    "code": "INR",
    "setType": "Masters",
    "cardCount": 495,
    "releaseOrder": 100,
    "icon": {
      "alt": "Innistrad Remastered set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/inr.svg?1780891200",
      "localPath": "/mtg-symbols/0100-inr-innistrad-remastered.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/inr"
  },
  {
    "id": "de27268e-c9c5-4d97-9bfd-28ad8cb7b1a0",
    "name": "Innistrad Remastered Tokens",
    "year": 2025,
    "releasedAt": "2025-01-24",
    "code": "TINR",
    "setType": "Token",
    "cardCount": 27,
    "releaseOrder": 101,
    "icon": {
      "alt": "Innistrad Remastered Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/inr.svg?1780891200",
      "localPath": "/mtg-symbols/0101-tinr-innistrad-remastered-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tinr"
  },
  {
    "id": "053b14b2-b622-44ce-a695-5881e2580e1d",
    "name": "Spotlight Series",
    "year": 2025,
    "releasedAt": "2025-01-03",
    "code": "PSPL",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 102,
    "icon": {
      "alt": "Spotlight Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0102-pspl-spotlight-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pspl"
  },
  {
    "id": "9e40b5c2-28f3-4bb3-b6dc-d2e904f3f3fa",
    "name": "MagicFest 2025",
    "year": 2025,
    "releasedAt": "2025-01-01",
    "code": "PF25",
    "setType": "Promo",
    "cardCount": 19,
    "releaseOrder": 103,
    "icon": {
      "alt": "MagicFest 2025 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0103-pf25-magicfest-2025.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pf25"
  },
  {
    "id": "eac8a97a-7eb5-4d0f-8206-e4963e57b265",
    "name": "Wizards Play Network 2025",
    "year": 2025,
    "releasedAt": "2025-01-01",
    "code": "PW25",
    "setType": "Promo",
    "cardCount": 16,
    "releaseOrder": 104,
    "icon": {
      "alt": "Wizards Play Network 2025 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0104-pw25-wizards-play-network-2025.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pw25"
  },
  {
    "id": "713c226b-d4d9-46e1-b9c9-a04689d90ff6",
    "name": "Pioneer Masters",
    "year": 2024,
    "releasedAt": "2024-12-10",
    "code": "PIO",
    "setType": "Masters",
    "cardCount": 398,
    "releaseOrder": 105,
    "icon": {
      "alt": "Pioneer Masters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pio.svg?1780891200",
      "localPath": "/mtg-symbols/0105-pio-pioneer-masters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pio"
  },
  {
    "id": "dae4bf74-97f7-40a6-ac46-54b6b0d8a58d",
    "name": "Foundations Art Series",
    "year": 2024,
    "releasedAt": "2024-11-15",
    "code": "AFDN",
    "setType": "Memorabilia",
    "cardCount": 55,
    "releaseOrder": 106,
    "icon": {
      "alt": "Foundations Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fdn.svg?1780891200",
      "localPath": "/mtg-symbols/0106-afdn-foundations-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/afdn"
  },
  {
    "id": "2a0b24ac-7614-4a08-b58a-b64f7c173361",
    "name": "Foundations Commander",
    "year": 2024,
    "releasedAt": "2024-11-15",
    "code": "FDC",
    "setType": "Commander",
    "cardCount": 3,
    "releaseOrder": 107,
    "icon": {
      "alt": "Foundations Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fdc.svg?1780891200",
      "localPath": "/mtg-symbols/0107-fdc-foundations-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fdc"
  },
  {
    "id": "a7ecb771-d1b6-4dec-8cf5-8d45179f21e0",
    "name": "Foundations",
    "year": 2024,
    "releasedAt": "2024-11-15",
    "code": "FDN",
    "setType": "Core",
    "cardCount": 771,
    "releaseOrder": 108,
    "icon": {
      "alt": "Foundations set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fdn.svg?1780891200",
      "localPath": "/mtg-symbols/0108-fdn-foundations.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fdn"
  },
  {
    "id": "3e036f87-f186-43cb-8c64-47a4350897f2",
    "name": "Foundations Front Cards",
    "year": 2024,
    "releasedAt": "2024-11-15",
    "code": "FFDN",
    "setType": "Memorabilia",
    "cardCount": 10,
    "releaseOrder": 109,
    "icon": {
      "alt": "Foundations Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fdn.svg?1780891200",
      "localPath": "/mtg-symbols/0109-ffdn-foundations-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ffdn"
  },
  {
    "id": "b229c424-54a9-46c1-b1d5-38a709024a4f",
    "name": "Foundations Jumpstart Front Cards",
    "year": 2024,
    "releasedAt": "2024-11-15",
    "code": "FJ25",
    "setType": "Memorabilia",
    "cardCount": 46,
    "releaseOrder": 110,
    "icon": {
      "alt": "Foundations Jumpstart Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/j25.svg?1780891200",
      "localPath": "/mtg-symbols/0110-fj25-foundations-jumpstart-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fj25"
  },
  {
    "id": "9201567c-bab5-4720-aac9-260e6741f115",
    "name": "Foundations Jumpstart",
    "year": 2024,
    "releasedAt": "2024-11-15",
    "code": "J25",
    "setType": "Draft Innovation",
    "cardCount": 779,
    "releaseOrder": 111,
    "icon": {
      "alt": "Foundations Jumpstart set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/j25.svg?1780891200",
      "localPath": "/mtg-symbols/0111-j25-foundations-jumpstart.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j25"
  },
  {
    "id": "9cfdcd69-25f3-44cf-99e0-1f0ab0d61c20",
    "name": "Foundations Promos",
    "year": 2024,
    "releasedAt": "2024-11-15",
    "code": "PFDN",
    "setType": "Promo",
    "cardCount": 106,
    "releaseOrder": 112,
    "icon": {
      "alt": "Foundations Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fdn.svg?1780891200",
      "localPath": "/mtg-symbols/0112-pfdn-foundations-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pfdn"
  },
  {
    "id": "abb31a61-9d0e-47ed-852a-8c5249396c7d",
    "name": "Foundations Tokens",
    "year": 2024,
    "releasedAt": "2024-11-15",
    "code": "TFDN",
    "setType": "Token",
    "cardCount": 33,
    "releaseOrder": 113,
    "icon": {
      "alt": "Foundations Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fdn.svg?1780891200",
      "localPath": "/mtg-symbols/0113-tfdn-foundations-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tfdn"
  },
  {
    "id": "cca2aac9-0d45-4b83-8a76-7de66ca41755",
    "name": "Tales of Middle-earth Deluxe Commander Kit",
    "year": 2024,
    "releasedAt": "2024-10-16",
    "code": "PLTC",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 114,
    "icon": {
      "alt": "Tales of Middle-earth Deluxe Commander Kit set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0114-pltc-tales-of-middle-earth-deluxe-commander-kit.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pltc"
  },
  {
    "id": "b451dcad-db03-4ebd-9155-6cafe0240f66",
    "name": "Alchemy: Duskmourn",
    "year": 2024,
    "releasedAt": "2024-10-15",
    "code": "YDSK",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 115,
    "icon": {
      "alt": "Alchemy: Duskmourn set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y25.svg?1780891200",
      "localPath": "/mtg-symbols/0115-ydsk-alchemy-duskmourn.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ydsk"
  },
  {
    "id": "335eb1c9-293c-43af-ab98-77726e19f376",
    "name": "Duskmourn: House of Horror Art Series",
    "year": 2024,
    "releasedAt": "2024-09-27",
    "code": "ADSK",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 116,
    "icon": {
      "alt": "Duskmourn: House of Horror Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dsk.svg?1780891200",
      "localPath": "/mtg-symbols/0116-adsk-duskmourn-house-of-horror-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/adsk"
  },
  {
    "id": "4c822528-83c3-42c7-8708-dd1d37166819",
    "name": "Duskmourn: House of Horror Commander",
    "year": 2024,
    "releasedAt": "2024-09-27",
    "code": "DSC",
    "setType": "Commander",
    "cardCount": 373,
    "releaseOrder": 117,
    "icon": {
      "alt": "Duskmourn: House of Horror Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dsc.svg?1780891200",
      "localPath": "/mtg-symbols/0117-dsc-duskmourn-house-of-horror-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dsc"
  },
  {
    "id": "a111d8a9-b647-48ec-afab-2b78f92173f5",
    "name": "Duskmourn: House of Horror",
    "year": 2024,
    "releasedAt": "2024-09-27",
    "code": "DSK",
    "setType": "Expansion",
    "cardCount": 419,
    "releaseOrder": 118,
    "icon": {
      "alt": "Duskmourn: House of Horror set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dsk.svg?1780891200",
      "localPath": "/mtg-symbols/0118-dsk-duskmourn-house-of-horror.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dsk"
  },
  {
    "id": "6d202752-1655-491f-b3a2-86dbd35fbec8",
    "name": "Duskmourn: House of Horror Promos",
    "year": 2024,
    "releasedAt": "2024-09-27",
    "code": "PDSK",
    "setType": "Promo",
    "cardCount": 160,
    "releaseOrder": 119,
    "icon": {
      "alt": "Duskmourn: House of Horror Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dsk.svg?1780891200",
      "localPath": "/mtg-symbols/0119-pdsk-duskmourn-house-of-horror-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdsk"
  },
  {
    "id": "faf368ed-8cd5-40cf-9ca3-8298bd1f244e",
    "name": "Duskmourn Commander Tokens",
    "year": 2024,
    "releasedAt": "2024-09-27",
    "code": "TDSC",
    "setType": "Token",
    "cardCount": 23,
    "releaseOrder": 120,
    "icon": {
      "alt": "Duskmourn Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dsc.svg?1780891200",
      "localPath": "/mtg-symbols/0120-tdsc-duskmourn-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdsc"
  },
  {
    "id": "756a7010-a91f-46fd-be50-f4ff9aa741d0",
    "name": "Duskmourn: House of Horror Tokens",
    "year": 2024,
    "releasedAt": "2024-09-27",
    "code": "TDSK",
    "setType": "Token",
    "cardCount": 19,
    "releaseOrder": 121,
    "icon": {
      "alt": "Duskmourn: House of Horror Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dsk.svg?1780891200",
      "localPath": "/mtg-symbols/0121-tdsk-duskmourn-house-of-horror-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdsk"
  },
  {
    "id": "9425de98-cc10-4295-80e5-42a3bcb75453",
    "name": "Alchemy: Bloomburrow",
    "year": 2024,
    "releasedAt": "2024-08-20",
    "code": "YBLB",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 122,
    "icon": {
      "alt": "Alchemy: Bloomburrow set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y25.svg?1780891200",
      "localPath": "/mtg-symbols/0122-yblb-alchemy-bloomburrow.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/yblb"
  },
  {
    "id": "d72a9b9d-4a13-4d8b-a1b3-756c4575e4f8",
    "name": "Love Your LGS 2024",
    "year": 2024,
    "releasedAt": "2024-08-06",
    "code": "PLG24",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 123,
    "icon": {
      "alt": "Love Your LGS 2024 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0123-plg24-love-your-lgs-2024.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plg24"
  },
  {
    "id": "4012d64e-1e3d-4380-a631-1aa9ee9244b3",
    "name": "Bloomburrow Art Series",
    "year": 2024,
    "releasedAt": "2024-08-02",
    "code": "ABLB",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 124,
    "icon": {
      "alt": "Bloomburrow Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/blb.svg?1780891200",
      "localPath": "/mtg-symbols/0124-ablb-bloomburrow-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ablb"
  },
  {
    "id": "a2f58272-bba6-439d-871e-7a46686ac018",
    "name": "Bloomburrow",
    "year": 2024,
    "releasedAt": "2024-08-02",
    "code": "BLB",
    "setType": "Expansion",
    "cardCount": 398,
    "releaseOrder": 125,
    "icon": {
      "alt": "Bloomburrow set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/blb.svg?1780891200",
      "localPath": "/mtg-symbols/0125-blb-bloomburrow.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/blb"
  },
  {
    "id": "c0f860b9-a2d0-4fd7-bfac-a49ac60c84f1",
    "name": "Bloomburrow Commander",
    "year": 2024,
    "releasedAt": "2024-08-02",
    "code": "BLC",
    "setType": "Commander",
    "cardCount": 356,
    "releaseOrder": 126,
    "icon": {
      "alt": "Bloomburrow Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/blc.svg?1780891200",
      "localPath": "/mtg-symbols/0126-blc-bloomburrow-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/blc"
  },
  {
    "id": "1e6879fe-2f29-4ad7-8d42-7f5bfb469f4a",
    "name": "Mystery Booster 2",
    "year": 2024,
    "releasedAt": "2024-08-02",
    "code": "MB2",
    "setType": "Masters",
    "cardCount": 385,
    "releaseOrder": 127,
    "icon": {
      "alt": "Mystery Booster 2 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mb2.svg?1780891200",
      "localPath": "/mtg-symbols/0127-mb2-mystery-booster-2.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mb2"
  },
  {
    "id": "3e2b178a-4f7b-4bb3-9af3-3c1ffcdfaa3e",
    "name": "Bloomburrow Promos",
    "year": 2024,
    "releasedAt": "2024-08-02",
    "code": "PBLB",
    "setType": "Promo",
    "cardCount": 160,
    "releaseOrder": 128,
    "icon": {
      "alt": "Bloomburrow Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/blb.svg?1780891200",
      "localPath": "/mtg-symbols/0128-pblb-bloomburrow-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pblb"
  },
  {
    "id": "665a9dff-f9d2-4932-8feb-822fa1d020e5",
    "name": "Cowboy Bebop",
    "year": 2024,
    "releasedAt": "2024-08-02",
    "code": "PCBB",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 129,
    "icon": {
      "alt": "Cowboy Bebop set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0129-pcbb-cowboy-bebop.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pcbb"
  },
  {
    "id": "98ffb0ad-639e-4861-b81d-dd5ae734badf",
    "name": "Bloomburrow Tokens",
    "year": 2024,
    "releasedAt": "2024-08-02",
    "code": "TBLB",
    "setType": "Token",
    "cardCount": 30,
    "releaseOrder": 130,
    "icon": {
      "alt": "Bloomburrow Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/blb.svg?1780891200",
      "localPath": "/mtg-symbols/0130-tblb-bloomburrow-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tblb"
  },
  {
    "id": "c19783ef-387f-4974-9185-56be15c7ac0d",
    "name": "Bloomburrow Commander Tokens",
    "year": 2024,
    "releasedAt": "2024-08-02",
    "code": "TBLC",
    "setType": "Token",
    "cardCount": 41,
    "releaseOrder": 131,
    "icon": {
      "alt": "Bloomburrow Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/blc.svg?1780891200",
      "localPath": "/mtg-symbols/0131-tblc-bloomburrow-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tblc"
  },
  {
    "id": "40e35daf-ebfb-4b68-9e28-f28b04a0bb57",
    "name": "Assassin's Creed Art Series",
    "year": 2024,
    "releasedAt": "2024-07-05",
    "code": "AACR",
    "setType": "Memorabilia",
    "cardCount": 20,
    "releaseOrder": 132,
    "icon": {
      "alt": "Assassin's Creed Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/acr.svg?1780891200",
      "localPath": "/mtg-symbols/0132-aacr-assassin-s-creed-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aacr"
  },
  {
    "id": "54b67b0b-cd3f-4e0d-ac25-fef5d966409b",
    "name": "Assassin's Creed",
    "year": 2024,
    "releasedAt": "2024-07-05",
    "code": "ACR",
    "setType": "Draft Innovation",
    "cardCount": 309,
    "releaseOrder": 133,
    "icon": {
      "alt": "Assassin's Creed set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/acr.svg?1780891200",
      "localPath": "/mtg-symbols/0133-acr-assassin-s-creed.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/acr"
  },
  {
    "id": "b62d5489-bd48-4f61-b821-d35d521c390d",
    "name": "Assassin's Creed Minigames",
    "year": 2024,
    "releasedAt": "2024-07-05",
    "code": "MACR",
    "setType": "Minigame",
    "cardCount": 3,
    "releaseOrder": 134,
    "icon": {
      "alt": "Assassin's Creed Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/acr.svg?1780891200",
      "localPath": "/mtg-symbols/0134-macr-assassin-s-creed-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/macr"
  },
  {
    "id": "40745188-c35f-4f69-89db-1fe5b46b65ba",
    "name": "Assassin's Creed Tokens",
    "year": 2024,
    "releasedAt": "2024-07-05",
    "code": "TACR",
    "setType": "Token",
    "cardCount": 8,
    "releaseOrder": 135,
    "icon": {
      "alt": "Assassin's Creed Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/acr.svg?1780891200",
      "localPath": "/mtg-symbols/0135-tacr-assassin-s-creed-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tacr"
  },
  {
    "id": "aa309847-aed2-4947-af5b-d777deb01190",
    "name": "Modern Horizons 3 Art Series",
    "year": 2024,
    "releasedAt": "2024-06-14",
    "code": "AMH3",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 136,
    "icon": {
      "alt": "Modern Horizons 3 Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh3.svg?1780891200",
      "localPath": "/mtg-symbols/0136-amh3-modern-horizons-3-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/amh3"
  },
  {
    "id": "f5e00721-cf99-43ba-bf16-b22d56d12c73",
    "name": "Modern Horizons 3 Commander",
    "year": 2024,
    "releasedAt": "2024-06-14",
    "code": "M3C",
    "setType": "Commander",
    "cardCount": 398,
    "releaseOrder": 137,
    "icon": {
      "alt": "Modern Horizons 3 Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m3c.svg?1780891200",
      "localPath": "/mtg-symbols/0137-m3c-modern-horizons-3-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m3c"
  },
  {
    "id": "3ed80bb6-77e8-4aa7-8262-95377a38aba1",
    "name": "Modern Horizons 3",
    "year": 2024,
    "releasedAt": "2024-06-14",
    "code": "MH3",
    "setType": "Draft Innovation",
    "cardCount": 528,
    "releaseOrder": 138,
    "icon": {
      "alt": "Modern Horizons 3 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh3.svg?1780891200",
      "localPath": "/mtg-symbols/0138-mh3-modern-horizons-3.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mh3"
  },
  {
    "id": "8f33d6e8-fe8a-4c8e-a96d-8fe32660e775",
    "name": "Modern Horizons 3 Promos",
    "year": 2024,
    "releasedAt": "2024-06-14",
    "code": "PMH3",
    "setType": "Promo",
    "cardCount": 92,
    "releaseOrder": 139,
    "icon": {
      "alt": "Modern Horizons 3 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh3.svg?1780891200",
      "localPath": "/mtg-symbols/0139-pmh3-modern-horizons-3-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmh3"
  },
  {
    "id": "c01b381e-9acc-44bf-82d7-8834a41421fc",
    "name": "Modern Horizons 3 Substitute Cards",
    "year": 2024,
    "releasedAt": "2024-06-14",
    "code": "SMH3",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 140,
    "icon": {
      "alt": "Modern Horizons 3 Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh3.svg?1780891200",
      "localPath": "/mtg-symbols/0140-smh3-modern-horizons-3-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/smh3"
  },
  {
    "id": "e912a6f3-790f-4950-bacf-4693f517b469",
    "name": "Modern Horizons 3 Commander Tokens",
    "year": 2024,
    "releasedAt": "2024-06-14",
    "code": "TM3C",
    "setType": "Token",
    "cardCount": 28,
    "releaseOrder": 141,
    "icon": {
      "alt": "Modern Horizons 3 Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m3c.svg?1780891200",
      "localPath": "/mtg-symbols/0141-tm3c-modern-horizons-3-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm3c"
  },
  {
    "id": "7aa71d91-3b45-4a2f-a183-0b3c1918c285",
    "name": "Modern Horizons 3 Tokens",
    "year": 2024,
    "releasedAt": "2024-06-14",
    "code": "TMH3",
    "setType": "Token",
    "cardCount": 43,
    "releaseOrder": 142,
    "icon": {
      "alt": "Modern Horizons 3 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh3.svg?1780891200",
      "localPath": "/mtg-symbols/0142-tmh3-modern-horizons-3-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmh3"
  },
  {
    "id": "20e53d4f-2ce8-4d82-9c7c-e6378a0134ad",
    "name": "Modern Horizons 2 Timeshifts",
    "year": 2024,
    "releasedAt": "2024-06-07",
    "code": "H2R",
    "setType": "Draft Innovation",
    "cardCount": 16,
    "releaseOrder": 143,
    "icon": {
      "alt": "Modern Horizons 2 Timeshifts set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh2.svg?1780891200",
      "localPath": "/mtg-symbols/0143-h2r-modern-horizons-2-timeshifts.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/h2r"
  },
  {
    "id": "53ef6d2e-0719-4002-bb5d-5dd41b7ba96c",
    "name": "Alchemy: Outlaws of Thunder Junction",
    "year": 2024,
    "releasedAt": "2024-05-07",
    "code": "YOTJ",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 144,
    "icon": {
      "alt": "Alchemy: Outlaws of Thunder Junction set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y24.svg?1780891200",
      "localPath": "/mtg-symbols/0144-yotj-alchemy-outlaws-of-thunder-junction.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/yotj"
  },
  {
    "id": "9d2325c7-06a4-4404-8bbf-1fcdf02f15ac",
    "name": "Outlaws of Thunder Junction Art Series",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "AOTJ",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 145,
    "icon": {
      "alt": "Outlaws of Thunder Junction Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/otj.svg?1780891200",
      "localPath": "/mtg-symbols/0145-aotj-outlaws-of-thunder-junction-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aotj"
  },
  {
    "id": "14332d2c-ba93-4498-bf3f-9d601f88f783",
    "name": "The Big Score",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "BIG",
    "setType": "Expansion",
    "cardCount": 95,
    "releaseOrder": 146,
    "icon": {
      "alt": "The Big Score set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/big.svg?1780891200",
      "localPath": "/mtg-symbols/0146-big-the-big-score.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/big"
  },
  {
    "id": "d6548798-0c10-4509-b71a-2d8b1d14665a",
    "name": "Outlaws of Thunder Junction Commander",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "OTC",
    "setType": "Commander",
    "cardCount": 342,
    "releaseOrder": 147,
    "icon": {
      "alt": "Outlaws of Thunder Junction Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/otc.svg?1780891200",
      "localPath": "/mtg-symbols/0147-otc-outlaws-of-thunder-junction-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/otc"
  },
  {
    "id": "55a85ebe-644e-4bef-8be8-5290408be3d1",
    "name": "Outlaws of Thunder Junction",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "OTJ",
    "setType": "Expansion",
    "cardCount": 374,
    "releaseOrder": 148,
    "icon": {
      "alt": "Outlaws of Thunder Junction set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/otj.svg?1780891200",
      "localPath": "/mtg-symbols/0148-otj-outlaws-of-thunder-junction.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/otj"
  },
  {
    "id": "8b51294d-fc54-410c-83b2-0168837ede87",
    "name": "Breaking News",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "OTP",
    "setType": "Masterpiece",
    "cardCount": 80,
    "releaseOrder": 149,
    "icon": {
      "alt": "Breaking News set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/otp.svg?1780891200",
      "localPath": "/mtg-symbols/0149-otp-breaking-news.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/otp"
  },
  {
    "id": "efa35c12-8c68-4d9d-9081-f0f57e564ba3",
    "name": "Outlaws of Thunder Junction Promos",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "POTJ",
    "setType": "Promo",
    "cardCount": 160,
    "releaseOrder": 150,
    "icon": {
      "alt": "Outlaws of Thunder Junction Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/otj.svg?1780891200",
      "localPath": "/mtg-symbols/0150-potj-outlaws-of-thunder-junction-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/potj"
  },
  {
    "id": "d73ac1ef-7042-4548-994e-9eb4d34988dc",
    "name": "The Big Score Tokens",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "TBIG",
    "setType": "Token",
    "cardCount": 7,
    "releaseOrder": 151,
    "icon": {
      "alt": "The Big Score Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/big.svg?1780891200",
      "localPath": "/mtg-symbols/0151-tbig-the-big-score-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tbig"
  },
  {
    "id": "e25e9845-1a2f-420d-a9fb-12a15058b50d",
    "name": "Outlaws of Thunder Junction Commander Tokens",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "TOTC",
    "setType": "Token",
    "cardCount": 41,
    "releaseOrder": 152,
    "icon": {
      "alt": "Outlaws of Thunder Junction Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/otc.svg?1780891200",
      "localPath": "/mtg-symbols/0152-totc-outlaws-of-thunder-junction-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/totc"
  },
  {
    "id": "d287eb38-a1b8-4d01-bdfe-4ccbd2837145",
    "name": "Outlaws of Thunder Junction Tokens",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "TOTJ",
    "setType": "Token",
    "cardCount": 19,
    "releaseOrder": 153,
    "icon": {
      "alt": "Outlaws of Thunder Junction Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/otj.svg?1780891200",
      "localPath": "/mtg-symbols/0153-totj-outlaws-of-thunder-junction-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/totj"
  },
  {
    "id": "b609eb59-1d0d-4fd0-bc25-3e3eeccf0913",
    "name": "Breaking News Tokens",
    "year": 2024,
    "releasedAt": "2024-04-19",
    "code": "TOTP",
    "setType": "Token",
    "cardCount": 5,
    "releaseOrder": 154,
    "icon": {
      "alt": "Breaking News Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/otp.svg?1780891200",
      "localPath": "/mtg-symbols/0154-totp-breaking-news-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/totp"
  },
  {
    "id": "d84d7a49-2ef4-4808-83b4-8c65b4aa0e2d",
    "name": "Fallout",
    "year": 2024,
    "releasedAt": "2024-03-08",
    "code": "PIP",
    "setType": "Commander",
    "cardCount": 1068,
    "releaseOrder": 155,
    "icon": {
      "alt": "Fallout set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pip.svg?1780891200",
      "localPath": "/mtg-symbols/0155-pip-fallout.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pip"
  },
  {
    "id": "0516d9a9-8262-4fed-9207-7deca5306cdf",
    "name": "Fallout Tokens",
    "year": 2024,
    "releasedAt": "2024-03-08",
    "code": "TPIP",
    "setType": "Token",
    "cardCount": 22,
    "releaseOrder": 156,
    "icon": {
      "alt": "Fallout Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pip.svg?1780891200",
      "localPath": "/mtg-symbols/0156-tpip-fallout-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tpip"
  },
  {
    "id": "3879667a-f0b8-4bc2-8662-7c861e22b4e9",
    "name": "Alchemy: Murders at Karlov Manor ",
    "year": 2024,
    "releasedAt": "2024-03-05",
    "code": "YMKM",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 157,
    "icon": {
      "alt": "Alchemy: Murders at Karlov Manor  set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y24.svg?1780891200",
      "localPath": "/mtg-symbols/0157-ymkm-alchemy-murders-at-karlov-manor.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ymkm"
  },
  {
    "id": "6171d14f-93ff-4c25-af52-a8a8179237c1",
    "name": "Black Lotus Unknown Planechase",
    "year": 2024,
    "releasedAt": "2024-02-24",
    "code": "PUNK",
    "setType": "Funny",
    "cardCount": 52,
    "releaseOrder": 158,
    "icon": {
      "alt": "Black Lotus Unknown Planechase set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/planeswalker.svg?1780891200",
      "localPath": "/mtg-symbols/0158-punk-black-lotus-unknown-planechase.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/punk"
  },
  {
    "id": "d4bfabcf-a859-43a4-9d8a-665533c8b174",
    "name": "Ravnica: Clue Edition",
    "year": 2024,
    "releasedAt": "2024-02-23",
    "code": "CLU",
    "setType": "Draft Innovation",
    "cardCount": 284,
    "releaseOrder": 159,
    "icon": {
      "alt": "Ravnica: Clue Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/clu.svg?1780891200",
      "localPath": "/mtg-symbols/0159-clu-ravnica-clue-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/clu"
  },
  {
    "id": "390f8f7d-4638-45e5-addb-1567aa4ac2ab",
    "name": "Ravnica: Clue Edition Front Cards",
    "year": 2024,
    "releasedAt": "2024-02-23",
    "code": "FCLU",
    "setType": "Memorabilia",
    "cardCount": 10,
    "releaseOrder": 160,
    "icon": {
      "alt": "Ravnica: Clue Edition Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/clu.svg?1780891200",
      "localPath": "/mtg-symbols/0160-fclu-ravnica-clue-edition-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fclu"
  },
  {
    "id": "ea22caa2-a5e3-4bcd-a15c-1027fcc7bc58",
    "name": "MKM Standard Showdown",
    "year": 2024,
    "releasedAt": "2024-02-10",
    "code": "PSS4",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 161,
    "icon": {
      "alt": "MKM Standard Showdown set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0161-pss4-mkm-standard-showdown.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pss4"
  },
  {
    "id": "cebbaa6a-05a8-4737-889c-0dee42e6af33",
    "name": "Murders at Karlov Manor Art Series",
    "year": 2024,
    "releasedAt": "2024-02-09",
    "code": "AMKM",
    "setType": "Memorabilia",
    "cardCount": 49,
    "releaseOrder": 162,
    "icon": {
      "alt": "Murders at Karlov Manor Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mkm.svg?1780891200",
      "localPath": "/mtg-symbols/0162-amkm-murders-at-karlov-manor-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/amkm"
  },
  {
    "id": "286c37ca-ba65-4d3e-8c5d-d1878d88fd95",
    "name": "Murders at Karlov Manor Commander",
    "year": 2024,
    "releasedAt": "2024-02-09",
    "code": "MKC",
    "setType": "Commander",
    "cardCount": 358,
    "releaseOrder": 163,
    "icon": {
      "alt": "Murders at Karlov Manor Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mkc.svg?1780891200",
      "localPath": "/mtg-symbols/0163-mkc-murders-at-karlov-manor-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mkc"
  },
  {
    "id": "2b17794b-15c3-4796-ad6f-0887a0eceeca",
    "name": "Murders at Karlov Manor",
    "year": 2024,
    "releasedAt": "2024-02-09",
    "code": "MKM",
    "setType": "Expansion",
    "cardCount": 451,
    "releaseOrder": 164,
    "icon": {
      "alt": "Murders at Karlov Manor set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mkm.svg?1780891200",
      "localPath": "/mtg-symbols/0164-mkm-murders-at-karlov-manor.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mkm"
  },
  {
    "id": "5226ce19-28b1-462f-89a2-460e994824dd",
    "name": "Murders at Karlov Manor Promos",
    "year": 2024,
    "releasedAt": "2024-02-09",
    "code": "PMKM",
    "setType": "Promo",
    "cardCount": 180,
    "releaseOrder": 165,
    "icon": {
      "alt": "Murders at Karlov Manor Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mkm.svg?1780891200",
      "localPath": "/mtg-symbols/0165-pmkm-murders-at-karlov-manor-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmkm"
  },
  {
    "id": "94023707-128c-438e-95e3-c86f1ce72fb5",
    "name": "Murders at Karlov Manor Commander Tokens",
    "year": 2024,
    "releasedAt": "2024-02-09",
    "code": "TMKC",
    "setType": "Token",
    "cardCount": 31,
    "releaseOrder": 166,
    "icon": {
      "alt": "Murders at Karlov Manor Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mkc.svg?1780891200",
      "localPath": "/mtg-symbols/0166-tmkc-murders-at-karlov-manor-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmkc"
  },
  {
    "id": "4be7158b-d5e6-4558-accc-ed0661f2371b",
    "name": "Murders at Karlov Manor Tokens",
    "year": 2024,
    "releasedAt": "2024-02-09",
    "code": "TMKM",
    "setType": "Token",
    "cardCount": 22,
    "releaseOrder": 167,
    "icon": {
      "alt": "Murders at Karlov Manor Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mkm.svg?1780891200",
      "localPath": "/mtg-symbols/0167-tmkm-murders-at-karlov-manor-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmkm"
  },
  {
    "id": "d37543a8-f7f9-4d77-a2dc-0c5d36667187",
    "name": "MKM Japanese Promo Tokens",
    "year": 2024,
    "releasedAt": "2024-02-09",
    "code": "WMKM",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 168,
    "icon": {
      "alt": "MKM Japanese Promo Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0168-wmkm-mkm-japanese-promo-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wmkm"
  },
  {
    "id": "f5c8ab78-698b-4967-aebb-3f762d9b6044",
    "name": "Year of the Dragon 2024",
    "year": 2024,
    "releasedAt": "2024-02-08",
    "code": "PL24",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 169,
    "icon": {
      "alt": "Year of the Dragon 2024 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0169-pl24-year-of-the-dragon-2024.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pl24"
  },
  {
    "id": "fed2c8cd-ab92-44f6-808a-41e7809bcfe2",
    "name": "Ravnica Remastered",
    "year": 2024,
    "releasedAt": "2024-01-12",
    "code": "RVR",
    "setType": "Masters",
    "cardCount": 531,
    "releaseOrder": 170,
    "icon": {
      "alt": "Ravnica Remastered set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rvr.svg?1780891200",
      "localPath": "/mtg-symbols/0170-rvr-ravnica-remastered.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/rvr"
  },
  {
    "id": "c74a3d37-4b0c-49fd-baa6-9d80756ed50c",
    "name": "Ravnica Remastered Tokens",
    "year": 2024,
    "releasedAt": "2024-01-12",
    "code": "TRVR",
    "setType": "Token",
    "cardCount": 20,
    "releaseOrder": 171,
    "icon": {
      "alt": "Ravnica Remastered Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rvr.svg?1780891200",
      "localPath": "/mtg-symbols/0171-trvr-ravnica-remastered-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/trvr"
  },
  {
    "id": "95e7f33c-9a0e-4775-bf01-9d85dc57aba1",
    "name": "MagicFest 2024",
    "year": 2024,
    "releasedAt": "2024-01-01",
    "code": "PF24",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 172,
    "icon": {
      "alt": "MagicFest 2024 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0172-pf24-magicfest-2024.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pf24"
  },
  {
    "id": "47c94e14-a3a2-4353-910d-dfc310dc869a",
    "name": "Wizards Play Network 2024",
    "year": 2024,
    "releasedAt": "2024-01-01",
    "code": "PW24",
    "setType": "Promo",
    "cardCount": 18,
    "releaseOrder": 173,
    "icon": {
      "alt": "Wizards Play Network 2024 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0173-pw24-wizards-play-network-2024.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pw24"
  },
  {
    "id": "6e26aecd-60e0-4947-b1b2-47ca9416970a",
    "name": "Alchemy: Ixalan",
    "year": 2023,
    "releasedAt": "2023-12-05",
    "code": "YLCI",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 174,
    "icon": {
      "alt": "Alchemy: Ixalan set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y24.svg?1780891200",
      "localPath": "/mtg-symbols/0174-ylci-alchemy-ixalan.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ylci"
  },
  {
    "id": "1135b292-4f02-4eec-8623-a1b7aee474df",
    "name": "The Lost Caverns of Ixalan Art Series",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "ALCI",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 175,
    "icon": {
      "alt": "The Lost Caverns of Ixalan Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lci.svg?1780891200",
      "localPath": "/mtg-symbols/0175-alci-the-lost-caverns-of-ixalan-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/alci"
  },
  {
    "id": "d253edc3-5bc7-4cf1-9446-a8540dedffa5",
    "name": "The Lost Caverns of Ixalan Commander",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "LCC",
    "setType": "Commander",
    "cardCount": 370,
    "releaseOrder": 176,
    "icon": {
      "alt": "The Lost Caverns of Ixalan Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lcc.svg?1780891200",
      "localPath": "/mtg-symbols/0176-lcc-the-lost-caverns-of-ixalan-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/lcc"
  },
  {
    "id": "70169a6e-89d1-4a3a-aef7-3152958d55ac",
    "name": "The Lost Caverns of Ixalan",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "LCI",
    "setType": "Expansion",
    "cardCount": 416,
    "releaseOrder": 177,
    "icon": {
      "alt": "The Lost Caverns of Ixalan set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lci.svg?1780891200",
      "localPath": "/mtg-symbols/0177-lci-the-lost-caverns-of-ixalan.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/lci"
  },
  {
    "id": "c2d4f3dd-aea0-4aec-bf7d-477e625483a6",
    "name": "The Lost Caverns of Ixalan Promos",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "PLCI",
    "setType": "Promo",
    "cardCount": 136,
    "releaseOrder": 178,
    "icon": {
      "alt": "The Lost Caverns of Ixalan Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lci.svg?1780891200",
      "localPath": "/mtg-symbols/0178-plci-the-lost-caverns-of-ixalan-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plci"
  },
  {
    "id": "064626d0-7536-42b9-89a8-334c66fd88ae",
    "name": "March of the Machine: The Aftermath Promos",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "PMAT",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 179,
    "icon": {
      "alt": "March of the Machine: The Aftermath Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mat.svg?1780891200",
      "localPath": "/mtg-symbols/0179-pmat-march-of-the-machine-the-aftermath-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmat"
  },
  {
    "id": "647b6fd3-6935-4b96-85a4-d0191487ea5a",
    "name": "Jurassic World Collection",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "REX",
    "setType": "Eternal",
    "cardCount": 45,
    "releaseOrder": 180,
    "icon": {
      "alt": "Jurassic World Collection set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rex.svg?1780891200",
      "localPath": "/mtg-symbols/0180-rex-jurassic-world-collection.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/rex"
  },
  {
    "id": "e5049c18-a21d-4536-b0dc-16cf66de458d",
    "name": "The Lost Caverns of Ixalan Substitute Cards",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "SLCI",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 181,
    "icon": {
      "alt": "The Lost Caverns of Ixalan Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lci.svg?1780891200",
      "localPath": "/mtg-symbols/0181-slci-the-lost-caverns-of-ixalan-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/slci"
  },
  {
    "id": "c01003a2-b3e2-4e7f-a26d-2348144c8056",
    "name": "Special Guests",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "SPG",
    "setType": "Masterpiece",
    "cardCount": 165,
    "releaseOrder": 182,
    "icon": {
      "alt": "Special Guests set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/spg.svg?1780891200",
      "localPath": "/mtg-symbols/0182-spg-special-guests.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/spg"
  },
  {
    "id": "76e77066-7b87-4e70-82eb-769a17b744fa",
    "name": "The Lost Caverns of Ixalan Commander Tokens",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "TLCC",
    "setType": "Token",
    "cardCount": 18,
    "releaseOrder": 183,
    "icon": {
      "alt": "The Lost Caverns of Ixalan Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lcc.svg?1780891200",
      "localPath": "/mtg-symbols/0183-tlcc-the-lost-caverns-of-ixalan-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tlcc"
  },
  {
    "id": "07ee7ac3-059b-4de5-924a-2bd1b7910c8b",
    "name": "The Lost Caverns of Ixalan Tokens",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "TLCI",
    "setType": "Token",
    "cardCount": 19,
    "releaseOrder": 184,
    "icon": {
      "alt": "The Lost Caverns of Ixalan Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lci.svg?1780891200",
      "localPath": "/mtg-symbols/0184-tlci-the-lost-caverns-of-ixalan-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tlci"
  },
  {
    "id": "883ce74c-d4b4-4ee8-84d2-c1377fea1596",
    "name": "Jurassic World Collection Tokens",
    "year": 2023,
    "releasedAt": "2023-11-17",
    "code": "TREX",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 185,
    "icon": {
      "alt": "Jurassic World Collection Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rex.svg?1780891200",
      "localPath": "/mtg-symbols/0185-trex-jurassic-world-collection-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/trex"
  },
  {
    "id": "32dcab1f-9781-4cb5-9ed3-3d1881f906be",
    "name": "Tales of Middle-earth Scene Box",
    "year": 2023,
    "releasedAt": "2023-11-04",
    "code": "ALTC",
    "setType": "Memorabilia",
    "cardCount": 24,
    "releaseOrder": 186,
    "icon": {
      "alt": "Tales of Middle-earth Scene Box set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ltc.svg?1780891200",
      "localPath": "/mtg-symbols/0186-altc-tales-of-middle-earth-scene-box.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/altc"
  },
  {
    "id": "d2d6e9d3-40dd-4e84-897f-fb8f82fc6b91",
    "name": "Doctor Who Tokens",
    "year": 2023,
    "releasedAt": "2023-10-13",
    "code": "TWHO",
    "setType": "Token",
    "cardCount": 64,
    "releaseOrder": 187,
    "icon": {
      "alt": "Doctor Who Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/who.svg?1780891200",
      "localPath": "/mtg-symbols/0187-twho-doctor-who-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/twho"
  },
  {
    "id": "efdfdd99-cee7-4c11-a5e9-03d60f88bdd6",
    "name": "Doctor Who",
    "year": 2023,
    "releasedAt": "2023-10-13",
    "code": "WHO",
    "setType": "Commander",
    "cardCount": 1178,
    "releaseOrder": 188,
    "icon": {
      "alt": "Doctor Who set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/who.svg?1780891200",
      "localPath": "/mtg-symbols/0188-who-doctor-who.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/who"
  },
  {
    "id": "217f004e-8669-45c9-a0ba-1baf81eefab0",
    "name": "Alchemy: Wilds of Eldraine",
    "year": 2023,
    "releasedAt": "2023-10-10",
    "code": "YWOE",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 189,
    "icon": {
      "alt": "Alchemy: Wilds of Eldraine set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y24.svg?1780891200",
      "localPath": "/mtg-symbols/0189-ywoe-alchemy-wilds-of-eldraine.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ywoe"
  },
  {
    "id": "619b10dc-7915-41ef-9590-83770f3bff68",
    "name": "Wilds of Eldraine Art Series",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "AWOE",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 190,
    "icon": {
      "alt": "Wilds of Eldraine Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/woe.svg?1780891200",
      "localPath": "/mtg-symbols/0190-awoe-wilds-of-eldraine-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/awoe"
  },
  {
    "id": "0cd69528-1ce7-46e0-ac5e-fd10f8699d33",
    "name": "Magic × Duel Masters Promos",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "PMDA",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 191,
    "icon": {
      "alt": "Magic × Duel Masters Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0191-pmda-magic-duel-masters-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmda"
  },
  {
    "id": "b0b68008-d01b-4250-9069-fdd4925213a6",
    "name": "Time Spiral Remastered Promos",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "PTSR",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 192,
    "icon": {
      "alt": "Time Spiral Remastered Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tsr.svg?1780891200",
      "localPath": "/mtg-symbols/0192-ptsr-time-spiral-remastered-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptsr"
  },
  {
    "id": "909bf1bb-3277-41d6-af0f-293df1203099",
    "name": "Wilds of Eldraine Promos",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "PWOE",
    "setType": "Promo",
    "cardCount": 160,
    "releaseOrder": 193,
    "icon": {
      "alt": "Wilds of Eldraine Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/woe.svg?1780891200",
      "localPath": "/mtg-symbols/0193-pwoe-wilds-of-eldraine-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pwoe"
  },
  {
    "id": "1e769157-d90e-4b4f-bd6e-67162a3285ad",
    "name": "Wilds of Eldraine Commander Tokens",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "TWOC",
    "setType": "Token",
    "cardCount": 10,
    "releaseOrder": 194,
    "icon": {
      "alt": "Wilds of Eldraine Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/woc.svg?1780891200",
      "localPath": "/mtg-symbols/0194-twoc-wilds-of-eldraine-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/twoc"
  },
  {
    "id": "273c0661-0af3-4b64-880f-e287799325e9",
    "name": "Wilds of Eldraine Tokens",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "TWOE",
    "setType": "Token",
    "cardCount": 18,
    "releaseOrder": 195,
    "icon": {
      "alt": "Wilds of Eldraine Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/woe.svg?1780891200",
      "localPath": "/mtg-symbols/0195-twoe-wilds-of-eldraine-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/twoe"
  },
  {
    "id": "51c0814a-2db2-4182-9aac-77340e9a540d",
    "name": "Wilds of Eldraine Commander",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "WOC",
    "setType": "Commander",
    "cardCount": 173,
    "releaseOrder": 196,
    "icon": {
      "alt": "Wilds of Eldraine Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/woc.svg?1780891200",
      "localPath": "/mtg-symbols/0196-woc-wilds-of-eldraine-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/woc"
  },
  {
    "id": "79139661-13ee-43c4-8bad-a8c069f1a1df",
    "name": "Wilds of Eldraine",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "WOE",
    "setType": "Expansion",
    "cardCount": 381,
    "releaseOrder": 197,
    "icon": {
      "alt": "Wilds of Eldraine set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/woe.svg?1780891200",
      "localPath": "/mtg-symbols/0197-woe-wilds-of-eldraine.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/woe"
  },
  {
    "id": "d1eba841-452b-4f81-88c9-b32973ac8176",
    "name": "Wilds of Eldraine: Enchanting Tales",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "WOT",
    "setType": "Masterpiece",
    "cardCount": 103,
    "releaseOrder": 198,
    "icon": {
      "alt": "Wilds of Eldraine: Enchanting Tales set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/wot.svg?1780891200",
      "localPath": "/mtg-symbols/0198-wot-wilds-of-eldraine-enchanting-tales.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wot"
  },
  {
    "id": "4cd014a3-abf0-4192-9d55-d96d9c5c7eca",
    "name": "WOE Japanese Promo Tokens",
    "year": 2023,
    "releasedAt": "2023-09-08",
    "code": "WWOE",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 199,
    "icon": {
      "alt": "WOE Japanese Promo Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0199-wwoe-woe-japanese-promo-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wwoe"
  },
  {
    "id": "fb140855-cf1e-4496-9104-7ab45e2afe36",
    "name": "30th Anniversary Celebration Tokyo",
    "year": 2023,
    "releasedAt": "2023-09-01",
    "code": "P30T",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 200,
    "icon": {
      "alt": "30th Anniversary Celebration Tokyo set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0200-p30t-30th-anniversary-celebration-tokyo.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p30t"
  },
  {
    "id": "2b5268ef-c332-4cfc-bd22-804ef512f625",
    "name": "Commander Masters Art Series",
    "year": 2023,
    "releasedAt": "2023-08-04",
    "code": "ACMM",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 201,
    "icon": {
      "alt": "Commander Masters Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cmm.svg?1780891200",
      "localPath": "/mtg-symbols/0201-acmm-commander-masters-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/acmm"
  },
  {
    "id": "cd05036f-2698-43e6-a48e-5c8d82f0a551",
    "name": "Commander Masters",
    "year": 2023,
    "releasedAt": "2023-08-04",
    "code": "CMM",
    "setType": "Masters",
    "cardCount": 1067,
    "releaseOrder": 202,
    "icon": {
      "alt": "Commander Masters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cmm.svg?1780891200",
      "localPath": "/mtg-symbols/0202-cmm-commander-masters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cmm"
  },
  {
    "id": "3fa29655-8840-4a5b-8289-3964109e436b",
    "name": "Commander Masters Tokens",
    "year": 2023,
    "releasedAt": "2023-08-04",
    "code": "TCMM",
    "setType": "Token",
    "cardCount": 81,
    "releaseOrder": 203,
    "icon": {
      "alt": "Commander Masters Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cmm.svg?1780891200",
      "localPath": "/mtg-symbols/0203-tcmm-commander-masters-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tcmm"
  },
  {
    "id": "db138fa6-33da-4062-9e48-712cdb893528",
    "name": "2022 Heroes of the Realm",
    "year": 2023,
    "releasedAt": "2023-08-01",
    "code": "PH22",
    "setType": "Funny",
    "cardCount": 5,
    "releaseOrder": 204,
    "icon": {
      "alt": "2022 Heroes of the Realm set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0204-ph22-2022-heroes-of-the-realm.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ph22"
  },
  {
    "id": "b94d7cb4-b974-4863-b741-b1619f3fcb73",
    "name": "Explorer Anthology 3",
    "year": 2023,
    "releasedAt": "2023-07-18",
    "code": "EA3",
    "setType": "Box",
    "cardCount": 25,
    "releaseOrder": 205,
    "icon": {
      "alt": "Explorer Anthology 3 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0205-ea3-explorer-anthology-3.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ea3"
  },
  {
    "id": "da212dd5-8312-4723-b043-d9e9f2e479f2",
    "name": "Historic Anthology 7",
    "year": 2023,
    "releasedAt": "2023-07-18",
    "code": "HA7",
    "setType": "Box",
    "cardCount": 25,
    "releaseOrder": 206,
    "icon": {
      "alt": "Historic Anthology 7 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ha1.svg?1780891200",
      "localPath": "/mtg-symbols/0206-ha7-historic-anthology-7.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ha7"
  },
  {
    "id": "14b6bb0f-b54e-49c6-adfa-984129093046",
    "name": "MagicFest 2023",
    "year": 2023,
    "releasedAt": "2023-07-01",
    "code": "PF23",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 207,
    "icon": {
      "alt": "MagicFest 2023 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0207-pf23-magicfest-2023.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pf23"
  },
  {
    "id": "af23b3cb-d42f-426b-90f0-8a07fcb302b8",
    "name": "Tales of Middle-earth Art Series",
    "year": 2023,
    "releasedAt": "2023-06-23",
    "code": "ALTR",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 208,
    "icon": {
      "alt": "Tales of Middle-earth Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ltr.svg?1780891200",
      "localPath": "/mtg-symbols/0208-altr-tales-of-middle-earth-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/altr"
  },
  {
    "id": "5228e74d-3e0f-47e7-b674-3af565ce04ec",
    "name": "Tales of Middle-earth Front Cards",
    "year": 2023,
    "releasedAt": "2023-06-23",
    "code": "FLTR",
    "setType": "Memorabilia",
    "cardCount": 10,
    "releaseOrder": 209,
    "icon": {
      "alt": "Tales of Middle-earth Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ltr.svg?1780891200",
      "localPath": "/mtg-symbols/0209-fltr-tales-of-middle-earth-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fltr"
  },
  {
    "id": "e567c19c-0fe4-446e-a7bf-fce8a150cd2e",
    "name": "Tales of Middle-earth Commander",
    "year": 2023,
    "releasedAt": "2023-06-23",
    "code": "LTC",
    "setType": "Commander",
    "cardCount": 591,
    "releaseOrder": 210,
    "icon": {
      "alt": "Tales of Middle-earth Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ltc.svg?1780891200",
      "localPath": "/mtg-symbols/0210-ltc-tales-of-middle-earth-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ltc"
  },
  {
    "id": "08078706-ac5d-439b-8f01-894d38751367",
    "name": "The Lord of the Rings: Tales of Middle-earth",
    "year": 2023,
    "releasedAt": "2023-06-23",
    "code": "LTR",
    "setType": "Draft Innovation",
    "cardCount": 856,
    "releaseOrder": 211,
    "icon": {
      "alt": "The Lord of the Rings: Tales of Middle-earth set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ltr.svg?1780891200",
      "localPath": "/mtg-symbols/0211-ltr-the-lord-of-the-rings-tales-of-middle-earth.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ltr"
  },
  {
    "id": "2e22cc80-7a77-4719-8807-4d63f832c585",
    "name": "The Lord of the Rings: Tales of Middle-earth Minigames",
    "year": 2023,
    "releasedAt": "2023-06-23",
    "code": "MLTR",
    "setType": "Minigame",
    "cardCount": 1,
    "releaseOrder": 212,
    "icon": {
      "alt": "The Lord of the Rings: Tales of Middle-earth Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ltr.svg?1780891200",
      "localPath": "/mtg-symbols/0212-mltr-the-lord-of-the-rings-tales-of-middle-earth-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mltr"
  },
  {
    "id": "1012754e-18e5-4a76-b9a3-24c55eaab1c5",
    "name": "Tales of Middle-earth Promos",
    "year": 2023,
    "releasedAt": "2023-06-23",
    "code": "PLTR",
    "setType": "Promo",
    "cardCount": 86,
    "releaseOrder": 213,
    "icon": {
      "alt": "Tales of Middle-earth Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ltr.svg?1780891200",
      "localPath": "/mtg-symbols/0213-pltr-tales-of-middle-earth-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pltr"
  },
  {
    "id": "e88d1f88-385e-4cdc-afbb-c23f3d48f61a",
    "name": "Tales of Middle-earth Commander Tokens",
    "year": 2023,
    "releasedAt": "2023-06-23",
    "code": "TLTC",
    "setType": "Token",
    "cardCount": 15,
    "releaseOrder": 214,
    "icon": {
      "alt": "Tales of Middle-earth Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ltc.svg?1780891200",
      "localPath": "/mtg-symbols/0214-tltc-tales-of-middle-earth-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tltc"
  },
  {
    "id": "f6267b1d-21e9-4a7f-a5b3-7c2af4fc958b",
    "name": "Tales of Middle-earth Tokens",
    "year": 2023,
    "releasedAt": "2023-06-23",
    "code": "TLTR",
    "setType": "Token",
    "cardCount": 25,
    "releaseOrder": 215,
    "icon": {
      "alt": "Tales of Middle-earth Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ltr.svg?1780891200",
      "localPath": "/mtg-symbols/0215-tltr-tales-of-middle-earth-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tltr"
  },
  {
    "id": "6727e43d-31b6-45b0-ae05-7a811ba72f70",
    "name": "March of the Machine: The Aftermath",
    "year": 2023,
    "releasedAt": "2023-05-12",
    "code": "MAT",
    "setType": "Expansion",
    "cardCount": 230,
    "releaseOrder": 216,
    "icon": {
      "alt": "March of the Machine: The Aftermath set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mat.svg?1780891200",
      "localPath": "/mtg-symbols/0216-mat-march-of-the-machine-the-aftermath.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mat"
  },
  {
    "id": "f835c2e6-0f96-4a98-9e6c-5d2836ce1c54",
    "name": "March of the Machine Art Series",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "AMOM",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 217,
    "icon": {
      "alt": "March of the Machine Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mom.svg?1780891200",
      "localPath": "/mtg-symbols/0217-amom-march-of-the-machine-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/amom"
  },
  {
    "id": "edb1f50c-2155-469c-b134-eb2d803c4e99",
    "name": "March of the Machine Jumpstart Front Cards",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "FMOM",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 218,
    "icon": {
      "alt": "March of the Machine Jumpstart Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mom.svg?1780891200",
      "localPath": "/mtg-symbols/0218-fmom-march-of-the-machine-jumpstart-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fmom"
  },
  {
    "id": "6bba5de9-5afb-42af-a7eb-24ac854bf671",
    "name": "March of the Machine Commander",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "MOC",
    "setType": "Commander",
    "cardCount": 450,
    "releaseOrder": 219,
    "icon": {
      "alt": "March of the Machine Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/moc.svg?1780891200",
      "localPath": "/mtg-symbols/0219-moc-march-of-the-machine-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/moc"
  },
  {
    "id": "392f7315-dc53-40a3-a2cc-5482dbd498b3",
    "name": "March of the Machine",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "MOM",
    "setType": "Expansion",
    "cardCount": 387,
    "releaseOrder": 220,
    "icon": {
      "alt": "March of the Machine set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mom.svg?1780891200",
      "localPath": "/mtg-symbols/0220-mom-march-of-the-machine.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mom"
  },
  {
    "id": "a3f8daea-b24e-4e5c-a4d9-ec8910e9078a",
    "name": "Multiverse Legends",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "MUL",
    "setType": "Masterpiece",
    "cardCount": 261,
    "releaseOrder": 221,
    "icon": {
      "alt": "Multiverse Legends set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mul.svg?1780891200",
      "localPath": "/mtg-symbols/0221-mul-multiverse-legends.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mul"
  },
  {
    "id": "4af147e4-cf99-4f32-a77e-d116412f469a",
    "name": "March of the Machine Promos",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "PMOM",
    "setType": "Promo",
    "cardCount": 144,
    "releaseOrder": 222,
    "icon": {
      "alt": "March of the Machine Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mom.svg?1780891200",
      "localPath": "/mtg-symbols/0222-pmom-march-of-the-machine-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmom"
  },
  {
    "id": "69cb6b1c-61db-4d66-beee-b849b34a519c",
    "name": "March of the Machine Substitute Cards",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "SMOM",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 223,
    "icon": {
      "alt": "March of the Machine Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mom.svg?1780891200",
      "localPath": "/mtg-symbols/0223-smom-march-of-the-machine-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/smom"
  },
  {
    "id": "f61d6546-a7e4-438b-99ce-58a483a4fd9a",
    "name": "March of the Machine Commander Tokens",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "TMOC",
    "setType": "Token",
    "cardCount": 46,
    "releaseOrder": 224,
    "icon": {
      "alt": "March of the Machine Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/moc.svg?1780891200",
      "localPath": "/mtg-symbols/0224-tmoc-march-of-the-machine-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmoc"
  },
  {
    "id": "2c73a39a-a359-41e7-879a-3857234f2a4b",
    "name": "March of the Machine Tokens",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "TMOM",
    "setType": "Token",
    "cardCount": 23,
    "releaseOrder": 225,
    "icon": {
      "alt": "March of the Machine Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mom.svg?1780891200",
      "localPath": "/mtg-symbols/0225-tmom-march-of-the-machine-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmom"
  },
  {
    "id": "fd03645a-f585-43e2-94d3-f8932b7e9284",
    "name": "Multiverse Legends Tokens",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "TMUL",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 226,
    "icon": {
      "alt": "Multiverse Legends Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mul.svg?1780891200",
      "localPath": "/mtg-symbols/0226-tmul-multiverse-legends-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmul"
  },
  {
    "id": "19e95cc8-2387-4ea4-9045-19a130effe7f",
    "name": "MOM Japanese Promo Tokens",
    "year": 2023,
    "releasedAt": "2023-04-21",
    "code": "WMOM",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 227,
    "icon": {
      "alt": "MOM Japanese Promo Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mom.svg?1780891200",
      "localPath": "/mtg-symbols/0227-wmom-mom-japanese-promo-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wmom"
  },
  {
    "id": "c3694ff5-7b12-4f29-8d82-2c9b553ac60e",
    "name": "Shadows over Innistrad Remastered",
    "year": 2023,
    "releasedAt": "2023-03-21",
    "code": "SIR",
    "setType": "Masters",
    "cardCount": 294,
    "releaseOrder": 228,
    "icon": {
      "alt": "Shadows over Innistrad Remastered set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sir.svg?1780891200",
      "localPath": "/mtg-symbols/0228-sir-shadows-over-innistrad-remastered.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sir"
  },
  {
    "id": "5b046a48-760d-4192-a8e8-8725c9052a6e",
    "name": "Shadows of the Past",
    "year": 2023,
    "releasedAt": "2023-03-21",
    "code": "SIS",
    "setType": "Masters",
    "cardCount": 76,
    "releaseOrder": 229,
    "icon": {
      "alt": "Shadows of the Past set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sis.svg?1780891200",
      "localPath": "/mtg-symbols/0229-sis-shadows-of-the-past.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sis"
  },
  {
    "id": "d34ef41f-624e-4bf2-9cec-7a7325e474c5",
    "name": "Alchemy: Phyrexia",
    "year": 2023,
    "releasedAt": "2023-02-28",
    "code": "YONE",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 230,
    "icon": {
      "alt": "Alchemy: Phyrexia set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y23.svg?1780891200",
      "localPath": "/mtg-symbols/0230-yone-alchemy-phyrexia.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/yone"
  },
  {
    "id": "c325b3f9-51e1-416b-83b1-138f11790dd1",
    "name": "Secret Lair Promo",
    "year": 2023,
    "releasedAt": "2023-02-17",
    "code": "SLP",
    "setType": "Promo",
    "cardCount": 54,
    "releaseOrder": 231,
    "icon": {
      "alt": "Secret Lair Promo set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0231-slp-secret-lair-promo.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/slp"
  },
  {
    "id": "d2703c4f-66b6-438d-9368-ebb55aa12e78",
    "name": "Unknown Event",
    "year": 2023,
    "releasedAt": "2023-02-15",
    "code": "UNK",
    "setType": "Funny",
    "cardCount": 511,
    "releaseOrder": 232,
    "icon": {
      "alt": "Unknown Event set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/planeswalker.svg?1780891200",
      "localPath": "/mtg-symbols/0232-unk-unknown-event.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/unk"
  },
  {
    "id": "8c5e86d4-ae2d-42f7-a0e5-0e4141eb953d",
    "name": "Phyrexia: All Will Be One Commander",
    "year": 2023,
    "releasedAt": "2023-02-10",
    "code": "ONC",
    "setType": "Commander",
    "cardCount": 174,
    "releaseOrder": 233,
    "icon": {
      "alt": "Phyrexia: All Will Be One Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/onc.svg?1780891200",
      "localPath": "/mtg-symbols/0233-onc-phyrexia-all-will-be-one-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/onc"
  },
  {
    "id": "04bef644-343f-4230-95ee-255f29aa67a2",
    "name": "Phyrexia: All Will Be One",
    "year": 2023,
    "releasedAt": "2023-02-10",
    "code": "ONE",
    "setType": "Expansion",
    "cardCount": 479,
    "releaseOrder": 234,
    "icon": {
      "alt": "Phyrexia: All Will Be One set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/one.svg?1780891200",
      "localPath": "/mtg-symbols/0234-one-phyrexia-all-will-be-one.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/one"
  },
  {
    "id": "5461ef40-3b5c-49ea-81d9-67f4ae77c2b5",
    "name": "Year of the Rabbit 2023",
    "year": 2023,
    "releasedAt": "2023-02-10",
    "code": "PL23",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 235,
    "icon": {
      "alt": "Year of the Rabbit 2023 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0235-pl23-year-of-the-rabbit-2023.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pl23"
  },
  {
    "id": "a43681f0-e7f5-415b-bf1f-f9e52ad8213c",
    "name": "Phyrexia: All Will Be One Promos",
    "year": 2023,
    "releasedAt": "2023-02-10",
    "code": "PONE",
    "setType": "Promo",
    "cardCount": 160,
    "releaseOrder": 236,
    "icon": {
      "alt": "Phyrexia: All Will Be One Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/one.svg?1780891200",
      "localPath": "/mtg-symbols/0236-pone-phyrexia-all-will-be-one-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pone"
  },
  {
    "id": "7024a171-1b99-49dc-8777-0db9c552eb06",
    "name": "Phyrexia: All Will Be One Art Series",
    "year": 2023,
    "releasedAt": "2023-02-03",
    "code": "AONE",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 237,
    "icon": {
      "alt": "Phyrexia: All Will Be One Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/one.svg?1780891200",
      "localPath": "/mtg-symbols/0237-aone-phyrexia-all-will-be-one-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aone"
  },
  {
    "id": "afd227e8-5f97-4227-bc81-532ca2a2201e",
    "name": "Phyrexia: All Will Be One Jumpstart Front Cards",
    "year": 2023,
    "releasedAt": "2023-02-03",
    "code": "FONE",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 238,
    "icon": {
      "alt": "Phyrexia: All Will Be One Jumpstart Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/one.svg?1780891200",
      "localPath": "/mtg-symbols/0238-fone-phyrexia-all-will-be-one-jumpstart-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fone"
  },
  {
    "id": "373c3b45-3ba4-4c8a-a84e-575ece096062",
    "name": "Phyrexia: All Will Be One Minigames",
    "year": 2023,
    "releasedAt": "2023-02-03",
    "code": "MONE",
    "setType": "Minigame",
    "cardCount": 5,
    "releaseOrder": 239,
    "icon": {
      "alt": "Phyrexia: All Will Be One Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/one.svg?1780891200",
      "localPath": "/mtg-symbols/0239-mone-phyrexia-all-will-be-one-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mone"
  },
  {
    "id": "04ed1b78-cc80-4888-9536-c69facdc19e3",
    "name": "Phyrexia: All Will Be One Commander Tokens",
    "year": 2023,
    "releasedAt": "2023-02-03",
    "code": "TONC",
    "setType": "Token",
    "cardCount": 23,
    "releaseOrder": 240,
    "icon": {
      "alt": "Phyrexia: All Will Be One Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/onc.svg?1780891200",
      "localPath": "/mtg-symbols/0240-tonc-phyrexia-all-will-be-one-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tonc"
  },
  {
    "id": "e7b7618d-1fa1-44a8-9cd7-7fe360626917",
    "name": "Phyrexia: All Will Be One Tokens",
    "year": 2023,
    "releasedAt": "2023-02-03",
    "code": "TONE",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 241,
    "icon": {
      "alt": "Phyrexia: All Will Be One Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/one.svg?1780891200",
      "localPath": "/mtg-symbols/0241-tone-phyrexia-all-will-be-one-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tone"
  },
  {
    "id": "59fd7824-7248-420f-95bf-5c23bfbad276",
    "name": "ONE Japanese Promo Tokens",
    "year": 2023,
    "releasedAt": "2023-01-27",
    "code": "WONE",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 242,
    "icon": {
      "alt": "ONE Japanese Promo Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/one.svg?1780891200",
      "localPath": "/mtg-symbols/0242-wone-one-japanese-promo-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wone"
  },
  {
    "id": "ca4c2884-e539-4b7f-980d-5d6a50220f2a",
    "name": "Dominaria Remastered",
    "year": 2023,
    "releasedAt": "2023-01-13",
    "code": "DMR",
    "setType": "Masters",
    "cardCount": 457,
    "releaseOrder": 243,
    "icon": {
      "alt": "Dominaria Remastered set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmr.svg?1780891200",
      "localPath": "/mtg-symbols/0243-dmr-dominaria-remastered.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dmr"
  },
  {
    "id": "d583889f-a8c3-48ce-82c1-361c06de93dc",
    "name": "Dominaria Remastered Tokens",
    "year": 2023,
    "releasedAt": "2023-01-13",
    "code": "TDMR",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 244,
    "icon": {
      "alt": "Dominaria Remastered Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmr.svg?1780891200",
      "localPath": "/mtg-symbols/0244-tdmr-dominaria-remastered-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdmr"
  },
  {
    "id": "6865f8ba-0884-498a-acd9-a765d7368e89",
    "name": "Regional Championship Qualifiers 2023",
    "year": 2023,
    "releasedAt": "2023-01-07",
    "code": "PR23",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 245,
    "icon": {
      "alt": "Regional Championship Qualifiers 2023 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0245-pr23-regional-championship-qualifiers-2023.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pr23"
  },
  {
    "id": "0ccafe7e-c9ee-4742-89fd-06f1e14eacb0",
    "name": "Judge Gift Cards 2023",
    "year": 2023,
    "releasedAt": "2023-01-01",
    "code": "P23",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 246,
    "icon": {
      "alt": "Judge Gift Cards 2023 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/archie.svg?1780891200",
      "localPath": "/mtg-symbols/0246-p23-judge-gift-cards-2023.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p23"
  },
  {
    "id": "3963badb-c147-489a-95a7-6520a2960bf6",
    "name": "Wizards Play Network 2023",
    "year": 2023,
    "releasedAt": "2023-01-01",
    "code": "PW23",
    "setType": "Promo",
    "cardCount": 11,
    "releaseOrder": 247,
    "icon": {
      "alt": "Wizards Play Network 2023 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0247-pw23-wizards-play-network-2023.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pw23"
  },
  {
    "id": "c1dd276e-baf6-4f3c-ba8f-3c1bd0cdefb8",
    "name": "Explorer Anthology 2",
    "year": 2022,
    "releasedAt": "2022-12-13",
    "code": "EA2",
    "setType": "Box",
    "cardCount": 25,
    "releaseOrder": 248,
    "icon": {
      "alt": "Explorer Anthology 2 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0248-ea2-explorer-anthology-2.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ea2"
  },
  {
    "id": "5e5f43cc-2312-426e-8ba3-8cda4c2dbba2",
    "name": "Alchemy: The Brothers' War",
    "year": 2022,
    "releasedAt": "2022-12-13",
    "code": "YBRO",
    "setType": "Alchemy",
    "cardCount": 31,
    "releaseOrder": 249,
    "icon": {
      "alt": "Alchemy: The Brothers' War set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y23.svg?1780891200",
      "localPath": "/mtg-symbols/0249-ybro-alchemy-the-brothers-war.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ybro"
  },
  {
    "id": "9b4a88ff-aaf6-4d4c-b323-9aa54df192bf",
    "name": "Jumpstart 2022 Front Cards",
    "year": 2022,
    "releasedAt": "2022-12-02",
    "code": "FJ22",
    "setType": "Memorabilia",
    "cardCount": 46,
    "releaseOrder": 250,
    "icon": {
      "alt": "Jumpstart 2022 Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/j22.svg?1780891200",
      "localPath": "/mtg-symbols/0250-fj22-jumpstart-2022-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fj22"
  },
  {
    "id": "247df475-e4ce-4e5e-9317-11892d2211e0",
    "name": "Jumpstart 2022",
    "year": 2022,
    "releasedAt": "2022-12-02",
    "code": "J22",
    "setType": "Draft Innovation",
    "cardCount": 835,
    "releaseOrder": 251,
    "icon": {
      "alt": "Jumpstart 2022 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/j22.svg?1780891200",
      "localPath": "/mtg-symbols/0251-j22-jumpstart-2022.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j22"
  },
  {
    "id": "adc5d965-43ea-46bc-aebd-8a39282ce168",
    "name": "Starter Commander Decks",
    "year": 2022,
    "releasedAt": "2022-12-02",
    "code": "SCD",
    "setType": "Commander",
    "cardCount": 352,
    "releaseOrder": 252,
    "icon": {
      "alt": "Starter Commander Decks set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/scd.svg?1780891200",
      "localPath": "/mtg-symbols/0252-scd-starter-commander-decks.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/scd"
  },
  {
    "id": "46b761a4-df4f-47e8-bcf6-2a55bb511fc4",
    "name": "Starter Commander Deck Tokens",
    "year": 2022,
    "releasedAt": "2022-12-02",
    "code": "TSCD",
    "setType": "Token",
    "cardCount": 27,
    "releaseOrder": 253,
    "icon": {
      "alt": "Starter Commander Deck Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/scd.svg?1780891200",
      "localPath": "/mtg-symbols/0253-tscd-starter-commander-deck-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tscd"
  },
  {
    "id": "c3cddb17-44d9-4abd-8d19-666f6c5171fe",
    "name": "30th Anniversary Edition",
    "year": 2022,
    "releasedAt": "2022-11-28",
    "code": "30A",
    "setType": "Memorabilia",
    "cardCount": 594,
    "releaseOrder": 254,
    "icon": {
      "alt": "30th Anniversary Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/30a.svg?1780891200",
      "localPath": "/mtg-symbols/0254-30a-30th-anniversary-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/30a"
  },
  {
    "id": "3f5e3680-ab46-4517-9444-38d367b01f92",
    "name": "30th Anniversary Tokens",
    "year": 2022,
    "releasedAt": "2022-11-28",
    "code": "T30A",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 255,
    "icon": {
      "alt": "30th Anniversary Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/30a.svg?1780891200",
      "localPath": "/mtg-symbols/0255-t30a-30th-anniversary-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/t30a"
  },
  {
    "id": "80e2b258-2a37-4c71-a13d-9860d8bd8807",
    "name": "Eternal Weekend",
    "year": 2022,
    "releasedAt": "2022-11-26",
    "code": "PEWK",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 256,
    "icon": {
      "alt": "Eternal Weekend set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0256-pewk-eternal-weekend.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pewk"
  },
  {
    "id": "6e00ad96-8258-4430-b6ee-040f92bc8d99",
    "name": "The Brothers' War Art Series",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "ABRO",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 257,
    "icon": {
      "alt": "The Brothers' War Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bro.svg?1780891200",
      "localPath": "/mtg-symbols/0257-abro-the-brothers-war-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/abro"
  },
  {
    "id": "59ed954b-74c0-4db3-8a2b-1d395e33288e",
    "name": "Transformers",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "BOT",
    "setType": "Eternal",
    "cardCount": 29,
    "releaseOrder": 258,
    "icon": {
      "alt": "Transformers set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bot.svg?1780891200",
      "localPath": "/mtg-symbols/0258-bot-transformers.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/bot"
  },
  {
    "id": "81d56780-1efc-4487-9803-43d634ca13d0",
    "name": "The Brothers' War Commander",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "BRC",
    "setType": "Commander",
    "cardCount": 209,
    "releaseOrder": 259,
    "icon": {
      "alt": "The Brothers' War Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/brc.svg?1780891200",
      "localPath": "/mtg-symbols/0259-brc-the-brothers-war-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/brc"
  },
  {
    "id": "4219a14e-6701-4ddd-a185-21dc054ab19b",
    "name": "The Brothers' War",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "BRO",
    "setType": "Expansion",
    "cardCount": 399,
    "releaseOrder": 260,
    "icon": {
      "alt": "The Brothers' War set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bro.svg?1780891200",
      "localPath": "/mtg-symbols/0260-bro-the-brothers-war.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/bro"
  },
  {
    "id": "1dbdd608-c330-4199-901f-9d141ae03786",
    "name": "The Brothers' War Retro Artifacts",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "BRR",
    "setType": "Masterpiece",
    "cardCount": 189,
    "releaseOrder": 261,
    "icon": {
      "alt": "The Brothers' War Retro Artifacts set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/brr.svg?1780891200",
      "localPath": "/mtg-symbols/0261-brr-the-brothers-war-retro-artifacts.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/brr"
  },
  {
    "id": "bd279a7c-3288-4535-bde4-801fc9b64750",
    "name": "The Brothers' War Jumpstart Front Cards",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "FBRO",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 262,
    "icon": {
      "alt": "The Brothers' War Jumpstart Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bro.svg?1780891200",
      "localPath": "/mtg-symbols/0262-fbro-the-brothers-war-jumpstart-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fbro"
  },
  {
    "id": "6c570f6d-eacf-47e4-8d9c-328dd919657d",
    "name": "The Brothers' War Minigames",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "MBRO",
    "setType": "Minigame",
    "cardCount": 3,
    "releaseOrder": 263,
    "icon": {
      "alt": "The Brothers' War Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bro.svg?1780891200",
      "localPath": "/mtg-symbols/0263-mbro-the-brothers-war-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mbro"
  },
  {
    "id": "7e8b0464-6ce5-4184-abc7-3de544eebc6a",
    "name": "The Brothers' War Promos",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "PBRO",
    "setType": "Promo",
    "cardCount": 171,
    "releaseOrder": 264,
    "icon": {
      "alt": "The Brothers' War Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bro.svg?1780891200",
      "localPath": "/mtg-symbols/0264-pbro-the-brothers-war-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pbro"
  },
  {
    "id": "8650bb2b-88b4-4769-bb10-1c6107b37bdd",
    "name": "The Brothers' War Southeast Asia Tokens",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "PTBRO",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 265,
    "icon": {
      "alt": "The Brothers' War Southeast Asia Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bro.svg?1780891200",
      "localPath": "/mtg-symbols/0265-ptbro-the-brothers-war-southeast-asia-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptbro"
  },
  {
    "id": "440c0aa1-45ce-4323-a74b-b9d3d9f0513c",
    "name": "The Brothers' War Substitute Cards",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "SBRO",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 266,
    "icon": {
      "alt": "The Brothers' War Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bro.svg?1780891200",
      "localPath": "/mtg-symbols/0266-sbro-the-brothers-war-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sbro"
  },
  {
    "id": "99e9841c-837b-4920-9165-1c7ef693f40e",
    "name": "Transformers Tokens",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "TBOT",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 267,
    "icon": {
      "alt": "Transformers Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bot.svg?1780891200",
      "localPath": "/mtg-symbols/0267-tbot-transformers-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tbot"
  },
  {
    "id": "32685506-c036-4773-9ccd-2ef50f28b2a1",
    "name": "The Brothers' War Commander Tokens",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "TBRC",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 268,
    "icon": {
      "alt": "The Brothers' War Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/brc.svg?1780891200",
      "localPath": "/mtg-symbols/0268-tbrc-the-brothers-war-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tbrc"
  },
  {
    "id": "2279da90-6de2-4335-b846-6000707940b0",
    "name": "The Brothers' War Tokens",
    "year": 2022,
    "releasedAt": "2022-11-18",
    "code": "TBRO",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 269,
    "icon": {
      "alt": "The Brothers' War Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bro.svg?1780891200",
      "localPath": "/mtg-symbols/0269-tbro-the-brothers-war-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tbro"
  },
  {
    "id": "8224dce1-ca9c-45af-ac77-78bfc6042ae2",
    "name": "Secret Lair Countdown",
    "year": 2022,
    "releasedAt": "2022-11-01",
    "code": "SLC",
    "setType": "Box",
    "cardCount": 84,
    "releaseOrder": 270,
    "icon": {
      "alt": "Secret Lair Countdown set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0270-slc-secret-lair-countdown.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/slc"
  },
  {
    "id": "fe88ea3a-0e2c-44b9-9210-35bfdec1e288",
    "name": "Game Night: Free-for-All",
    "year": 2022,
    "releasedAt": "2022-10-14",
    "code": "GN3",
    "setType": "Box",
    "cardCount": 135,
    "releaseOrder": 271,
    "icon": {
      "alt": "Game Night: Free-for-All set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gn3.svg?1780891200",
      "localPath": "/mtg-symbols/0271-gn3-game-night-free-for-all.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gn3"
  },
  {
    "id": "652510f2-c873-4c82-9f8c-5cc4c5ea80ba",
    "name": "Game Night: Free-for-All Tokens",
    "year": 2022,
    "releasedAt": "2022-10-14",
    "code": "TGN3",
    "setType": "Token",
    "cardCount": 10,
    "releaseOrder": 272,
    "icon": {
      "alt": "Game Night: Free-for-All Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gn3.svg?1780891200",
      "localPath": "/mtg-symbols/0272-tgn3-game-night-free-for-all-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tgn3"
  },
  {
    "id": "f35f5dd8-5b95-4f52-bbe7-1c62909a8d08",
    "name": "Warhammer 40,000 Commander",
    "year": 2022,
    "releasedAt": "2022-10-07",
    "code": "40K",
    "setType": "Commander",
    "cardCount": 617,
    "releaseOrder": 273,
    "icon": {
      "alt": "Warhammer 40,000 Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/40k.svg?1780891200",
      "localPath": "/mtg-symbols/0273-40k-warhammer-40-000-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/40k"
  },
  {
    "id": "565e3302-2fed-487e-a0f7-7f8037d25030",
    "name": "Unfinity Sticker Sheets",
    "year": 2022,
    "releasedAt": "2022-10-07",
    "code": "SUNF",
    "setType": "Funny",
    "cardCount": 48,
    "releaseOrder": 274,
    "icon": {
      "alt": "Unfinity Sticker Sheets set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/unf.svg?1780891200",
      "localPath": "/mtg-symbols/0274-sunf-unfinity-sticker-sheets.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sunf"
  },
  {
    "id": "671f2e10-501c-42ef-a1e3-9aa63ec3ec6c",
    "name": "Warhammer 40,000 Tokens",
    "year": 2022,
    "releasedAt": "2022-10-07",
    "code": "T40K",
    "setType": "Token",
    "cardCount": 31,
    "releaseOrder": 275,
    "icon": {
      "alt": "Warhammer 40,000 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/40k.svg?1780891200",
      "localPath": "/mtg-symbols/0275-t40k-warhammer-40-000-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/t40k"
  },
  {
    "id": "a60124f9-8002-4769-ac16-387b61fa2bc6",
    "name": "Unfinity Tokens",
    "year": 2022,
    "releasedAt": "2022-10-07",
    "code": "TUNF",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 276,
    "icon": {
      "alt": "Unfinity Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/unf.svg?1780891200",
      "localPath": "/mtg-symbols/0276-tunf-unfinity-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tunf"
  },
  {
    "id": "455ba7d5-aa10-4a08-bc1a-361f4d5e6219",
    "name": "The List (Unfinity Foil Edition)",
    "year": 2022,
    "releasedAt": "2022-10-07",
    "code": "ULST",
    "setType": "Funny",
    "cardCount": 62,
    "releaseOrder": 277,
    "icon": {
      "alt": "The List (Unfinity Foil Edition) set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/planeswalker.svg?1780891200",
      "localPath": "/mtg-symbols/0277-ulst-the-list-unfinity-foil-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ulst"
  },
  {
    "id": "b314f553-8f07-4ba9-96c8-16be7784eff3",
    "name": "Unfinity",
    "year": 2022,
    "releasedAt": "2022-10-07",
    "code": "UNF",
    "setType": "Funny",
    "cardCount": 639,
    "releaseOrder": 278,
    "icon": {
      "alt": "Unfinity set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/unf.svg?1780891200",
      "localPath": "/mtg-symbols/0278-unf-unfinity.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/unf"
  },
  {
    "id": "63e08e74-9029-40c3-887a-56211c15ab21",
    "name": "Alchemy: Dominaria",
    "year": 2022,
    "releasedAt": "2022-10-05",
    "code": "YDMU",
    "setType": "Alchemy",
    "cardCount": 39,
    "releaseOrder": 279,
    "icon": {
      "alt": "Alchemy: Dominaria set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y23.svg?1780891200",
      "localPath": "/mtg-symbols/0279-ydmu-alchemy-dominaria.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ydmu"
  },
  {
    "id": "16c10b7c-f1f5-432f-a54d-ca76cf262c6d",
    "name": "Regional Championship Qualifiers 2022",
    "year": 2022,
    "releasedAt": "2022-10-01",
    "code": "PRCQ",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 280,
    "icon": {
      "alt": "Regional Championship Qualifiers 2022 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0280-prcq-regional-championship-qualifiers-2022.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/prcq"
  },
  {
    "id": "8aaceeb7-7dd8-4fda-a95e-d9ec9c50860a",
    "name": "Dominaria United Art Series",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "ADMU",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 281,
    "icon": {
      "alt": "Dominaria United Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmu.svg?1780891200",
      "localPath": "/mtg-symbols/0281-admu-dominaria-united-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/admu"
  },
  {
    "id": "78076b27-f888-4723-b27c-44074accd261",
    "name": "Dominaria United Commander",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "DMC",
    "setType": "Commander",
    "cardCount": 240,
    "releaseOrder": 282,
    "icon": {
      "alt": "Dominaria United Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmc.svg?1780891200",
      "localPath": "/mtg-symbols/0282-dmc-dominaria-united-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dmc"
  },
  {
    "id": "4e47a6cd-cdeb-4b0f-8f24-cfe1a0127cb3",
    "name": "Dominaria United",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "DMU",
    "setType": "Expansion",
    "cardCount": 453,
    "releaseOrder": 283,
    "icon": {
      "alt": "Dominaria United set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmu.svg?1780891200",
      "localPath": "/mtg-symbols/0283-dmu-dominaria-united.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dmu"
  },
  {
    "id": "3f0fefdd-cd39-4fee-beda-aeb21b8c1787",
    "name": "Dominaria United Jumpstart Front Cards",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "FDMU",
    "setType": "Memorabilia",
    "cardCount": 10,
    "releaseOrder": 284,
    "icon": {
      "alt": "Dominaria United Jumpstart Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmu.svg?1780891200",
      "localPath": "/mtg-symbols/0284-fdmu-dominaria-united-jumpstart-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fdmu"
  },
  {
    "id": "86ed728a-cc0e-4d10-9d12-9f6be42c6ec7",
    "name": "Dominaria United Minigames",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "MDMU",
    "setType": "Minigame",
    "cardCount": 3,
    "releaseOrder": 285,
    "icon": {
      "alt": "Dominaria United Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmu.svg?1780891200",
      "localPath": "/mtg-symbols/0285-mdmu-dominaria-united-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mdmu"
  },
  {
    "id": "796c1128-14f7-44c4-93fd-cf7366caaa25",
    "name": "30th Anniversary History Promos",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "P30H",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 286,
    "icon": {
      "alt": "30th Anniversary History Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0286-p30h-30th-anniversary-history-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p30h"
  },
  {
    "id": "8d8c82dd-0cc2-43b8-8d1c-7620fc4d98d7",
    "name": "Dominaria United Promos",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "PDMU",
    "setType": "Promo",
    "cardCount": 161,
    "releaseOrder": 287,
    "icon": {
      "alt": "Dominaria United Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmu.svg?1780891200",
      "localPath": "/mtg-symbols/0287-pdmu-dominaria-united-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdmu"
  },
  {
    "id": "16641515-88d3-4fc8-9b49-86e2991f1713",
    "name": "Dominaria United Southeast Asia Tokens",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "PTDMU",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 288,
    "icon": {
      "alt": "Dominaria United Southeast Asia Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmu.svg?1780891200",
      "localPath": "/mtg-symbols/0288-ptdmu-dominaria-united-southeast-asia-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptdmu"
  },
  {
    "id": "03a103bc-60be-463f-a2ab-3d2ad5363354",
    "name": "Dominaria United Commander Tokens",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "TDMC",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 289,
    "icon": {
      "alt": "Dominaria United Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmc.svg?1780891200",
      "localPath": "/mtg-symbols/0289-tdmc-dominaria-united-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdmc"
  },
  {
    "id": "1e96e903-601f-4286-b61e-8da021cbceff",
    "name": "Dominaria United Tokens",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "TDMU",
    "setType": "Token",
    "cardCount": 26,
    "releaseOrder": 290,
    "icon": {
      "alt": "Dominaria United Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dmu.svg?1780891200",
      "localPath": "/mtg-symbols/0290-tdmu-dominaria-united-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdmu"
  },
  {
    "id": "b2bb7a14-16a2-4311-ab64-631a0252730c",
    "name": "DMU Japanese Promo Tokens",
    "year": 2022,
    "releasedAt": "2022-09-09",
    "code": "WDMU",
    "setType": "Token",
    "cardCount": 5,
    "releaseOrder": 291,
    "icon": {
      "alt": "DMU Japanese Promo Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0291-wdmu-dmu-japanese-promo-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wdmu"
  },
  {
    "id": "f3d98295-0697-433a-9429-d04600da2295",
    "name": "30th Anniversary Play Promos",
    "year": 2022,
    "releasedAt": "2022-09-02",
    "code": "P30A",
    "setType": "Promo",
    "cardCount": 30,
    "releaseOrder": 292,
    "icon": {
      "alt": "30th Anniversary Play Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0292-p30a-30th-anniversary-play-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p30a"
  },
  {
    "id": "a3ab636c-20a0-4d79-b55a-e097c2a03cd5",
    "name": "30th Anniversary Misc Promos",
    "year": 2022,
    "releasedAt": "2022-09-02",
    "code": "P30M",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 293,
    "icon": {
      "alt": "30th Anniversary Misc Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0293-p30m-30th-anniversary-misc-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p30m"
  },
  {
    "id": "38549f4f-6e79-46d9-b2f9-52ab0245ee06",
    "name": "2021 Heroes of the Realm",
    "year": 2022,
    "releasedAt": "2022-08-01",
    "code": "PH21",
    "setType": "Funny",
    "cardCount": 4,
    "releaseOrder": 294,
    "icon": {
      "alt": "2021 Heroes of the Realm set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0294-ph21-2021-heroes-of-the-realm.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ph21"
  },
  {
    "id": "3e69d407-6a48-4073-97b3-9b7720aed6b6",
    "name": "Summer Vacation Promos 2022",
    "year": 2022,
    "releasedAt": "2022-08-01",
    "code": "PSVC",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 295,
    "icon": {
      "alt": "Summer Vacation Promos 2022 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0295-psvc-summer-vacation-promos-2022.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psvc"
  },
  {
    "id": "a4bc595f-421f-4cd0-9a27-2b9fd7c7c2ac",
    "name": "Explorer Anthology 1",
    "year": 2022,
    "releasedAt": "2022-07-28",
    "code": "EA1",
    "setType": "Box",
    "cardCount": 20,
    "releaseOrder": 296,
    "icon": {
      "alt": "Explorer Anthology 1 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0296-ea1-explorer-anthology-1.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ea1"
  },
  {
    "id": "14717ba4-0497-4257-ae2f-2e0115230d4e",
    "name": "Historic Anthology 6",
    "year": 2022,
    "releasedAt": "2022-07-28",
    "code": "HA6",
    "setType": "Box",
    "cardCount": 20,
    "releaseOrder": 297,
    "icon": {
      "alt": "Historic Anthology 6 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ha1.svg?1780891200",
      "localPath": "/mtg-symbols/0297-ha6-historic-anthology-6.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ha6"
  },
  {
    "id": "211b56b9-961e-4eab-8245-a2f52dd9af47",
    "name": "Store Championships",
    "year": 2022,
    "releasedAt": "2022-07-09",
    "code": "SCH",
    "setType": "Promo",
    "cardCount": 50,
    "releaseOrder": 298,
    "icon": {
      "alt": "Store Championships set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0298-sch-store-championships.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sch"
  },
  {
    "id": "5a645837-b050-449f-ac90-1e7ccbf45031",
    "name": "Double Masters 2022",
    "year": 2022,
    "releasedAt": "2022-07-08",
    "code": "2X2",
    "setType": "Masters",
    "cardCount": 579,
    "releaseOrder": 299,
    "icon": {
      "alt": "Double Masters 2022 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/2x2.svg?1780891200",
      "localPath": "/mtg-symbols/0299-2x2-double-masters-2022.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/2x2"
  },
  {
    "id": "9645dac1-faea-41a3-83c3-20df714c2c92",
    "name": "Double Masters 2022 Tokens",
    "year": 2022,
    "releasedAt": "2022-07-08",
    "code": "T2X2",
    "setType": "Token",
    "cardCount": 24,
    "releaseOrder": 300,
    "icon": {
      "alt": "Double Masters 2022 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/2x2.svg?1780891200",
      "localPath": "/mtg-symbols/0300-t2x2-double-masters-2022-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/t2x2"
  },
  {
    "id": "35528ede-7870-4598-a2ee-7f3d6464a74b",
    "name": "Alchemy Horizons: Baldur's Gate",
    "year": 2022,
    "releasedAt": "2022-07-07",
    "code": "HBG",
    "setType": "Alchemy",
    "cardCount": 436,
    "releaseOrder": 301,
    "icon": {
      "alt": "Alchemy Horizons: Baldur's Gate set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hbg.svg?1780891200",
      "localPath": "/mtg-symbols/0301-hbg-alchemy-horizons-baldur-s-gate.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/hbg"
  },
  {
    "id": "4c5b03fd-184b-4b7d-8170-3b24b9a4c0c4",
    "name": "Love Your LGS 2022",
    "year": 2022,
    "releasedAt": "2022-07-01",
    "code": "PLG22",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 302,
    "icon": {
      "alt": "Love Your LGS 2022 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0302-plg22-love-your-lgs-2022.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plg22"
  },
  {
    "id": "5a1e41c1-05f4-4c73-9bc4-a2d7889ac3bb",
    "name": "Battle for Baldur's Gate Art Series",
    "year": 2022,
    "releasedAt": "2022-06-10",
    "code": "ACLB",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 303,
    "icon": {
      "alt": "Battle for Baldur's Gate Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/clb.svg?1780891200",
      "localPath": "/mtg-symbols/0303-aclb-battle-for-baldur-s-gate-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aclb"
  },
  {
    "id": "5e4c3fe8-fd57-4b20-ad56-c03790a16cea",
    "name": "Commander Legends: Battle for Baldur's Gate",
    "year": 2022,
    "releasedAt": "2022-06-10",
    "code": "CLB",
    "setType": "Draft Innovation",
    "cardCount": 936,
    "releaseOrder": 304,
    "icon": {
      "alt": "Commander Legends: Battle for Baldur's Gate set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/clb.svg?1780891200",
      "localPath": "/mtg-symbols/0304-clb-commander-legends-battle-for-baldur-s-gate.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/clb"
  },
  {
    "id": "b5e232e5-cd56-4734-9ae2-930f543f6fa1",
    "name": "Commander Legends: Battle for Baldur's Gate Minigames",
    "year": 2022,
    "releasedAt": "2022-06-10",
    "code": "MCLB",
    "setType": "Minigame",
    "cardCount": 3,
    "releaseOrder": 305,
    "icon": {
      "alt": "Commander Legends: Battle for Baldur's Gate Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/clb.svg?1780891200",
      "localPath": "/mtg-symbols/0305-mclb-commander-legends-battle-for-baldur-s-gate-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mclb"
  },
  {
    "id": "c0055fd3-8a6e-4f2f-9835-e55447721d09",
    "name": "Battle for Baldur's Gate Oversized Cards",
    "year": 2022,
    "releasedAt": "2022-06-10",
    "code": "OCLB",
    "setType": "Memorabilia",
    "cardCount": 1,
    "releaseOrder": 306,
    "icon": {
      "alt": "Battle for Baldur's Gate Oversized Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/clb.svg?1780891200",
      "localPath": "/mtg-symbols/0306-oclb-battle-for-baldur-s-gate-oversized-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oclb"
  },
  {
    "id": "a6254b2a-0154-459a-936e-5967018d823b",
    "name": "Battle for Baldur's Gate Promos",
    "year": 2022,
    "releasedAt": "2022-06-10",
    "code": "PCLB",
    "setType": "Promo",
    "cardCount": 104,
    "releaseOrder": 307,
    "icon": {
      "alt": "Battle for Baldur's Gate Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/clb.svg?1780891200",
      "localPath": "/mtg-symbols/0307-pclb-battle-for-baldur-s-gate-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pclb"
  },
  {
    "id": "942706db-55db-4d8b-8337-deca3a4b522c",
    "name": "Battle for Baldur's Gate Tokens",
    "year": 2022,
    "releasedAt": "2022-06-10",
    "code": "TCLB",
    "setType": "Token",
    "cardCount": 51,
    "releaseOrder": 308,
    "icon": {
      "alt": "Battle for Baldur's Gate Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/clb.svg?1780891200",
      "localPath": "/mtg-symbols/0308-tclb-battle-for-baldur-s-gate-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tclb"
  },
  {
    "id": "64e1763b-7bcc-45a1-b1b2-69277b754caf",
    "name": "Alchemy: New Capenna",
    "year": 2022,
    "releasedAt": "2022-06-02",
    "code": "YSNC",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 309,
    "icon": {
      "alt": "Alchemy: New Capenna set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y22.svg?1780891200",
      "localPath": "/mtg-symbols/0309-ysnc-alchemy-new-capenna.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ysnc"
  },
  {
    "id": "cd69bbcb-1777-424c-a70d-f5e87d63168b",
    "name": "Streets of New Capenna Southeast Asia Tokens",
    "year": 2022,
    "releasedAt": "2022-04-30",
    "code": "PTSNC",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 310,
    "icon": {
      "alt": "Streets of New Capenna Southeast Asia Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/snc.svg?1780891200",
      "localPath": "/mtg-symbols/0310-ptsnc-streets-of-new-capenna-southeast-asia-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptsnc"
  },
  {
    "id": "32d16b44-d39f-42af-80d8-470700c7259c",
    "name": "New Capenna Art Series",
    "year": 2022,
    "releasedAt": "2022-04-29",
    "code": "ASNC",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 311,
    "icon": {
      "alt": "New Capenna Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/snc.svg?1780891200",
      "localPath": "/mtg-symbols/0311-asnc-new-capenna-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/asnc"
  },
  {
    "id": "c1436a26-fe46-4977-82da-d328f2dc9137",
    "name": "Streets of New Capenna Minigames",
    "year": 2022,
    "releasedAt": "2022-04-29",
    "code": "MSNC",
    "setType": "Minigame",
    "cardCount": 3,
    "releaseOrder": 312,
    "icon": {
      "alt": "Streets of New Capenna Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/snc.svg?1780891200",
      "localPath": "/mtg-symbols/0312-msnc-streets-of-new-capenna-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/msnc"
  },
  {
    "id": "c51de34b-d4d6-4179-a432-573744ded119",
    "name": "New Capenna Commander",
    "year": 2022,
    "releasedAt": "2022-04-29",
    "code": "NCC",
    "setType": "Commander",
    "cardCount": 447,
    "releaseOrder": 313,
    "icon": {
      "alt": "New Capenna Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ncc.svg?1780891200",
      "localPath": "/mtg-symbols/0313-ncc-new-capenna-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ncc"
  },
  {
    "id": "8f92ac22-a208-41a8-b77c-ceffbeb6a255",
    "name": "New Capenna Commander Promos",
    "year": 2022,
    "releasedAt": "2022-04-29",
    "code": "PNCC",
    "setType": "Promo",
    "cardCount": 75,
    "releaseOrder": 314,
    "icon": {
      "alt": "New Capenna Commander Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ncc.svg?1780891200",
      "localPath": "/mtg-symbols/0314-pncc-new-capenna-commander-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pncc"
  },
  {
    "id": "b651abe6-2c19-4ba0-8fa1-9b5909ccbef7",
    "name": "Streets of New Capenna Promos",
    "year": 2022,
    "releasedAt": "2022-04-29",
    "code": "PSNC",
    "setType": "Promo",
    "cardCount": 161,
    "releaseOrder": 315,
    "icon": {
      "alt": "Streets of New Capenna Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/snc.svg?1780891200",
      "localPath": "/mtg-symbols/0315-psnc-streets-of-new-capenna-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psnc"
  },
  {
    "id": "df837242-8c15-42e4-b049-c933a02dc501",
    "name": "Streets of New Capenna",
    "year": 2022,
    "releasedAt": "2022-04-29",
    "code": "SNC",
    "setType": "Expansion",
    "cardCount": 513,
    "releaseOrder": 316,
    "icon": {
      "alt": "Streets of New Capenna set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/snc.svg?1780891200",
      "localPath": "/mtg-symbols/0316-snc-streets-of-new-capenna.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/snc"
  },
  {
    "id": "d6ddbf54-6a77-47d6-9b9c-b6587079b967",
    "name": "New Capenna Commander Tokens",
    "year": 2022,
    "releasedAt": "2022-04-29",
    "code": "TNCC",
    "setType": "Token",
    "cardCount": 36,
    "releaseOrder": 317,
    "icon": {
      "alt": "New Capenna Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ncc.svg?1780891200",
      "localPath": "/mtg-symbols/0317-tncc-new-capenna-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tncc"
  },
  {
    "id": "c1b4fd5f-1ffc-420a-a50a-241b72b10ea7",
    "name": "Streets of New Capenna Tokens",
    "year": 2022,
    "releasedAt": "2022-04-29",
    "code": "TSNC",
    "setType": "Token",
    "cardCount": 19,
    "releaseOrder": 318,
    "icon": {
      "alt": "Streets of New Capenna Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/snc.svg?1780891200",
      "localPath": "/mtg-symbols/0318-tsnc-streets-of-new-capenna-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tsnc"
  },
  {
    "id": "5f61e142-b5df-4bab-8f7d-81c2c088596d",
    "name": "Game Day Promos",
    "year": 2022,
    "releasedAt": "2022-04-08",
    "code": "GDY",
    "setType": "Promo",
    "cardCount": 9,
    "releaseOrder": 319,
    "icon": {
      "alt": "Game Day Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0319-gdy-game-day-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gdy"
  },
  {
    "id": "05fccc6b-1c39-46b6-a492-ac9383a5abfe",
    "name": "Challenger Decks 2022",
    "year": 2022,
    "releasedAt": "2022-04-01",
    "code": "Q07",
    "setType": "Box",
    "cardCount": 1,
    "releaseOrder": 320,
    "icon": {
      "alt": "Challenger Decks 2022 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0320-q07-challenger-decks-2022.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/q07"
  },
  {
    "id": "e804713e-fee5-49ee-8a34-5889ffd6094a",
    "name": "Alchemy: Kamigawa",
    "year": 2022,
    "releasedAt": "2022-03-17",
    "code": "YNEO",
    "setType": "Alchemy",
    "cardCount": 30,
    "releaseOrder": 321,
    "icon": {
      "alt": "Alchemy: Kamigawa set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y22.svg?1780891200",
      "localPath": "/mtg-symbols/0321-yneo-alchemy-kamigawa.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/yneo"
  },
  {
    "id": "b11b2817-d7b5-4207-9271-e109936561ed",
    "name": "Wizards Play Network 2022",
    "year": 2022,
    "releasedAt": "2022-03-05",
    "code": "PW22",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 322,
    "icon": {
      "alt": "Wizards Play Network 2022 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0322-pw22-wizards-play-network-2022.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pw22"
  },
  {
    "id": "3c318e12-9152-4300-a096-4f58a6438897",
    "name": "Universes Within",
    "year": 2022,
    "releasedAt": "2022-03-03",
    "code": "SLX",
    "setType": "Masters",
    "cardCount": 30,
    "releaseOrder": 323,
    "icon": {
      "alt": "Universes Within set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0323-slx-universes-within.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/slx"
  },
  {
    "id": "377f9635-6eac-42ca-9e60-f422c90a0eef",
    "name": "Year of the Tiger 2022",
    "year": 2022,
    "releasedAt": "2022-02-25",
    "code": "PL22",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 324,
    "icon": {
      "alt": "Year of the Tiger 2022 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0324-pl22-year-of-the-tiger-2022.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pl22"
  },
  {
    "id": "d94185a1-24a1-4cd9-855d-8c4d5f5ebf5b",
    "name": "Neon Dynasty Art Series",
    "year": 2022,
    "releasedAt": "2022-02-18",
    "code": "ANEO",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 325,
    "icon": {
      "alt": "Neon Dynasty Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/neo.svg?1780891200",
      "localPath": "/mtg-symbols/0325-aneo-neon-dynasty-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aneo"
  },
  {
    "id": "cdf05b47-9597-41ca-8050-be1987b9ef64",
    "name": "Kamigawa: Neon Dynasty Minigames",
    "year": 2022,
    "releasedAt": "2022-02-18",
    "code": "MNEO",
    "setType": "Minigame",
    "cardCount": 3,
    "releaseOrder": 326,
    "icon": {
      "alt": "Kamigawa: Neon Dynasty Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/neo.svg?1780891200",
      "localPath": "/mtg-symbols/0326-mneo-kamigawa-neon-dynasty-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mneo"
  },
  {
    "id": "5b4d929d-bdf9-4bbf-858e-e248f53325ad",
    "name": "Neon Dynasty Commander",
    "year": 2022,
    "releasedAt": "2022-02-18",
    "code": "NEC",
    "setType": "Commander",
    "cardCount": 179,
    "releaseOrder": 327,
    "icon": {
      "alt": "Neon Dynasty Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/nec.svg?1780891200",
      "localPath": "/mtg-symbols/0327-nec-neon-dynasty-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/nec"
  },
  {
    "id": "59a2059f-5482-433f-8761-eb2e17859b71",
    "name": "Kamigawa: Neon Dynasty",
    "year": 2022,
    "releasedAt": "2022-02-18",
    "code": "NEO",
    "setType": "Expansion",
    "cardCount": 531,
    "releaseOrder": 328,
    "icon": {
      "alt": "Kamigawa: Neon Dynasty set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/neo.svg?1780891200",
      "localPath": "/mtg-symbols/0328-neo-kamigawa-neon-dynasty.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/neo"
  },
  {
    "id": "b3161020-d74f-48cc-bc9d-d7233e64e524",
    "name": "Kamigawa: Neon Dynasty Promos",
    "year": 2022,
    "releasedAt": "2022-02-18",
    "code": "PNEO",
    "setType": "Promo",
    "cardCount": 148,
    "releaseOrder": 329,
    "icon": {
      "alt": "Kamigawa: Neon Dynasty Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/neo.svg?1780891200",
      "localPath": "/mtg-symbols/0329-pneo-kamigawa-neon-dynasty-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pneo"
  },
  {
    "id": "5539f49e-d43b-4b0d-b7df-7173e48ab018",
    "name": "Kamigawa: Neon Dynasty Substitute Cards",
    "year": 2022,
    "releasedAt": "2022-02-18",
    "code": "SNEO",
    "setType": "Token",
    "cardCount": 9,
    "releaseOrder": 330,
    "icon": {
      "alt": "Kamigawa: Neon Dynasty Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/neo.svg?1780891200",
      "localPath": "/mtg-symbols/0330-sneo-kamigawa-neon-dynasty-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sneo"
  },
  {
    "id": "5bd03f4f-1766-4a47-a70b-e717651f06be",
    "name": "Neon Dynasty Commander Tokens",
    "year": 2022,
    "releasedAt": "2022-02-18",
    "code": "TNEC",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 331,
    "icon": {
      "alt": "Neon Dynasty Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/nec.svg?1780891200",
      "localPath": "/mtg-symbols/0331-tnec-neon-dynasty-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tnec"
  },
  {
    "id": "8bb113fb-6138-4993-877b-5cd01f8d7529",
    "name": "Kamigawa: Neon Dynasty Tokens",
    "year": 2022,
    "releasedAt": "2022-02-18",
    "code": "TNEO",
    "setType": "Token",
    "cardCount": 19,
    "releaseOrder": 332,
    "icon": {
      "alt": "Kamigawa: Neon Dynasty Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/neo.svg?1780891200",
      "localPath": "/mtg-symbols/0332-tneo-kamigawa-neon-dynasty-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tneo"
  },
  {
    "id": "78a7f4da-4838-4011-9f58-de8020d1fd2d",
    "name": "Commander Collection: Black",
    "year": 2022,
    "releasedAt": "2022-01-28",
    "code": "CC2",
    "setType": "Arsenal",
    "cardCount": 9,
    "releaseOrder": 333,
    "icon": {
      "alt": "Commander Collection: Black set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cc2.svg?1780891200",
      "localPath": "/mtg-symbols/0333-cc2-commander-collection-black.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cc2"
  },
  {
    "id": "5c1638d2-bce9-463e-b0ec-469336cb1bd2",
    "name": "Innistrad: Double Feature",
    "year": 2022,
    "releasedAt": "2022-01-28",
    "code": "DBL",
    "setType": "Draft Innovation",
    "cardCount": 535,
    "releaseOrder": 334,
    "icon": {
      "alt": "Innistrad: Double Feature set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0334-dbl-innistrad-double-feature.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dbl"
  },
  {
    "id": "a8c14f2c-e917-4919-9eb7-32c7cc37107a",
    "name": "Judge Gift Cards 2022",
    "year": 2022,
    "releasedAt": "2022-01-01",
    "code": "P22",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 335,
    "icon": {
      "alt": "Judge Gift Cards 2022 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/archie.svg?1780891200",
      "localPath": "/mtg-symbols/0335-p22-judge-gift-cards-2022.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p22"
  },
  {
    "id": "8a673262-8745-452d-820a-03d5c4a4f135",
    "name": "Alchemy: Innistrad",
    "year": 2021,
    "releasedAt": "2021-12-09",
    "code": "YMID",
    "setType": "Alchemy",
    "cardCount": 63,
    "releaseOrder": 336,
    "icon": {
      "alt": "Alchemy: Innistrad set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/y22.svg?1780891200",
      "localPath": "/mtg-symbols/0336-ymid-alchemy-innistrad.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ymid"
  },
  {
    "id": "595121bf-ef1d-4ee8-a8ce-591ca2a74ef1",
    "name": "Crimson Vow Art Series",
    "year": 2021,
    "releasedAt": "2021-11-19",
    "code": "AVOW",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 337,
    "icon": {
      "alt": "Crimson Vow Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/vow.svg?1780891200",
      "localPath": "/mtg-symbols/0337-avow-crimson-vow-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/avow"
  },
  {
    "id": "649bcd1f-88c8-49ee-88b8-a9631a8d0909",
    "name": "Innistrad: Crimson Vow Minigames",
    "year": 2021,
    "releasedAt": "2021-11-19",
    "code": "MVOW",
    "setType": "Minigame",
    "cardCount": 3,
    "releaseOrder": 338,
    "icon": {
      "alt": "Innistrad: Crimson Vow Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/vow.svg?1780891200",
      "localPath": "/mtg-symbols/0338-mvow-innistrad-crimson-vow-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mvow"
  },
  {
    "id": "e2b34562-32c8-4221-9fb8-d634b7ad4f86",
    "name": "Crimson Vow Commander Display Commanders",
    "year": 2021,
    "releasedAt": "2021-11-19",
    "code": "OVOC",
    "setType": "Memorabilia",
    "cardCount": 2,
    "releaseOrder": 339,
    "icon": {
      "alt": "Crimson Vow Commander Display Commanders set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/voc.svg?1780891200",
      "localPath": "/mtg-symbols/0339-ovoc-crimson-vow-commander-display-commanders.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ovoc"
  },
  {
    "id": "5636218c-a0d2-45ee-9552-dbc54e8a91a3",
    "name": "Innistrad: Crimson Vow Promos",
    "year": 2021,
    "releasedAt": "2021-11-19",
    "code": "PVOW",
    "setType": "Promo",
    "cardCount": 121,
    "releaseOrder": 340,
    "icon": {
      "alt": "Innistrad: Crimson Vow Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/vow.svg?1780891200",
      "localPath": "/mtg-symbols/0340-pvow-innistrad-crimson-vow-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pvow"
  },
  {
    "id": "50d5276a-954f-4497-b313-a69dcdbdbf91",
    "name": "Innistrad: Crimson Vow Substitute Cards",
    "year": 2021,
    "releasedAt": "2021-11-19",
    "code": "SVOW",
    "setType": "Token",
    "cardCount": 9,
    "releaseOrder": 341,
    "icon": {
      "alt": "Innistrad: Crimson Vow Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/vow.svg?1780891200",
      "localPath": "/mtg-symbols/0341-svow-innistrad-crimson-vow-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/svow"
  },
  {
    "id": "1316053f-0acb-48cf-b140-b8cf29437662",
    "name": "Crimson Vow Commander Tokens",
    "year": 2021,
    "releasedAt": "2021-11-19",
    "code": "TVOC",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 342,
    "icon": {
      "alt": "Crimson Vow Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/voc.svg?1780891200",
      "localPath": "/mtg-symbols/0342-tvoc-crimson-vow-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tvoc"
  },
  {
    "id": "381f2eb8-544e-409c-a8c5-7171cd78edea",
    "name": "Innistrad: Crimson Vow Tokens",
    "year": 2021,
    "releasedAt": "2021-11-19",
    "code": "TVOW",
    "setType": "Token",
    "cardCount": 21,
    "releaseOrder": 343,
    "icon": {
      "alt": "Innistrad: Crimson Vow Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/vow.svg?1780891200",
      "localPath": "/mtg-symbols/0343-tvow-innistrad-crimson-vow-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tvow"
  },
  {
    "id": "b2e444f7-41e6-4172-ba01-47d91d5e7bbc",
    "name": "Crimson Vow Commander",
    "year": 2021,
    "releasedAt": "2021-11-19",
    "code": "VOC",
    "setType": "Commander",
    "cardCount": 188,
    "releaseOrder": 344,
    "icon": {
      "alt": "Crimson Vow Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/voc.svg?1780891200",
      "localPath": "/mtg-symbols/0344-voc-crimson-vow-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/voc"
  },
  {
    "id": "8144b676-569f-4716-8005-bc8f0778f3fa",
    "name": "Innistrad: Crimson Vow",
    "year": 2021,
    "releasedAt": "2021-11-19",
    "code": "VOW",
    "setType": "Expansion",
    "cardCount": 423,
    "releaseOrder": 345,
    "icon": {
      "alt": "Innistrad: Crimson Vow set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/vow.svg?1780891200",
      "localPath": "/mtg-symbols/0345-vow-innistrad-crimson-vow.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/vow"
  },
  {
    "id": "ae1cbc8b-eb24-4e7e-9cd4-6691f5478767",
    "name": "Pioneer Challenger Decks 2021",
    "year": 2021,
    "releasedAt": "2021-10-15",
    "code": "Q06",
    "setType": "Box",
    "cardCount": 10,
    "releaseOrder": 346,
    "icon": {
      "alt": "Pioneer Challenger Decks 2021 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0346-q06-pioneer-challenger-decks-2021.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/q06"
  },
  {
    "id": "fe07d074-f59a-4765-bbbf-80b9bca25130",
    "name": "Midnight Hunt Art Series",
    "year": 2021,
    "releasedAt": "2021-09-24",
    "code": "AMID",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 347,
    "icon": {
      "alt": "Midnight Hunt Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mid.svg?1780891200",
      "localPath": "/mtg-symbols/0347-amid-midnight-hunt-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/amid"
  },
  {
    "id": "7f9a4deb-715e-47d2-afac-3843ef92f39b",
    "name": "Midnight Hunt Commander",
    "year": 2021,
    "releasedAt": "2021-09-24",
    "code": "MIC",
    "setType": "Commander",
    "cardCount": 187,
    "releaseOrder": 348,
    "icon": {
      "alt": "Midnight Hunt Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mic.svg?1780891200",
      "localPath": "/mtg-symbols/0348-mic-midnight-hunt-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mic"
  },
  {
    "id": "44b8eb8f-fa23-401a-98b5-1fbb9871128e",
    "name": "Innistrad: Midnight Hunt",
    "year": 2021,
    "releasedAt": "2021-09-24",
    "code": "MID",
    "setType": "Expansion",
    "cardCount": 399,
    "releaseOrder": 349,
    "icon": {
      "alt": "Innistrad: Midnight Hunt set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mid.svg?1780891200",
      "localPath": "/mtg-symbols/0349-mid-innistrad-midnight-hunt.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mid"
  },
  {
    "id": "0c1a194b-a2ab-4eb1-88be-291ea32fad7e",
    "name": "Innistrad: Midnight Hunt Minigames",
    "year": 2021,
    "releasedAt": "2021-09-24",
    "code": "MMID",
    "setType": "Minigame",
    "cardCount": 3,
    "releaseOrder": 350,
    "icon": {
      "alt": "Innistrad: Midnight Hunt Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mid.svg?1780891200",
      "localPath": "/mtg-symbols/0350-mmid-innistrad-midnight-hunt-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mmid"
  },
  {
    "id": "ba38f256-89cf-4af3-8c6c-d3efe196aef1",
    "name": "Midnight Hunt Commander Display Commanders",
    "year": 2021,
    "releasedAt": "2021-09-24",
    "code": "OMIC",
    "setType": "Memorabilia",
    "cardCount": 2,
    "releaseOrder": 351,
    "icon": {
      "alt": "Midnight Hunt Commander Display Commanders set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mic.svg?1780891200",
      "localPath": "/mtg-symbols/0351-omic-midnight-hunt-commander-display-commanders.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/omic"
  },
  {
    "id": "e7f1d597-3f0b-4892-a857-ac6f8f6f1058",
    "name": "Innistrad: Midnight Hunt Promos",
    "year": 2021,
    "releasedAt": "2021-09-24",
    "code": "PMID",
    "setType": "Promo",
    "cardCount": 155,
    "releaseOrder": 352,
    "icon": {
      "alt": "Innistrad: Midnight Hunt Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mid.svg?1780891200",
      "localPath": "/mtg-symbols/0352-pmid-innistrad-midnight-hunt-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmid"
  },
  {
    "id": "b2c4b255-2603-478b-b343-3f3bd433896d",
    "name": "Innistrad: Midnight Hunt Substitute Cards",
    "year": 2021,
    "releasedAt": "2021-09-24",
    "code": "SMID",
    "setType": "Token",
    "cardCount": 9,
    "releaseOrder": 353,
    "icon": {
      "alt": "Innistrad: Midnight Hunt Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mid.svg?1780891200",
      "localPath": "/mtg-symbols/0353-smid-innistrad-midnight-hunt-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/smid"
  },
  {
    "id": "56d23ab2-9edd-4250-bf33-3225c183cc1a",
    "name": "Midnight Hunt Commander Tokens",
    "year": 2021,
    "releasedAt": "2021-09-24",
    "code": "TMIC",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 354,
    "icon": {
      "alt": "Midnight Hunt Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mic.svg?1780891200",
      "localPath": "/mtg-symbols/0354-tmic-midnight-hunt-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmic"
  },
  {
    "id": "cb7c7eac-c13c-465e-b276-85517f1472d8",
    "name": "Innistrad: Midnight Hunt Tokens",
    "year": 2021,
    "releasedAt": "2021-09-24",
    "code": "TMID",
    "setType": "Token",
    "cardCount": 19,
    "releaseOrder": 355,
    "icon": {
      "alt": "Innistrad: Midnight Hunt Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mid.svg?1780891200",
      "localPath": "/mtg-symbols/0355-tmid-innistrad-midnight-hunt-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmid"
  },
  {
    "id": "e1cc23bd-379b-4f2c-a4e0-83fc1e7be023",
    "name": "Jumpstart: Historic Horizons",
    "year": 2021,
    "releasedAt": "2021-08-26",
    "code": "J21",
    "setType": "Draft Innovation",
    "cardCount": 389,
    "releaseOrder": 356,
    "icon": {
      "alt": "Jumpstart: Historic Horizons set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/j21.svg?1780891200",
      "localPath": "/mtg-symbols/0356-j21-jumpstart-historic-horizons.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j21"
  },
  {
    "id": "e18a60f0-bf18-487e-a7bb-a23ac6bd7a65",
    "name": "Mystery Booster Playtest Cards 2021",
    "year": 2021,
    "releasedAt": "2021-08-20",
    "code": "CMB2",
    "setType": "Funny",
    "cardCount": 121,
    "releaseOrder": 357,
    "icon": {
      "alt": "Mystery Booster Playtest Cards 2021 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/planeswalker.svg?1780891200",
      "localPath": "/mtg-symbols/0357-cmb2-mystery-booster-playtest-cards-2021.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cmb2"
  },
  {
    "id": "3bb49836-a6be-4249-a461-8a34a4cf48a2",
    "name": "2020 Heroes of the Realm",
    "year": 2021,
    "releasedAt": "2021-08-01",
    "code": "PH20",
    "setType": "Funny",
    "cardCount": 3,
    "releaseOrder": 358,
    "icon": {
      "alt": "2020 Heroes of the Realm set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0358-ph20-2020-heroes-of-the-realm.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ph20"
  },
  {
    "id": "8696ef63-3530-4453-a0f8-7fd3bd09306a",
    "name": "Adventures in the Forgotten Realms Art Series",
    "year": 2021,
    "releasedAt": "2021-07-23",
    "code": "AAFR",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 359,
    "icon": {
      "alt": "Adventures in the Forgotten Realms Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/afr.svg?1780891200",
      "localPath": "/mtg-symbols/0359-aafr-adventures-in-the-forgotten-realms-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aafr"
  },
  {
    "id": "db1b46f9-893c-4623-9465-985ff6e4472c",
    "name": "Forgotten Realms Commander",
    "year": 2021,
    "releasedAt": "2021-07-23",
    "code": "AFC",
    "setType": "Commander",
    "cardCount": 331,
    "releaseOrder": 360,
    "icon": {
      "alt": "Forgotten Realms Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/afc.svg?1780891200",
      "localPath": "/mtg-symbols/0360-afc-forgotten-realms-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/afc"
  },
  {
    "id": "e1ef87ba-ba92-4573-817f-543b996d2851",
    "name": "Adventures in the Forgotten Realms",
    "year": 2021,
    "releasedAt": "2021-07-23",
    "code": "AFR",
    "setType": "Expansion",
    "cardCount": 424,
    "releaseOrder": 361,
    "icon": {
      "alt": "Adventures in the Forgotten Realms set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/afr.svg?1780891200",
      "localPath": "/mtg-symbols/0361-afr-adventures-in-the-forgotten-realms.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/afr"
  },
  {
    "id": "af227796-67f1-472a-9dd8-3e28e2a9d815",
    "name": "Adventures in the Forgotten Realms Minigames",
    "year": 2021,
    "releasedAt": "2021-07-23",
    "code": "MAFR",
    "setType": "Minigame",
    "cardCount": 5,
    "releaseOrder": 362,
    "icon": {
      "alt": "Adventures in the Forgotten Realms Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/afr.svg?1780891200",
      "localPath": "/mtg-symbols/0362-mafr-adventures-in-the-forgotten-realms-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mafr"
  },
  {
    "id": "a6126dce-9dfb-4478-ae9d-c02d992a8219",
    "name": "Forgotten Realms Commander Display Commanders",
    "year": 2021,
    "releasedAt": "2021-07-23",
    "code": "OAFC",
    "setType": "Memorabilia",
    "cardCount": 4,
    "releaseOrder": 363,
    "icon": {
      "alt": "Forgotten Realms Commander Display Commanders set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/afc.svg?1780891200",
      "localPath": "/mtg-symbols/0363-oafc-forgotten-realms-commander-display-commanders.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oafc"
  },
  {
    "id": "9d2617b0-2953-477b-bd9f-c9f9e47ee71f",
    "name": "Forgotten Realms Oversized Cards",
    "year": 2021,
    "releasedAt": "2021-07-23",
    "code": "OAFR",
    "setType": "Memorabilia",
    "cardCount": 3,
    "releaseOrder": 364,
    "icon": {
      "alt": "Forgotten Realms Oversized Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/afr.svg?1780891200",
      "localPath": "/mtg-symbols/0364-oafr-forgotten-realms-oversized-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oafr"
  },
  {
    "id": "983f027f-76f9-462d-8eb5-458dcbf029b4",
    "name": "Adventures in the Forgotten Realms Promos",
    "year": 2021,
    "releasedAt": "2021-07-23",
    "code": "PAFR",
    "setType": "Promo",
    "cardCount": 241,
    "releaseOrder": 365,
    "icon": {
      "alt": "Adventures in the Forgotten Realms Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/afr.svg?1780891200",
      "localPath": "/mtg-symbols/0365-pafr-adventures-in-the-forgotten-realms-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pafr"
  },
  {
    "id": "28158e6a-efa3-42d8-90da-b8c7a7cc9dea",
    "name": "Forgotten Realms Commander Tokens",
    "year": 2021,
    "releasedAt": "2021-07-23",
    "code": "TAFC",
    "setType": "Token",
    "cardCount": 13,
    "releaseOrder": 366,
    "icon": {
      "alt": "Forgotten Realms Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/afc.svg?1780891200",
      "localPath": "/mtg-symbols/0366-tafc-forgotten-realms-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tafc"
  },
  {
    "id": "68e8eca4-2c75-4f44-8519-59489e76b719",
    "name": "Adventures in the Forgotten Realms Tokens",
    "year": 2021,
    "releasedAt": "2021-07-23",
    "code": "TAFR",
    "setType": "Token",
    "cardCount": 22,
    "releaseOrder": 367,
    "icon": {
      "alt": "Adventures in the Forgotten Realms Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/afr.svg?1780891200",
      "localPath": "/mtg-symbols/0367-tafr-adventures-in-the-forgotten-realms-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tafr"
  },
  {
    "id": "640891dc-bc2d-4f9d-aee9-6e057f1fa60c",
    "name": "Love Your LGS 2021",
    "year": 2021,
    "releasedAt": "2021-06-22",
    "code": "PLG21",
    "setType": "Promo",
    "cardCount": 11,
    "releaseOrder": 368,
    "icon": {
      "alt": "Love Your LGS 2021 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0368-plg21-love-your-lgs-2021.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plg21"
  },
  {
    "id": "95671546-fd82-43e2-966f-eba5968f629b",
    "name": "Modern Horizons 2 Art Series",
    "year": 2021,
    "releasedAt": "2021-06-18",
    "code": "AMH2",
    "setType": "Memorabilia",
    "cardCount": 162,
    "releaseOrder": 369,
    "icon": {
      "alt": "Modern Horizons 2 Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh2.svg?1780891200",
      "localPath": "/mtg-symbols/0369-amh2-modern-horizons-2-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/amh2"
  },
  {
    "id": "7b3294cf-104e-43fb-8170-add3e78faca7",
    "name": "Modern Horizons 1 Timeshifts",
    "year": 2021,
    "releasedAt": "2021-06-18",
    "code": "H1R",
    "setType": "Draft Innovation",
    "cardCount": 40,
    "releaseOrder": 370,
    "icon": {
      "alt": "Modern Horizons 1 Timeshifts set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh1.svg?1780891200",
      "localPath": "/mtg-symbols/0370-h1r-modern-horizons-1-timeshifts.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/h1r"
  },
  {
    "id": "c1c7eb8c-f205-40ab-a609-767cb296544e",
    "name": "Modern Horizons 2",
    "year": 2021,
    "releasedAt": "2021-06-18",
    "code": "MH2",
    "setType": "Draft Innovation",
    "cardCount": 493,
    "releaseOrder": 371,
    "icon": {
      "alt": "Modern Horizons 2 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh2.svg?1780891200",
      "localPath": "/mtg-symbols/0371-mh2-modern-horizons-2.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mh2"
  },
  {
    "id": "331792a7-17bd-4793-8b4a-274fd2c58230",
    "name": "Modern Horizons 2 Minigames",
    "year": 2021,
    "releasedAt": "2021-06-18",
    "code": "MMH2",
    "setType": "Minigame",
    "cardCount": 5,
    "releaseOrder": 372,
    "icon": {
      "alt": "Modern Horizons 2 Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh2.svg?1780891200",
      "localPath": "/mtg-symbols/0372-mmh2-modern-horizons-2-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mmh2"
  },
  {
    "id": "5193f80f-0b66-47b9-86fe-a3fc70763d3a",
    "name": "Modern Horizons 2 Promos",
    "year": 2021,
    "releasedAt": "2021-06-18",
    "code": "PMH2",
    "setType": "Promo",
    "cardCount": 86,
    "releaseOrder": 373,
    "icon": {
      "alt": "Modern Horizons 2 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh2.svg?1780891200",
      "localPath": "/mtg-symbols/0373-pmh2-modern-horizons-2-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmh2"
  },
  {
    "id": "ab6507a5-d3c1-4384-927c-4ec7e6fd1e20",
    "name": "Wizards Play Network 2021",
    "year": 2021,
    "releasedAt": "2021-06-18",
    "code": "PW21",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 374,
    "icon": {
      "alt": "Wizards Play Network 2021 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0374-pw21-wizards-play-network-2021.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pw21"
  },
  {
    "id": "b25a75f7-3f5b-4056-8ab8-a463d18ce818",
    "name": "Modern Horizons 2 Tokens",
    "year": 2021,
    "releasedAt": "2021-06-18",
    "code": "TMH2",
    "setType": "Token",
    "cardCount": 21,
    "releaseOrder": 375,
    "icon": {
      "alt": "Modern Horizons 2 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh2.svg?1780891200",
      "localPath": "/mtg-symbols/0375-tmh2-modern-horizons-2-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmh2"
  },
  {
    "id": "5278af8f-d212-48ea-924e-92aa8a4b495d",
    "name": "Historic Anthology 5",
    "year": 2021,
    "releasedAt": "2021-05-27",
    "code": "HA5",
    "setType": "Box",
    "cardCount": 25,
    "releaseOrder": 376,
    "icon": {
      "alt": "Historic Anthology 5 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ha1.svg?1780891200",
      "localPath": "/mtg-symbols/0376-ha5-historic-anthology-5.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ha5"
  },
  {
    "id": "fbd78c96-cc9d-451e-afb1-2e0022235aa0",
    "name": "Strixhaven Art Series",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "ASTX",
    "setType": "Memorabilia",
    "cardCount": 162,
    "releaseOrder": 377,
    "icon": {
      "alt": "Strixhaven Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/stx.svg?1780891200",
      "localPath": "/mtg-symbols/0377-astx-strixhaven-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/astx"
  },
  {
    "id": "27bf6dbd-a9e1-4904-afa7-d28fc7745c4f",
    "name": "Commander 2021",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "C21",
    "setType": "Commander",
    "cardCount": 409,
    "releaseOrder": 378,
    "icon": {
      "alt": "Commander 2021 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c21.svg?1780891200",
      "localPath": "/mtg-symbols/0378-c21-commander-2021.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/c21"
  },
  {
    "id": "bbc93a56-4d34-4b85-a6c6-c6c0c2411d52",
    "name": "Strixhaven: School of Mages Minigames",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "MSTX",
    "setType": "Minigame",
    "cardCount": 5,
    "releaseOrder": 379,
    "icon": {
      "alt": "Strixhaven: School of Mages Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/stx.svg?1780891200",
      "localPath": "/mtg-symbols/0379-mstx-strixhaven-school-of-mages-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mstx"
  },
  {
    "id": "fca0f98a-e428-4bc0-8737-1cda79253897",
    "name": "Commander 2021 Display Commanders",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "OC21",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 380,
    "icon": {
      "alt": "Commander 2021 Display Commanders set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c21.svg?1780891200",
      "localPath": "/mtg-symbols/0380-oc21-commander-2021-display-commanders.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oc21"
  },
  {
    "id": "bc98232b-a539-4f81-92b5-2efc57d38f53",
    "name": "Strixhaven: School of Mages Promos",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "PSTX",
    "setType": "Promo",
    "cardCount": 164,
    "releaseOrder": 381,
    "icon": {
      "alt": "Strixhaven: School of Mages Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/stx.svg?1780891200",
      "localPath": "/mtg-symbols/0381-pstx-strixhaven-school-of-mages-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pstx"
  },
  {
    "id": "81a2daee-8c16-4b78-9447-e80d7174f9a3",
    "name": "Strixhaven: School of Mages Substitute Cards",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "SSTX",
    "setType": "Token",
    "cardCount": 9,
    "releaseOrder": 382,
    "icon": {
      "alt": "Strixhaven: School of Mages Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/stx.svg?1780891200",
      "localPath": "/mtg-symbols/0382-sstx-strixhaven-school-of-mages-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sstx"
  },
  {
    "id": "5064a720-907f-4cb6-a425-766dc1dd7374",
    "name": "Strixhaven Mystical Archive",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "STA",
    "setType": "Masterpiece",
    "cardCount": 126,
    "releaseOrder": 383,
    "icon": {
      "alt": "Strixhaven Mystical Archive set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sta.svg?1780891200",
      "localPath": "/mtg-symbols/0383-sta-strixhaven-mystical-archive.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sta"
  },
  {
    "id": "541c3c28-8747-40e5-a231-8e8f33234859",
    "name": "Strixhaven: School of Mages",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "STX",
    "setType": "Expansion",
    "cardCount": 393,
    "releaseOrder": 384,
    "icon": {
      "alt": "Strixhaven: School of Mages set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/stx.svg?1780891200",
      "localPath": "/mtg-symbols/0384-stx-strixhaven-school-of-mages.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/stx"
  },
  {
    "id": "0626d2d5-5b60-48fa-97b5-960eb263a051",
    "name": "Commander 2021 Tokens",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "TC21",
    "setType": "Token",
    "cardCount": 30,
    "releaseOrder": 385,
    "icon": {
      "alt": "Commander 2021 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c21.svg?1780891200",
      "localPath": "/mtg-symbols/0385-tc21-commander-2021-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tc21"
  },
  {
    "id": "5a24058d-2b14-4f38-b906-9d2509da1c90",
    "name": "Strixhaven: School of Mages Tokens",
    "year": 2021,
    "releasedAt": "2021-04-23",
    "code": "TSTX",
    "setType": "Token",
    "cardCount": 9,
    "releaseOrder": 386,
    "icon": {
      "alt": "Strixhaven: School of Mages Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/stx.svg?1780891200",
      "localPath": "/mtg-symbols/0386-tstx-strixhaven-school-of-mages-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tstx"
  },
  {
    "id": "11e90d1b-0502-43e6-b056-e24836523c13",
    "name": "Time Spiral Remastered",
    "year": 2021,
    "releasedAt": "2021-03-19",
    "code": "TSR",
    "setType": "Masters",
    "cardCount": 411,
    "releaseOrder": 387,
    "icon": {
      "alt": "Time Spiral Remastered set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tsr.svg?1780891200",
      "localPath": "/mtg-symbols/0387-tsr-time-spiral-remastered.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tsr"
  },
  {
    "id": "92e36faf-5459-428f-b1fa-687ad31ebfcc",
    "name": "Time Spiral Remastered Tokens",
    "year": 2021,
    "releasedAt": "2021-03-19",
    "code": "TTSR",
    "setType": "Token",
    "cardCount": 15,
    "releaseOrder": 388,
    "icon": {
      "alt": "Time Spiral Remastered Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tsr.svg?1780891200",
      "localPath": "/mtg-symbols/0388-ttsr-time-spiral-remastered-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ttsr"
  },
  {
    "id": "0c5ab7e5-7d12-45f2-9d58-7ed0acfcc0c6",
    "name": "Historic Anthology 4",
    "year": 2021,
    "releasedAt": "2021-03-11",
    "code": "HA4",
    "setType": "Box",
    "cardCount": 25,
    "releaseOrder": 389,
    "icon": {
      "alt": "Historic Anthology 4 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ha1.svg?1780891200",
      "localPath": "/mtg-symbols/0389-ha4-historic-anthology-4.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ha4"
  },
  {
    "id": "b8e64975-c16d-4463-b465-6c7dfcc579ff",
    "name": "Kaldheim Art Series",
    "year": 2021,
    "releasedAt": "2021-02-05",
    "code": "AKHM",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 390,
    "icon": {
      "alt": "Kaldheim Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/khm.svg?1780891200",
      "localPath": "/mtg-symbols/0390-akhm-kaldheim-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/akhm"
  },
  {
    "id": "d532ef25-e52b-4276-941a-3a1c095544b0",
    "name": "Kaldheim Commander",
    "year": 2021,
    "releasedAt": "2021-02-05",
    "code": "KHC",
    "setType": "Commander",
    "cardCount": 119,
    "releaseOrder": 391,
    "icon": {
      "alt": "Kaldheim Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/khc.svg?1780891200",
      "localPath": "/mtg-symbols/0391-khc-kaldheim-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/khc"
  },
  {
    "id": "43057fad-b1c1-437f-bc48-0045bce6d8c9",
    "name": "Kaldheim",
    "year": 2021,
    "releasedAt": "2021-02-05",
    "code": "KHM",
    "setType": "Expansion",
    "cardCount": 425,
    "releaseOrder": 392,
    "icon": {
      "alt": "Kaldheim set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/khm.svg?1780891200",
      "localPath": "/mtg-symbols/0392-khm-kaldheim.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/khm"
  },
  {
    "id": "56782271-1c28-4bc5-8187-a7ec2e7e9be5",
    "name": "Kaldheim Minigames",
    "year": 2021,
    "releasedAt": "2021-02-05",
    "code": "MKHM",
    "setType": "Minigame",
    "cardCount": 5,
    "releaseOrder": 393,
    "icon": {
      "alt": "Kaldheim Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/khm.svg?1780891200",
      "localPath": "/mtg-symbols/0393-mkhm-kaldheim-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mkhm"
  },
  {
    "id": "4d7b6bf0-0ded-49a0-8c0e-b1ae2bfba77c",
    "name": "Kaldheim Promos",
    "year": 2021,
    "releasedAt": "2021-02-05",
    "code": "PKHM",
    "setType": "Promo",
    "cardCount": 158,
    "releaseOrder": 394,
    "icon": {
      "alt": "Kaldheim Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/khm.svg?1780891200",
      "localPath": "/mtg-symbols/0394-pkhm-kaldheim-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pkhm"
  },
  {
    "id": "30d7dea6-881a-49ec-9a13-d0df9f15b009",
    "name": "Kaldheim Substitute Cards",
    "year": 2021,
    "releasedAt": "2021-02-05",
    "code": "SKHM",
    "setType": "Token",
    "cardCount": 9,
    "releaseOrder": 395,
    "icon": {
      "alt": "Kaldheim Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/khm.svg?1780891200",
      "localPath": "/mtg-symbols/0395-skhm-kaldheim-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/skhm"
  },
  {
    "id": "d44c4073-9771-4a9a-a304-317591f3de8c",
    "name": "Kaldheim Commander Tokens",
    "year": 2021,
    "releasedAt": "2021-02-05",
    "code": "TKHC",
    "setType": "Token",
    "cardCount": 8,
    "releaseOrder": 396,
    "icon": {
      "alt": "Kaldheim Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/khc.svg?1780891200",
      "localPath": "/mtg-symbols/0396-tkhc-kaldheim-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tkhc"
  },
  {
    "id": "c3ee48f1-6f93-42d4-b05c-65a04d02a488",
    "name": "Kaldheim Tokens",
    "year": 2021,
    "releasedAt": "2021-02-05",
    "code": "TKHM",
    "setType": "Token",
    "cardCount": 23,
    "releaseOrder": 397,
    "icon": {
      "alt": "Kaldheim Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/khm.svg?1780891200",
      "localPath": "/mtg-symbols/0397-tkhm-kaldheim-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tkhm"
  },
  {
    "id": "dc1dbedc-9604-4c3a-886a-7be05f7e006a",
    "name": "Year of the Ox 2021",
    "year": 2021,
    "releasedAt": "2021-01-25",
    "code": "PL21",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 398,
    "icon": {
      "alt": "Year of the Ox 2021 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0398-pl21-year-of-the-ox-2021.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pl21"
  },
  {
    "id": "44c67c2c-7c14-4853-8dad-943a60816a05",
    "name": "Judge Gift Cards 2021",
    "year": 2021,
    "releasedAt": "2021-01-01",
    "code": "PJ21",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 399,
    "icon": {
      "alt": "Judge Gift Cards 2021 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/archie.svg?1780891200",
      "localPath": "/mtg-symbols/0399-pj21-judge-gift-cards-2021.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pj21"
  },
  {
    "id": "4de7b6af-43e2-4cd8-990e-3927b65ba62f",
    "name": "Commander Collection: Green",
    "year": 2020,
    "releasedAt": "2020-12-04",
    "code": "CC1",
    "setType": "Arsenal",
    "cardCount": 8,
    "releaseOrder": 400,
    "icon": {
      "alt": "Commander Collection: Green set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cc1.svg?1780891200",
      "localPath": "/mtg-symbols/0400-cc1-commander-collection-green.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cc1"
  },
  {
    "id": "39de6fbf-1f11-48d0-8f04-f0407f6a0732",
    "name": "Commander Legends",
    "year": 2020,
    "releasedAt": "2020-11-20",
    "code": "CMR",
    "setType": "Draft Innovation",
    "cardCount": 718,
    "releaseOrder": 401,
    "icon": {
      "alt": "Commander Legends set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cmr.svg?1780891200",
      "localPath": "/mtg-symbols/0401-cmr-commander-legends.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cmr"
  },
  {
    "id": "a850cf95-dd0b-43fa-9889-4dbd1299f85d",
    "name": "Commander Legends Promos",
    "year": 2020,
    "releasedAt": "2020-11-20",
    "code": "PCMR",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 402,
    "icon": {
      "alt": "Commander Legends Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cmr.svg?1780891200",
      "localPath": "/mtg-symbols/0402-pcmr-commander-legends-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pcmr"
  },
  {
    "id": "6bcdcd3c-15a1-49b2-bbe7-639d18395a5d",
    "name": "Commander Legends Tokens",
    "year": 2020,
    "releasedAt": "2020-11-20",
    "code": "TCMR",
    "setType": "Token",
    "cardCount": 23,
    "releaseOrder": 403,
    "icon": {
      "alt": "Commander Legends Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cmr.svg?1780891200",
      "localPath": "/mtg-symbols/0403-tcmr-commander-legends-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tcmr"
  },
  {
    "id": "cff93939-c724-4ed0-9367-e1277d39ba70",
    "name": "Kaladesh Remastered",
    "year": 2020,
    "releasedAt": "2020-11-12",
    "code": "KLR",
    "setType": "Masters",
    "cardCount": 302,
    "releaseOrder": 404,
    "icon": {
      "alt": "Kaladesh Remastered set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/klr.svg?1780891200",
      "localPath": "/mtg-symbols/0404-klr-kaladesh-remastered.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/klr"
  },
  {
    "id": "67e47ba2-b019-4181-9005-fe9fc021de44",
    "name": "The List",
    "year": 2020,
    "releasedAt": "2020-09-26",
    "code": "PLST",
    "setType": "Masters",
    "cardCount": 5120,
    "releaseOrder": 405,
    "icon": {
      "alt": "The List set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/planeswalker.svg?1780891200",
      "localPath": "/mtg-symbols/0405-plst-the-list.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plst"
  },
  {
    "id": "168acc08-0dea-40e7-ab0d-93bb2832e72b",
    "name": "Zendikar Rising Art Series",
    "year": 2020,
    "releasedAt": "2020-09-25",
    "code": "AZNR",
    "setType": "Memorabilia",
    "cardCount": 81,
    "releaseOrder": 406,
    "icon": {
      "alt": "Zendikar Rising Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/znr.svg?1780891200",
      "localPath": "/mtg-symbols/0406-aznr-zendikar-rising-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aznr"
  },
  {
    "id": "40f22d42-6fa9-4de4-8423-916a1b2268ab",
    "name": "Zendikar Rising Minigames",
    "year": 2020,
    "releasedAt": "2020-09-25",
    "code": "MZNR",
    "setType": "Minigame",
    "cardCount": 5,
    "releaseOrder": 407,
    "icon": {
      "alt": "Zendikar Rising Minigames set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/znr.svg?1780891200",
      "localPath": "/mtg-symbols/0407-mznr-zendikar-rising-minigames.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mznr"
  },
  {
    "id": "76c61d42-610a-4b5a-880a-7a1fc1222f81",
    "name": "Zendikar Rising Promos",
    "year": 2020,
    "releasedAt": "2020-09-25",
    "code": "PZNR",
    "setType": "Promo",
    "cardCount": 153,
    "releaseOrder": 408,
    "icon": {
      "alt": "Zendikar Rising Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/znr.svg?1780891200",
      "localPath": "/mtg-symbols/0408-pznr-zendikar-rising-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pznr"
  },
  {
    "id": "3bcb5e53-5ebb-4ff4-b76a-fc378bca0157",
    "name": "Zendikar Rising Substitute Cards",
    "year": 2020,
    "releasedAt": "2020-09-25",
    "code": "SZNR",
    "setType": "Token",
    "cardCount": 9,
    "releaseOrder": 409,
    "icon": {
      "alt": "Zendikar Rising Substitute Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/znr.svg?1780891200",
      "localPath": "/mtg-symbols/0409-sznr-zendikar-rising-substitute-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sznr"
  },
  {
    "id": "cfb7e832-fe79-4b5c-ba3d-2d59009525e7",
    "name": "Zendikar Rising Commander Tokens",
    "year": 2020,
    "releasedAt": "2020-09-25",
    "code": "TZNC",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 410,
    "icon": {
      "alt": "Zendikar Rising Commander Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/znc.svg?1780891200",
      "localPath": "/mtg-symbols/0410-tznc-zendikar-rising-commander-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tznc"
  },
  {
    "id": "ee023dc4-fe71-4224-be95-7c889d771ee1",
    "name": "Zendikar Rising Tokens",
    "year": 2020,
    "releasedAt": "2020-09-25",
    "code": "TZNR",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 411,
    "icon": {
      "alt": "Zendikar Rising Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/znr.svg?1780891200",
      "localPath": "/mtg-symbols/0411-tznr-zendikar-rising-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tznr"
  },
  {
    "id": "25c6bd9b-4e10-40a4-b9b5-0f4d9b5852a1",
    "name": "Zendikar Rising Commander",
    "year": 2020,
    "releasedAt": "2020-09-25",
    "code": "ZNC",
    "setType": "Commander",
    "cardCount": 142,
    "releaseOrder": 412,
    "icon": {
      "alt": "Zendikar Rising Commander set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/znc.svg?1780891200",
      "localPath": "/mtg-symbols/0412-znc-zendikar-rising-commander.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/znc"
  },
  {
    "id": "24e668b5-8312-498e-9bd7-c77a102bb55c",
    "name": "Zendikar Rising Expeditions",
    "year": 2020,
    "releasedAt": "2020-09-25",
    "code": "ZNE",
    "setType": "Masterpiece",
    "cardCount": 30,
    "releaseOrder": 413,
    "icon": {
      "alt": "Zendikar Rising Expeditions set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/zne.svg?1780891200",
      "localPath": "/mtg-symbols/0413-zne-zendikar-rising-expeditions.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/zne"
  },
  {
    "id": "f4e01fa7-b254-42dd-849f-69b58027a8c4",
    "name": "Zendikar Rising",
    "year": 2020,
    "releasedAt": "2020-09-25",
    "code": "ZNR",
    "setType": "Expansion",
    "cardCount": 407,
    "releaseOrder": 414,
    "icon": {
      "alt": "Zendikar Rising set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/znr.svg?1780891200",
      "localPath": "/mtg-symbols/0414-znr-zendikar-rising.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/znr"
  },
  {
    "id": "915dabb1-b82a-432d-939d-d9b128e65582",
    "name": "Amonkhet Remastered",
    "year": 2020,
    "releasedAt": "2020-08-13",
    "code": "AKR",
    "setType": "Masters",
    "cardCount": 339,
    "releaseOrder": 415,
    "icon": {
      "alt": "Amonkhet Remastered set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/akr.svg?1780891200",
      "localPath": "/mtg-symbols/0415-akr-amonkhet-remastered.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/akr"
  },
  {
    "id": "fb2d12a7-a385-4ec0-b7fd-e2ff1796d7a8",
    "name": "Arena Beginner Set",
    "year": 2020,
    "releasedAt": "2020-08-13",
    "code": "ANB",
    "setType": "Starter",
    "cardCount": 120,
    "releaseOrder": 416,
    "icon": {
      "alt": "Arena Beginner Set set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0416-anb-arena-beginner-set.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/anb"
  },
  {
    "id": "372dafe8-b5d1-4b81-998f-3ae96b59498a",
    "name": "Double Masters",
    "year": 2020,
    "releasedAt": "2020-08-07",
    "code": "2XM",
    "setType": "Masters",
    "cardCount": 384,
    "releaseOrder": 417,
    "icon": {
      "alt": "Double Masters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/2xm.svg?1780891200",
      "localPath": "/mtg-symbols/0417-2xm-double-masters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/2xm"
  },
  {
    "id": "b4027d72-f717-4bfc-81f6-12a3fcc3866b",
    "name": "Double Masters Tokens",
    "year": 2020,
    "releasedAt": "2020-08-07",
    "code": "T2XM",
    "setType": "Token",
    "cardCount": 31,
    "releaseOrder": 418,
    "icon": {
      "alt": "Double Masters Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/2xm.svg?1780891200",
      "localPath": "/mtg-symbols/0418-t2xm-double-masters-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/t2xm"
  },
  {
    "id": "dea849fc-18c3-4327-8c1e-72583d6f08e8",
    "name": "2019 Heroes of the Realm",
    "year": 2020,
    "releasedAt": "2020-08-01",
    "code": "PH19",
    "setType": "Funny",
    "cardCount": 7,
    "releaseOrder": 419,
    "icon": {
      "alt": "2019 Heroes of the Realm set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0419-ph19-2019-heroes-of-the-realm.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ph19"
  },
  {
    "id": "1d029120-8937-45d9-a858-f1d3c2e6fd8f",
    "name": "Jumpstart Arena Exclusives",
    "year": 2020,
    "releasedAt": "2020-07-17",
    "code": "AJMP",
    "setType": "Starter",
    "cardCount": 18,
    "releaseOrder": 420,
    "icon": {
      "alt": "Jumpstart Arena Exclusives set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jmp.svg?1780891200",
      "localPath": "/mtg-symbols/0420-ajmp-jumpstart-arena-exclusives.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ajmp"
  },
  {
    "id": "0f6ccf25-a627-4263-86df-5757137f1696",
    "name": "Jumpstart",
    "year": 2020,
    "releasedAt": "2020-07-17",
    "code": "JMP",
    "setType": "Draft Innovation",
    "cardCount": 497,
    "releaseOrder": 421,
    "icon": {
      "alt": "Jumpstart set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jmp.svg?1780891200",
      "localPath": "/mtg-symbols/0421-jmp-jumpstart.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/jmp"
  },
  {
    "id": "bc94aba1-7376-4e02-a12d-3a2efb66ab0f",
    "name": "Core Set 2021",
    "year": 2020,
    "releasedAt": "2020-07-03",
    "code": "M21",
    "setType": "Core",
    "cardCount": 397,
    "releaseOrder": 422,
    "icon": {
      "alt": "Core Set 2021 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m21.svg?1780891200",
      "localPath": "/mtg-symbols/0422-m21-core-set-2021.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m21"
  },
  {
    "id": "d4474b31-acac-4d3b-9baa-b596f829070b",
    "name": "Core Set 2021 Promos",
    "year": 2020,
    "releasedAt": "2020-07-03",
    "code": "PM21",
    "setType": "Promo",
    "cardCount": 137,
    "releaseOrder": 423,
    "icon": {
      "alt": "Core Set 2021 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m21.svg?1780891200",
      "localPath": "/mtg-symbols/0423-pm21-core-set-2021-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pm21"
  },
  {
    "id": "06cfcf14-ff33-4210-a531-c2818637f7df",
    "name": "Core Set 2021 Tokens",
    "year": 2020,
    "releasedAt": "2020-07-03",
    "code": "TM21",
    "setType": "Token",
    "cardCount": 20,
    "releaseOrder": 424,
    "icon": {
      "alt": "Core Set 2021 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m21.svg?1780891200",
      "localPath": "/mtg-symbols/0424-tm21-core-set-2021-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm21"
  },
  {
    "id": "4887d21f-71e7-4d7a-a079-e9521fd7e6d7",
    "name": "Signature Spellbook: Chandra",
    "year": 2020,
    "releasedAt": "2020-06-26",
    "code": "SS3",
    "setType": "Spellbook",
    "cardCount": 8,
    "releaseOrder": 425,
    "icon": {
      "alt": "Signature Spellbook: Chandra set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ss3.svg?1780891200",
      "localPath": "/mtg-symbols/0425-ss3-signature-spellbook-chandra.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ss3"
  },
  {
    "id": "08435c3a-335f-436e-a8a5-43752ebc2c14",
    "name": "Jumpstart Front Cards",
    "year": 2020,
    "releasedAt": "2020-06-18",
    "code": "FJMP",
    "setType": "Memorabilia",
    "cardCount": 46,
    "releaseOrder": 426,
    "icon": {
      "alt": "Jumpstart Front Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jmp.svg?1780891200",
      "localPath": "/mtg-symbols/0426-fjmp-jumpstart-front-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fjmp"
  },
  {
    "id": "6333fd9a-d48e-497f-83fd-30609018e5cb",
    "name": "Secret Lair: Ultimate Edition",
    "year": 2020,
    "releasedAt": "2020-05-29",
    "code": "SLU",
    "setType": "Box",
    "cardCount": 16,
    "releaseOrder": 427,
    "icon": {
      "alt": "Secret Lair: Ultimate Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0427-slu-secret-lair-ultimate-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/slu"
  },
  {
    "id": "a7821f29-e98a-4a32-a65f-f919870354a1",
    "name": "Historic Anthology 3",
    "year": 2020,
    "releasedAt": "2020-05-21",
    "code": "HA3",
    "setType": "Box",
    "cardCount": 27,
    "releaseOrder": 428,
    "icon": {
      "alt": "Historic Anthology 3 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ha1.svg?1780891200",
      "localPath": "/mtg-symbols/0428-ha3-historic-anthology-3.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ha3"
  },
  {
    "id": "3eaad315-374e-4fea-bf03-1d8c23883881",
    "name": "Love Your LGS 2020",
    "year": 2020,
    "releasedAt": "2020-05-18",
    "code": "PLG20",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 429,
    "icon": {
      "alt": "Love Your LGS 2020 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0429-plg20-love-your-lgs-2020.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plg20"
  },
  {
    "id": "19feda43-15ab-427e-a0e4-148a4bf2b03a",
    "name": "Ikoria: Lair of Behemoths",
    "year": 2020,
    "releasedAt": "2020-04-24",
    "code": "IKO",
    "setType": "Expansion",
    "cardCount": 390,
    "releaseOrder": 430,
    "icon": {
      "alt": "Ikoria: Lair of Behemoths set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/iko.svg?1780891200",
      "localPath": "/mtg-symbols/0430-iko-ikoria-lair-of-behemoths.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/iko"
  },
  {
    "id": "0e5fad97-b777-437a-b015-44428c42bf46",
    "name": "Ikoria: Lair of Behemoths Promos",
    "year": 2020,
    "releasedAt": "2020-04-24",
    "code": "PIKO",
    "setType": "Promo",
    "cardCount": 137,
    "releaseOrder": 431,
    "icon": {
      "alt": "Ikoria: Lair of Behemoths Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/iko.svg?1780891200",
      "localPath": "/mtg-symbols/0431-piko-ikoria-lair-of-behemoths-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/piko"
  },
  {
    "id": "382e0900-dd85-4f23-9dcf-24c9d2971f1b",
    "name": "Ikoria: Lair of Behemoths Tokens",
    "year": 2020,
    "releasedAt": "2020-04-24",
    "code": "TIKO",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 432,
    "icon": {
      "alt": "Ikoria: Lair of Behemoths Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/iko.svg?1780891200",
      "localPath": "/mtg-symbols/0432-tiko-ikoria-lair-of-behemoths-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tiko"
  },
  {
    "id": "f60ec786-1f8d-42f7-9abc-0d880fe243f6",
    "name": "Commander 2020",
    "year": 2020,
    "releasedAt": "2020-04-17",
    "code": "C20",
    "setType": "Commander",
    "cardCount": 322,
    "releaseOrder": 433,
    "icon": {
      "alt": "Commander 2020 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c20.svg?1780891200",
      "localPath": "/mtg-symbols/0433-c20-commander-2020.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/c20"
  },
  {
    "id": "9f91a21b-1abc-49a5-9f0c-e3635ed7c9f4",
    "name": "Commander 2020 Oversized",
    "year": 2020,
    "releasedAt": "2020-04-17",
    "code": "OC20",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 434,
    "icon": {
      "alt": "Commander 2020 Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c20.svg?1780891200",
      "localPath": "/mtg-symbols/0434-oc20-commander-2020-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oc20"
  },
  {
    "id": "bc7f97a6-1fd5-43cf-98f9-9f0d4872b2d1",
    "name": "Commander 2020 Tokens",
    "year": 2020,
    "releasedAt": "2020-04-17",
    "code": "TC20",
    "setType": "Token",
    "cardCount": 20,
    "releaseOrder": 435,
    "icon": {
      "alt": "Commander 2020 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c20.svg?1780891200",
      "localPath": "/mtg-symbols/0435-tc20-commander-2020-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tc20"
  },
  {
    "id": "fcbc31db-d64d-44ad-bdf8-a32b73892bf8",
    "name": "Historic Anthology 2",
    "year": 2020,
    "releasedAt": "2020-03-12",
    "code": "HA2",
    "setType": "Box",
    "cardCount": 25,
    "releaseOrder": 436,
    "icon": {
      "alt": "Historic Anthology 2 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ha1.svg?1780891200",
      "localPath": "/mtg-symbols/0436-ha2-historic-anthology-2.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ha2"
  },
  {
    "id": "8fe3f935-7c8d-4a4e-a051-c0b0f251d262",
    "name": "Unsanctioned Tokens",
    "year": 2020,
    "releasedAt": "2020-02-29",
    "code": "TUND",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 437,
    "icon": {
      "alt": "Unsanctioned Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/und.svg?1780891200",
      "localPath": "/mtg-symbols/0437-tund-unsanctioned-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tund"
  },
  {
    "id": "fccfdf97-f5f2-43b4-9be9-9255414e6633",
    "name": "Unsanctioned",
    "year": 2020,
    "releasedAt": "2020-02-29",
    "code": "UND",
    "setType": "Funny",
    "cardCount": 96,
    "releaseOrder": 438,
    "icon": {
      "alt": "Unsanctioned set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/und.svg?1780891200",
      "localPath": "/mtg-symbols/0438-und-unsanctioned.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/und"
  },
  {
    "id": "66d787e4-101d-4f72-a4ed-7c38df9b99fe",
    "name": "Theros Beyond Death Promos",
    "year": 2020,
    "releasedAt": "2020-01-24",
    "code": "PTHB",
    "setType": "Promo",
    "cardCount": 137,
    "releaseOrder": 439,
    "icon": {
      "alt": "Theros Beyond Death Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/thb.svg?1780891200",
      "localPath": "/mtg-symbols/0439-pthb-theros-beyond-death-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pthb"
  },
  {
    "id": "5f23a78d-cda1-462a-8be3-a62b40c34913",
    "name": "Theros Beyond Death",
    "year": 2020,
    "releasedAt": "2020-01-24",
    "code": "THB",
    "setType": "Expansion",
    "cardCount": 358,
    "releaseOrder": 440,
    "icon": {
      "alt": "Theros Beyond Death set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/thb.svg?1780891200",
      "localPath": "/mtg-symbols/0440-thb-theros-beyond-death.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/thb"
  },
  {
    "id": "200c397b-bf57-46a2-8ebf-592148fd49a4",
    "name": "Theros Beyond Death Tokens",
    "year": 2020,
    "releasedAt": "2020-01-24",
    "code": "TTHB",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 441,
    "icon": {
      "alt": "Theros Beyond Death Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/thb.svg?1780891200",
      "localPath": "/mtg-symbols/0441-tthb-theros-beyond-death-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tthb"
  },
  {
    "id": "1b90366b-7692-44ea-bd55-f17fa92869a5",
    "name": "Judge Gift Cards 2020",
    "year": 2020,
    "releasedAt": "2020-01-01",
    "code": "J20",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 442,
    "icon": {
      "alt": "Judge Gift Cards 2020 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/archie.svg?1780891200",
      "localPath": "/mtg-symbols/0442-j20-judge-gift-cards-2020.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j20"
  },
  {
    "id": "09e53c37-1e43-4f45-933d-af75b9cd6f76",
    "name": "MagicFest 2020",
    "year": 2020,
    "releasedAt": "2020-01-01",
    "code": "PF20",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 443,
    "icon": {
      "alt": "MagicFest 2020 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0443-pf20-magicfest-2020.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pf20"
  },
  {
    "id": "4d92a8a7-ccb0-437d-abdc-9d70fc5ed672",
    "name": "Secret Lair Drop",
    "year": 2019,
    "releasedAt": "2019-12-02",
    "code": "SLD",
    "setType": "Box",
    "cardCount": 2563,
    "releaseOrder": 444,
    "icon": {
      "alt": "Secret Lair Drop set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0444-sld-secret-lair-drop.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sld"
  },
  {
    "id": "73cccbc4-08d0-4d30-a262-fcb5106aab44",
    "name": "Historic Anthology 1",
    "year": 2019,
    "releasedAt": "2019-11-21",
    "code": "HA1",
    "setType": "Box",
    "cardCount": 20,
    "releaseOrder": 445,
    "icon": {
      "alt": "Historic Anthology 1 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ha1.svg?1780891200",
      "localPath": "/mtg-symbols/0445-ha1-historic-anthology-1.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ha1"
  },
  {
    "id": "a72727dd-dbab-4158-a772-a08825735169",
    "name": "Game Night 2019",
    "year": 2019,
    "releasedAt": "2019-11-15",
    "code": "GN2",
    "setType": "Box",
    "cardCount": 64,
    "releaseOrder": 446,
    "icon": {
      "alt": "Game Night 2019 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gn2.svg?1780891200",
      "localPath": "/mtg-symbols/0446-gn2-game-night-2019.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gn2"
  },
  {
    "id": "d724cb13-6907-47a9-8a24-22c16be11302",
    "name": "Game Night 2019 Tokens",
    "year": 2019,
    "releasedAt": "2019-11-15",
    "code": "TGN2",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 447,
    "icon": {
      "alt": "Game Night 2019 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gn2.svg?1780891200",
      "localPath": "/mtg-symbols/0447-tgn2-game-night-2019-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tgn2"
  },
  {
    "id": "8ffdef42-91f1-429f-bcd0-15778c57845c",
    "name": "Mystery Booster Playtest Cards 2019",
    "year": 2019,
    "releasedAt": "2019-11-07",
    "code": "CMB1",
    "setType": "Funny",
    "cardCount": 121,
    "releaseOrder": 448,
    "icon": {
      "alt": "Mystery Booster Playtest Cards 2019 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/planeswalker.svg?1780891200",
      "localPath": "/mtg-symbols/0448-cmb1-mystery-booster-playtest-cards-2019.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cmb1"
  },
  {
    "id": "d264b61b-bfb3-4388-be42-e34a1eaa00c2",
    "name": "Ponies: The Galloping",
    "year": 2019,
    "releasedAt": "2019-10-22",
    "code": "PTG",
    "setType": "Funny",
    "cardCount": 3,
    "releaseOrder": 449,
    "icon": {
      "alt": "Ponies: The Galloping set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ptg.svg?1780891200",
      "localPath": "/mtg-symbols/0449-ptg-ponies-the-galloping.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptg"
  },
  {
    "id": "a90a7b2f-9dd8-4fc7-9f7d-8ea2797ec782",
    "name": "Throne of Eldraine",
    "year": 2019,
    "releasedAt": "2019-10-04",
    "code": "ELD",
    "setType": "Expansion",
    "cardCount": 398,
    "releaseOrder": 450,
    "icon": {
      "alt": "Throne of Eldraine set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eld.svg?1780891200",
      "localPath": "/mtg-symbols/0450-eld-throne-of-eldraine.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/eld"
  },
  {
    "id": "5f593578-5079-4988-8e88-a3df186bdc2b",
    "name": "Throne of Eldraine Promos",
    "year": 2019,
    "releasedAt": "2019-10-04",
    "code": "PELD",
    "setType": "Promo",
    "cardCount": 138,
    "releaseOrder": 451,
    "icon": {
      "alt": "Throne of Eldraine Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eld.svg?1780891200",
      "localPath": "/mtg-symbols/0451-peld-throne-of-eldraine-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/peld"
  },
  {
    "id": "53a599cf-9e16-4bc1-91b9-95e541e0848d",
    "name": "Throne of Eldraine Tokens",
    "year": 2019,
    "releasedAt": "2019-10-04",
    "code": "TELD",
    "setType": "Token",
    "cardCount": 20,
    "releaseOrder": 452,
    "icon": {
      "alt": "Throne of Eldraine Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eld.svg?1780891200",
      "localPath": "/mtg-symbols/0452-teld-throne-of-eldraine-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/teld"
  },
  {
    "id": "d08fce7e-36a9-4617-8a14-24eb460bcbaf",
    "name": "Planeswalker Championship Promos",
    "year": 2019,
    "releasedAt": "2019-10-01",
    "code": "PWCS",
    "setType": "Promo",
    "cardCount": 42,
    "releaseOrder": 453,
    "icon": {
      "alt": "Planeswalker Championship Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0453-pwcs-planeswalker-championship-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pwcs"
  },
  {
    "id": "d7be92fd-4b4b-44f3-99bc-536cda58a4c3",
    "name": "Commander 2019 Oversized",
    "year": 2019,
    "releasedAt": "2019-08-31",
    "code": "OC19",
    "setType": "Memorabilia",
    "cardCount": 4,
    "releaseOrder": 454,
    "icon": {
      "alt": "Commander 2019 Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c19.svg?1780891200",
      "localPath": "/mtg-symbols/0454-oc19-commander-2019-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oc19"
  },
  {
    "id": "0fa3ccbb-d86d-4a2e-a55e-c4979c4feeb2",
    "name": "Commander 2019",
    "year": 2019,
    "releasedAt": "2019-08-23",
    "code": "C19",
    "setType": "Commander",
    "cardCount": 302,
    "releaseOrder": 455,
    "icon": {
      "alt": "Commander 2019 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c19.svg?1780891200",
      "localPath": "/mtg-symbols/0455-c19-commander-2019.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/c19"
  },
  {
    "id": "38346fd1-60eb-4f27-850d-81c9967e8c3e",
    "name": "2018 Heroes of the Realm",
    "year": 2019,
    "releasedAt": "2019-08-01",
    "code": "PH18",
    "setType": "Funny",
    "cardCount": 5,
    "releaseOrder": 456,
    "icon": {
      "alt": "2018 Heroes of the Realm set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0456-ph18-2018-heroes-of-the-realm.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ph18"
  },
  {
    "id": "3e10647f-a051-4790-af9d-7501544fac73",
    "name": "Commander 2019 Tokens",
    "year": 2019,
    "releasedAt": "2019-08-01",
    "code": "TC19",
    "setType": "Token",
    "cardCount": 29,
    "releaseOrder": 457,
    "icon": {
      "alt": "Commander 2019 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c19.svg?1780891200",
      "localPath": "/mtg-symbols/0457-tc19-commander-2019-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tc19"
  },
  {
    "id": "9e585a9c-2bba-4310-94a9-036329ee264c",
    "name": "San Diego Comic-Con 2019",
    "year": 2019,
    "releasedAt": "2019-07-18",
    "code": "PS19",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 458,
    "icon": {
      "alt": "San Diego Comic-Con 2019 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/war.svg?1780891200",
      "localPath": "/mtg-symbols/0458-ps19-san-diego-comic-con-2019.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ps19"
  },
  {
    "id": "4a787360-9767-4f44-80b1-2405dc5e39c7",
    "name": "Core Set 2020",
    "year": 2019,
    "releasedAt": "2019-07-12",
    "code": "M20",
    "setType": "Core",
    "cardCount": 346,
    "releaseOrder": 459,
    "icon": {
      "alt": "Core Set 2020 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m20.svg?1780891200",
      "localPath": "/mtg-symbols/0459-m20-core-set-2020.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m20"
  },
  {
    "id": "bb017236-6da1-4558-a8bd-cf020e964530",
    "name": "Core Set 2020 Promos",
    "year": 2019,
    "releasedAt": "2019-07-12",
    "code": "PM20",
    "setType": "Promo",
    "cardCount": 144,
    "releaseOrder": 460,
    "icon": {
      "alt": "Core Set 2020 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m20.svg?1780891200",
      "localPath": "/mtg-symbols/0460-pm20-core-set-2020-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pm20"
  },
  {
    "id": "32bb437f-76d4-48d6-a888-8a3491198b46",
    "name": "M20 Promo Packs",
    "year": 2019,
    "releasedAt": "2019-07-12",
    "code": "PPP1",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 461,
    "icon": {
      "alt": "M20 Promo Packs set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0461-ppp1-m20-promo-packs.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ppp1"
  },
  {
    "id": "2f0b935f-c299-4f84-9e8b-95c65ebb9aed",
    "name": "Core Set 2020 Tokens",
    "year": 2019,
    "releasedAt": "2019-07-12",
    "code": "TM20",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 462,
    "icon": {
      "alt": "Core Set 2020 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m20.svg?1780891200",
      "localPath": "/mtg-symbols/0462-tm20-core-set-2020-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm20"
  },
  {
    "id": "9ae53f04-9cbb-45db-8b5c-972fe847a984",
    "name": "Signature Spellbook: Gideon",
    "year": 2019,
    "releasedAt": "2019-06-28",
    "code": "SS2",
    "setType": "Spellbook",
    "cardCount": 8,
    "releaseOrder": 463,
    "icon": {
      "alt": "Signature Spellbook: Gideon set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ss2.svg?1780891200",
      "localPath": "/mtg-symbols/0463-ss2-signature-spellbook-gideon.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ss2"
  },
  {
    "id": "d7efccd6-55bc-4fb8-9138-e72577510a99",
    "name": "Modern Horizons",
    "year": 2019,
    "releasedAt": "2019-06-14",
    "code": "MH1",
    "setType": "Draft Innovation",
    "cardCount": 255,
    "releaseOrder": 464,
    "icon": {
      "alt": "Modern Horizons set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh1.svg?1780891200",
      "localPath": "/mtg-symbols/0464-mh1-modern-horizons.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mh1"
  },
  {
    "id": "20fb960d-f44a-495e-8667-6b36daecc03d",
    "name": "Modern Horizons Promos",
    "year": 2019,
    "releasedAt": "2019-06-14",
    "code": "PMH1",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 465,
    "icon": {
      "alt": "Modern Horizons Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh1.svg?1780891200",
      "localPath": "/mtg-symbols/0465-pmh1-modern-horizons-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmh1"
  },
  {
    "id": "198c5205-2614-43dd-b8c2-6e77aa0e5e91",
    "name": "Modern Horizons Art Series",
    "year": 2019,
    "releasedAt": "2019-06-05",
    "code": "AMH1",
    "setType": "Memorabilia",
    "cardCount": 54,
    "releaseOrder": 466,
    "icon": {
      "alt": "Modern Horizons Art Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh1.svg?1780891200",
      "localPath": "/mtg-symbols/0466-amh1-modern-horizons-art-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/amh1"
  },
  {
    "id": "7751e019-c7da-4117-b05a-5a4ba8261aa8",
    "name": "Modern Horizons Tokens",
    "year": 2019,
    "releasedAt": "2019-05-30",
    "code": "TMH1",
    "setType": "Token",
    "cardCount": 21,
    "releaseOrder": 467,
    "icon": {
      "alt": "Modern Horizons Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mh1.svg?1780891200",
      "localPath": "/mtg-symbols/0467-tmh1-modern-horizons-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmh1"
  },
  {
    "id": "9981777b-983e-4f17-b9b1-fe32cf243e23",
    "name": "War of the Spark Promos",
    "year": 2019,
    "releasedAt": "2019-05-03",
    "code": "PWAR",
    "setType": "Promo",
    "cardCount": 176,
    "releaseOrder": 468,
    "icon": {
      "alt": "War of the Spark Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/war.svg?1780891200",
      "localPath": "/mtg-symbols/0468-pwar-war-of-the-spark-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pwar"
  },
  {
    "id": "347699d9-cef8-457f-b08d-691abe09fc9c",
    "name": "War of the Spark Tokens",
    "year": 2019,
    "releasedAt": "2019-05-03",
    "code": "TWAR",
    "setType": "Token",
    "cardCount": 19,
    "releaseOrder": 469,
    "icon": {
      "alt": "War of the Spark Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/war.svg?1780891200",
      "localPath": "/mtg-symbols/0469-twar-war-of-the-spark-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/twar"
  },
  {
    "id": "ee044f0b-e101-4ead-8d0e-aa510aad4277",
    "name": "War of the Spark",
    "year": 2019,
    "releasedAt": "2019-05-03",
    "code": "WAR",
    "setType": "Expansion",
    "cardCount": 312,
    "releaseOrder": 470,
    "icon": {
      "alt": "War of the Spark set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/war.svg?1780891200",
      "localPath": "/mtg-symbols/0470-war-war-of-the-spark.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/war"
  },
  {
    "id": "0fbc0a38-0462-47d1-b0a2-dcd401d044bd",
    "name": "Judge Gift Cards 2019",
    "year": 2019,
    "releasedAt": "2019-04-10",
    "code": "J19",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 471,
    "icon": {
      "alt": "Judge Gift Cards 2019 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0471-j19-judge-gift-cards-2019.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j19"
  },
  {
    "id": "ee3a8eb6-0583-492b-8be5-265795d38038",
    "name": "RNA Ravnica Weekend",
    "year": 2019,
    "releasedAt": "2019-02-16",
    "code": "PRW2",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 472,
    "icon": {
      "alt": "RNA Ravnica Weekend set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rna.svg?1780891200",
      "localPath": "/mtg-symbols/0472-prw2-rna-ravnica-weekend.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/prw2"
  },
  {
    "id": "ce193344-b2a8-4b56-8243-c6ba4f6e20ef",
    "name": "RNA Guild Kit",
    "year": 2019,
    "releasedAt": "2019-02-15",
    "code": "GK2",
    "setType": "Box",
    "cardCount": 133,
    "releaseOrder": 473,
    "icon": {
      "alt": "RNA Guild Kit set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rna.svg?1780891200",
      "localPath": "/mtg-symbols/0473-gk2-rna-guild-kit.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gk2"
  },
  {
    "id": "e679befd-f788-46ab-a000-bcd1b0c56ff2",
    "name": "RNA Guild Kit Tokens",
    "year": 2019,
    "releasedAt": "2019-02-15",
    "code": "TGK2",
    "setType": "Token",
    "cardCount": 9,
    "releaseOrder": 474,
    "icon": {
      "alt": "RNA Guild Kit Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rna.svg?1780891200",
      "localPath": "/mtg-symbols/0474-tgk2-rna-guild-kit-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tgk2"
  },
  {
    "id": "503230ec-81e3-4f92-b847-ff435b1652e0",
    "name": "Ravnica Allegiance Promos",
    "year": 2019,
    "releasedAt": "2019-01-25",
    "code": "PRNA",
    "setType": "Promo",
    "cardCount": 81,
    "releaseOrder": 475,
    "icon": {
      "alt": "Ravnica Allegiance Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rna.svg?1780891200",
      "localPath": "/mtg-symbols/0475-prna-ravnica-allegiance-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/prna"
  },
  {
    "id": "97a7fd84-8d89-45a3-b48b-c951f6a3f9f1",
    "name": "Ravnica Allegiance",
    "year": 2019,
    "releasedAt": "2019-01-25",
    "code": "RNA",
    "setType": "Expansion",
    "cardCount": 273,
    "releaseOrder": 476,
    "icon": {
      "alt": "Ravnica Allegiance set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rna.svg?1780891200",
      "localPath": "/mtg-symbols/0476-rna-ravnica-allegiance.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/rna"
  },
  {
    "id": "7766a0e4-ff37-4ceb-b68c-6f9336c64ba0",
    "name": "Ravnica Allegiance Tokens",
    "year": 2019,
    "releasedAt": "2019-01-25",
    "code": "TRNA",
    "setType": "Token",
    "cardCount": 13,
    "releaseOrder": 477,
    "icon": {
      "alt": "Ravnica Allegiance Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rna.svg?1780891200",
      "localPath": "/mtg-symbols/0477-trna-ravnica-allegiance-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/trna"
  },
  {
    "id": "3d0d0d5b-e6d6-4dea-9250-5cea04725638",
    "name": "MagicFest 2019",
    "year": 2019,
    "releasedAt": "2019-01-01",
    "code": "PF19",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 478,
    "icon": {
      "alt": "MagicFest 2019 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0478-pf19-magicfest-2019.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pf19"
  },
  {
    "id": "bb516e44-1185-4bd5-9025-2c1b994beaac",
    "name": "Ultimate Box Topper",
    "year": 2018,
    "releasedAt": "2018-12-07",
    "code": "PUMA",
    "setType": "Masterpiece",
    "cardCount": 40,
    "releaseOrder": 479,
    "icon": {
      "alt": "Ultimate Box Topper set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/uma.svg?1780891200",
      "localPath": "/mtg-symbols/0479-puma-ultimate-box-topper.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/puma"
  },
  {
    "id": "804240d7-957c-4860-a684-d3d51dfe1c77",
    "name": "Ultimate Masters Tokens",
    "year": 2018,
    "releasedAt": "2018-12-07",
    "code": "TUMA",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 480,
    "icon": {
      "alt": "Ultimate Masters Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/uma.svg?1780891200",
      "localPath": "/mtg-symbols/0480-tuma-ultimate-masters-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tuma"
  },
  {
    "id": "2ec77b94-6d47-4891-a480-5d0b4e5c9372",
    "name": "Ultimate Masters",
    "year": 2018,
    "releasedAt": "2018-12-07",
    "code": "UMA",
    "setType": "Masters",
    "cardCount": 254,
    "releaseOrder": 481,
    "icon": {
      "alt": "Ultimate Masters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/uma.svg?1780891200",
      "localPath": "/mtg-symbols/0481-uma-ultimate-masters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/uma"
  },
  {
    "id": "be071312-2af9-4c4a-bcba-b726ee1eabb1",
    "name": "M19 Gift Pack",
    "year": 2018,
    "releasedAt": "2018-11-16",
    "code": "G18",
    "setType": "Box",
    "cardCount": 5,
    "releaseOrder": 482,
    "icon": {
      "alt": "M19 Gift Pack set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m19.svg?1780891200",
      "localPath": "/mtg-symbols/0482-g18-m19-gift-pack.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g18"
  },
  {
    "id": "cdbedc27-4f24-4d89-ace1-8da1b36ac78e",
    "name": "Game Night",
    "year": 2018,
    "releasedAt": "2018-11-16",
    "code": "GNT",
    "setType": "Box",
    "cardCount": 68,
    "releaseOrder": 483,
    "icon": {
      "alt": "Game Night set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gnt.svg?1780891200",
      "localPath": "/mtg-symbols/0483-gnt-game-night.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gnt"
  },
  {
    "id": "3a6a9844-812a-4576-ab71-0e7bc9b16f3b",
    "name": "GRN Ravnica Weekend",
    "year": 2018,
    "releasedAt": "2018-11-09",
    "code": "PRWK",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 484,
    "icon": {
      "alt": "GRN Ravnica Weekend set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/grn.svg?1780891200",
      "localPath": "/mtg-symbols/0484-prwk-grn-ravnica-weekend.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/prwk"
  },
  {
    "id": "600bdba8-0b12-454f-811c-438e0d9eb9b6",
    "name": "GRN Guild Kit",
    "year": 2018,
    "releasedAt": "2018-11-02",
    "code": "GK1",
    "setType": "Box",
    "cardCount": 127,
    "releaseOrder": 485,
    "icon": {
      "alt": "GRN Guild Kit set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/grn.svg?1780891200",
      "localPath": "/mtg-symbols/0485-gk1-grn-guild-kit.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gk1"
  },
  {
    "id": "9cabda5f-97cd-4eb3-93b9-83d1e9a191cb",
    "name": "GRN Guild Kit Tokens",
    "year": 2018,
    "releasedAt": "2018-11-02",
    "code": "TGK1",
    "setType": "Token",
    "cardCount": 10,
    "releaseOrder": 486,
    "icon": {
      "alt": "GRN Guild Kit Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/grn.svg?1780891200",
      "localPath": "/mtg-symbols/0486-tgk1-grn-guild-kit-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tgk1"
  },
  {
    "id": "597c6d4a-8212-4903-a6af-12c4ae9e13f0",
    "name": "Guilds of Ravnica",
    "year": 2018,
    "releasedAt": "2018-10-05",
    "code": "GRN",
    "setType": "Expansion",
    "cardCount": 273,
    "releaseOrder": 487,
    "icon": {
      "alt": "Guilds of Ravnica set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/grn.svg?1780891200",
      "localPath": "/mtg-symbols/0487-grn-guilds-of-ravnica.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/grn"
  },
  {
    "id": "08aabe3a-7c0e-4c48-b2c2-57dcb5a266a4",
    "name": "Mythic Edition",
    "year": 2018,
    "releasedAt": "2018-10-05",
    "code": "MED",
    "setType": "Masterpiece",
    "cardCount": 24,
    "releaseOrder": 488,
    "icon": {
      "alt": "Mythic Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/med.svg?1780891200",
      "localPath": "/mtg-symbols/0488-med-mythic-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/med"
  },
  {
    "id": "ea8a86b2-f171-4942-b52c-6c4e67d1acca",
    "name": "Guilds of Ravnica Promos",
    "year": 2018,
    "releasedAt": "2018-10-05",
    "code": "PGRN",
    "setType": "Promo",
    "cardCount": 84,
    "releaseOrder": 489,
    "icon": {
      "alt": "Guilds of Ravnica Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/grn.svg?1780891200",
      "localPath": "/mtg-symbols/0489-pgrn-guilds-of-ravnica-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pgrn"
  },
  {
    "id": "967bba11-2f81-452c-98c4-56bd7c051242",
    "name": "Guilds of Ravnica Tokens",
    "year": 2018,
    "releasedAt": "2018-10-05",
    "code": "TGRN",
    "setType": "Token",
    "cardCount": 8,
    "releaseOrder": 490,
    "icon": {
      "alt": "Guilds of Ravnica Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/grn.svg?1780891200",
      "localPath": "/mtg-symbols/0490-tgrn-guilds-of-ravnica-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tgrn"
  },
  {
    "id": "3a9213f3-71d0-4e17-a9f4-f85f705f3cbe",
    "name": "Mythic Edition Tokens",
    "year": 2018,
    "releasedAt": "2018-10-05",
    "code": "TMED",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 491,
    "icon": {
      "alt": "Mythic Edition Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/med.svg?1780891200",
      "localPath": "/mtg-symbols/0491-tmed-mythic-edition-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmed"
  },
  {
    "id": "06ce6bc2-85cd-4cca-85b1-8c620d3e0902",
    "name": "Commander 2018",
    "year": 2018,
    "releasedAt": "2018-08-10",
    "code": "C18",
    "setType": "Commander",
    "cardCount": 307,
    "releaseOrder": 492,
    "icon": {
      "alt": "Commander 2018 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c18.svg?1780891200",
      "localPath": "/mtg-symbols/0492-c18-commander-2018.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/c18"
  },
  {
    "id": "5e72b6d5-d7ff-436d-a0c6-35d40e836ed9",
    "name": "Commander 2018 Oversized",
    "year": 2018,
    "releasedAt": "2018-08-09",
    "code": "OC18",
    "setType": "Memorabilia",
    "cardCount": 4,
    "releaseOrder": 493,
    "icon": {
      "alt": "Commander 2018 Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c18.svg?1780891200",
      "localPath": "/mtg-symbols/0493-oc18-commander-2018-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oc18"
  },
  {
    "id": "8d858150-d438-49cb-81d6-8fc5b8feccc4",
    "name": "Commander 2018 Tokens",
    "year": 2018,
    "releasedAt": "2018-08-09",
    "code": "TC18",
    "setType": "Token",
    "cardCount": 26,
    "releaseOrder": 494,
    "icon": {
      "alt": "Commander 2018 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c18.svg?1780891200",
      "localPath": "/mtg-symbols/0494-tc18-commander-2018-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tc18"
  },
  {
    "id": "6213f371-2428-42aa-a0a9-52c4947039ed",
    "name": "2017 Heroes of the Realm",
    "year": 2018,
    "releasedAt": "2018-08-01",
    "code": "PH17",
    "setType": "Funny",
    "cardCount": 3,
    "releaseOrder": 495,
    "icon": {
      "alt": "2017 Heroes of the Realm set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0495-ph17-2017-heroes-of-the-realm.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ph17"
  },
  {
    "id": "cc3852c4-5b7b-4afa-ad66-aa7e88daa262",
    "name": "San Diego Comic-Con 2018",
    "year": 2018,
    "releasedAt": "2018-07-19",
    "code": "PS18",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 496,
    "icon": {
      "alt": "San Diego Comic-Con 2018 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0496-ps18-san-diego-comic-con-2018.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ps18"
  },
  {
    "id": "da9d7034-0e7f-4fd0-ad7e-c4517674a4c2",
    "name": "Arena New Player Experience",
    "year": 2018,
    "releasedAt": "2018-07-14",
    "code": "ANA",
    "setType": "Starter",
    "cardCount": 46,
    "releaseOrder": 497,
    "icon": {
      "alt": "Arena New Player Experience set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0497-ana-arena-new-player-experience.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ana"
  },
  {
    "id": "b6072801-1d75-48e6-bdc1-f9c19ed48ecc",
    "name": "Arena New Player Experience Cards",
    "year": 2018,
    "releasedAt": "2018-07-14",
    "code": "OANA",
    "setType": "Starter",
    "cardCount": 14,
    "releaseOrder": 498,
    "icon": {
      "alt": "Arena New Player Experience Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0498-oana-arena-new-player-experience-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oana"
  },
  {
    "id": "8ff0b4b8-2b1b-4283-a35c-6edd5bbcf373",
    "name": "MTG Arena Promos",
    "year": 2018,
    "releasedAt": "2018-07-14",
    "code": "PANA",
    "setType": "Promo",
    "cardCount": 83,
    "releaseOrder": 499,
    "icon": {
      "alt": "MTG Arena Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0499-pana-mtg-arena-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pana"
  },
  {
    "id": "9e5d6aa8-3fc1-4175-a851-894e42c0e25a",
    "name": "Arena New Player Experience Extras",
    "year": 2018,
    "releasedAt": "2018-07-14",
    "code": "XANA",
    "setType": "Memorabilia",
    "cardCount": 20,
    "releaseOrder": 500,
    "icon": {
      "alt": "Arena New Player Experience Extras set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtga.svg?1780891200",
      "localPath": "/mtg-symbols/0500-xana-arena-new-player-experience-extras.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/xana"
  },
  {
    "id": "2f5f2509-56db-414d-9a7e-6e312ec3760c",
    "name": "Core Set 2019",
    "year": 2018,
    "releasedAt": "2018-07-13",
    "code": "M19",
    "setType": "Core",
    "cardCount": 314,
    "releaseOrder": 501,
    "icon": {
      "alt": "Core Set 2019 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m19.svg?1780891200",
      "localPath": "/mtg-symbols/0501-m19-core-set-2019.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m19"
  },
  {
    "id": "ee765d6b-a5ee-4bcd-bbd0-9bc55697ed3c",
    "name": "Core Set 2019 Promos",
    "year": 2018,
    "releasedAt": "2018-07-13",
    "code": "PM19",
    "setType": "Promo",
    "cardCount": 95,
    "releaseOrder": 502,
    "icon": {
      "alt": "Core Set 2019 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m19.svg?1780891200",
      "localPath": "/mtg-symbols/0502-pm19-core-set-2019-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pm19"
  },
  {
    "id": "60ec31ea-b56b-4b64-b0ef-cee965f8b45e",
    "name": "M19 Standard Showdown",
    "year": 2018,
    "releasedAt": "2018-07-13",
    "code": "PSS3",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 503,
    "icon": {
      "alt": "M19 Standard Showdown set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0503-pss3-m19-standard-showdown.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pss3"
  },
  {
    "id": "f291a61b-4afa-4c57-85ac-c67d5ab1403d",
    "name": "Core Set 2019 Tokens",
    "year": 2018,
    "releasedAt": "2018-07-13",
    "code": "TM19",
    "setType": "Token",
    "cardCount": 18,
    "releaseOrder": 504,
    "icon": {
      "alt": "Core Set 2019 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m19.svg?1780891200",
      "localPath": "/mtg-symbols/0504-tm19-core-set-2019-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm19"
  },
  {
    "id": "19c285e9-68e0-45e1-b82b-ac6051eb43be",
    "name": "Global Series Jiang Yanggu & Mu Yanling",
    "year": 2018,
    "releasedAt": "2018-06-22",
    "code": "GS1",
    "setType": "Duel Deck",
    "cardCount": 41,
    "releaseOrder": 505,
    "icon": {
      "alt": "Global Series Jiang Yanggu & Mu Yanling set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gs1.svg?1780891200",
      "localPath": "/mtg-symbols/0505-gs1-global-series-jiang-yanggu-and-mu-yanling.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gs1"
  },
  {
    "id": "a24031db-1378-420f-b671-bcaec52d6f6c",
    "name": "Signature Spellbook: Jace",
    "year": 2018,
    "releasedAt": "2018-06-15",
    "code": "SS1",
    "setType": "Spellbook",
    "cardCount": 8,
    "releaseOrder": 506,
    "icon": {
      "alt": "Signature Spellbook: Jace set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ss1.svg?1780891200",
      "localPath": "/mtg-symbols/0506-ss1-signature-spellbook-jace.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ss1"
  },
  {
    "id": "95f97fbc-58ef-4645-982e-43e2db6f1124",
    "name": "Battlebond",
    "year": 2018,
    "releasedAt": "2018-06-08",
    "code": "BBD",
    "setType": "Draft Innovation",
    "cardCount": 256,
    "releaseOrder": 507,
    "icon": {
      "alt": "Battlebond set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bbd.svg?1780891200",
      "localPath": "/mtg-symbols/0507-bbd-battlebond.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/bbd"
  },
  {
    "id": "2ba5b1a3-40ed-422e-981d-56753004dfc6",
    "name": "Commander Anthology Volume II",
    "year": 2018,
    "releasedAt": "2018-06-08",
    "code": "CM2",
    "setType": "Commander",
    "cardCount": 312,
    "releaseOrder": 508,
    "icon": {
      "alt": "Commander Anthology Volume II set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cm2.svg?1780891200",
      "localPath": "/mtg-symbols/0508-cm2-commander-anthology-volume-ii.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cm2"
  },
  {
    "id": "04e3fb66-920f-4c47-b17e-8aa2681cebdf",
    "name": "Battlebond Promos",
    "year": 2018,
    "releasedAt": "2018-06-08",
    "code": "PBBD",
    "setType": "Promo",
    "cardCount": 22,
    "releaseOrder": 509,
    "icon": {
      "alt": "Battlebond Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bbd.svg?1780891200",
      "localPath": "/mtg-symbols/0509-pbbd-battlebond-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pbbd"
  },
  {
    "id": "b08b40c1-a3fc-4920-a4f6-842c7286fb98",
    "name": "Battlebond Tokens",
    "year": 2018,
    "releasedAt": "2018-06-08",
    "code": "TBBD",
    "setType": "Token",
    "cardCount": 8,
    "releaseOrder": 510,
    "icon": {
      "alt": "Battlebond Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bbd.svg?1780891200",
      "localPath": "/mtg-symbols/0510-tbbd-battlebond-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tbbd"
  },
  {
    "id": "fa6a256f-bad4-495d-a2f7-007c0a773307",
    "name": "Commander Anthology Volume II Tokens",
    "year": 2018,
    "releasedAt": "2018-06-08",
    "code": "TCM2",
    "setType": "Token",
    "cardCount": 19,
    "releaseOrder": 511,
    "icon": {
      "alt": "Commander Anthology Volume II Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cm2.svg?1780891200",
      "localPath": "/mtg-symbols/0511-tcm2-commander-anthology-volume-ii-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tcm2"
  },
  {
    "id": "be1daba3-51c9-4e7e-9212-36e68addc26c",
    "name": "Dominaria",
    "year": 2018,
    "releasedAt": "2018-04-27",
    "code": "DOM",
    "setType": "Expansion",
    "cardCount": 280,
    "releaseOrder": 512,
    "icon": {
      "alt": "Dominaria set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dom.svg?1780891200",
      "localPath": "/mtg-symbols/0512-dom-dominaria.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dom"
  },
  {
    "id": "e61a976d-a9ce-42bd-ad9e-f51b1c8fc434",
    "name": "Dominaria Promos",
    "year": 2018,
    "releasedAt": "2018-04-27",
    "code": "PDOM",
    "setType": "Promo",
    "cardCount": 118,
    "releaseOrder": 513,
    "icon": {
      "alt": "Dominaria Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dom.svg?1780891200",
      "localPath": "/mtg-symbols/0513-pdom-dominaria-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdom"
  },
  {
    "id": "c402d02c-7d42-41e4-99ea-d2540ca10b0c",
    "name": "Dominaria Tokens",
    "year": 2018,
    "releasedAt": "2018-04-27",
    "code": "TDOM",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 514,
    "icon": {
      "alt": "Dominaria Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dom.svg?1780891200",
      "localPath": "/mtg-symbols/0514-tdom-dominaria-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdom"
  },
  {
    "id": "01e30e53-f292-4c39-ab09-435b015877f5",
    "name": "Duel Decks: Elves vs. Inventors",
    "year": 2018,
    "releasedAt": "2018-04-06",
    "code": "DDU",
    "setType": "Duel Deck",
    "cardCount": 76,
    "releaseOrder": 515,
    "icon": {
      "alt": "Duel Decks: Elves vs. Inventors set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddu.svg?1780891200",
      "localPath": "/mtg-symbols/0515-ddu-duel-decks-elves-vs-inventors.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddu"
  },
  {
    "id": "ec7c4edd-56ae-46a7-9c05-efbff73bcf8c",
    "name": "Duel Decks: Elves vs. Inventors Tokens",
    "year": 2018,
    "releasedAt": "2018-04-06",
    "code": "TDDU",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 516,
    "icon": {
      "alt": "Duel Decks: Elves vs. Inventors Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddu.svg?1780891200",
      "localPath": "/mtg-symbols/0516-tddu-duel-decks-elves-vs-inventors-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddu"
  },
  {
    "id": "41ee6e2f-69b3-4c53-8a8e-960f5e974cfc",
    "name": "Masters 25",
    "year": 2018,
    "releasedAt": "2018-03-16",
    "code": "A25",
    "setType": "Masters",
    "cardCount": 249,
    "releaseOrder": 517,
    "icon": {
      "alt": "Masters 25 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/a25.svg?1780891200",
      "localPath": "/mtg-symbols/0517-a25-masters-25.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/a25"
  },
  {
    "id": "d7332292-8eae-4d07-b48d-c96effb3994a",
    "name": "Masters 25 Tokens",
    "year": 2018,
    "releasedAt": "2018-03-16",
    "code": "TA25",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 518,
    "icon": {
      "alt": "Masters 25 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/a25.svg?1780891200",
      "localPath": "/mtg-symbols/0518-ta25-masters-25-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ta25"
  },
  {
    "id": "b0ccaabd-33b7-4c4e-afea-701d032496e7",
    "name": "Lunar New Year 2018",
    "year": 2018,
    "releasedAt": "2018-02-16",
    "code": "PLNY",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 519,
    "icon": {
      "alt": "Lunar New Year 2018 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0519-plny-lunar-new-year-2018.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plny"
  },
  {
    "id": "e19b1496-25e6-4aa8-ba89-3b0de097a3e9",
    "name": "Nationals Promos",
    "year": 2018,
    "releasedAt": "2018-01-25",
    "code": "PNAT",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 520,
    "icon": {
      "alt": "Nationals Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0520-pnat-nationals-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pnat"
  },
  {
    "id": "e7140c68-d478-4ca3-9185-9a64d5e104df",
    "name": "Rivals of Ixalan Promos",
    "year": 2018,
    "releasedAt": "2018-01-19",
    "code": "PRIX",
    "setType": "Promo",
    "cardCount": 98,
    "releaseOrder": 521,
    "icon": {
      "alt": "Rivals of Ixalan Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rix.svg?1780891200",
      "localPath": "/mtg-symbols/0521-prix-rivals-of-ixalan-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/prix"
  },
  {
    "id": "2f7e40fc-772d-4a85-bfdd-01653c41d0fa",
    "name": "Rivals of Ixalan",
    "year": 2018,
    "releasedAt": "2018-01-19",
    "code": "RIX",
    "setType": "Expansion",
    "cardCount": 205,
    "releaseOrder": 522,
    "icon": {
      "alt": "Rivals of Ixalan set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rix.svg?1780891200",
      "localPath": "/mtg-symbols/0522-rix-rivals-of-ixalan.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/rix"
  },
  {
    "id": "a49703ee-b842-44f1-aff3-20a7c75253f6",
    "name": "Rivals of Ixalan Tokens",
    "year": 2018,
    "releasedAt": "2018-01-19",
    "code": "TRIX",
    "setType": "Token",
    "cardCount": 7,
    "releaseOrder": 523,
    "icon": {
      "alt": "Rivals of Ixalan Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rix.svg?1780891200",
      "localPath": "/mtg-symbols/0523-trix-rivals-of-ixalan-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/trix"
  },
  {
    "id": "71da38d2-c15a-45c4-97b2-a791a2fd695b",
    "name": "Judge Gift Cards 2018",
    "year": 2018,
    "releasedAt": "2018-01-01",
    "code": "J18",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 524,
    "icon": {
      "alt": "Judge Gift Cards 2018 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0524-j18-judge-gift-cards-2018.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j18"
  },
  {
    "id": "3a1c398c-c72b-4617-acae-3e6b06ae08d5",
    "name": "Friday Night Magic 2018",
    "year": 2017,
    "releasedAt": "2017-12-27",
    "code": "F18",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 525,
    "icon": {
      "alt": "Friday Night Magic 2018 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0525-f18-friday-night-magic-2018.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f18"
  },
  {
    "id": "d9724b93-8557-4e7b-b056-919d2f8c385b",
    "name": "Unstable Promos",
    "year": 2017,
    "releasedAt": "2017-12-08",
    "code": "PUST",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 526,
    "icon": {
      "alt": "Unstable Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ust.svg?1780891200",
      "localPath": "/mtg-symbols/0526-pust-unstable-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pust"
  },
  {
    "id": "f494ec08-2e39-4228-bddb-200967e2b109",
    "name": "Unstable Tokens",
    "year": 2017,
    "releasedAt": "2017-12-08",
    "code": "TUST",
    "setType": "Token",
    "cardCount": 20,
    "releaseOrder": 527,
    "icon": {
      "alt": "Unstable Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ust.svg?1780891200",
      "localPath": "/mtg-symbols/0527-tust-unstable-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tust"
  },
  {
    "id": "83491685-880d-41dd-a4af-47d2b3b17c10",
    "name": "Unstable",
    "year": 2017,
    "releasedAt": "2017-12-08",
    "code": "UST",
    "setType": "Funny",
    "cardCount": 268,
    "releaseOrder": 528,
    "icon": {
      "alt": "Unstable set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ust.svg?1780891200",
      "localPath": "/mtg-symbols/0528-ust-unstable.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ust"
  },
  {
    "id": "a687cc0c-894b-4373-87b0-737cbace1da6",
    "name": "Iconic Masters Tokens",
    "year": 2017,
    "releasedAt": "2017-11-29",
    "code": "TIMA",
    "setType": "Token",
    "cardCount": 7,
    "releaseOrder": 529,
    "icon": {
      "alt": "Iconic Masters Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ima.svg?1780891200",
      "localPath": "/mtg-symbols/0529-tima-iconic-masters-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tima"
  },
  {
    "id": "a5531353-3534-4882-8802-0304e5c2bf64",
    "name": "Explorers of Ixalan",
    "year": 2017,
    "releasedAt": "2017-11-24",
    "code": "E02",
    "setType": "Box",
    "cardCount": 48,
    "releaseOrder": 530,
    "icon": {
      "alt": "Explorers of Ixalan set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/e02.svg?1780891200",
      "localPath": "/mtg-symbols/0530-e02-explorers-of-ixalan.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/e02"
  },
  {
    "id": "2b5230c7-25a8-4521-9f6a-7e3cefb07213",
    "name": "XLN Treasure Chest",
    "year": 2017,
    "releasedAt": "2017-11-24",
    "code": "PXTC",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 531,
    "icon": {
      "alt": "XLN Treasure Chest set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/xln.svg?1780891200",
      "localPath": "/mtg-symbols/0531-pxtc-xln-treasure-chest.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pxtc"
  },
  {
    "id": "63c89a12-d115-4084-a4af-fceef40ca02f",
    "name": "From the Vault: Transform",
    "year": 2017,
    "releasedAt": "2017-11-24",
    "code": "V17",
    "setType": "From The Vault",
    "cardCount": 16,
    "releaseOrder": 532,
    "icon": {
      "alt": "From the Vault: Transform set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/v17.svg?1780891200",
      "localPath": "/mtg-symbols/0532-v17-from-the-vault-transform.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/v17"
  },
  {
    "id": "741bcd30-7709-4133-8919-f4b46483bed7",
    "name": "Iconic Masters",
    "year": 2017,
    "releasedAt": "2017-11-17",
    "code": "IMA",
    "setType": "Masters",
    "cardCount": 249,
    "releaseOrder": 533,
    "icon": {
      "alt": "Iconic Masters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ima.svg?1780891200",
      "localPath": "/mtg-symbols/0533-ima-iconic-masters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ima"
  },
  {
    "id": "c77df674-0ef5-47d9-ab22-56a6e1dc901c",
    "name": "Duel Decks: Merfolk vs. Goblins",
    "year": 2017,
    "releasedAt": "2017-10-24",
    "code": "DDT",
    "setType": "Duel Deck",
    "cardCount": 63,
    "releaseOrder": 534,
    "icon": {
      "alt": "Duel Decks: Merfolk vs. Goblins set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddt.svg?1780891200",
      "localPath": "/mtg-symbols/0534-ddt-duel-decks-merfolk-vs-goblins.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddt"
  },
  {
    "id": "0e125579-396f-4614-9557-717698b06462",
    "name": "Duel Decks: Merfolk vs. Goblins Tokens",
    "year": 2017,
    "releasedAt": "2017-10-24",
    "code": "TDDT",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 535,
    "icon": {
      "alt": "Duel Decks: Merfolk vs. Goblins Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddt.svg?1780891200",
      "localPath": "/mtg-symbols/0535-tddt-duel-decks-merfolk-vs-goblins-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddt"
  },
  {
    "id": "e8b03e62-498f-49c9-8228-55436c7f9cb6",
    "name": "2017 Gift Pack",
    "year": 2017,
    "releasedAt": "2017-10-20",
    "code": "G17",
    "setType": "Box",
    "cardCount": 5,
    "releaseOrder": 536,
    "icon": {
      "alt": "2017 Gift Pack set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0536-g17-2017-gift-pack.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g17"
  },
  {
    "id": "6e61f42a-48ff-4cde-8cc7-06dfec6ac11f",
    "name": "XLN Standard Showdown",
    "year": 2017,
    "releasedAt": "2017-09-29",
    "code": "PSS2",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 537,
    "icon": {
      "alt": "XLN Standard Showdown set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0537-pss2-xln-standard-showdown.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pss2"
  },
  {
    "id": "e2876a7e-3444-49cc-a299-aae5094f3566",
    "name": "Ixalan Promos",
    "year": 2017,
    "releasedAt": "2017-09-29",
    "code": "PXLN",
    "setType": "Promo",
    "cardCount": 120,
    "releaseOrder": 538,
    "icon": {
      "alt": "Ixalan Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/xln.svg?1780891200",
      "localPath": "/mtg-symbols/0538-pxln-ixalan-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pxln"
  },
  {
    "id": "52f094c5-f3ed-42fc-b6a4-4004c0a48f50",
    "name": "Ixalan Tokens",
    "year": 2017,
    "releasedAt": "2017-09-29",
    "code": "TXLN",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 539,
    "icon": {
      "alt": "Ixalan Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/xln.svg?1780891200",
      "localPath": "/mtg-symbols/0539-txln-ixalan-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/txln"
  },
  {
    "id": "fe0dad85-54bc-4151-9200-d68da84dd0f2",
    "name": "Ixalan",
    "year": 2017,
    "releasedAt": "2017-09-29",
    "code": "XLN",
    "setType": "Expansion",
    "cardCount": 289,
    "releaseOrder": 540,
    "icon": {
      "alt": "Ixalan set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/xln.svg?1780891200",
      "localPath": "/mtg-symbols/0540-xln-ixalan.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/xln"
  },
  {
    "id": "2790698c-b015-4864-9eea-8b6964478432",
    "name": "HasCon 2017",
    "year": 2017,
    "releasedAt": "2017-09-20",
    "code": "H17",
    "setType": "Funny",
    "cardCount": 4,
    "releaseOrder": 541,
    "icon": {
      "alt": "HasCon 2017 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/h17.svg?1780891200",
      "localPath": "/mtg-symbols/0541-h17-hascon-2017.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/h17"
  },
  {
    "id": "e9dbe497-c76a-4037-82c1-7ef338d6c54c",
    "name": "2016 Heroes of the Realm",
    "year": 2017,
    "releasedAt": "2017-09-20",
    "code": "PHTR",
    "setType": "Funny",
    "cardCount": 3,
    "releaseOrder": 542,
    "icon": {
      "alt": "2016 Heroes of the Realm set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0542-phtr-2016-heroes-of-the-realm.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/phtr"
  },
  {
    "id": "31a6abc8-69af-4aea-883e-7b9265fee9f6",
    "name": "Archenemy: Nicol Bolas Tokens",
    "year": 2017,
    "releasedAt": "2017-09-08",
    "code": "TE01",
    "setType": "Token",
    "cardCount": 5,
    "releaseOrder": 543,
    "icon": {
      "alt": "Archenemy: Nicol Bolas Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/e01.svg?1780891200",
      "localPath": "/mtg-symbols/0543-te01-archenemy-nicol-bolas-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/te01"
  },
  {
    "id": "5caec427-0c78-4c37-b4ec-30f7e0ba9abf",
    "name": "Commander 2017",
    "year": 2017,
    "releasedAt": "2017-08-25",
    "code": "C17",
    "setType": "Commander",
    "cardCount": 309,
    "releaseOrder": 544,
    "icon": {
      "alt": "Commander 2017 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c17.svg?1780891200",
      "localPath": "/mtg-symbols/0544-c17-commander-2017.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/c17"
  },
  {
    "id": "276c644b-3aaa-43ce-b46c-47675fbf720c",
    "name": "Commander 2017 Oversized",
    "year": 2017,
    "releasedAt": "2017-08-25",
    "code": "OC17",
    "setType": "Memorabilia",
    "cardCount": 4,
    "releaseOrder": 545,
    "icon": {
      "alt": "Commander 2017 Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c17.svg?1780891200",
      "localPath": "/mtg-symbols/0545-oc17-commander-2017-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oc17"
  },
  {
    "id": "d6402450-8ab0-4ae6-b909-87ef6464a637",
    "name": "Commander 2017 Tokens",
    "year": 2017,
    "releasedAt": "2017-08-25",
    "code": "TC17",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 546,
    "icon": {
      "alt": "Commander 2017 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c17.svg?1780891200",
      "localPath": "/mtg-symbols/0546-tc17-commander-2017-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tc17"
  },
  {
    "id": "68ba0a73-fe68-48f4-a062-4a9f663520e6",
    "name": "San Diego Comic-Con 2017",
    "year": 2017,
    "releasedAt": "2017-07-20",
    "code": "PS17",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 547,
    "icon": {
      "alt": "San Diego Comic-Con 2017 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0547-ps17-san-diego-comic-con-2017.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ps17"
  },
  {
    "id": "65ff168b-bb94-47a5-a8f9-4ec6c213e768",
    "name": "Hour of Devastation",
    "year": 2017,
    "releasedAt": "2017-07-14",
    "code": "HOU",
    "setType": "Expansion",
    "cardCount": 209,
    "releaseOrder": 548,
    "icon": {
      "alt": "Hour of Devastation set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hou.svg?1780891200",
      "localPath": "/mtg-symbols/0548-hou-hour-of-devastation.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/hou"
  },
  {
    "id": "220548b3-7b6a-43e0-a423-8eefe7feb1a0",
    "name": "Hour of Devastation Promos",
    "year": 2017,
    "releasedAt": "2017-07-14",
    "code": "PHOU",
    "setType": "Promo",
    "cardCount": 62,
    "releaseOrder": 549,
    "icon": {
      "alt": "Hour of Devastation Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hou.svg?1780891200",
      "localPath": "/mtg-symbols/0549-phou-hour-of-devastation-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/phou"
  },
  {
    "id": "cb890bc8-ec73-449e-9be0-46891f39eea1",
    "name": "Hour of Devastation Tokens",
    "year": 2017,
    "releasedAt": "2017-07-14",
    "code": "THOU",
    "setType": "Token",
    "cardCount": 13,
    "releaseOrder": 550,
    "icon": {
      "alt": "Hour of Devastation Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hou.svg?1780891200",
      "localPath": "/mtg-symbols/0550-thou-hour-of-devastation-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/thou"
  },
  {
    "id": "bf058cce-027d-4784-85e7-2750533a11df",
    "name": "Archenemy: Nicol Bolas",
    "year": 2017,
    "releasedAt": "2017-06-16",
    "code": "E01",
    "setType": "Archenemy",
    "cardCount": 106,
    "releaseOrder": 551,
    "icon": {
      "alt": "Archenemy: Nicol Bolas set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/e01.svg?1780891200",
      "localPath": "/mtg-symbols/0551-e01-archenemy-nicol-bolas.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/e01"
  },
  {
    "id": "aa50a66a-0eb3-4bb5-acad-bc6c96f98663",
    "name": "Archenemy: Nicol Bolas Schemes",
    "year": 2017,
    "releasedAt": "2017-06-16",
    "code": "OE01",
    "setType": "Archenemy",
    "cardCount": 20,
    "releaseOrder": 552,
    "icon": {
      "alt": "Archenemy: Nicol Bolas Schemes set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/e01.svg?1780891200",
      "localPath": "/mtg-symbols/0552-oe01-archenemy-nicol-bolas-schemes.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oe01"
  },
  {
    "id": "fd4d8463-0156-4c60-a40e-778762bb90e4",
    "name": "Commander Anthology",
    "year": 2017,
    "releasedAt": "2017-06-09",
    "code": "CMA",
    "setType": "Commander",
    "cardCount": 320,
    "releaseOrder": 553,
    "icon": {
      "alt": "Commander Anthology set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cma.svg?1780891200",
      "localPath": "/mtg-symbols/0553-cma-commander-anthology.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cma"
  },
  {
    "id": "87645e3f-e06e-4cda-9f2c-5ea9232674bc",
    "name": "Commander Anthology Tokens",
    "year": 2017,
    "releasedAt": "2017-06-09",
    "code": "TCMA",
    "setType": "Token",
    "cardCount": 20,
    "releaseOrder": 554,
    "icon": {
      "alt": "Commander Anthology Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cma.svg?1780891200",
      "localPath": "/mtg-symbols/0554-tcma-commander-anthology-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tcma"
  },
  {
    "id": "02d1c536-68bc-4208-9b65-7741ef1f9da8",
    "name": "Amonkhet",
    "year": 2017,
    "releasedAt": "2017-04-28",
    "code": "AKH",
    "setType": "Expansion",
    "cardCount": 287,
    "releaseOrder": 555,
    "icon": {
      "alt": "Amonkhet set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/akh.svg?1780891200",
      "localPath": "/mtg-symbols/0555-akh-amonkhet.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/akh"
  },
  {
    "id": "c26402e7-838e-48db-a4b2-7abfc305998a",
    "name": "Amonkhet Invocations",
    "year": 2017,
    "releasedAt": "2017-04-28",
    "code": "MP2",
    "setType": "Masterpiece",
    "cardCount": 54,
    "releaseOrder": 556,
    "icon": {
      "alt": "Amonkhet Invocations set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mp2.svg?1780891200",
      "localPath": "/mtg-symbols/0556-mp2-amonkhet-invocations.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mp2"
  },
  {
    "id": "c1847ece-b71e-4125-973a-465dfb35e496",
    "name": "Amonkhet Promos",
    "year": 2017,
    "releasedAt": "2017-04-28",
    "code": "PAKH",
    "setType": "Promo",
    "cardCount": 77,
    "releaseOrder": 557,
    "icon": {
      "alt": "Amonkhet Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/akh.svg?1780891200",
      "localPath": "/mtg-symbols/0557-pakh-amonkhet-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pakh"
  },
  {
    "id": "739edf06-0069-4a07-8995-18ff67083e8e",
    "name": "Amonkhet Tokens",
    "year": 2017,
    "releasedAt": "2017-04-28",
    "code": "TAKH",
    "setType": "Token",
    "cardCount": 26,
    "releaseOrder": 558,
    "icon": {
      "alt": "Amonkhet Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/akh.svg?1780891200",
      "localPath": "/mtg-symbols/0558-takh-amonkhet-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/takh"
  },
  {
    "id": "2027da7f-c82a-4080-af34-4b9edf7c5132",
    "name": "Welcome Deck 2017",
    "year": 2017,
    "releasedAt": "2017-04-15",
    "code": "W17",
    "setType": "Starter",
    "cardCount": 30,
    "releaseOrder": 559,
    "icon": {
      "alt": "Welcome Deck 2017 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/w17.svg?1780891200",
      "localPath": "/mtg-symbols/0559-w17-welcome-deck-2017.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/w17"
  },
  {
    "id": "758fe4d1-ce2b-4106-8cec-820841d730af",
    "name": "Duel Decks: Mind vs. Might",
    "year": 2017,
    "releasedAt": "2017-03-31",
    "code": "DDS",
    "setType": "Duel Deck",
    "cardCount": 65,
    "releaseOrder": 560,
    "icon": {
      "alt": "Duel Decks: Mind vs. Might set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dds.svg?1780891200",
      "localPath": "/mtg-symbols/0560-dds-duel-decks-mind-vs-might.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dds"
  },
  {
    "id": "873340b9-7204-4f92-9638-c85419be0a80",
    "name": "Duel Decks: Mind vs. Might Tokens",
    "year": 2017,
    "releasedAt": "2017-03-31",
    "code": "TDDS",
    "setType": "Token",
    "cardCount": 7,
    "releaseOrder": 561,
    "icon": {
      "alt": "Duel Decks: Mind vs. Might Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dds.svg?1780891200",
      "localPath": "/mtg-symbols/0561-tdds-duel-decks-mind-vs-might-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdds"
  },
  {
    "id": "02624962-f727-4c31-bbf2-a94fa6c5b653",
    "name": "Modern Masters 2017",
    "year": 2017,
    "releasedAt": "2017-03-17",
    "code": "MM3",
    "setType": "Masters",
    "cardCount": 249,
    "releaseOrder": 562,
    "icon": {
      "alt": "Modern Masters 2017 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mm3.svg?1780891200",
      "localPath": "/mtg-symbols/0562-mm3-modern-masters-2017.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mm3"
  },
  {
    "id": "6ea10568-e3e6-4a54-9ba5-cabfc2715eeb",
    "name": "Modern Masters 2017 Tokens",
    "year": 2017,
    "releasedAt": "2017-03-17",
    "code": "TMM3",
    "setType": "Token",
    "cardCount": 21,
    "releaseOrder": 563,
    "icon": {
      "alt": "Modern Masters 2017 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mm3.svg?1780891200",
      "localPath": "/mtg-symbols/0563-tmm3-modern-masters-2017-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmm3"
  },
  {
    "id": "a4a0db50-8826-4e73-833c-3fd934375f96",
    "name": "Aether Revolt",
    "year": 2017,
    "releasedAt": "2017-01-20",
    "code": "AER",
    "setType": "Expansion",
    "cardCount": 197,
    "releaseOrder": 564,
    "icon": {
      "alt": "Aether Revolt set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/aer.svg?1780891200",
      "localPath": "/mtg-symbols/0564-aer-aether-revolt.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/aer"
  },
  {
    "id": "2acdb824-7cac-4858-a77e-ac868eed5270",
    "name": "Aether Revolt Promos",
    "year": 2017,
    "releasedAt": "2017-01-20",
    "code": "PAER",
    "setType": "Promo",
    "cardCount": 65,
    "releaseOrder": 565,
    "icon": {
      "alt": "Aether Revolt Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/aer.svg?1780891200",
      "localPath": "/mtg-symbols/0565-paer-aether-revolt-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/paer"
  },
  {
    "id": "540e9f76-9408-49bb-910f-ab9c5baea23f",
    "name": "Aether Revolt Tokens",
    "year": 2017,
    "releasedAt": "2017-01-20",
    "code": "TAER",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 566,
    "icon": {
      "alt": "Aether Revolt Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/aer.svg?1780891200",
      "localPath": "/mtg-symbols/0566-taer-aether-revolt-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/taer"
  },
  {
    "id": "690dae5c-2de4-4071-b77c-19883791f987",
    "name": "Friday Night Magic 2017",
    "year": 2017,
    "releasedAt": "2017-01-01",
    "code": "F17",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 567,
    "icon": {
      "alt": "Friday Night Magic 2017 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0567-f17-friday-night-magic-2017.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f17"
  },
  {
    "id": "6c69afe8-bb1e-466f-a46a-4a3e92351b25",
    "name": "Judge Gift Cards 2017",
    "year": 2017,
    "releasedAt": "2017-01-01",
    "code": "J17",
    "setType": "Promo",
    "cardCount": 9,
    "releaseOrder": 568,
    "icon": {
      "alt": "Judge Gift Cards 2017 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0568-j17-judge-gift-cards-2017.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j17"
  },
  {
    "id": "c6c6c33c-9047-4cc7-8eca-64ddc733c78a",
    "name": "League Tokens 2017",
    "year": 2017,
    "releasedAt": "2017-01-01",
    "code": "L17",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 569,
    "icon": {
      "alt": "League Tokens 2017 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0569-l17-league-tokens-2017.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/l17"
  },
  {
    "id": "ada3345c-d416-49bc-92e0-73363ddee5c8",
    "name": "Planechase Anthology Planes",
    "year": 2016,
    "releasedAt": "2016-11-25",
    "code": "OPCA",
    "setType": "Planechase",
    "cardCount": 86,
    "releaseOrder": 570,
    "icon": {
      "alt": "Planechase Anthology Planes set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pca.svg?1780891200",
      "localPath": "/mtg-symbols/0570-opca-planechase-anthology-planes.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/opca"
  },
  {
    "id": "ceadd605-dfba-4998-b96d-e8e8138aa20f",
    "name": "Planechase Anthology",
    "year": 2016,
    "releasedAt": "2016-11-25",
    "code": "PCA",
    "setType": "Planechase",
    "cardCount": 156,
    "releaseOrder": 571,
    "icon": {
      "alt": "Planechase Anthology set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pca.svg?1780891200",
      "localPath": "/mtg-symbols/0571-pca-planechase-anthology.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pca"
  },
  {
    "id": "b2578381-a42d-4fa5-b9ab-9265f4cca101",
    "name": "Planechase Anthology Tokens",
    "year": 2016,
    "releasedAt": "2016-11-25",
    "code": "TPCA",
    "setType": "Token",
    "cardCount": 19,
    "releaseOrder": 572,
    "icon": {
      "alt": "Planechase Anthology Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pca.svg?1780891200",
      "localPath": "/mtg-symbols/0572-tpca-planechase-anthology-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tpca"
  },
  {
    "id": "2661b143-8eac-4c73-9d93-549fe928bd96",
    "name": "Treasure Chest",
    "year": 2016,
    "releasedAt": "2016-11-16",
    "code": "PZ2",
    "setType": "Treasure Chest",
    "cardCount": 282,
    "releaseOrder": 573,
    "icon": {
      "alt": "Treasure Chest set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pz2.svg?1780891200",
      "localPath": "/mtg-symbols/0573-pz2-treasure-chest.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pz2"
  },
  {
    "id": "3e0d713a-b5cb-4287-81b9-a57d4dcaf415",
    "name": "Commander 2016",
    "year": 2016,
    "releasedAt": "2016-11-11",
    "code": "C16",
    "setType": "Commander",
    "cardCount": 351,
    "releaseOrder": 574,
    "icon": {
      "alt": "Commander 2016 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c16.svg?1780891200",
      "localPath": "/mtg-symbols/0574-c16-commander-2016.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/c16"
  },
  {
    "id": "caa8f8c4-d0bf-4848-9c66-e2fcabd1585c",
    "name": "Commander 2016 Oversized",
    "year": 2016,
    "releasedAt": "2016-11-11",
    "code": "OC16",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 575,
    "icon": {
      "alt": "Commander 2016 Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c16.svg?1780891200",
      "localPath": "/mtg-symbols/0575-oc16-commander-2016-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oc16"
  },
  {
    "id": "b8c05f6f-ae4b-436b-a475-09e768ca6a2e",
    "name": "Commander 2016 Tokens",
    "year": 2016,
    "releasedAt": "2016-11-11",
    "code": "TC16",
    "setType": "Token",
    "cardCount": 21,
    "releaseOrder": 576,
    "icon": {
      "alt": "Commander 2016 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c16.svg?1780891200",
      "localPath": "/mtg-symbols/0576-tc16-commander-2016-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tc16"
  },
  {
    "id": "b522ae3f-4980-4685-9702-b3360e05ed61",
    "name": "San Diego Comic-Con 2016",
    "year": 2016,
    "releasedAt": "2016-10-01",
    "code": "PS16",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 577,
    "icon": {
      "alt": "San Diego Comic-Con 2016 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0577-ps16-san-diego-comic-con-2016.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ps16"
  },
  {
    "id": "d667e468-be8f-411f-a030-473d148deb74",
    "name": "Kaladesh",
    "year": 2016,
    "releasedAt": "2016-09-30",
    "code": "KLD",
    "setType": "Expansion",
    "cardCount": 278,
    "releaseOrder": 578,
    "icon": {
      "alt": "Kaladesh set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/kld.svg?1780891200",
      "localPath": "/mtg-symbols/0578-kld-kaladesh.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/kld"
  },
  {
    "id": "910ea2a2-9f6a-4665-98f6-165ea7928952",
    "name": "Kaladesh Inventions",
    "year": 2016,
    "releasedAt": "2016-09-30",
    "code": "MPS",
    "setType": "Masterpiece",
    "cardCount": 54,
    "releaseOrder": 579,
    "icon": {
      "alt": "Kaladesh Inventions set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mps.svg?1780891200",
      "localPath": "/mtg-symbols/0579-mps-kaladesh-inventions.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mps"
  },
  {
    "id": "a3531980-f20d-4857-9de0-1b6826ef68e9",
    "name": "Kaladesh Promos",
    "year": 2016,
    "releasedAt": "2016-09-30",
    "code": "PKLD",
    "setType": "Promo",
    "cardCount": 83,
    "releaseOrder": 580,
    "icon": {
      "alt": "Kaladesh Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/kld.svg?1780891200",
      "localPath": "/mtg-symbols/0580-pkld-kaladesh-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pkld"
  },
  {
    "id": "8980a939-9003-46ee-bd9a-a6bdefd18e26",
    "name": "Kaladesh Tokens",
    "year": 2016,
    "releasedAt": "2016-09-30",
    "code": "TKLD",
    "setType": "Token",
    "cardCount": 13,
    "releaseOrder": 581,
    "icon": {
      "alt": "Kaladesh Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/kld.svg?1780891200",
      "localPath": "/mtg-symbols/0581-tkld-kaladesh-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tkld"
  },
  {
    "id": "20e10d8d-c2b0-4d3f-942d-28ae9e137c6e",
    "name": "Duel Decks: Nissa vs. Ob Nixilis",
    "year": 2016,
    "releasedAt": "2016-09-02",
    "code": "DDR",
    "setType": "Duel Deck",
    "cardCount": 76,
    "releaseOrder": 582,
    "icon": {
      "alt": "Duel Decks: Nissa vs. Ob Nixilis set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddr.svg?1780891200",
      "localPath": "/mtg-symbols/0582-ddr-duel-decks-nissa-vs-ob-nixilis.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddr"
  },
  {
    "id": "ad1b8847-1905-4080-9e26-80691ea7c1ef",
    "name": "Conspiracy: Take the Crown",
    "year": 2016,
    "releasedAt": "2016-08-26",
    "code": "CN2",
    "setType": "Draft Innovation",
    "cardCount": 222,
    "releaseOrder": 583,
    "icon": {
      "alt": "Conspiracy: Take the Crown set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cn2.svg?1780891200",
      "localPath": "/mtg-symbols/0583-cn2-conspiracy-take-the-crown.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cn2"
  },
  {
    "id": "05253e32-2e5b-41e3-8be4-c55cd31fe5fd",
    "name": "Conspiracy: Take the Crown Tokens",
    "year": 2016,
    "releasedAt": "2016-08-26",
    "code": "TCN2",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 584,
    "icon": {
      "alt": "Conspiracy: Take the Crown Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cn2.svg?1780891200",
      "localPath": "/mtg-symbols/0584-tcn2-conspiracy-take-the-crown-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tcn2"
  },
  {
    "id": "599b33cd-678b-4149-9e68-2a59da7d7f81",
    "name": "From the Vault: Lore",
    "year": 2016,
    "releasedAt": "2016-08-19",
    "code": "V16",
    "setType": "From The Vault",
    "cardCount": 16,
    "releaseOrder": 585,
    "icon": {
      "alt": "From the Vault: Lore set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/v16.svg?1780891200",
      "localPath": "/mtg-symbols/0585-v16-from-the-vault-lore.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/v16"
  },
  {
    "id": "5f0e4093-334f-4439-bbb5-a0affafd0ffc",
    "name": "Eldritch Moon",
    "year": 2016,
    "releasedAt": "2016-07-22",
    "code": "EMN",
    "setType": "Expansion",
    "cardCount": 208,
    "releaseOrder": 586,
    "icon": {
      "alt": "Eldritch Moon set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/emn.svg?1780891200",
      "localPath": "/mtg-symbols/0586-emn-eldritch-moon.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/emn"
  },
  {
    "id": "a173a21c-7d0f-4bdd-97df-72ce0b661d62",
    "name": "Eldritch Moon Promos",
    "year": 2016,
    "releasedAt": "2016-07-22",
    "code": "PEMN",
    "setType": "Promo",
    "cardCount": 77,
    "releaseOrder": 587,
    "icon": {
      "alt": "Eldritch Moon Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/emn.svg?1780891200",
      "localPath": "/mtg-symbols/0587-pemn-eldritch-moon-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pemn"
  },
  {
    "id": "eaa440dd-b2b5-4228-b7da-9071818497a2",
    "name": "Eldritch Moon Tokens",
    "year": 2016,
    "releasedAt": "2016-07-22",
    "code": "TEMN",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 588,
    "icon": {
      "alt": "Eldritch Moon Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/emn.svg?1780891200",
      "localPath": "/mtg-symbols/0588-temn-eldritch-moon-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/temn"
  },
  {
    "id": "1f29f022-3ace-4c96-85e8-1f7b63aadf7e",
    "name": "Eternal Masters",
    "year": 2016,
    "releasedAt": "2016-06-10",
    "code": "EMA",
    "setType": "Masters",
    "cardCount": 249,
    "releaseOrder": 589,
    "icon": {
      "alt": "Eternal Masters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ema.svg?1780891200",
      "localPath": "/mtg-symbols/0589-ema-eternal-masters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ema"
  },
  {
    "id": "f3d04563-054b-45b3-aec4-9ccc9acaf15d",
    "name": "Eternal Masters Tokens",
    "year": 2016,
    "releasedAt": "2016-06-10",
    "code": "TEMA",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 590,
    "icon": {
      "alt": "Eternal Masters Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ema.svg?1780891200",
      "localPath": "/mtg-symbols/0590-tema-eternal-masters-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tema"
  },
  {
    "id": "e1068688-13ff-4a3f-8c66-439162505e7a",
    "name": "Shadows over Innistrad Promos",
    "year": 2016,
    "releasedAt": "2016-04-08",
    "code": "PSOI",
    "setType": "Promo",
    "cardCount": 90,
    "releaseOrder": 591,
    "icon": {
      "alt": "Shadows over Innistrad Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/soi.svg?1780891200",
      "localPath": "/mtg-symbols/0591-psoi-shadows-over-innistrad-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psoi"
  },
  {
    "id": "5e914d7e-c1e9-446c-a33d-d093c02b2743",
    "name": "Shadows over Innistrad",
    "year": 2016,
    "releasedAt": "2016-04-08",
    "code": "SOI",
    "setType": "Expansion",
    "cardCount": 302,
    "releaseOrder": 592,
    "icon": {
      "alt": "Shadows over Innistrad set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/soi.svg?1780891200",
      "localPath": "/mtg-symbols/0592-soi-shadows-over-innistrad.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/soi"
  },
  {
    "id": "114885aa-26f2-45a5-822f-376ae5374d63",
    "name": "Shadows over Innistrad Tokens",
    "year": 2016,
    "releasedAt": "2016-04-08",
    "code": "TSOI",
    "setType": "Token",
    "cardCount": 20,
    "releaseOrder": 593,
    "icon": {
      "alt": "Shadows over Innistrad Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/soi.svg?1780891200",
      "localPath": "/mtg-symbols/0593-tsoi-shadows-over-innistrad-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tsoi"
  },
  {
    "id": "b3a0e4a1-5f2c-44e1-8558-61e6dcd88fda",
    "name": "Welcome Deck 2016",
    "year": 2016,
    "releasedAt": "2016-04-08",
    "code": "W16",
    "setType": "Starter",
    "cardCount": 16,
    "releaseOrder": 594,
    "icon": {
      "alt": "Welcome Deck 2016 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/w16.svg?1780891200",
      "localPath": "/mtg-symbols/0594-w16-welcome-deck-2016.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/w16"
  },
  {
    "id": "9f6e1af2-3913-47d6-aa6a-81f34ec7224c",
    "name": "Duel Decks: Blessed vs. Cursed",
    "year": 2016,
    "releasedAt": "2016-02-26",
    "code": "DDQ",
    "setType": "Duel Deck",
    "cardCount": 80,
    "releaseOrder": 595,
    "icon": {
      "alt": "Duel Decks: Blessed vs. Cursed set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddq.svg?1780891200",
      "localPath": "/mtg-symbols/0595-ddq-duel-decks-blessed-vs-cursed.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddq"
  },
  {
    "id": "cd51d245-8f95-45b0-ab5f-e2b3a3eb5dfe",
    "name": "Oath of the Gatewatch",
    "year": 2016,
    "releasedAt": "2016-01-22",
    "code": "OGW",
    "setType": "Expansion",
    "cardCount": 187,
    "releaseOrder": 596,
    "icon": {
      "alt": "Oath of the Gatewatch set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ogw.svg?1780891200",
      "localPath": "/mtg-symbols/0596-ogw-oath-of-the-gatewatch.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ogw"
  },
  {
    "id": "7de0b874-7cb5-495b-9b2c-137a92d3d493",
    "name": "Oath of the Gatewatch Promos",
    "year": 2016,
    "releasedAt": "2016-01-22",
    "code": "POGW",
    "setType": "Promo",
    "cardCount": 65,
    "releaseOrder": 597,
    "icon": {
      "alt": "Oath of the Gatewatch Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ogw.svg?1780891200",
      "localPath": "/mtg-symbols/0597-pogw-oath-of-the-gatewatch-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pogw"
  },
  {
    "id": "0898d3dd-a7dd-4d65-bddc-3a0e32a1dfd0",
    "name": "Oath of the Gatewatch Tokens",
    "year": 2016,
    "releasedAt": "2016-01-22",
    "code": "TOGW",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 598,
    "icon": {
      "alt": "Oath of the Gatewatch Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ogw.svg?1780891200",
      "localPath": "/mtg-symbols/0598-togw-oath-of-the-gatewatch-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/togw"
  },
  {
    "id": "820ba719-0234-4ca7-9d72-e0f8d56460bb",
    "name": "Friday Night Magic 2016",
    "year": 2016,
    "releasedAt": "2016-01-01",
    "code": "F16",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 599,
    "icon": {
      "alt": "Friday Night Magic 2016 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0599-f16-friday-night-magic-2016.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f16"
  },
  {
    "id": "a3490e7b-791b-4ed3-bd0c-6fb19b819150",
    "name": "Judge Gift Cards 2016",
    "year": 2016,
    "releasedAt": "2016-01-01",
    "code": "J16",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 600,
    "icon": {
      "alt": "Judge Gift Cards 2016 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0600-j16-judge-gift-cards-2016.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j16"
  },
  {
    "id": "8e4b1749-a534-4b6c-b8b5-ec5ab49e276d",
    "name": "League Tokens 2016",
    "year": 2016,
    "releasedAt": "2016-01-01",
    "code": "L16",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 601,
    "icon": {
      "alt": "League Tokens 2016 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0601-l16-league-tokens-2016.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/l16"
  },
  {
    "id": "e1f3015e-fd53-4c01-aace-78f4372e63fb",
    "name": "Legendary Cube Prize Pack",
    "year": 2015,
    "releasedAt": "2015-11-18",
    "code": "PZ1",
    "setType": "Treasure Chest",
    "cardCount": 149,
    "releaseOrder": 602,
    "icon": {
      "alt": "Legendary Cube Prize Pack set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pz1.svg?1780891200",
      "localPath": "/mtg-symbols/0602-pz1-legendary-cube-prize-pack.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pz1"
  },
  {
    "id": "ea6c99f9-5489-4504-b30c-c819fa3b1fd3",
    "name": "Commander 2015",
    "year": 2015,
    "releasedAt": "2015-11-13",
    "code": "C15",
    "setType": "Commander",
    "cardCount": 342,
    "releaseOrder": 603,
    "icon": {
      "alt": "Commander 2015 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c15.svg?1780891200",
      "localPath": "/mtg-symbols/0603-c15-commander-2015.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/c15"
  },
  {
    "id": "7198001d-6617-485e-aa5d-41be3a7cd77c",
    "name": "Commander 2015 Oversized",
    "year": 2015,
    "releasedAt": "2015-11-13",
    "code": "OC15",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 604,
    "icon": {
      "alt": "Commander 2015 Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c15.svg?1780891200",
      "localPath": "/mtg-symbols/0604-oc15-commander-2015-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oc15"
  },
  {
    "id": "75af5bab-521e-47f4-b3b6-655ebddf5cb2",
    "name": "Commander 2015 Tokens",
    "year": 2015,
    "releasedAt": "2015-11-13",
    "code": "TC15",
    "setType": "Token",
    "cardCount": 25,
    "releaseOrder": 605,
    "icon": {
      "alt": "Commander 2015 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c15.svg?1780891200",
      "localPath": "/mtg-symbols/0605-tc15-commander-2015-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tc15"
  },
  {
    "id": "91719374-7ac5-4afa-ada8-5da964dcf1d4",
    "name": "Battle for Zendikar",
    "year": 2015,
    "releasedAt": "2015-10-02",
    "code": "BFZ",
    "setType": "Expansion",
    "cardCount": 299,
    "releaseOrder": 606,
    "icon": {
      "alt": "Battle for Zendikar set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bfz.svg?1780891200",
      "localPath": "/mtg-symbols/0606-bfz-battle-for-zendikar.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/bfz"
  },
  {
    "id": "f6ccda04-e8ef-4260-8453-9408d788bacf",
    "name": "Zendikar Expeditions",
    "year": 2015,
    "releasedAt": "2015-10-02",
    "code": "EXP",
    "setType": "Masterpiece",
    "cardCount": 45,
    "releaseOrder": 607,
    "icon": {
      "alt": "Zendikar Expeditions set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/exp.svg?1780891200",
      "localPath": "/mtg-symbols/0607-exp-zendikar-expeditions.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/exp"
  },
  {
    "id": "1b5e95bd-4947-4991-8d7d-b770d6b2aaff",
    "name": "Battle for Zendikar Promos",
    "year": 2015,
    "releasedAt": "2015-10-02",
    "code": "PBFZ",
    "setType": "Promo",
    "cardCount": 90,
    "releaseOrder": 608,
    "icon": {
      "alt": "Battle for Zendikar Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bfz.svg?1780891200",
      "localPath": "/mtg-symbols/0608-pbfz-battle-for-zendikar-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pbfz"
  },
  {
    "id": "9a2e709a-04ee-4d4d-b41e-0642822855b3",
    "name": "BFZ Standard Series",
    "year": 2015,
    "releasedAt": "2015-10-02",
    "code": "PSS1",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 609,
    "icon": {
      "alt": "BFZ Standard Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bfz.svg?1780891200",
      "localPath": "/mtg-symbols/0609-pss1-bfz-standard-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pss1"
  },
  {
    "id": "b0b5bce3-fe9f-49ca-848d-dc6e2d39c810",
    "name": "Battle for Zendikar Tokens",
    "year": 2015,
    "releasedAt": "2015-10-02",
    "code": "TBFZ",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 610,
    "icon": {
      "alt": "Battle for Zendikar Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bfz.svg?1780891200",
      "localPath": "/mtg-symbols/0610-tbfz-battle-for-zendikar-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tbfz"
  },
  {
    "id": "0dbc7609-b12c-471a-bfd3-c57bc670c445",
    "name": "Duel Decks: Zendikar vs. Eldrazi",
    "year": 2015,
    "releasedAt": "2015-08-28",
    "code": "DDP",
    "setType": "Duel Deck",
    "cardCount": 80,
    "releaseOrder": 611,
    "icon": {
      "alt": "Duel Decks: Zendikar vs. Eldrazi set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddp.svg?1780891200",
      "localPath": "/mtg-symbols/0611-ddp-duel-decks-zendikar-vs-eldrazi.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddp"
  },
  {
    "id": "bd5cb4e5-8090-4bd9-bcd4-89741056689b",
    "name": "From the Vault: Angels",
    "year": 2015,
    "releasedAt": "2015-08-21",
    "code": "V15",
    "setType": "From The Vault",
    "cardCount": 15,
    "releaseOrder": 612,
    "icon": {
      "alt": "From the Vault: Angels set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/v15.svg?1780891200",
      "localPath": "/mtg-symbols/0612-v15-from-the-vault-angels.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/v15"
  },
  {
    "id": "e6177218-1e8b-488e-8a4c-ef3af130b600",
    "name": "Magic Origins Clash Pack",
    "year": 2015,
    "releasedAt": "2015-07-17",
    "code": "CP3",
    "setType": "Starter",
    "cardCount": 6,
    "releaseOrder": 613,
    "icon": {
      "alt": "Magic Origins Clash Pack set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0613-cp3-magic-origins-clash-pack.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cp3"
  },
  {
    "id": "0eeb9a9a-20ac-404d-b55f-aeb7a43a7f62",
    "name": "Magic Origins",
    "year": 2015,
    "releasedAt": "2015-07-17",
    "code": "ORI",
    "setType": "Core",
    "cardCount": 288,
    "releaseOrder": 614,
    "icon": {
      "alt": "Magic Origins set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ori.svg?1780891200",
      "localPath": "/mtg-symbols/0614-ori-magic-origins.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ori"
  },
  {
    "id": "f021d220-d395-41fc-8366-5a05db1a0bdf",
    "name": "Magic Origins Promos",
    "year": 2015,
    "releasedAt": "2015-07-17",
    "code": "PORI",
    "setType": "Promo",
    "cardCount": 54,
    "releaseOrder": 615,
    "icon": {
      "alt": "Magic Origins Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ori.svg?1780891200",
      "localPath": "/mtg-symbols/0615-pori-magic-origins-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pori"
  },
  {
    "id": "cfc3f929-420a-4236-8d06-8e227cfb6933",
    "name": "Magic Origins Tokens",
    "year": 2015,
    "releasedAt": "2015-07-17",
    "code": "TORI",
    "setType": "Token",
    "cardCount": 15,
    "releaseOrder": 616,
    "icon": {
      "alt": "Magic Origins Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ori.svg?1780891200",
      "localPath": "/mtg-symbols/0616-tori-magic-origins-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tori"
  },
  {
    "id": "a7525618-105f-4f97-98c9-0ed1522d4a8d",
    "name": "San Diego Comic-Con 2015",
    "year": 2015,
    "releasedAt": "2015-07-09",
    "code": "PS15",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 617,
    "icon": {
      "alt": "San Diego Comic-Con 2015 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ori.svg?1780891200",
      "localPath": "/mtg-symbols/0617-ps15-san-diego-comic-con-2015.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ps15"
  },
  {
    "id": "28cac015-43df-4e88-90d0-95dcdd894834",
    "name": "Modern Masters 2015",
    "year": 2015,
    "releasedAt": "2015-05-22",
    "code": "MM2",
    "setType": "Masters",
    "cardCount": 249,
    "releaseOrder": 618,
    "icon": {
      "alt": "Modern Masters 2015 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mm2.svg?1780891200",
      "localPath": "/mtg-symbols/0618-mm2-modern-masters-2015.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mm2"
  },
  {
    "id": "f7aa47c6-c1e2-4de5-9a68-4406d84bd6bb",
    "name": "Modern Masters 2015 Tokens",
    "year": 2015,
    "releasedAt": "2015-05-22",
    "code": "TMM2",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 619,
    "icon": {
      "alt": "Modern Masters 2015 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mm2.svg?1780891200",
      "localPath": "/mtg-symbols/0619-tmm2-modern-masters-2015-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmm2"
  },
  {
    "id": "41b3e002-ab58-46a0-8024-056ee843e267",
    "name": "Tempest Remastered",
    "year": 2015,
    "releasedAt": "2015-05-06",
    "code": "TPR",
    "setType": "Masters",
    "cardCount": 269,
    "releaseOrder": 620,
    "icon": {
      "alt": "Tempest Remastered set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tpr.svg?1780891200",
      "localPath": "/mtg-symbols/0620-tpr-tempest-remastered.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tpr"
  },
  {
    "id": "6f68a621-24b7-4371-a25c-9fff3ed68b8f",
    "name": "Tarkir Dragonfury",
    "year": 2015,
    "releasedAt": "2015-04-03",
    "code": "PTKDF",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 621,
    "icon": {
      "alt": "Tarkir Dragonfury set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dtk.svg?1780891200",
      "localPath": "/mtg-symbols/0621-ptkdf-tarkir-dragonfury.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptkdf"
  },
  {
    "id": "7e72625f-f320-4552-a719-d11e2f1853bd",
    "name": "Dragons of Tarkir",
    "year": 2015,
    "releasedAt": "2015-03-27",
    "code": "DTK",
    "setType": "Expansion",
    "cardCount": 264,
    "releaseOrder": 622,
    "icon": {
      "alt": "Dragons of Tarkir set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dtk.svg?1780891200",
      "localPath": "/mtg-symbols/0622-dtk-dragons-of-tarkir.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dtk"
  },
  {
    "id": "7f424509-214f-4d0e-91ab-18a99e83afef",
    "name": "Dragons of Tarkir Promos",
    "year": 2015,
    "releasedAt": "2015-03-27",
    "code": "PDTK",
    "setType": "Promo",
    "cardCount": 51,
    "releaseOrder": 623,
    "icon": {
      "alt": "Dragons of Tarkir Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dtk.svg?1780891200",
      "localPath": "/mtg-symbols/0623-pdtk-dragons-of-tarkir-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdtk"
  },
  {
    "id": "e9bd9e1e-754a-4d8f-a1d1-b9b6f18474c5",
    "name": "Dragons of Tarkir Tokens",
    "year": 2015,
    "releasedAt": "2015-03-27",
    "code": "TDTK",
    "setType": "Token",
    "cardCount": 8,
    "releaseOrder": 624,
    "icon": {
      "alt": "Dragons of Tarkir Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dtk.svg?1780891200",
      "localPath": "/mtg-symbols/0624-tdtk-dragons-of-tarkir-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdtk"
  },
  {
    "id": "6b350326-34f3-43c6-8df5-2b1d9a61ceff",
    "name": "Duel Decks: Elspeth vs. Kiora",
    "year": 2015,
    "releasedAt": "2015-02-27",
    "code": "DDO",
    "setType": "Duel Deck",
    "cardCount": 67,
    "releaseOrder": 625,
    "icon": {
      "alt": "Duel Decks: Elspeth vs. Kiora set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddo.svg?1780891200",
      "localPath": "/mtg-symbols/0625-ddo-duel-decks-elspeth-vs-kiora.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddo"
  },
  {
    "id": "a1bcdc11-74b2-4c86-880f-ae193857ae54",
    "name": "Fate Reforged Clash Pack",
    "year": 2015,
    "releasedAt": "2015-01-23",
    "code": "CP2",
    "setType": "Starter",
    "cardCount": 6,
    "releaseOrder": 626,
    "icon": {
      "alt": "Fate Reforged Clash Pack set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0626-cp2-fate-reforged-clash-pack.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cp2"
  },
  {
    "id": "7bb5cb2b-081a-4c8c-b7e1-494046e6baa1",
    "name": "Fate Reforged",
    "year": 2015,
    "releasedAt": "2015-01-23",
    "code": "FRF",
    "setType": "Expansion",
    "cardCount": 191,
    "releaseOrder": 627,
    "icon": {
      "alt": "Fate Reforged set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/frf.svg?1780891200",
      "localPath": "/mtg-symbols/0627-frf-fate-reforged.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/frf"
  },
  {
    "id": "aa9f80e3-8d60-46b7-b91e-eb1736fde866",
    "name": "Fate Reforged Promos",
    "year": 2015,
    "releasedAt": "2015-01-23",
    "code": "PFRF",
    "setType": "Promo",
    "cardCount": 43,
    "releaseOrder": 628,
    "icon": {
      "alt": "Fate Reforged Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/frf.svg?1780891200",
      "localPath": "/mtg-symbols/0628-pfrf-fate-reforged-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pfrf"
  },
  {
    "id": "bd0fb627-519a-4597-8977-74aa69ab31f5",
    "name": "Fate Reforged Tokens",
    "year": 2015,
    "releasedAt": "2015-01-23",
    "code": "TFRF",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 629,
    "icon": {
      "alt": "Fate Reforged Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/frf.svg?1780891200",
      "localPath": "/mtg-symbols/0629-tfrf-fate-reforged-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tfrf"
  },
  {
    "id": "fc7ea025-628e-45f4-9e0b-73681b1f68b7",
    "name": "Ugin's Fate",
    "year": 2015,
    "releasedAt": "2015-01-17",
    "code": "UGIN",
    "setType": "Promo",
    "cardCount": 26,
    "releaseOrder": 630,
    "icon": {
      "alt": "Ugin's Fate set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/frf.svg?1780891200",
      "localPath": "/mtg-symbols/0630-ugin-ugin-s-fate.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ugin"
  },
  {
    "id": "b34e3169-310e-4161-82c8-868b38b9cc91",
    "name": "Friday Night Magic 2015",
    "year": 2015,
    "releasedAt": "2015-01-01",
    "code": "F15",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 631,
    "icon": {
      "alt": "Friday Night Magic 2015 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0631-f15-friday-night-magic-2015.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f15"
  },
  {
    "id": "6f528eed-2bc2-4a27-bb27-937c211754b3",
    "name": "Judge Gift Cards 2015",
    "year": 2015,
    "releasedAt": "2015-01-01",
    "code": "J15",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 632,
    "icon": {
      "alt": "Judge Gift Cards 2015 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0632-j15-judge-gift-cards-2015.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j15"
  },
  {
    "id": "e0fbbc6d-5427-4648-8dd7-6df1d5f30476",
    "name": "League Tokens 2015",
    "year": 2015,
    "releasedAt": "2015-01-01",
    "code": "L15",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 633,
    "icon": {
      "alt": "League Tokens 2015 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0633-l15-league-tokens-2015.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/l15"
  },
  {
    "id": "02a67a0d-b4da-4ca9-be01-b0d78dc62ed0",
    "name": "Duel Decks Anthology: Divine vs. Demonic",
    "year": 2014,
    "releasedAt": "2014-12-05",
    "code": "DVD",
    "setType": "Duel Deck",
    "cardCount": 62,
    "releaseOrder": 634,
    "icon": {
      "alt": "Duel Decks Anthology: Divine vs. Demonic set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddc.svg?1780891200",
      "localPath": "/mtg-symbols/0634-dvd-duel-decks-anthology-divine-vs-demonic.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dvd"
  },
  {
    "id": "d5dbdea8-45f6-4d22-990b-6b6897f99d18",
    "name": "Duel Decks Anthology: Elves vs. Goblins",
    "year": 2014,
    "releasedAt": "2014-12-05",
    "code": "EVG",
    "setType": "Duel Deck",
    "cardCount": 62,
    "releaseOrder": 635,
    "icon": {
      "alt": "Duel Decks Anthology: Elves vs. Goblins set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dd1.svg?1780891200",
      "localPath": "/mtg-symbols/0635-evg-duel-decks-anthology-elves-vs-goblins.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/evg"
  },
  {
    "id": "db352daa-9827-44ca-ba19-511969a97689",
    "name": "Duel Decks Anthology: Garruk vs. Liliana",
    "year": 2014,
    "releasedAt": "2014-12-05",
    "code": "GVL",
    "setType": "Duel Deck",
    "cardCount": 63,
    "releaseOrder": 636,
    "icon": {
      "alt": "Duel Decks Anthology: Garruk vs. Liliana set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddd.svg?1780891200",
      "localPath": "/mtg-symbols/0636-gvl-duel-decks-anthology-garruk-vs-liliana.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gvl"
  },
  {
    "id": "37832684-2fe0-4b06-842b-eec06e5a17cb",
    "name": "Duel Decks Anthology: Jace vs. Chandra",
    "year": 2014,
    "releasedAt": "2014-12-05",
    "code": "JVC",
    "setType": "Duel Deck",
    "cardCount": 62,
    "releaseOrder": 637,
    "icon": {
      "alt": "Duel Decks Anthology: Jace vs. Chandra set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dd2.svg?1780891200",
      "localPath": "/mtg-symbols/0637-jvc-duel-decks-anthology-jace-vs-chandra.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/jvc"
  },
  {
    "id": "63fb2d9f-a193-4dac-b160-dd117b3e3053",
    "name": "Duel Decks Anthology: Divine vs. Demonic Tokens",
    "year": 2014,
    "releasedAt": "2014-12-05",
    "code": "TDVD",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 638,
    "icon": {
      "alt": "Duel Decks Anthology: Divine vs. Demonic Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddc.svg?1780891200",
      "localPath": "/mtg-symbols/0638-tdvd-duel-decks-anthology-divine-vs-demonic-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdvd"
  },
  {
    "id": "b9ffeaf1-b0d1-4fbc-a899-c41d37c7203e",
    "name": "Duel Decks Anthology: Elves vs. Goblins Tokens",
    "year": 2014,
    "releasedAt": "2014-12-05",
    "code": "TEVG",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 639,
    "icon": {
      "alt": "Duel Decks Anthology: Elves vs. Goblins Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dd1.svg?1780891200",
      "localPath": "/mtg-symbols/0639-tevg-duel-decks-anthology-elves-vs-goblins-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tevg"
  },
  {
    "id": "cc86f9d1-d866-432a-bb10-0ea81699ebed",
    "name": "Duel Decks Anthology: Garruk vs. Liliana Tokens",
    "year": 2014,
    "releasedAt": "2014-12-05",
    "code": "TGVL",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 640,
    "icon": {
      "alt": "Duel Decks Anthology: Garruk vs. Liliana Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddd.svg?1780891200",
      "localPath": "/mtg-symbols/0640-tgvl-duel-decks-anthology-garruk-vs-liliana-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tgvl"
  },
  {
    "id": "d183a05b-125e-48a5-b8cf-2dc69d9caec9",
    "name": "Duel Decks Anthology: Jace vs. Chandra Tokens",
    "year": 2014,
    "releasedAt": "2014-12-05",
    "code": "TJVC",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 641,
    "icon": {
      "alt": "Duel Decks Anthology: Jace vs. Chandra Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dd2.svg?1780891200",
      "localPath": "/mtg-symbols/0641-tjvc-duel-decks-anthology-jace-vs-chandra-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tjvc"
  },
  {
    "id": "0980a6e2-eb78-4ad2-8396-cef08fce365e",
    "name": "Commander 2014",
    "year": 2014,
    "releasedAt": "2014-11-07",
    "code": "C14",
    "setType": "Commander",
    "cardCount": 337,
    "releaseOrder": 642,
    "icon": {
      "alt": "Commander 2014 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c14.svg?1780891200",
      "localPath": "/mtg-symbols/0642-c14-commander-2014.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/c14"
  },
  {
    "id": "bee6ac71-9fbf-417a-a623-6393c984fdbb",
    "name": "Commander 2014 Oversized",
    "year": 2014,
    "releasedAt": "2014-11-07",
    "code": "OC14",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 643,
    "icon": {
      "alt": "Commander 2014 Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c14.svg?1780891200",
      "localPath": "/mtg-symbols/0643-oc14-commander-2014-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oc14"
  },
  {
    "id": "58172859-996d-49d0-9016-460714a8ae01",
    "name": "Commander 2014 Tokens",
    "year": 2014,
    "releasedAt": "2014-11-07",
    "code": "TC14",
    "setType": "Token",
    "cardCount": 36,
    "releaseOrder": 644,
    "icon": {
      "alt": "Commander 2014 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c14.svg?1780891200",
      "localPath": "/mtg-symbols/0644-tc14-commander-2014-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tc14"
  },
  {
    "id": "6c7a715c-ded9-449e-89b0-c665773e9c3c",
    "name": "Khans of Tarkir",
    "year": 2014,
    "releasedAt": "2014-09-26",
    "code": "KTK",
    "setType": "Expansion",
    "cardCount": 293,
    "releaseOrder": 645,
    "icon": {
      "alt": "Khans of Tarkir set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ktk.svg?1780891200",
      "localPath": "/mtg-symbols/0645-ktk-khans-of-tarkir.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ktk"
  },
  {
    "id": "95318a25-1983-40ae-b315-140160078e3c",
    "name": "Khans of Tarkir Promos",
    "year": 2014,
    "releasedAt": "2014-09-26",
    "code": "PKTK",
    "setType": "Promo",
    "cardCount": 56,
    "releaseOrder": 646,
    "icon": {
      "alt": "Khans of Tarkir Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ktk.svg?1780891200",
      "localPath": "/mtg-symbols/0646-pktk-khans-of-tarkir-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pktk"
  },
  {
    "id": "703ad254-4167-46a7-be4f-a0b86247a42b",
    "name": "Khans of Tarkir Tokens",
    "year": 2014,
    "releasedAt": "2014-09-26",
    "code": "TKTK",
    "setType": "Token",
    "cardCount": 13,
    "releaseOrder": 647,
    "icon": {
      "alt": "Khans of Tarkir Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ktk.svg?1780891200",
      "localPath": "/mtg-symbols/0647-tktk-khans-of-tarkir-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tktk"
  },
  {
    "id": "163844e5-077e-4e2c-a0f0-fa33fbc7bb3b",
    "name": "Duel Decks: Speed vs. Cunning",
    "year": 2014,
    "releasedAt": "2014-09-05",
    "code": "DDN",
    "setType": "Duel Deck",
    "cardCount": 82,
    "releaseOrder": 648,
    "icon": {
      "alt": "Duel Decks: Speed vs. Cunning set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddn.svg?1780891200",
      "localPath": "/mtg-symbols/0648-ddn-duel-decks-speed-vs-cunning.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddn"
  },
  {
    "id": "21dd7ae2-1196-46d4-9acf-4ff9d82797be",
    "name": "From the Vault: Annihilation",
    "year": 2014,
    "releasedAt": "2014-08-22",
    "code": "V14",
    "setType": "From The Vault",
    "cardCount": 15,
    "releaseOrder": 649,
    "icon": {
      "alt": "From the Vault: Annihilation set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/v14.svg?1780891200",
      "localPath": "/mtg-symbols/0649-v14-from-the-vault-annihilation.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/v14"
  },
  {
    "id": "b1736f4e-cb0d-468a-9b4f-b08fb147cc17",
    "name": "Magic 2015 Clash Pack",
    "year": 2014,
    "releasedAt": "2014-07-18",
    "code": "CP1",
    "setType": "Starter",
    "cardCount": 6,
    "releaseOrder": 650,
    "icon": {
      "alt": "Magic 2015 Clash Pack set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0650-cp1-magic-2015-clash-pack.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cp1"
  },
  {
    "id": "6ce49890-3b37-42a5-8932-dbeef1d7b62c",
    "name": "Magic 2015",
    "year": 2014,
    "releasedAt": "2014-07-18",
    "code": "M15",
    "setType": "Core",
    "cardCount": 284,
    "releaseOrder": 651,
    "icon": {
      "alt": "Magic 2015 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m15.svg?1780891200",
      "localPath": "/mtg-symbols/0651-m15-magic-2015.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m15"
  },
  {
    "id": "ae4f4088-26d4-479c-b615-1027c25bb577",
    "name": "Magic 2015 Tokens",
    "year": 2014,
    "releasedAt": "2014-07-18",
    "code": "TM15",
    "setType": "Token",
    "cardCount": 14,
    "releaseOrder": 652,
    "icon": {
      "alt": "Magic 2015 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m15.svg?1780891200",
      "localPath": "/mtg-symbols/0652-tm15-magic-2015-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm15"
  },
  {
    "id": "b263197c-a306-4795-937f-32fabc532d9e",
    "name": "Magic 2015 Promos",
    "year": 2014,
    "releasedAt": "2014-07-17",
    "code": "PM15",
    "setType": "Promo",
    "cardCount": 14,
    "releaseOrder": 653,
    "icon": {
      "alt": "Magic 2015 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m15.svg?1780891200",
      "localPath": "/mtg-symbols/0653-pm15-magic-2015-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pm15"
  },
  {
    "id": "6cf964e5-17d7-41d1-aaec-7c7a27b03160",
    "name": "M15 Prerelease Challenge",
    "year": 2014,
    "releasedAt": "2014-07-12",
    "code": "PPC1",
    "setType": "Memorabilia",
    "cardCount": 2,
    "releaseOrder": 654,
    "icon": {
      "alt": "M15 Prerelease Challenge set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m15.svg?1780891200",
      "localPath": "/mtg-symbols/0654-ppc1-m15-prerelease-challenge.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ppc1"
  },
  {
    "id": "771d02d5-d5b3-4ede-9913-efd08fc7e828",
    "name": "Duels of the Planeswalkers 2015 Promos",
    "year": 2014,
    "releasedAt": "2014-07-09",
    "code": "PDP15",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 655,
    "icon": {
      "alt": "Duels of the Planeswalkers 2015 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m15.svg?1780891200",
      "localPath": "/mtg-symbols/0655-pdp15-duels-of-the-planeswalkers-2015-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdp15"
  },
  {
    "id": "09d844de-a5ec-401c-9b0f-f99be569b8f9",
    "name": "San Diego Comic-Con 2014",
    "year": 2014,
    "releasedAt": "2014-07-08",
    "code": "PS14",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 656,
    "icon": {
      "alt": "San Diego Comic-Con 2014 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0656-ps14-san-diego-comic-con-2014.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ps14"
  },
  {
    "id": "a944551a-73fa-41cd-9159-e8d0e4674403",
    "name": "Vintage Masters",
    "year": 2014,
    "releasedAt": "2014-06-16",
    "code": "VMA",
    "setType": "Masters",
    "cardCount": 325,
    "releaseOrder": 657,
    "icon": {
      "alt": "Vintage Masters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/vma.svg?1780891200",
      "localPath": "/mtg-symbols/0657-vma-vintage-masters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/vma"
  },
  {
    "id": "7d4ebb59-a50b-45b8-8fff-ab70767819a5",
    "name": "Conspiracy",
    "year": 2014,
    "releasedAt": "2014-06-06",
    "code": "CNS",
    "setType": "Draft Innovation",
    "cardCount": 210,
    "releaseOrder": 658,
    "icon": {
      "alt": "Conspiracy set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cns.svg?1780891200",
      "localPath": "/mtg-symbols/0658-cns-conspiracy.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cns"
  },
  {
    "id": "f57afd70-7944-47d6-83fb-264d05442710",
    "name": "Conspiracy Promos",
    "year": 2014,
    "releasedAt": "2014-06-06",
    "code": "PCNS",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 659,
    "icon": {
      "alt": "Conspiracy Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cns.svg?1780891200",
      "localPath": "/mtg-symbols/0659-pcns-conspiracy-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pcns"
  },
  {
    "id": "48fa7ece-52b1-446b-9855-413ee4714185",
    "name": "Conspiracy Tokens",
    "year": 2014,
    "releasedAt": "2014-06-06",
    "code": "TCNS",
    "setType": "Token",
    "cardCount": 9,
    "releaseOrder": 660,
    "icon": {
      "alt": "Conspiracy Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cns.svg?1780891200",
      "localPath": "/mtg-symbols/0660-tcns-conspiracy-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tcns"
  },
  {
    "id": "3c31de17-6766-448e-a4eb-878d83031f3e",
    "name": "Modern Event Deck 2014",
    "year": 2014,
    "releasedAt": "2014-05-30",
    "code": "MD1",
    "setType": "Box",
    "cardCount": 26,
    "releaseOrder": 661,
    "icon": {
      "alt": "Modern Event Deck 2014 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/md1.svg?1780891200",
      "localPath": "/mtg-symbols/0661-md1-modern-event-deck-2014.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/md1"
  },
  {
    "id": "a6402e47-32d9-444d-bf16-8fc5af745241",
    "name": "Modern Event Deck 2014 Tokens",
    "year": 2014,
    "releasedAt": "2014-05-30",
    "code": "TMD1",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 662,
    "icon": {
      "alt": "Modern Event Deck 2014 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/md1.svg?1780891200",
      "localPath": "/mtg-symbols/0662-tmd1-modern-event-deck-2014-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmd1"
  },
  {
    "id": "a8487d2b-228c-4f6b-aebb-00cc06085ddb",
    "name": "Defeat a God",
    "year": 2014,
    "releasedAt": "2014-05-25",
    "code": "TDAG",
    "setType": "Memorabilia",
    "cardCount": 15,
    "releaseOrder": 663,
    "icon": {
      "alt": "Defeat a God set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jou.svg?1780891200",
      "localPath": "/mtg-symbols/0663-tdag-defeat-a-god.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdag"
  },
  {
    "id": "204d2dca-1887-4721-9558-164aa7bbeb4f",
    "name": "Journey into Nyx",
    "year": 2014,
    "releasedAt": "2014-05-02",
    "code": "JOU",
    "setType": "Expansion",
    "cardCount": 165,
    "releaseOrder": 664,
    "icon": {
      "alt": "Journey into Nyx set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jou.svg?1780891200",
      "localPath": "/mtg-symbols/0664-jou-journey-into-nyx.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/jou"
  },
  {
    "id": "6fae3972-2ed8-4203-95b7-7f1229a91468",
    "name": "Journey into Nyx Hero's Path",
    "year": 2014,
    "releasedAt": "2014-05-02",
    "code": "THP3",
    "setType": "Memorabilia",
    "cardCount": 8,
    "releaseOrder": 665,
    "icon": {
      "alt": "Journey into Nyx Hero's Path set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jou.svg?1780891200",
      "localPath": "/mtg-symbols/0665-thp3-journey-into-nyx-hero-s-path.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/thp3"
  },
  {
    "id": "6e8a17bb-5e09-475f-9832-4369ee84e1e4",
    "name": "Journey into Nyx Tokens",
    "year": 2014,
    "releasedAt": "2014-05-02",
    "code": "TJOU",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 666,
    "icon": {
      "alt": "Journey into Nyx Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jou.svg?1780891200",
      "localPath": "/mtg-symbols/0666-tjou-journey-into-nyx-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tjou"
  },
  {
    "id": "e401cbac-165b-433b-a42b-3f00ffc46652",
    "name": "Journey into Nyx Promos",
    "year": 2014,
    "releasedAt": "2014-04-26",
    "code": "PJOU",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 667,
    "icon": {
      "alt": "Journey into Nyx Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jou.svg?1780891200",
      "localPath": "/mtg-symbols/0667-pjou-journey-into-nyx-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pjou"
  },
  {
    "id": "a80b4ba1-7485-4c16-b745-eeea904863c3",
    "name": "Duel Decks: Jace vs. Vraska",
    "year": 2014,
    "releasedAt": "2014-03-14",
    "code": "DDM",
    "setType": "Duel Deck",
    "cardCount": 88,
    "releaseOrder": 668,
    "icon": {
      "alt": "Duel Decks: Jace vs. Vraska set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddm.svg?1780891200",
      "localPath": "/mtg-symbols/0668-ddm-duel-decks-jace-vs-vraska.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddm"
  },
  {
    "id": "1347a008-d8da-46d5-82f7-fe25527bbbd0",
    "name": "Duel Decks: Jace vs. Vraska Tokens",
    "year": 2014,
    "releasedAt": "2014-03-14",
    "code": "TDDM",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 669,
    "icon": {
      "alt": "Duel Decks: Jace vs. Vraska Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddm.svg?1780891200",
      "localPath": "/mtg-symbols/0669-tddm-duel-decks-jace-vs-vraska-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddm"
  },
  {
    "id": "7dd30d1d-f481-4f68-9383-6ddb51bbe21b",
    "name": "Battle the Horde",
    "year": 2014,
    "releasedAt": "2014-03-01",
    "code": "TBTH",
    "setType": "Memorabilia",
    "cardCount": 15,
    "releaseOrder": 670,
    "icon": {
      "alt": "Battle the Horde set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bng.svg?1780891200",
      "localPath": "/mtg-symbols/0670-tbth-battle-the-horde.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tbth"
  },
  {
    "id": "50a80fe4-a757-408f-ad23-52c5cc5f45cc",
    "name": "Born of the Gods",
    "year": 2014,
    "releasedAt": "2014-02-07",
    "code": "BNG",
    "setType": "Expansion",
    "cardCount": 165,
    "releaseOrder": 671,
    "icon": {
      "alt": "Born of the Gods set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bng.svg?1780891200",
      "localPath": "/mtg-symbols/0671-bng-born-of-the-gods.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/bng"
  },
  {
    "id": "81dd6941-9598-43ab-abd7-fd5f2b71b171",
    "name": "Born of the Gods Tokens",
    "year": 2014,
    "releasedAt": "2014-02-07",
    "code": "TBNG",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 672,
    "icon": {
      "alt": "Born of the Gods Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bng.svg?1780891200",
      "localPath": "/mtg-symbols/0672-tbng-born-of-the-gods-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tbng"
  },
  {
    "id": "6320d123-ac8b-4119-8bb6-93fb8f92ed5c",
    "name": "Born of the Gods Hero's Path",
    "year": 2014,
    "releasedAt": "2014-02-07",
    "code": "THP2",
    "setType": "Memorabilia",
    "cardCount": 7,
    "releaseOrder": 673,
    "icon": {
      "alt": "Born of the Gods Hero's Path set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bng.svg?1780891200",
      "localPath": "/mtg-symbols/0673-thp2-born-of-the-gods-hero-s-path.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/thp2"
  },
  {
    "id": "6733ed2b-f650-4db7-8d7d-d1fba3f60928",
    "name": "Born of the Gods Promos",
    "year": 2014,
    "releasedAt": "2014-02-01",
    "code": "PBNG",
    "setType": "Promo",
    "cardCount": 9,
    "releaseOrder": 674,
    "icon": {
      "alt": "Born of the Gods Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bng.svg?1780891200",
      "localPath": "/mtg-symbols/0674-pbng-born-of-the-gods-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pbng"
  },
  {
    "id": "ed1404ce-ac05-4d93-8283-163a50bfc9b5",
    "name": "Friday Night Magic 2014",
    "year": 2014,
    "releasedAt": "2014-01-01",
    "code": "F14",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 675,
    "icon": {
      "alt": "Friday Night Magic 2014 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0675-f14-friday-night-magic-2014.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f14"
  },
  {
    "id": "27b3e564-c016-47d4-8a63-55b0034f9e30",
    "name": "Judge Gift Cards 2014",
    "year": 2014,
    "releasedAt": "2014-01-01",
    "code": "J14",
    "setType": "Promo",
    "cardCount": 14,
    "releaseOrder": 676,
    "icon": {
      "alt": "Judge Gift Cards 2014 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0676-j14-judge-gift-cards-2014.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j14"
  },
  {
    "id": "2a314e02-ee9d-453b-84a2-92cf55135ee6",
    "name": "League Tokens 2014",
    "year": 2014,
    "releasedAt": "2014-01-01",
    "code": "L14",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 677,
    "icon": {
      "alt": "League Tokens 2014 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0677-l14-league-tokens-2014.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/l14"
  },
  {
    "id": "c62e6d4f-af8c-4f27-9bc8-361291890146",
    "name": "Commander 2013",
    "year": 2013,
    "releasedAt": "2013-11-01",
    "code": "C13",
    "setType": "Commander",
    "cardCount": 356,
    "releaseOrder": 678,
    "icon": {
      "alt": "Commander 2013 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c13.svg?1780891200",
      "localPath": "/mtg-symbols/0678-c13-commander-2013.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/c13"
  },
  {
    "id": "03542833-6773-414f-992d-be88b65238af",
    "name": "Commander 2013 Oversized",
    "year": 2013,
    "releasedAt": "2013-11-01",
    "code": "OC13",
    "setType": "Memorabilia",
    "cardCount": 15,
    "releaseOrder": 679,
    "icon": {
      "alt": "Commander 2013 Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/c13.svg?1780891200",
      "localPath": "/mtg-symbols/0679-oc13-commander-2013-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oc13"
  },
  {
    "id": "7d4d5ad5-9936-419c-a278-529d560589e7",
    "name": "Face the Hydra",
    "year": 2013,
    "releasedAt": "2013-10-19",
    "code": "TFTH",
    "setType": "Memorabilia",
    "cardCount": 15,
    "releaseOrder": 680,
    "icon": {
      "alt": "Face the Hydra set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ths.svg?1780891200",
      "localPath": "/mtg-symbols/0680-tfth-face-the-hydra.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tfth"
  },
  {
    "id": "d1b5d85e-f18a-4e47-8305-de8b6661cfbe",
    "name": "Theros Hero's Path",
    "year": 2013,
    "releasedAt": "2013-09-27",
    "code": "THP1",
    "setType": "Memorabilia",
    "cardCount": 7,
    "releaseOrder": 681,
    "icon": {
      "alt": "Theros Hero's Path set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ths.svg?1780891200",
      "localPath": "/mtg-symbols/0681-thp1-theros-hero-s-path.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/thp1"
  },
  {
    "id": "69093d6f-e25a-41a4-8cf5-688d7f11c0fb",
    "name": "Theros",
    "year": 2013,
    "releasedAt": "2013-09-27",
    "code": "THS",
    "setType": "Expansion",
    "cardCount": 249,
    "releaseOrder": 682,
    "icon": {
      "alt": "Theros set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ths.svg?1780891200",
      "localPath": "/mtg-symbols/0682-ths-theros.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ths"
  },
  {
    "id": "fbed88b2-db9b-4606-8202-8ff746f0513f",
    "name": "Theros Tokens",
    "year": 2013,
    "releasedAt": "2013-09-27",
    "code": "TTHS",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 683,
    "icon": {
      "alt": "Theros Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ths.svg?1780891200",
      "localPath": "/mtg-symbols/0683-tths-theros-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tths"
  },
  {
    "id": "ae24da1d-4b3e-4eff-8860-0d69b2754175",
    "name": "Theros Promos",
    "year": 2013,
    "releasedAt": "2013-09-21",
    "code": "PTHS",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 684,
    "icon": {
      "alt": "Theros Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ths.svg?1780891200",
      "localPath": "/mtg-symbols/0684-pths-theros-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pths"
  },
  {
    "id": "7dfc5406-c4cf-479d-b005-11e578752dc9",
    "name": "Duel Decks: Heroes vs. Monsters",
    "year": 2013,
    "releasedAt": "2013-09-06",
    "code": "DDL",
    "setType": "Duel Deck",
    "cardCount": 81,
    "releaseOrder": 685,
    "icon": {
      "alt": "Duel Decks: Heroes vs. Monsters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddl.svg?1780891200",
      "localPath": "/mtg-symbols/0685-ddl-duel-decks-heroes-vs-monsters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddl"
  },
  {
    "id": "8dd89664-d3d2-4cc3-8808-7c84533e9670",
    "name": "Duel Decks: Heroes vs. Monsters Tokens",
    "year": 2013,
    "releasedAt": "2013-09-06",
    "code": "TDDL",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 686,
    "icon": {
      "alt": "Duel Decks: Heroes vs. Monsters Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddl.svg?1780891200",
      "localPath": "/mtg-symbols/0686-tddl-duel-decks-heroes-vs-monsters-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddl"
  },
  {
    "id": "815577c6-652f-4171-8298-c1063c5bced1",
    "name": "From the Vault: Twenty",
    "year": 2013,
    "releasedAt": "2013-08-23",
    "code": "V13",
    "setType": "From The Vault",
    "cardCount": 20,
    "releaseOrder": 687,
    "icon": {
      "alt": "From the Vault: Twenty set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/v13.svg?1780891200",
      "localPath": "/mtg-symbols/0687-v13-from-the-vault-twenty.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/v13"
  },
  {
    "id": "e03ee1c0-ecd2-4fcc-ac3c-e8fdb103a847",
    "name": "Magic 2014",
    "year": 2013,
    "releasedAt": "2013-07-19",
    "code": "M14",
    "setType": "Core",
    "cardCount": 249,
    "releaseOrder": 688,
    "icon": {
      "alt": "Magic 2014 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m14.svg?1780891200",
      "localPath": "/mtg-symbols/0688-m14-magic-2014.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m14"
  },
  {
    "id": "4fd45589-264c-461b-8ccd-66f952f81764",
    "name": "Magic 2014 Tokens",
    "year": 2013,
    "releasedAt": "2013-07-19",
    "code": "TM14",
    "setType": "Token",
    "cardCount": 13,
    "releaseOrder": 689,
    "icon": {
      "alt": "Magic 2014 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m14.svg?1780891200",
      "localPath": "/mtg-symbols/0689-tm14-magic-2014-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm14"
  },
  {
    "id": "bddcd9c6-a02d-4f17-b903-3630b580d33b",
    "name": "Magic 2014 Promos",
    "year": 2013,
    "releasedAt": "2013-07-18",
    "code": "PM14",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 690,
    "icon": {
      "alt": "Magic 2014 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m14.svg?1780891200",
      "localPath": "/mtg-symbols/0690-pm14-magic-2014-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pm14"
  },
  {
    "id": "19132aaf-ed11-4985-9cac-a8dc58827701",
    "name": "San Diego Comic-Con 2013",
    "year": 2013,
    "releasedAt": "2013-07-18",
    "code": "PSDC",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 691,
    "icon": {
      "alt": "San Diego Comic-Con 2013 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0691-psdc-san-diego-comic-con-2013.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psdc"
  },
  {
    "id": "0b7020f2-336d-4706-9ce6-f6710b9ebd5c",
    "name": "Modern Masters",
    "year": 2013,
    "releasedAt": "2013-06-07",
    "code": "MMA",
    "setType": "Masters",
    "cardCount": 229,
    "releaseOrder": 692,
    "icon": {
      "alt": "Modern Masters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mma.svg?1780891200",
      "localPath": "/mtg-symbols/0692-mma-modern-masters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mma"
  },
  {
    "id": "e03160f8-6045-4613-9869-f5f4fa12604d",
    "name": "Modern Masters Tokens",
    "year": 2013,
    "releasedAt": "2013-06-07",
    "code": "TMMA",
    "setType": "Token",
    "cardCount": 16,
    "releaseOrder": 693,
    "icon": {
      "alt": "Modern Masters Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mma.svg?1780891200",
      "localPath": "/mtg-symbols/0693-tmma-modern-masters-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmma"
  },
  {
    "id": "c8bd8520-cd98-45cd-b533-8d40c2087426",
    "name": "Dragon's Maze",
    "year": 2013,
    "releasedAt": "2013-05-03",
    "code": "DGM",
    "setType": "Expansion",
    "cardCount": 156,
    "releaseOrder": 694,
    "icon": {
      "alt": "Dragon's Maze set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dgm.svg?1780891200",
      "localPath": "/mtg-symbols/0694-dgm-dragon-s-maze.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dgm"
  },
  {
    "id": "73406582-d0f6-4c0b-a23d-465485e5a05c",
    "name": "Dragon's Maze Tokens",
    "year": 2013,
    "releasedAt": "2013-05-03",
    "code": "TDGM",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 695,
    "icon": {
      "alt": "Dragon's Maze Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dgm.svg?1780891200",
      "localPath": "/mtg-symbols/0695-tdgm-dragon-s-maze-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdgm"
  },
  {
    "id": "d29698eb-32e4-448f-977f-aa9b31c408b5",
    "name": "Dragon's Maze Promos",
    "year": 2013,
    "releasedAt": "2013-04-27",
    "code": "PDGM",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 696,
    "icon": {
      "alt": "Dragon's Maze Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dgm.svg?1780891200",
      "localPath": "/mtg-symbols/0696-pdgm-dragon-s-maze-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdgm"
  },
  {
    "id": "b3bbcbc0-769d-42df-80f3-924385ac4f67",
    "name": "World Magic Cup Qualifiers",
    "year": 2013,
    "releasedAt": "2013-04-06",
    "code": "WMC",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 697,
    "icon": {
      "alt": "World Magic Cup Qualifiers set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0697-wmc-world-magic-cup-qualifiers.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wmc"
  },
  {
    "id": "529a5259-8a88-4baf-86a0-cd88098c3ce7",
    "name": "Duel Decks: Sorin vs. Tibalt",
    "year": 2013,
    "releasedAt": "2013-03-15",
    "code": "DDK",
    "setType": "Duel Deck",
    "cardCount": 80,
    "releaseOrder": 698,
    "icon": {
      "alt": "Duel Decks: Sorin vs. Tibalt set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddk.svg?1780891200",
      "localPath": "/mtg-symbols/0698-ddk-duel-decks-sorin-vs-tibalt.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddk"
  },
  {
    "id": "5a20bd6d-97c6-4ba1-b737-9c6455777cf1",
    "name": "Duel Decks: Sorin vs. Tibalt Tokens",
    "year": 2013,
    "releasedAt": "2013-03-15",
    "code": "TDDK",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 699,
    "icon": {
      "alt": "Duel Decks: Sorin vs. Tibalt Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddk.svg?1780891200",
      "localPath": "/mtg-symbols/0699-tddk-duel-decks-sorin-vs-tibalt-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddk"
  },
  {
    "id": "035a05f7-e020-4f50-a141-ed16ba704bd2",
    "name": "Gatecrash",
    "year": 2013,
    "releasedAt": "2013-02-01",
    "code": "GTC",
    "setType": "Expansion",
    "cardCount": 249,
    "releaseOrder": 700,
    "icon": {
      "alt": "Gatecrash set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gtc.svg?1780891200",
      "localPath": "/mtg-symbols/0700-gtc-gatecrash.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gtc"
  },
  {
    "id": "4a5fbb89-2871-4c06-9b55-0a7911857118",
    "name": "Gatecrash Tokens",
    "year": 2013,
    "releasedAt": "2013-02-01",
    "code": "TGTC",
    "setType": "Token",
    "cardCount": 8,
    "releaseOrder": 701,
    "icon": {
      "alt": "Gatecrash Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gtc.svg?1780891200",
      "localPath": "/mtg-symbols/0701-tgtc-gatecrash-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tgtc"
  },
  {
    "id": "2a51bc89-cf7c-4c31-af17-f46bd45fef40",
    "name": "Gatecrash Promos",
    "year": 2013,
    "releasedAt": "2013-01-26",
    "code": "PGTC",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 702,
    "icon": {
      "alt": "Gatecrash Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gtc.svg?1780891200",
      "localPath": "/mtg-symbols/0702-pgtc-gatecrash-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pgtc"
  },
  {
    "id": "4f0f5416-2f39-4339-8b9a-5454d94a4ca6",
    "name": "Friday Night Magic 2013",
    "year": 2013,
    "releasedAt": "2013-01-01",
    "code": "F13",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 703,
    "icon": {
      "alt": "Friday Night Magic 2013 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0703-f13-friday-night-magic-2013.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f13"
  },
  {
    "id": "e9d7337b-b74e-43ae-820e-a6d26b23c9f3",
    "name": "Judge Gift Cards 2013",
    "year": 2013,
    "releasedAt": "2013-01-01",
    "code": "J13",
    "setType": "Promo",
    "cardCount": 9,
    "releaseOrder": 704,
    "icon": {
      "alt": "Judge Gift Cards 2013 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0704-j13-judge-gift-cards-2013.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j13"
  },
  {
    "id": "ff250c63-a900-4154-8b39-0bdeb03edabc",
    "name": "League Tokens 2013",
    "year": 2013,
    "releasedAt": "2013-01-01",
    "code": "L13",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 705,
    "icon": {
      "alt": "League Tokens 2013 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0705-l13-league-tokens-2013.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/l13"
  },
  {
    "id": "17abd72e-22ed-4b47-87ca-929a378d0439",
    "name": "Duels of the Planeswalkers 2014 Promos",
    "year": 2013,
    "releasedAt": "2013-01-01",
    "code": "PDP14",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 706,
    "icon": {
      "alt": "Duels of the Planeswalkers 2014 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m14.svg?1780891200",
      "localPath": "/mtg-symbols/0706-pdp14-duels-of-the-planeswalkers-2014-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdp14"
  },
  {
    "id": "bf95efbe-b991-4f7c-b9e9-04f0bc59969a",
    "name": "Commander's Arsenal",
    "year": 2012,
    "releasedAt": "2012-11-02",
    "code": "CM1",
    "setType": "Arsenal",
    "cardCount": 18,
    "releaseOrder": 707,
    "icon": {
      "alt": "Commander's Arsenal set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cm1.svg?1780891200",
      "localPath": "/mtg-symbols/0707-cm1-commander-s-arsenal.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cm1"
  },
  {
    "id": "80c3b403-1eaa-41b0-9f26-72b8d448c122",
    "name": "Commander's Arsenal Oversized",
    "year": 2012,
    "releasedAt": "2012-11-02",
    "code": "OCM1",
    "setType": "Memorabilia",
    "cardCount": 10,
    "releaseOrder": 708,
    "icon": {
      "alt": "Commander's Arsenal Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cm1.svg?1780891200",
      "localPath": "/mtg-symbols/0708-ocm1-commander-s-arsenal-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ocm1"
  },
  {
    "id": "4e3ab176-9a9c-41cf-8b74-8c7d5e6731f7",
    "name": "Return to Ravnica Promos",
    "year": 2012,
    "releasedAt": "2012-10-05",
    "code": "PRTR",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 709,
    "icon": {
      "alt": "Return to Ravnica Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rtr.svg?1780891200",
      "localPath": "/mtg-symbols/0709-prtr-return-to-ravnica-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/prtr"
  },
  {
    "id": "80b2374d-c5f1-403e-9772-f6c806fd275e",
    "name": "Return to Ravnica",
    "year": 2012,
    "releasedAt": "2012-10-05",
    "code": "RTR",
    "setType": "Expansion",
    "cardCount": 274,
    "releaseOrder": 710,
    "icon": {
      "alt": "Return to Ravnica set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rtr.svg?1780891200",
      "localPath": "/mtg-symbols/0710-rtr-return-to-ravnica.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/rtr"
  },
  {
    "id": "56289aec-fc72-4bc1-ad67-fac850de5b4e",
    "name": "Return to Ravnica Tokens",
    "year": 2012,
    "releasedAt": "2012-10-05",
    "code": "TRTR",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 711,
    "icon": {
      "alt": "Return to Ravnica Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rtr.svg?1780891200",
      "localPath": "/mtg-symbols/0711-trtr-return-to-ravnica-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/trtr"
  },
  {
    "id": "2dfea68b-b0c4-4f63-ba6c-36c9a6e3030f",
    "name": "Duel Decks: Izzet vs. Golgari",
    "year": 2012,
    "releasedAt": "2012-09-07",
    "code": "DDJ",
    "setType": "Duel Deck",
    "cardCount": 90,
    "releaseOrder": 712,
    "icon": {
      "alt": "Duel Decks: Izzet vs. Golgari set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddj.svg?1780891200",
      "localPath": "/mtg-symbols/0712-ddj-duel-decks-izzet-vs-golgari.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddj"
  },
  {
    "id": "8568648a-da9d-4440-a826-a065266c7a4e",
    "name": "Duel Decks: Izzet vs. Golgari Tokens",
    "year": 2012,
    "releasedAt": "2012-09-07",
    "code": "TDDJ",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 713,
    "icon": {
      "alt": "Duel Decks: Izzet vs. Golgari Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddj.svg?1780891200",
      "localPath": "/mtg-symbols/0713-tddj-duel-decks-izzet-vs-golgari-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddj"
  },
  {
    "id": "b9259658-67bf-451b-b78b-f5545129e9bd",
    "name": "From the Vault: Realms",
    "year": 2012,
    "releasedAt": "2012-08-31",
    "code": "V12",
    "setType": "From The Vault",
    "cardCount": 15,
    "releaseOrder": 714,
    "icon": {
      "alt": "From the Vault: Realms set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/v12.svg?1780891200",
      "localPath": "/mtg-symbols/0714-v12-from-the-vault-realms.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/v12"
  },
  {
    "id": "f9b0c6f4-8a4f-4f36-ad3c-e1e16fb8535d",
    "name": "Magic 2013",
    "year": 2012,
    "releasedAt": "2012-07-13",
    "code": "M13",
    "setType": "Core",
    "cardCount": 249,
    "releaseOrder": 715,
    "icon": {
      "alt": "Magic 2013 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m13.svg?1780891200",
      "localPath": "/mtg-symbols/0715-m13-magic-2013.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m13"
  },
  {
    "id": "cd869f42-f58f-4ce3-a79d-7949b514ba52",
    "name": "Magic 2013 Tokens",
    "year": 2012,
    "releasedAt": "2012-07-13",
    "code": "TM13",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 716,
    "icon": {
      "alt": "Magic 2013 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m13.svg?1780891200",
      "localPath": "/mtg-symbols/0716-tm13-magic-2013-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm13"
  },
  {
    "id": "9403aa68-56ab-48ce-86c1-10a53c54a172",
    "name": "Magic 2013 Promos",
    "year": 2012,
    "releasedAt": "2012-07-12",
    "code": "PM13",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 717,
    "icon": {
      "alt": "Magic 2013 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m13.svg?1780891200",
      "localPath": "/mtg-symbols/0717-pm13-magic-2013-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pm13"
  },
  {
    "id": "7079031b-c5b0-4353-87af-a63a0f204f47",
    "name": "Planechase 2012 Planes",
    "year": 2012,
    "releasedAt": "2012-06-01",
    "code": "OPC2",
    "setType": "Planechase",
    "cardCount": 40,
    "releaseOrder": 718,
    "icon": {
      "alt": "Planechase 2012 Planes set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pc2.svg?1780891200",
      "localPath": "/mtg-symbols/0718-opc2-planechase-2012-planes.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/opc2"
  },
  {
    "id": "9fb2f83e-7015-4aa9-808f-310ccf0fdb9c",
    "name": "Planechase 2012",
    "year": 2012,
    "releasedAt": "2012-06-01",
    "code": "PC2",
    "setType": "Planechase",
    "cardCount": 156,
    "releaseOrder": 719,
    "icon": {
      "alt": "Planechase 2012 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pc2.svg?1780891200",
      "localPath": "/mtg-symbols/0719-pc2-planechase-2012.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pc2"
  },
  {
    "id": "039810a9-92d7-4f2d-b2d0-ca661ac586c0",
    "name": "Avacyn Restored",
    "year": 2012,
    "releasedAt": "2012-05-04",
    "code": "AVR",
    "setType": "Expansion",
    "cardCount": 244,
    "releaseOrder": 720,
    "icon": {
      "alt": "Avacyn Restored set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/avr.svg?1780891200",
      "localPath": "/mtg-symbols/0720-avr-avacyn-restored.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/avr"
  },
  {
    "id": "c362c2a9-2782-4cbc-917f-05334cb81c5b",
    "name": "Avacyn Restored Tokens",
    "year": 2012,
    "releasedAt": "2012-05-04",
    "code": "TAVR",
    "setType": "Token",
    "cardCount": 8,
    "releaseOrder": 721,
    "icon": {
      "alt": "Avacyn Restored Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/avr.svg?1780891200",
      "localPath": "/mtg-symbols/0721-tavr-avacyn-restored-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tavr"
  },
  {
    "id": "b933d4a1-3d0a-45fb-a73c-a9ae2ba928b0",
    "name": "Avacyn Restored Promos",
    "year": 2012,
    "releasedAt": "2012-04-28",
    "code": "PAVR",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 722,
    "icon": {
      "alt": "Avacyn Restored Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/avr.svg?1780891200",
      "localPath": "/mtg-symbols/0722-pavr-avacyn-restored-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pavr"
  },
  {
    "id": "e5c5553c-307e-4bee-ba0b-6e96e0f2c78f",
    "name": "Open the Helvault",
    "year": 2012,
    "releasedAt": "2012-04-28",
    "code": "PHEL",
    "setType": "Memorabilia",
    "cardCount": 6,
    "releaseOrder": 723,
    "icon": {
      "alt": "Open the Helvault set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/avr.svg?1780891200",
      "localPath": "/mtg-symbols/0723-phel-open-the-helvault.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/phel"
  },
  {
    "id": "a29e8ace-bbcd-4507-b159-7ec77d28f792",
    "name": "Duel Decks: Venser vs. Koth",
    "year": 2012,
    "releasedAt": "2012-03-30",
    "code": "DDI",
    "setType": "Duel Deck",
    "cardCount": 77,
    "releaseOrder": 724,
    "icon": {
      "alt": "Duel Decks: Venser vs. Koth set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddi.svg?1780891200",
      "localPath": "/mtg-symbols/0724-ddi-duel-decks-venser-vs-koth.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddi"
  },
  {
    "id": "7ed0ca7e-daea-4cf6-8667-9fdc894e539c",
    "name": "Duel Decks: Venser vs. Koth Tokens",
    "year": 2012,
    "releasedAt": "2012-03-30",
    "code": "TDDI",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 725,
    "icon": {
      "alt": "Duel Decks: Venser vs. Koth Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddi.svg?1780891200",
      "localPath": "/mtg-symbols/0725-tddi-duel-decks-venser-vs-koth-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddi"
  },
  {
    "id": "8052750a-aaf2-46fc-b46d-633f14124017",
    "name": "Dark Ascension",
    "year": 2012,
    "releasedAt": "2012-02-03",
    "code": "DKA",
    "setType": "Expansion",
    "cardCount": 158,
    "releaseOrder": 726,
    "icon": {
      "alt": "Dark Ascension set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dka.svg?1780891200",
      "localPath": "/mtg-symbols/0726-dka-dark-ascension.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dka"
  },
  {
    "id": "5b70a0fa-6968-4e29-b9a1-62d3be626b65",
    "name": "Dark Ascension Tokens",
    "year": 2012,
    "releasedAt": "2012-02-03",
    "code": "TDKA",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 727,
    "icon": {
      "alt": "Dark Ascension Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dka.svg?1780891200",
      "localPath": "/mtg-symbols/0727-tdka-dark-ascension-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdka"
  },
  {
    "id": "f784e27e-4af8-4b11-8d45-826388d63604",
    "name": "Dark Ascension Promos",
    "year": 2012,
    "releasedAt": "2012-01-28",
    "code": "PDKA",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 728,
    "icon": {
      "alt": "Dark Ascension Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dka.svg?1780891200",
      "localPath": "/mtg-symbols/0728-pdka-dark-ascension-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdka"
  },
  {
    "id": "6df07fcb-8b2a-43a6-82bc-97e92312a921",
    "name": "Friday Night Magic 2012",
    "year": 2012,
    "releasedAt": "2012-01-01",
    "code": "F12",
    "setType": "Promo",
    "cardCount": 13,
    "releaseOrder": 729,
    "icon": {
      "alt": "Friday Night Magic 2012 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0729-f12-friday-night-magic-2012.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f12"
  },
  {
    "id": "d2de9024-04a9-487c-8ca7-9111fb2a0fe0",
    "name": "Judge Gift Cards 2012",
    "year": 2012,
    "releasedAt": "2012-01-01",
    "code": "J12",
    "setType": "Promo",
    "cardCount": 9,
    "releaseOrder": 730,
    "icon": {
      "alt": "Judge Gift Cards 2012 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0730-j12-judge-gift-cards-2012.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/j12"
  },
  {
    "id": "43730e1c-6389-4bff-a1a2-447c50002992",
    "name": "League Tokens 2012",
    "year": 2012,
    "releasedAt": "2012-01-01",
    "code": "L12",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 731,
    "icon": {
      "alt": "League Tokens 2012 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0731-l12-league-tokens-2012.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/l12"
  },
  {
    "id": "f972b795-5d5d-406c-9326-a241b11480a9",
    "name": "Duels of the Planeswalkers 2013 Promos",
    "year": 2012,
    "releasedAt": "2012-01-01",
    "code": "PDP13",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 732,
    "icon": {
      "alt": "Duels of the Planeswalkers 2013 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m13.svg?1780891200",
      "localPath": "/mtg-symbols/0732-pdp13-duels-of-the-planeswalkers-2013-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdp13"
  },
  {
    "id": "33438cf7-6acb-48f0-8581-215d1e4995e5",
    "name": "IDW Comics Inserts",
    "year": 2012,
    "releasedAt": "2012-01-01",
    "code": "PIDW",
    "setType": "Promo",
    "cardCount": 17,
    "releaseOrder": 733,
    "icon": {
      "alt": "IDW Comics Inserts set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pidw.svg?1780891200",
      "localPath": "/mtg-symbols/0733-pidw-idw-comics-inserts.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pidw"
  },
  {
    "id": "380cde80-8b8d-47c7-847f-aa4eeb388b43",
    "name": "Wizards Play Network 2012",
    "year": 2012,
    "releasedAt": "2012-01-01",
    "code": "PW12",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 734,
    "icon": {
      "alt": "Wizards Play Network 2012 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0734-pw12-wizards-play-network-2012.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pw12"
  },
  {
    "id": "b6d6ba83-3b91-4203-8103-320cfa50f848",
    "name": "Premium Deck Series: Graveborn",
    "year": 2011,
    "releasedAt": "2011-11-18",
    "code": "PD3",
    "setType": "Premium Deck",
    "cardCount": 30,
    "releaseOrder": 735,
    "icon": {
      "alt": "Premium Deck Series: Graveborn set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pd3.svg?1780891200",
      "localPath": "/mtg-symbols/0735-pd3-premium-deck-series-graveborn.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pd3"
  },
  {
    "id": "d1026945-2969-42b9-be53-f941405a58cb",
    "name": "Innistrad",
    "year": 2011,
    "releasedAt": "2011-09-30",
    "code": "ISD",
    "setType": "Expansion",
    "cardCount": 264,
    "releaseOrder": 736,
    "icon": {
      "alt": "Innistrad set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/isd.svg?1780891200",
      "localPath": "/mtg-symbols/0736-isd-innistrad.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/isd"
  },
  {
    "id": "a91850e1-a8b4-49dd-a5dc-2a73ea4f9e40",
    "name": "Innistrad Tokens",
    "year": 2011,
    "releasedAt": "2011-09-30",
    "code": "TISD",
    "setType": "Token",
    "cardCount": 13,
    "releaseOrder": 737,
    "icon": {
      "alt": "Innistrad Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/isd.svg?1780891200",
      "localPath": "/mtg-symbols/0737-tisd-innistrad-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tisd"
  },
  {
    "id": "94d2e8a2-5ae8-4b7e-a7db-6770d5cfa6fd",
    "name": "Innistrad Promos",
    "year": 2011,
    "releasedAt": "2011-09-24",
    "code": "PISD",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 738,
    "icon": {
      "alt": "Innistrad Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/isd.svg?1780891200",
      "localPath": "/mtg-symbols/0738-pisd-innistrad-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pisd"
  },
  {
    "id": "bad1fe7e-27df-4999-821b-d477c2ec658d",
    "name": "Duel Decks: Ajani vs. Nicol Bolas",
    "year": 2011,
    "releasedAt": "2011-09-02",
    "code": "DDH",
    "setType": "Duel Deck",
    "cardCount": 80,
    "releaseOrder": 739,
    "icon": {
      "alt": "Duel Decks: Ajani vs. Nicol Bolas set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddh.svg?1780891200",
      "localPath": "/mtg-symbols/0739-ddh-duel-decks-ajani-vs-nicol-bolas.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddh"
  },
  {
    "id": "982f060c-1508-4f2e-8cbc-a5675dbe4477",
    "name": "Duel Decks: Ajani vs. Nicol Bolas Tokens",
    "year": 2011,
    "releasedAt": "2011-09-02",
    "code": "TDDH",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 740,
    "icon": {
      "alt": "Duel Decks: Ajani vs. Nicol Bolas Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddh.svg?1780891200",
      "localPath": "/mtg-symbols/0740-tddh-duel-decks-ajani-vs-nicol-bolas-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddh"
  },
  {
    "id": "b83c0908-ae67-47eb-9099-7a1791ada84a",
    "name": "From the Vault: Legends",
    "year": 2011,
    "releasedAt": "2011-08-26",
    "code": "V11",
    "setType": "From The Vault",
    "cardCount": 15,
    "releaseOrder": 741,
    "icon": {
      "alt": "From the Vault: Legends set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/v11.svg?1780891200",
      "localPath": "/mtg-symbols/0741-v11-from-the-vault-legends.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/v11"
  },
  {
    "id": "5cdd2643-229c-4441-a62a-c34e4b531e1c",
    "name": "Magic 2012",
    "year": 2011,
    "releasedAt": "2011-07-15",
    "code": "M12",
    "setType": "Core",
    "cardCount": 249,
    "releaseOrder": 742,
    "icon": {
      "alt": "Magic 2012 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m12.svg?1780891200",
      "localPath": "/mtg-symbols/0742-m12-magic-2012.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m12"
  },
  {
    "id": "56ca128d-320c-430f-b083-1950f80aa11f",
    "name": "Magic 2012 Tokens",
    "year": 2011,
    "releasedAt": "2011-07-15",
    "code": "TM12",
    "setType": "Token",
    "cardCount": 7,
    "releaseOrder": 743,
    "icon": {
      "alt": "Magic 2012 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m12.svg?1780891200",
      "localPath": "/mtg-symbols/0743-tm12-magic-2012-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm12"
  },
  {
    "id": "488be4f7-19cb-42d5-bba3-189c221e535d",
    "name": "Magic 2012 Promos",
    "year": 2011,
    "releasedAt": "2011-07-14",
    "code": "PM12",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 744,
    "icon": {
      "alt": "Magic 2012 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m12.svg?1780891200",
      "localPath": "/mtg-symbols/0744-pm12-magic-2012-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pm12"
  },
  {
    "id": "84ff1a64-4e69-4ed2-8c08-26206e3b97a0",
    "name": "Commander 2011",
    "year": 2011,
    "releasedAt": "2011-06-17",
    "code": "CMD",
    "setType": "Commander",
    "cardCount": 318,
    "releaseOrder": 745,
    "icon": {
      "alt": "Commander 2011 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cmd.svg?1780891200",
      "localPath": "/mtg-symbols/0745-cmd-commander-2011.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cmd"
  },
  {
    "id": "0dc30b69-bcba-4d06-a211-59b9b5624f2d",
    "name": "Commander 2011 Oversized",
    "year": 2011,
    "releasedAt": "2011-06-17",
    "code": "OCMD",
    "setType": "Memorabilia",
    "cardCount": 15,
    "releaseOrder": 746,
    "icon": {
      "alt": "Commander 2011 Oversized set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cmd.svg?1780891200",
      "localPath": "/mtg-symbols/0746-ocmd-commander-2011-oversized.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ocmd"
  },
  {
    "id": "ee4cadbc-d155-4355-a7c2-8fcf19af0cb6",
    "name": "Commander 2011 Launch Party",
    "year": 2011,
    "releasedAt": "2011-06-17",
    "code": "PCMD",
    "setType": "Memorabilia",
    "cardCount": 5,
    "releaseOrder": 747,
    "icon": {
      "alt": "Commander 2011 Launch Party set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cmd.svg?1780891200",
      "localPath": "/mtg-symbols/0747-pcmd-commander-2011-launch-party.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pcmd"
  },
  {
    "id": "b240675e-3a95-498d-a3b5-949ec08f7003",
    "name": "Duel Decks: Mirrodin Pure vs. New Phyrexia",
    "year": 2011,
    "releasedAt": "2011-05-14",
    "code": "TD2",
    "setType": "Duel Deck",
    "cardCount": 88,
    "releaseOrder": 748,
    "icon": {
      "alt": "Duel Decks: Mirrodin Pure vs. New Phyrexia set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/td2.svg?1780891200",
      "localPath": "/mtg-symbols/0748-td2-duel-decks-mirrodin-pure-vs-new-phyrexia.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/td2"
  },
  {
    "id": "e8e356d8-6d01-4dab-aa07-d0999dc9359f",
    "name": "New Phyrexia",
    "year": 2011,
    "releasedAt": "2011-05-13",
    "code": "NPH",
    "setType": "Expansion",
    "cardCount": 175,
    "releaseOrder": 749,
    "icon": {
      "alt": "New Phyrexia set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/nph.svg?1780891200",
      "localPath": "/mtg-symbols/0749-nph-new-phyrexia.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/nph"
  },
  {
    "id": "7b5e3883-6588-412a-b979-7de44d50b3de",
    "name": "New Phyrexia Tokens",
    "year": 2011,
    "releasedAt": "2011-05-13",
    "code": "TNPH",
    "setType": "Token",
    "cardCount": 5,
    "releaseOrder": 750,
    "icon": {
      "alt": "New Phyrexia Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/nph.svg?1780891200",
      "localPath": "/mtg-symbols/0750-tnph-new-phyrexia-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tnph"
  },
  {
    "id": "659f3361-e6e9-4891-925f-1d6795bab6ab",
    "name": "New Phyrexia Promos",
    "year": 2011,
    "releasedAt": "2011-05-12",
    "code": "PNPH",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 751,
    "icon": {
      "alt": "New Phyrexia Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/nph.svg?1780891200",
      "localPath": "/mtg-symbols/0751-pnph-new-phyrexia-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pnph"
  },
  {
    "id": "cf842e69-7a05-48e2-adac-fd177087caf5",
    "name": "Duel Decks: Knights vs. Dragons",
    "year": 2011,
    "releasedAt": "2011-04-01",
    "code": "DDG",
    "setType": "Duel Deck",
    "cardCount": 81,
    "releaseOrder": 752,
    "icon": {
      "alt": "Duel Decks: Knights vs. Dragons set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddg.svg?1780891200",
      "localPath": "/mtg-symbols/0752-ddg-duel-decks-knights-vs-dragons.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddg"
  },
  {
    "id": "f5a051a3-ead3-469a-83e4-c6669f880085",
    "name": "Duel Decks: Knights vs. Dragons Tokens",
    "year": 2011,
    "releasedAt": "2011-04-01",
    "code": "TDDG",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 753,
    "icon": {
      "alt": "Duel Decks: Knights vs. Dragons Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddg.svg?1780891200",
      "localPath": "/mtg-symbols/0753-tddg-duel-decks-knights-vs-dragons-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddg"
  },
  {
    "id": "f46c57e3-9301-4006-a6ca-06f3f65961fb",
    "name": "Mirrodin Besieged",
    "year": 2011,
    "releasedAt": "2011-02-04",
    "code": "MBS",
    "setType": "Expansion",
    "cardCount": 155,
    "releaseOrder": 754,
    "icon": {
      "alt": "Mirrodin Besieged set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mbs.svg?1780891200",
      "localPath": "/mtg-symbols/0754-mbs-mirrodin-besieged.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mbs"
  },
  {
    "id": "ab9695ca-ca49-46c2-9bc4-c18e50f8689b",
    "name": "Mirrodin Besieged Tokens",
    "year": 2011,
    "releasedAt": "2011-02-04",
    "code": "TMBS",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 755,
    "icon": {
      "alt": "Mirrodin Besieged Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mbs.svg?1780891200",
      "localPath": "/mtg-symbols/0755-tmbs-mirrodin-besieged-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmbs"
  },
  {
    "id": "8a59d98a-4e13-4943-b06c-b35868e954ba",
    "name": "Mirrodin Besieged Promos",
    "year": 2011,
    "releasedAt": "2011-02-03",
    "code": "PMBS",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 756,
    "icon": {
      "alt": "Mirrodin Besieged Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mbs.svg?1780891200",
      "localPath": "/mtg-symbols/0756-pmbs-mirrodin-besieged-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmbs"
  },
  {
    "id": "d38a13b7-6615-4c89-be7d-3b4eaacf1875",
    "name": "Masters Edition IV",
    "year": 2011,
    "releasedAt": "2011-01-10",
    "code": "ME4",
    "setType": "Masters",
    "cardCount": 269,
    "releaseOrder": 757,
    "icon": {
      "alt": "Masters Edition IV set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/me4.svg?1780891200",
      "localPath": "/mtg-symbols/0757-me4-masters-edition-iv.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/me4"
  },
  {
    "id": "757ed42f-384b-450d-ab70-217cadca2847",
    "name": "Friday Night Magic 2011",
    "year": 2011,
    "releasedAt": "2011-01-01",
    "code": "F11",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 758,
    "icon": {
      "alt": "Friday Night Magic 2011 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0758-f11-friday-night-magic-2011.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f11"
  },
  {
    "id": "e9ec9f60-333b-48f7-8e73-5db562638a54",
    "name": "Judge Gift Cards 2011",
    "year": 2011,
    "releasedAt": "2011-01-01",
    "code": "G11",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 759,
    "icon": {
      "alt": "Judge Gift Cards 2011 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0759-g11-judge-gift-cards-2011.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g11"
  },
  {
    "id": "1f7e87ba-8d80-4484-a7bb-075a54f9182e",
    "name": "Legacy Championship",
    "year": 2011,
    "releasedAt": "2011-01-01",
    "code": "OLGC",
    "setType": "Memorabilia",
    "cardCount": 27,
    "releaseOrder": 760,
    "icon": {
      "alt": "Legacy Championship set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmei.svg?1780891200",
      "localPath": "/mtg-symbols/0760-olgc-legacy-championship.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/olgc"
  },
  {
    "id": "ba0f80c9-7a21-425b-8a02-cb17c2a50e36",
    "name": "Magic Player Rewards 2011",
    "year": 2011,
    "releasedAt": "2011-01-01",
    "code": "P11",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 761,
    "icon": {
      "alt": "Magic Player Rewards 2011 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0761-p11-magic-player-rewards-2011.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p11"
  },
  {
    "id": "9ed1e58a-9f8a-41f8-b1ca-9f661e3f9ca8",
    "name": "Duels of the Planeswalkers 2012 Promos",
    "year": 2011,
    "releasedAt": "2011-01-01",
    "code": "PDP12",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 762,
    "icon": {
      "alt": "Duels of the Planeswalkers 2012 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmtg2.svg?1780891200",
      "localPath": "/mtg-symbols/0762-pdp12-duels-of-the-planeswalkers-2012-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdp12"
  },
  {
    "id": "0ae3920d-0360-48f8-8172-6bb6666ba22c",
    "name": "Magic Premiere Shop 2011",
    "year": 2011,
    "releasedAt": "2011-01-01",
    "code": "PMPS11",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 763,
    "icon": {
      "alt": "Magic Premiere Shop 2011 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmps.svg?1780891200",
      "localPath": "/mtg-symbols/0763-pmps11-magic-premiere-shop-2011.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmps11"
  },
  {
    "id": "97fe7b09-5b23-4fcb-a9ae-6803c5314382",
    "name": "Salvat 2011",
    "year": 2011,
    "releasedAt": "2011-01-01",
    "code": "PS11",
    "setType": "Box",
    "cardCount": 224,
    "releaseOrder": 764,
    "icon": {
      "alt": "Salvat 2011 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/psal.svg?1780891200",
      "localPath": "/mtg-symbols/0764-ps11-salvat-2011.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ps11"
  },
  {
    "id": "87732dfe-7fba-44e4-8c9c-fcf64c335e97",
    "name": "Wizards Play Network 2011",
    "year": 2011,
    "releasedAt": "2011-01-01",
    "code": "PW11",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 765,
    "icon": {
      "alt": "Wizards Play Network 2011 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0765-pw11-wizards-play-network-2011.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pw11"
  },
  {
    "id": "e0d91aba-be11-4ddd-96a4-4753e708458a",
    "name": "Premium Deck Series: Fire and Lightning",
    "year": 2010,
    "releasedAt": "2010-11-19",
    "code": "PD2",
    "setType": "Premium Deck",
    "cardCount": 34,
    "releaseOrder": 766,
    "icon": {
      "alt": "Premium Deck Series: Fire and Lightning set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pd2.svg?1780891200",
      "localPath": "/mtg-symbols/0766-pd2-premium-deck-series-fire-and-lightning.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pd2"
  },
  {
    "id": "b432b6ae-1d7d-49b1-ab1c-93ae7195fa06",
    "name": "Magic Online Theme Decks",
    "year": 2010,
    "releasedAt": "2010-11-08",
    "code": "TD0",
    "setType": "Box",
    "cardCount": 197,
    "releaseOrder": 767,
    "icon": {
      "alt": "Magic Online Theme Decks set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/td0.svg?1780891200",
      "localPath": "/mtg-symbols/0767-td0-magic-online-theme-decks.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/td0"
  },
  {
    "id": "8f403072-9b22-4e69-8d59-22dc4c97fd8d",
    "name": "Scars of Mirrodin",
    "year": 2010,
    "releasedAt": "2010-10-01",
    "code": "SOM",
    "setType": "Expansion",
    "cardCount": 249,
    "releaseOrder": 768,
    "icon": {
      "alt": "Scars of Mirrodin set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/som.svg?1780891200",
      "localPath": "/mtg-symbols/0768-som-scars-of-mirrodin.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/som"
  },
  {
    "id": "1ea34c50-24cc-4e12-bdf5-12ef7d8a522f",
    "name": "Scars of Mirrodin Tokens",
    "year": 2010,
    "releasedAt": "2010-10-01",
    "code": "TSOM",
    "setType": "Token",
    "cardCount": 10,
    "releaseOrder": 769,
    "icon": {
      "alt": "Scars of Mirrodin Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/som.svg?1780891200",
      "localPath": "/mtg-symbols/0769-tsom-scars-of-mirrodin-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tsom"
  },
  {
    "id": "761e8299-b38f-49b6-b6c4-f0315576f631",
    "name": "Scars of Mirrodin Promos",
    "year": 2010,
    "releasedAt": "2010-09-30",
    "code": "PSOM",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 770,
    "icon": {
      "alt": "Scars of Mirrodin Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/som.svg?1780891200",
      "localPath": "/mtg-symbols/0770-psom-scars-of-mirrodin-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psom"
  },
  {
    "id": "2a5a88d5-e2ac-4252-bc4e-62654b1f9a46",
    "name": "Duel Decks: Elspeth vs. Tezzeret",
    "year": 2010,
    "releasedAt": "2010-09-03",
    "code": "DDF",
    "setType": "Duel Deck",
    "cardCount": 79,
    "releaseOrder": 771,
    "icon": {
      "alt": "Duel Decks: Elspeth vs. Tezzeret set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddf.svg?1780891200",
      "localPath": "/mtg-symbols/0771-ddf-duel-decks-elspeth-vs-tezzeret.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddf"
  },
  {
    "id": "0bded9df-2f2b-4862-b35f-1e64d3decb8b",
    "name": "Duel Decks: Elspeth vs. Tezzeret Tokens",
    "year": 2010,
    "releasedAt": "2010-09-03",
    "code": "TDDF",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 772,
    "icon": {
      "alt": "Duel Decks: Elspeth vs. Tezzeret Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddf.svg?1780891200",
      "localPath": "/mtg-symbols/0772-tddf-duel-decks-elspeth-vs-tezzeret-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddf"
  },
  {
    "id": "3e3ea3e8-3d63-481f-b3ec-03c4f50b602e",
    "name": "From the Vault: Relics",
    "year": 2010,
    "releasedAt": "2010-08-27",
    "code": "V10",
    "setType": "From The Vault",
    "cardCount": 15,
    "releaseOrder": 773,
    "icon": {
      "alt": "From the Vault: Relics set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/v10.svg?1780891200",
      "localPath": "/mtg-symbols/0773-v10-from-the-vault-relics.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/v10"
  },
  {
    "id": "485d2468-18c8-42a4-9482-ca1c51e0470e",
    "name": "Magic 2011",
    "year": 2010,
    "releasedAt": "2010-07-16",
    "code": "M11",
    "setType": "Core",
    "cardCount": 249,
    "releaseOrder": 774,
    "icon": {
      "alt": "Magic 2011 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m11.svg?1780891200",
      "localPath": "/mtg-symbols/0774-m11-magic-2011.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m11"
  },
  {
    "id": "ac8f1cc2-3d92-4389-8de4-8a7a8aec2aba",
    "name": "Magic 2011 Tokens",
    "year": 2010,
    "releasedAt": "2010-07-16",
    "code": "TM11",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 775,
    "icon": {
      "alt": "Magic 2011 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m11.svg?1780891200",
      "localPath": "/mtg-symbols/0775-tm11-magic-2011-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm11"
  },
  {
    "id": "8d3a0693-6b2a-4955-aeda-4888b2665dd0",
    "name": "Magic 2011 Promos",
    "year": 2010,
    "releasedAt": "2010-07-15",
    "code": "PM11",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 776,
    "icon": {
      "alt": "Magic 2011 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m11.svg?1780891200",
      "localPath": "/mtg-symbols/0776-pm11-magic-2011-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pm11"
  },
  {
    "id": "8bc5ec64-18d5-4c81-96a1-8f619d81a019",
    "name": "Archenemy",
    "year": 2010,
    "releasedAt": "2010-06-18",
    "code": "ARC",
    "setType": "Archenemy",
    "cardCount": 150,
    "releaseOrder": 777,
    "icon": {
      "alt": "Archenemy set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/arc.svg?1780891200",
      "localPath": "/mtg-symbols/0777-arc-archenemy.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/arc"
  },
  {
    "id": "238beedf-1d4d-475f-a980-527ba2f55dc6",
    "name": "Archenemy Schemes",
    "year": 2010,
    "releasedAt": "2010-06-18",
    "code": "OARC",
    "setType": "Archenemy",
    "cardCount": 45,
    "releaseOrder": 778,
    "icon": {
      "alt": "Archenemy Schemes set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/arc.svg?1780891200",
      "localPath": "/mtg-symbols/0778-oarc-archenemy-schemes.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/oarc"
  },
  {
    "id": "491666a2-3de4-4214-8238-2dad9dfb5a7a",
    "name": "Duels of the Planeswalkers",
    "year": 2010,
    "releasedAt": "2010-06-04",
    "code": "DPA",
    "setType": "Box",
    "cardCount": 113,
    "releaseOrder": 779,
    "icon": {
      "alt": "Duels of the Planeswalkers set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dpa.svg?1780891200",
      "localPath": "/mtg-symbols/0779-dpa-duels-of-the-planeswalkers.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dpa"
  },
  {
    "id": "3af1f1ab-7b96-4535-912c-3a225b1783bc",
    "name": "Rise of the Eldrazi Promos",
    "year": 2010,
    "releasedAt": "2010-04-23",
    "code": "PROE",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 780,
    "icon": {
      "alt": "Rise of the Eldrazi Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/roe.svg?1780891200",
      "localPath": "/mtg-symbols/0780-proe-rise-of-the-eldrazi-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/proe"
  },
  {
    "id": "eadb8a82-ec56-4623-b50e-42e7e60cb535",
    "name": "Rise of the Eldrazi",
    "year": 2010,
    "releasedAt": "2010-04-23",
    "code": "ROE",
    "setType": "Expansion",
    "cardCount": 248,
    "releaseOrder": 781,
    "icon": {
      "alt": "Rise of the Eldrazi set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/roe.svg?1780891200",
      "localPath": "/mtg-symbols/0781-roe-rise-of-the-eldrazi.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/roe"
  },
  {
    "id": "855dd9b4-d26a-42e0-b693-81aade8affa8",
    "name": "Rise of the Eldrazi Tokens",
    "year": 2010,
    "releasedAt": "2010-04-23",
    "code": "TROE",
    "setType": "Token",
    "cardCount": 7,
    "releaseOrder": 782,
    "icon": {
      "alt": "Rise of the Eldrazi Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/roe.svg?1780891200",
      "localPath": "/mtg-symbols/0782-troe-rise-of-the-eldrazi-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/troe"
  },
  {
    "id": "bf561626-56ca-4eb0-a2de-b84dbe7874f8",
    "name": "Duel Decks: Phyrexia vs. the Coalition",
    "year": 2010,
    "releasedAt": "2010-03-19",
    "code": "DDE",
    "setType": "Duel Deck",
    "cardCount": 71,
    "releaseOrder": 783,
    "icon": {
      "alt": "Duel Decks: Phyrexia vs. the Coalition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dde.svg?1780891200",
      "localPath": "/mtg-symbols/0783-dde-duel-decks-phyrexia-vs-the-coalition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dde"
  },
  {
    "id": "f0431641-4f76-4a4a-bc80-37a95f986d73",
    "name": "Duel Decks: Phyrexia vs. the Coalition Tokens",
    "year": 2010,
    "releasedAt": "2010-03-19",
    "code": "TDDE",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 784,
    "icon": {
      "alt": "Duel Decks: Phyrexia vs. the Coalition Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dde.svg?1780891200",
      "localPath": "/mtg-symbols/0784-tdde-duel-decks-phyrexia-vs-the-coalition-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdde"
  },
  {
    "id": "7fe6f402-6e57-476c-8f7b-500fd08e3099",
    "name": "Worldwake Promos",
    "year": 2010,
    "releasedAt": "2010-02-05",
    "code": "PWWK",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 785,
    "icon": {
      "alt": "Worldwake Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/wwk.svg?1780891200",
      "localPath": "/mtg-symbols/0785-pwwk-worldwake-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pwwk"
  },
  {
    "id": "066f22e0-c762-4222-8d99-ff262ead231e",
    "name": "Worldwake Tokens",
    "year": 2010,
    "releasedAt": "2010-02-05",
    "code": "TWWK",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 786,
    "icon": {
      "alt": "Worldwake Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/wwk.svg?1780891200",
      "localPath": "/mtg-symbols/0786-twwk-worldwake-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/twwk"
  },
  {
    "id": "2f248ce6-c2a5-4c6f-a2be-0c593fbe173c",
    "name": "Worldwake",
    "year": 2010,
    "releasedAt": "2010-02-05",
    "code": "WWK",
    "setType": "Expansion",
    "cardCount": 145,
    "releaseOrder": 787,
    "icon": {
      "alt": "Worldwake set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/wwk.svg?1780891200",
      "localPath": "/mtg-symbols/0787-wwk-worldwake.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wwk"
  },
  {
    "id": "0790f41d-e012-46b7-b97c-bfeda3489a4f",
    "name": "Friday Night Magic 2010",
    "year": 2010,
    "releasedAt": "2010-01-01",
    "code": "F10",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 788,
    "icon": {
      "alt": "Friday Night Magic 2010 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0788-f10-friday-night-magic-2010.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f10"
  },
  {
    "id": "f9a512bb-f2ab-4805-8480-16decaacab3a",
    "name": "Judge Gift Cards 2010",
    "year": 2010,
    "releasedAt": "2010-01-01",
    "code": "G10",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 789,
    "icon": {
      "alt": "Judge Gift Cards 2010 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0789-g10-judge-gift-cards-2010.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g10"
  },
  {
    "id": "d871e33b-7086-4549-89d6-fedd4422161f",
    "name": "Magic Player Rewards 2010",
    "year": 2010,
    "releasedAt": "2010-01-01",
    "code": "P10",
    "setType": "Promo",
    "cardCount": 13,
    "releaseOrder": 790,
    "icon": {
      "alt": "Magic Player Rewards 2010 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0790-p10-magic-player-rewards-2010.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p10"
  },
  {
    "id": "ec8ce795-db8a-44f2-83ac-d6a6914ee4db",
    "name": "Duels of the Planeswalkers 2010 Promos",
    "year": 2010,
    "releasedAt": "2010-01-01",
    "code": "PDP10",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 791,
    "icon": {
      "alt": "Duels of the Planeswalkers 2010 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmtg2.svg?1780891200",
      "localPath": "/mtg-symbols/0791-pdp10-duels-of-the-planeswalkers-2010-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdp10"
  },
  {
    "id": "40a2286d-7884-40e3-8ae2-9869266c65ee",
    "name": "Magic Premiere Shop 2010",
    "year": 2010,
    "releasedAt": "2010-01-01",
    "code": "PMPS10",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 792,
    "icon": {
      "alt": "Magic Premiere Shop 2010 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmps.svg?1780891200",
      "localPath": "/mtg-symbols/0792-pmps10-magic-premiere-shop-2010.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmps10"
  },
  {
    "id": "3a045e59-64b5-465d-9dbd-f4ddadf8f4dc",
    "name": "Premium Deck Series: Slivers",
    "year": 2009,
    "releasedAt": "2009-11-20",
    "code": "H09",
    "setType": "Premium Deck",
    "cardCount": 41,
    "releaseOrder": 793,
    "icon": {
      "alt": "Premium Deck Series: Slivers set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/h09.svg?1780891200",
      "localPath": "/mtg-symbols/0793-h09-premium-deck-series-slivers.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/h09"
  },
  {
    "id": "15f41db6-1810-475b-bf2c-24a488050a37",
    "name": "Duel Decks: Garruk vs. Liliana",
    "year": 2009,
    "releasedAt": "2009-10-30",
    "code": "DDD",
    "setType": "Duel Deck",
    "cardCount": 63,
    "releaseOrder": 794,
    "icon": {
      "alt": "Duel Decks: Garruk vs. Liliana set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddd.svg?1780891200",
      "localPath": "/mtg-symbols/0794-ddd-duel-decks-garruk-vs-liliana.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddd"
  },
  {
    "id": "bc6b3b40-d55f-44d3-9c7a-a5279cdf1fc8",
    "name": "Duel Decks: Garruk vs. Liliana Tokens",
    "year": 2009,
    "releasedAt": "2009-10-30",
    "code": "TDDD",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 795,
    "icon": {
      "alt": "Duel Decks: Garruk vs. Liliana Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddd.svg?1780891200",
      "localPath": "/mtg-symbols/0795-tddd-duel-decks-garruk-vs-liliana-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddd"
  },
  {
    "id": "b643670d-7a22-4869-b49c-89cdf9c9b627",
    "name": "Zendikar Promos",
    "year": 2009,
    "releasedAt": "2009-10-02",
    "code": "PZEN",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 796,
    "icon": {
      "alt": "Zendikar Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/zen.svg?1780891200",
      "localPath": "/mtg-symbols/0796-pzen-zendikar-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pzen"
  },
  {
    "id": "f97260a2-5fb8-4261-aedc-ce0836b01400",
    "name": "Zendikar Tokens",
    "year": 2009,
    "releasedAt": "2009-10-02",
    "code": "TZEN",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 797,
    "icon": {
      "alt": "Zendikar Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/zen.svg?1780891200",
      "localPath": "/mtg-symbols/0797-tzen-zendikar-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tzen"
  },
  {
    "id": "eb16a2bd-a218-4e4e-8339-4aa1afc0c8d2",
    "name": "Zendikar",
    "year": 2009,
    "releasedAt": "2009-10-02",
    "code": "ZEN",
    "setType": "Expansion",
    "cardCount": 269,
    "releaseOrder": 798,
    "icon": {
      "alt": "Zendikar set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/zen.svg?1780891200",
      "localPath": "/mtg-symbols/0798-zen-zendikar.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/zen"
  },
  {
    "id": "b65fb1f2-4768-4c70-8fdf-30a069ad592e",
    "name": "Masters Edition III",
    "year": 2009,
    "releasedAt": "2009-09-07",
    "code": "ME3",
    "setType": "Masters",
    "cardCount": 230,
    "releaseOrder": 799,
    "icon": {
      "alt": "Masters Edition III set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/me3.svg?1780891200",
      "localPath": "/mtg-symbols/0799-me3-masters-edition-iii.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/me3"
  },
  {
    "id": "7137ffeb-eb1d-466c-a0d3-3157f52b1b10",
    "name": "Planechase",
    "year": 2009,
    "releasedAt": "2009-09-04",
    "code": "HOP",
    "setType": "Planechase",
    "cardCount": 169,
    "releaseOrder": 800,
    "icon": {
      "alt": "Planechase set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hop.svg?1780891200",
      "localPath": "/mtg-symbols/0800-hop-planechase.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/hop"
  },
  {
    "id": "7a8b75a9-7c92-4c3f-976a-322e1eb3b6b6",
    "name": "Planechase Planes",
    "year": 2009,
    "releasedAt": "2009-09-04",
    "code": "OHOP",
    "setType": "Planechase",
    "cardCount": 40,
    "releaseOrder": 801,
    "icon": {
      "alt": "Planechase Planes set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hop.svg?1780891200",
      "localPath": "/mtg-symbols/0801-ohop-planechase-planes.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ohop"
  },
  {
    "id": "ef3f6784-a6e8-41ff-8bed-72e0c7121298",
    "name": "Planechase Promos",
    "year": 2009,
    "releasedAt": "2009-09-04",
    "code": "PHOP",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 802,
    "icon": {
      "alt": "Planechase Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0802-phop-planechase-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/phop"
  },
  {
    "id": "6254693f-c620-4e47-8bab-01085f8c3ffb",
    "name": "From the Vault: Exiled",
    "year": 2009,
    "releasedAt": "2009-08-28",
    "code": "V09",
    "setType": "From The Vault",
    "cardCount": 15,
    "releaseOrder": 803,
    "icon": {
      "alt": "From the Vault: Exiled set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/v09.svg?1780891200",
      "localPath": "/mtg-symbols/0803-v09-from-the-vault-exiled.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/v09"
  },
  {
    "id": "0dba38a9-6b9d-4768-9831-4e03e8970a0b",
    "name": "Magic 2010",
    "year": 2009,
    "releasedAt": "2009-07-17",
    "code": "M10",
    "setType": "Core",
    "cardCount": 249,
    "releaseOrder": 804,
    "icon": {
      "alt": "Magic 2010 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m10.svg?1780891200",
      "localPath": "/mtg-symbols/0804-m10-magic-2010.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/m10"
  },
  {
    "id": "6d9f49c1-4784-4fd6-a9f1-05e36e25befe",
    "name": "Magic 2010 Tokens",
    "year": 2009,
    "releasedAt": "2009-07-17",
    "code": "TM10",
    "setType": "Token",
    "cardCount": 8,
    "releaseOrder": 805,
    "icon": {
      "alt": "Magic 2010 Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m10.svg?1780891200",
      "localPath": "/mtg-symbols/0805-tm10-magic-2010-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tm10"
  },
  {
    "id": "37d3c9b9-0583-425e-8c14-10d4d4a28a57",
    "name": "Magic 2010 Promos",
    "year": 2009,
    "releasedAt": "2009-07-16",
    "code": "PM10",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 806,
    "icon": {
      "alt": "Magic 2010 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/m10.svg?1780891200",
      "localPath": "/mtg-symbols/0806-pm10-magic-2010-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pm10"
  },
  {
    "id": "db486ec5-141d-4781-9ee5-5456926934c1",
    "name": "Alara Reborn",
    "year": 2009,
    "releasedAt": "2009-04-30",
    "code": "ARB",
    "setType": "Expansion",
    "cardCount": 145,
    "releaseOrder": 807,
    "icon": {
      "alt": "Alara Reborn set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/arb.svg?1780891200",
      "localPath": "/mtg-symbols/0807-arb-alara-reborn.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/arb"
  },
  {
    "id": "352a7433-5b06-4381-99e9-fc3b6282dd2c",
    "name": "Alara Reborn Promos",
    "year": 2009,
    "releasedAt": "2009-04-30",
    "code": "PARB",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 808,
    "icon": {
      "alt": "Alara Reborn Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/arb.svg?1780891200",
      "localPath": "/mtg-symbols/0808-parb-alara-reborn-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/parb"
  },
  {
    "id": "f1c5bbc9-2b74-443f-8b26-f495f2b4de18",
    "name": "Alara Reborn Tokens",
    "year": 2009,
    "releasedAt": "2009-04-30",
    "code": "TARB",
    "setType": "Token",
    "cardCount": 4,
    "releaseOrder": 809,
    "icon": {
      "alt": "Alara Reborn Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/arb.svg?1780891200",
      "localPath": "/mtg-symbols/0809-tarb-alara-reborn-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tarb"
  },
  {
    "id": "4a1b5533-e4a3-456e-9fb1-53e754402c23",
    "name": "Duel Decks: Divine vs. Demonic",
    "year": 2009,
    "releasedAt": "2009-04-10",
    "code": "DDC",
    "setType": "Duel Deck",
    "cardCount": 62,
    "releaseOrder": 810,
    "icon": {
      "alt": "Duel Decks: Divine vs. Demonic set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddc.svg?1780891200",
      "localPath": "/mtg-symbols/0810-ddc-duel-decks-divine-vs-demonic.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ddc"
  },
  {
    "id": "4281ce5b-05ea-4ff1-a242-8c136cce5224",
    "name": "Duel Decks: Divine vs. Demonic Tokens",
    "year": 2009,
    "releasedAt": "2009-04-10",
    "code": "TDDC",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 811,
    "icon": {
      "alt": "Duel Decks: Divine vs. Demonic Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ddc.svg?1780891200",
      "localPath": "/mtg-symbols/0811-tddc-duel-decks-divine-vs-demonic-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tddc"
  },
  {
    "id": "a9fbcd3c-290f-4fa1-b227-dbab037c0c91",
    "name": "URL/Convention Promos",
    "year": 2009,
    "releasedAt": "2009-02-08",
    "code": "PURL",
    "setType": "Promo",
    "cardCount": 16,
    "releaseOrder": 812,
    "icon": {
      "alt": "URL/Convention Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0812-purl-url-convention-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/purl"
  },
  {
    "id": "76b2db58-904c-4e49-8580-9f62f7b3cca4",
    "name": "Conflux",
    "year": 2009,
    "releasedAt": "2009-02-06",
    "code": "CON",
    "setType": "Expansion",
    "cardCount": 145,
    "releaseOrder": 813,
    "icon": {
      "alt": "Conflux set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/con.svg?1780891200",
      "localPath": "/mtg-symbols/0813-con-conflux.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/con"
  },
  {
    "id": "0ce7fd53-7c14-4d16-a4c3-5c47ad8a8e5b",
    "name": "Conflux Promos",
    "year": 2009,
    "releasedAt": "2009-02-06",
    "code": "PCON",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 814,
    "icon": {
      "alt": "Conflux Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/con.svg?1780891200",
      "localPath": "/mtg-symbols/0814-pcon-conflux-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pcon"
  },
  {
    "id": "a7f9ec0e-e886-46d2-9857-4546c8e6fd32",
    "name": "Conflux Tokens",
    "year": 2009,
    "releasedAt": "2009-02-06",
    "code": "TCON",
    "setType": "Token",
    "cardCount": 2,
    "releaseOrder": 815,
    "icon": {
      "alt": "Conflux Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/con.svg?1780891200",
      "localPath": "/mtg-symbols/0815-tcon-conflux-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tcon"
  },
  {
    "id": "a540bc4f-d0c3-4758-9636-547ec9df7fc9",
    "name": "Friday Night Magic 2009",
    "year": 2009,
    "releasedAt": "2009-01-01",
    "code": "F09",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 816,
    "icon": {
      "alt": "Friday Night Magic 2009 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0816-f09-friday-night-magic-2009.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f09"
  },
  {
    "id": "cf3a6c7e-f8e1-4c3f-95da-8b4ad094f489",
    "name": "Judge Gift Cards 2009",
    "year": 2009,
    "releasedAt": "2009-01-01",
    "code": "G09",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 817,
    "icon": {
      "alt": "Judge Gift Cards 2009 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0817-g09-judge-gift-cards-2009.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g09"
  },
  {
    "id": "824eec08-e609-41db-8de4-4e58d8aeb37d",
    "name": "Magic Player Rewards 2009",
    "year": 2009,
    "releasedAt": "2009-01-01",
    "code": "P09",
    "setType": "Promo",
    "cardCount": 13,
    "releaseOrder": 818,
    "icon": {
      "alt": "Magic Player Rewards 2009 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0818-p09-magic-player-rewards-2009.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p09"
  },
  {
    "id": "b827a610-c075-4f3c-aa35-11bd10981fa8",
    "name": "Duels of the Planeswalkers 2009 Promos",
    "year": 2009,
    "releasedAt": "2009-01-01",
    "code": "PDTP",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 819,
    "icon": {
      "alt": "Duels of the Planeswalkers 2009 Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pxbox.svg?1780891200",
      "localPath": "/mtg-symbols/0819-pdtp-duels-of-the-planeswalkers-2009-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdtp"
  },
  {
    "id": "f70dfde4-9b8e-4a3c-b773-c93725776508",
    "name": "Magic Premiere Shop 2009",
    "year": 2009,
    "releasedAt": "2009-01-01",
    "code": "PMPS09",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 820,
    "icon": {
      "alt": "Magic Premiere Shop 2009 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmps.svg?1780891200",
      "localPath": "/mtg-symbols/0820-pmps09-magic-premiere-shop-2009.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmps09"
  },
  {
    "id": "7161cc1c-adbd-479c-9125-df4c40b0e3ad",
    "name": "Duel Decks: Jace vs. Chandra",
    "year": 2008,
    "releasedAt": "2008-11-07",
    "code": "DD2",
    "setType": "Duel Deck",
    "cardCount": 64,
    "releaseOrder": 821,
    "icon": {
      "alt": "Duel Decks: Jace vs. Chandra set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dd2.svg?1780891200",
      "localPath": "/mtg-symbols/0821-dd2-duel-decks-jace-vs-chandra.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dd2"
  },
  {
    "id": "596b1b68-c669-44e8-8163-5a5e272f77e8",
    "name": "Duel Decks: Jace vs. Chandra Tokens",
    "year": 2008,
    "releasedAt": "2008-11-07",
    "code": "TDD2",
    "setType": "Token",
    "cardCount": 1,
    "releaseOrder": 822,
    "icon": {
      "alt": "Duel Decks: Jace vs. Chandra Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dd2.svg?1780891200",
      "localPath": "/mtg-symbols/0822-tdd2-duel-decks-jace-vs-chandra-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdd2"
  },
  {
    "id": "d667aaec-09b7-4406-b6fa-60795132dc11",
    "name": "Shards of Alara",
    "year": 2008,
    "releasedAt": "2008-10-03",
    "code": "ALA",
    "setType": "Expansion",
    "cardCount": 250,
    "releaseOrder": 823,
    "icon": {
      "alt": "Shards of Alara set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ala.svg?1780891200",
      "localPath": "/mtg-symbols/0823-ala-shards-of-alara.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ala"
  },
  {
    "id": "f31d9028-0a82-4d31-b874-4fdde618948e",
    "name": "Shards of Alara Promos",
    "year": 2008,
    "releasedAt": "2008-10-03",
    "code": "PALA",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 824,
    "icon": {
      "alt": "Shards of Alara Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ala.svg?1780891200",
      "localPath": "/mtg-symbols/0824-pala-shards-of-alara-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pala"
  },
  {
    "id": "835956e2-d0ea-4219-b77e-b439208d0655",
    "name": "Shards of Alara Tokens",
    "year": 2008,
    "releasedAt": "2008-10-03",
    "code": "TALA",
    "setType": "Token",
    "cardCount": 10,
    "releaseOrder": 825,
    "icon": {
      "alt": "Shards of Alara Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ala.svg?1780891200",
      "localPath": "/mtg-symbols/0825-tala-shards-of-alara-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tala"
  },
  {
    "id": "7d51a13b-dcd2-4ec2-b3a7-c89288e00b4e",
    "name": "Masters Edition II",
    "year": 2008,
    "releasedAt": "2008-09-22",
    "code": "ME2",
    "setType": "Masters",
    "cardCount": 245,
    "releaseOrder": 826,
    "icon": {
      "alt": "Masters Edition II set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/me2.svg?1780891200",
      "localPath": "/mtg-symbols/0826-me2-masters-edition-ii.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/me2"
  },
  {
    "id": "c1cec8aa-5906-41d9-ae01-cbdde2e776fb",
    "name": "From the Vault: Dragons",
    "year": 2008,
    "releasedAt": "2008-08-29",
    "code": "DRB",
    "setType": "From The Vault",
    "cardCount": 15,
    "releaseOrder": 827,
    "icon": {
      "alt": "From the Vault: Dragons set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/drb.svg?1780891200",
      "localPath": "/mtg-symbols/0827-drb-from-the-vault-dragons.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/drb"
  },
  {
    "id": "86b4dfef-f2d1-49d6-825d-7df6bda44357",
    "name": "Eventide",
    "year": 2008,
    "releasedAt": "2008-07-25",
    "code": "EVE",
    "setType": "Expansion",
    "cardCount": 180,
    "releaseOrder": 828,
    "icon": {
      "alt": "Eventide set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eve.svg?1780891200",
      "localPath": "/mtg-symbols/0828-eve-eventide.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/eve"
  },
  {
    "id": "67920ddd-5260-42c0-831e-acbd7e135dd3",
    "name": "Eventide Promos",
    "year": 2008,
    "releasedAt": "2008-07-25",
    "code": "PEVE",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 829,
    "icon": {
      "alt": "Eventide Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eve.svg?1780891200",
      "localPath": "/mtg-symbols/0829-peve-eventide-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/peve"
  },
  {
    "id": "107e2bde-bf04-42e9-ab9d-44175d1bebe7",
    "name": "Eventide Tokens",
    "year": 2008,
    "releasedAt": "2008-07-25",
    "code": "TEVE",
    "setType": "Token",
    "cardCount": 7,
    "releaseOrder": 830,
    "icon": {
      "alt": "Eventide Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/eve.svg?1780891200",
      "localPath": "/mtg-symbols/0830-teve-eventide-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/teve"
  },
  {
    "id": "785c5919-8fbc-4ab9-a59f-51ee189b84d2",
    "name": "Shadowmoor Promos",
    "year": 2008,
    "releasedAt": "2008-05-02",
    "code": "PSHM",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 831,
    "icon": {
      "alt": "Shadowmoor Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/shm.svg?1780891200",
      "localPath": "/mtg-symbols/0831-pshm-shadowmoor-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pshm"
  },
  {
    "id": "c18c0ba1-2081-4808-9b2e-549bc3a666f3",
    "name": "Shadowmoor",
    "year": 2008,
    "releasedAt": "2008-05-02",
    "code": "SHM",
    "setType": "Expansion",
    "cardCount": 302,
    "releaseOrder": 832,
    "icon": {
      "alt": "Shadowmoor set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/shm.svg?1780891200",
      "localPath": "/mtg-symbols/0832-shm-shadowmoor.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/shm"
  },
  {
    "id": "2dd7782a-5e58-4338-81ff-0841c66ee647",
    "name": "Shadowmoor Tokens",
    "year": 2008,
    "releasedAt": "2008-05-02",
    "code": "TSHM",
    "setType": "Token",
    "cardCount": 12,
    "releaseOrder": 833,
    "icon": {
      "alt": "Shadowmoor Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/shm.svg?1780891200",
      "localPath": "/mtg-symbols/0833-tshm-shadowmoor-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tshm"
  },
  {
    "id": "09c785bc-370d-4746-b618-c22d767cb34f",
    "name": "15th Anniversary Cards",
    "year": 2008,
    "releasedAt": "2008-04-01",
    "code": "P15A",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 834,
    "icon": {
      "alt": "15th Anniversary Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0834-p15a-15th-anniversary-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p15a"
  },
  {
    "id": "c41550df-7b41-41a3-85ab-8612eb2f168f",
    "name": "Morningtide",
    "year": 2008,
    "releasedAt": "2008-02-01",
    "code": "MOR",
    "setType": "Expansion",
    "cardCount": 150,
    "releaseOrder": 835,
    "icon": {
      "alt": "Morningtide set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mor.svg?1780891200",
      "localPath": "/mtg-symbols/0835-mor-morningtide.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mor"
  },
  {
    "id": "9bd20131-fe8c-4a5d-9841-7347024ca54a",
    "name": "Morningtide Promos",
    "year": 2008,
    "releasedAt": "2008-02-01",
    "code": "PMOR",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 836,
    "icon": {
      "alt": "Morningtide Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mor.svg?1780891200",
      "localPath": "/mtg-symbols/0836-pmor-morningtide-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmor"
  },
  {
    "id": "cf25354d-817d-4756-b786-604ac93ba3b7",
    "name": "Morningtide Tokens",
    "year": 2008,
    "releasedAt": "2008-02-01",
    "code": "TMOR",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 837,
    "icon": {
      "alt": "Morningtide Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mor.svg?1780891200",
      "localPath": "/mtg-symbols/0837-tmor-morningtide-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmor"
  },
  {
    "id": "1d9c28af-5035-4b6d-9944-62b51cfd688d",
    "name": "Friday Night Magic 2008",
    "year": 2008,
    "releasedAt": "2008-01-01",
    "code": "F08",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 838,
    "icon": {
      "alt": "Friday Night Magic 2008 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0838-f08-friday-night-magic-2008.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f08"
  },
  {
    "id": "587e3ddb-7ffd-4e17-85e0-7846846d677f",
    "name": "Judge Gift Cards 2008",
    "year": 2008,
    "releasedAt": "2008-01-01",
    "code": "G08",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 839,
    "icon": {
      "alt": "Judge Gift Cards 2008 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0839-g08-judge-gift-cards-2008.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g08"
  },
  {
    "id": "6c1d0a31-b5d2-421d-95f4-5816382f764f",
    "name": "Magic Player Rewards 2008",
    "year": 2008,
    "releasedAt": "2008-01-01",
    "code": "P08",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 840,
    "icon": {
      "alt": "Magic Player Rewards 2008 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0840-p08-magic-player-rewards-2008.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p08"
  },
  {
    "id": "bfaa9b8b-d62e-4c8a-9f26-7ad85bdf519f",
    "name": "Magic Premiere Shop 2008",
    "year": 2008,
    "releasedAt": "2008-01-01",
    "code": "PMPS08",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 841,
    "icon": {
      "alt": "Magic Premiere Shop 2008 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmps.svg?1780891200",
      "localPath": "/mtg-symbols/0841-pmps08-magic-premiere-shop-2008.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmps08"
  },
  {
    "id": "94bd6d6b-a3df-4f03-b25f-ee3f57f7f2da",
    "name": "Duel Decks: Elves vs. Goblins",
    "year": 2007,
    "releasedAt": "2007-11-16",
    "code": "DD1",
    "setType": "Duel Deck",
    "cardCount": 62,
    "releaseOrder": 842,
    "icon": {
      "alt": "Duel Decks: Elves vs. Goblins set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dd1.svg?1780891200",
      "localPath": "/mtg-symbols/0842-dd1-duel-decks-elves-vs-goblins.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dd1"
  },
  {
    "id": "005f56a5-9661-4bd1-bf05-cf133ccdcdcf",
    "name": "Duel Decks: Elves vs. Goblins Tokens",
    "year": 2007,
    "releasedAt": "2007-11-16",
    "code": "TDD1",
    "setType": "Token",
    "cardCount": 3,
    "releaseOrder": 843,
    "icon": {
      "alt": "Duel Decks: Elves vs. Goblins Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dd1.svg?1780891200",
      "localPath": "/mtg-symbols/0843-tdd1-duel-decks-elves-vs-goblins-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tdd1"
  },
  {
    "id": "30ec97cb-dca9-4bf4-a98b-310f9d8ceaff",
    "name": "Lorwyn",
    "year": 2007,
    "releasedAt": "2007-10-12",
    "code": "LRW",
    "setType": "Expansion",
    "cardCount": 301,
    "releaseOrder": 844,
    "icon": {
      "alt": "Lorwyn set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lrw.svg?1780891200",
      "localPath": "/mtg-symbols/0844-lrw-lorwyn.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/lrw"
  },
  {
    "id": "091fc340-30ea-4054-a013-44bc345b9c9e",
    "name": "Lorwyn Promos",
    "year": 2007,
    "releasedAt": "2007-10-12",
    "code": "PLRW",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 845,
    "icon": {
      "alt": "Lorwyn Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lrw.svg?1780891200",
      "localPath": "/mtg-symbols/0845-plrw-lorwyn-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plrw"
  },
  {
    "id": "bfd36a58-a297-44e8-9421-3010f541eec9",
    "name": "Lorwyn Tokens",
    "year": 2007,
    "releasedAt": "2007-10-12",
    "code": "TLRW",
    "setType": "Token",
    "cardCount": 11,
    "releaseOrder": 846,
    "icon": {
      "alt": "Lorwyn Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lrw.svg?1780891200",
      "localPath": "/mtg-symbols/0846-tlrw-lorwyn-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tlrw"
  },
  {
    "id": "407d388d-1abf-4c1d-b0c6-f56280898a1a",
    "name": "Masters Edition",
    "year": 2007,
    "releasedAt": "2007-09-10",
    "code": "ME1",
    "setType": "Masters",
    "cardCount": 195,
    "releaseOrder": 847,
    "icon": {
      "alt": "Masters Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/me1.svg?1780891200",
      "localPath": "/mtg-symbols/0847-me1-masters-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/me1"
  },
  {
    "id": "a66a6124-0d81-488d-b080-91f5ba7fbad0",
    "name": "Tenth Edition",
    "year": 2007,
    "releasedAt": "2007-07-13",
    "code": "10E",
    "setType": "Core",
    "cardCount": 510,
    "releaseOrder": 848,
    "icon": {
      "alt": "Tenth Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/10e.svg?1780891200",
      "localPath": "/mtg-symbols/0848-10e-tenth-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/10e"
  },
  {
    "id": "b147ad00-d7c9-4a15-bb2a-8cef5aa620ce",
    "name": "Tenth Edition Promos",
    "year": 2007,
    "releasedAt": "2007-07-13",
    "code": "P10E",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 849,
    "icon": {
      "alt": "Tenth Edition Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/10e.svg?1780891200",
      "localPath": "/mtg-symbols/0849-p10e-tenth-edition-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p10e"
  },
  {
    "id": "751d03a0-bd98-406c-9c5a-307ab95d50bb",
    "name": "Tenth Edition Tokens",
    "year": 2007,
    "releasedAt": "2007-07-13",
    "code": "T10E",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 850,
    "icon": {
      "alt": "Tenth Edition Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/10e.svg?1780891200",
      "localPath": "/mtg-symbols/0850-t10e-tenth-edition-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/t10e"
  },
  {
    "id": "bf951ddb-4445-4923-87cb-3fe4ac3c6b9a",
    "name": "Future Sight",
    "year": 2007,
    "releasedAt": "2007-05-04",
    "code": "FUT",
    "setType": "Expansion",
    "cardCount": 180,
    "releaseOrder": 851,
    "icon": {
      "alt": "Future Sight set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fut.svg?1780891200",
      "localPath": "/mtg-symbols/0851-fut-future-sight.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fut"
  },
  {
    "id": "9d290d54-2aec-4d5e-8ffc-c9714f4437d4",
    "name": "Future Sight Promos",
    "year": 2007,
    "releasedAt": "2007-05-04",
    "code": "PFUT",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 852,
    "icon": {
      "alt": "Future Sight Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fut.svg?1780891200",
      "localPath": "/mtg-symbols/0852-pfut-future-sight-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pfut"
  },
  {
    "id": "08e04147-c201-4c75-9b30-a566164ecaf3",
    "name": "Grand Prix Promos",
    "year": 2007,
    "releasedAt": "2007-02-24",
    "code": "PGPX",
    "setType": "Promo",
    "cardCount": 20,
    "releaseOrder": 853,
    "icon": {
      "alt": "Grand Prix Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0853-pgpx-grand-prix-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pgpx"
  },
  {
    "id": "e82b640d-bacf-41a5-8cf9-85e1ffeee71e",
    "name": "Pro Tour Promos",
    "year": 2007,
    "releasedAt": "2007-02-09",
    "code": "PPRO",
    "setType": "Promo",
    "cardCount": 18,
    "releaseOrder": 854,
    "icon": {
      "alt": "Pro Tour Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0854-ppro-pro-tour-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ppro"
  },
  {
    "id": "5a1b571c-73e9-4c14-b9d4-a62507d85789",
    "name": "Planar Chaos",
    "year": 2007,
    "releasedAt": "2007-02-02",
    "code": "PLC",
    "setType": "Expansion",
    "cardCount": 165,
    "releaseOrder": 855,
    "icon": {
      "alt": "Planar Chaos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/plc.svg?1780891200",
      "localPath": "/mtg-symbols/0855-plc-planar-chaos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plc"
  },
  {
    "id": "f4e4582f-0ae8-42d7-acb7-49c29958a25e",
    "name": "Planar Chaos Promos",
    "year": 2007,
    "releasedAt": "2007-02-02",
    "code": "PPLC",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 856,
    "icon": {
      "alt": "Planar Chaos Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/plc.svg?1780891200",
      "localPath": "/mtg-symbols/0856-pplc-planar-chaos-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pplc"
  },
  {
    "id": "1afde513-cf57-40a6-9e4b-aab815dad104",
    "name": "Friday Night Magic 2007",
    "year": 2007,
    "releasedAt": "2007-01-01",
    "code": "F07",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 857,
    "icon": {
      "alt": "Friday Night Magic 2007 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0857-f07-friday-night-magic-2007.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f07"
  },
  {
    "id": "4624619f-b5bf-4822-b364-8385a09a69da",
    "name": "Judge Gift Cards 2007",
    "year": 2007,
    "releasedAt": "2007-01-01",
    "code": "G07",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 858,
    "icon": {
      "alt": "Judge Gift Cards 2007 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0858-g07-judge-gift-cards-2007.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g07"
  },
  {
    "id": "c1a38fe6-73f4-4414-897b-f1215a7c948f",
    "name": "Magic Player Rewards 2007",
    "year": 2007,
    "releasedAt": "2007-01-01",
    "code": "P07",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 859,
    "icon": {
      "alt": "Magic Player Rewards 2007 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0859-p07-magic-player-rewards-2007.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p07"
  },
  {
    "id": "08e31fdf-eb5e-4acd-92ca-b4e9701458a6",
    "name": "Magic Premiere Shop 2007",
    "year": 2007,
    "releasedAt": "2007-01-01",
    "code": "PMPS07",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 860,
    "icon": {
      "alt": "Magic Premiere Shop 2007 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmps.svg?1780891200",
      "localPath": "/mtg-symbols/0860-pmps07-magic-premiere-shop-2007.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmps07"
  },
  {
    "id": "5ba8edcc-a729-4023-8a68-0280ad19337e",
    "name": "Happy Holidays",
    "year": 2006,
    "releasedAt": "2006-12-31",
    "code": "HHO",
    "setType": "Funny",
    "cardCount": 23,
    "releaseOrder": 861,
    "icon": {
      "alt": "Happy Holidays set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/0861-hho-happy-holidays.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/hho"
  },
  {
    "id": "666d27e3-224d-4782-8a00-663c9c352837",
    "name": "Time Spiral Promos",
    "year": 2006,
    "releasedAt": "2006-10-06",
    "code": "PTSP",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 862,
    "icon": {
      "alt": "Time Spiral Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tsp.svg?1780891200",
      "localPath": "/mtg-symbols/0862-ptsp-time-spiral-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptsp"
  },
  {
    "id": "6519be58-b8cb-4cd7-9f5b-4db23364715b",
    "name": "Time Spiral Timeshifted",
    "year": 2006,
    "releasedAt": "2006-10-06",
    "code": "TSB",
    "setType": "Expansion",
    "cardCount": 121,
    "releaseOrder": 863,
    "icon": {
      "alt": "Time Spiral Timeshifted set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tsp.svg?1780891200",
      "localPath": "/mtg-symbols/0863-tsb-time-spiral-timeshifted.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tsb"
  },
  {
    "id": "c1d109bc-ffd8-428f-8d7d-3f8d7e648046",
    "name": "Time Spiral",
    "year": 2006,
    "releasedAt": "2006-10-06",
    "code": "TSP",
    "setType": "Expansion",
    "cardCount": 301,
    "releaseOrder": 864,
    "icon": {
      "alt": "Time Spiral set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tsp.svg?1780891200",
      "localPath": "/mtg-symbols/0864-tsp-time-spiral.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tsp"
  },
  {
    "id": "1f4f105f-73e4-4f03-849e-82a204807847",
    "name": "Coldsnap",
    "year": 2006,
    "releasedAt": "2006-07-21",
    "code": "CSP",
    "setType": "Expansion",
    "cardCount": 155,
    "releaseOrder": 865,
    "icon": {
      "alt": "Coldsnap set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/csp.svg?1780891200",
      "localPath": "/mtg-symbols/0865-csp-coldsnap.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/csp"
  },
  {
    "id": "fd92cc13-e08d-4793-ae51-c4bd5e98210f",
    "name": "Coldsnap Theme Decks",
    "year": 2006,
    "releasedAt": "2006-07-21",
    "code": "CST",
    "setType": "Box",
    "cardCount": 62,
    "releaseOrder": 866,
    "icon": {
      "alt": "Coldsnap Theme Decks set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/csp.svg?1780891200",
      "localPath": "/mtg-symbols/0866-cst-coldsnap-theme-decks.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cst"
  },
  {
    "id": "77cab0a2-267d-47b0-b5ef-2ccdc692f198",
    "name": "Coldsnap Promos",
    "year": 2006,
    "releasedAt": "2006-07-21",
    "code": "PCSP",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 867,
    "icon": {
      "alt": "Coldsnap Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/csp.svg?1780891200",
      "localPath": "/mtg-symbols/0867-pcsp-coldsnap-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pcsp"
  },
  {
    "id": "fdebeda1-b95f-4343-8a94-d125821e6b5c",
    "name": "Dissension",
    "year": 2006,
    "releasedAt": "2006-05-05",
    "code": "DIS",
    "setType": "Expansion",
    "cardCount": 180,
    "releaseOrder": 868,
    "icon": {
      "alt": "Dissension set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dis.svg?1780891200",
      "localPath": "/mtg-symbols/0868-dis-dissension.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dis"
  },
  {
    "id": "7dba077a-f97b-4308-b39f-9a1132550f27",
    "name": "Dissension Promos",
    "year": 2006,
    "releasedAt": "2006-05-05",
    "code": "PDIS",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 869,
    "icon": {
      "alt": "Dissension Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dis.svg?1780891200",
      "localPath": "/mtg-symbols/0869-pdis-dissension-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdis"
  },
  {
    "id": "3bbd8312-611e-4479-9658-ac96482b97ae",
    "name": "Champs and States",
    "year": 2006,
    "releasedAt": "2006-03-18",
    "code": "PCMP",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 870,
    "icon": {
      "alt": "Champs and States set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0870-pcmp-champs-and-states.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pcmp"
  },
  {
    "id": "594b4d09-8ce1-494d-bdb2-842c124bd087",
    "name": "Guildpact",
    "year": 2006,
    "releasedAt": "2006-02-03",
    "code": "GPT",
    "setType": "Expansion",
    "cardCount": 167,
    "releaseOrder": 871,
    "icon": {
      "alt": "Guildpact set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gpt.svg?1780891200",
      "localPath": "/mtg-symbols/0871-gpt-guildpact.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/gpt"
  },
  {
    "id": "a77ddc05-da91-4dce-b564-bfb13766d23b",
    "name": "Guildpact Promos",
    "year": 2006,
    "releasedAt": "2006-02-03",
    "code": "PGPT",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 872,
    "icon": {
      "alt": "Guildpact Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/gpt.svg?1780891200",
      "localPath": "/mtg-symbols/0872-pgpt-guildpact-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pgpt"
  },
  {
    "id": "935e91e9-61c2-4b35-a85a-c08fef3b420b",
    "name": "DCI Promos",
    "year": 2006,
    "releasedAt": "2006-01-01",
    "code": "DCI",
    "setType": "Promo",
    "cardCount": 80,
    "releaseOrder": 873,
    "icon": {
      "alt": "DCI Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0873-dci-dci-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dci"
  },
  {
    "id": "40b38065-0746-4679-89c4-172197bba904",
    "name": "Friday Night Magic 2006",
    "year": 2006,
    "releasedAt": "2006-01-01",
    "code": "F06",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 874,
    "icon": {
      "alt": "Friday Night Magic 2006 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0874-f06-friday-night-magic-2006.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f06"
  },
  {
    "id": "be42d9f4-d1af-4b58-8efa-99484f478022",
    "name": "Judge Gift Cards 2006",
    "year": 2006,
    "releasedAt": "2006-01-01",
    "code": "G06",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 875,
    "icon": {
      "alt": "Judge Gift Cards 2006 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0875-g06-judge-gift-cards-2006.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g06"
  },
  {
    "id": "619f656b-94dc-4772-bc99-62bac48f1eb9",
    "name": "Magic Player Rewards 2006",
    "year": 2006,
    "releasedAt": "2006-01-01",
    "code": "P06",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 876,
    "icon": {
      "alt": "Magic Player Rewards 2006 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0876-p06-magic-player-rewards-2006.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p06"
  },
  {
    "id": "db0343a8-d158-41dc-bef4-38477d42a579",
    "name": "Arena League 2006",
    "year": 2006,
    "releasedAt": "2006-01-01",
    "code": "PAL06",
    "setType": "Promo",
    "cardCount": 9,
    "releaseOrder": 877,
    "icon": {
      "alt": "Arena League 2006 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/parl.svg?1780891200",
      "localPath": "/mtg-symbols/0877-pal06-arena-league-2006.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pal06"
  },
  {
    "id": "ff711291-dc0f-4b9a-bd3d-663428550d55",
    "name": "Hachette UK",
    "year": 2006,
    "releasedAt": "2006-01-01",
    "code": "PHUK",
    "setType": "Box",
    "cardCount": 60,
    "releaseOrder": 878,
    "icon": {
      "alt": "Hachette UK set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/phuk.svg?1780891200",
      "localPath": "/mtg-symbols/0878-phuk-hachette-uk.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/phuk"
  },
  {
    "id": "fc8c6e1b-73fa-430f-b4d9-a6483369ee26",
    "name": "Junior APAC Series",
    "year": 2006,
    "releasedAt": "2006-01-01",
    "code": "PJAS",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 879,
    "icon": {
      "alt": "Junior APAC Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0879-pjas-junior-apac-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pjas"
  },
  {
    "id": "7d536fe7-6170-42b4-bdb5-6a05b800a839",
    "name": "Magic Premiere Shop 2006",
    "year": 2006,
    "releasedAt": "2006-01-01",
    "code": "PMPS06",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 880,
    "icon": {
      "alt": "Magic Premiere Shop 2006 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmtg2.svg?1780891200",
      "localPath": "/mtg-symbols/0880-pmps06-magic-premiere-shop-2006.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmps06"
  },
  {
    "id": "0f5b91bf-e0bd-444b-82b5-03906ba86e88",
    "name": "Two-Headed Giant Tournament",
    "year": 2005,
    "releasedAt": "2005-12-09",
    "code": "P2HG",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 881,
    "icon": {
      "alt": "Two-Headed Giant Tournament set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0881-p2hg-two-headed-giant-tournament.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p2hg"
  },
  {
    "id": "7fc829b2-1406-43ff-b741-ea815ecdce02",
    "name": "Magic Premiere Shop 2005",
    "year": 2005,
    "releasedAt": "2005-10-07",
    "code": "PMPS",
    "setType": "Promo",
    "cardCount": 20,
    "releaseOrder": 882,
    "icon": {
      "alt": "Magic Premiere Shop 2005 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rav.svg?1780891200",
      "localPath": "/mtg-symbols/0882-pmps-magic-premiere-shop-2005.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmps"
  },
  {
    "id": "bc3c3b61-352b-4dc4-8383-415b9ad1845b",
    "name": "Ravnica: City of Guilds Promos",
    "year": 2005,
    "releasedAt": "2005-10-07",
    "code": "PRAV",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 883,
    "icon": {
      "alt": "Ravnica: City of Guilds Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rav.svg?1780891200",
      "localPath": "/mtg-symbols/0883-prav-ravnica-city-of-guilds-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/prav"
  },
  {
    "id": "15fccbe8-2825-41ca-9d0a-67aebdf91c4a",
    "name": "Ravnica: City of Guilds",
    "year": 2005,
    "releasedAt": "2005-10-07",
    "code": "RAV",
    "setType": "Expansion",
    "cardCount": 306,
    "releaseOrder": 884,
    "icon": {
      "alt": "Ravnica: City of Guilds set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rav.svg?1780891200",
      "localPath": "/mtg-symbols/0884-rav-ravnica-city-of-guilds.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/rav"
  },
  {
    "id": "1132e6a3-d93a-4ed1-8724-ad5e8e5a1d41",
    "name": "Salvat 2005",
    "year": 2005,
    "releasedAt": "2005-08-22",
    "code": "PSAL",
    "setType": "Box",
    "cardCount": 720,
    "releaseOrder": 885,
    "icon": {
      "alt": "Salvat 2005 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/phuk.svg?1780891200",
      "localPath": "/mtg-symbols/0885-psal-salvat-2005.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psal"
  },
  {
    "id": "e70c8572-4732-4e92-a140-b4e3c1c84c93",
    "name": "Ninth Edition",
    "year": 2005,
    "releasedAt": "2005-07-29",
    "code": "9ED",
    "setType": "Core",
    "cardCount": 710,
    "releaseOrder": 886,
    "icon": {
      "alt": "Ninth Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/9ed.svg?1780891200",
      "localPath": "/mtg-symbols/0886-9ed-ninth-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/9ed"
  },
  {
    "id": "e55f6145-ebd1-4e6d-b72a-7aab9ed7b058",
    "name": "Ninth Edition Promos",
    "year": 2005,
    "releasedAt": "2005-07-29",
    "code": "P9ED",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 887,
    "icon": {
      "alt": "Ninth Edition Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/9ed.svg?1780891200",
      "localPath": "/mtg-symbols/0887-p9ed-ninth-edition-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p9ed"
  },
  {
    "id": "31daa10a-9490-42aa-a630-1a9c2d9ae492",
    "name": "Saviors of Kamigawa Promos",
    "year": 2005,
    "releasedAt": "2005-06-03",
    "code": "PSOK",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 888,
    "icon": {
      "alt": "Saviors of Kamigawa Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sok.svg?1780891200",
      "localPath": "/mtg-symbols/0888-psok-saviors-of-kamigawa-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psok"
  },
  {
    "id": "4db16ad3-2b95-442f-bb6b-e9aa7fe7f769",
    "name": "Saviors of Kamigawa",
    "year": 2005,
    "releasedAt": "2005-06-03",
    "code": "SOK",
    "setType": "Expansion",
    "cardCount": 165,
    "releaseOrder": 889,
    "icon": {
      "alt": "Saviors of Kamigawa set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sok.svg?1780891200",
      "localPath": "/mtg-symbols/0889-sok-saviors-of-kamigawa.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sok"
  },
  {
    "id": "d4b88587-a1f5-4b47-9e24-78ec9e57bd0e",
    "name": "Betrayers of Kamigawa",
    "year": 2005,
    "releasedAt": "2005-02-04",
    "code": "BOK",
    "setType": "Expansion",
    "cardCount": 165,
    "releaseOrder": 890,
    "icon": {
      "alt": "Betrayers of Kamigawa set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bok.svg?1780891200",
      "localPath": "/mtg-symbols/0890-bok-betrayers-of-kamigawa.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/bok"
  },
  {
    "id": "34e1a029-1103-4e95-aafb-02949a6780b4",
    "name": "Betrayers of Kamigawa Promos",
    "year": 2005,
    "releasedAt": "2005-02-04",
    "code": "PBOK",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 891,
    "icon": {
      "alt": "Betrayers of Kamigawa Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/bok.svg?1780891200",
      "localPath": "/mtg-symbols/0891-pbok-betrayers-of-kamigawa-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pbok"
  },
  {
    "id": "ff1a761c-57d0-45b5-be9f-16019ce0f652",
    "name": "Friday Night Magic 2005",
    "year": 2005,
    "releasedAt": "2005-01-01",
    "code": "F05",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 892,
    "icon": {
      "alt": "Friday Night Magic 2005 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0892-f05-friday-night-magic-2005.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f05"
  },
  {
    "id": "0a722d87-0ce5-46e5-94e1-6f58f931a381",
    "name": "Judge Gift Cards 2005",
    "year": 2005,
    "releasedAt": "2005-01-01",
    "code": "G05",
    "setType": "Promo",
    "cardCount": 4,
    "releaseOrder": 893,
    "icon": {
      "alt": "Judge Gift Cards 2005 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0893-g05-judge-gift-cards-2005.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g05"
  },
  {
    "id": "e7f182b7-cd28-46de-bce8-223e83a78ae0",
    "name": "Magic Player Rewards 2005",
    "year": 2005,
    "releasedAt": "2005-01-01",
    "code": "P05",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 894,
    "icon": {
      "alt": "Magic Player Rewards 2005 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0894-p05-magic-player-rewards-2005.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p05"
  },
  {
    "id": "16b62eb1-0cab-47c9-a0c2-be6e781ece03",
    "name": "Arena League 2005",
    "year": 2005,
    "releasedAt": "2005-01-01",
    "code": "PAL05",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 895,
    "icon": {
      "alt": "Arena League 2005 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/parl.svg?1780891200",
      "localPath": "/mtg-symbols/0895-pal05-arena-league-2005.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pal05"
  },
  {
    "id": "fd4b6116-533a-4e70-98df-f0131a67f1dc",
    "name": "Junior Series Europe",
    "year": 2005,
    "releasedAt": "2005-01-01",
    "code": "PJSE",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 896,
    "icon": {
      "alt": "Junior Series Europe set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0896-pjse-junior-series-europe.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pjse"
  },
  {
    "id": "eb16c832-baf5-4a7c-ac8b-3c35b31aa6df",
    "name": "Unhinged Promos",
    "year": 2004,
    "releasedAt": "2004-11-19",
    "code": "PUNH",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 897,
    "icon": {
      "alt": "Unhinged Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/unh.svg?1780891200",
      "localPath": "/mtg-symbols/0897-punh-unhinged-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/punh"
  },
  {
    "id": "4c8bc76a-05a5-43db-aaf0-34deb347b871",
    "name": "Unhinged",
    "year": 2004,
    "releasedAt": "2004-11-19",
    "code": "UNH",
    "setType": "Funny",
    "cardCount": 168,
    "releaseOrder": 898,
    "icon": {
      "alt": "Unhinged set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/unh.svg?1780891200",
      "localPath": "/mtg-symbols/0898-unh-unhinged.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/unh"
  },
  {
    "id": "6183d21f-a0af-4118-ba58-aca1d8719c01",
    "name": "Champions of Kamigawa",
    "year": 2004,
    "releasedAt": "2004-10-01",
    "code": "CHK",
    "setType": "Expansion",
    "cardCount": 307,
    "releaseOrder": 899,
    "icon": {
      "alt": "Champions of Kamigawa set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/chk.svg?1780891200",
      "localPath": "/mtg-symbols/0899-chk-champions-of-kamigawa.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/chk"
  },
  {
    "id": "57b23d04-034d-4d04-ba0e-524b6ba03eb7",
    "name": "Champions of Kamigawa Promos",
    "year": 2004,
    "releasedAt": "2004-10-01",
    "code": "PCHK",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 900,
    "icon": {
      "alt": "Champions of Kamigawa Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/chk.svg?1780891200",
      "localPath": "/mtg-symbols/0900-pchk-champions-of-kamigawa-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pchk"
  },
  {
    "id": "d3ff356b-bb3d-4405-a452-34c5cef27329",
    "name": "World Championship Decks 2004",
    "year": 2004,
    "releasedAt": "2004-09-01",
    "code": "WC04",
    "setType": "Memorabilia",
    "cardCount": 103,
    "releaseOrder": 901,
    "icon": {
      "alt": "World Championship Decks 2004 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0901-wc04-world-championship-decks-2004.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wc04"
  },
  {
    "id": "e4bc1b87-5476-463c-8640-4c414ecf1763",
    "name": "Fifth Dawn",
    "year": 2004,
    "releasedAt": "2004-06-04",
    "code": "5DN",
    "setType": "Expansion",
    "cardCount": 165,
    "releaseOrder": 902,
    "icon": {
      "alt": "Fifth Dawn set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/5dn.svg?1780891200",
      "localPath": "/mtg-symbols/0902-5dn-fifth-dawn.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/5dn"
  },
  {
    "id": "ff5503b1-ac4c-4164-b7e4-6bca31640493",
    "name": "Fifth Dawn Promos",
    "year": 2004,
    "releasedAt": "2004-06-04",
    "code": "P5DN",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 903,
    "icon": {
      "alt": "Fifth Dawn Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/5dn.svg?1780891200",
      "localPath": "/mtg-symbols/0903-p5dn-fifth-dawn-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p5dn"
  },
  {
    "id": "387eb35e-18ae-4162-9332-2c2d3a1d16c1",
    "name": "Mirrodin Promos",
    "year": 2004,
    "releasedAt": "2004-06-04",
    "code": "PMRD",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 904,
    "icon": {
      "alt": "Mirrodin Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mrd.svg?1780891200",
      "localPath": "/mtg-symbols/0904-pmrd-mirrodin-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmrd"
  },
  {
    "id": "e29cb2dd-1345-4032-abfe-e52e8c8ce074",
    "name": "Darksteel",
    "year": 2004,
    "releasedAt": "2004-02-06",
    "code": "DST",
    "setType": "Expansion",
    "cardCount": 165,
    "releaseOrder": 905,
    "icon": {
      "alt": "Darksteel set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dst.svg?1780891200",
      "localPath": "/mtg-symbols/0905-dst-darksteel.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dst"
  },
  {
    "id": "b586f845-b8dd-455f-ae21-817d0c09ec61",
    "name": "Darksteel Promos",
    "year": 2004,
    "releasedAt": "2004-02-06",
    "code": "PDST",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 906,
    "icon": {
      "alt": "Darksteel Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dst.svg?1780891200",
      "localPath": "/mtg-symbols/0906-pdst-darksteel-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdst"
  },
  {
    "id": "10b8cbe8-4beb-496b-97d7-889a81dde83b",
    "name": "Friday Night Magic 2004",
    "year": 2004,
    "releasedAt": "2004-01-01",
    "code": "F04",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 907,
    "icon": {
      "alt": "Friday Night Magic 2004 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0907-f04-friday-night-magic-2004.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f04"
  },
  {
    "id": "68b258e6-d659-457c-a3d6-9da5d7cd6aa1",
    "name": "Judge Gift Cards 2004",
    "year": 2004,
    "releasedAt": "2004-01-01",
    "code": "G04",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 908,
    "icon": {
      "alt": "Judge Gift Cards 2004 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0908-g04-judge-gift-cards-2004.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g04"
  },
  {
    "id": "5ba81c6d-2344-4760-bb13-b7276205e73e",
    "name": "Magic Player Rewards 2004",
    "year": 2004,
    "releasedAt": "2004-01-01",
    "code": "P04",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 909,
    "icon": {
      "alt": "Magic Player Rewards 2004 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0909-p04-magic-player-rewards-2004.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p04"
  },
  {
    "id": "2afca034-842a-4488-af35-c79df13eb21d",
    "name": "Arena League 2004",
    "year": 2004,
    "releasedAt": "2004-01-01",
    "code": "PAL04",
    "setType": "Promo",
    "cardCount": 14,
    "releaseOrder": 910,
    "icon": {
      "alt": "Arena League 2004 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/parl.svg?1780891200",
      "localPath": "/mtg-symbols/0910-pal04-arena-league-2004.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pal04"
  },
  {
    "id": "1d4f90ba-8d4a-4ee5-bc2f-e2d6bffe4955",
    "name": "Mirrodin",
    "year": 2003,
    "releasedAt": "2003-10-02",
    "code": "MRD",
    "setType": "Expansion",
    "cardCount": 306,
    "releaseOrder": 911,
    "icon": {
      "alt": "Mirrodin set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mrd.svg?1780891200",
      "localPath": "/mtg-symbols/0911-mrd-mirrodin.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mrd"
  },
  {
    "id": "56f42feb-07f4-4fd6-a88b-33209de7de08",
    "name": "World Championship Decks 2003",
    "year": 2003,
    "releasedAt": "2003-08-06",
    "code": "WC03",
    "setType": "Memorabilia",
    "cardCount": 142,
    "releaseOrder": 912,
    "icon": {
      "alt": "World Championship Decks 2003 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0912-wc03-world-championship-decks-2003.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wc03"
  },
  {
    "id": "cae8d29d-5979-4d8f-884d-7f3183bcc886",
    "name": "Eighth Edition",
    "year": 2003,
    "releasedAt": "2003-07-28",
    "code": "8ED",
    "setType": "Core",
    "cardCount": 711,
    "releaseOrder": 913,
    "icon": {
      "alt": "Eighth Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/8ed.svg?1780891200",
      "localPath": "/mtg-symbols/0913-8ed-eighth-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/8ed"
  },
  {
    "id": "ff1b44ae-5f8b-4bb2-b87a-b27f53f2b0c9",
    "name": "Eighth Edition Promos",
    "year": 2003,
    "releasedAt": "2003-07-28",
    "code": "P8ED",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 914,
    "icon": {
      "alt": "Eighth Edition Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/8ed.svg?1780891200",
      "localPath": "/mtg-symbols/0914-p8ed-eighth-edition-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p8ed"
  },
  {
    "id": "48e783b7-4219-4348-aacb-86ea5c491af2",
    "name": "Scourge Promos",
    "year": 2003,
    "releasedAt": "2003-05-26",
    "code": "PSCG",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 915,
    "icon": {
      "alt": "Scourge Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/scg.svg?1780891200",
      "localPath": "/mtg-symbols/0915-pscg-scourge-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pscg"
  },
  {
    "id": "5133c3a1-1412-4ce6-a1f0-73b695966ded",
    "name": "Scourge",
    "year": 2003,
    "releasedAt": "2003-05-26",
    "code": "SCG",
    "setType": "Expansion",
    "cardCount": 143,
    "releaseOrder": 916,
    "icon": {
      "alt": "Scourge set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/scg.svg?1780891200",
      "localPath": "/mtg-symbols/0916-scg-scourge.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/scg"
  },
  {
    "id": "c2d60a18-1a81-4784-8e0c-e1de2f43c5cf",
    "name": "Legions",
    "year": 2003,
    "releasedAt": "2003-02-03",
    "code": "LGN",
    "setType": "Expansion",
    "cardCount": 145,
    "releaseOrder": 917,
    "icon": {
      "alt": "Legions set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lgn.svg?1780891200",
      "localPath": "/mtg-symbols/0917-lgn-legions.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/lgn"
  },
  {
    "id": "33d36849-7710-4766-90c6-728c3f625003",
    "name": "Legions Promos",
    "year": 2003,
    "releasedAt": "2003-02-03",
    "code": "PLGN",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 918,
    "icon": {
      "alt": "Legions Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lgn.svg?1780891200",
      "localPath": "/mtg-symbols/0918-plgn-legions-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plgn"
  },
  {
    "id": "338dca3f-bcaf-43f8-a5a8-0aeaa241dec5",
    "name": "Friday Night Magic 2003",
    "year": 2003,
    "releasedAt": "2003-01-01",
    "code": "F03",
    "setType": "Promo",
    "cardCount": 13,
    "releaseOrder": 919,
    "icon": {
      "alt": "Friday Night Magic 2003 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0919-f03-friday-night-magic-2003.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f03"
  },
  {
    "id": "d77319c6-78a1-48d4-bc87-cbf4b1baed07",
    "name": "Judge Gift Cards 2003",
    "year": 2003,
    "releasedAt": "2003-01-01",
    "code": "G03",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 920,
    "icon": {
      "alt": "Judge Gift Cards 2003 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0920-g03-judge-gift-cards-2003.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g03"
  },
  {
    "id": "c6a6b61b-143a-43f2-b74d-b140f3d93490",
    "name": "Vintage Championship",
    "year": 2003,
    "releasedAt": "2003-01-01",
    "code": "OVNT",
    "setType": "Memorabilia",
    "cardCount": 35,
    "releaseOrder": 921,
    "icon": {
      "alt": "Vintage Championship set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmei.svg?1780891200",
      "localPath": "/mtg-symbols/0921-ovnt-vintage-championship.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ovnt"
  },
  {
    "id": "dfa906ff-63d8-4065-abef-809988337288",
    "name": "Magic Player Rewards 2003",
    "year": 2003,
    "releasedAt": "2003-01-01",
    "code": "P03",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 922,
    "icon": {
      "alt": "Magic Player Rewards 2003 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0922-p03-magic-player-rewards-2003.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p03"
  },
  {
    "id": "bf8bc347-ae11-43d4-98da-3625566668dd",
    "name": "Arena League 2003",
    "year": 2003,
    "releasedAt": "2003-01-01",
    "code": "PAL03",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 923,
    "icon": {
      "alt": "Arena League 2003 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/parl.svg?1780891200",
      "localPath": "/mtg-symbols/0923-pal03-arena-league-2003.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pal03"
  },
  {
    "id": "94714b9a-cfb2-4514-a1fb-1071146cff69",
    "name": "Japan Junior Tournament",
    "year": 2003,
    "releasedAt": "2003-01-01",
    "code": "PJJT",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 924,
    "icon": {
      "alt": "Japan Junior Tournament set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0924-pjjt-japan-junior-tournament.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pjjt"
  },
  {
    "id": "f8778e61-ae6b-43ee-a611-f042439fa737",
    "name": "Magic Online Avatars",
    "year": 2003,
    "releasedAt": "2003-01-01",
    "code": "PMOA",
    "setType": "Vanguard",
    "cardCount": 85,
    "releaseOrder": 925,
    "icon": {
      "alt": "Magic Online Avatars set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtgo.svg?1780891200",
      "localPath": "/mtg-symbols/0925-pmoa-magic-online-avatars.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmoa"
  },
  {
    "id": "04dfc9bb-ccaa-436c-b79a-925b2ad9bdbe",
    "name": "World Championship Decks 2002",
    "year": 2002,
    "releasedAt": "2002-12-01",
    "code": "WC02",
    "setType": "Memorabilia",
    "cardCount": 153,
    "releaseOrder": 926,
    "icon": {
      "alt": "World Championship Decks 2002 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0926-wc02-world-championship-decks-2002.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wc02"
  },
  {
    "id": "914a6c6d-cb3b-45e8-a2db-9978a2339faf",
    "name": "Onslaught",
    "year": 2002,
    "releasedAt": "2002-10-07",
    "code": "ONS",
    "setType": "Expansion",
    "cardCount": 351,
    "releaseOrder": 927,
    "icon": {
      "alt": "Onslaught set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ons.svg?1780891200",
      "localPath": "/mtg-symbols/0927-ons-onslaught.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ons"
  },
  {
    "id": "b8385212-69cb-4b73-a013-d6d4e9efa261",
    "name": "Onslaught Promos",
    "year": 2002,
    "releasedAt": "2002-09-28",
    "code": "PONS",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 928,
    "icon": {
      "alt": "Onslaught Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ons.svg?1780891200",
      "localPath": "/mtg-symbols/0928-pons-onslaught-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pons"
  },
  {
    "id": "05f9add2-710e-4af4-a091-732a73365bfd",
    "name": "Hobby Japan Promos",
    "year": 2002,
    "releasedAt": "2002-07-01",
    "code": "JP1",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 929,
    "icon": {
      "alt": "Hobby Japan Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0929-jp1-hobby-japan-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/jp1"
  },
  {
    "id": "638940fb-6be9-4be3-b83f-68d3902fbbe5",
    "name": "Magic Online Promos",
    "year": 2002,
    "releasedAt": "2002-06-24",
    "code": "PRM",
    "setType": "Promo",
    "cardCount": 3110,
    "releaseOrder": 930,
    "icon": {
      "alt": "Magic Online Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mtgo.svg?1780891200",
      "localPath": "/mtg-symbols/0930-prm-magic-online-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/prm"
  },
  {
    "id": "cd82de1a-36fd-4618-bfe8-b45532a582d9",
    "name": "Judgment",
    "year": 2002,
    "releasedAt": "2002-05-27",
    "code": "JUD",
    "setType": "Expansion",
    "cardCount": 143,
    "releaseOrder": 931,
    "icon": {
      "alt": "Judgment set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jud.svg?1780891200",
      "localPath": "/mtg-symbols/0931-jud-judgment.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/jud"
  },
  {
    "id": "a1aed70a-561a-4766-97ce-ad56bef407c0",
    "name": "Judgment Promos",
    "year": 2002,
    "releasedAt": "2002-05-27",
    "code": "PJUD",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 932,
    "icon": {
      "alt": "Judgment Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/jud.svg?1780891200",
      "localPath": "/mtg-symbols/0932-pjud-judgment-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pjud"
  },
  {
    "id": "f64d8b9e-bff0-4247-8113-7fd799c997c2",
    "name": "Torment Promos",
    "year": 2002,
    "releasedAt": "2002-02-04",
    "code": "PTOR",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 933,
    "icon": {
      "alt": "Torment Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tor.svg?1780891200",
      "localPath": "/mtg-symbols/0933-ptor-torment-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptor"
  },
  {
    "id": "e0b3fda1-a6ca-4996-849b-08b463d39484",
    "name": "Torment",
    "year": 2002,
    "releasedAt": "2002-02-04",
    "code": "TOR",
    "setType": "Expansion",
    "cardCount": 143,
    "releaseOrder": 934,
    "icon": {
      "alt": "Torment set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tor.svg?1780891200",
      "localPath": "/mtg-symbols/0934-tor-torment.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tor"
  },
  {
    "id": "1037d505-8080-4f98-92c6-c9816735c172",
    "name": "Friday Night Magic 2002",
    "year": 2002,
    "releasedAt": "2002-01-01",
    "code": "F02",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 935,
    "icon": {
      "alt": "Friday Night Magic 2002 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0935-f02-friday-night-magic-2002.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f02"
  },
  {
    "id": "a3dc11d1-f22b-44fe-81db-3470aecb6bbc",
    "name": "Judge Gift Cards 2002",
    "year": 2002,
    "releasedAt": "2002-01-01",
    "code": "G02",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 936,
    "icon": {
      "alt": "Judge Gift Cards 2002 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0936-g02-judge-gift-cards-2002.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g02"
  },
  {
    "id": "25e5166c-7c44-4c69-ad78-3f1668ab3156",
    "name": "Arena League 2002",
    "year": 2002,
    "releasedAt": "2002-01-01",
    "code": "PAL02",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 937,
    "icon": {
      "alt": "Arena League 2002 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/parl.svg?1780891200",
      "localPath": "/mtg-symbols/0937-pal02-arena-league-2002.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pal02"
  },
  {
    "id": "b3978acb-8a06-4362-b835-dbda8611a48c",
    "name": "Magic Player Rewards 2002",
    "year": 2002,
    "releasedAt": "2002-01-01",
    "code": "PR2",
    "setType": "Promo",
    "cardCount": 6,
    "releaseOrder": 938,
    "icon": {
      "alt": "Magic Player Rewards 2002 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0938-pr2-magic-player-rewards-2002.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pr2"
  },
  {
    "id": "cfcec75d-481b-4b24-bcaa-a7185cf32e15",
    "name": "Deckmasters",
    "year": 2001,
    "releasedAt": "2001-12-01",
    "code": "DKM",
    "setType": "Box",
    "cardCount": 58,
    "releaseOrder": 939,
    "icon": {
      "alt": "Deckmasters set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dkm.svg?1780891200",
      "localPath": "/mtg-symbols/0939-dkm-deckmasters.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/dkm"
  },
  {
    "id": "b0d90d2d-494a-4224-bfa0-36ce5ee281b1",
    "name": "Odyssey",
    "year": 2001,
    "releasedAt": "2001-10-01",
    "code": "ODY",
    "setType": "Expansion",
    "cardCount": 353,
    "releaseOrder": 940,
    "icon": {
      "alt": "Odyssey set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ody.svg?1780891200",
      "localPath": "/mtg-symbols/0940-ody-odyssey.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ody"
  },
  {
    "id": "52dc2f6b-0895-483d-8a15-3c6052612a79",
    "name": "Odyssey Promos",
    "year": 2001,
    "releasedAt": "2001-10-01",
    "code": "PODY",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 941,
    "icon": {
      "alt": "Odyssey Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ody.svg?1780891200",
      "localPath": "/mtg-symbols/0941-pody-odyssey-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pody"
  },
  {
    "id": "4d62d576-cf71-46e8-b0db-dfff03f36cb1",
    "name": "World Championship Decks 2001",
    "year": 2001,
    "releasedAt": "2001-08-08",
    "code": "WC01",
    "setType": "Memorabilia",
    "cardCount": 138,
    "releaseOrder": 942,
    "icon": {
      "alt": "World Championship Decks 2001 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0942-wc01-world-championship-decks-2001.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wc01"
  },
  {
    "id": "e8099914-89d5-4b89-8930-9b68d0c31916",
    "name": "Sega Dreamcast Cards",
    "year": 2001,
    "releasedAt": "2001-06-28",
    "code": "PSDG",
    "setType": "Box",
    "cardCount": 10,
    "releaseOrder": 943,
    "icon": {
      "alt": "Sega Dreamcast Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/psdg.svg?1780891200",
      "localPath": "/mtg-symbols/0943-psdg-sega-dreamcast-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psdg"
  },
  {
    "id": "e4e00913-d08d-4899-86ea-5cf631e09ce0",
    "name": "Apocalypse",
    "year": 2001,
    "releasedAt": "2001-06-04",
    "code": "APC",
    "setType": "Expansion",
    "cardCount": 143,
    "releaseOrder": 944,
    "icon": {
      "alt": "Apocalypse set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/apc.svg?1780891200",
      "localPath": "/mtg-symbols/0944-apc-apocalypse.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/apc"
  },
  {
    "id": "3267d03d-12cd-41ae-9d4d-80af0493f138",
    "name": "Apocalypse Promos",
    "year": 2001,
    "releasedAt": "2001-06-04",
    "code": "PAPC",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 945,
    "icon": {
      "alt": "Apocalypse Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/apc.svg?1780891200",
      "localPath": "/mtg-symbols/0945-papc-apocalypse-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/papc"
  },
  {
    "id": "230f38aa-9511-4db8-a3aa-aeddbc3f7bb9",
    "name": "Seventh Edition",
    "year": 2001,
    "releasedAt": "2001-04-11",
    "code": "7ED",
    "setType": "Core",
    "cardCount": 708,
    "releaseOrder": 946,
    "icon": {
      "alt": "Seventh Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/7ed.svg?1780891200",
      "localPath": "/mtg-symbols/0946-7ed-seventh-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/7ed"
  },
  {
    "id": "82dc193b-bd5f-4883-a93f-a4155b467ee0",
    "name": "Planeshift",
    "year": 2001,
    "releasedAt": "2001-02-05",
    "code": "PLS",
    "setType": "Expansion",
    "cardCount": 146,
    "releaseOrder": 947,
    "icon": {
      "alt": "Planeshift set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pls.svg?1780891200",
      "localPath": "/mtg-symbols/0947-pls-planeshift.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pls"
  },
  {
    "id": "7110534f-7944-45f8-9b93-19240253201b",
    "name": "Planeshift Promos",
    "year": 2001,
    "releasedAt": "2001-02-05",
    "code": "PPLS",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 948,
    "icon": {
      "alt": "Planeshift Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pls.svg?1780891200",
      "localPath": "/mtg-symbols/0948-ppls-planeshift-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ppls"
  },
  {
    "id": "1edf0887-20de-4e75-bce3-45d842f0066d",
    "name": "Friday Night Magic 2001",
    "year": 2001,
    "releasedAt": "2001-01-01",
    "code": "F01",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 949,
    "icon": {
      "alt": "Friday Night Magic 2001 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0949-f01-friday-night-magic-2001.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/f01"
  },
  {
    "id": "b704de85-87bd-4fa4-8bf0-df7380c83af8",
    "name": "Judge Gift Cards 2001",
    "year": 2001,
    "releasedAt": "2001-01-01",
    "code": "G01",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 950,
    "icon": {
      "alt": "Judge Gift Cards 2001 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0950-g01-judge-gift-cards-2001.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g01"
  },
  {
    "id": "84cd4f76-a638-41ac-8c60-3a82d8708b5c",
    "name": "Magic Player Rewards 2001",
    "year": 2001,
    "releasedAt": "2001-01-01",
    "code": "MPR",
    "setType": "Promo",
    "cardCount": 8,
    "releaseOrder": 951,
    "icon": {
      "alt": "Magic Player Rewards 2001 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0951-mpr-magic-player-rewards-2001.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mpr"
  },
  {
    "id": "8571b7e5-3c24-4a26-a936-31549a18a2c3",
    "name": "Arena League 2001",
    "year": 2001,
    "releasedAt": "2001-01-01",
    "code": "PAL01",
    "setType": "Promo",
    "cardCount": 12,
    "releaseOrder": 952,
    "icon": {
      "alt": "Arena League 2001 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/parl2.svg?1780891200",
      "localPath": "/mtg-symbols/0952-pal01-arena-league-2001.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pal01"
  },
  {
    "id": "b9ae5e02-7726-47ca-b5e4-5ec402b41cd1",
    "name": "Invasion",
    "year": 2000,
    "releasedAt": "2000-10-02",
    "code": "INV",
    "setType": "Expansion",
    "cardCount": 354,
    "releaseOrder": 953,
    "icon": {
      "alt": "Invasion set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/inv.svg?1780891200",
      "localPath": "/mtg-symbols/0953-inv-invasion.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/inv"
  },
  {
    "id": "907dbba9-bb5e-4d07-b681-ab8641cb1ada",
    "name": "Invasion Promos",
    "year": 2000,
    "releasedAt": "2000-10-02",
    "code": "PINV",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 954,
    "icon": {
      "alt": "Invasion Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/inv.svg?1780891200",
      "localPath": "/mtg-symbols/0954-pinv-invasion-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pinv"
  },
  {
    "id": "cdc88d15-c4de-4210-a7e4-dcc366de845f",
    "name": "Beatdown Box Set",
    "year": 2000,
    "releasedAt": "2000-10-01",
    "code": "BTD",
    "setType": "Box",
    "cardCount": 90,
    "releaseOrder": 955,
    "icon": {
      "alt": "Beatdown Box Set set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/btd.svg?1780891200",
      "localPath": "/mtg-symbols/0955-btd-beatdown-box-set.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/btd"
  },
  {
    "id": "632741a4-411d-4110-b507-5a5cfdd52ef2",
    "name": "World Championship Decks 2000",
    "year": 2000,
    "releasedAt": "2000-08-02",
    "code": "WC00",
    "setType": "Memorabilia",
    "cardCount": 117,
    "releaseOrder": 956,
    "icon": {
      "alt": "World Championship Decks 2000 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0956-wc00-world-championship-decks-2000.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wc00"
  },
  {
    "id": "c233bd36-57c0-4aa2-ae6c-7aeabfb4e3ce",
    "name": "Prophecy",
    "year": 2000,
    "releasedAt": "2000-06-05",
    "code": "PCY",
    "setType": "Expansion",
    "cardCount": 144,
    "releaseOrder": 957,
    "icon": {
      "alt": "Prophecy set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pcy.svg?1780891200",
      "localPath": "/mtg-symbols/0957-pcy-prophecy.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pcy"
  },
  {
    "id": "34e39301-d557-47d1-bcc1-1ab44c02bc04",
    "name": "Prophecy Promos",
    "year": 2000,
    "releasedAt": "2000-06-05",
    "code": "PPCY",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 958,
    "icon": {
      "alt": "Prophecy Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pcy.svg?1780891200",
      "localPath": "/mtg-symbols/0958-ppcy-prophecy-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ppcy"
  },
  {
    "id": "1c105623-2564-40d7-a3aa-4134787fb127",
    "name": "Starter 2000",
    "year": 2000,
    "releasedAt": "2000-04-01",
    "code": "S00",
    "setType": "Starter",
    "cardCount": 20,
    "releaseOrder": 959,
    "icon": {
      "alt": "Starter 2000 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/s00.svg?1780891200",
      "localPath": "/mtg-symbols/0959-s00-starter-2000.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/s00"
  },
  {
    "id": "fa5d1fdb-f781-473d-b14d-50396d40d43f",
    "name": "Nemesis",
    "year": 2000,
    "releasedAt": "2000-02-14",
    "code": "NEM",
    "setType": "Expansion",
    "cardCount": 143,
    "releaseOrder": 960,
    "icon": {
      "alt": "Nemesis set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/nem.svg?1780891200",
      "localPath": "/mtg-symbols/0960-nem-nemesis.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/nem"
  },
  {
    "id": "b302372a-fff8-43bf-95cf-e3d1d2bca9c9",
    "name": "Nemesis Promos",
    "year": 2000,
    "releasedAt": "2000-02-14",
    "code": "PNEM",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 961,
    "icon": {
      "alt": "Nemesis Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/nem.svg?1780891200",
      "localPath": "/mtg-symbols/0961-pnem-nemesis-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pnem"
  },
  {
    "id": "fe73e363-c74e-4211-a728-0f4d01f9cb29",
    "name": "European Land Program",
    "year": 2000,
    "releasedAt": "2000-02-05",
    "code": "PELP",
    "setType": "Promo",
    "cardCount": 15,
    "releaseOrder": 962,
    "icon": {
      "alt": "European Land Program set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/peuro.svg?1780891200",
      "localPath": "/mtg-symbols/0962-pelp-european-land-program.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pelp"
  },
  {
    "id": "b9c0c822-3cac-46ec-801d-0ec322913387",
    "name": "Friday Night Magic 2000",
    "year": 2000,
    "releasedAt": "2000-01-01",
    "code": "FNM",
    "setType": "Promo",
    "cardCount": 11,
    "releaseOrder": 963,
    "icon": {
      "alt": "Friday Night Magic 2000 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0963-fnm-friday-night-magic-2000.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fnm"
  },
  {
    "id": "0964514c-cf50-468d-9cf7-a388aff65de9",
    "name": "Judge Gift Cards 2000",
    "year": 2000,
    "releasedAt": "2000-01-01",
    "code": "G00",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 964,
    "icon": {
      "alt": "Judge Gift Cards 2000 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0964-g00-judge-gift-cards-2000.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g00"
  },
  {
    "id": "a004c98d-1423-443f-b51c-1c8f5dc21b0d",
    "name": "Arena League 2000",
    "year": 2000,
    "releasedAt": "2000-01-01",
    "code": "PAL00",
    "setType": "Promo",
    "cardCount": 11,
    "releaseOrder": 965,
    "icon": {
      "alt": "Arena League 2000 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/parl2.svg?1780891200",
      "localPath": "/mtg-symbols/0965-pal00-arena-league-2000.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pal00"
  },
  {
    "id": "7708825d-7afc-472a-ac35-348713ffb3e1",
    "name": "Junior Super Series",
    "year": 1999,
    "releasedAt": "1999-12-01",
    "code": "PSUS",
    "setType": "Promo",
    "cardCount": 18,
    "releaseOrder": 966,
    "icon": {
      "alt": "Junior Super Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/dci.svg?1780891200",
      "localPath": "/mtg-symbols/0966-psus-junior-super-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psus"
  },
  {
    "id": "81118b2a-b5c8-4fdc-830a-ce5b74eb60b9",
    "name": "Battle Royale Box Set",
    "year": 1999,
    "releasedAt": "1999-11-12",
    "code": "BRB",
    "setType": "Box",
    "cardCount": 136,
    "releaseOrder": 967,
    "icon": {
      "alt": "Battle Royale Box Set set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/brb.svg?1780891200",
      "localPath": "/mtg-symbols/0967-brb-battle-royale-box-set.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/brb"
  },
  {
    "id": "385e11a4-492b-4d07-b4a6-a1409ef829b8",
    "name": "Mercadian Masques",
    "year": 1999,
    "releasedAt": "1999-10-04",
    "code": "MMQ",
    "setType": "Expansion",
    "cardCount": 350,
    "releaseOrder": 968,
    "icon": {
      "alt": "Mercadian Masques set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mmq.svg?1780891200",
      "localPath": "/mtg-symbols/0968-mmq-mercadian-masques.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mmq"
  },
  {
    "id": "98161b77-01f1-492d-80f2-7fb44f3dd260",
    "name": "Mercadian Masques Promos",
    "year": 1999,
    "releasedAt": "1999-10-04",
    "code": "PMMQ",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 969,
    "icon": {
      "alt": "Mercadian Masques Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mmq.svg?1780891200",
      "localPath": "/mtg-symbols/0969-pmmq-mercadian-masques-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmmq"
  },
  {
    "id": "34aa79e7-b75b-48c5-aa3f-7effc613e06d",
    "name": "Wizards of the Coast Online Store",
    "year": 1999,
    "releasedAt": "1999-09-04",
    "code": "PWOS",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 970,
    "icon": {
      "alt": "Wizards of the Coast Online Store set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0970-pwos-wizards-of-the-coast-online-store.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pwos"
  },
  {
    "id": "af254727-ca30-48fd-b9bf-144f7e1a308f",
    "name": "World Championship Promos",
    "year": 1999,
    "releasedAt": "1999-08-04",
    "code": "PWOR",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 971,
    "icon": {
      "alt": "World Championship Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0971-pwor-world-championship-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pwor"
  },
  {
    "id": "8bc653e3-56ce-4cd1-9590-a6134ec28b3a",
    "name": "World Championship Decks 1999",
    "year": 1999,
    "releasedAt": "1999-08-04",
    "code": "WC99",
    "setType": "Memorabilia",
    "cardCount": 111,
    "releaseOrder": 972,
    "icon": {
      "alt": "World Championship Decks 1999 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0972-wc99-world-championship-decks-1999.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wc99"
  },
  {
    "id": "30c0fe51-0ce7-40c4-9bf4-2836a0dc063b",
    "name": "Guru",
    "year": 1999,
    "releasedAt": "1999-07-12",
    "code": "PGRU",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 973,
    "icon": {
      "alt": "Guru set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pgru.svg?1780891200",
      "localPath": "/mtg-symbols/0973-pgru-guru.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pgru"
  },
  {
    "id": "7e345c51-7a88-4c7a-8184-4e1ba493b40d",
    "name": "Starter 1999",
    "year": 1999,
    "releasedAt": "1999-07-01",
    "code": "S99",
    "setType": "Starter",
    "cardCount": 173,
    "releaseOrder": 974,
    "icon": {
      "alt": "Starter 1999 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/s99.svg?1780891200",
      "localPath": "/mtg-symbols/0974-s99-starter-1999.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/s99"
  },
  {
    "id": "1cec5029-d9b9-4cbb-8a50-9c3a0f95d677",
    "name": "Urza's Destiny Promos",
    "year": 1999,
    "releasedAt": "1999-06-07",
    "code": "PUDS",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 975,
    "icon": {
      "alt": "Urza's Destiny Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/uds.svg?1780891200",
      "localPath": "/mtg-symbols/0975-puds-urza-s-destiny-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/puds"
  },
  {
    "id": "44f17b37-dcf8-4239-baab-1efc00cd3480",
    "name": "Urza's Destiny",
    "year": 1999,
    "releasedAt": "1999-06-07",
    "code": "UDS",
    "setType": "Expansion",
    "cardCount": 143,
    "releaseOrder": 976,
    "icon": {
      "alt": "Urza's Destiny set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/uds.svg?1780891200",
      "localPath": "/mtg-symbols/0976-uds-urza-s-destiny.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/uds"
  },
  {
    "id": "27b4f670-a760-4783-9f5a-4986c3a50e86",
    "name": "Portal Three Kingdoms Promos",
    "year": 1999,
    "releasedAt": "1999-05-01",
    "code": "PPTK",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 977,
    "icon": {
      "alt": "Portal Three Kingdoms Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ptk.svg?1780891200",
      "localPath": "/mtg-symbols/0977-pptk-portal-three-kingdoms-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pptk"
  },
  {
    "id": "2676ff2e-9d86-4b5b-b935-e84e41b0755e",
    "name": "Portal Three Kingdoms",
    "year": 1999,
    "releasedAt": "1999-05-01",
    "code": "PTK",
    "setType": "Starter",
    "cardCount": 180,
    "releaseOrder": 978,
    "icon": {
      "alt": "Portal Three Kingdoms set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ptk.svg?1780891200",
      "localPath": "/mtg-symbols/0978-ptk-portal-three-kingdoms.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptk"
  },
  {
    "id": "78ee1957-d5d4-4551-acae-b1b418e8a50b",
    "name": "Classic Sixth Edition",
    "year": 1999,
    "releasedAt": "1999-04-21",
    "code": "6ED",
    "setType": "Core",
    "cardCount": 351,
    "releaseOrder": 979,
    "icon": {
      "alt": "Classic Sixth Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/6ed.svg?1780891200",
      "localPath": "/mtg-symbols/0979-6ed-classic-sixth-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/6ed"
  },
  {
    "id": "533dd7ca-2128-4d21-911a-a12f9b7b369e",
    "name": "Urza's Legacy Promos",
    "year": 1999,
    "releasedAt": "1999-02-15",
    "code": "PULG",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 980,
    "icon": {
      "alt": "Urza's Legacy Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ulg.svg?1780891200",
      "localPath": "/mtg-symbols/0980-pulg-urza-s-legacy-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pulg"
  },
  {
    "id": "78ced61b-4b8a-4b33-b6b2-f5bd66f1a75a",
    "name": "Urza's Legacy",
    "year": 1999,
    "releasedAt": "1999-02-15",
    "code": "ULG",
    "setType": "Expansion",
    "cardCount": 143,
    "releaseOrder": 981,
    "icon": {
      "alt": "Urza's Legacy set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ulg.svg?1780891200",
      "localPath": "/mtg-symbols/0981-ulg-urza-s-legacy.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ulg"
  },
  {
    "id": "08041686-693b-4b57-9e87-76ba81f3b1a3",
    "name": "Judge Gift Cards 1999",
    "year": 1999,
    "releasedAt": "1999-01-01",
    "code": "G99",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 982,
    "icon": {
      "alt": "Judge Gift Cards 1999 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0982-g99-judge-gift-cards-1999.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/g99"
  },
  {
    "id": "01f0deac-9fcc-4c2b-a932-92c705fb558f",
    "name": "Arena League 1999",
    "year": 1999,
    "releasedAt": "1999-01-01",
    "code": "PAL99",
    "setType": "Promo",
    "cardCount": 10,
    "releaseOrder": 983,
    "icon": {
      "alt": "Arena League 1999 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/usg.svg?1780891200",
      "localPath": "/mtg-symbols/0983-pal99-arena-league-1999.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pal99"
  },
  {
    "id": "49c9409d-5948-4c00-bd0a-bf3ebd50e23a",
    "name": "Anthologies",
    "year": 1998,
    "releasedAt": "1998-11-01",
    "code": "ATH",
    "setType": "Box",
    "cardCount": 85,
    "releaseOrder": 984,
    "icon": {
      "alt": "Anthologies set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ath.svg?1780891200",
      "localPath": "/mtg-symbols/0984-ath-anthologies.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ath"
  },
  {
    "id": "fa0c6488-475f-4e88-8149-e131619bd215",
    "name": "Urza's Saga Promos",
    "year": 1998,
    "releasedAt": "1998-10-12",
    "code": "PUSG",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 985,
    "icon": {
      "alt": "Urza's Saga Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/usg.svg?1780891200",
      "localPath": "/mtg-symbols/0985-pusg-urza-s-saga-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pusg"
  },
  {
    "id": "c330df40-51db-4caf-bde6-48df6c181001",
    "name": "Urza's Saga",
    "year": 1998,
    "releasedAt": "1998-10-12",
    "code": "USG",
    "setType": "Expansion",
    "cardCount": 357,
    "releaseOrder": 986,
    "icon": {
      "alt": "Urza's Saga set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/usg.svg?1780891200",
      "localPath": "/mtg-symbols/0986-usg-urza-s-saga.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/usg"
  },
  {
    "id": "994d1115-3d9e-494d-be58-45ff635a9595",
    "name": "Asia Pacific Land Program",
    "year": 1998,
    "releasedAt": "1998-09-01",
    "code": "PALP",
    "setType": "Promo",
    "cardCount": 15,
    "releaseOrder": 987,
    "icon": {
      "alt": "Asia Pacific Land Program set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/papac.svg?1780891200",
      "localPath": "/mtg-symbols/0987-palp-asia-pacific-land-program.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/palp"
  },
  {
    "id": "e8732c3a-160c-41da-bc79-5da86431b17d",
    "name": "World Championship Decks 1998",
    "year": 1998,
    "releasedAt": "1998-08-12",
    "code": "WC98",
    "setType": "Memorabilia",
    "cardCount": 117,
    "releaseOrder": 988,
    "icon": {
      "alt": "World Championship Decks 1998 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0988-wc98-world-championship-decks-1998.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wc98"
  },
  {
    "id": "cf1f416e-ea50-4d93-8f75-c3a49c8238cf",
    "name": "Unglued Tokens",
    "year": 1998,
    "releasedAt": "1998-08-11",
    "code": "TUGL",
    "setType": "Token",
    "cardCount": 6,
    "releaseOrder": 989,
    "icon": {
      "alt": "Unglued Tokens set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ugl.svg?1780891200",
      "localPath": "/mtg-symbols/0989-tugl-unglued-tokens.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tugl"
  },
  {
    "id": "3404fc78-6678-4cf4-bd39-4c0be3bb7baf",
    "name": "Unglued",
    "year": 1998,
    "releasedAt": "1998-08-11",
    "code": "UGL",
    "setType": "Funny",
    "cardCount": 88,
    "releaseOrder": 990,
    "icon": {
      "alt": "Unglued set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ugl.svg?1780891200",
      "localPath": "/mtg-symbols/0990-ugl-unglued.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ugl"
  },
  {
    "id": "ac67f18a-4f0e-407e-bab1-a9fe4f659565",
    "name": "Portal Second Age",
    "year": 1998,
    "releasedAt": "1998-06-24",
    "code": "P02",
    "setType": "Starter",
    "cardCount": 165,
    "releaseOrder": 991,
    "icon": {
      "alt": "Portal Second Age set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/p02.svg?1780891200",
      "localPath": "/mtg-symbols/0991-p02-portal-second-age.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/p02"
  },
  {
    "id": "1401f7af-2e71-476d-9813-991084ed0bb9",
    "name": "Exodus",
    "year": 1998,
    "releasedAt": "1998-06-15",
    "code": "EXO",
    "setType": "Expansion",
    "cardCount": 143,
    "releaseOrder": 992,
    "icon": {
      "alt": "Exodus set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/exo.svg?1780891200",
      "localPath": "/mtg-symbols/0992-exo-exodus.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/exo"
  },
  {
    "id": "a4bfc8e0-22bb-463b-8f7d-5dc926438dca",
    "name": "Exodus Promos",
    "year": 1998,
    "releasedAt": "1998-06-15",
    "code": "PEXO",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 993,
    "icon": {
      "alt": "Exodus Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/exo.svg?1780891200",
      "localPath": "/mtg-symbols/0993-pexo-exodus-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pexo"
  },
  {
    "id": "726bc009-a94a-4fd2-acb2-58d8c70b8f1c",
    "name": "Stronghold Promos",
    "year": 1998,
    "releasedAt": "1998-03-02",
    "code": "PSTH",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 994,
    "icon": {
      "alt": "Stronghold Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sth.svg?1780891200",
      "localPath": "/mtg-symbols/0994-psth-stronghold-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/psth"
  },
  {
    "id": "5c83396a-d386-4367-926b-571a75b086a3",
    "name": "Stronghold",
    "year": 1998,
    "releasedAt": "1998-03-02",
    "code": "STH",
    "setType": "Expansion",
    "cardCount": 143,
    "releaseOrder": 995,
    "icon": {
      "alt": "Stronghold set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/sth.svg?1780891200",
      "localPath": "/mtg-symbols/0995-sth-stronghold.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sth"
  },
  {
    "id": "804c01dd-4714-440a-950e-2f2130d781f3",
    "name": "Judge Gift Cards 1998",
    "year": 1998,
    "releasedAt": "1998-01-01",
    "code": "JGP",
    "setType": "Promo",
    "cardCount": 3,
    "releaseOrder": 996,
    "icon": {
      "alt": "Judge Gift Cards 1998 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0996-jgp-judge-gift-cards-1998.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/jgp"
  },
  {
    "id": "1645fb19-71a7-4634-99b8-bf703e861b6b",
    "name": "Tempest Promos",
    "year": 1997,
    "releasedAt": "1997-10-14",
    "code": "PTMP",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 997,
    "icon": {
      "alt": "Tempest Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tmp.svg?1780891200",
      "localPath": "/mtg-symbols/0997-ptmp-tempest-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptmp"
  },
  {
    "id": "10df3a67-178e-4363-8668-34f0e6edf2a7",
    "name": "Tempest",
    "year": 1997,
    "releasedAt": "1997-10-14",
    "code": "TMP",
    "setType": "Expansion",
    "cardCount": 350,
    "releaseOrder": 998,
    "icon": {
      "alt": "Tempest set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/tmp.svg?1780891200",
      "localPath": "/mtg-symbols/0998-tmp-tempest.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/tmp"
  },
  {
    "id": "8b791ead-c9b5-42fa-9ffb-43f178af5ac8",
    "name": "World Championship Decks 1997",
    "year": 1997,
    "releasedAt": "1997-08-13",
    "code": "WC97",
    "setType": "Memorabilia",
    "cardCount": 131,
    "releaseOrder": 999,
    "icon": {
      "alt": "World Championship Decks 1997 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/0999-wc97-world-championship-decks-1997.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wc97"
  },
  {
    "id": "700997ac-add2-4ce2-992e-5efa0fdfc0e9",
    "name": "Weatherlight",
    "year": 1997,
    "releasedAt": "1997-06-09",
    "code": "WTH",
    "setType": "Expansion",
    "cardCount": 167,
    "releaseOrder": 1000,
    "icon": {
      "alt": "Weatherlight set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/wth.svg?1780891200",
      "localPath": "/mtg-symbols/1000-wth-weatherlight.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/wth"
  },
  {
    "id": "38210efe-e2d7-47ff-9817-4b5631e4bb8a",
    "name": "Oversized League Prizes",
    "year": 1997,
    "releasedAt": "1997-05-30",
    "code": "OLEP",
    "setType": "Memorabilia",
    "cardCount": 83,
    "releaseOrder": 1001,
    "icon": {
      "alt": "Oversized League Prizes set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/1001-olep-oversized-league-prizes.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/olep"
  },
  {
    "id": "478c47df-5058-4ce6-830e-7e80732b2ca9",
    "name": "Portal",
    "year": 1997,
    "releasedAt": "1997-05-01",
    "code": "POR",
    "setType": "Starter",
    "cardCount": 257,
    "releaseOrder": 1002,
    "icon": {
      "alt": "Portal set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/por.svg?1780891200",
      "localPath": "/mtg-symbols/1002-por-portal.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/por"
  },
  {
    "id": "3c098543-7919-46d5-b14d-aa0444fd6573",
    "name": "Vanguard Series",
    "year": 1997,
    "releasedAt": "1997-05-01",
    "code": "PVAN",
    "setType": "Vanguard",
    "cardCount": 32,
    "releaseOrder": 1003,
    "icon": {
      "alt": "Vanguard Series set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/van.svg?1780891200",
      "localPath": "/mtg-symbols/1003-pvan-vanguard-series.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pvan"
  },
  {
    "id": "9ca75b06-d9c5-4245-9bba-f2751f8d50a5",
    "name": "Astral Cards",
    "year": 1997,
    "releasedAt": "1997-04-01",
    "code": "PAST",
    "setType": "Box",
    "cardCount": 12,
    "releaseOrder": 1004,
    "icon": {
      "alt": "Astral Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/past.svg?1780891200",
      "localPath": "/mtg-symbols/1004-past-astral-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/past"
  },
  {
    "id": "3b93026e-537b-4190-a4d4-64ad4bc29403",
    "name": "MicroProse Promos",
    "year": 1997,
    "releasedAt": "1997-04-01",
    "code": "PMIC",
    "setType": "Memorabilia",
    "cardCount": 1,
    "releaseOrder": 1005,
    "icon": {
      "alt": "MicroProse Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/past.svg?1780891200",
      "localPath": "/mtg-symbols/1005-pmic-microprose-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmic"
  },
  {
    "id": "5afd2f4b-8309-4f45-a2b2-3785018474cb",
    "name": "Fifth Edition",
    "year": 1997,
    "releasedAt": "1997-03-24",
    "code": "5ED",
    "setType": "Core",
    "cardCount": 460,
    "releaseOrder": 1006,
    "icon": {
      "alt": "Fifth Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/5ed.svg?1780891200",
      "localPath": "/mtg-symbols/1006-5ed-fifth-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/5ed"
  },
  {
    "id": "2c32f1a9-7921-4826-bea0-80bbac70532c",
    "name": "Visions",
    "year": 1997,
    "releasedAt": "1997-02-03",
    "code": "VIS",
    "setType": "Expansion",
    "cardCount": 167,
    "releaseOrder": 1007,
    "icon": {
      "alt": "Visions set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/vis.svg?1780891200",
      "localPath": "/mtg-symbols/1007-vis-visions.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/vis"
  },
  {
    "id": "ebcaf6a7-c14c-4479-a228-2b24b6c11c9e",
    "name": "Introductory Two-Player Set",
    "year": 1996,
    "releasedAt": "1996-12-31",
    "code": "ITP",
    "setType": "Starter",
    "cardCount": 67,
    "releaseOrder": 1008,
    "icon": {
      "alt": "Introductory Two-Player Set set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/x2ps.svg?1780891200",
      "localPath": "/mtg-symbols/1008-itp-introductory-two-player-set.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/itp"
  },
  {
    "id": "fe04d7bf-1965-45e8-8de1-4bfc5b636d5f",
    "name": "Multiverse Gift Box",
    "year": 1996,
    "releasedAt": "1996-11-01",
    "code": "MGB",
    "setType": "Box",
    "cardCount": 10,
    "releaseOrder": 1009,
    "icon": {
      "alt": "Multiverse Gift Box set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/vis.svg?1780891200",
      "localPath": "/mtg-symbols/1009-mgb-multiverse-gift-box.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mgb"
  },
  {
    "id": "5f06acf3-8123-4a78-b2e7-089b0b775a4a",
    "name": "Mirage",
    "year": 1996,
    "releasedAt": "1996-10-08",
    "code": "MIR",
    "setType": "Expansion",
    "cardCount": 353,
    "releaseOrder": 1010,
    "icon": {
      "alt": "Mirage set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/mir.svg?1780891200",
      "localPath": "/mtg-symbols/1010-mir-mirage.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/mir"
  },
  {
    "id": "1d525181-1060-4b4f-ad60-5474b0cb0958",
    "name": "Redemption Program",
    "year": 1996,
    "releasedAt": "1996-10-01",
    "code": "PRED",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 1011,
    "icon": {
      "alt": "Redemption Program set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/1011-pred-redemption-program.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pred"
  },
  {
    "id": "840aaaed-a90e-4db0-8dce-f15e92df6d64",
    "name": "Celebration Cards",
    "year": 1996,
    "releasedAt": "1996-08-14",
    "code": "PCEL",
    "setType": "Memorabilia",
    "cardCount": 9,
    "releaseOrder": 1012,
    "icon": {
      "alt": "Celebration Cards set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/1012-pcel-celebration-cards.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pcel"
  },
  {
    "id": "2767f6e4-4a9c-4515-a5c1-51dd95660fc4",
    "name": "Arena League 1996",
    "year": 1996,
    "releasedAt": "1996-08-02",
    "code": "PARL",
    "setType": "Promo",
    "cardCount": 7,
    "releaseOrder": 1013,
    "icon": {
      "alt": "Arena League 1996 set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/parl.svg?1780891200",
      "localPath": "/mtg-symbols/1013-parl-arena-league-1996.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/parl"
  },
  {
    "id": "5b6a6daa-5a80-435c-a534-fd5dd04c5540",
    "name": "DCI Legend Membership",
    "year": 1996,
    "releasedAt": "1996-07-01",
    "code": "PLGM",
    "setType": "Promo",
    "cardCount": 2,
    "releaseOrder": 1014,
    "icon": {
      "alt": "DCI Legend Membership set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/1014-plgm-dci-legend-membership.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/plgm"
  },
  {
    "id": "8a407de5-5d19-44ad-ad77-6417c5ee6083",
    "name": "Rivals Quick Start Set",
    "year": 1996,
    "releasedAt": "1996-07-01",
    "code": "RQS",
    "setType": "Box",
    "cardCount": 65,
    "releaseOrder": 1015,
    "icon": {
      "alt": "Rivals Quick Start Set set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/1015-rqs-rivals-quick-start-set.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/rqs"
  },
  {
    "id": "64987b06-4a5c-443d-b560-ff5691744582",
    "name": "Alliances",
    "year": 1996,
    "releasedAt": "1996-06-10",
    "code": "ALL",
    "setType": "Expansion",
    "cardCount": 199,
    "releaseOrder": 1016,
    "icon": {
      "alt": "Alliances set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/all.svg?1780891200",
      "localPath": "/mtg-symbols/1016-all-alliances.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/all"
  },
  {
    "id": "d909bcc0-dda6-4802-a5bc-a8e57ddd4dea",
    "name": "Pro Tour Collector Set",
    "year": 1996,
    "releasedAt": "1996-05-01",
    "code": "PTC",
    "setType": "Memorabilia",
    "cardCount": 308,
    "releaseOrder": 1017,
    "icon": {
      "alt": "Pro Tour Collector Set set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/default.svg?1780891200",
      "localPath": "/mtg-symbols/1017-ptc-pro-tour-collector-set.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ptc"
  },
  {
    "id": "3442b58d-6354-4c71-8608-6abe469ab54b",
    "name": "Oversized 90's Promos",
    "year": 1996,
    "releasedAt": "1996-04-01",
    "code": "O90P",
    "setType": "Memorabilia",
    "cardCount": 10,
    "releaseOrder": 1018,
    "icon": {
      "alt": "Oversized 90's Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/star.svg?1780891200",
      "localPath": "/mtg-symbols/1018-o90p-oversized-90-s-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/o90p"
  },
  {
    "id": "5ac1f606-e682-46e9-ad0f-122a3783581b",
    "name": "Homelands",
    "year": 1995,
    "releasedAt": "1995-10-01",
    "code": "HML",
    "setType": "Expansion",
    "cardCount": 140,
    "releaseOrder": 1019,
    "icon": {
      "alt": "Homelands set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/hml.svg?1780891200",
      "localPath": "/mtg-symbols/1019-hml-homelands.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/hml"
  },
  {
    "id": "bec33d25-cf6f-460f-918d-29b3009686bb",
    "name": "Renaissance",
    "year": 1995,
    "releasedAt": "1995-08-01",
    "code": "REN",
    "setType": "Masters",
    "cardCount": 122,
    "releaseOrder": 1020,
    "icon": {
      "alt": "Renaissance set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ren.svg?1780891200",
      "localPath": "/mtg-symbols/1020-ren-renaissance.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ren"
  },
  {
    "id": "4c53f6a5-90a1-44d6-a21b-bfa9dafba9e8",
    "name": "Rinascimento",
    "year": 1995,
    "releasedAt": "1995-08-01",
    "code": "RIN",
    "setType": "Masters",
    "cardCount": 69,
    "releaseOrder": 1021,
    "icon": {
      "alt": "Rinascimento set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/rin.svg?1780891200",
      "localPath": "/mtg-symbols/1021-rin-rinascimento.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/rin"
  },
  {
    "id": "d672ed60-4161-4b21-874a-584b13b2fc35",
    "name": "Chronicles Foreign Black Border",
    "year": 1995,
    "releasedAt": "1995-07-01",
    "code": "BCHR",
    "setType": "Masters",
    "cardCount": 125,
    "releaseOrder": 1022,
    "icon": {
      "alt": "Chronicles Foreign Black Border set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/chr.svg?1780891200",
      "localPath": "/mtg-symbols/1022-bchr-chronicles-foreign-black-border.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/bchr"
  },
  {
    "id": "985eab7d-655a-4cb0-ba74-d48c8dcfb3d4",
    "name": "Chronicles",
    "year": 1995,
    "releasedAt": "1995-07-01",
    "code": "CHR",
    "setType": "Masters",
    "cardCount": 125,
    "releaseOrder": 1023,
    "icon": {
      "alt": "Chronicles set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/chr.svg?1780891200",
      "localPath": "/mtg-symbols/1023-chr-chronicles.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/chr"
  },
  {
    "id": "b0e08eea-5c01-4406-a6e2-dcd09c5e5b67",
    "name": "Ice Age",
    "year": 1995,
    "releasedAt": "1995-06-03",
    "code": "ICE",
    "setType": "Expansion",
    "cardCount": 383,
    "releaseOrder": 1024,
    "icon": {
      "alt": "Ice Age set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ice.svg?1780891200",
      "localPath": "/mtg-symbols/1024-ice-ice-age.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ice"
  },
  {
    "id": "daa633b3-2bdb-48a2-a40e-3de16b6e41a5",
    "name": "Fourth Edition Foreign Black Border",
    "year": 1995,
    "releasedAt": "1995-04-01",
    "code": "4BB",
    "setType": "Core",
    "cardCount": 378,
    "releaseOrder": 1025,
    "icon": {
      "alt": "Fourth Edition Foreign Black Border set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/4ed.svg?1780891200",
      "localPath": "/mtg-symbols/1025-4bb-fourth-edition-foreign-black-border.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/4bb"
  },
  {
    "id": "2dd259d4-dc13-4956-a2dc-3e1d70b4a743",
    "name": "Fourth Edition",
    "year": 1995,
    "releasedAt": "1995-04-01",
    "code": "4ED",
    "setType": "Core",
    "cardCount": 380,
    "releaseOrder": 1026,
    "icon": {
      "alt": "Fourth Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/4ed.svg?1780891200",
      "localPath": "/mtg-symbols/1026-4ed-fourth-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/4ed"
  },
  {
    "id": "80b77354-aa37-420c-a9a2-8a0c66989f23",
    "name": "Media and Collaboration Promos",
    "year": 1995,
    "releasedAt": "1995-01-01",
    "code": "PMEI",
    "setType": "Promo",
    "cardCount": 96,
    "releaseOrder": 1027,
    "icon": {
      "alt": "Media and Collaboration Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pmei.svg?1780891200",
      "localPath": "/mtg-symbols/1027-pmei-media-and-collaboration-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pmei"
  },
  {
    "id": "cf7390b1-341a-4ae8-a325-da0f5f322f13",
    "name": "Fallen Empires",
    "year": 1994,
    "releasedAt": "1994-11-01",
    "code": "FEM",
    "setType": "Expansion",
    "cardCount": 187,
    "releaseOrder": 1028,
    "icon": {
      "alt": "Fallen Empires set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/fem.svg?1780891200",
      "localPath": "/mtg-symbols/1028-fem-fallen-empires.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fem"
  },
  {
    "id": "b32cc4a1-1e06-4bec-bab6-89b2691b57a4",
    "name": "HarperPrism Book Promos",
    "year": 1994,
    "releasedAt": "1994-09-01",
    "code": "PHPR",
    "setType": "Promo",
    "cardCount": 5,
    "releaseOrder": 1029,
    "icon": {
      "alt": "HarperPrism Book Promos set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pbook.svg?1780891200",
      "localPath": "/mtg-symbols/1029-phpr-harperprism-book-promos.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/phpr"
  },
  {
    "id": "a21c6836-c435-459a-81e3-22d2da174549",
    "name": "The Dark",
    "year": 1994,
    "releasedAt": "1994-08-01",
    "code": "DRK",
    "setType": "Expansion",
    "cardCount": 122,
    "releaseOrder": 1030,
    "icon": {
      "alt": "The Dark set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/drk.svg?1780891200",
      "localPath": "/mtg-symbols/1030-drk-the-dark.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/drk"
  },
  {
    "id": "c77cb8ee-8c7c-4177-af59-53d591150bef",
    "name": "Dragon Con",
    "year": 1994,
    "releasedAt": "1994-07-15",
    "code": "PDRC",
    "setType": "Promo",
    "cardCount": 1,
    "releaseOrder": 1031,
    "icon": {
      "alt": "Dragon Con set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/pdrc.svg?1780891200",
      "localPath": "/mtg-symbols/1031-pdrc-dragon-con.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/pdrc"
  },
  {
    "id": "7993c591-1361-4dcb-b2af-ac94dd8e86e8",
    "name": "Summer Magic / Edgar",
    "year": 1994,
    "releasedAt": "1994-06-21",
    "code": "SUM",
    "setType": "Core",
    "cardCount": 306,
    "releaseOrder": 1032,
    "icon": {
      "alt": "Summer Magic / Edgar set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/psum.svg?1780891200",
      "localPath": "/mtg-symbols/1032-sum-summer-magic-edgar.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/sum"
  },
  {
    "id": "78c50b4b-b220-455b-a2d5-cee458fa56f3",
    "name": "Legends",
    "year": 1994,
    "releasedAt": "1994-06-01",
    "code": "LEG",
    "setType": "Expansion",
    "cardCount": 310,
    "releaseOrder": 1033,
    "icon": {
      "alt": "Legends set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/leg.svg?1780891200",
      "localPath": "/mtg-symbols/1033-leg-legends.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/leg"
  },
  {
    "id": "45a69797-8adf-468e-a4e1-ba81fd9d66ac",
    "name": "Revised Edition",
    "year": 1994,
    "releasedAt": "1994-04-11",
    "code": "3ED",
    "setType": "Core",
    "cardCount": 306,
    "releaseOrder": 1034,
    "icon": {
      "alt": "Revised Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/3ed.svg?1780891200",
      "localPath": "/mtg-symbols/1034-3ed-revised-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/3ed"
  },
  {
    "id": "60648044-9f6a-4961-81af-47a0a94dfac9",
    "name": "Foreign Black Border",
    "year": 1994,
    "releasedAt": "1994-04-11",
    "code": "FBB",
    "setType": "Core",
    "cardCount": 307,
    "releaseOrder": 1035,
    "icon": {
      "alt": "Foreign Black Border set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/3ed.svg?1780891200",
      "localPath": "/mtg-symbols/1035-fbb-foreign-black-border.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/fbb"
  },
  {
    "id": "819f9678-87dd-4aba-a47b-2d553bfea21f",
    "name": "Antiquities",
    "year": 1994,
    "releasedAt": "1994-03-04",
    "code": "ATQ",
    "setType": "Expansion",
    "cardCount": 102,
    "releaseOrder": 1036,
    "icon": {
      "alt": "Antiquities set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/atq.svg?1780891200",
      "localPath": "/mtg-symbols/1036-atq-antiquities.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/atq"
  },
  {
    "id": "856f63eb-e056-43e5-8a56-7a58e1608940",
    "name": "Arabian Nights",
    "year": 1993,
    "releasedAt": "1993-12-17",
    "code": "ARN",
    "setType": "Expansion",
    "cardCount": 92,
    "releaseOrder": 1037,
    "icon": {
      "alt": "Arabian Nights set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/arn.svg?1780891200",
      "localPath": "/mtg-symbols/1037-arn-arabian-nights.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/arn"
  },
  {
    "id": "fdde66b9-027a-43e8-9aa4-5d338f379ade",
    "name": "Collectors' Edition",
    "year": 1993,
    "releasedAt": "1993-12-10",
    "code": "CED",
    "setType": "Memorabilia",
    "cardCount": 302,
    "releaseOrder": 1038,
    "icon": {
      "alt": "Collectors' Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/ced.svg?1780891200",
      "localPath": "/mtg-symbols/1038-ced-collectors-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/ced"
  },
  {
    "id": "b2ab5603-659f-41ff-93cd-7abfc35aa006",
    "name": "Intl. Collectors' Edition",
    "year": 1993,
    "releasedAt": "1993-12-10",
    "code": "CEI",
    "setType": "Memorabilia",
    "cardCount": 302,
    "releaseOrder": 1039,
    "icon": {
      "alt": "Intl. Collectors' Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/cei.svg?1780891200",
      "localPath": "/mtg-symbols/1039-cei-intl-collectors-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/cei"
  },
  {
    "id": "cd7694b9-339c-405d-a991-14413d4f6d5c",
    "name": "Unlimited Edition",
    "year": 1993,
    "releasedAt": "1993-12-01",
    "code": "2ED",
    "setType": "Core",
    "cardCount": 302,
    "releaseOrder": 1040,
    "icon": {
      "alt": "Unlimited Edition set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/2ed.svg?1780891200",
      "localPath": "/mtg-symbols/1040-2ed-unlimited-edition.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/2ed"
  },
  {
    "id": "5307bd88-637c-4a5c-9801-a0d887715302",
    "name": "Limited Edition Beta",
    "year": 1993,
    "releasedAt": "1993-10-04",
    "code": "LEB",
    "setType": "Core",
    "cardCount": 302,
    "releaseOrder": 1041,
    "icon": {
      "alt": "Limited Edition Beta set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/leb.svg?1780891200",
      "localPath": "/mtg-symbols/1041-leb-limited-edition-beta.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/leb"
  },
  {
    "id": "288bd996-960e-448b-a187-9504c1930c2c",
    "name": "Limited Edition Alpha",
    "year": 1993,
    "releasedAt": "1993-08-05",
    "code": "LEA",
    "setType": "Core",
    "cardCount": 295,
    "releaseOrder": 1042,
    "icon": {
      "alt": "Limited Edition Alpha set symbol",
      "sourceUrl": "https://svgs.scryfall.io/sets/lea.svg?1780891200",
      "localPath": "/mtg-symbols/1042-lea-limited-edition-alpha.svg"
    },
    "scryfallUrl": "https://scryfall.com/sets/lea"
  }
] satisfies MtgSet[];
