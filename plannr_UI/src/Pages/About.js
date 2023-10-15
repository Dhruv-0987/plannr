import React from "react";
import InfoLinks from "../Components/InfoLinks";

function About() {
  const aboutPageBanner = require("./aboutpagebanner.jpeg");
  return (
    <div className="">
      <img
        className="bg-center bg-contain w-full h-[600px]"
        src={'https://medicircle.in/uploads/2021/january2021/how-important-is-nutrition-for-health.jpg'}
      >
        {/* Other content */}
      </img>

      <div
        className="p-8 mb-10 justify-center gap-x-10 bg-green-50"
      >
        <div className="p-4">
          <p className="text-6xl text-brand-green text-center">
            Plannr App
          </p>
        </div>

        <div className="text-center flex justify-center">
          <p className="text-4xl w-3/4 text-brand-green  font-playfair">
            At Plannr you can get your grocery Lists list and suggested recipes,
            record and share them with your community anytime, anywhere and
            enjoy your own customised butler!
          </p>
        </div>
      </div>

      <div
        className="p-20 flex justify-center gap-x-10 "
      >
          <div className="text-right ">
              <p className="text-4xl text-brand-green top-[100px] left-[250px]">
                  About MYLLL
              </p>
          </div>

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


      </div>

        <div className='mt-10'>
            <InfoLinks/>
        </div>
    </div>
  );
}

export default About;
