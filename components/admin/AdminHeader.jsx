import Image from 'next/image';
import React from 'react';

export default function AdminHeader() {
  return (
    <header className="flex justify-between items-center mb-xl">
      <div>
        <h2 className="font-display-md text-display-md text-primary">Suprabhat, Tenzin</h2>
        <p className="text-on-surface-variant text-body-md mt-1">
          Your properties are currently at <span className="text-primary font-bold">88% occupancy</span>. High demand for Pine Cottages.
        </p>
      </div>
      <div className="flex items-center gap-md">
        <button className="p-md bg-surface-container-low rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="flex items-center gap-sm bg-surface-container-low pr-md pl-xs py-xs rounded-full cursor-pointer hover:bg-surface-container-high transition-colors">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed">
            <Image 
            width={100}
            height={100}
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxM-tc1VpeXNFru0VK3Z3ZPypFHHMf8-T4hfnmgEX4_ouJwwMSmOgqHNai9oRsCCVyUfI82TN-NrCtU8geKQEie1AfctQLxpBAWJXGR34XC2dHnt4c75VPqfQW22ZoSFyb97rGb9ttJdZ4mewo-a_CKREzkMMZ0_MSEyw7qJd_hUfdL-KjmI1J2vEZ3dL2F2qerHhukURcJQaRENWCUB_BcudJa4INgA8XVrROiyjXFCzs_7xAIm_4WQ3P8OLX1vNQLAxRyTicrwZo"
              alt="Admin Profile"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-label-md font-bold">Tenzin Norbu</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Superhost</span>
          </div>
        </div>
      </div>
    </header>
  );
}
