import PDFDocument from "pdfkit";

interface Registrant {
  name: string;
  email: string;
}

interface SOAData {
  soaNumber: string;
  requestorName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  tin: string;
  sproutClient: boolean;
  rate: number;
  subtotal: number;
  vat: number;
  total: number;
  registrants: Registrant[];
  createdAt?: Date;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

function formatDate(date?: Date): string {
  const d = date ?? new Date();
  return d.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateSOAPDF(data: SOAData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const buffers: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    const primaryColor = "#16a34a";
    const darkGray = "#1f2937";
    const mediumGray = "#6b7280";
    const lightGray = "#f3f4f6";
    const borderGray = "#e5e7eb";

    // ── Header ──
    doc.rect(0, 0, doc.page.width, 100).fill(primaryColor);

    doc
      .fillColor("#ffffff")
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("SPROUT SOLUTIONS", 50, 30);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text("Philippines Inc.", 50, 56);

    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .text("STATEMENT OF ACCOUNT", 50, 30, { align: "right" });

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#d1fae5")
      .text(`SOA Number: ${data.soaNumber}`, 50, 56, { align: "right" });

    doc.moveDown(0.5);

    // ── Meta info ──
    const metaY = 115;
    doc
      .fillColor(mediumGray)
      .fontSize(9)
      .font("Helvetica")
      .text("DATE ISSUED", 50, metaY)
      .fillColor(darkGray)
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(formatDate(data.createdAt), 50, metaY + 14);

    doc
      .fillColor(mediumGray)
      .fontSize(9)
      .font("Helvetica")
      .text("STATUS", 200, metaY)
      .fillColor("#dc2626")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("UNPAID", 200, metaY + 14);

    doc
      .fillColor(mediumGray)
      .fontSize(9)
      .font("Helvetica")
      .text("SPROUT CLIENT", 350, metaY)
      .fillColor(data.sproutClient ? primaryColor : "#dc2626")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(data.sproutClient ? "Yes" : "No", 350, metaY + 14);

    // ── Divider ──
    doc
      .moveTo(50, 155)
      .lineTo(doc.page.width - 50, 155)
      .strokeColor(borderGray)
      .lineWidth(1)
      .stroke();

    // ── Bill To ──
    const billY = 170;
    doc
      .fillColor(primaryColor)
      .fontSize(9)
      .font("Helvetica-Bold")
      .text("BILL TO", 50, billY);

    doc
      .fillColor(darkGray)
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(data.requestorName, 50, billY + 14);

    doc
      .fillColor(darkGray)
      .fontSize(10)
      .font("Helvetica")
      .text(data.companyName, 50, billY + 30)
      .text(data.companyAddress, 50, billY + 44)
      .text(`TIN: ${data.tin}`, 50, billY + 58)
      .text(data.email, 50, billY + 72);

    // ── Registrant Table Header ──
    const tableStartY = 290;

    doc
      .rect(50, tableStartY, doc.page.width - 100, 24)
      .fill(primaryColor);

    doc
      .fillColor("#ffffff")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text("#", 60, tableStartY + 7)
      .text("REGISTRANT NAME", 90, tableStartY + 7)
      .text("EMAIL ADDRESS", 310, tableStartY + 7);

    // ── Registrant Table Rows ──
    let rowY = tableStartY + 24;
    data.registrants.forEach((reg, idx) => {
      const isEven = idx % 2 === 0;
      doc
        .rect(50, rowY, doc.page.width - 100, 22)
        .fill(isEven ? "#ffffff" : lightGray);

      doc
        .fillColor(darkGray)
        .fontSize(9)
        .font("Helvetica")
        .text(String(idx + 1), 60, rowY + 6)
        .text(reg.name, 90, rowY + 6, { width: 210 })
        .text(reg.email, 310, rowY + 6, { width: 230 });

      rowY += 22;
    });

    // ── Border around table ──
    doc
      .rect(50, tableStartY, doc.page.width - 100, rowY - tableStartY)
      .strokeColor(borderGray)
      .lineWidth(1)
      .stroke();

    // ── Financial Summary ──
    const summaryY = rowY + 30;
    const summaryLabelX = doc.page.width - 250;
    const summaryValueX = doc.page.width - 50;

    doc
      .fillColor(primaryColor)
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("FINANCIAL SUMMARY", 50, summaryY);

    const summaryLines = [
      { label: "Rate per Registrant", value: formatCurrency(data.rate) },
      {
        label: "Number of Registrants",
        value: String(data.registrants.length),
      },
      { label: "Subtotal", value: formatCurrency(data.subtotal) },
      { label: "VAT (12%)", value: formatCurrency(data.vat) },
    ];

    let sumY = summaryY + 18;
    summaryLines.forEach(({ label, value }) => {
      doc
        .fillColor(mediumGray)
        .fontSize(9)
        .font("Helvetica")
        .text(label, summaryLabelX, sumY)
        .text(value, summaryLabelX, sumY, {
          width: summaryValueX - summaryLabelX - 10,
          align: "right",
        });
      sumY += 18;
    });

    // ── Total box ──
    doc
      .rect(summaryLabelX - 10, sumY + 4, summaryValueX - summaryLabelX + 20, 32)
      .fill(primaryColor);

    doc
      .fillColor("#ffffff")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("TOTAL AMOUNT DUE", summaryLabelX, sumY + 12)
      .text(formatCurrency(data.total), summaryLabelX, sumY + 12, {
        width: summaryValueX - summaryLabelX - 10,
        align: "right",
      });

    // ── Payment Details ──
    const payY = sumY + 60;

    doc
      .rect(50, payY, doc.page.width - 100, 100)
      .fill(lightGray)
      .strokeColor(borderGray)
      .lineWidth(1)
      .stroke();

    doc
      .fillColor(primaryColor)
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("PAYMENT DETAILS", 70, payY + 12);

    const payDetails = [
      ["Account Name", "Sprout Solutions Philippines Inc"],
      ["Bank", "BDO Unibank"],
      ["Account Number", "Please contact Sprout for account number"],
    ];

    let payLineY = payY + 30;
    payDetails.forEach(([label, value]) => {
      doc
        .fillColor(mediumGray)
        .fontSize(9)
        .font("Helvetica-Bold")
        .text(`${label}:`, 70, payLineY)
        .fillColor(darkGray)
        .font("Helvetica")
        .text(value, 200, payLineY);
      payLineY += 16;
    });

    // ── Footer note ──
    doc
      .fillColor(mediumGray)
      .fontSize(9)
      .font("Helvetica")
      .text(
        "Please settle payment upon receipt. For questions, contact billing@sprout.ph",
        50,
        payY + 110,
        { align: "center", width: doc.page.width - 100 }
      );

    // ── Page footer ──
    const footerY = doc.page.height - 50;
    doc
      .moveTo(50, footerY - 10)
      .lineTo(doc.page.width - 50, footerY - 10)
      .strokeColor(borderGray)
      .lineWidth(1)
      .stroke();

    doc
      .fillColor(mediumGray)
      .fontSize(8)
      .text(
        "Sprout Solutions Philippines Inc  •  This document is computer-generated and valid without signature.",
        50,
        footerY,
        { align: "center", width: doc.page.width - 100 }
      );

    doc.end();
  });
}
