import { jsPDF } from "jspdf";

// Formatted INR
const inr = (n) =>
  n >= 1e7
    ? `INR ${(n / 1e7).toFixed(2)} Cr`
    : n >= 1e5
    ? `INR ${(n / 1e5).toFixed(1)} L`
    : `INR ${Math.round(n).toLocaleString("en-IN")}`;

export function generateQuotePDF(quote, meta = {}) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  // Dark background
  doc.setFillColor(11, 11, 11);
  doc.rect(0, 0, W, H, "F");

  // Gold hairline top
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.line(48, 60, W - 48, 60);

  // Header
  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("THE KASHMIR ATELIER  ·  DUBAI  ·  SRINAGAR", 48, 80);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`Estimate No. ${(quote.id || "").slice(0, 8).toUpperCase()}`, W - 48, 80, { align: "right" });

  // Big serif title
  doc.setFont("times", "italic");
  doc.setFontSize(38);
  doc.setTextColor(255, 255, 255);
  doc.text("Indicative Estimate", 48, 160);
  doc.setFont("times", "normal");
  doc.setFontSize(38);
  doc.setTextColor(212, 175, 55);
  doc.text("for your commission.", 48, 205);

  // Gold rule
  doc.setDrawColor(212, 175, 55);
  doc.line(48, 235, 220, 235);

  // Meta grid
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(212, 175, 55);
  const rowY = 275;
  const labels = [
    ["PROJECT TYPE", (quote.project_type || "-").toString()],
    ["AREA", `${(quote.area_sqft || 0).toLocaleString("en-IN")} sqft`],
    ["QUALITY TIER", (quote.quality_tier || "").replace("_", "-")],
    ["LOCATION", quote.location || "-"],
  ];
  const colW = (W - 96) / labels.length;
  labels.forEach(([l, v], i) => {
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(7.5);
    doc.text(l, 48 + i * colW, rowY);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(String(v), 48 + i * colW, rowY + 20);
  });

  // Estimate box
  const boxY = 340;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.roundedRect(48, boxY, W - 96, 160, 6, 6);
  doc.setFillColor(20, 20, 20);
  doc.roundedRect(48, boxY, W - 96, 160, 6, 6, "F");
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(48, boxY, W - 96, 160, 6, 6);

  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("ESTIMATED RANGE", 68, boxY + 30);

  doc.setFont("times", "italic");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text(
    `${inr(quote.estimate_min || 0)}  —  ${inr(quote.estimate_max || 0)}`,
    68,
    boxY + 80
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(183, 183, 183);
  doc.text(
    "This is a preliminary, indicative range. A detailed bill of quantities follows any commission — with weekly cost transparency thereafter.",
    68,
    boxY + 115,
    { maxWidth: W - 136 }
  );

  // Footer
  doc.setDrawColor(212, 175, 55);
  doc.line(48, H - 130, W - 48, H - 130);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(212, 175, 55);
  doc.text("STUDIO", 48, H - 105);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("Sangar Mall, Nishat Brein Link Road,", 48, H - 88);
  doc.text("Srinagar, Jammu & Kashmir · 191121", 48, H - 74);

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(8);
  doc.text("CONTACT", W - 48, H - 105, { align: "right" });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("+91 6006921213", W - 48, H - 88, { align: "right" });
  doc.text("thekashmiratelier@gmail.com", W - 48, H - 74, { align: "right" });

  doc.setTextColor(212, 175, 55);
  doc.setFont("times", "italic");
  doc.setFontSize(11);
  doc.text("We don't build houses. We craft timeless masterpieces.", W / 2, H - 40, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}`,
    W / 2,
    H - 22,
    { align: "center" }
  );

  const filename = `Kashmir-Atelier-Estimate-${(quote.id || "quote").slice(0, 8)}.pdf`;
  doc.save(filename);
}
