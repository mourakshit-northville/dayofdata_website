/* Event photos: preserve natural aspect ratios; load new files from one GitHub upload folder. */
(() => {
  "use strict";
  const root="/assets/gallery/uploads/";
  // Only curated, approved photos are displayed; new uploads require review before public display.
  // Verified in GitHub's 32-photo upload branch and merged into production main.
  // This manifest avoids depending on unauthenticated GitHub API requests.
  const verifiedUploads=[
    {
      "src": "/assets/gallery/uploads/IMG_5100.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/IMG_5120.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/IMG_5252.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/IMG_5286.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/IMG_5289.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/IMG_5357.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/IMG_5359.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/IMG_5416.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/IMG_5472.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/IMG_5475.jpg",
      "group": "Other conference and community events",
      "caption": "Conference and community photograph",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/atlanta.jfif",
      "group": "Atlanta",
      "caption": "Photo from Atlanta",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/databricks1.jfif",
      "group": "Databricks events",
      "caption": "Photo from Databricks events",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/dayofdata.jpg",
      "group": "Day of Data — event to confirm",
      "caption": "Photo from Day of Data — event to confirm",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit1.jfif",
      "group": "Day of Data Detroit",
      "caption": "Photo from Day of Data Detroit",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit2.jfif",
      "group": "Day of Data Detroit",
      "caption": "Photo from Day of Data Detroit",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit3.jfif",
      "group": "Day of Data Detroit",
      "caption": "Photo from Day of Data Detroit",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit4.jfif",
      "group": "Day of Data Detroit",
      "caption": "Photo from Day of Data Detroit",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit5.jfif",
      "group": "Day of Data Detroit",
      "caption": "Photo from Day of Data Detroit",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/dayofdatadetroit6.jfif",
      "group": "Day of Data Detroit",
      "caption": "Photo from Day of Data Detroit",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/dbx2.jfif",
      "group": "Databricks events",
      "caption": "Photo from Databricks events",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/dbx4.jfif",
      "group": "Databricks events",
      "caption": "Photo from Databricks events",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/fabric.jpg",
      "group": "Microsoft Fabric",
      "caption": "Photo from Microsoft Fabric",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/houston1.jfif",
      "group": "Houston",
      "caption": "Photo from Houston",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/houston2.jfif",
      "group": "Houston",
      "caption": "Photo from Houston",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/houston3.jfif",
      "group": "Houston",
      "caption": "Photo from Houston",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/houston4.jfif",
      "group": "Houston",
      "caption": "Photo from Houston",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/richmond.jfif",
      "group": "Richmond",
      "caption": "Photo from Richmond",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/womenindata1.jfif",
      "group": "Women in Data",
      "caption": "Photo from Women in Data",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/womenindata2.jfif",
      "group": "Women in Data",
      "caption": "Photo from Women in Data",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/womenindata3.jfif",
      "group": "Women in Data",
      "caption": "Photo from Women in Data",
      "uploaded": true
    },
    {
      "src": "/assets/gallery/uploads/womenindata4.jfif",
      "group": "Women in Data",
      "caption": "Photo from Women in Data",
      "uploaded": true
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
  // Only known event dates are used for chronology. An event date is not an EXIF capture date.
  const dateByEvent={
    "Southfield Genie meetup":"2026-10-21",
    "Day of Data Detroit":"2026-09-12",
    "FabCon 2025":"2025-03-31"
  };
  // Curated visual-first order: large conference/teaching audiences first, then
  // presentations to smaller rooms and finally attendee/group photographs.
  // Filenames are internal identifiers only; they never appear on the website.
  // This order was reviewed against the original accessible photos, not upload dates.
  const audienceFirstPaths=[
    "/assets/fabcon-2025-stage.webp",
    "/assets/gallery/uploads/womenindata2.jfif",
    "/assets/gallery/uploads/womenindata4.jfif",
    "/assets/gallery/uploads/womenindata3.jfif",
    "/assets/gallery/uploads/dayofdata.jpg",
    "/assets/gallery/uploads/dayofdatadetroit1.jfif",
    "/assets/gallery/uploads/dayofdatadetroit3.jfif",
    "/assets/day-of-data-detroit-2026-audience-clear.webp",
    "/assets/gallery/uploads/dayofdatadetroit6.jfif",
    "/assets/gallery/uploads/womenindata1.jfif",
    "/assets/gallery/uploads/dayofdatadetroit4.jfif",
    "/assets/gallery/uploads/dayofdatadetroit5.jfif",
    "/assets/events/2026-10-21-southfield-genie/southfield-genie-8378.webp",
    "/assets/day-of-data-detroit-2026-databricks-genie-clear.webp",
    "/assets/gallery/uploads/dayofdatadetroit2.jfif",
    "/assets/day-of-data-detroit-2026-community-group-clear.webp",
    "/assets/events/2026-10-21-southfield-genie/southfield-genie-8383.webp",
    "/assets/events/2026-10-21-southfield-genie/southfield-genie-8377.webp",
    "/assets/events/2026-10-21-southfield-genie/southfield-genie-8372.webp",
    "/assets/events/2026-10-21-southfield-genie/southfield-genie-8373.webp",
    "/assets/events/2026-10-21-southfield-genie/southfield-genie-8387.webp",
    "/assets/day-of-data-detroit-2026-speaker-clear.webp",
    "/assets/gallery/uploads/houston3.jfif",
    "/assets/gallery/uploads/houston2.jfif",
    "/assets/gallery/uploads/houston4.jfif",
    "/assets/gallery/uploads/houston1.jfif",
    "/assets/gallery/uploads/databricks1.jfif",
    "/assets/gallery/uploads/dbx2.jfif",
    "/assets/gallery/uploads/atlanta.jfif",
    "/assets/gallery/uploads/dbx4.jfif",
    "/assets/gallery/uploads/richmond.jfif"
  ];
  const priorityIndex=new Map(audienceFirstPaths.map((src,index)=>[src,index]));
  function audienceFirst(items){
    return items.map((item,order)=>({
      ...item,
      eventDate:item.eventDate||dateByEvent[item.group]||null,
      originalOrder:order
    })).sort((a,b)=>{
      const pa=priorityIndex.has(a.src)?priorityIndex.get(a.src):Number.MAX_SAFE_INTEGER;
      const pb=priorityIndex.has(b.src)?priorityIndex.get(b.src):Number.MAX_SAFE_INTEGER;
      return pa-pb||a.originalOrder-b.originalOrder;
    });
  }
  function monthYear(date){
    if(!date)return "";
    const [y,m]=date.split("-").map(Number);
    return new Date(Date.UTC(y,m-1,1)).toLocaleDateString("en-US",{timeZone:"UTC",month:"short",year:"numeric"});
  }
  function displayCaption(item){
    if(item.uploaded)return item.group+(item.eventDate?" · "+monthYear(item.eventDate):"");
    return item.caption;
  }
  function addImage(src,alt,loading){
    const img=document.createElement("img");img.src=src;img.alt=alt;img.loading=loading||"lazy";img.decoding="async";img.onerror=()=>{img.closest("figure")?.remove();};return img;
  }
  function initRotator(items){
    const host=document.getElementById("photo-rotator");if(!host||!items.length)return;
    const image=host.querySelector("img"),caption=host.querySelector("[data-caption]"),counter=document.getElementById("photo-count"),prev=document.querySelector(".slideshow-controls [data-prev]"),next=document.querySelector(".slideshow-controls [data-next]"),pause=host.querySelector("[data-pause]");
    const slides=items.filter(x=>/\.(png|jpe?g|jfif|webp|gif)$/i.test(x.src)).slice(0,65);let ix=0;let playing=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;let timer;
    function draw(){const it=slides[ix];if(!it)return;image.src=it.src;image.alt=it.caption;caption.textContent=displayCaption(it);counter.textContent=(ix+1)+" of "+slides.length;}
    function advance(n){ix=(ix+n+slides.length)%slides.length;draw();}
    function stop(){if(timer)clearInterval(timer);timer=undefined;}
    function start(){stop();if(playing&&slides.length>1)timer=setInterval(()=>{if(!document.hidden)advance(1);},5200);}
    prev?.addEventListener("click",()=>{advance(-1);start();});next?.addEventListener("click",()=>{advance(1);start();});
    pause?.addEventListener("click",()=>{playing=!playing;pause.textContent=playing?"Pause":"Play";pause.setAttribute("aria-pressed",String(!playing));start();});
    // Keep playing while the cursor is over the photo; hovering previously froze the carousel.
    host.style.cursor="pointer";
    host.setAttribute("tabindex","0");
    host.setAttribute("aria-label","Speaking and audience photo slideshow. Click the picture to advance, or use left and right arrow keys.");
    host.addEventListener("click",ev=>{if(ev.target.closest("button"))return;advance(1);start();});
    host.addEventListener("keydown",ev=>{if(ev.target!==host)return;if(ev.key==="ArrowRight"||ev.key==="ArrowLeft"){ev.preventDefault();advance(ev.key==="ArrowRight"?1:-1);start();}});
    document.addEventListener("visibilitychange",()=>{if(document.hidden)stop();else start();});
    if(pause){pause.textContent=playing?"Pause":"Play";pause.setAttribute("aria-pressed",String(!playing));}
    draw();start();
  }
  function initGallery(items){
    const list=document.getElementById("photo-grid"),selector=document.getElementById("photo-group");if(!list)return;
    if(selector)selector.replaceChildren();
    const groupsList=["All events",...new Set(items.map(i=>i.group))];
    if(selector)groupsList.forEach(g=>{const o=document.createElement("option");o.textContent=g;o.value=g;selector.appendChild(o);});
    // A click opens an actual slideshow instead of leaving a static gallery tile.
    const viewer=document.createElement("dialog");
    viewer.className="gallery-lightbox";
    viewer.setAttribute("aria-label","Conference photo slideshow");
    viewer.innerHTML='<div class="gallery-viewer"><button type="button" class="gallery-close" aria-label="Close slideshow">Close ×</button><figure><img alt=""><figcaption aria-live="polite"></figcaption></figure><div class="gallery-viewer-controls"><button type="button" data-back>← Previous</button><span class="gallery-viewer-count"></span><button type="button" data-forward>Next →</button><button type="button" data-toggle aria-pressed="false">Pause</button></div></div>';
    document.body.appendChild(viewer);
    const picture=viewer.querySelector("img"),label=viewer.querySelector("figcaption"),counter=viewer.querySelector(".gallery-viewer-count");
    let visible=[],index=0,timer=null,playing=true;
    function stop(){if(timer!==null){clearInterval(timer);timer=null;}}
    function draw(){const it=visible[index];if(!it)return;picture.src=it.src;picture.alt=it.caption;label.textContent=displayCaption(it);counter.textContent=(index+1)+" of "+visible.length;}
    function advance(delta){if(!visible.length)return;index=(index+delta+visible.length)%visible.length;draw();}
    function start(){stop();if(playing&&viewer.open&&visible.length>1)timer=setInterval(()=>{if(!document.hidden)advance(1);},5200);}
    function openPhoto(i){index=i;playing=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;viewer.querySelector("[data-toggle]").textContent=playing?"Pause":"Play";viewer.querySelector("[data-toggle]").setAttribute("aria-pressed",String(!playing));draw();viewer.showModal();start();}
    viewer.querySelector(".gallery-close").addEventListener("click",()=>viewer.close());
    viewer.querySelector("[data-back]").addEventListener("click",()=>{advance(-1);start();});
    viewer.querySelector("[data-forward]").addEventListener("click",()=>{advance(1);start();});
    viewer.querySelector("[data-toggle]").addEventListener("click",ev=>{playing=!playing;ev.currentTarget.textContent=playing?"Pause":"Play";ev.currentTarget.setAttribute("aria-pressed",String(!playing));start();});
    viewer.addEventListener("close",stop);
    viewer.addEventListener("click",ev=>{if(ev.target===viewer)viewer.close();});
    viewer.addEventListener("keydown",ev=>{if(ev.key==="ArrowRight"||ev.key==="ArrowLeft"){ev.preventDefault();advance(ev.key==="ArrowRight"?1:-1);start();}});
    document.addEventListener("visibilitychange",()=>{if(document.hidden)stop();else if(viewer.open)start();});
    function render(){
      const selected=selector?.value||"All events";
      visible=items.filter(i=>selected==="All events"||i.group===selected);
      list.replaceChildren();
      visible.forEach((it,i)=>{
        const fig=document.createElement("figure"),btn=document.createElement("button");
        btn.className="gallery-photo-open";btn.type="button";btn.setAttribute("aria-label","View "+it.caption+" in slideshow");btn.appendChild(addImage(it.src,it.caption));
        btn.addEventListener("click",()=>openPhoto(i));
        const cap=document.createElement("figcaption");cap.textContent=displayCaption(it);
        fig.appendChild(btn);fig.appendChild(cap);list.appendChild(fig);
      });
    }
    if(selector)selector.onchange=render;render();
  }
  // Render immediately from the verified manifest, even when GitHub's API is slow or rate-limited.
  const initial=audienceFirst([...curated,...verifiedUploads]);
  initRotator(initial.filter(p=>!/session-card/.test(p.src)));
  initGallery(initial);
  const count=document.querySelector("[data-added-count]");
  if(count)count.textContent=verifiedUploads.length+" approved uploaded photos and "+curated.length+" earlier event images.";

})();