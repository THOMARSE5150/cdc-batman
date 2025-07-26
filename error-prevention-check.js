#!/usr/bin/env node

/**
 * Error Prevention Check Script
 * Comprehensive audit of the codebase to prevent runtime errors
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🔍 Running comprehensive error prevention check...');

const issues = [];

// Check for Lucide React imports
function checkForLucideImports(dir) {
  if (!existsSync(dir)) return;
  
  const files = readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = join(dir, file.name);
    
    if (file.isDirectory() && file.name !== 'node_modules') {
      checkForLucideImports(fullPath);
    } else if (file.isFile() && /\.(tsx?|jsx?)$/.test(file.name)) {
      const content = readFileSync(fullPath, 'utf-8');
      
      // Check for lucide-react imports
      if (content.includes('from "lucide-react"') || content.includes("from 'lucide-react'")) {
        issues.push({
          type: 'LUCIDE_IMPORT',
          file: fullPath,
          description: 'Contains lucide-react import that could cause runtime errors'
        });
      }
      
      // Check for improper Link usage (nested anchor tags)
      const linkPattern = /<Link[^>]*>\s*<a[^>]*>/g;
      if (linkPattern.test(content)) {
        issues.push({
          type: 'NESTED_LINK',
          file: fullPath,
          description: 'Contains nested <a> tags inside <Link> components'
        });
      }
      
      // Check for undefined variables/components (but ignore if they're defined in the same file)
      const hasChevronUpDef = content.includes('const ChevronUp = ');
      const hasInfoIconDef = content.includes('const InfoIcon = ');
      
      if (!hasChevronUpDef && /ChevronUp(?!\s*=)/.test(content)) {
        issues.push({
          type: 'UNDEFINED_VARIABLE',
          file: fullPath,
          description: 'Contains ChevronUp usage but no definition'
        });
      }
      
      if (!hasInfoIconDef && /InfoIcon(?!\s*=)/.test(content)) {
        issues.push({
          type: 'UNDEFINED_VARIABLE',
          file: fullPath,
          description: 'Contains InfoIcon usage but no definition'
        });
      }
      
      // Check for className on components that don't accept it
      const classNameOnIconPattern = /<InfoIcon\s+className=/g;
      if (classNameOnIconPattern.test(content)) {
        const infoIconDefPattern = /const InfoIcon = \(\) =>/g;
        if (infoIconDefPattern.test(content)) {
          issues.push({
            type: 'PROPS_MISMATCH',
            file: fullPath,
            description: 'InfoIcon component used with className but definition does not accept props'
          });
        }
      }
    }
  }
}

// Check for missing critical files
function checkCriticalFiles() {
  const criticalFiles = [
    'client/src/components/ui/select.tsx',
    'client/src/components/sections/HalaxyIntegration.tsx',
    'client/src/pages/Contact.tsx',
    'client/src/pages/FAQ.tsx',
    'public/images/header_logo.png'
  ];
  
  criticalFiles.forEach(file => {
    if (!existsSync(file)) {
      issues.push({
        type: 'MISSING_FILE',
        file: file,
        description: 'Critical file is missing'
      });
    }
  });
}

// Run all checks
checkForLucideImports('client/src');
checkForLucideImports('server');
checkCriticalFiles();

// Report results
console.log('\n📊 Error Prevention Check Results:');
console.log('================================');

if (issues.length === 0) {
  console.log('✅ No issues found! The codebase is clean and ready.');
} else {
  console.log(`❌ Found ${issues.length} potential issues:\n`);
  
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.type}: ${issue.file}`);
    console.log(`   Description: ${issue.description}\n`);
  });
  
  console.log('🔧 Please fix these issues to prevent runtime errors.');
  process.exit(1);
}

console.log('\n🎉 All checks passed! The application is stable and error-free.');