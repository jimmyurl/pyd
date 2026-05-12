import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import event5 from "@/assets/event-5.jpg";
import event6 from "@/assets/event-6.jpg";

export type Event = {
  slug: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  description: string;
  longDescription: string[];
  highlights: string[];
  image: string;
  gallery: string[];
};

export const EVENTS: Event[] = [
  {
    slug: "young-mothers-entrepreneurship-circle",
    startTime: "09:00",
    endTime: "15:00",
    title: "Young Mothers Entrepreneurship Circle",
    date: "March 14, 2026",
    location: "Nyamagana, Mwanza",
    category: "Workshop",
    description:
      "Forty young mothers gathered for a hands-on session on costing, pricing and customer discovery — the first cohort of our 2026 livelihoods track.",
    longDescription: [
      "Our flagship Entrepreneurship Circle brings young mothers from across Mwanza together for a day of practical business skills, peer mentorship, and childcare-friendly programming.",
      "This cohort focused on the fundamentals of running a profitable micro-business: how to price products with real margin, how to interview customers without selling, and how to keep simple books that lenders will trust.",
      "Each participant left with a personal 30-day action plan, a starter kit of business tools, and a WhatsApp peer group that continues to meet weekly.",
    ],
    highlights: [
      "40 young mothers in attendance",
      "On-site childcare for 28 children",
      "12 mentors from local businesses",
      "100% completion rate",
    ],
    image: event1,
    gallery: [event2, event3, event4],
  },
  {
    slug: "tailoring-bootcamp-showcase",
    startTime: "14:00",
    endTime: "18:00",
    title: "Tailoring Bootcamp Showcase",
    date: "February 02, 2026",
    location: "PYD Skills Hub",
    category: "Skills",
    description:
      "Graduates of our six-week tailoring program presented their first ready-to-wear collections to local boutique buyers.",
    longDescription: [
      "After six intensive weeks of pattern-making, machine work, and fabric sourcing, our tailoring graduates staged a showcase for buyers from boutiques across Mwanza and Mara.",
      "Three graduates secured wholesale orders on the spot, and every graduate left with a portfolio, a business card, and an introduction to a fabric supplier.",
      "The showcase doubled as a celebration — families, mentors, and former graduates filled the room.",
    ],
    highlights: [
      "22 graduates showcased work",
      "3 secured wholesale orders",
      "9 boutique buyers attended",
      "Avg. order value: TZS 1.2M",
    ],
    image: event2,
    gallery: [event1, event5, event6],
  },
  {
    slug: "digital-skills-bootcamp-cohort-03",
    startTime: "09:00",
    endTime: "16:00",
    title: "Digital Skills Bootcamp — Cohort 03",
    date: "January 18, 2026",
    location: "Mwanza Innovation Centre",
    category: "Training",
    description:
      "Sixty youth dove into productivity tools, freelancing fundamentals and AI basics across two intensive weeks.",
    longDescription: [
      "Two weeks. Sixty youth. From zero to client-ready freelance profiles.",
      "Participants worked through a curriculum covering Google Workspace, AI prompting, freelance marketplaces, and the basics of digital invoicing and online payments.",
      "By graduation day, 41 participants had created live profiles on freelance platforms and 14 had landed their first paid micro-gig.",
    ],
    highlights: [
      "60 participants",
      "41 live freelance profiles",
      "14 first-time paid gigs",
      "8 mentors across 2 weeks",
    ],
    image: event3,
    gallery: [event4, event2, event6],
  },
  {
    slug: "youth-market-day",
    startTime: "10:00",
    endTime: "17:00",
    title: "Youth Market Day",
    date: "December 09, 2025",
    location: "Rock City Grounds",
    category: "Community",
    description:
      "Twenty-two youth-led micro-businesses sold directly to the public — a celebration of momentum and a real revenue moment.",
    longDescription: [
      "Market Day is where the work meets the marketplace. Twenty-two youth-led businesses set up stalls, ran promotions, and sold directly to hundreds of attendees.",
      "Combined sales for the day exceeded TZS 7.4M — for many founders, the largest single-day revenue they had ever generated.",
      "More importantly, every founder collected customer feedback and contact details to keep the conversation going long after the tents came down.",
    ],
    highlights: [
      "22 stalls",
      "TZS 7.4M total sales",
      "1,200+ visitors",
      "5 vendor partnerships formed",
    ],
    image: event4,
    gallery: [event5, event3, event1],
  },
  {
    slug: "annual-graduation-2025",
    startTime: "15:00",
    endTime: "19:00",
    title: "2025 Annual Graduation",
    date: "November 22, 2025",
    location: "Bugando Hall",
    category: "Celebration",
    description:
      "We celebrated 312 program completers — the largest cohort in PYD history — alongside families, mentors and partners.",
    longDescription: [
      "Three hundred and twelve graduates. Our biggest ceremony to date.",
      "Bugando Hall was filled with families, mentors, partners, and alumni who came back to cheer on the next cohort. The keynote was delivered by a 2022 graduate who now employs five people in her own tailoring workshop.",
      "Every graduate left with a certificate, a starter grant, and an invitation to the PYD alumni network.",
    ],
    highlights: [
      "312 graduates",
      "9 program tracks represented",
      "TZS 31M in starter grants",
      "Alumni network now 1,200+ strong",
    ],
    image: event5,
    gallery: [event6, event4, event2],
  },
  {
    slug: "maternal-wellness-outreach",
    startTime: "08:30",
    endTime: "14:00",
    title: "Maternal Wellness Outreach",
    date: "October 05, 2025",
    location: "Sengerema District",
    category: "Outreach",
    description:
      "A community day pairing health screenings with peer support and income-generating activity workshops for new mothers.",
    longDescription: [
      "We took our work on the road. In partnership with a local health post, we hosted a full day of free screenings, peer-support circles, and lightweight income-skill demos for new mothers in Sengerema.",
      "More than 180 mothers attended. Half signed up for follow-up entrepreneurship coaching, and our partner clinic enrolled 60 mothers into ongoing maternal care.",
    ],
    highlights: [
      "180+ mothers reached",
      "60 enrolled in maternal care",
      "90 signed up for coaching",
      "4 partner organisations",
    ],
    image: event6,
    gallery: [event1, event3, event5],
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return EVENTS.find((e) => e.slug === slug);
}