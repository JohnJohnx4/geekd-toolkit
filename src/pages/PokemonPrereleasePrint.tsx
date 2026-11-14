import DeltaReignLogo from "../assets/pokemon-delta-reign.png";
import EventSkuBarcode from "../components/EventSkuBarcode";

type Player = { name: string; phone: string; playerId?: string; birthYear?: string; employeeInitial: string };
type Props = {
  sku: string;
  banner: string;
  date: string;
  time: string;
  entryFee: string;
  attendees: Player[];
  waitlist: Player[];
};

export default function PokemonPrereleasePrint({ sku, banner, date, time, entryFee, attendees, waitlist }: Props) {
  const eventDate = date ? new Date(`${date}T${time || "12:00"}`) : null;
  const validDate = eventDate && !Number.isNaN(eventDate.getTime());
  const day = validDate ? eventDate.getDate() : 0;
  const suffix = day % 100 >= 11 && day % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th");
  const dateLabel = validDate ? `${eventDate.toLocaleDateString("en-US", { month: "long" })} ${day}${suffix}` : "________________";
  const timeLabel = validDate && time ? eventDate.toLocaleTimeString("en-US", { hour: "numeric", ...(eventDate.getMinutes() ? { minute: "2-digit" as const } : {}) }).replace(/\s/g, "").toLowerCase() : "";
  const fee = Number(entryFee.replace(/[^0-9.]/g, ""));
  const feeLabel = entryFee && Number.isFinite(fee) ? `$${fee.toLocaleString("en-US", { maximumFractionDigits: 2 })}` : "________________";
  const pages: { start: number; players: Player[] }[] = [{ start: 0, players: attendees.slice(0, 15) }];
  for (let start = 15; start < attendees.length; start += 23) pages.push({ start, players: attendees.slice(start, start + 23) });

  // A full continuation page has no room for the ruled waitlist.
  if (waitlist.length && pages[pages.length - 1].players.length > (pages.length === 1 ? 5 : 13)) pages.push({ start: attendees.length, players: [] });
  const waitlistPages = Array.from({ length: Math.ceil(waitlist.length / 5) }, (_, index) => waitlist.slice(index * 5, index * 5 + 5));
  if (waitlistPages.length > 1) {
    for (let index = 1; index < waitlistPages.length; index++) pages.push({ start: attendees.length, players: [] });
  }
  const waitlistStartPage = pages.length - waitlistPages.length;

  return <div className="event-print pokemon-print">
    <style>{`
      .pokemon-print { font-family: Arial, sans-serif; background: white; color: black; }
      .pokemon-page { position: relative; }
      .pokemon-page:not(:first-child), .pokemon-table, .pokemon-waitlist { display: none; }
      .pokemon-header { position: relative; height: 334px; }
      .pokemon-set-logo { display: block; position: absolute; top: -33px; left: 50%; transform: translateX(-50%); width: 578px; height: 325px; max-width: 100%; object-fit: contain; }
      .pokemon-event-details { position: absolute; top: 263px; left: 0; font-size: 18.667px; line-height: 25.44px; }
      .pokemon-event-details p { margin: 0; }
      .pokemon-retail-barcode { position: absolute; top: 254px; right: 0; font-size: 12px; font-weight: 700; line-height: 14px; }
      .pokemon-retail-barcode .event-barcode { width: 200px !important; max-width: 100%; }
      @media print {
        .event-print.pokemon-print { padding: 0 !important; }
        .pokemon-page { display: block !important; break-after: page; }
        .pokemon-page:last-child { break-after: auto; }
        .pokemon-table { display: table; width: 100%; table-layout: fixed; border-collapse: collapse; }
        .pokemon-table thead { display: table-header-group; }
        .pokemon-table th, .pokemon-table td { border: 1px solid black; box-sizing: border-box; }
        .pokemon-table th { height: 50px; padding: 6px 4px; text-align: center; vertical-align: top; font-size: 14.667px; line-height: 17px; font-weight: 700; }
        .pokemon-table td { height: 38px; padding: 5px 7px; font-size: 16px; line-height: 24px; vertical-align: top; }
        .pokemon-table tr { break-inside: avoid; }
        .pokemon-player-number { font-size: 20px; margin-right: 5px; }
        .pokemon-waitlist { display: block; margin-top: 24px; break-inside: avoid; }
        .pokemon-waitlist h3 { margin: 0; font: 700 23px Arial, sans-serif; }
        .pokemon-waitlist-entry { height: 65px; border-bottom: 1px solid #888; font-size: 23px; padding-top: 8px; box-sizing: border-box; }
        .pokemon-event-details p { font-size: 18.667px !important; }
      }
    `}</style>
    {pages.map((page, index) => <section key={index} className="pokemon-page">
      {index === 0 ? <header className="pokemon-header">
        <img className="pokemon-set-logo" src={banner || DeltaReignLogo} alt="Pokemon prerelease set logo" />
        <div className="pokemon-event-details"><p><b>Date:</b> {dateLabel}{timeLabel ? ` @ ${timeLabel}` : ""}</p><p><b>Entry Fee:</b> {feeLabel}</p></div>
        <div className="pokemon-retail-barcode">EMPLOYEES - SCAN EVENT SKU<EventSkuBarcode value={sku} compact /></div>
      </header> : null}
      {page.players.length ? <table className="pokemon-table">
        <colgroup>{[26.2, 26.8, 18.65, 15.15, 13.2].map((width, column) => <col key={column} style={{ width: `${width}%` }} />)}</colgroup>
        <thead><tr>{["First & Last Name", "Phone Number", "Player ID", "Year of Birth", "Employee Initial"].map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
        <tbody>{page.players.map((player, row) => <tr key={page.start + row}>
          <td><span className="pokemon-player-number">{page.start + row + 1}.</span>{player.name}</td><td>{player.phone}</td><td>{player.playerId || ""}</td><td>{player.birthYear || ""}</td><td>{player.employeeInitial}</td>
        </tr>)}</tbody>
      </table> : null}
      {waitlistPages.length && index >= waitlistStartPage ? <div className="pokemon-waitlist"><h3>Waitlist</h3>{waitlistPages[index - waitlistStartPage].map((player, row) => <div className="pokemon-waitlist-entry" key={row}>{(index - waitlistStartPage) * 5 + row + 1}. {player.name}{player.phone ? ` - ${player.phone}` : ""}</div>)}</div> : null}
    </section>)}
  </div>;
}
