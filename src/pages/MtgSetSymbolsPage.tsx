import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

import { mtgSets, mtgSetSymbolSource } from "../data/mtgSets";
import type { MtgSet } from "../data/mtgSets";

type MtgSymbolGroup = {
  id: string;
  primary: MtgSet;
  related: MtgSet[];
};

const normalize = (value: string) => value.toLowerCase().trim();

const setTypePriority = [
  "Expansion",
  "Core",
  "Masters",
  "Draft Innovation",
  "Commander",
  "Alchemy",
  "Funny",
  "Starter",
  "Duel Deck",
  "From The Vault",
  "Spellbook",
  "Premium Deck",
  "Planechase",
  "Archenemy",
  "Box",
  "Promo",
  "Token",
  "Art Series",
  "Minigame",
  "Memorabilia",
];

const setPriority = (set: MtgSet) => {
  const typeIndex = setTypePriority.indexOf(set.setType);
  const normalizedTypeIndex =
    typeIndex === -1 ? setTypePriority.length : typeIndex;

  return normalizedTypeIndex * 100000 - set.cardCount;
};

const searchTextForGroup = (group: MtgSymbolGroup) =>
  normalize(
    group.related
      .map(
        (set) =>
          `${set.name} ${set.year} ${set.releasedAt} ${set.code} ${set.setType}`,
      )
      .join(" "),
  );

type SetSymbolsPanelProps = {
  embedded?: boolean;
};

export default function MtgSetSymbolsPage({
  embedded = false,
}: SetSymbolsPanelProps = {}) {
  const [query, setQuery] = useState("");
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const symbolGroups = useMemo(() => {
    const groups = new Map<string, MtgSet[]>();

    for (const set of mtgSets) {
      const related = groups.get(set.icon.sourceUrl) ?? [];
      related.push(set);
      groups.set(set.icon.sourceUrl, related);
    }

    return [...groups.entries()].map(([symbolUrl, related]) => {
      const sortedRelated = [...related].sort((setA, setB) => {
        const priorityCompare = setPriority(setA) - setPriority(setB);
        if (priorityCompare !== 0) {
          return priorityCompare;
        }

        const dateCompare = setB.releasedAt.localeCompare(setA.releasedAt);
        if (dateCompare !== 0) {
          return dateCompare;
        }

        return setA.code.localeCompare(setB.code);
      });

      return {
        id: symbolUrl,
        primary: sortedRelated[0],
        related: sortedRelated,
      };
    });
  }, []);

  const filteredGroups = useMemo(() => {
    const normalizedQuery = normalize(query);

    return symbolGroups.filter(
      (group) =>
        !normalizedQuery || searchTextForGroup(group).includes(normalizedQuery),
    );
  }, [query, symbolGroups]);

  const groupsByYear = useMemo(() => {
    const groups = new Map<number, MtgSymbolGroup[]>();

    for (const group of filteredGroups) {
      const yearGroups = groups.get(group.primary.year) ?? [];
      yearGroups.push(group);
      groups.set(group.primary.year, yearGroups);
    }

    return [...groups.entries()]
      .sort(([yearA], [yearB]) => yearB - yearA)
      .map(([year, groups]) => ({
        year,
        groups: groups.sort((groupA, groupB) =>
          groupB.primary.releasedAt.localeCompare(groupA.primary.releasedAt),
        ),
      }));
  }, [filteredGroups]);

  const content = (
      <Stack spacing={2.5}>
        <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
          <Stack spacing={2}>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <AutoFixHighIcon color="primary" />
                <Typography variant="h1" sx={{ fontSize: { xs: 30, sm: 42 } }}>
                  MTG Set Symbols
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Search by set name, code, set type, release date, or year.
              </Typography>
            </Box>

            <Box
              sx={{
                position: "sticky",
                top: 72,
                zIndex: 2,
                bgcolor: "background.paper",
                pb: 1,
              }}
            >
              <TextField
                fullWidth
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search MTG symbols"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              justifyContent="space-between"
            >
              <Typography variant="body2" color="text.secondary">
                Select a year to reveal its symbols. {filteredGroups.length} unique
                symbols found.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Source:{" "}
                <Link href={mtgSetSymbolSource} target="_blank" rel="noreferrer">
                  Scryfall Sets API
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {groupsByYear.map(({ year, groups }) => (
          <Accordion
            key={year}
            expanded={expandedYear === year}
            onChange={(_, isExpanded) => setExpandedYear(isExpanded ? year : null)}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: 64,
                "& .MuiAccordionSummary-content": {
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1.5,
                },
              }}
            >
              <Box>
                <Typography variant="h2" sx={{ fontSize: { xs: 24, sm: 30 } }}>
                  {year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {groups.length} matching{" "}
                  {groups.length === 1 ? "symbol" : "symbols"}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ pt: 0 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: 1.5,
                }}
              >
                {groups.map(({ primary, related }) => (
                  <Paper key={primary.id} sx={{ p: 1.5, borderRadius: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 64,
                          minWidth: 64,
                          minHeight: 64,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "grey.100",
                          borderRadius: 1.5,
                          border: "1px solid",
                          borderColor: "divider",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={primary.icon.localPath}
                          alt={primary.icon.alt}
                          loading="lazy"
                          sx={{
                            width: 44,
                            height: 44,
                            objectFit: "contain",
                            filter: "brightness(0)",
                          }}
                        />
                      </Box>

                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {primary.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {primary.releasedAt} - {primary.setType}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mt: 1, flexWrap: "wrap", rowGap: 0.75 }}
                        >
                          <Chip size="small" label={primary.code} />
                          <Chip size="small" label={`${primary.cardCount} cards`} />
                          {related.length > 1 ? (
                            <Chip
                              size="small"
                              label={`${related.length - 1} related`}
                            />
                          ) : null}
                          <Button
                            size="small"
                            href={primary.scryfallUrl}
                            target="_blank"
                            rel="noreferrer"
                            sx={{ minHeight: 28 }}
                          >
                            Scryfall
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}

        {!filteredGroups.length ? (
          <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
            <Typography>No MTG set symbols match that search.</Typography>
          </Paper>
        ) : null}
      </Stack>
  );

  if (embedded) return content;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      {content}
    </Container>
  );
}
