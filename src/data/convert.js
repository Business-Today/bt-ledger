const fs = require("fs");
const csv = require("csv-parser");

const results = [];
let id = 1;

fs.createReadStream("donor.csv")
  .pipe(
    csv({
      mapHeaders: ({ header }) => header.trim(),
    })
  )
  .on("data", (row) => {
    const firstName = row["First name"] ?? "";
    const lastName = row["Last name"] ?? "";

    results.push({
      id: id++,
      firstName,
      lastName,
      company: row["Company"] ?? "",
      alum: row["Alum"] ?? "",
      email: row["Email"] ?? "",
      phone: row["Phone"] ?? "",
      streetAddress: row["Street Address"] ?? "",
      city: row["City"] ?? "",
      state: row["State"] ?? "",
      zip: row["ZIP"] ?? "",
      mostRecentGiftDate: row["Most Recent Gift Date"] ?? "",
      totalLifetimeGiving: row["Total Lifetime Giving ($)"] ?? "",
      lastGiftAmount: row["Last Gift Amount ($)"] ?? "",
      response: row["Response"] ?? "",
      reachOutAgain: row["Reach out again?"] ?? "",
      lastPersonInContact: row["Last Person in Contact"] ?? "",
      paragraphFromManager: row["Paragraph from Manager"] ?? "",
      industry: row["Industry"] ?? "",
      currentOccupation: row["Current Occupation"] ?? "",
      execOrAssistant: row["Exec or Assistant?"] ?? "",
      initials: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase(),
      avatarColor: "#9ca3af",
    });
  })
  .on("end", () => {
    const tsContent = `export const alumni = ${JSON.stringify(
      results,
      null,
      2
    )};\n`;

    fs.writeFileSync("output.ts", tsContent);

    console.log(`Converted ${results.length} rows.`);
    console.log("Output written to output.ts");
  })
  .on("error", (err) => {
    console.error("Error reading CSV:", err);
  });