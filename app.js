const properties = [
 {title:"شقة مميزة في عزبة خالد",type:"شقة",status:"بيع",area:"عزبة خالد - كفر الدوار",price:1100000,size:85,rooms:2,baths:1,img:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"},
 {title:"شقة فاخرة في ميامي",type:"شقة",status:"بيع",area:"ميامي - الإسكندرية",price:2450000,size:130,rooms:3,baths:1,img:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"},
 {title:"شاليه بجاردن على حمام السباحة",type:"شاليه",status:"بيع",area:"مرسيليا 4 - الساحل",price:1850000,size:90,rooms:2,baths:1,img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"},
 {title:"مكتب إداري بمساحة واسعة",type:"إداري",status:"إيجار",area:"سموحة - الإسكندرية",price:35000,size:420,rooms:0,baths:2,img:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"},
 {title:"محل تجاري بموقع حيوي",type:"محل",status:"إيجار",area:"كفر الدوار",price:12000,size:65,rooms:0,baths:1,img:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80"},
 {title:"شقة للبيع قريبة من الخدمات",type:"شقة",status:"بيع",area:"شارع المحكمة - كفر الدوار",price:1350000,size:100,rooms:3,baths:1,img:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80"}
];
let activeStatus="الكل";
const cards=document.getElementById("propertyCards");
function render(){
 const type=document.getElementById("typeFilter").value;
 const area=document.getElementById("areaFilter").value.trim().toLowerCase();
 const max=Number(document.getElementById("priceFilter").value)||Infinity;
 const filtered=properties.filter(p=>(activeStatus==="الكل"||p.status===activeStatus)&&(!type||p.type===type)&&p.area.toLowerCase().includes(area)&&p.price<=max);
 cards.innerHTML=filtered.map(p=>`<article class="property-card"><div class="property-photo"><img src="${p.img}" alt="${p.title}" loading="lazy"><span class="badge">${p.status}</span></div><div class="card-body"><h3>${p.title}</h3><div class="location">⌖ ${p.area}</div><div class="price">${p.price.toLocaleString("en-US")} جنيه</div><div class="features"><span>▧ ${p.size} م²</span><span>غرف ${p.rooms||"—"}</span><span>حمامات ${p.baths}</span></div></div></article>`).join("");
 document.getElementById("resultsCount").textContent=`${filtered.length} عقارات`;
 document.getElementById("emptyState").hidden=filtered.length!==0;
}
document.querySelectorAll(".search-tabs button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".search-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeStatus=b.dataset.status;render()}));
document.getElementById("searchBtn").addEventListener("click",render);
render();
document.getElementById("leadForm").addEventListener("submit",e=>{
 e.preventDefault();const d=new FormData(e.target);
 const msg=`طلب جديد من موقع House for You%0Aالاسم: ${encodeURIComponent(d.get("name"))}%0Aالموبايل: ${encodeURIComponent(d.get("phone"))}%0Aنوع الطلب: ${encodeURIComponent(d.get("request"))}%0Aالمنطقة: ${encodeURIComponent(d.get("area")||"غير محدد")}%0Aالتفاصيل: ${encodeURIComponent(d.get("details")||"لا توجد")}`;
 window.open(`https://wa.me/201271289862?text=${msg}`,"_blank");
});