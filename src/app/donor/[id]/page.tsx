"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { renderToString } from "react-dom/server";

type DonorRow = {
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

const { data: donors } = await supabase.from("all_interactions").select("*");

 

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-gray-700">{value}</span>
    </div>
  );
}

function formatMoney(value: string) {
  if (!value || value.trim() === "" || value === "null" || value === "undefined") {
    return "$0.00";
  }

  return value;
}

function formatNull(value: string) {
  if (!value || value.trim() === "" || value === "null" || value === "undefined") {
    return "Unknown";
  }
return value;
}


function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{title}</h2>
      <div className="bg-gray-100 rounded-xl p-5 grid grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}

export default function DonorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const donorList = (donors ?? []) as DonorRow[];
  const donor = donorList.find((d) => d.id === Number(id));

  if (!donor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-400 text-sm">
        Donor not found.
      </div>
    );
  }

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    response: donor.response ?? "",
    reachOutAgain: donor.reachOutAgain ?? "",
    lastPersonInContact: donor.lastPersonInContact ?? "",
    paragraphFromManager: donor.paragraphFromManager ?? "",
  });

  const handleSave = async () => {
  const { error } = await supabase
    .from("all_interactions")
    .update({
      response: form.response,
      reachOutAgain: form.reachOutAgain,
      lastPersonInContact: form.lastPersonInContact,
      paragraphFromManager: form.paragraphFromManager,
    })
    .eq("id", donor.id);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  alert("Saved!");
  setEditing(false);
  router.refresh();
};

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <Link href="/">
            <Image src="/logo.png" alt="btledger" width={80} height={24} priority />
          </Link>
          <nav className="flex items-center gap-8">
            {["All", "Donors", "Roster"].map((item) => (
              <Link
                key={item}
                href="/"
                className={`text-sm font-medium transition-colors ${
                  item === "Donors" ? "text-[#03688E]" : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {item}
              </Link>
            ))}
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 text-sm text-gray-600">
              <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              username
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-8 py-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Profile hero */}
        <div className="flex items-center gap-5 mb-8">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-white font-semibold text-2xl flex-shrink-0"
            style={{ backgroundColor: donor.avatarColor }}
          >
            {donor.initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800">
              {donor.firstName} {donor.lastName}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{donor.currentOccupation}</p>
            <p className="text-sm text-gray-400">{donor.company}</p>
            <div className="mt-3">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Contact */}
          <Section title="Contact Info">
            <InfoRow label="Email" value={formatNull(donor.email)} />
            <InfoRow label="Phone" value={formatNull(donor.phone)} />
            <InfoRow label="Street Address" value={formatNull(donor.streetAddress)} />
            <InfoRow label="City / State / ZIP" value={formatNull(`${donor.city}, ${donor.state} ${donor.zip}`)} />
          </Section>

          {/* Donor */}
          <Section title="Donor Info">
            <InfoRow label="Most Recent Gift" value={formatNull(donor.mostRecentGiftDate)} />
            <InfoRow label="Last Gift Amount" value={formatMoney(donor.lastGiftAmount)} />
            <InfoRow label="Total Lifetime Giving" value={formatMoney(donor.totalLifetimeGiving)} />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Reach Out Again?
              </span>

              {editing ? (
                <select
                  value={form.reachOutAgain}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      reachOutAgain: e.target.value,
                    })
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Complicated">Complicated</option>
                </select>
              ) : (
                <span className="text-sm text-gray-700">
                  {formatNull(form.reachOutAgain)}
                </span>
              )}
            </div>
            <InfoRow label = "Region" value={formatNull(donor.region)} />
          </Section>

          {/* Communication */}
          <Section title="Communication">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Response
              </span>

              {editing ? (
                <select
                  value={form.response}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      response: e.target.value,
                    })
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select...</option>
                  <option value="Positive">Positive</option>
                  <option value="Neutral">Unknown</option>
                  <option value="Negative">Negative</option>
                </select>
              ) : (
                <span className="text-sm text-gray-700">
                  {formatNull(form.response)}
                </span>
              )}
            </div>
            <InfoRow label="Last Person in Contact" value={formatNull(donor.lastPersonInContact)} />
          </Section>

          {/* Notes */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Manager Notes
            </h2>

            <div className="bg-gray-100 rounded-xl p-5">
              {editing ? (
                <textarea
                  value={form.paragraphFromManager}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      paragraphFromManager: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2 text-sm"
                  rows={5}
                  placeholder="Add notes..."
                />
              ) : (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {form.paragraphFromManager?.trim()
                    ? form.paragraphFromManager
                    : "No notes yet"}
                </p>
              )}
            </div>
          </div>

          {/* Network */}
          <Section title="Network">
            <InfoRow label="Industry" value={formatNull(donor.industry)} />
            <InfoRow label="Role Type" value={formatNull(donor.execOrAssistant)} />
          </Section>
        </div>
      </div>
    </div>
  );
}
