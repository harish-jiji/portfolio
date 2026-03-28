import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    let W = mount.clientWidth, H = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010a12, 0.032);

    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 200);
    camera.position.set(0, 2, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x010a12, 1);
    mount.appendChild(renderer.domElement);

    // ── Orbit ──
    const orb = { th: 0.15, ph: 1.2, r: 12, tTh: 0.15, tPh: 1.2, tR: 12 };
    const drag = { on: false, x: 0, y: 0 };
    const gp   = (e) => e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
    const dDn  = (e) => { drag.on = true; const p = gp(e); drag.x = p.x; drag.y = p.y; };
    const dUp  = () => { drag.on = false; };
    const dMv  = (e) => {
      if (!drag.on) return;
      const p = gp(e);
      orb.tTh -= (p.x - drag.x) * 0.005;
      orb.tPh  = Math.max(0.25, Math.min(1.52, orb.tPh + (p.y - drag.y) * 0.004));
      drag.x = p.x; drag.y = p.y;
    };
    const dWh = (e) => { orb.tR = Math.max(4, Math.min(22, orb.tR + e.deltaY * 0.012)); };
    mount.addEventListener("mousedown",  dDn);
    mount.addEventListener("mouseup",    dUp);
    mount.addEventListener("mousemove",  dMv);
    mount.addEventListener("touchstart", dDn, { passive: true });
    mount.addEventListener("touchend",   dUp);
    mount.addEventListener("touchmove",  dMv, { passive: true });
    mount.addEventListener("wheel",      dWh, { passive: true });
    const onResize = () => {
      W = mount.clientWidth; H = mount.clientHeight;
      camera.aspect = W / H; camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    // helpers
    const B  = (w, h, d, col, op = 1) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color: col, transparent: op < 1, opacity: op }));
    const Cy = (rt, rb, h, col, seg = 10) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), new THREE.MeshBasicMaterial({ color: col }));
    const Sp = (r, col, op = 1) => new THREE.Mesh(new THREE.SphereGeometry(r, 14, 14), new THREE.MeshBasicMaterial({ color: col, transparent: op < 1, opacity: op }));
    const sprite = (canvas, sx, sy, px, py, pz, op = 1) => {
      const tex = new THREE.CanvasTexture(canvas);
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: op }));
      s.scale.set(sx, sy, 1);
      s.position.set(px, py, pz);
      return s;
    };

    // ─────────────────────────────────────────
    // 1. UNDERWATER CAUSTICS FLOOR
    // ─────────────────────────────────────────
    const GRID = 70;
    const seaFloorGeo = new THREE.PlaneGeometry(30, 30, GRID, GRID);
    seaFloorGeo.rotateX(-Math.PI / 2);
    const sfPos  = seaFloorGeo.attributes.position;
    const sfOrig = new Float32Array(sfPos.array);
    // random rocky bumps
    for (let i = 0; i < sfPos.count; i++) {
      sfPos.array[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
    }
    const sfCols = new Float32Array(sfPos.count * 3);
    for (let i = 0; i < sfPos.count; i++) {
      sfCols[i * 3]     = 0.01;
      sfCols[i * 3 + 1] = 0.09 + Math.random() * 0.06;
      sfCols[i * 3 + 2] = 0.12 + Math.random() * 0.08;
    }
    seaFloorGeo.setAttribute("color", new THREE.BufferAttribute(sfCols, 3));
    const seaFloor = new THREE.Mesh(seaFloorGeo, new THREE.MeshBasicMaterial({ wireframe: true, vertexColors: true, transparent: true, opacity: 0.2 })); // Reduced opacity
    seaFloor.position.y = -4.5;
    scene.add(seaFloor);

    // solid dark floor
    const solidFloor = B(30, 0.1, 30, 0x010810);
    solidFloor.position.y = -4.55;
    scene.add(solidFloor);

    // ─────────────────────────────────────────
    // 2. UNDERWATER SERVER RACK ROOM
    // ─────────────────────────────────────────
    const serverRoom = new THREE.Group();
    serverRoom.position.set(0, -4.5, -2);
    scene.add(serverRoom);

    // base platform
    const platform = B(14, 0.2, 6, 0x0a1520);
    platform.position.y = 0.1;
    serverRoom.add(platform);

    // server racks
    const rackPositions = [[-5, 0, 0], [-2.5, 0, 0], [0, 0, 0], [2.5, 0, 0], [5, 0, 0]];
    rackPositions.forEach(([rx, ry, rz]) => {
      // rack body
      const rack = B(1.8, 3.2, 0.9, 0x0d1f2e);
      rack.position.set(rx, 1.7, rz);
      serverRoom.add(rack);
      // rack frame edges
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 3.2, 0.9)),
        new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.2 }) // Slightly dimmed
      );
      edges.position.set(rx, 1.7, rz);
      serverRoom.add(edges);
      // server units inside rack
      for (let u = 0; u < 10; u++) {
        const unit = B(1.6, 0.22, 0.7, u % 3 === 0 ? 0x0a1628 : 0x0d1a28);
        unit.position.set(rx, 0.4 + u * 0.28, rz);
        serverRoom.add(unit);
        // LED indicator
        const led = B(0.06, 0.06, 0.02, u % 4 === 0 ? 0xff4444 : u % 3 === 0 ? 0x4ade80 : 0x06b6d4, 0.8);
        led.position.set(rx - 0.72, 0.4 + u * 0.28, rz - 0.37);
        led.userData = { phase: Math.random() * Math.PI * 2, blink: u % 5 === 0 };
        serverRoom.add(led);
        // port holes
        for (let p = 0; p < 4; p++) {
          const port = B(0.07, 0.05, 0.02, 0x1e3a5f);
          port.position.set(rx - 0.4 + p * 0.2, 0.4 + u * 0.28, rz - 0.37);
          serverRoom.add(port);
        }
      }
      // cable bundles on top
      const cable = Cy(0.04, 0.04, 0.5, 0x1e293b, 6);
      cable.rotation.z = Math.PI / 2;
      cable.position.set(rx, 3.38, rz - 0.2);
      serverRoom.add(cable);
    });

    // cable tubes connecting racks (arcing between them)
    for (let i = 0; i < 4; i++) {
      const [ax] = rackPositions[i];
      const [bx] = rackPositions[i + 1];
      const pts  = [];
      for (let s = 0; s <= 20; s++) {
        const tt = s / 20;
        pts.push(new THREE.Vector3(
          ax + (bx - ax) * tt,
          3.5 + Math.sin(tt * Math.PI) * 0.6,
          -0.2 + (Math.random() - 0.5) * 0.1
        ));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo   = new THREE.TubeGeometry(curve, 20, 0.03, 6, false);
      const col   = i % 2 === 0 ? 0x06b6d4 : 0x7c3aed;
      serverRoom.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5 }))); // Dimmed
    }

    // ─────────────────────────────────────────
    // 3. DIVER PROGRAMMER
    // ─────────────────────────────────────────
    const diverGroup = new THREE.Group();
    diverGroup.position.set(2.5, -1.8, 1.5);
    scene.add(diverGroup);

    const SUIT  = 0x0f2744;
    const VISOR = 0x06b6d4;
    const GLOVE = 0x1e3a5f;
    const TANK  = 0x334155;

    // TORSO — diving suit
    const torso = B(0.58, 0.7, 0.4, SUIT);
    torso.position.set(0, 0, 0);
    diverGroup.add(torso);
    // suit panels / detail strips
    const strip = B(0.08, 0.6, 0.02, 0x06b6d4, 0.4);
    strip.position.set(0, 0, -0.21);
    diverGroup.add(strip);

    // OXYGEN TANKS on back
    [-0.12, 0.12].forEach(x => {
      const tank = Cy(0.1, 0.1, 0.55, TANK, 10);
      tank.position.set(x, 0.05, 0.25);
      diverGroup.add(tank);
      // tank cap
      const cap = Cy(0.08, 0.1, 0.05, 0x475569, 10);
      cap.position.set(x, 0.35, 0.25);
      diverGroup.add(cap);
    });
    // regulator tube
    const regPts = [
      new THREE.Vector3(0, 0.3, 0.2),
      new THREE.Vector3(0.15, 0.1, -0.05),
      new THREE.Vector3(0.1, -0.1, -0.22),
    ];
    const regCurve = new THREE.CatmullRomCurve3(regPts);
    const regGeo   = new THREE.TubeGeometry(regCurve, 12, 0.025, 6, false);
    diverGroup.add(new THREE.Mesh(regGeo, new THREE.MeshBasicMaterial({ color: 0x1e293b })));

    // HIPS
    const hips = B(0.6, 0.2, 0.42, SUIT);
    hips.position.set(0, -0.44, 0);
    diverGroup.add(hips);

    // LEGS
    [-0.18, 0.18].forEach(x => {
      // thigh
      const thigh = B(0.2, 0.38, 0.22, SUIT);
      thigh.position.set(x, -0.75, 0);
      diverGroup.add(thigh);
      // shin
      const shin = B(0.18, 0.34, 0.2, SUIT);
      shin.position.set(x, -1.14, 0);
      diverGroup.add(shin);
      // FINS
      const fin = B(0.18, 0.06, 0.55, 0x0e3a5f);
      fin.position.set(x, -1.37, -0.14);
      diverGroup.add(fin);
    });

    // NECK + HEAD
    const neck = Cy(0.1, 0.1, 0.14, SUIT, 8);
    neck.position.set(0, 0.43, 0);
    diverGroup.add(neck);

    // dive helmet (sphere + flat face)
    const helmet = Sp(0.27, 0x0f2744);
    helmet.position.set(0, 0.71, 0);
    diverGroup.add(helmet);
    // visor (large oval window)
    const visor = new THREE.Mesh(
      new THREE.CircleGeometry(0.17, 20),
      new THREE.MeshBasicMaterial({ color: VISOR, transparent: true, opacity: 0.4, side: THREE.DoubleSide })
    );
    visor.position.set(0, 0.71, -0.25);
    diverGroup.add(visor);
    // visor ring
    const vRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.17, 0.018, 8, 30),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 })
    );
    vRing.position.set(0, 0.71, -0.25);
    diverGroup.add(vRing);
    // face glow inside visor
    const faceGlow = Sp(0.12, 0x06b6d4, 0.1);
    faceGlow.position.set(0, 0.71, -0.12);
    faceGlow.userData = { phase: 0 };
    diverGroup.add(faceGlow);
    // helmet light (top)
    const hLight = Sp(0.055, 0xffffff, 0.6); // Dimmed
    hLight.position.set(0, 0.98, -0.14);
    hLight.userData = { phase: 1.2 };
    diverGroup.add(hLight);

    // ARM — left: reaching to server cable
    const lSh = B(0.16, 0.16, 0.16, SUIT);
    lSh.position.set(-0.37, 0.12, 0);
    diverGroup.add(lSh);
    const lUA = B(0.14, 0.1, 0.38, SUIT);
    lUA.position.set(-0.44, 0, -0.17);
    diverGroup.add(lUA);
    const lFA = B(0.12, 0.09, 0.32, SUIT);
    lFA.position.set(-0.5, -0.08, -0.42);
    diverGroup.add(lFA);
    const lGlove = B(0.14, 0.1, 0.14, GLOVE);
    lGlove.position.set(-0.52, -0.1, -0.59);
    diverGroup.add(lGlove);

    // ARM — right: holding holographic tablet
    const rSh = B(0.16, 0.16, 0.16, SUIT);
    rSh.position.set(0.37, 0.12, 0);
    diverGroup.add(rSh);
    const rUA = B(0.14, 0.1, 0.38, SUIT);
    rUA.position.set(0.44, 0, -0.17);
    diverGroup.add(rUA);
    const rFA = B(0.12, 0.09, 0.3, SUIT);
    rFA.position.set(0.5, -0.06, -0.4);
    diverGroup.add(rFA);
    const rGlove = B(0.14, 0.1, 0.14, GLOVE);
    rGlove.position.set(0.52, -0.08, -0.56);
    diverGroup.add(rGlove);

    // HOLOGRAPHIC TABLET in right hand
    const tabGroup = new THREE.Group();
    tabGroup.position.set(0.62, 0.04, -0.72);
    tabGroup.rotation.x = 0.4;
    tabGroup.rotation.y = -0.3;
    diverGroup.add(tabGroup);

    const tabFrame = B(0.55, 0.38, 0.02, 0x0a1a2a);
    tabGroup.add(tabFrame);
    const tabEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(0.55, 0.38, 0.01)),
      new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 })
    );
    tabGroup.add(tabEdges);

    // tablet screen content
    const tc = document.createElement("canvas");
    tc.width = 360; tc.height = 250;
    const tctx = tc.getContext("2d");
    tctx.fillStyle = "rgba(2,12,26,0.8)";
    tctx.fillRect(0, 0, 360, 250);
    const tabLines = [
      { t: "SSH root@server-04", c: "#06b6d4", y: 24 },
      { t: "Connected via AUV-link", c: "#4ade80", y: 44 },
      { t: "$ ping 192.168.1.4", c: "#06b6d4", y: 66 },
      { t: "PING 192.168.1.4: 56 data", c: "#94a3b8", y: 84 },
      { t: "bytes, 1ms TTL=64 ✓", c: "#4ade80", y: 100 },
      { t: "$ docker ps", c: "#06b6d4", y: 122 },
      { t: "api-node   Up 3 days", c: "#4ade80", y: 140 },
      { t: "pg-db      Up 3 days", c: "#4ade80", y: 158 },
      { t: "redis      Up 1 day", c: "#facc15", y: 176 },
      { t: "$ tail -f /var/log/n", c: "#06b6d4", y: 198 },
      { t: "[INFO] GET /api 200", c: "#4ade80", y: 216 },
      { t: "[INFO] GET /api 200", c: "#4ade80", y: 232 },
      { t: "[WARN] High CPU load █", c: "#f87171", y: 248 },
    ];
    tabLines.forEach(({ t, c, y }) => {
      tctx.font = "13px 'Courier New'";
      tctx.fillStyle = c;
      tctx.fillText(t, 8, y);
    });
    const tabTex = new THREE.CanvasTexture(tc);
    const tabSp  = new THREE.Sprite(new THREE.SpriteMaterial({ map: tabTex, transparent: true, opacity: 0.8 }));
    tabSp.scale.set(0.52, 0.36, 1);
    tabGroup.add(tabSp);

    // ─────────────────────────────────────────
    // 4. BIOLUMINESCENT PARTICLES + JELLYFISH
    // ─────────────────────────────────────────
    const bioGroup = new THREE.Group();
    scene.add(bioGroup);

    // bioluminescent particles (plankton)
    const BIO_COUNT = 2000;
    const bioGeo = new THREE.BufferGeometry();
    const bioPos = new Float32Array(BIO_COUNT * 3);
    const bioCol = new Float32Array(BIO_COUNT * 3);
    const bioVel = new Float32Array(BIO_COUNT * 3);
    for (let i = 0; i < BIO_COUNT; i++) {
      bioPos[i * 3]     = (Math.random() - 0.5) * 28;
      bioPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      bioPos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
      bioVel[i * 3]     = (Math.random() - 0.5) * 0.006;
      bioVel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      bioVel[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
      const r = Math.random();
      // cyan teal bioluminescent palette - Dimmed for text readability
      if (r < 0.5) { bioCol[i*3]=0.01; bioCol[i*3+1]=0.4; bioCol[i*3+2]=0.37; }
      else if (r < 0.8) { bioCol[i*3]=0.01; bioCol[i*3+1]=0.3; bioCol[i*3+2]=0.45; }
      else { bioCol[i*3]=0.25; bioCol[i*3+1]=0.1; bioCol[i*3+2]=0.45; }
    }
    bioGeo.setAttribute("position", new THREE.BufferAttribute(bioPos, 3));
    bioGeo.setAttribute("color",    new THREE.BufferAttribute(bioCol, 3));
    const bioParticles = new THREE.Points(bioGeo, new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.4 }));
    bioGroup.add(bioParticles);

    // JELLYFISH
    const jellies = [];
    for (let j = 0; j < 5; j++) {
      const jGroup = new THREE.Group();
      jGroup.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 7 + 1,
        (Math.random() - 0.5) * 10 - 2
      );
      // bell
      const bellGeo = new THREE.SphereGeometry(0.4, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2);
      const col     = j % 2 === 0 ? 0x06b6d4 : 0x7c3aed;
      const bell    = new THREE.Mesh(bellGeo, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.15, side: THREE.DoubleSide }));
      jGroup.add(bell);
      const bellRim = new THREE.Mesh(
        new THREE.TorusGeometry(0.4, 0.025, 8, 30),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.4 })
      );
      jGroup.add(bellRim);
      // tentacles
      for (let tt = 0; tt < 8; tt++) {
        const angle = (tt / 8) * Math.PI * 2;
        const tPts  = [];
        for (let s = 0; s <= 12; s++) {
          tPts.push(new THREE.Vector3(
            Math.cos(angle) * (0.3 + Math.sin(s * 0.5) * 0.08),
            -s * 0.12,
            Math.sin(angle) * (0.3 + Math.sin(s * 0.5) * 0.08)
          ));
        }
        const tCurve = new THREE.CatmullRomCurve3(tPts);
        const tGeo   = new THREE.TubeGeometry(tCurve, 14, 0.012, 4, false);
        jGroup.add(new THREE.Mesh(tGeo, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.25 })));
      }
      jGroup.userData = { phase: Math.random() * Math.PI * 2, speed: 0.006 + Math.random() * 0.006, baseY: jGroup.position.y };
      bioGroup.add(jGroup);
      jellies.push(jGroup);
    }

    // ─────────────────────────────────────────
    // 5. BUBBLE STREAMS
    // ─────────────────────────────────────────
    const bubbleGroup = new THREE.Group();
    scene.add(bubbleGroup);
    const bubbles = [];
    for (let b = 0; b < 80; b++) {
      const r   = 0.04 + Math.random() * 0.1;
      const bub = Sp(r, 0x06b6d4, 0.08 + Math.random() * 0.1); // Dimmed
      const cx  = (Math.random() - 0.5) * 14;
      bub.position.set(cx + (Math.random() - 0.5) * 0.5, -4 + Math.random() * 6, (Math.random() - 0.5) * 10);
      bub.userData = { cx, speed: 0.012 + Math.random() * 0.02, sway: Math.random() * 0.4, phase: Math.random() * Math.PI * 2 };
      // bubble ring outline
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.006, 6, 20),
        new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.3 })
      );
      ring.position.copy(bub.position);
      ring.userData = bub.userData;
      bubbleGroup.add(bub);
      bubbleGroup.add(ring);
      bubbles.push({ bub, ring });
    }

    // ─────────────────────────────────────────
    // 6. HOLOGRAPHIC STATUS PANELS (floating)
    // ─────────────────────────────────────────
    const panelGroup = new THREE.Group();
    scene.add(panelGroup);

    const mkPanel = (lines, px, py, pz, accent) => {
      const c = document.createElement("canvas");
      c.width = 340; c.height = 220;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "rgba(1,12,22,0.85)";
      ctx.roundRect(0, 0, 340, 220, 8);
      ctx.fill();
      const ac = accent === 0x06b6d4 ? "6,182,212" : accent === 0x7c3aed ? "124,58,237" : "52,211,153";
      ctx.strokeStyle = `rgba(${ac},0.4)`;
      ctx.lineWidth = 1.5;
      ctx.roundRect(0, 0, 340, 220, 8);
      ctx.stroke();
      ctx.fillStyle = `rgba(${ac},0.08)`;
      ctx.fillRect(0, 0, 340, 28);
      lines.forEach(({ t, c: lc, y }) => {
        ctx.font = "13px 'Courier New'";
        ctx.fillStyle = lc;
        ctx.fillText(t, 10, y);
      });
      const tex = new THREE.CanvasTexture(c);
      const s   = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.6 })); // More transparent
      s.scale.set(3.0, 1.95, 1);
      s.position.set(px, py, pz);
      s.userData = { baseY: py, phase: Math.random() * Math.PI * 2 };
      panelGroup.add(s);
      // decorative rings
      [1.1, 1.5].forEach((r, i) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(r, 0.012, 6, 50),
          new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.2 - i * 0.08 }) // Dimmed
        );
        ring.position.set(px, py, pz);
        ring.rotation.x = Math.PI / 2.3;
        ring.userData = { speed: (0.005 + i * 0.003) * (i % 2 === 0 ? 1 : -1) };
        panelGroup.add(ring);
      });
      return s;
    };

    mkPanel([
      { t: "⬡  NETWORK TOPOLOGY",     c: "#06b6d4", y: 20 },
      { t: "Nodes online:   18/18",   c: "#4ade80", y: 50 },
      { t: "Bandwidth:  9.2 Gbit/s",  c: "#06b6d4", y: 72 },
      { t: "Packet loss:    0.001%",  c: "#4ade80", y: 94 },
      { t: "Temp avg:    18.4 °C",    c: "#4ade80", y: 116 },
      { t: "─────────────────────",   c: "#0a2a3a", y: 134 },
      { t: "RACK-01  ████████ 82°",   c: "#06b6d4", y: 156 },
      { t: "RACK-02  ██████░░ 61°",   c: "#06b6d4", y: 176 },
      { t: "RACK-03  ███░░░░░ 34°",   c: "#4ade80", y: 196 },
      { t: "RACK-04  ████░░░░ 47°",   c: "#facc15", y: 216 },
    ], -5.5, 1.0, -1.5, 0x06b6d4);

    mkPanel([
      { t: "⬡  INCIDENT LOG",          c: "#7c3aed", y: 20 },
      { t: "● RESOLVED  cable-7B",     c: "#4ade80", y: 50 },
      { t: "  Fixed by diver 02:41",   c: "#475569", y: 66 },
      { t: "● ACTIVE    high-CPU",     c: "#f87171", y: 90 },
      { t: "  rack-03 node 9",         c: "#475569", y: 106 },
      { t: "● RESOLVED  db-conn",      c: "#4ade80", y: 130 },
      { t: "  Reconnected 01:18",      c: "#475569", y: 146 },
      { t: "● PENDING   cert-exp",     c: "#facc15", y: 170 },
      { t: "  SSL renew in 3 days",    c: "#475569", y: 186 },
      { t: "  run: certbot renew",     c: "#7c3aed", y: 206 },
    ], 5.5, 0.8, -1.5, 0x7c3aed);

    // ─────────────────────────────────────────
    // 7. CORAL + SEAWEED (atmospheric)
    // ─────────────────────────────────────────
    const floraGroup = new THREE.Group();
    floraGroup.position.y = -4.5;
    scene.add(floraGroup);

    // seaweed stalks
    for (let sw = 0; sw < 30; sw++) {
      const pts = [];
      const bx  = (Math.random() - 0.5) * 24, bz = (Math.random() - 0.5) * 12;
      const h   = 0.6 + Math.random() * 2.2;
      for (let s = 0; s <= 10; s++) {
        pts.push(new THREE.Vector3(
          bx + Math.sin(s * 0.7) * 0.15,
          (s / 10) * h,
          bz + Math.cos(s * 0.7) * 0.1
        ));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo   = new THREE.TubeGeometry(curve, 12, 0.025, 4, false);
      const hue   = 0.38 + Math.random() * 0.15;
      floraGroup.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 0.6, 0.25), // Dim hue
        transparent: true, opacity: 0.5 // Dim opacity
      })));
    }

    // coral clusters
    for (let co = 0; co < 20; co++) {
      const cx = (Math.random() - 0.5) * 22, cz = (Math.random() - 0.5) * 10;
      const branches = 3 + Math.floor(Math.random() * 4);
      for (let br = 0; br < branches; br++) {
        const ang  = (br / branches) * Math.PI * 2;
        const cBr  = Cy(0.03, 0.07, 0.3 + Math.random() * 0.5, new THREE.Color().setHSL(0.95 + Math.random() * 0.1, 0.6, 0.3).getHex(), 6);
        cBr.position.set(cx + Math.cos(ang) * 0.15, 0.2, cz + Math.sin(ang) * 0.15);
        cBr.rotation.z = Math.cos(ang) * 0.4;
        cBr.rotation.x = Math.sin(ang) * 0.3;
        floraGroup.add(cBr);
      }
    }

    // ─────────────────────────────────────────
    // ANIMATE
    // ─────────────────────────────────────────
    let frame = 0, animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const t = frame * 0.005; // Slightly slower for better reading

      // Orbit
      if (!drag.on) orb.tTh += 0.0008; // Slower orbit to avoid distraction
      orb.th += (orb.tTh - orb.th) * 0.055;
      orb.ph += (orb.tPh - orb.ph) * 0.055;
      orb.r  += (orb.tR  - orb.r)  * 0.055;
      const sp = Math.sin(orb.ph), cp = Math.cos(orb.ph);
      camera.position.set(orb.r * sp * Math.sin(orb.th), orb.r * cp, orb.r * sp * Math.cos(orb.th));
      camera.lookAt(0, -1, 0);

      // Sea floor caustics shimmer
      const sfp = seaFloor.geometry.attributes.position;
      for (let i = 0; i < sfp.count; i++) {
        const ox = sfOrig[i * 3], oz = sfOrig[i * 3 + 2];
        sfp.array[i * 3 + 1] = sfOrig[i * 3 + 1] + Math.sin(ox * 1.4 + t) * Math.cos(oz * 1.2 + t * 0.8) * 0.12;
      }
      sfp.needsUpdate = true;

      // Server rack LEDs blink
      serverRoom.children.forEach(child => {
        if (child.userData && child.userData.blink) {
          child.material.opacity = Math.abs(Math.sin(t * 3 + child.userData.phase)) > 0.6 ? 0.7 : 0.15; // Dimmed max brightness
        }
      });

      // Diver gently sways (underwater drift)
      diverGroup.rotation.z = Math.sin(t * 0.4) * 0.04;
      diverGroup.rotation.y = Math.sin(t * 0.25) * 0.06;
      diverGroup.position.y = -1.8 + Math.sin(t * 0.5) * 0.12;
      // left arm reaches toward server (slight animation)
      lGlove.position.z = -0.59 + Math.sin(t * 1.2) * 0.04;
      // visor glow pulse
      faceGlow.material.opacity = 0.08 + Math.sin(t * 1.8) * 0.06;
      hLight.material.opacity   = 0.4 + Math.sin(t * 2.5 + 1) * 0.15;

      // Biolumin particles drift
      const bp = bioParticles.geometry.attributes.position;
      for (let i = 0; i < BIO_COUNT; i++) {
        bp.array[i * 3]     += bioVel[i * 3];
        bp.array[i * 3 + 1] += bioVel[i * 3 + 1];
        bp.array[i * 3 + 2] += bioVel[i * 3 + 2];
        if (bp.array[i * 3] > 14)  bp.array[i * 3] = -14;
        if (bp.array[i * 3] < -14) bp.array[i * 3] =  14;
        if (bp.array[i * 3 + 1] >  8) bp.array[i * 3 + 1] = -8;
        if (bp.array[i * 3 + 1] < -8) bp.array[i * 3 + 1] =  8;
      }
      bp.needsUpdate = true;

      // Jellyfish pulse + float
      jellies.forEach(jel => {
        jel.position.y = jel.userData.baseY + Math.sin(t * jel.userData.speed * 8 + jel.userData.phase) * 0.4;
        jel.rotation.y += 0.008;
        jel.children[0].material.opacity = 0.12 + Math.sin(t * 2 + jel.userData.phase) * 0.08;
      });

      // Bubbles rise + sway
      bubbles.forEach(({ bub, ring }) => {
        bub.position.y  += bub.userData.speed;
        bub.position.x   = bub.userData.cx + Math.sin(t * 1.5 + bub.userData.phase) * bub.userData.sway;
        ring.position.copy(bub.position);
        if (bub.position.y > 6) bub.position.y = -4.5;
      });

      // Holo panels float + rings spin
      panelGroup.children.forEach(child => {
        if (child.userData.speed) child.rotation.z += child.userData.speed;
        if (child.userData.baseY !== undefined) {
          child.position.y = child.userData.baseY + Math.sin(t * 0.6 + child.userData.phase) * 0.18;
        }
      });

      // Seaweed sway
      floraGroup.children.forEach((child, idx) => {
        child.rotation.z = Math.sin(t * 0.9 + idx * 0.4) * 0.12;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      ["mousedown","mouseup","mousemove"].forEach((ev, i) => mount.removeEventListener(ev, [dDn, dUp, dMv][i]));
      mount.removeEventListener("touchstart", dDn);
      mount.removeEventListener("touchend",   dUp);
      mount.removeEventListener("touchmove",  dMv);
      mount.removeEventListener("wheel",      dWh);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        style={{
          width: "100%", height: "100%",
          position: "absolute", top: 0, left: 0,
          display: "block",
          overflow: "hidden", background: "#010a12",
          cursor: "grab", touchAction: "none", userSelect: "none",
        }}
      />
      {/* Dark overlay to ensure main foreground text readability over the bright parts of the 3D scene */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(1, 10, 18, 0.55)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />
    </>
  );
}
