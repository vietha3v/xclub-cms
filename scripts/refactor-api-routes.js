#!/usr/bin/env node

/**
 * Script để tự động refactor các API routes sử dụng helper functions
 * Chạy: node scripts/refactor-api-routes.js
 */

const fs = require('fs');
const path = require('path');

// Danh sách các API routes cần refactor
const routesToRefactor = [
  {
    path: 'app/api/races/route.ts',
    type: 'crud',
    endpoint: '/api/races',
    errorMessages: {
      get: 'Lấy danh sách giải chạy thất bại',
      post: 'Tạo giải chạy thất bại'
    }
  },
  {
    path: 'app/api/races/[id]/route.ts',
    type: 'resource',
    endpoint: '/api/races',
    errorMessages: {
      get: 'Lấy thông tin giải chạy thất bại',
      put: 'Cập nhật giải chạy thất bại',
      delete: 'Xóa giải chạy thất bại'
    }
  },
  {
    path: 'app/api/events/route.ts',
    type: 'crud',
    endpoint: '/api/events',
    errorMessages: {
      get: 'Lấy danh sách sự kiện thất bại',
      post: 'Tạo sự kiện thất bại'
    }
  },
  {
    path: 'app/api/events/[id]/route.ts',
    type: 'resource',
    endpoint: '/api/events',
    errorMessages: {
      get: 'Lấy thông tin sự kiện thất bại',
      put: 'Cập nhật sự kiện thất bại',
      delete: 'Xóa sự kiện thất bại'
    }
  },
  {
    path: 'app/api/challenges/route.ts',
    type: 'crud',
    endpoint: '/api/challenges',
    errorMessages: {
      get: 'Lấy danh sách thử thách thất bại',
      post: 'Tạo thử thách thất bại'
    }
  },
  {
    path: 'app/api/challenges/[id]/route.ts',
    type: 'resource',
    endpoint: '/api/challenges',
    errorMessages: {
      get: 'Lấy thông tin thử thách thất bại',
      put: 'Cập nhật thử thách thất bại',
      delete: 'Xóa thử thách thất bại'
    }
  },
  {
    path: 'app/api/achievements/route.ts',
    type: 'crud',
    endpoint: '/api/achievements',
    errorMessages: {
      get: 'Lấy danh sách thành tích thất bại',
      post: 'Tạo thành tích thất bại'
    }
  },
  {
    path: 'app/api/achievements/[id]/route.ts',
    type: 'resource',
    endpoint: '/api/achievements',
    errorMessages: {
      get: 'Lấy thông tin thành tích thất bại',
      put: 'Cập nhật thành tích thất bại',
      delete: 'Xóa thành tích thất bại'
    }
  }
];

function generateCrudRoute(endpoint, errorMessages) {
  const errorMessagesStr = Object.entries(errorMessages)
    .map(([key, value]) => `  ${key}: '${value}'`)
    .join(',\n');

  return `import { createCrudRoute } from '@/lib/api-helpers';

const { GET, POST } = createCrudRoute('${endpoint}', {
${errorMessagesStr}
});

export { GET, POST };`;
}

function generateResourceRoute(endpoint, errorMessages) {
  const errorMessagesStr = Object.entries(errorMessages)
    .map(([key, value]) => `  ${key}: '${value}'`)
    .join(',\n');

  return `import { createResourceRoute } from '@/lib/api-helpers';

const { GET, PUT, DELETE } = createResourceRoute('${endpoint}', {
${errorMessagesStr}
});

export { GET, PUT, DELETE };`;
}

function refactorRoute(route) {
  const fullPath = path.join(process.cwd(), route.path);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${route.path}`);
    return;
  }

  let newContent;
  if (route.type === 'crud') {
    newContent = generateCrudRoute(route.endpoint, route.errorMessages);
  } else if (route.type === 'resource') {
    newContent = generateResourceRoute(route.endpoint, route.errorMessages);
  }

  // Backup original file
  const backupPath = fullPath + '.backup';
  fs.copyFileSync(fullPath, backupPath);
  console.log(`📁 Backup created: ${backupPath}`);

  // Write new content
  fs.writeFileSync(fullPath, newContent);
  console.log(`✅ Refactored: ${route.path}`);
}

function main() {
  console.log('🚀 Starting API routes refactoring...\n');

  routesToRefactor.forEach(route => {
    refactorRoute(route);
  });

  console.log('\n✨ Refactoring completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Test the refactored routes');
  console.log('2. Remove .backup files if everything works');
  console.log('3. Commit the changes');
}

if (require.main === module) {
  main();
}

module.exports = { refactorRoute, generateCrudRoute, generateResourceRoute };
