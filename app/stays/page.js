import CategoryFilter from "../../components/stays/CategoryFilter";
import FilterSidebar from "../../components/stays/FilterSidebar";
import PropertyCard from "../../components/stays/PropertyCard";

const properties = [
  {
    title: "The Pine Ridge Estate",
    location: "Kausani, Uttarakhand",
    price: "4,500",
    rating: "4.9",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlzXcYJTqtOpKoawPOS-7kYDbrvleWAgJu1e12uBbQJ6EHCzvkOYlTn4wVycn7EmzNSFqucL_GD3qmkgq6qk02tkuCuZXYdd_MtoHxuHZDJISIs9-zgnTC5ARAijb0L7x6GqU5mDLP5UKI-VwcBkMOz_BE7Y_INtj3hTWISnH8tkxRceNg5_x4iTTnoctYrWUal-_YTrWRqMkGlhl5hMEYu8pW8B3WekKNQtdnvhtORj8ZSgpIcsTCvR2M3nlGSLdKHKoUmoHBIRaG",
  },
  {
    title: "Glasshouse at Mukteshwar",
    location: "Mukteshwar, Uttarakhand",
    price: "6,200",
    rating: "4.8",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQQSyIPhh5FpfmA7sNtBbGvvnD7ghfy8Mj8wdnzKGvyyfn9hdefRM2jIJSeY2eS1oBBPKRxwI_ME_bwPY2uwSFzbjhGGlEYx33E7EoSj690jCgBUIgINy6v6c-4UV8KNnfVT4Fc3iShkZ1gVx70wZinRnnNhZ4HJAxyEmCarLvv9fIgmT5yFm8dYYzSfMAfaCgcnVO82ONYDalhRe0ZIsnGyLZD1B_ITPr7vN10-IJZ67aW7Uu3BgK874YctZUbwu1FPvcv289RXth",
  },
  {
    title: "Almora Heritage House",
    location: "Almora, Uttarakhand",
    price: "3,800",
    rating: "5.0",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACb1Nf9_5vpoVg8HSxWvgAsMdwhZ7f9CHzlcLpVArHbw-rgSOwHrmbGESE2witqnz3G_5jGhRC125Uo_LHFxDlD2ELnDHC-c2hk4IeTfRsNukb4lEtVKiR9m8ef5rlJrcTx4hc7_mp8Kp8IShSmmH3MgZkvj2XG-BMGcmWIJgB0HA5JdWoJZgjyrDn664PSFqHA_KB25DY-suKkLtIcLFokBFBCo0tT8_TxsCClSSoqEYVAXwX338clMtGxnYIZgZJje35vGe-uJ7U",
  },
];

export default function StaysPage() {
  return (
    <div className="grow pt-[80px] pb-xl relative">
      <CategoryFilter />
      <div className="max-w-container-max mx-auto px-md grid grid-cols-1 md:grid-cols-12 gap-gutter pt-8">
        <FilterSidebar />
        
        {/* Property Grid */}
        <div className="col-span-1 md:col-span-9">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="font-display-md text-display-md text-primary hidden md:block">
              Overlooking the Peaks
            </h1>
            {/* Mobile Filter Button */}
            <button className="md:hidden flex items-center gap-2 border border-outline-variant rounded-full px-4 py-2 text-label-md text-primary">
              <span className="material-symbols-outlined text-sm">tune</span>
              Filters
            </button>
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, idx) => (
              <PropertyCard key={idx} {...property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}