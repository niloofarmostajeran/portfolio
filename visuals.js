/* Original explanatory diagrams and an interactive triangulated field.
   No external animation libraries, remote assets or copied reference code. */
(() => {
  'use strict';
  const words = {
    en: {inputs:'Inputs',model:'Algorithm',judgment:'Human judgment',create:'Create',store:'Store',share:'Share',apply:'Apply',preferences:'Preferences',experience:'Experience',choice:'Relevant choice',input:'Input',hidden:'Hidden layers',output:'Output',backprop:'Backpropagation'},
    fa: {inputs:'داده‌ها',model:'الگوریتم',judgment:'قضاوت انسانی',create:'خلق دانش',store:'ذخیره دانش',share:'انتقال دانش',apply:'کاربرد دانش',preferences:'ترجیحات',experience:'تجربه',choice:'انتخاب مرتبط',input:'ورودی',hidden:'لایه‌های پنهان',output:'خروجی',backprop:'پس‌انتشار'}
  };
  const text = (x,y,value,extra='') => `<text class="diagram-label" x="${x}" y="${y}" text-anchor="middle" ${extra}>${value}</text>`;
  const signal = (path,delay=0) => `<circle class="diagram-signal" r="3.2" style="offset-path:path('${path}');animation-delay:${delay}s"/>`;
  const paper = (x,y) => `<rect x="${x}" y="${y}" width="47" height="58" rx="3" class="scene-paper"/><path d="M${x+10} ${y+16}h26m-26 10h26m-26 10h17" class="scene-detail"/>`;
  function diagram(index, language) {
    const w = words[language] || words.en;
    let scene = '';
    if (index === 0) {
      scene = `<g class="scene-lines"><path d="M99 95H144V140H193M99 168H144V140M272 140h43"/><path d="M242 78v-14m0 152v-14" stroke-dasharray="3 5"/></g>
        <g class="input-documents">${paper(52,67)}${paper(68,139)}</g>
        <g class="algorithm-core"><rect x="193" y="101" width="79" height="79" rx="8" class="scene-paper"/><rect x="204" y="112" width="57" height="57" rx="3" class="scene-detail"/>
        ${Array.from({length:9},(_,i)=>`<rect class="model-cell" x="${215+i%3*13}" y="${123+Math.floor(i/3)*13}" width="8" height="8" rx="1" style="animation-delay:${i*.22}s"/>`).join('')}
        <path d="M207 96v-8m17 8v-8m17 8v-8m17 8v-8M207 185v8m17-8v8m17-8v8m17-8v8"/></g>
        <g class="judgment-scale"><path d="M370 102v94m-25 0h50m-35 7h20" class="scale-stand"/><circle cx="370" cy="102" r="4" class="scene-dot"/>
        <g class="scale-beam"><path d="M322 111h96M332 111v37m76-37v37M313 148h38l-5 13h-28zM389 148h38l-5 13h-28z"/><circle cx="332" cy="140" r="3" class="scene-dot"/><path d="m402 138 4 4 7-8" class="scene-check"/></g></g>
        ${signal('M100 95 L144 95 L144 140 L193 140',0)}${signal('M272 140 L315 140',1.6)}
        ${text(88,237,w.inputs)}${text(232,237,w.model)}${text(370,237,w.judgment)}`;
    } else if (index === 1) {
      scene = `<g class="scene-lines knowledge-routes"><path d="M154 84C183 54 317 54 347 84M378 117v45M346 196C317 226 184 226 154 196M122 162v-45" stroke-dasharray="3 7"/><path d="M156 95l64 26M344 95l-64 26M344 185l-64-26M156 185l64-26"/></g>
        <g class="knowledge-step" style="--phase:0s">${paper(102,66)}<path d="M111 88h29m-29 9h23"/></g>
        <g class="knowledge-step" style="--phase:1.2s"><ellipse cx="375" cy="79" rx="24" ry="9" class="scene-paper"/><path d="M351 79v38c0 12 48 12 48 0V79M351 97c0 12 48 12 48 0M351 108c0 12 48 12 48 0"/></g>
        <g class="knowledge-step" style="--phase:2.4s"><circle cx="362" cy="177" r="7" class="scene-paper"/><circle cx="387" cy="177" r="7" class="scene-paper"/><circle cx="375" cy="160" r="7" class="scene-paper"/><path d="M349 195c0-14 26-14 26 0M375 195c0-14 26-14 26 0M365 170c4-6 16-6 20 0"/></g>
        <g class="knowledge-step" style="--phase:3.6s"><rect x="101" y="158" width="49" height="40" rx="3" class="scene-paper"/><path d="M111 188v-10m10 10v-17m10 17v-25M139 166l-5-4m5 4-4 5"/></g>
        <circle class="knowledge-halo" cx="250" cy="140" r="43"/><circle cx="250" cy="140" r="32" class="scene-core"/><text class="core-label" x="250" y="145" text-anchor="middle" direction="ltr">GenAI</text>
        ${signal('M156 95 L220 121',0)}${signal('M280 121 L344 95',1.2)}${signal('M280 159 L344 185',2.4)}${signal('M220 159 L156 185',3.6)}
        ${text(125,49,w.create)}${text(375,49,w.store)}${text(375,230,w.share)}${text(125,230,w.apply)}`;
    } else if (index === 2) {
      scene = `<g class="scene-lines"><path d="M150 140h58M282 140h52"/><path d="M150 117c44 0 42-44 95-44s77 43 90 43M150 163c34 0 54 45 95 45" stroke-dasharray="3 7"/></g>
        <rect x="55" y="91" width="95" height="98" rx="5" class="scene-paper"/>
        <g class="preference-rows"><circle cx="73" cy="114" r="4" class="scene-dot"/><path d="M86 114h45"/><circle cx="73" cy="140" r="4" class="scene-dot"/><path d="M86 140h30"/><circle cx="73" cy="166" r="4" class="scene-dot"/><path d="M86 166h40"/></g>
        <circle class="customer-halo" cx="245" cy="140" r="47"/><circle cx="245" cy="140" r="34" class="scene-paper"/><circle cx="245" cy="130" r="9"/><path d="M227 155c0-19 36-19 36 0"/>
        <g class="recommended-card"><rect x="334" y="85" width="64" height="107" rx="4" class="scene-paper"/><rect x="343" y="96" width="46" height="48" rx="2" class="scene-wash"/><path d="M348 157h35m-35 9h23"/><circle cx="380" cy="182" r="10" class="scene-core"/><path d="m375 182 4 4 7-8" class="inverted-check"/></g>
        <g class="secondary-card"><rect x="412" y="105" width="42" height="78" rx="4" class="scene-paper"/><rect x="419" y="114" width="28" height="30" rx="2" class="scene-wash"/><path d="M420 157h25m-25 8h16"/></g>
        <path d="m245 188 13 5v12c-2 8-13 13-13 13s-11-5-13-13v-12z" class="trust-shield"/><path d="m239 201 4 4 9-9" class="scene-check"/>
        ${signal('M150 140 L208 140',0)}${signal('M282 140 L334 140',1.6)}
        ${text(103,242,w.preferences)}${text(245,242,w.experience)}${text(388,242,w.choice)}`;
    } else {
      const layers = [[94,[91,140,189]],[168,[69,116,163,210]],[250,[58,99,140,181,222]],[332,[79,140,201]],[411,[110,170]]];
      let edges = '', neurons = '';
      layers.forEach(([x,ys],layer) => {
        if (layer < layers.length-1) {
          const [nx,nys] = layers[layer+1];
          edges += `<g class="neural-weights" style="--phase:${layer*.65}s">${ys.map(y=>nys.map(ny=>`<path d="M${x} ${y}L${nx} ${ny}"/>`).join('')).join('')}</g>`;
        }
        neurons += `<g class="neural-stage" style="--phase:${layer*.65}s">${ys.map(y=>`<circle cx="${x}" cy="${y}" r="7"/>`).join('')}</g>`;
      });
      scene = `${edges}<g class="input-pixels">${Array.from({length:9},(_,i)=>`<rect x="${42+i%3*9}" y="${126+Math.floor(i/3)*9}" width="6" height="6" rx="1" class="${i%4===0?'scene-core':'scene-wash'}"/>`).join('')}</g><path d="M70 140h17M419 110h19m-19 60h19" class="scene-lines"/>${neurons}
        <path d="M411 213v23H94v-22m0 22 5-5m-5 5 5 5" class="backprop-path"/>
        ${text(94,36,w.input)}${text(250,36,w.hidden)}${text(411,36,w.output)}${text(252,263,w.backprop)}`;
    }
    return `<svg class="research-scene scene-${index}" viewBox="0 0 500 280" aria-hidden="true" focusable="false">${scene}</svg>`;
  }

  // Bowyer–Watson triangulation establishes a continuous, irregular mesh.
  function triangulate(points) {
    const n = points.length, span = Math.max(...points.flatMap(p=>[Math.abs(p.x),Math.abs(p.y)]))*12+100;
    const all = points.concat([{x:-span,y:-span},{x:span*2,y:-span},{x:0,y:span*2}]);
    const circle = (a,b,c) => {
      const d = 2*(a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y));
      if (Math.abs(d)<.0001) return {x:0,y:0,r:-1};
      const aa=a.x*a.x+a.y*a.y, bb=b.x*b.x+b.y*b.y, cc=c.x*c.x+c.y*c.y;
      const x=(aa*(b.y-c.y)+bb*(c.y-a.y)+cc*(a.y-b.y))/d;
      const y=(aa*(c.x-b.x)+bb*(a.x-c.x)+cc*(b.x-a.x))/d;
      return {x,y,r:(x-a.x)**2+(y-a.y)**2};
    };
    const make = (a,b,c) => ({ids:[a,b,c],...circle(all[a],all[b],all[c])});
    let triangles = [make(n,n+1,n+2)];
    points.forEach((point,index) => {
      const edges = new Map();
      const kept = [];
      triangles.forEach(triangle => {
        if ((point.x-triangle.x)**2+(point.y-triangle.y)**2 <= triangle.r) {
          for(let j=0;j<3;j++) {
            const a=triangle.ids[j], b=triangle.ids[(j+1)%3], key=[a,b].sort((x,y)=>x-y).join(':');
            if(edges.has(key)) edges.delete(key); else edges.set(key,[a,b]);
          }
        } else kept.push(triangle);
      });
      edges.forEach(([a,b]) => kept.push(make(a,b,index)));
      triangles = kept;
    });
    return triangles.filter(triangle=>triangle.ids.every(id=>id<n)).map(triangle=>triangle.ids);
  }

  function createField(element, options = {}) {
    const canvas = element.querySelector('.connection-canvas');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return {setPaused() {}};
    let width=0,height=0,nodes=[],triangles=[],edges=[],waves=[];
    let frame=0,lastTime=0,time=0,visible=false,stopped=!!options.paused;
    let pointer={x:-1000,y:-1000,active:false};
    const isPhone=()=>matchMedia('(max-width:600px)').matches;
    const light=!!options.light;
    const color=light?'211,227,196':'100,132,84';
    const jitter=i=>{const x=Math.sin(i*127.1+41.7)*43758.5453;return x-Math.floor(x)};
    function resize() {
      const rect=element.getBoundingClientRect();width=rect.width;height=rect.height;
      const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
      const spacing=isPhone()?105:146;
      const cols=Math.ceil(width/spacing)+2,rows=Math.ceil(height/spacing)+2;
      nodes=[];
      for(let row=0;row<rows;row++) for(let col=0;col<cols;col++) {
        const index=row*cols+col;
        const x=col*spacing-55+(jitter(index*2)-.5)*spacing*.68;
        const y=row*spacing-55+(jitter(index*2+1)-.5)*spacing*.68;
        nodes.push({x,y,bx:x,by:y,vx:0,vy:0,phase:index*1.618});
      }
      triangles=triangulate(nodes);
      const unique=new Map();
      triangles.forEach(ids=>ids.forEach((id,i)=>{const pair=[id,ids[(i+1)%3]].sort((a,b)=>a-b);unique.set(pair.join(':'),pair)}));
      edges=[...unique.values()];waves=[];
      canvas.dataset.field='triangles';canvas.dataset.points=nodes.length;canvas.dataset.triangles=triangles.length;
      draw(0);
    }
    function draw(delta) {
      time+=delta;ctx.clearRect(0,0,width,height);
      waves=waves.filter(wave=>time-wave.time<2.6);
      const step=delta?Math.min(delta*60,2):0;
      for(const node of nodes) {
        let tx=node.bx+(stopped?0:Math.sin(time*.39+node.phase)*16);
        let ty=node.by+(stopped?0:Math.cos(time*.31+node.phase)*14);
        const dx=node.bx-pointer.x,dy=node.by-pointer.y,distance=Math.hypot(dx,dy);
        if(pointer.active&&!stopped&&distance<230&&distance>0) {
          const force=(1-distance/230)**2*62;tx+=dx/distance*force;ty+=dy/distance*force;
        }
        for(const wave of waves) {
          const age=time-wave.time,wx=node.bx-wave.x,wy=node.by-wave.y,dist=Math.hypot(wx,wy);
          const pulse=Math.exp(-(((dist-age*360)/85)**2))*35*(1-age/2.6);
          if(dist>0){tx+=wx/dist*pulse;ty+=wy/dist*pulse}
        }
        node.vx=(node.vx+(tx-node.x)*.04*step)*.84;node.vy=(node.vy+(ty-node.y)*.04*step)*.84;
        node.x+=node.vx*step;node.y+=node.vy*step;
      }
      triangles.forEach((ids,index)=>{
        const [a,b,c]=ids.map(id=>nodes[id]);
        const cx=(a.x+b.x+c.x)/3,cy=(a.y+b.y+c.y)/3;
        const near=pointer.active&&!stopped?Math.max(0,1-Math.hypot(cx-pointer.x,cy-pointer.y)/260):0;
        const breathing=stopped?0:(Math.sin(time*.35+index*.72)+1)*.012;
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(c.x,c.y);ctx.closePath();
        ctx.fillStyle=`rgba(${color},${(index%7===0?.055:.008)+breathing+near*.1})`;ctx.fill();
      });
      for(const [aId,bId] of edges) {
        const a=nodes[aId],b=nodes[bId];
        const near=pointer.active&&!stopped?Math.max(0,1-Math.hypot((a.x+b.x)/2-pointer.x,(a.y+b.y)/2-pointer.y)/250):0;
        ctx.strokeStyle=`rgba(${color},${(light?.17:.24)+near*.32})`;ctx.lineWidth=.65+near*.45;
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      }
      nodes.forEach((node,index)=>{
        const near=pointer.active&&!stopped&&Math.hypot(node.x-pointer.x,node.y-pointer.y)<200;
        ctx.fillStyle=`rgba(${color},${near?.8:.4})`;ctx.beginPath();ctx.arc(node.x,node.y,near?2.6:1.5,0,Math.PI*2);ctx.fill();
        if(index%12===0){ctx.strokeStyle=`rgba(${color},.35)`;ctx.lineWidth=.7;ctx.beginPath();ctx.arc(node.x,node.y,5,0,Math.PI*2);ctx.stroke()}
      });
    }
    function loop(timestamp) {
      frame=0;if(stopped||!visible||document.hidden){lastTime=0;return}
      if(!lastTime||timestamp-lastTime>=(isPhone()?1000/30:1000/45)) {draw(lastTime?Math.min((timestamp-lastTime)/1000,.06):.016);lastTime=timestamp}
      frame=requestAnimationFrame(loop);
    }
    const start=()=>{if(!frame&&!stopped&&visible&&!document.hidden)frame=requestAnimationFrame(loop)};
    const stop=()=>{cancelAnimationFrame(frame);frame=0;lastTime=0};
    function setPaused(value){stopped=value;if(value){stop();pointer.active=false;waves=[];draw(0)}else start()}
    element.addEventListener('pointermove',event=>{
      const rect=element.getBoundingClientRect();pointer={x:event.clientX-rect.left,y:event.clientY-rect.top,active:true};
      const portrait=element.querySelector('.portrait-composition');
      if(portrait&&!isPhone()&&!stopped){const r=portrait.getBoundingClientRect();portrait.style.setProperty('--tilt-x',`${Math.max(-3,Math.min(3,-((event.clientY-r.top)/r.height-.5)*4))}deg`);portrait.style.setProperty('--tilt-y',`${Math.max(-3,Math.min(3,((event.clientX-r.left)/r.width-.5)*4))}deg`)}
    },{passive:true});
    element.addEventListener('pointerleave',()=>{pointer.active=false;const portrait=element.querySelector('.portrait-composition');if(portrait){portrait.style.setProperty('--tilt-x','0deg');portrait.style.setProperty('--tilt-y','0deg')}},{passive:true});
    element.addEventListener('pointerdown',event=>{
      if(stopped||event.target.closest('a,button,summary'))return;
      const rect=element.getBoundingClientRect();waves.push({x:event.clientX-rect.left,y:event.clientY-rect.top,time});if(waves.length>5)waves.shift();
    },{passive:true});
    element.addEventListener('pointerup',event=>{if(event.pointerType==='touch')pointer.active=false},{passive:true});
    element.addEventListener('pointercancel',()=>{pointer.active=false},{passive:true});
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop()}).observe(element);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start()});
    new ResizeObserver(resize).observe(element);resize();
    return {setPaused};
  }
  window.PORTFOLIO_VISUALS={diagram,createField};
})();
