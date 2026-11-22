import{r as l,g as a,j as o}from"./index-CbxnRcdS.js";import{B as r,p as i,c}from"./posts-DTyAzV64.js";const d=`---
title: "Test"
date: 2026-11-22
pinned: false
---

# this is a test devlog

## hello

Hi, I'm *Vlad*. This is a **test**.
`,n=Object.entries(Object.assign({"../posts/2026-11-22-test.md":d})).map(([t,s])=>{const e=i(s);return e&&{...e,slug:t.slice(t.lastIndexOf("/")+1,-3)}}).filter(Boolean).sort(c);function m(){return l.useEffect(()=>{document.querySelectorAll(".blog-post").forEach((s,e)=>{a.from(s,{scrollTrigger:{trigger:s,start:"top 90%"},opacity:0,y:50,delay:e*.2,duration:1})})},[]),o.jsxs("section",{className:"container",children:[o.jsx("h2",{className:"section-title",children:"Devlog"}),n.length===0&&o.jsx("p",{children:"No posts yet. Check back soon."}),n.map(t=>o.jsx(r,{title:t.title,date:t.date,pinned:t.pinned,body:t.body},t.slug))]})}export{m as default};
