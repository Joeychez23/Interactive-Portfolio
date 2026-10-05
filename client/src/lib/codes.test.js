import { describe, expect, it } from 'vitest';
import { pad2, projectsUsing } from './codes';

describe('pad2', () => {
  it('pads numbers to two digits', () => {
    expect(pad2(3)).toBe('03');
    expect(pad2(12)).toBe('12');
  });
});

describe('projectsUsing', () => {
  const list = [
    { slug: 'a', tech: ['EC2', 'Terraform'] },
    { slug: 'b', tech: ['Spring Core', 'SQL'] },
    { slug: 'c', tech: ['JavaScript'] },
  ];

  it('matches a tool to project stacks loosely', () => {
    expect(projectsUsing('EC2 (Linux)', list).map((p) => p.slug)).toEqual(['a']);
    expect(projectsUsing('Spring', list).map((p) => p.slug)).toEqual(['b']);
    expect(projectsUsing('Java', list)).toEqual([]);
  });
});
