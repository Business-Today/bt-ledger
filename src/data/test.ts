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
    firstName: "Geordie",
    lastName: "Hebard",
    company: "Ziba Capital",
    email: "geordie@zibacapital.com",
    phone: "",
    streetAddress: "1 Whitehall St. ",
    city: "New York",
    state: "NY",
    zip: "10004",
    mostRecentGiftDate: "August 2025",
    totalLifetimeGiving: "$6,000.00",
    lastGiftAmount: "$6,000.00",
    response: "Positive",
    reachOutAgain: "Yes",
    lastPersonInContact: "Audrey Chang",
    paragraphFromManager: "Spoke at conference (exec sem)",
    industry: "Finance/Consulting",
    currentOccupation: "Founder and Managing Partner",
    execOrAssistant: "Exec",
    initials: "GH",
    avatarColor: "#9ca3af",
  },
  {
    id: 2,
    firstName: "Adam",
    lastName: "Edelson",
    company: "Main Line Health",
    email: "aedelson@seniorhelpers.com",
    phone: "215-787-7691",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    mostRecentGiftDate: "N/A",
    totalLifetimeGiving: "$0.00",
    lastGiftAmount: "$0.00",
    response: "Positive",
    reachOutAgain: "No",
    lastPersonInContact: "Kehan Chen",
    paragraphFromManager:
      "Responded to email but did not donate, probably not a good target for donation (senior center)",
    industry: "Healthcare",
    currentOccupation: "Chief Operating Officer",
    execOrAssistant: "Exec",
    initials: "AE",
    avatarColor: "#9ca3af",
  },
  {
    id: 3,
    firstName: "Matt",
    lastName: "Chuchla",
    company: "Quantum Energy Partners",
    email: "matt.chuchla@gmail.com",
    phone: "",
    streetAddress: "Bank of America Tower 800 Capitol Street Suite 3600",
    city: "Houston",
    state: "TX",
    zip: "77002",
    mostRecentGiftDate: "February 2020",
    totalLifetimeGiving: "$3000.00",
    lastGiftAmount: "$3000.00",
    response: "Positive",
    reachOutAgain: "Yes",
    lastPersonInContact: "Allen Li",
    paragraphFromManager:
      "Came to conference",
    industry: "Finance/Consulting",
    currentOccupation: "Partner",
    execOrAssistant: "Exec",
    initials: "MC",
    avatarColor: "#9ca3af",
  },
  {
    id: 4,
    firstName: "Stephen",
    lastName: "Gerritson",
    company: "EDC of Seattle & King County",
    email: "sgerritson@earthlink.net",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    mostRecentGiftDate: "",
    totalLifetimeGiving: "",
    lastGiftAmount: "",
    response: "Positive",
    reachOutAgain: "No",
    lastPersonInContact: "Sophie Ryan",
    paragraphFromManager: "Positive response but retired ",
    industry: "Other",
    currentOccupation: "Retired",
    execOrAssistant: "Exec",
    initials: "SG",
    avatarColor: "#9ca3af",
  },
];

export const industries = [...new Set(donors.map((d) => d.industry))];
export const states = [...new Set(donors.map((d) => d.state))];
export const roles = [...new Set(donors.map((d) => d.execOrAssistant))];
