import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import JsBarcode from "jsbarcode";

export default function EventSkuBarcode({ value, compact = false }: { value: string; compact?: boolean }) {
  const barcodeRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (barcodeRef.current) JsBarcode(barcodeRef.current, value || "000000000", {
      format: "CODE128", width: 2, height: compact ? 32 : 48,
      fontSize: compact ? 14 : 18, margin: compact ? 6 : 12,
    });
  }, [value, compact]);
  return <Box className="event-barcode" sx={{ width: compact ? 200 : 225, border: "1px solid #111", mt: compact ? 0.5 : 1 }}>
    <svg ref={barcodeRef} role="img" aria-label={`Event SKU ${value}`} style={{ width: "100%", height: "auto", display: "block" }} />
  </Box>;
}
