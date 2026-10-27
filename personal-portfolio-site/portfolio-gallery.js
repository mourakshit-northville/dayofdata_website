/* Event photos: preserve natural aspect ratios; load new files from one GitHub upload folder. */
(() => {
  "use strict";
  const root="/assets/gallery/uploads/";
  const endpoint="https://api.github.com/repos/mourakshit-northville/dayofdata_website/contents/personal-portfolio-site/assets/gallery/uploads?ref=main";
  // Verified in GitHub's 32-photo upload branch and merged into production main.
  // This manifest avoids depending on unauthenticated GitHub API requests.
  const verifiedUploads=[
    {
      "src": "/assets/gallery/uploads/IMG_5100.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5100"
    },
    {
      "src": "/assets/gallery/uploads/IMG_5120.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5120"
    },
    {
      "src": "/assets/gallery/uploads/IMG_5252.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5252"
    },
    {
      "src": "/assets/gallery/uploads/IMG_5286.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5286"
    },
    {
      "src": "/assets/gallery/uploads/IMG_5289.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5289"
    },
    {
      "src": "/assets/gallery/uploads/IMG_5357.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5357"
    },
    {
      "src": "/assets/gallery/uploads/IMG_5359.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5359"
    },
    {
      "src": "/assets/gallery/uploads/IMG_5416.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5416"
    },
    {
      "src": "/assets/gallery/uploads/IMG_5472.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5472"
    },
    {
      "src": "/assets/gallery/uploads/IMG_5475.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · IMG 5475"
    },
    {
      "src": "/assets/gallery/uploads/atlanta.jfif",
      "group": "Atlanta",
      "caption": "atlanta"
    },
    {
      "src": "/assets/gallery/uploads/databricks1.jfif",
      "group": "Databricks events",
      "caption": "databricks1"
    },
    {
      "src": "/assets/gallery/uploads/dayofdata.jpg",
      "group": "Day of Data — event to confirm",
      "caption": "dayofdata"
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit1.jfif",
      "group": "Day of Data Detroit",
      "caption": "dayofdatadetroit1"
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit2.jfif",
      "group": "Day of Data Detroit",
      "caption": "dayofdatadetroit2"
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit3.jfif",
      "group": "Day of Data Detroit",
      "caption": "dayofdatadetroit3"
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit4.jfif",
      "group": "Day of Data Detroit",
      "caption": "dayofdatadetroit4"
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit5.jfif",
      "group": "Day of Data Detroit",
      "caption": "dayofdatadetroit5"
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit6.jfif",
      "group": "Day of Data Detroit",
      "caption": "dayofdatadetroit6"
    },
    {
      "src": "/assets/gallery/uploads/dbx2.jfif",
      "group": "Databricks events",
      "caption": "dbx2"
    },
    {
      "src": "/assets/gallery/uploads/dbx4.jfif",
      "group": "Databricks events",
      "caption": "dbx4"
    },
    {
      "src": "/assets/gallery/uploads/fabric.jpg",
      "group": "Microsoft Fabric",
      "caption": "fabric"
    },
    {
      "src": "/assets/gallery/uploads/houston1.jfif",
      "group": "Houston",
      "caption": "houston1"
    },
    {
      "src": "/assets/gallery/uploads/houston2.jfif",
      "group": "Houston",
      "caption": "houston2"
    },
    {
      "src": "/assets/gallery/uploads/houston3.jfif",
      "group": "Houston",
      "caption": "houston3"
    },
    {
      "src": "/assets/gallery/uploads/houston4.jfif",
      "group": "Houston",
      "caption": "houston4"
    },
    {
      "src": "/assets/gallery/uploads/richmond.jfif",
      "group": "Richmond",
      "caption": "richmond"
    },
    {
      "src": "/assets/gallery/uploads/three_sisters.jpg",
      "group": "Unsorted uploads",
      "caption": "Event photo to identify · three sisters"
    },
    {
      "src": "/assets/gallery/uploads/womenindata1.jfif",
      "group": "Women in Data",
      "caption": "womenindata1"
    },
    {
      "src": "/assets/gallery/uploads/womenindata2.jfif",
      "group": "Women in Data",
      "caption": "womenindata2"
    },
    {
      "src": "/assets/gallery/uploads/womenindata3.jfif",
      "group": "Women in Data",
      "caption": "womenindata3"
    },
    {
      "src": "/assets/gallery/uploads/womenindata4.jfif",
      "group": "Women in Data",
      "caption": "womenindata4"
    }
  ];
  const curated=[
    {src:"/assets/events/2026-10-21-southfield-genie/southfield-genie-8372.webp",group:"Southfield Genie meetup",caption:"Genie Agent live demonstration · Southfield, October 2026"},
    {src:"/assets/events/2026-10-21-southfield-genie/southfield-genie-8387.webp",group:"Southfield Genie meetup",caption:"Discussing Genie Agents with attendees · Southfield"},
    {src:"/assets/events/2026-10-21-southfield-genie/southfield-genie-8378.webp",group:"Southfield Genie meetup",caption:"Audience following the Southfield technical session"},
    {src:"/assets/events/2026-10-21-southfield-genie/southfield-genie-8383.webp",group:"Southfield Genie meetup",caption:"The Southfield meetup audience"},
    {src:"/assets/events/2026-10-21-southfield-genie/southfield-genie-8373.webp",group:"Southfield Genie meetup",caption:"Genie Agent configuration discussion"},
    {src:"/assets/events/2026-10-21-southfield-genie/southfield-genie-8377.webp",group:"Southfield Genie meetup",caption:"Southfield meetup room"},
    {src:"/assets/day-of-data-detroit-2026-databricks-genie-clear.webp",group:"Day of Data Detroit",caption:"Databricks Genie presentation · Day of Data Detroit 2026"},
    {src:"/assets/day-of-data-detroit-2026-audience-clear.webp",group:"Day of Data Detroit",caption:"Audience at Day of Data Detroit 2026"},
    {src:"/assets/day-of-data-detroit-2026-community-group-clear.webp",group:"Day of Data Detroit",caption:"Community gathering · Day of Data Detroit 2026"},
    {src:"/assets/day-of-data-detroit-2026-speaker-clear.webp",group:"Day of Data Detroit",caption:"Technical presentation · Day of Data Detroit 2026"},
    {src:"/assets/fabcon-2025-stage.webp",group:"FabCon 2025",caption:"Speaking at Microsoft Fabric Community Conference 2025"},
    {src:"/assets/fabcon-2025-session-card.webp",group:"FabCon 2025",caption:"FabCon 2025 session evidence"}
  ];
  const label=s=>s.replace(/[-_]+/g," ").replace(/\b\w/g,c=>c.toUpperCase()).trim();
  const groups={"southfield-genie":"Southfield Genie meetup","day-of-data-detroit":"Day of Data Detroit","fabcon-2025":"FabCon 2025","mitechcon":"MITechCon"};
  function parseName(name){
    const p=name.replace(/\.(jpe?g|jfif|png|webp|gif)$/i,"").split("__");
    const base=p[0].toLowerCase();
    const inferred=/^dayofdatadetroit/.test(base)?"Day of Data Detroit"
      :/^dayofdata/.test(base)?"Day of Data — event to verify"
      :/^atlanta/.test(base)?"Atlanta — event to verify"
      :/^(databricks|dbx)/.test(base)?"Databricks — event to verify"
      :"New uploads";
    const group=p.length>1?(groups[p[1].toLowerCase()]||label(p[1])):inferred;
    const caption=p.length>2?label(p.slice(2).join(" ")):label(p[0].replace(/^\d{4}-\d{2}-\d{2}/,""));
    return {group,caption:caption||"Speaking & community photo"};
  }
  async function newPhotos(){
    try{
      const res=await fetch(endpoint,{headers:{"Accept":"application/vnd.github+json"}});
      if(!res.ok)throw new Error("GitHub listing unavailable");
      const entries=await res.json();
      if(!Array.isArray(entries))return [];
      return entries.filter(f=>f.type==="file"&&/\.(jpe?g|jfif|png|webp|gif)$/i.test(f.name)).slice(0,450).map(f=>({...parseName(f.name),src:root+encodeURIComponent(f.name)}));
    }catch(e){return [];}
  }
  function addImage(src,alt,loading){
    const img=document.createElement("img");img.src=src;img.alt=alt;img.loading=loading||"lazy";img.decoding="async";img.onerror=()=>{img.closest("figure")?.remove();};return img;
  }
  function initRotator(items){
    const host=document.getElementById("photo-rotator");if(!host||!items.length)return;
    const image=host.querySelector("img"),caption=host.querySelector("[data-caption]"),counter=document.getElementById("photo-count"),prev=host.querySelector("[data-prev]"),next=host.querySelector("[data-next]"),pause=host.querySelector("[data-pause]");
    const slides=items.filter(x=>/\.(png|jpe?g|jfif|webp|gif)$/i.test(x.src) && x.group!=="Unsorted uploads").slice(0,65);let ix=0;let playing=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;let timer;
    function draw(){const it=slides[ix];if(!it)return;image.src=it.src;image.alt=it.caption;caption.textContent=it.caption;counter.textContent=(ix+1)+" of "+slides.length;}
    function advance(n){ix=(ix+n+slides.length)%slides.length;draw();}
    function stop(){if(timer)clearInterval(timer);timer=undefined;}
    function start(){stop();if(playing&&slides.length>1)timer=setInterval(()=>{if(!document.hidden)advance(1);},5200);}
    prev?.addEventListener("click",()=>{advance(-1);start();});next?.addEventListener("click",()=>{advance(1);start();});
    pause?.addEventListener("click",()=>{playing=!playing;pause.textContent=playing?"Pause":"Play";pause.setAttribute("aria-pressed",String(!playing));start();});
    host.addEventListener("mouseenter",stop);host.addEventListener("mouseleave",start);
    host.addEventListener("focusin",stop);host.addEventListener("focusout",start);
    document.addEventListener("visibilitychange",()=>{if(document.hidden)stop();else start();});
    if(pause){pause.textContent=playing?"Pause":"Play";pause.setAttribute("aria-pressed",String(!playing));}
    draw();start();
  }
  function initGallery(items){
    const list=document.getElementById("photo-grid"),selector=document.getElementById("photo-group");if(!list)return;
    const groupsList=["All events",...new Set(items.map(i=>i.group))];
    if(selector){groupsList.forEach(g=>{const o=document.createElement("option");o.textContent=g;o.value=g;selector.appendChild(o);});}
    function render(){const v=selector?.value||"All events";list.replaceChildren();items.filter(i=>v==="All events"||i.group===v).forEach((it)=>{const fig=document.createElement("figure");fig.appendChild(addImage(it.src,it.caption));const cap=document.createElement("figcaption");cap.textContent=it.group+" · "+it.caption;fig.appendChild(cap);list.appendChild(fig);});}
    selector?.addEventListener("change",render);render();
  }
  Promise.resolve(newPhotos()).then(uploaded=>{
    const seen=new Set(),all=[...curated,...verifiedUploads,...uploaded].filter(p=>{if(seen.has(p.src))return false;seen.add(p.src);return true;});
    initRotator(all.filter(p=>!/session-card/.test(p.src)));
    initGallery(all);
    const n=document.querySelector("[data-added-count]");if(n)n.textContent=uploaded.length?verifiedUploads.length+" new portfolio photos, plus "+curated.length+" earlier event images.":"Additional photographs will appear as they are uploaded.";
  });
})();