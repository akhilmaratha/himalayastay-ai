import Image from 'next/image';
import React, { memo } from 'react';

const AdminHeader = memo(function AdminHeader({ onMenuClick }) {
  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-xl">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-on-surface hover:bg-surface-container-low rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div>
          <h2 className="font-display-md text-headline-sm md:text-display-md text-primary">Suprabhat, Tenzin</h2>
          <p className="text-on-surface-variant text-label-md md:text-body-md mt-1">
            Your properties are currently at <span className="text-primary font-bold">88% occupancy</span>.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-md self-end md:self-auto">
        <button className="p-sm md:p-md bg-surface-container-low rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="flex items-center gap-sm bg-surface-container-low pr-md pl-xs py-xs rounded-full cursor-pointer hover:bg-surface-container-high transition-colors">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-primary-fixed">
            <Image 
              width={40}
              height={40}
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
});

export default AdminHeader;
