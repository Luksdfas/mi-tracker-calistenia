import assert from 'assert';
import { execSync } from 'child_process';

describe('Supabase Configuration', () => {
  it('should return true when credentials are provided', () => {
    const code = `
      import { isSupabaseConfigured } from './src/lib/supabase.js';
      if (!isSupabaseConfigured()) {
        process.exit(1);
      }
    `;

    try {
      execSync('node --input-type=module', {
        input: code,
        env: {
          ...process.env,
          VITE_SUPABASE_URL: 'https://example.supabase.co',
          VITE_SUPABASE_ANON_KEY: 'abc-123',
          NODE_ENV: 'test'
        }
      });
    } catch (error) {
      assert.fail('isSupabaseConfigured() should have returned true');
    }
  });

  it('should return false when credentials are missing', () => {
    const code = `
      import { isSupabaseConfigured } from './src/lib/supabase.js';
      if (isSupabaseConfigured()) {
        process.exit(1);
      }
    `;

    try {
      execSync('node --input-type=module', {
        input: code,
        env: {
          ...process.env,
          VITE_SUPABASE_URL: '',
          VITE_SUPABASE_ANON_KEY: '',
          NODE_ENV: 'test'
        }
      });
    } catch (error) {
      assert.fail('isSupabaseConfigured() should have returned false');
    }
  });
});
