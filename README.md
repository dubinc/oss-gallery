<a href="https://oss.gallery">
  <img alt="OSS Gallery" src="https://raw.githubusercontent.com/dubinc/oss-gallery/main/public/thumbnail.jpg" />
</a>

<h3 align="center">OSS Gallery</h3>

<p align="center">
    A crowdsourced list of the best open-source projects on the internet.
    <br />
    <a href="https://dub.co/blog/product-discovery-platform"><strong>Learn how it's built »</strong></a>
    <br />
    <br />
    <a href="#introduction"><strong>Introduction</strong></a> ·
    <a href="#tech-stack"><strong>Tech Stack</strong></a>
</p>

<p align="center">
  <a href="https://twitter.com/dubdotco">
    <img src="https://img.shields.io/twitter/follow/dubdotco?style=flat&label=%40dubdotco&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a>
  <a href="https://news.ycombinator.com/item?id=40146998"><img src="https://img.shields.io/badge/Hacker%20News-125-%23FF6600" alt="Hacker News"></a>
</p>

<br/>

## Introduction

[OSS Gallery](https://oss.gallery) is a crowdsourced list of the best open-source projects on the internet.

It uses the [Dub.co API](https://dub.co/docs/api-reference/introduction) to create short links for each project page + display real-time click analytics for them.

<img width="1062" alt="CleanShot 2024-04-24 at 20 15 09@2x" src="https://github.com/dubinc/oss-gallery/assets/28986134/7d2ff6e6-cdb2-4818-88f9-ce3e6518c09d">

## Tech Stack

- Next.js Server Actions + Form Actions (zero API routes)
- Dub [TypeScript SDK](https://github.com/dubinc/dub-node)
- Tremor for charts
- Vercel Postgres + deployment
