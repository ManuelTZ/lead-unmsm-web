import { describe, expect, it } from 'vitest';
import { events } from '@/data/events';
import { members } from '@/data/members';
import { metrics } from '@/data/metrics';
import { news } from '@/data/news';
import { partners } from '@/data/partners';
import { localContentRepository } from './repository';

interface CollectionCase {
  name: string;
  list: () => Promise<unknown[]>;
  source: readonly unknown[];
}

const collections: CollectionCase[] = [
  { name: 'eventos', list: () => localContentRepository.listEvents(), source: events },
  { name: 'miembros', list: () => localContentRepository.listMembers(), source: members },
  { name: 'noticias', list: () => localContentRepository.listNews(), source: news },
  { name: 'métricas', list: () => localContentRepository.listMetrics(), source: metrics },
  { name: 'aliados', list: () => localContentRepository.listPartners(), source: partners },
];

describe('contrato del repositorio local de contenido', () => {
  it.each(collections)('lista $name sin exponer el arreglo fuente', async ({ list, source }) => {
    const firstResult = await list();

    expect(firstResult).toEqual(source);
    expect(firstResult).not.toBe(source);

    firstResult.pop();
    await expect(list()).resolves.toEqual(source);
  });
});
