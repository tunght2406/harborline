export const company = {
  name: "Harborline",
  legal: "Harborline Warehousing",
  phoneDisplay: "(813) 555-0142",
  phoneTel: "+18135550142",
  email: "dock@harborline.example",
  hours: "Monday–Friday, 8:00 a.m.–5:00 p.m. ET",
  afterHours: "After-hours line monitored for live loads",
  address: ["2140 Maritime Boulevard, Suite 100", "Tampa, FL 33605"],
  since: "2019",
};

export const photos = {
  dock: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80",
  aisle: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1800&q=80",
  containers: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1800&q=80",
  boxes: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1800&q=80",
  truck: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1800&q=80",
  port: "https://images.unsplash.com/photo-1494412574643-ff11af0c31dd?auto=format&fit=crop&w=1800&q=80",
  crew: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1800&q=80",
};

export type ServiceGroup = "on-demand" | "storage" | "3pl";

export type Service = {
  slug: string;
  title: string;
  group: ServiceGroup;
  summary: string;
  lead: string;
  bullets: string[];
  image: string;
  featured?: boolean;
};

export const groupLabels: Record<ServiceGroup, string> = {
  "on-demand": "On-demand warehousing",
  storage: "Warehouse storage",
  "3pl": "3PL warehousing",
};

export const services: Service[] = [
  {
    slug: "container-unloading",
    title: "Container unloading",
    group: "on-demand",
    featured: true,
    summary: "Live unloads and reloads for ocean boxes near Port Tampa Bay.",
    lead: "Floor-loaded or palletized, we put a crew on the box, count the freight, and stage it for storage or the next truck.",
    bullets: [
      "20' and 40' containers, by appointment",
      "Palletize loose freight as it comes off",
      "Photo notes when cartons or pallets arrive damaged",
      "Most boxes are clear in one to three hours",
    ],
    image: photos.containers,
  },
  {
    slug: "cross-docking",
    title: "Cross docking",
    group: "on-demand",
    featured: true,
    summary: "Inbound today, outbound on the next trailer. Minimal dwell.",
    lead: "When the freight should not sit, we receive, sort, and rebuild the outbound load across our dock-high doors.",
    bullets: [
      "Same-day turns when both trucks are booked",
      "Sort by destination, PO, or consignee",
      "Useful beside I-4 and I-75 lanes",
      "Appointments required on both ends",
    ],
    image: photos.dock,
  },
  {
    slug: "transloading",
    title: "Transloading",
    group: "on-demand",
    summary: "Move freight from a container onto a dry van, flatbed, or the reverse.",
    lead: "A container at the port does not always belong in storage. We transfer product straight to the trailer that will finish the move.",
    bullets: [
      "Container to dry van or flatbed",
      "Floor-load or palletized product",
      "Count and exception notes before the truck leaves",
      "Pair with a short hold if the outbound is late",
    ],
    image: photos.port,
  },
  {
    slug: "pallet-restacking",
    title: "Pallet restacking",
    group: "on-demand",
    featured: true,
    summary: "Shifted and rejected loads rebuilt so the driver can roll.",
    lead: "Brokers and carriers use the dock when a trailer leans, product has walked, or a receiver turned the load around.",
    bullets: [
      "Full shifted truckloads, often a two to four hour job",
      "A few bad pallets, often under an hour",
      "Restack, film, and relabel to the receiver's spec",
      "Photos before and after on request",
    ],
    image: photos.aisle,
  },
  {
    slug: "pallet-rework",
    title: "Pallet reworking",
    group: "on-demand",
    summary: "Sort, relabel, and rebuild pallets that cannot ship as they arrived.",
    lead: "Mixed SKUs, crushed corners, and bad labels get pulled apart and put back into shippable units.",
    bullets: [
      "Break down and rebuild to a ti-hi",
      "Replace broken pallets",
      "Apply labels your customer will actually scan",
      "Quarantine anything that should not go back out",
    ],
    image: photos.boxes,
  },
  {
    slug: "palletize-freight",
    title: "Palletize freight",
    group: "on-demand",
    summary: "Turn loose cartons into stable, film-wrapped pallets.",
    lead: "Floor-loaded imports and loose pickups get palletized so the next warehouse, store, or linehaul will take them.",
    bullets: [
      "Carton counts confirmed as we build",
      "Standard 48×40 unless you specify otherwise",
      "Stretch film on every finished pallet",
      "Staged for will-call or the outbound door",
    ],
    image: photos.crew,
  },
  {
    slug: "shrink-wrap",
    title: "Shrink wrap",
    group: "on-demand",
    summary: "Film unstable pallets before they see another road.",
    lead: "A tight wrap is cheaper than a second restack. We film product already on our floor, or pallets a driver drops for a quick repair.",
    bullets: [
      "Machine or hand wrap, matched to the load",
      "Corner boards when the product needs them",
      "Top sheets for dusty or open cartons",
      "Same appointment as a restack when you want both",
    ],
    image: photos.aisle,
  },
  {
    slug: "short-term-storage",
    title: "Short-term storage",
    group: "storage",
    featured: true,
    summary: "Overflow space without a multi-year lease.",
    lead: "Use the building for a season, a late container, or a project that only needs a roof for a few weeks.",
    bullets: [
      "Ambient storage, no climate control",
      "Pallets typically under 8 ft and 5,000 lb",
      "In and out by appointment",
      "Billing matched to the time you actually use",
    ],
    image: photos.dock,
  },
  {
    slug: "long-term-storage",
    title: "Long-term storage",
    group: "storage",
    summary: "A standing home for inventory you are not ready to forward.",
    lead: "Importers and distributors keep buffer stock here and pull it as orders firm up, instead of leasing a building they will not fill.",
    bullets: [
      "Dedicated or shared locations, agreed up front",
      "Cycle counts on a schedule you set",
      "Easy to add fulfillment later",
      "Non-hazardous goods only",
    ],
    image: photos.boxes,
  },
  {
    slug: "project-storage",
    title: "Project & event storage",
    group: "storage",
    summary: "A clean hold for fixtures, displays, and job-site materials.",
    lead: "Trade shows, renovations, and construction phases need a place that can take freight on Thursday and release it on Monday.",
    bullets: [
      "Crated and palletized materials",
      "Labeled by job, booth, or phase",
      "Will-call for your crew or your carrier",
      "Short notice when the calendar slips",
    ],
    image: photos.crew,
  },
  {
    slug: "3pl-warehousing",
    title: "3PL warehousing",
    group: "3pl",
    featured: true,
    summary: "Receiving, storage, and shipping run as an extension of your team.",
    lead: "Harborline handles the building so a growing brand or distributor can stay focused on sales. You get a named contact, not a ticket queue.",
    bullets: [
      "Inbound appointments and receipt confirmation",
      "Inventory you can reconcile",
      "Outbound by parcel, LTL, or truckload",
      "Scoped to the work you actually need",
    ],
    image: photos.dock,
  },
  {
    slug: "receiving",
    title: "Receiving",
    group: "3pl",
    summary: "Check freight in against the paperwork, then put it where it belongs.",
    lead: "Every recurring account starts with a clean receipt: counts, exceptions, and a location, before anything is promised to a customer.",
    bullets: [
      "Container, dry van, and small-parcel inbound",
      "OS&D noted with photos",
      "Putaway the same day whenever the dock allows",
      "ASN or packing-list match",
    ],
    image: photos.aisle,
  },
  {
    slug: "inventory-management",
    title: "Inventory management",
    group: "3pl",
    summary: "Locations, counts, and adjustments your office can trust.",
    lead: "We keep pallet and carton inventory current, flag damage, and count on a rhythm that matches how fast you ship.",
    bullets: [
      "Location-level tracking",
      "Cycle counts by SKU or aisle",
      "Hold codes for quarantine stock",
      "Simple reporting, shared on your schedule",
    ],
    image: photos.boxes,
  },
  {
    slug: "pick-and-pack",
    title: "Pick and pack",
    group: "3pl",
    summary: "Orders picked, packed, and staged against the carrier cutoff.",
    lead: "Carton and each-picks for brands that have outgrown a garage, a back room, or a 3PL that stopped answering.",
    bullets: [
      "Single and multi-line orders",
      "Inserts, dunnage, and your carton spec",
      "Same-day pick when the order lands before cutoff",
      "Accuracy checked before the label prints",
    ],
    image: photos.boxes,
  },
  {
    slug: "order-fulfillment",
    title: "Order fulfillment",
    group: "3pl",
    featured: true,
    summary: "From the order file to a labeled carton on the right truck.",
    lead: "We pick, pack, and tender parcel or freight orders so your customers get what they bought, and your team sees exceptions early.",
    bullets: [
      "Wholesale, DTC, and marketplace-style orders",
      "Parcel, LTL, and customer pickup",
      "Cutoff times agreed in writing",
      "Not a substitute for Amazon's own buildings — we ship on your accounts",
    ],
    image: photos.crew,
  },
  {
    slug: "distribution",
    title: "Distribution",
    group: "3pl",
    summary: "Receive, hold, and release product into the lanes you already run.",
    lead: "Regional distribution from Tampa for brands that need a Florida node without standing up their own warehouse.",
    bullets: [
      "Pool distribution and store replenishment",
      "Appointments coordinated with your carriers",
      "Routing docs checked before freight leaves",
      "Works alongside storage or as a cross-dock program",
    ],
    image: photos.truck,
  },
];

export const reviews = [
  {
    name: "Elena Voss",
    role: "Freight broker, Southeast",
    quote:
      "They took a leaning trailer at 10 and had it filmed and legal before the delivery window. I talked to the person on the forklift, not a dispatcher three states away.",
  },
  {
    name: "Marcus Hale",
    role: "Import coordinator",
    quote:
      "Two floor-loaded containers, palletized and counted the day they hit the yard. Exceptions were photographed, so the supplier conversation was short.",
  },
  {
    name: "Priya Shah",
    role: "Operations lead, consumer brand",
    quote:
      "We needed overflow before peak without a lease. Inventory matched, cutoffs were real, and we always knew who to call when a wholesale order changed.",
  },
];

export const faqs = [
  {
    q: "Where is the warehouse?",
    a: "The dock is at 2140 Maritime Boulevard, Suite 100, Tampa, FL 33605, with straightforward access to I-4, I-75, and Port Tampa Bay. Every inbound and outbound move is by appointment.",
  },
  {
    q: "What freight can you take?",
    a: "Most non-hazardous goods that do not need climate control. Standard handling covers pallets about 8 feet and under, at or below 5,000 pounds. Taller, heavier, or awkward freight is a conversation before we book the door — sometimes we can, sometimes we should not.",
  },
  {
    q: "Which vehicles can you work?",
    a: "Dry vans, flatbeds, cargo vans, pickups, and ocean containers. Tell us the equipment when you request the appointment so the door and the crew match the truck.",
  },
  {
    q: "Do you offer temperature-controlled space?",
    a: "No. The building is ambient. If the product needs a reefer or a heated room, we will say so early rather than force a fit.",
  },
  {
    q: "How fast can you receive?",
    a: "Urgent freight can often move the same week, and sometimes the same day, once the rate is agreed and the paperwork is in. We do not accept drop-and-go arrivals.",
  },
  {
    q: "How long does a container take?",
    a: "A typical ocean container is off the floor in one to three hours. Loose-loaded boxes, heavy carton counts, and extra palletizing add time. We quote the job, not a fantasy.",
  },
  {
    q: "How long does a restack take?",
    a: "A trailer that has shifted through most of the nose is usually a two to four hour rebuild. A handful of bad pallets is often an hour or less, depending on how the product survived.",
  },
  {
    q: "How do quotes work?",
    a: "Send the freight details — photos help — and a specialist calls to confirm scope. You get a written quote. After you accept, we book the door and tell you how to arrive.",
  },
];

export const studies = [
  {
    id: "shifted-dry-van",
    title: "A shifted dry van, rebuilt the same afternoon",
    meta: "On-demand · Broker",
    image: photos.truck,
    summary:
      "A Southeast broker had a trailer rejected for lean. The driver was already in Tampa with a delivery that could not slip to the next morning.",
    body: "We photographed the nose, stripped the unstable rows, and rebuilt the pallets to a height the receiver would take. Stretch film and a fresh count went with the driver. The truck made the window, and the broker had pictures if anyone argued with the OS&D.",
  },
  {
    id: "port-transload",
    title: "Container to dry van, without a storage bill",
    meta: "Transload · Importer",
    image: photos.port,
    summary:
      "An importer's boxes were available at the port, and the consignee wanted the goods on a dry van — not sitting on a pallet for a month.",
    body: "Harborline coordinated the container appointment against the outbound carrier, transferred the freight, and noted a short list of crushed cartons before the van sealed. The importer paid for the transfer, not for weeks of dwell they did not need.",
  },
  {
    id: "peak-overflow",
    title: "Peak overflow for a brand that had outgrown the back room",
    meta: "3PL · Consumer brand",
    image: photos.boxes,
    summary:
      "A Florida brand needed carton storage and parcel fulfillment for one season, with the option to stay if the volume held.",
    body: "We received two inbound containers, located the inventory by SKU, and shipped wholesale and parcel orders against an agreed cutoff. At the end of the season they kept a smaller standing balance instead of signing a lease.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function servicesByGroup(group: ServiceGroup) {
  return services.filter((service) => service.group === group);
}
