import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const F = "#1A2E1A", G = "#C4A35A", CR = "#F5F0E8", SG = "#6B7B6B", W = "#FFFFFF";
const TC = ["#2D5A27","#7B68AE","#B87333","#8B2252","#D4A017"];
const CN = ["I","II","III","IV","V"];
const CTit = ["The Awakening","The Bloom","The Heart","The Spice","The Glow"];
const CTerp = ["α-Pinene","Linalool","Myrcene","β-Caryophyllene","Limonene"];
const CAroma = ["Pine, Rosemary, Eucalyptus","Lavender, Basil, Tarragon","Lemongrass, Thyme, Mango","Black Pepper, Clove, Cinnamon","Lemon, Orange, Grapefruit"];
const CPlate = ["Salmon Gravlax, Fennel & Blood Orange","Petrale Sole, Dry Vermouth & Tarragon","Mushroom Vol-Au-Vent, Thyme Reduction","Hanger Steak, Black Pepper Sauce","Pistachio Crème Brûlée, Blood Orange Zest"];
const CPD = ["Fennel is rich in α-pinene and limonene — a natural terpene bridge. Paired with rosemary crostini.","Tarragon contains linalool — calming, floral, elegant. Already one of Simon's signature preparations.","Earthy mushrooms + thyme (rich in myrcene) create the deepest, most grounding course. Simon's vol-au-vent is already a guest favorite.","β-caryophyllene is the only terpene that directly activates cannabinoid receptors. Black pepper is its richest culinary source. Simon already makes this dish — it's destiny.","Citrus zest is pure limonene. Combined with pistachio — already on Simon's dessert menu — it's the perfect uplift."];
const CGlass = ["Gin & Rosemary Fizz","Lavender French 75","Mango-Lemongrass Smash","Mezcal & Black Pepper Old Fashioned","Limoncello Spritz"];
const CGD = ["Juniper-forward gin amplifies the pine. Rosemary sprig = pinene in the glass.","Champagne, gin, lavender syrup, lemon. Light, aromatic, floral.","Ripe mango + lemongrass + bourbon. Warming and tropical.","Smoky mezcal, cracked black pepper, mole bitters. Bold and complex — Flo's territory.","Limoncello, prosecco, blood orange. Bright, celebratory, effervescent."];
const CAir = ["Pine + rosemary + eucalyptus oils. Alertness, mental clarity.","Lavender + basil oils. Calming, stress-relieving.","Lemongrass + thyme + bay leaf oils. Warming, intimate.","Black pepper + clove + cinnamon oils. Anti-inflammatory, bold.","Lemon + sweet orange + grapefruit oils. Mood elevation, joy."];
const CStr = ["Blue Dream, Jack Herer","Lavender Kush, Do-Si-Dos","OG Kush, Granddaddy Purple","GSC, Bubba Kush","Super Lemon Haze, Wedding Cake"];

const B = (bg, c, children) => <div style={{background:bg,color:c||F,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"36px 28px"}}>{children}</div>;
const H = (t,c) => <h2 style={{fontSize:34,fontFamily:"Georgia,serif",color:c||F,textAlign:"center",margin:"0 0 6px"}}>{t}</h2>;
const Sub = (t) => <p style={{fontSize:14,fontFamily:"Georgia,serif",fontStyle:"italic",color:SG,textAlign:"center",margin:"0 0 32px"}}>{t}</p>;
const Sep = () => <div style={{width:64,height:1,background:G,opacity:0.4,margin:"28px auto"}}/>;

function CourseCard({i,dark}) {
  const c = TC[i];
  return (
    <div style={{borderRadius:8,overflow:"hidden",background:dark?"rgba(255,255,255,0.06)":W,flex:1}}>
      <div style={{padding:12,background:c,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",color:i===4?F:W,fontFamily:"Georgia,serif",fontSize:15}}>{CN[i]}</div>
        <div><div style={{fontSize:16,fontFamily:"Georgia,serif",color:i===4?F:W}}>{CTit[i]}</div><div style={{fontSize:9,color:i===4?"rgba(26,46,26,0.7)":"rgba(255,255,255,0.7)"}}>{CTerp[i]} — {CAroma[i]}</div></div>
      </div>
      <div style={{padding:16}}>
        <div style={{fontSize:9,fontWeight:700,color:c}}>THE PLATE</div>
        <div style={{fontSize:12,fontWeight:600,color:dark?CR:F,margin:"2px 0"}}>{CPlate[i]}</div>
        <div style={{fontSize:10,color:SG,lineHeight:1.4,marginBottom:10}}>{CPD[i]}</div>
        <div style={{fontSize:9,fontWeight:700,color:c}}>THE GLASS</div>
        <div style={{fontSize:12,fontWeight:600,color:dark?CR:F,margin:"2px 0"}}>{CGlass[i]}</div>
        <div style={{fontSize:10,color:SG,lineHeight:1.4,marginBottom:10}}>{CGD[i]}</div>
        <div style={{fontSize:9,fontWeight:700,color:c}}>THE AIR</div>
        <div style={{fontSize:10,color:SG,lineHeight:1.4,marginBottom:10}}>{CAir[i]}</div>
        <div style={{borderTop:"1px solid "+(dark?"rgba(255,255,255,0.1)":"#e8e0d8"),paddingTop:6}}>
          <div style={{fontSize:9,color:c,fontStyle:"italic"}}>Solful match: {CStr[i]}</div>
        </div>
      </div>
    </div>
  );
}

function Slide({n}) {
  if (n===0) return B(F,null,<div style={{textAlign:"center",position:"relative",zIndex:1}}>
    <div style={{fontSize:11,color:SG,letterSpacing:"0.2em",marginBottom:20}}>CACHÉ × SOLFUL — 4/20 WEEK 2026</div>
    <h1 style={{fontSize:56,fontFamily:"Georgia,serif",color:G,letterSpacing:"0.15em",margin:"0 0 12px"}}>HIDDEN NOTES</h1>
    <div style={{width:80,height:1,background:G,opacity:0.6,margin:"0 auto 20px"}}/>
    <p style={{fontSize:18,fontFamily:"Georgia,serif",color:CR,opacity:0.9}}>A Terpene Dining Experience</p>
  </div>);

  if (n===1) return B(F,null,<div style={{maxWidth:600,textAlign:"center"}}>
    <p style={{fontSize:34,fontFamily:"Georgia,serif",color:CR,lineHeight:1.4,margin:"0 0 8px"}}>"What if the secret to cannabis isn't THC...</p>
    <p style={{fontSize:38,fontFamily:"Georgia,serif",color:G,fontStyle:"italic",margin:"0 0 20px"}}>it's flavor?"</p>
    <Sep/>
    <p style={{fontSize:15,color:SG,lineHeight:1.7}}>The same aromatic molecules that make rosemary different from lavender are the exact molecules that make each cannabis strain unique. They're called <span style={{color:G}}>terpenes</span>. And they're already in Simon's kitchen.</p>
  </div>);

  if (n===2) return B(CR,null,<div style={{maxWidth:680,width:"100%"}}>
    {H("Terpenes")}{Sub("The hidden thread connecting cannabis, cuisine, and aroma")}
    {[["In Cannabis","Terpenes determine why one strain energizes and another relaxes. They drive the experience more than THC alone."],["In Cuisine","Black pepper, rosemary, lavender, lemongrass — the herbs Simon already uses are terpene-rich."],["In Aromatherapy","Essential oils work because of terpenes. Lavender calms, eucalyptus energizes — same molecules."]].map(([t,d],i)=><div key={i} style={{padding:16,marginBottom:12,borderRadius:8,background:W}}><div style={{fontSize:14,fontWeight:600,color:F,marginBottom:6}}>{t}</div><div style={{fontSize:12,color:SG,lineHeight:1.5}}>{d}</div></div>)}
    <div style={{padding:14,borderRadius:8,background:F,textAlign:"center"}}><p style={{fontSize:14,fontFamily:"Georgia,serif",color:G,margin:0}}>Same molecule. Same effect. Whether from a cannabis flower or a sprig of rosemary.</p></div>
  </div>);

  if (n===3) return B(F,null,<div style={{maxWidth:680,width:"100%"}}>
    <div style={{textAlign:"center",marginBottom:8}}><span style={{fontSize:11,color:G,letterSpacing:"0.2em"}}>INNER SUNSET, SAN FRANCISCO</span></div>
    {H("1.5 Blocks of Possibility",CR)}{Sub("")}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      {[["Solful","900 Irving St",G,["Leafly's \"Best Dispensary for Sungrown Flower\"","Education-first, Health & Happiness consultations","Curated sun-grown cannabis from Sonoma, Mendocino, Humboldt"]],["Caché","1235 9th Ave","#B07D62",["Flo & Simon — Pierre Gagnaire, 2 Michelin Stars","Modern French bistro, soulful and inventive","Proven prix fixe success — Valentine's + Thanksgiving packed house"]]].map(([name,addr,col,items],i)=><div key={i} style={{padding:20,borderRadius:8,background:"rgba(255,255,255,0.06)",borderLeft:`3px solid ${col}`}}>
        <div style={{fontSize:20,fontFamily:"Georgia,serif",color:col}}>{name}</div>
        <div style={{fontSize:9,color:SG,letterSpacing:"0.15em",marginBottom:12}}>{addr}</div>
        {items.map((t,j)=><div key={j} style={{fontSize:12,color:CR,opacity:0.85,lineHeight:1.5,marginBottom:8}}>{t}</div>)}
      </div>)}
    </div>
    <p style={{fontSize:15,fontFamily:"Georgia,serif",color:CR,opacity:0.8,textAlign:"center",marginTop:24}}>Two brands sharing <span style={{color:G}}>quality, craft, and education</span>. Walking distance apart.</p>
  </div>);

  if (n===4) return B(CR,null,<div style={{maxWidth:680,width:"100%"}}>
    {H("Hidden Notes")}{Sub("A five-course terpene journey — where every sense tells the same story")}
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:32}}>
      {CN.map((num,i)=><div key={i} style={{textAlign:"center",flex:1}}>
        <div style={{width:48,height:48,borderRadius:"50%",background:TC[i],display:"flex",alignItems:"center",justifyContent:"center",color:W,fontSize:16,fontFamily:"Georgia,serif",margin:"0 auto 8px"}}>{num}</div>
        <div style={{fontSize:11,fontWeight:600,color:F}}>{CTit[i]}</div>
        <div style={{fontSize:9,color:TC[i]}}>{CTerp[i]}</div>
      </div>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
      {[["Course + Cocktail","Simon's cuisine paired with Flo's cocktails"],["Essential Oils","Diffusion blend shifts with each course"],["Curated Playlist","Tempo evolves from bright to celebratory"],["Tasting Cards","Guests discover matched Solful strains"]].map(([t,d],i)=><div key={i} style={{padding:12,borderRadius:8,background:F,textAlign:"center"}}><div style={{fontSize:9,fontWeight:600,color:G,marginBottom:4}}>{t}</div><div style={{fontSize:9,color:CR,opacity:0.8,lineHeight:1.3}}>{d}</div></div>)}
    </div>
  </div>);

  if (n===5) return B(CR,null,<div style={{maxWidth:760,width:"100%"}}>
    <div style={{fontSize:10,color:SG,letterSpacing:"0.2em",textAlign:"center",marginBottom:24}}>THE MENU — COURSES I & II</div>
    <div style={{display:"flex",gap:16}}><CourseCard i={0}/><CourseCard i={1}/></div>
  </div>);

  if (n===6) return B(CR,null,<div style={{maxWidth:760,width:"100%"}}>
    <div style={{fontSize:10,color:SG,letterSpacing:"0.2em",textAlign:"center",marginBottom:24}}>THE MENU — COURSES III & IV</div>
    <div style={{display:"flex",gap:16}}><CourseCard i={2}/><CourseCard i={3}/></div>
  </div>);

  if (n===7) return B(F,null,<div style={{maxWidth:760,width:"100%"}}>
    <div style={{fontSize:10,color:G,letterSpacing:"0.2em",textAlign:"center",marginBottom:24}}>THE FINALE — COURSE V & THE RETURN</div>
    <div style={{display:"flex",gap:16}}>
      <CourseCard i={4} dark/>
      <div style={{borderRadius:8,overflow:"hidden",background:"rgba(255,255,255,0.06)",flex:1}}>
        <div style={{padding:12,background:G}}>
          <div style={{fontSize:16,fontFamily:"Georgia,serif",color:F}}>The Return</div>
          <div style={{fontSize:9,color:F,opacity:0.7}}>Herbal Tea — All Five Terpenes Reunited</div>
        </div>
        <div style={{padding:16}}>
          <div style={{fontSize:9,fontWeight:700,color:G}}>THE RITUAL</div>
          <div style={{fontSize:12,fontWeight:600,color:CR,margin:"2px 0"}}>Custom Terpene Tea Blend</div>
          <div style={{fontSize:10,color:SG,lineHeight:1.4,marginBottom:12}}>Rosemary (pinene), lavender (linalool), lemongrass (myrcene), black pepper (caryophyllene), lemon verbena (limonene). The full journey in one cup.</div>
          <div style={{fontSize:9,fontWeight:700,color:G}}>THE REVEAL</div>
          <div style={{fontSize:10,color:SG,lineHeight:1.4,marginBottom:12}}>Tasting cards flipped — revealing which Solful strains share each course's terpene profile.</div>
          <div style={{fontSize:9,fontWeight:700,color:G}}>THE BRIDGE</div>
          <div style={{fontSize:10,color:SG,lineHeight:1.4}}>No cannabis at Caché. Guests leave knowing exactly which strains to explore at Solful — 1.5 blocks away.</div>
        </div>
      </div>
    </div>
  </div>);

  if (n===8) return B(F,null,<div style={{maxWidth:680,width:"100%"}}>
    {H("The Opportunity",CR)}{Sub("4/20 Week 2026 — April 15–20")}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24}}>
      {[["$150–175","PER PERSON","5-course prix fixe + cocktails + sensory experience"],["2–4","EVENTS","Across 4/20 week. Soft launch, intimate, invite-first."],["First","IN SF","Terpene-paired cannabis dining. Massive press potential."]].map(([v,l,d],i)=><div key={i} style={{padding:16,borderRadius:8,background:"rgba(255,255,255,0.06)",textAlign:"center"}}>
        <div style={{fontSize:26,fontFamily:"Georgia,serif",color:G}}>{v}</div>
        <div style={{fontSize:8,fontWeight:700,color:G,letterSpacing:"0.12em",marginBottom:8}}>{l}</div>
        <div style={{fontSize:10,color:CR,opacity:0.8}}>{d}</div>
      </div>)}
    </div>
    <div style={{padding:16,borderRadius:8,background:"rgba(196,163,90,0.1)",border:"1px solid rgba(196,163,90,0.2)"}}>
      <p style={{fontSize:12,color:CR,textAlign:"center",margin:0,lineHeight:1.6}}><span style={{color:G}}>Proven format:</span> Valentine's and Thanksgiving packed the house noon to 10:30. This adds terpene science to your best format — on cannabis's biggest day.</p>
    </div>
  </div>);

  if (n===9) return B(CR,null,<div style={{maxWidth:680,width:"100%"}}>
    {H("What We Each Bring")}{Sub("Three partners, zero overlap")}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
      {[["Caché","The Stage","#B07D62",["Simon's Michelin-trained kitchen","Flo's cocktail mastery","Intimate dining room","Service excellence","Wine program"]],["Solful","The Bridge","#2D5A27",["Cannabis expertise & strain selection","Built-in customer base","Brand credibility (Leafly's best)","Meet the Farmer community","1.5 blocks away"]],["Chuck","The Thread",G,["Terpene science & research","Essential oil blending","Experience design & flow","Playlist curation","Partnership coordination"]]].map(([name,role,col,items],i)=><div key={i} style={{borderRadius:8,overflow:"hidden",background:W}}>
        <div style={{padding:12,background:col}}><div style={{fontSize:16,fontFamily:"Georgia,serif",color:W}}>{name}</div><div style={{fontSize:9,color:"rgba(255,255,255,0.7)"}}>{role}</div></div>
        <div style={{padding:14}}>{items.map((t,j)=><div key={j} style={{display:"flex",gap:6,marginBottom:8}}><div style={{width:4,height:4,borderRadius:"50%",background:col,marginTop:5,flexShrink:0}}/><div style={{fontSize:10,color:F,lineHeight:1.4}}>{t}</div></div>)}</div>
      </div>)}
    </div>
  </div>);

  if (n===10) return B(F,null,<div style={{maxWidth:560,textAlign:"center"}}>
    <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:28}}>{TC.map((c,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:c}}/>)}</div>
    <p style={{fontSize:26,fontFamily:"Georgia,serif",color:CR,lineHeight:1.4,margin:"0 0 8px"}}>The future of cannabis isn't about getting high.</p>
    <p style={{fontSize:26,fontFamily:"Georgia,serif",color:G,fontStyle:"italic",lineHeight:1.4,margin:"0 0 20px"}}>It's about understanding flavor.</p>
    <Sep/>
    <p style={{fontSize:15,color:SG,marginBottom:32}}>And nobody speaks the language of flavor like you two.</p>
    <div style={{textAlign:"left",display:"inline-block"}}>
      <div style={{fontSize:9,color:G,letterSpacing:"0.15em",marginBottom:14}}>NEXT STEPS</div>
      {["Dinner conversation — talk through the menu together","Menu workshop — Simon + Chuck dial in terpene pairings","Cocktail session — Flo creates the matched drink program","Solful introduction — we pitch Eli and Noah together"].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{width:22,height:22,borderRadius:"50%",background:G,color:F,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</div>
        <div style={{fontSize:12,color:CR,opacity:0.85}}>{s}</div>
      </div>)}
    </div>
    <p style={{fontSize:14,fontFamily:"Georgia,serif",color:G,marginTop:36}}>Hidden Notes — Caché × Solful</p>
    <p style={{fontSize:10,color:SG,marginTop:6}}>4/20 Week 2026</p>
  </div>);
}

const N = 11;
export default function App() {
  const [c, setC] = useState(0);
  const [f, setF] = useState(true);
  const go = useCallback(d => {
    const x = d>0 ? Math.min(c+1,N-1) : Math.max(c-1,0);
    if (x===c) return;
    setF(false); setTimeout(()=>{setC(x);setF(true)},120);
  },[c]);
  useEffect(()=>{
    const h = e => {if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();go(1)}if(e.key==="ArrowLeft"){e.preventDefault();go(-1)}};
    window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h);
  },[go]);
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",overflow:"hidden"}}>
      <div style={{flex:1,overflowY:"auto",transition:"opacity 120ms",opacity:f?1:0}}><Slide n={c}/></div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 16px",background:F,borderTop:"1px solid rgba(255,255,255,0.08)",flexShrink:0}}>
        <button onClick={()=>go(-1)} style={{display:"flex",alignItems:"center",gap:3,background:"none",border:"none",color:c===0?SG:CR,opacity:c===0?0.3:1,cursor:c===0?"default":"pointer",fontSize:12,padding:"4px 6px"}}><ChevronLeft size={14}/>Prev</button>
        <div style={{display:"flex",gap:5}}>{Array.from({length:N},(_,i)=><button key={i} onClick={()=>{setF(false);setTimeout(()=>{setC(i);setF(true)},120)}} style={{width:7,height:7,borderRadius:"50%",background:i===c?G:SG,opacity:i===c?1:0.35,border:"none",cursor:"pointer",padding:0}}/>)}</div>
        <button onClick={()=>go(1)} style={{display:"flex",alignItems:"center",gap:3,background:"none",border:"none",color:c===N-1?SG:CR,opacity:c===N-1?0.3:1,cursor:c===N-1?"default":"pointer",fontSize:12,padding:"4px 6px"}}>Next<ChevronRight size={14}/></button>
      </div>
    </div>
  );
}
