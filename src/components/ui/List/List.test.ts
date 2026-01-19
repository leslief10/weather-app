import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import List from '@/components/ui/List/List.vue';

describe('List.vue', () => {
  describe('Rendering', () => {
    it('renders ul element by default', () => {
      const wrapper = mount(List);
      expect(wrapper.element.tagName).toBe('UL');
    });

    it('renders ul element with unstyled variant', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'unstyled',
        },
      });
      expect(wrapper.element.tagName).toBe('UL');
    });

    it('renders ul element with unordered variant', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'unordered',
        },
      });
      expect(wrapper.element.tagName).toBe('UL');
    });

    it('renders ol element with ordered variant', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'ordered',
        },
      });
      expect(wrapper.element.tagName).toBe('OL');
    });

    it('renders dl element with description variant', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'description',
        },
      });
      expect(wrapper.element.tagName).toBe('DL');
    });

    it('renders with default size', () => {
      const wrapper = mount(List);
      expect(wrapper.classes()).toContain('list--md');
    });

    it('renders with default orientation', () => {
      const wrapper = mount(List);
      expect(wrapper.classes()).toContain('list--vertical');
    });
  });

  describe('Variant Props', () => {
    it('applies unstyled variant class', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'unstyled',
        },
      });
      expect(wrapper.classes()).toContain('list--unstyled');
    });

    it('applies unordered variant class', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'unordered',
        },
      });
      expect(wrapper.classes()).toContain('list--unordered');
    });

    it('applies ordered variant class', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'ordered',
        },
      });
      expect(wrapper.classes()).toContain('list--ordered');
    });

    it('applies description variant class', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'description',
        },
      });
      expect(wrapper.classes()).toContain('list--description');
    });
  });

  describe('Size Props', () => {
    it('applies small size class', () => {
      const wrapper = mount(List, {
        props: {
          size: 'sm',
        },
      });
      expect(wrapper.classes()).toContain('list--sm');
      expect(wrapper.classes()).not.toContain('list--md');
    });

    it('applies medium size class', () => {
      const wrapper = mount(List, {
        props: {
          size: 'md',
        },
      });
      expect(wrapper.classes()).toContain('list--md');
    });

    it('applies large size class', () => {
      const wrapper = mount(List, {
        props: {
          size: 'lg',
        },
      });
      expect(wrapper.classes()).toContain('list--lg');
    });
  });

  describe('Orientation Props', () => {
    it('applies vertical orientation class', () => {
      const wrapper = mount(List, {
        props: {
          orientation: 'vertical',
        },
      });
      expect(wrapper.classes()).toContain('list--vertical');
      expect(wrapper.classes()).not.toContain('list--horizontal');
    });

    it('applies horizontal orientation class', () => {
      const wrapper = mount(List, {
        props: {
          orientation: 'horizontal',
        },
      });
      expect(wrapper.classes()).toContain('list--horizontal');
      expect(wrapper.classes()).not.toContain('list--vertical');
    });
  });

  describe('Divided Prop', () => {
    it('does not apply divided class by default', () => {
      const wrapper = mount(List);
      expect(wrapper.classes()).not.toContain('list--divided');
    });

    it('applies divided class when divided prop is true', () => {
      const wrapper = mount(List, {
        props: {
          divided: true,
        },
      });
      expect(wrapper.classes()).toContain('list--divided');
    });

    it('does not apply divided class when divided prop is false', () => {
      const wrapper = mount(List, {
        props: {
          divided: false,
        },
      });
      expect(wrapper.classes()).not.toContain('list--divided');
    });
  });

  describe('Additional Props', () => {
    it('applies custom className', () => {
      const wrapper = mount(List, {
        props: {
          className: 'custom-list-class',
        },
      });
      expect(wrapper.classes()).toContain('custom-list-class');
    });

    it('applies id attribute', () => {
      const wrapper = mount(List, {
        props: {
          id: 'test-list-id',
        },
      });
      expect(wrapper.attributes('id')).toBe('test-list-id');
    });

    it('applies data-testid attribute', () => {
      const wrapper = mount(List, {
        props: {
          dataTestid: 'test-list',
        },
      });
      expect(wrapper.attributes('data-testid')).toBe('test-list');
    });

    it('applies aria-label attribute', () => {
      const wrapper = mount(List, {
        props: {
          ariaLabel: 'Navigation menu',
        },
      });
      expect(wrapper.attributes('aria-label')).toBe('Navigation menu');
    });
  });

  describe('Combined Props', () => {
    it('applies multiple props together correctly', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'unordered',
          size: 'lg',
          orientation: 'horizontal',
          divided: true,
          className: 'custom-class',
          id: 'my-list',
        },
      });

      expect(wrapper.element.tagName).toBe('UL');
      expect(wrapper.classes()).toContain('list--unordered');
      expect(wrapper.classes()).toContain('list--lg');
      expect(wrapper.classes()).toContain('list--horizontal');
      expect(wrapper.classes()).toContain('list--divided');
      expect(wrapper.classes()).toContain('custom-class');
      expect(wrapper.attributes('id')).toBe('my-list');
    });

    it('renders ordered list with vertical orientation', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'ordered',
          orientation: 'vertical',
          size: 'sm',
        },
      });

      expect(wrapper.element.tagName).toBe('OL');
      expect(wrapper.classes()).toContain('list--ordered');
      expect(wrapper.classes()).toContain('list--vertical');
      expect(wrapper.classes()).toContain('list--sm');
    });

    it('renders description list with custom styling', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'description',
          size: 'md',
          className: 'metadata-list',
        },
      });

      expect(wrapper.element.tagName).toBe('DL');
      expect(wrapper.classes()).toContain('list--description');
      expect(wrapper.classes()).toContain('list--md');
      expect(wrapper.classes()).toContain('metadata-list');
    });
  });

  describe('Slots', () => {
    it('renders multiple list items', () => {
      const wrapper = mount(List, {
        slots: {
          default: `
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          `,
        },
      });

      expect(wrapper.findAll('li')).toHaveLength(3);
      expect(wrapper.text()).toContain('First item');
      expect(wrapper.text()).toContain('Second item');
      expect(wrapper.text()).toContain('Third item');
    });

    it('renders description list items', () => {
      const wrapper = mount(List, {
        props: {
          variant: 'description',
        },
        slots: {
          default: `
            <dt>Term 1</dt>
            <dd>Definition 1</dd>
            <dt>Term 2</dt>
            <dd>Definition 2</dd>
          `,
        },
      });

      expect(wrapper.findAll('dt')).toHaveLength(2);
      expect(wrapper.findAll('dd')).toHaveLength(2);
      expect(wrapper.text()).toContain('Term 1');
      expect(wrapper.text()).toContain('Definition 1');
    });
  });

  describe('Base Classes', () => {
    it('always includes base list class', () => {
      const wrapper = mount(List);
      expect(wrapper.classes()).toContain('list');
    });

    it('includes base list class with all variants', () => {
      const variants: Array<
        'unstyled' | 'unordered' | 'ordered' | 'description'
      > = ['unstyled', 'unordered', 'ordered', 'description'];

      variants.forEach((variant) => {
        const wrapper = mount(List, {
          props: { variant },
        });
        expect(wrapper.classes()).toContain('list');
      });
    });
  });
});
