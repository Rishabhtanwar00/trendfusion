import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubGlobal('import.meta', {
	env: {
		VITE_BACKEND_URL: 'http://localhost:7000',
	},
});
