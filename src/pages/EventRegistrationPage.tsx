import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { ChangeEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GeekdLogo from "../assets/GEEKD-Logo-Primary.png";
import PokemonPrereleasePrint from "./PokemonPrereleasePrint";
import Barcode from "../components/EventSkuBarcode";

type Attendee = {
  id: string;
  name: string;
  phone: string;
  email: string;
  signedDate: string;
  employeeInitial: string;
  paid: boolean;
  enteredInSoftware: boolean;
};

type EventSheet = {
  template: "standard" | "pokemon";
  eventName: string;
  game: string;
  eventCode: string;
  qrDestination: string;
  softwareLabel: string;
  printEmail: boolean;
  date: string;
  time: string;
  entryFee: string;
  host: string;
  spots: string;
  teamBased: boolean;
  teamSize: string;
  sku: string;
  banner: string;
  bannerDayColor: "black" | "white";
  staffNotes: string;
  attendees: Attendee[];
  waitlist: Attendee[];
};

type SavedSheet = { id: string; data: EventSheet };
type SheetLibrary = { activeId: string; sheets: SavedSheet[] };

const storageKey = "geekd.eventRegistrationSheets.v2";
const legacyStorageKey = "geekd.eventRegistrationSheet.v1";

function registrationQr(destination: string, code: string) {
  if (!destination.trim()) return { value: "", error: "" };
  try {
    const url = new URL(destination.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return { value: "", error: "Enter an http or https URL." };
    }
    if (!code.trim()) return { value: "", error: "" };
    url.searchParams.set("shortCode", code.trim());
    return { value: url.toString(), error: "" };
  } catch {
    return { value: "", error: "Enter a complete URL, including https://." };
  }
}

const newSku = () =>
  `${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;

const createAttendee = (): Attendee => ({
  id: crypto.randomUUID(),
  name: "",
  phone: "",
  email: "",
  signedDate: "",
  employeeInitial: "",
  paid: false,
  enteredInSoftware: false,
});

const createSheet = (): EventSheet => ({
  template: "standard",
  eventName: "",
  game: "",
  eventCode: "",
  qrDestination: "",
  softwareLabel: "WPN?",
  printEmail: false,
  date: "",
  time: "",
  entryFee: "",
  host: "",
  spots: "16",
  teamBased: false,
  teamSize: "2",
  sku: newSku(),
  banner: "",
  bannerDayColor: "white",
  staffNotes: "",
  attendees: Array.from({ length: 16 }, createAttendee),
  waitlist: [],
});

const normalizeSheet = (data: Partial<EventSheet>): EventSheet => {
  const restored = { ...createSheet(), ...data };
  const spotCount = Math.max(0, Math.min(200, Number(restored.spots) || 0));
  return {
    ...restored,
    attendees: Array.from(
      { length: spotCount },
      (_, index) => restored.attendees?.[index] ?? createAttendee()
    ),
    waitlist: Array.isArray(restored.waitlist) ? restored.waitlist : [],
  };
};

const loadSheetLibrary = (): SheetLibrary => {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<SheetLibrary>;
      const sheets = Array.isArray(parsed.sheets)
        ? parsed.sheets
            .filter((item): item is SavedSheet => Boolean(item && typeof item.id === "string" && item.data))
            .map((item) => ({ id: item.id, data: normalizeSheet(item.data) }))
        : [];
      if (sheets.length) {
        const activeId = sheets.some((item) => item.id === parsed.activeId)
          ? parsed.activeId!
          : sheets[0].id;
        return { activeId, sheets };
      }
    }

    const legacy = localStorage.getItem(legacyStorageKey);
    const first = legacy
      ? normalizeSheet(JSON.parse(legacy) as Partial<EventSheet>)
      : createSheet();
    const id = crypto.randomUUID();
    return { activeId: id, sheets: [{ id, data: first }] };
  } catch {
    const id = crypto.randomUUID();
    return { activeId: id, sheets: [{ id, data: createSheet() }] };
  }
};

function AttendeeRow({
  attendee,
  index,
  onChange,
  onRemove,
}: {
  attendee: Attendee;
  index: number;
  onChange: (id: string, field: keyof Attendee, value: string | boolean) => void;
  onRemove?: (id: string) => void;
}) {
  return (
    <TableRow className="attendee-row">
      <TableCell className="attendee-number"><Typography fontWeight={800}>{index + 1}</Typography></TableCell>
      {(["name", "phone", "email"] as const).map((field) => (
        <TableCell key={field} className={`attendee-${field}`}><TextField fullWidth size="small" value={attendee[field]} onChange={(event) => onChange(attendee.id, field, event.target.value)} placeholder={field === "name" ? "Name" : field === "phone" ? "Phone" : "Email"} inputProps={{ "aria-label": `${field} for entry ${index + 1}` }} /></TableCell>
      ))}
      <TableCell className="attendee-paid"><Checkbox className="print-check" checked={attendee.paid} onChange={(event) => onChange(attendee.id, "paid", event.target.checked)} inputProps={{ "aria-label": `Paid for entry ${index + 1}` }} /></TableCell>
      <TableCell className="attendee-software"><Checkbox className="print-check" checked={attendee.enteredInSoftware} onChange={(event) => onChange(attendee.id, "enteredInSoftware", event.target.checked)} inputProps={{ "aria-label": `Entered in software for entry ${index + 1}` }} /></TableCell>
      {(["signedDate", "employeeInitial"] as const).map((field) => <TableCell key={field}><TextField fullWidth size="small" value={attendee[field] || ""} onChange={(event) => onChange(attendee.id, field, event.target.value)} inputProps={{ "aria-label": `${field} for entry ${index + 1}` }} /></TableCell>)}
      {onRemove ? <TableCell className="no-print"><Button color="error" onClick={() => onRemove(attendee.id)} aria-label={`Remove entry ${index + 1}`} sx={{ minWidth: 36, px: 0 }}><DeleteOutlineIcon fontSize="small" /></Button></TableCell> : null}
    </TableRow>
  );
}

export default function EventRegistrationPage() {
  const [library, setLibrary] = useState<SheetLibrary>(loadSheetLibrary);
  const [bannerError, setBannerError] = useState("");
  const [saveError, setSaveError] = useState("");

  const activeRecord = library.sheets.find((item) => item.id === library.activeId) ?? library.sheets[0];
  const sheet = activeRecord.data;
  const qr = registrationQr(sheet.qrDestination, sheet.eventCode);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(library));
    } catch {
      console.warn("Could not save the event sheet library locally. Browser storage may be full.");
    }
  }, [library]);

  const spotCount = Math.max(0, Math.min(200, Number(sheet.spots) || 0));
  const fullAttendees = sheet.attendees;
  const teamCount = sheet.teamBased ? spotCount : 0;
  const eventDate = sheet.date ? new Date(`${sheet.date}T${sheet.time || "12:00"}`) : null;
  const formattedDate = eventDate && !Number.isNaN(eventDate.getTime())
    ? eventDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "________________";
  const bannerWeekday = eventDate && !Number.isNaN(eventDate.getTime())
    ? eventDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
    : "";
  const formattedTime = eventDate && sheet.time && !Number.isNaN(eventDate.getTime())
    ? eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "";
  const fee = Number(sheet.entryFee.replace(/[^0-9.]/g, ""));
  const formattedFee = sheet.entryFee && Number.isFinite(fee)
    ? fee.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "________________";

  const setSheet = (update: EventSheet | ((previous: EventSheet) => EventSheet)) => {
    setLibrary((previous) => ({
      ...previous,
      sheets: previous.sheets.map((item) => item.id === previous.activeId
        ? { ...item, data: typeof update === "function" ? update(item.data) : update }
        : item),
    }));
  };

  const updateSheet = <Key extends keyof EventSheet>(key: Key, value: EventSheet[Key]) =>
    setSheet((previous) => ({ ...previous, [key]: value }));

  const createNewSheet = () => {
    const id = crypto.randomUUID();
    setLibrary((previous) => ({
      activeId: id,
      sheets: [...previous.sheets, { id, data: createSheet() }],
    }));
  };

  const duplicateSheet = () => {
    const id = crypto.randomUUID();
    const data = structuredClone(sheet);
    data.eventName = `${sheet.eventName.trim() || "Untitled sheet"} (copy)`;
    data.attendees = data.attendees.map((attendee) => ({ ...attendee, id: crypto.randomUUID() }));
    data.waitlist = data.waitlist.map((attendee) => ({ ...attendee, id: crypto.randomUUID() }));
    setLibrary((previous) => ({ activeId: id, sheets: [...previous.sheets, { id, data }] }));
  };

  const saveSheetLibrary = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(library));
      setSaveError("");
    } catch {
      setSaveError("Could not save locally. Browser storage may be full; try removing large banner images from older sheets.");
    }
  };

  const updateAttendee = (list: "attendees" | "waitlist", id: string, field: keyof Attendee, value: string | boolean) => {
    setSheet((previous) => ({
      ...previous,
      [list]: previous[list].map((attendee) => attendee.id === id ? { ...attendee, [field]: value } : attendee),
    }));
  };

  const removeWaitlistEntry = (id: string) => setSheet((previous) => ({ ...previous, waitlist: previous.waitlist.filter((attendee) => attendee.id !== id) }));
  const handleBanner = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setBannerError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setBannerError("Choose an image file for the event banner.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setBannerError("Banner images must be 3 MB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateSheet("banner", String(reader.result));
    reader.onerror = () => setBannerError("Could not read that image.");
    reader.readAsDataURL(file);
  };

  return (
    <Container className="event-registration-page" maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
      <style>{`
        .print-only-list { display: none; }
        @page { size: letter portrait; margin: ${sheet.template === "pokemon" ? "0.5in" : "calc(0.175in + 16px) 0.25in calc(0.375in + 16px)"}; }
        @media print {
          .print-only-list { display: block !important; }
          body { background: #fff !important; }
          body * { visibility: hidden !important; }
          .event-print, .event-print * { visibility: visible !important; }
          .event-registration-page { box-sizing: border-box !important; width: 100% !important; max-width: none !important; padding: 0 !important; margin: 0 !important; }
          .event-print { position: static !important; box-sizing: border-box !important; width: 100% !important; max-width: none !important; padding: 0.04in 0.28in 0.22in !important; margin: 0 !important; color: #111 !important; overflow: visible !important; }
          .event-print .MuiStack-root { min-width: 0 !important; }
          .MuiAppBar-root, .no-print, .event-sheet-toolbar, .event-sheet-form { display: none !important; }
          .event-print, .event-print input, .event-print p, .event-print th { font-family: Arial, sans-serif !important; }
          .event-banner { max-height: none !important; height: auto !important; object-fit: contain !important; border-radius: 0 !important; }
          .event-banner-day { font-size: 42pt !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .event-sheet-header { display: flex !important; flex-direction: column !important; align-items: stretch !important; gap: 8px !important; padding: 0 0 8px !important; }
          .event-sheet-brand { display: flex !important; align-items: center !important; gap: 12px !important; width: 100% !important; }
          .event-sheet-brand img { width: 1.35in !important; flex: 0 0 1.35in !important; }
          .event-sheet-brand h2 { font-size: 24px !important; line-height: 1.1 !important; overflow-wrap: normal !important; }
          .event-sheet-brand.no-print { display: none !important; }
          .event-print > .MuiStack-root { display: block !important; }
          .table-scroll { overflow: visible !important; }
          .event-summary { display: grid !important; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr) !important; gap: 8px !important; }
          .event-summary > .MuiPaper-root { min-width: 0 !important; padding: 8px !important; }
          .event-summary { margin-bottom: 0.25in !important; }
          .event-summary p { font-size: 11pt !important; line-height: 1.35 !important; }
          .event-barcode { width: 2.3in !important; max-width: 100% !important; }
          .event-barcode svg { display: block !important; width: 100% !important; height: auto !important; }
          .event-barcode p { font-size: 12px !important; }
          .attendee-table { width: 100% !important; min-width: 0 !important; table-layout: fixed !important; border-collapse: collapse !important; }
          .attendee-table thead { display: table-header-group !important; }
          .attendee-table tr { break-inside: avoid !important; }
          .attendee-table th, .attendee-table td { padding: 5px !important; border: 0.75pt solid #111 !important; vertical-align: top !important; }
          .attendee-table th { height: 0.45in !important; font-size: 10pt !important; line-height: 1.15 !important; font-weight: 700 !important; color: #111 !important; }
          .attendee-table th:nth-child(1) { width: 5%; }
          .attendee-table th:nth-child(2) { width: 22%; }
          .attendee-table th:nth-child(3) { width: 16%; }
          .attendee-table th:nth-child(4) { width: 19%; }
          .attendee-table th:nth-child(5) { width: 7%; }
          .attendee-table th:nth-child(6) { width: 8%; }
          .attendee-table th:nth-child(7) { width: 13%; }
          .attendee-table th:nth-child(8) { width: 10%; }
          .omit-print-email .attendee-table th:nth-child(4), .omit-print-email .attendee-table td:nth-child(4) { display: none !important; }
          .omit-print-email .attendee-table th:nth-child(2) { width: 35%; }
          .omit-print-email .attendee-table th:nth-child(3) { width: 20%; }
          .omit-print-email .attendee-table th:nth-child(5) { width: 8%; }
          .omit-print-email .attendee-table th:nth-child(7) { width: 14%; }
          .attendee-row { height: 0.4in !important; }
          .attendee-number p { font-size: 11pt !important; font-weight: 400 !important; }
          .attendee-row input { border: 0 !important; padding: 0 !important; font-size: 10px !important; }
          .attendee-row input::placeholder { color: transparent !important; }
          .attendee-row .print-check:not(.Mui-checked), .attendee-row .print-check:not(.Mui-checked) * { visibility: hidden !important; }
          .attendee-row .MuiOutlinedInput-notchedOutline { border: 0 !important; }
          .attendee-row .MuiCheckbox-root { padding: 2px !important; }
          .attendee-row .MuiCheckbox-root svg { width: 16px; height: 16px; }
          .attendee-row .MuiFormControl-root, .attendee-row .MuiInputBase-root { min-width: 0 !important; width: 100% !important; }
          .roster-title { display: none !important; }
          .print-only-list.empty-waitlist { display: none !important; }
          .waitlist-title { font-size: 14px !important; line-height: 1.2 !important; break-after: avoid-page !important; }
          .event-sheet-header, .event-summary, .print-section > .MuiPaper-root { break-inside: avoid; }
          .print-section { break-inside: auto; }
          .event-print table { width: 100%; }
        }
      `}</style>
      <Stack spacing={2}>
        <Paper className="event-sheet-toolbar no-print" sx={{ p: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", md: "center" }} gap={1.5}>
            <Box>
              <Typography variant="h1" sx={{ fontSize: { xs: 26, md: 34 } }}>Event Registration Sheet</Typography>
              <Typography color="text.secondary">Build the roster, track check-in, and print an employee-ready event sheet.</Typography>
            </Box>
            <Stack direction="row" gap={1} useFlexGap flexWrap="wrap" alignItems="center">
              <TextField
                select
                size="small"
                label="Saved signup sheets"
                value={activeRecord.id}
                onChange={(event) => setLibrary((previous) => ({ ...previous, activeId: event.target.value }))}
                sx={{ minWidth: { xs: "100%", sm: 250 } }}
              >
                {library.sheets.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {[item.data.eventName.trim() || "Untitled sheet", item.data.date, item.data.sku]
                      .filter(Boolean)
                      .join(" · ")}
                  </MenuItem>
                ))}
              </TextField>
              <Button variant="outlined" startIcon={<AddIcon />} onClick={createNewSheet}>New Sheet</Button>
              <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={duplicateSheet}>Duplicate Sheet</Button>
              <Button variant="outlined" startIcon={<SaveIcon />} onClick={saveSheetLibrary}>Save Locally</Button>
              <Button variant="contained" startIcon={<PrintIcon />} onClick={() => window.print()}>Print Sheet</Button>
            </Stack>
          </Stack>
        </Paper>

        {saveError ? <Alert severity="warning" className="no-print">{saveError}</Alert> : null}
        {bannerError ? <Alert severity="error" className="no-print">{bannerError}</Alert> : null}

        <Paper className="event-sheet-form no-print" sx={{ p: { xs: 1.5, md: 2 } }}>
          <Stack spacing={1.5}>
            <Typography variant="h2">Event Details</Typography>
            <TextField select label="Sheet template" value={sheet.template} onChange={(event) => {
              const template = event.target.value as EventSheet["template"];
              setSheet((previous) => template === "pokemon" ? {
                ...previous, template, game: "Pokemon", spots: "50", entryFee: previous.entryFee || "28",
                attendees: Array.from({ length: 50 }, (_, index) => previous.attendees[index] ?? createAttendee()),
                waitlist: Array.from({ length: previous.waitlist.length || 5 }, (_, index) => previous.waitlist[index] ?? createAttendee()),
              } : { ...previous, template });
            }} sx={{ maxWidth: 360 }}>
              <MenuItem value="standard">Magic Prerelease Signup</MenuItem>
              <MenuItem value="pokemon">Pokemon Prerelease</MenuItem>
            </TextField>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 1.25 }}>
              <TextField label="Event name" value={sheet.eventName} onChange={(e) => updateSheet("eventName", e.target.value)} />
              <TextField label="Game / TCG" value={sheet.game} onChange={(e) => updateSheet("game", e.target.value)} />
              {sheet.template === "standard" ? <><TextField label="Registration code" value={sheet.eventCode} onChange={(e) => updateSheet("eventCode", e.target.value)} />
              <TextField label="Registration URL" type="url" value={sheet.qrDestination} onChange={(e) => updateSheet("qrDestination", e.target.value)} error={Boolean(qr.error)} helperText={qr.error || undefined} />
              <TextField label="Software column heading" value={sheet.softwareLabel} onChange={(e) => updateSheet("softwareLabel", e.target.value)} /></> : null}
              <TextField label="Date" type="date" value={sheet.date} onChange={(e) => updateSheet("date", e.target.value)} InputLabelProps={{ shrink: true }} />
              <TextField label="Start time" type="time" value={sheet.time} onChange={(e) => updateSheet("time", e.target.value)} InputLabelProps={{ shrink: true }} />
              <TextField label="Entry fee" value={sheet.entryFee} onChange={(e) => updateSheet("entryFee", e.target.value)} placeholder="$35.00" />
              {sheet.template === "standard" ? <TextField label="Host / lead" value={sheet.host} onChange={(e) => updateSheet("host", e.target.value)} /> : null}
              <TextField label="Number of spots" type="number" value={sheet.spots} onChange={(e) => {
                const spots = Math.min(200, Math.max(0, Number(e.target.value) || 0));
                setSheet((previous) => ({
                  ...previous,
                  spots: String(spots),
                  attendees: Array.from(
                    { length: spots },
                    (_, index) => previous.attendees[index] ?? createAttendee()
                  ),
                }));
              }} inputProps={{ min: 0, max: 200 }} />
              <TextField label="Event SKU" value={sheet.sku} onChange={(e) => updateSheet("sku", e.target.value.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 24))} />
              <TextField label="Waitlist spots" type="number" value={sheet.waitlist.length} onChange={(event) => {
                const count = Math.min(200, Math.max(0, Number(event.target.value) || 0));
                setSheet((previous) => ({ ...previous, waitlist: Array.from({ length: count }, (_, index) => previous.waitlist[index] ?? createAttendee()) }));
              }} inputProps={{ min: 0, max: 200 }} />
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} gap={1}>
              {sheet.template === "standard" ? <><FormControlLabel control={<Checkbox checked={sheet.teamBased} onChange={(e) => updateSheet("teamBased", e.target.checked)} />} label="Team-based spots" />
              <FormControlLabel control={<Checkbox checked={sheet.printEmail} onChange={(e) => updateSheet("printEmail", e.target.checked)} />} label="Include email on printout" />
              {sheet.teamBased ? <TextField label="People per team" type="number" value={sheet.teamSize} onChange={(e) => updateSheet("teamSize", e.target.value)} inputProps={{ min: 1 }} sx={{ maxWidth: 210 }} /> : null}</> : null}
              <Button component="label" variant="outlined">Upload Banner Image<input hidden type="file" accept="image/*" onChange={handleBanner} /></Button>
              {sheet.banner ? <Button color="error" onClick={() => updateSheet("banner", "")}>Remove Banner</Button> : null}
            </Stack>
            {sheet.banner && sheet.template === "standard" ? <Stack direction="row" alignItems="center" gap={1.5}>
              <Typography id="banner-day-color-label">Weekday text</Typography>
              <ToggleButtonGroup
                exclusive
                size="small"
                value={sheet.bannerDayColor}
                aria-labelledby="banner-day-color-label"
                onChange={(_, color: "black" | "white" | null) => {
                  if (color) updateSheet("bannerDayColor", color);
                }}
              >
                {(["black", "white"] as const).map((color) => <ToggleButton key={color} value={color} sx={{ gap: 1 }}>
                  <Box component="span" sx={{ width: 16, height: 16, bgcolor: color, border: "1px solid #777", borderRadius: "50%" }} />
                  {color === "black" ? "Black" : "White"}
                </ToggleButton>)}
              </ToggleButtonGroup>
            </Stack> : null}
            {sheet.template === "standard" ? <TextField label="Employee instructions" value={sheet.staffNotes} onChange={(e) => updateSheet("staffNotes", e.target.value)} multiline minRows={2} placeholder="Setup, check-in, seating, prizes, or other staff steps" /> : null}
          </Stack>
        </Paper>

        {sheet.template === "pokemon" ? <PokemonPrereleasePrint sku={sheet.sku} banner={sheet.banner} date={sheet.date} time={sheet.time} entryFee={sheet.entryFee} attendees={sheet.attendees} waitlist={sheet.waitlist} /> : <Paper className={`event-print${sheet.printEmail ? "" : " omit-print-email"}`} elevation={0} sx={{ p: { xs: 1.5, md: 2.5 } }}>
          <Stack spacing={1.5}>
            <Box className="event-sheet-header print-section" sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignItems: "stretch" }}>
              {sheet.banner ? <Box sx={{ position: "relative" }}>
                <Box component="img" className="event-banner" src={sheet.banner} alt="Event banner" sx={{ display: "block", width: "100%", maxHeight: 230, objectFit: "cover", borderRadius: 1 }} />
                {bannerWeekday ? <Typography className="event-banner-day" component="div" sx={{ position: "absolute", bottom: 12, right: 16, maxWidth: "calc(100% - 32px)", fontSize: { xs: 28, sm: 48, md: 56 }, lineHeight: 1, fontWeight: 900, letterSpacing: 0, color: sheet.bannerDayColor, pointerEvents: "none" }}>{bannerWeekday}</Typography> : null}
              </Box> : null}
              <Box className={`event-sheet-brand${sheet.banner ? " no-print" : ""}`} sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                <Box component="img" src={GeekdLogo} alt="Geekd" sx={{ width: 110, flex: "0 0 110px", objectFit: "contain" }} />
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="h2" sx={{ fontSize: { xs: 24, md: 32 }, overflowWrap: "break-word" }}>{sheet.eventName || "Event Registration"}</Typography>
                  <Typography color="text.secondary" fontWeight={700}>{sheet.game || "Game / TCG"}</Typography>
                </Box>
              </Box>
            </Box>

            <Box className="event-summary print-section" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1.2fr 0.8fr" }, gap: 1.5 }}>
              <Box>
                <Stack spacing={0.25}>
                  {qr.value ? <QRCodeSVG value={qr.value} size={100} marginSize={0} style={{ marginBottom: 8 }} /> : null}
                  <Typography>Code: <Box component="strong" sx={{ color: "#6264dc", fontSize: 23 }}>{sheet.eventCode || "________________"}</Box></Typography>
                  <Typography fontWeight={700}>{formattedDate}{formattedTime ? ` @ ${formattedTime}` : ""}</Typography>
                  <Typography>Capacity: <b>{spotCount}</b> {sheet.teamBased ? `teams / ${teamCount * (Number(sheet.teamSize) || 0)} players` : ""}</Typography>
                  <Typography>Entry Fee <b>{formattedFee} {sheet.teamBased ? "PER TEAM" : "EACH"}</b></Typography>
                  <Typography>Host: <b>{sheet.host || "________________"}</b></Typography>
                </Stack>
              </Box>
              <Box>
                <Typography fontWeight={900}>EMPLOYEES</Typography><Typography color="error.main" fontWeight={900}>SCAN THIS BARCODE</Typography>
                <Barcode value={sheet.sku || "000000000"} />
                <Box component="img" src={GeekdLogo} alt="Geekd" sx={{ width: 80, mt: 1.5 }} />
              </Box>
            </Box>

            {sheet.staffNotes.trim() ? <Paper className="print-section" variant="outlined" sx={{ p: 1.5, bgcolor: "#f7f9fc" }}><Typography fontWeight={900}>EMPLOYEE DETAILS</Typography><Typography sx={{ whiteSpace: "pre-wrap" }}>{sheet.staffNotes}</Typography></Paper> : null}

            <Box className="print-section print-only-list">
              <Typography className="roster-title" variant="h2" sx={{ mb: 0.5 }}>Registration Roster {sheet.teamBased ? `(Teams of ${sheet.teamSize || "?"})` : ""}</Typography>
              <Box className="table-scroll" sx={{ overflowX: "auto" }}>
                <Table className="attendee-table" size="small" sx={{ minWidth: { xs: 580, md: 0 } }}>
                  <TableHead><TableRow>
                    {["No.", "Name", "Phone Number", "Email", "Paid?", sheet.softwareLabel || "In software?", "Date", "Empl. Initial"].map((label) => <TableCell key={label} component="th" scope="col" sx={{ color: "text.secondary", fontSize: 12, fontWeight: 800, px: 0.5 }}>{label}</TableCell>)}
                  </TableRow></TableHead>
                  <TableBody>{fullAttendees.map((attendee, index) => <AttendeeRow key={attendee.id} attendee={attendee} index={index} onChange={(id, field, value) => updateAttendee("attendees", id, field, value)} />)}</TableBody>
                </Table>
              </Box>
            </Box>

            <Box className={`print-section print-only-list waitlist-section${sheet.waitlist.length ? "" : " empty-waitlist"}`}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                <Typography className="waitlist-title" variant="h2">Waitlist ({sheet.waitlist.length})</Typography>
              </Stack>
              {sheet.waitlist.length ? <>
                <Box className="table-scroll" sx={{ overflowX: "auto" }}>
                  <Table className="attendee-table" size="small" sx={{ minWidth: { xs: 580, md: 0 } }}>
                    <TableHead><TableRow>
                      {["No.", "Name", "Phone Number", "Email", "Paid?", sheet.softwareLabel || "In software?", "Date", "Empl. Initial"].map((label) => <TableCell key={label} component="th" scope="col" sx={{ color: "text.secondary", fontSize: 12, fontWeight: 800, px: 0.5 }}>{label}</TableCell>)}
                      <TableCell className="no-print" />
                    </TableRow></TableHead>
                    <TableBody>{sheet.waitlist.map((attendee, index) => <AttendeeRow key={attendee.id} attendee={attendee} index={index} onChange={(id, field, value) => updateAttendee("waitlist", id, field, value)} onRemove={removeWaitlistEntry} />)}</TableBody>
                  </Table>
                </Box>
              </> : <Typography color="text.secondary" className="no-print">No waitlist entries yet.</Typography>}
            </Box>
          </Stack>
        </Paper>}
      </Stack>
    </Container>
  );
}
