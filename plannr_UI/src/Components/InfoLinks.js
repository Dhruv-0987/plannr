import React from "react";
import InfoLinkTile from "./InfoLinkTile";

function InfoLinks() {
  const links = [
    {
      title: 'Food and Nutrition Resources',
      link: 'https://www.health.gov.au/topics/food-and-nutrition/resources',
      imageUrl: 'https://www.veganeasy.org/wp-content/uploads/2020/09/nutrition_chart_102-1.jpg'
    },
    {
      title: 'Food and Nutrition',
      link: 'https://www.health.gov.au/topics/food-and-nutrition',
      imageUrl: 'https://andrea-digestive-clinic.com/wp-content/uploads/2022/07/diet-nutrition-1.jpg'
    },
    {
      title: 'Healthy eating',
      link: 'https://www.health.vic.gov.au/preventive-health/healthy-eating-nutrition',
      imageUrl: 'https://putnamridge.com/wp-content/uploads/2019/08/eating-healthy.jpg'
    },
    {
      title: 'Programs and services',
      link: 'https://www.health.vic.gov.au/preventive-health/healthy-eating-programs-and-services',
      imageUrl: 'https://c8.alamy.com/comp/R80CG4/healthy-eating-plan-diet-and-meal-planning-top-view-flat-lay-R80CG4.jpg'
    },

  ];

  return (
      <div className='p-10 bg-green-50'>
        <p className="text-center text-4xl text-brand-green p-4 font-playfair">Additional Links</p>
        <div className="flex w-full flex-wrap justify-center gap-x-10">
          {links.map((link, index) => (
            <InfoLinkTile key={index} link={link.link} imageUrl={link.imageUrl} title={link.title} />
          ))}
        </div>
      </div>
  );
}

export default InfoLinks;
