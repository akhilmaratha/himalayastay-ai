import { User } from "lucide-react";

export default function Navbar(){
return(
<nav className="h-16 px-10 flex items-center justify-between border-b">

<h1 className="text-xl font-bold">
HimalayaStay AI
</h1>


<div className="flex gap-6">
<a>Home</a>
<a>Stays</a>
<a>Booking</a>
<a>Dashboard</a>
</div>


<User />

</nav>
)
}