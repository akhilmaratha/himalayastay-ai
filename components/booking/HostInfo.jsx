import React from "react";

export default function HostInfo() {
  return (
    <section className="border-b border-surface-container-high pb-lg">
      <div className="flex items-center justify-between mb-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">
            Hosted by the Sharma Family
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Superhost · 8 years hosting
          </p>
        </div>
        <img
          alt="Host portrait"
          className="w-[56px] h-[56px] rounded-full object-cover border-2 border-surface-container shadow-ambient-sm"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEkfG8gfZFwnS3GEsAe-Y_Np-lj7fUBipZFNE_q_D2P3rj1GjJ-ufT3DcURS3Pl5Xd1DwPodXR4_k-u-HJTEvnkfQxDAmByZBTLMmxVgZ330rJ32VjGG-aWLHMC55fKXl9f-Fhq7xxnb_BlIbHPxXCbM9rnmFFXXvZ2SKqsSfLJirLFHLpUIcgNzPXRjmmru9aq_Uj_zOgdJRjkGEM3j64qHg-yrj4S6O2U9sLm8tD5o8hE1vdoKbypSpNQonYNaKeCGLQrZv4QfZu"
        />
      </div>
      <div className="prose prose-stone max-w-none font-body-lg text-body-lg text-on-surface space-y-md">
        <p>
          Nestled at 7,500 feet amidst whispering pine and oak forests, Oak
          Ridge Homestay is a sanctuary for those seeking a pause from the
          relentless pace of modern life. Built over three generations, our home
          blends traditional Kumaoni stone architecture with contemporary
          comforts, offering an authentic yet refined mountain experience.
        </p>
        <p>
          Wake up to the golden glow of the Nanda Devi range painting the
          horizon. Our sprawling estate offers multiple terraced gardens,
          private reading nooks, and a central fireplace where stories are
          shared over endless cups of local rhododendron tea. Whether you are an
          artist seeking inspiration, a remote worker needing a serene backdrop,
          or a family reconnecting, Oak Ridge adapts to your rhythm.
        </p>
        <button className="text-primary font-label-md text-label-md underline underline-offset-4 hover:text-secondary transition-colors mt-xs flex items-center gap-xs">
          Read more{" "}
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </button>
      </div>
    </section>
  );
}
