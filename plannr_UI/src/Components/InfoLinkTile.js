import React from "react";

function InfoLinkTile({ title, imageUrl, link}) {
  return (
    <div className="min-w-52 ">
      <div className="w-full bg-white infoLinkTile p-4 m-2 border rounded-lg text-center transition-shadow hover:shadow-md">
        <img
          src={imageUrl}
          alt={title}
          className="infoImage w-full  h-40 object-cover mb-4 rounded"
        />
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="infoLink text-lg text-gray-800 font-bold hover:text-brand-light-green cursor-pointer"
        >
          {title}
        </a>
      </div>
    </div>
  );
}

export default InfoLinkTile;
