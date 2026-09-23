import { describe, it, expect } from 'vitest';
import {
  VINERIA_PRODUCTS,
  VINERIA_SERVICES,
  PERMACULTURE_WORKSHOPS,
  VALUE_PILLARS,
} from './vineria-data';

describe('Vineria Data Integrity', () => {
  it('contains all 5 permaculture workshops', () => {
    expect(PERMACULTURE_WORKSHOPS).toHaveLength(5);
    const ids = PERMACULTURE_WORKSHOPS.map((w) => w.id);
    expect(ids).toContain('amandiers');
    expect(ids).toContain('oliviers');
    expect(ids).toContain('romarin');
    expect(ids).toContain('ruches');
    expect(ids).toContain('sol-compost');
  });

  it('contains the 5 core value pillars', () => {
    expect(VALUE_PILLARS).toHaveLength(5);
    const ids = VALUE_PILLARS.map((p) => p.id);
    expect(ids).toContain('permaculture');
    expect(ids).toContain('femmes-rurales');
    expect(ids).toContain('jeunes');
    expect(ids).toContain('transmission');
    expect(ids).toContain('tracabilite');
  });

  it('validates products format and slugs', () => {
    expect(VINERIA_PRODUCTS.length).toBeGreaterThan(0);
    for (const product of VINERIA_PRODUCTS) {
      expect(product.slug).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.category).toBeTruthy();
    }
  });

  it('validates academy and technical services', () => {
    expect(VINERIA_SERVICES.length).toBeGreaterThan(0);
    for (const service of VINERIA_SERVICES) {
      expect(service.slug).toBeTruthy();
      expect(service.name).toBeTruthy();
      expect(service.priceFrom).toBeGreaterThanOrEqual(0);
      expect(service.duration).toBeTruthy();
    }
  });
});
