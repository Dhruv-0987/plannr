import React from "react";

function About() {
  const aboutPageBanner = require("./aboutpagebanner.jpeg");
  return (
    <div className="">
      <div
        className="bg-center bg-contain w-full h-[500px]"
        style={{ backgroundImage: `url(${require("./bannerabout.jpeg")})` }}
      >
        {/* Other content */}
      </div>

      <div
        className="p-40 pt-60 flex justify-center gap-x-10"
        style={{ backgroundImage: `url(${require("./bfabout1.jpeg")})` }}
      >
        <div className="text-left">
          <p className="text-4xl text-brand-green top-[100px] left-[250px]">
            Plannr App
          </p>
        </div>

        <div className="text-left ">
          <p className="text-4xl text-brand-green  font-playfair">
            At Plannr you can get your grocery Lists list and suggested recipes,
            record and share them with your community anytime, anywhere and
            enjoy your own customised butler!
          </p>
        </div>
      </div>

      <div
        className="p-40 flex justify-center gap-x-10"
        style={{ backgroundImage: `url(${require("./bgabout2.jpeg")})` }}
      >
        <div className="text-left ">
          <p className="text-3xl text-brand-green  font-playfair">
            MyLLL is a multinational start-up based in Australia and Malaysia,
            dedicated to creating IT products for social good. Facing the
            increasing cost of living in Australia, we introduced 'MyLLL Plann',
            a user-friendly food budgeting tool. This tool helps Victorian
            families plan weekly meals and generates a tailored shopping list
            from personalized recipes, all while staying within their budget.
          </p>
        </div>

        <div className="text-right ">
          <p className="text-4xl text-brand-green top-[100px] left-[250px]">
            About MYLLL
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
