"use client"

import React from "react";

export default function TeamSection() {
  return (
    <section className="py-xl bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-md">
        <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
          <div>
            <span className="text-secondary font-label-md uppercase tracking-widest">
              Our People
            </span>
            <h2 className="font-display-md text-display-md text-primary">
              Guided by Heart
            </h2>
          </div>
          <p className="text-lg text-on-surface-variant">
            A collective of mountaineers, conservationists, and local stewards
            working in harmony.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
          {/* Founder 1 */}
          <div className="space-y-sm text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-sm border-2 border-primary/10 p-1">
              <img
                className="w-full h-full object-cover rounded-full"
                alt="Tenzing N. Founder"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6U4ni3vuJFBOUAvJDtXjoNXRUvWEG5SLmjLEpK5SGk8T8L5CRM1SPeHW2FIdQKKH38ygxrj00IL9uct9ijpMqSeDlpaHMxwU4yf_G9Af84qRnNdH2xfHAQaLVU3nmuGhpdoOlZNgv7s5cVKDi_qB__diJBeH4av9E75DF8nRh1U4Td00rL2jXgP77ABgUyyxHHiHTPi5ZioJt9gjBkR2enHjpA962z_MI2OjBWlL8UemQrsCG7EE1pGOdtaLGxLGx_1SgDRykaEhm"
              />
            </div>
            <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
              Tenzing N.
            </h4>
            <p className="font-label-sm text-label-sm text-secondary uppercase">
              Founder & Explorer
            </p>
          </div>
          {/* Leader 2 */}
          <div className="space-y-sm text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-sm border-2 border-primary/10 p-1">
              <img
                className="w-full h-full object-cover rounded-full"
                alt="Pema L. Community Steward"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcdUot4QeJqm6Kuj-hHCzx0tnFal8lsVRlHWqd29aK5FB6hiZzfq7l7Hl1qESWxFJQxVYdqJeDwpk-n2PQjLjO8K6C7o3wSegASY7cd1QMl5bAGNwOF2WamgvEN-KzQ-rPgbQ7cyWWpV00IolMO_sm-16MYLZskp-xy7uaNnRxEJu8Mm8CDAv9lJ22x01eeArflJXqmKOvnwtTxH08W_Fe762s24PKgn_HhDNeo23DuxAd-TESP94_CrpVU2YvShdIlajUVp4O1_54"
              />
            </div>
            <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
              Pema L.
            </h4>
            <p className="font-label-sm text-label-sm text-secondary uppercase">
              Community Steward
            </p>
          </div>
          {/* Leader 3 */}
          <div className="space-y-sm text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-sm border-2 border-primary/10 p-1">
              <img
                className="w-full h-full object-cover rounded-full"
                alt="Vikram S. Eco-Innovation"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACFQFiRHhlxvyfsBGSvEAuNni96hpNehkh0oesG4MZVfuDYp1Hg1Cpgk-mEwsakuIcUeITcxfjGeeIXgAMnHYV1QCbt0YpsErJkZ5CBWZ-Zk4CDath3ad20Y2G43KlMs0EVCj5kTu2tZ_fIUl2ODZu6mmL-pHOU5Q1YwdkewQUTI84coCdNuVOFbsYkbQl4wAaTanX3wqAr6T3s7sFipwekIdiLvK3KFXUXwkc8J4gAbwcrCm570TO6fLIM2m7TJsEUQwJOb1Sz9QO"
              />
            </div>
            <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
              Vikram S.
            </h4>
            <p className="font-label-sm text-label-sm text-secondary uppercase">
              Eco-Innovation
            </p>
          </div>
          {/* Leader 4 */}
          <div className="space-y-sm text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-sm border-2 border-primary/10 p-1">
              <img
                className="w-full h-full object-cover rounded-full"
                alt="Ananya M. Guest Curator"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeUUenMs3tofgZb5TJe2_YJLIj3QpGq1juLehHdQmQxljDh_SNYiIrLgVwrTsYZzKQd-o2DtnuniK7ygy5Kyn5W8iyK3Slj_aEnEy-z1kWHFYUfw38BLB8N8P2PNgpipdBzn07V_4d74A-vUCI4Qldf9_-0tUqfOfCf4Dits9aXbVY7C_T8JlYQXHUE6KKFJL9ODj9HCzUxmkHmXmx1pt2kOK9AAd9GfCfiW_HluPW4d03y1qPu1X797yzEzvm2FmrEusAUWBRk35A"
              />
            </div>
            <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
              Ananya M.
            </h4>
            <p className="font-label-sm text-label-sm text-secondary uppercase">
              Guest Curator
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
