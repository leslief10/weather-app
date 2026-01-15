import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ListItem from '@/components/ui/List/ListItem.vue';

describe('ListItem.vue', () => {
  describe('Rendering', () => {
    it('renders li element', () => {
      const wrapper = mount(ListItem);
      expect(wrapper.element.tagName).toBe('LI');
    });

    it('renders slot content', () => {
      const wrapper = mount(ListItem, {
        slots: {
          default: 'List item content',
        },
      });
      expect(wrapper.text()).toBe('List item content');
    });

    it('renders with default size', () => {
      const wrapper = mount(ListItem);
      expect(wrapper.classes()).toContain('list-item--md');
    });

    it('does not render leading slot when not provided', () => {
      const wrapper = mount(ListItem);
      expect(wrapper.find('.list-item__leading').exists()).toBe(false);
    });

    it('does not render trailing slot when not provided', () => {
      const wrapper = mount(ListItem);
      expect(wrapper.find('.list-item__trailing').exists()).toBe(false);
    });
  });

  describe('Props', () => {
    it('applies size class based on prop', () => {
      const wrapper = mount(ListItem, {
        props: {
          size: 'sm',
        },
      });
      expect(wrapper.classes()).toContain('list-item--sm');
      expect(wrapper.classes()).not.toContain('list-item--md');
    });

    it('applies large size class', () => {
      const wrapper = mount(ListItem, {
        props: {
          size: 'lg',
        },
      });
      expect(wrapper.classes()).toContain('list-item--lg');
    });

    it('applies interactive class when interactive prop is true', () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
        },
      });
      expect(wrapper.classes()).toContain('list-item--interactive');
    });

    it('applies selected class when selected prop is true', () => {
      const wrapper = mount(ListItem, {
        props: {
          selected: true,
        },
      });
      expect(wrapper.classes()).toContain('list-item--selected');
    });

    it('applies disabled class when disabled prop is true', () => {
      const wrapper = mount(ListItem, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.classes()).toContain('list-item--disabled');
    });

    it('applies custom className', () => {
      const wrapper = mount(ListItem, {
        props: {
          className: 'custom-class',
        },
      });
      expect(wrapper.classes()).toContain('custom-class');
    });

    it('applies id attribute', () => {
      const wrapper = mount(ListItem, {
        props: {
          id: 'test-id',
        },
      });
      expect(wrapper.attributes('id')).toBe('test-id');
    });

    it('applies data-testid attribute', () => {
      const wrapper = mount(ListItem, {
        props: {
          dataTestid: 'test-item',
        },
      });
      expect(wrapper.attributes('data-testid')).toBe('test-item');
    });
  });

  describe('Slots', () => {
    it('renders leading slot content', () => {
      const wrapper = mount(ListItem, {
        slots: {
          leading: '<span>Leading</span>',
        },
      });
      const leading = wrapper.find('.list-item__leading');
      expect(leading.exists()).toBe(true);
      expect(leading.html()).toContain('Leading');
    });

    it('renders trailing slot content', () => {
      const wrapper = mount(ListItem, {
        slots: {
          trailing: '<span>Trailing</span>',
        },
      });
      const trailing = wrapper.find('.list-item__trailing');
      expect(trailing.exists()).toBe(true);
      expect(trailing.html()).toContain('Trailing');
    });

    it('renders all slots together', () => {
      const wrapper = mount(ListItem, {
        slots: {
          leading: '<span>Start</span>',
          default: 'Main content',
          trailing: '<span>End</span>',
        },
      });
      expect(wrapper.find('.list-item__leading').exists()).toBe(true);
      expect(wrapper.find('.list-item__content').text()).toBe('Main content');
      expect(wrapper.find('.list-item__trailing').exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('applies aria-label attribute', () => {
      const wrapper = mount(ListItem, {
        props: {
          ariaLabel: 'Test label',
        },
      });
      expect(wrapper.attributes('aria-label')).toBe('Test label');
    });

    it('applies aria-selected when selected', () => {
      const wrapper = mount(ListItem, {
        props: {
          selected: true,
        },
      });
      expect(wrapper.attributes('aria-selected')).toBe('true');
    });

    it('applies aria-disabled when disabled', () => {
      const wrapper = mount(ListItem, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.attributes('aria-disabled')).toBe('true');
    });

    it('sets tabindex to 0 when interactive and not disabled', () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
          disabled: false,
        },
      });
      expect(wrapper.attributes('tabindex')).toBe('0');
    });

    it('does not set tabindex when not interactive', () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: false,
        },
      });
      expect(wrapper.attributes('tabindex')).toBeUndefined();
    });

    it('does not set tabindex when disabled', () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
          disabled: true,
        },
      });
      expect(wrapper.attributes('tabindex')).toBeUndefined();
    });

    it('sets role to button when interactive', () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
        },
      });
      expect(wrapper.attributes('role')).toBe('button');
    });

    it('does not set role when not interactive', () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: false,
        },
      });
      expect(wrapper.attributes('role')).toBeUndefined();
    });
  });

  describe('Events', () => {
    it('emits click event when clicked and interactive', async () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('does not emit click event when not interactive', async () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: false,
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeUndefined();
    });

    it('does not emit click event when disabled', async () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
          disabled: true,
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeUndefined();
    });

    it('emits click event on Enter key press when interactive', async () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
        },
      });
      await wrapper.trigger('keydown.enter');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('emits click event on Space key press when interactive', async () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
        },
      });
      await wrapper.trigger('keydown.space');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('does not emit click event on Enter when disabled', async () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
          disabled: true,
        },
      });
      await wrapper.trigger('keydown.enter');
      expect(wrapper.emitted('click')).toBeUndefined();
    });

    it('does not emit click event on Space when disabled', async () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: true,
          disabled: true,
        },
      });
      await wrapper.trigger('keydown.space');
      expect(wrapper.emitted('click')).toBeUndefined();
    });

    it('does not emit click event on Enter when not interactive', async () => {
      const wrapper = mount(ListItem, {
        props: {
          interactive: false,
        },
      });
      await wrapper.trigger('keydown.enter');
      expect(wrapper.emitted('click')).toBeUndefined();
    });
  });
});
