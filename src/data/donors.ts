export type Donor = {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  mostRecentGiftDate: string;
  totalLifetimeGiving: string;
  lastGiftAmount: string;
  response: string;
  reachOutAgain: string;
  lastPersonInContact: string;
  paragraphFromManager: string;
  industry: string;
  currentOccupation: string;
  execOrAssistant: string;
  initials: string;
  avatarColor: string;
};

export const donors: Donor[] = [
  {
    id: 1,
    firstName: "Test",
    lastName: "One",
    company: "Police, Inc",
    email: "test@gmail.com",
    phone: "123-456-7890",
    streetAddress: "48 University Place",
    city: "Princeton",
    state: "NJ",
    zip: "08540",
    mostRecentGiftDate: "August 2025",
    totalLifetimeGiving: "$6,000.00",
    lastGiftAmount: "$6,000.00",
    response: "Positive",
    reachOutAgain: "Yes",
    lastPersonInContact: "Brian Zhou",
    paragraphFromManager: "Had a great meeting at Lawrenceville County Jail!",
    industry: "Law",
    currentOccupation: "Robber",
    execOrAssistant: "Exec",
    initials: "TO",
    avatarColor: "#9ca3af",
  },
  {
    id: 2,
    firstName: "Brian",
    lastName: "Zhou",
    company: "Fanta LLC",
    email: "brian_zhou@princeton.edu",
    phone: "098-765-4321",
    streetAddress: "Blair Hall Room 306",
    city: "Princeton",
    state: "NJ",
    zip: "08540",
    mostRecentGiftDate: "N/A",
    totalLifetimeGiving: "$0.00",
    lastGiftAmount: "$0.00",
    response: "Negative",
    reachOutAgain: "No",
    lastPersonInContact: "Miyu Yamane",
    paragraphFromManager:
      "Told me that if I contacted him again he would take me to the Coca Cola headquarters and wouldn't let me leave until I sold them a case of Pepsi",
    industry: "Other",
    currentOccupation: "Out to get me",
    execOrAssistant: "Exec",
    initials: "BZ",
    avatarColor: "#9ca3af",
  },
  {
    id: 3,
    firstName: "Sophie",
    lastName: "Ryan",
    company: "Triple 9",
    email: "sophie@triplenine.com",
    phone: "Unknown",
    streetAddress: "Your mom's house",
    city: "Atlanta",
    state: "GA",
    zip: "19304",
    mostRecentGiftDate: "February 2020",
    totalLifetimeGiving: "$5.00",
    lastGiftAmount: "$5.00",
    response: "Positive",
    reachOutAgain: "Yes",
    lastPersonInContact: "Steve Forbes",
    paragraphFromManager:
      "Came to conference, but did all contact/scheduling through assistant",
    industry: "Consumer/Product Goods",
    currentOccupation: "Chief Snack Officer",
    execOrAssistant: "Exec",
    initials: "SR",
    avatarColor: "#9ca3af",
  },
  {
    id: 4,
    firstName: "Rophie",
    lastName: "Syan",
    company: "Triple 9",
    email: "rophie@triplenine.com",
    phone: "555-555-5555",
    streetAddress: "Your mom's house",
    city: "Atlanta",
    state: "GA",
    zip: "19304",
    mostRecentGiftDate: "February 2020",
    totalLifetimeGiving: "$5.00",
    lastGiftAmount: "$5.00",
    response: "Positive",
    reachOutAgain: "Yes",
    lastPersonInContact: "Steve Forbes",
    paragraphFromManager: "All contact for exec through Rophie",
    industry: "Consumer/Product Goods",
    currentOccupation: "EA to Sophie Ryan",
    execOrAssistant: "Assistant",
    initials: "RS",
    avatarColor: "#9ca3af",
  },
];

export const industries = [...new Set(donors.map((d) => d.industry))];
export const states = [...new Set(donors.map((d) => d.state))];
export const roles = [...new Set(donors.map((d) => d.execOrAssistant))];
