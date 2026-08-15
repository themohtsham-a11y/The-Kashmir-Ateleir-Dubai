import { useState } from "react";

const materials = [
{
id:1,
name:"Italian Statuario Marble",
category:"Marble",
lifespan:"100+ Years",
application:"Flooring",
image:"/materials/statuario.jpg",
description:"Premium Italian marble famous for luxury villas and palaces."
},
{
id:2,
name:"Kashmiri Walnut Wood",
category:"Wood",
lifespan:"80+ Years",
application:"Wall Panels",
image:"/materials/walnut.jpg",
description:"Handcrafted premium walnut wood used for luxury interiors."
},
{
id:3,
name:"Triple Glazed Glass",
category:"Glass",
lifespan:"40+ Years",
application:"Windows",
image:"/materials/glass.jpg",
description:"Energy efficient Low-E insulated glass."
},
{
id:4,
name:"Fe550D Steel",
category:"Structure",
lifespan:"100+ Years",
application:"Structure",
image:"/materials/steel.jpg",
description:"High strength earthquake resistant reinforcement."
},
{
id:5,
name:"Italian Travertine",
category:"Stone",
lifespan:"100+ Years",
application:"Exterior",
image:"/materials/travertine.jpg",
description:"Premium natural stone for luxury façades."
},
{
id:6,
name:"Smart Home Automation",
category:"Technology",
lifespan:"20+ Years",
application:"Smart Home",
image:"/materials/smart.jpg",
description:"Complete AI based smart home system."
}
];

export default function MaterialLibrary(){

const [search,setSearch]=useState("");
const [category,setCategory]=useState("All");

const filtered=materials.filter(item=>{

const matchName=item.name.toLowerCase().includes(search.toLowerCase());

const matchCategory=
category==="All" || item.category===category;

return matchName && matchCategory;

});

return(

<section id="materials" className="py-28 bg-black text-white">

<div className="max-w-7xl mx-auto px-8">

<h1 className="text-5xl font-light mb-4">
The Kashmir Atelier Materials Library
</h1>

<p className="text-white/60 max-w-3xl mb-10">
Every luxury project begins with exceptional materials. Explore the premium materials, technologies and systems we use.
</p>

<div className="flex flex-wrap gap-5 mb-10">

<input

type="text"

placeholder="Search Material..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="bg-neutral-900 border border-yellow-600 rounded-xl px-5 py-3 w-80"
/>

<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="bg-neutral-900 border border-yellow-600 rounded-xl px-5 py-3">

<option>All</option>

<option>Marble</option>

<option>Wood</option>

<option>Glass</option>

<option>Stone</option>

<option>Technology</option>

<option>Structure</option>

</select>

</div>

<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">

{

filtered.map(material=>(

<div

key={material.id}

className="rounded-3xl overflow-hidden bg-neutral-900 border border-yellow-700 hover:scale-[1.03] duration-500">

<img

src={material.image}

className="h-72 w-full object-cover"

/>

<div className="p-8">

<h2 className="text-2xl text-yellow-400">

{material.name}

</h2>

<div className="mt-4 space-y-2 text-white/70">

<p>

<strong>Category:</strong> {material.category}

</p>

<p>

<strong>Application:</strong> {material.application}

</p>

<p>

<strong>Lifespan:</strong> {material.lifespan}

</p>

</div>

<p className="mt-5 text-white/70">

{material.description}

</p>

<button className="mt-8 w-full py-3 rounded-xl bg-yellow-500 text-black font-semibold">

View Details

</button>

</div>

</div>

))

}

</div>

</div>

</section>

)

}
