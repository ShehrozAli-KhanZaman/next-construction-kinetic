#!/usr/bin/env node
/**
 * Prepares the standalone build for deployment.
 * Run after: npm run build
 * Creates: deploy/ (standalone + static + public)
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const deployDir = path.join(root, "deploy");

const standaloneDir = path.join(root, ".next", "standalone");
const staticDir = path.join(root, ".next", "static");
const publicDir = path.join(root, "public");

if (!fs.existsSync(standaloneDir)) {
  console.error("Missing .next/standalone. Run 'npm run build' first.");
  process.exit(1);
}

// Clean and create deploy folder
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// Copy standalone (server.js, .next, node_modules)
console.log("Copying standalone...");
fs.cpSync(standaloneDir, deployDir, { recursive: true });

// Copy .next/static into deploy/.next/static
const deployNextStatic = path.join(deployDir, ".next", "static");
fs.mkdirSync(path.join(deployDir, ".next"), { recursive: true });
console.log("Copying .next/static...");
fs.cpSync(staticDir, deployNextStatic, { recursive: true });

// Copy public into deploy/public
console.log("Copying public...");
fs.cpSync(publicDir, path.join(deployDir, "public"), { recursive: true });

console.log("\nDone. Deployment folder: deploy/");
console.log("Upload the contents of 'deploy' to your server, then run: node server.js");
