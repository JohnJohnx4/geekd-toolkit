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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

import { pokemonSets, pokemonSetSymbolSource } from "../data/pokemonSets";

const normalize = (value: string) => value.toLowerCase().trim();

export default function PokemonSetSymbolsPage() {
  const [query, setQuery] = useState("");
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const filteredSets = useMemo(() => {
    const normalizedQuery = normalize(query);

    return pokemonSets.filter((set) => {
      const searchText = normalize(
        `${set.name} ${set.year} ${set.era} ${set.setNumber}`,
      );

      return !normalizedQuery || searchText.includes(normalizedQuery);
    });
  }, [query]);

  const setsByYear = useMemo(() => {
    const groups = new Map<number, typeof pokemonSets>();

    for (const set of filteredSets) {
      const yearSets = groups.get(set.year) ?? [];
      yearSets.push(set);
      groups.set(set.year, yearSets);
    }

    return [...groups.entries()]
      .sort(([yearA], [yearB]) => yearB - yearA)
      .map(([year, sets]) => ({
        year,
        sets: sets.sort((setA, setB) => setA.releaseOrder - setB.releaseOrder),
      }));
  }, [filteredSets]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Stack spacing={2.5}>
        <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h1" sx={{ fontSize: { xs: 30, sm: 42 } }}>
                Pokemon Set Symbols
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Search by set name, set number, era, or year.
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
                placeholder="Search symbols"
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
                Select a year to reveal its sets. {filteredSets.length} sets found.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Source:{" "}
                <Link href={pokemonSetSymbolSource} target="_blank" rel="noreferrer">
                  Octulos Pokemon TCG Set Symbols
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {setsByYear.map(({ year, sets }) => (
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
                  {sets.length} matching {sets.length === 1 ? "set" : "sets"}
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
                {sets.map((set) => (
                  <Paper key={set.id} sx={{ p: 1.5, borderRadius: 2 }}>
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
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          {set.images.map((image) => (
                            <Box
                              key={image.localPath}
                              component="img"
                              src={image.localPath}
                              alt={
                                image.alt && image.alt !== "undefined"
                                  ? image.alt
                                  : `${set.name} set symbol`
                              }
                              loading="lazy"
                              sx={{
                                width: set.images.length > 1 ? 28 : 42,
                                height: set.images.length > 1 ? 28 : 42,
                                objectFit: "contain",
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>

                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {set.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {set.era}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mt: 1, flexWrap: "wrap", rowGap: 0.75 }}
                        >
                          <Chip size="small" label={set.setNumber || "No number"} />
                          {set.checklistUrl ? (
                            <Button
                              size="small"
                              href={set.checklistUrl}
                              target="_blank"
                              rel="noreferrer"
                              sx={{ minHeight: 28 }}
                            >
                              Checklist
                            </Button>
                          ) : null}
                        </Stack>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}

        {!filteredSets.length ? (
          <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
            <Typography>No set symbols match that search.</Typography>
          </Paper>
        ) : null}
      </Stack>
    </Container>
  );
}
