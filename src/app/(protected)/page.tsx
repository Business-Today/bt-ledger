"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useRef } from "react";
import { supabase } from "../../../lib/supabase";



type ViewMode = "grid" | "list";
type ActiveNav = "Donors" | "All" | "Roster";

type Donor = {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  alum: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  region: string;
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

function Avatar({ donor }: { donor: Donor }) {
  return (
    <div
      className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-semibold text-base flex-shrink-0"
      style={{ backgroundColor: donor.avatarColor }}
    >
      {donor.initials}
    </div>
  );
}

function FilterSection({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-base text-gray-500 hover:text-gray-800 transition-colors"
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-2 space-y-2 pl-1">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
                className="rounded accent-[#03688E]"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function GridCard({ donor, onClick }: { donor: Donor; onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-gray-100 rounded-xl p-4 flex gap-3 hover:bg-gray-200 transition-colors cursor-pointer">
      <Avatar donor={donor} />
      <div className="min-w-0 flex flex-col justify-center">
        <h3 className="font-semibold text-gray-800 text-base leading-snug">
          {donor.firstName} {donor.lastName}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5 truncate">{donor.company}</p>
        <p className="text-sm text-gray-400 truncate">{donor.currentOccupation}</p>
      </div>
    </div>
  );
}

function ListRow({ donor, onClick }: { donor: Donor; onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center gap-4 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer">
      <Avatar donor={donor} />
      <div className="flex-1 grid grid-cols-4 gap-6 min-w-0">
        <div className="min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate">
            {donor.firstName} {donor.lastName}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{donor.execOrAssistant}</p>
        </div>
        <div className="min-w-0">
          <p className="text-sm text-gray-600 truncate">{donor.company}</p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{donor.industry}</p>
        </div>
        <div className="min-w-0">
          <p className="text-sm text-gray-600 truncate">{donor.currentOccupation}</p>
          <p className="text-xs text-gray-400 mt-0.5">{donor.city}, {donor.state}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">{donor.totalLifetimeGiving}</p>
          <p className="text-xs text-gray-400 mt-0.5">Total Giving</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeNav, setActiveNav] = useState<ActiveNav>("All");
  const [search, setSearch] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedAlumni, setSelectedAlumni] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);

    router.push("/login");
  };

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadDonors = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("all_interactions").select("*");

      if (!isMounted) return;

      if (error) {
        setLoadError(`Failed to load donors: ${error.message}`);
        setDonors([]);
      } else {
        setLoadError(null);
        setDonors((data ?? []) as Donor[]);
      }

      setIsLoading(false);
    };

    loadDonors();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFilter = (list: string[], setter: (v: string[]) => void, val: string) => {
    setter(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);
  };

  const industries = useMemo(
    () => Array.from(new Set(donors.map((d) => d.industry).filter((v) => !!v))).sort(),
    [donors]
  );

  const states = useMemo(
    () => Array.from(new Set(donors.map((d) => d.state).filter((v) => !!v))).sort(),
    [donors]
  );

  const regions = useMemo(
    () => Array.from(new Set(donors.map((d) => d.region).filter((v) => !!v))).sort(),
    [donors]
  );

  const alumniStatuses = useMemo(
    () => Array.from(new Set(donors.map((d) => d.alum).filter((v) => !!v))).sort(),
    [donors]
  );

  const roles = useMemo(
    () => Array.from(new Set(donors.map((d) => d.execOrAssistant).filter((v) => !!v))).sort(),
    [donors]
  );

  const filtered = useMemo(() => {
    return donors.filter((d) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        `${d.firstName} ${d.lastName}`.toLowerCase().includes(q) ||
        d.company.toLowerCase().includes(q) ||
        d.currentOccupation.toLowerCase().includes(q) ||
        d.industry.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q);

      const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(d.industry);
      const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(d.region);
      const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(d.execOrAssistant);
      const givingNumber = parseFloat((d.totalLifetimeGiving || "").replace(/[^0-9.-]+/g, "")) || 0;
      const matchesAlumni = selectedAlumni.length === 0 || selectedAlumni.includes(d.alum);
      const matchesActiveNav = activeNav !== "Donors" || givingNumber > 0;

      return matchesSearch && matchesIndustry && matchesRegion && matchesRole && matchesAlumni && matchesActiveNav;
    });
  }, [donors, search, selectedIndustries, selectedRegions, selectedRoles, selectedAlumni, activeNav]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <Image src="/logo.png" alt="btledger" width={80} height={24} priority />
          <nav className="flex items-center gap-8">
          {(["All", "Donors", "Roster"] as ActiveNav[]).map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`text-sm font-medium transition-colors ${
                activeNav === item ? "text-[#03688E]" : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
          <div ref={menuRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>

                {user ? user.email.split("@")[0] : "Sign in"}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={signOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6">
          {/* Grid / List — same total width as the sidebar (w-56) */}
          <div className="flex gap-3 w-56 flex-shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
              </svg>
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
              List
            </button>
          </div>

          {/* Search — same height as buttons (py-3) */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="search by name, company, title, etc..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#03688E]/30"
            />
          </div>
        </div>

        {/* Main layout */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0">
            <div className="bg-gray-100 rounded-xl px-4 py-3">
              <h2 className="text-sm font-semibold text-gray-500 py-1 mb-1">Filters</h2>
              <hr className="border-gray-300 mb-1" />
              <FilterSection
                label="Industry"
                options={industries}
                selected={selectedIndustries}
                onChange={(v) => toggleFilter(selectedIndustries, setSelectedIndustries, v)}
              />
              <FilterSection
                label="Region"
                options={regions}
                selected={selectedRegions}
                onChange={(v) => toggleFilter(selectedRegions, setSelectedRegions, v)}
              />
              <FilterSection
                label="Role"
                options={roles}
                selected={selectedRoles}
                onChange={(v) => toggleFilter(selectedRoles, setSelectedRoles, v)}
              />
              <FilterSection
                label="Alumni Status"
                options={alumniStatuses}
                selected={selectedAlumni}
                onChange={(v) => toggleFilter(selectedAlumni, setSelectedAlumni, v)}
              />
              {/* Alumni filter removed; use the "All" nav option to show everyone */}
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <div className="text-center text-gray-400 py-16 text-sm">Loading donors...</div>
            ) : loadError ? (
              <div className="text-center text-red-500 py-16 text-sm">{loadError}</div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-gray-400 py-16 text-sm">
                No results found.
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((donor) => (
                  <GridCard key={donor.id} donor={donor} onClick={() => router.push(`/donor/${donor.id}`)} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((donor) => (
                  <ListRow key={donor.id} donor={donor} onClick={() => router.push(`/donor/${donor.id}`)} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
