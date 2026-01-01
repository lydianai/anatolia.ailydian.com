#!/usr/bin/env node

/**
 * ANADOLU REALM - Production Code Cleaner
 * Removes AI/development references from codebase
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

// Patterns to remove/replace
const PATTERNS = [
  // Comment headers with "powered by"
  { pattern: /\/\*\*[\s\S]*?\*powered by Lydian[\s\S]*?\*\//g, replacement: '' },
  { pattern: /\/\/ powered by Lydian/g, replacement: '' },
  { pattern: /\* powered by Lydian/g, replacement: '' },

  // Inline text references
  { pattern: /powered by Lydian/g, replacement: String.fromCharCode(112,111,119,101,114,101,100,32,98,121,32,76,121,100,105,97,110) },

  // Generic AI-related comments
  { pattern: /\/\/ AI-generated/gi, replacement: '' },
  { pattern: /\/\* AI-generated \*\//gi, replacement: '' },
  { pattern: /Claude Code/g, replacement: 'Development Tools' },
  { pattern: /Generated with Claude/gi, replacement: '' },
  { pattern: /Anthropic/gi, replacement: 'Development Team' },

  // Clean up excessive comment blocks
  { pattern: /\/\/ ={40,}/g, replacement: '' },
  { pattern: /\/\/ -{40,}/g, replacement: '' },
];

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  PATTERNS.forEach(({ pattern, replacement }) => {
    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });

  // Clean up multiple empty lines
  content = content.replace(/\n{3,}/g, '\n\n');

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Cleaned: ${path.relative(ROOT_DIR, filePath)}`);
    return true;
  }
  return false;
}

function walkDirectory(dir, fileCallback) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(file)) {
        walkDirectory(filePath, fileCallback);
      }
    } else if (stat.isFile()) {
      // Process TypeScript/JavaScript/JSX files
      if (/\.(tsx?|jsx?|json)$/.test(file)) {
        fileCallback(filePath);
      }
    }
  });
}

console.log('🧹 Starting AI reference cleanup...\n');

let filesModified = 0;
walkDirectory(SRC_DIR, (filePath) => {
  if (cleanFile(filePath)) {
    filesModified++;
  }
});

console.log(`\n✅ Cleanup complete! ${filesModified} files modified.`);
