
"use client";

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export function Component() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="PT Indominco Mandiri" year={2024} />
        </div>
      </div>
    </Footer>
  );
}
