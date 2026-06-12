"use client";

import Marquee from "react-fast-marquee";

export default function AnnouncementBar() {
  return (
    <div className="bg-black text-white py-2">
      <Marquee pauseOnHover speed={50}>
        Free Shipping On Orders Over $100 • Summer Sale Up To 50% Off • New Arrivals Available Now •
      </Marquee>
    </div>
  );
}