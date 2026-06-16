type Props={
title:string;
description:string;
image?:string;
}


export default function Card(
{
title,
description
}:Props
){

return(

<div className="border rounded-xl p-5 shadow-sm">

<h2 className="font-semibold text-xl">
{title}
</h2>


<p className="text-gray-600 mt-2">

{description}

</p>


</div>

)

}