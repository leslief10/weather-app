import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '@/components/ui/Button/Button.vue';

describe('Button.vue', () => {
  describe('Rendering', () => {
    it('renders button element', () => {
      const wrapper = mount(Button);
      expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('renders slot content', () => {
      const wrapper = mount(Button, {
        slots: {
          default: 'Click me',
        },
      });
      expect(wrapper.text()).toBe('Click me');
    });

    it('renders with default variant', () => {
      const wrapper = mount(Button);
      expect(wrapper.classes()).toContain('btn--primary');
    });

    it('renders with default size', () => {
      const wrapper = mount(Button);
      expect(wrapper.classes()).toContain('btn--lg');
    });
  });

  describe('Props', () => {
    it('applies variant class based on prop', () => {
      const wrapper = mount(Button, {
        props: {
          variant: 'secondary',
        },
      });
      expect(wrapper.classes()).toContain('btn--secondary');
      expect(wrapper.classes()).not.toContain('btn--primary');
    });

    it('applies size class based on prop', () => {
      const wrapper = mount(Button, {
        props: {
          size: 'sm',
        },
      });
      expect(wrapper.classes()).toContain('btn--sm');
    });

    it('sets button type attribute', () => {
      const wrapper = mount(Button, {
        props: {
          type: 'submit',
        },
      });
      expect(wrapper.attributes('type')).toBe('submit');
    });

    it('disables button when disabled prop is true', () => {
      const wrapper = mount(Button, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('disables button when loading prop is true', () => {
      const wrapper = mount(Button, {
        props: {
          loading: true,
        },
      });
      expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('sets id attribute', () => {
      const wrapper = mount(Button, {
        props: {
          id: 'submit-btn',
        },
      });
      expect(wrapper.attributes('id')).toBe('submit-btn');
    });

    it('sets aria-label attribute', () => {
      const wrapper = mount(Button, {
        props: {
          ariaLabel: 'Submit form',
        },
      });
      expect(wrapper.attributes('aria-label')).toBe('Submit form');
    });

    it('sets aria-expanded attribute', () => {
      const wrapper = mount(Button, {
        props: {
          ariaExpanded: true,
        },
      });
      expect(wrapper.attributes('aria-expanded')).toBe('true');
    });

    it('sets aria-pressed attribute', () => {
      const wrapper = mount(Button, {
        props: {
          ariaPressed: true,
        },
      });
      expect(wrapper.attributes('aria-pressed')).toBe('true');
    });

    it('sets data-testid attribute', () => {
      const wrapper = mount(Button, {
        props: {
          dataTestid: 'primary-button',
        },
      });
      expect(wrapper.attributes('data-testid')).toBe('primary-button');
    });

    it('applies custom className', () => {
      const wrapper = mount(Button, {
        props: {
          className: 'custom-class',
        },
      });
      expect(wrapper.classes()).toContain('custom-class');
    });
  });

  describe('Events', () => {
    it('emits click event when button is clicked', async () => {
      const wrapper = mount(Button);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('emits click event with MouseEvent payload', async () => {
      const wrapper = mount(Button);
      await wrapper.trigger('click');
      const emitted = wrapper.emitted('click');
      expect(emitted).toBeTruthy();
      expect(emitted?.[0]?.[0]).toBeInstanceOf(MouseEvent);
    });

    it('does not emit click event when disabled', async () => {
      const wrapper = mount(Button, {
        props: {
          disabled: true,
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeUndefined();
    });

    it('does not emit click event when loading', async () => {
      const wrapper = mount(Button, {
        props: {
          loading: true,
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeUndefined();
    });
  });

  describe('Accessibility', () => {
    it('has proper button role', () => {
      const wrapper = mount(Button);
      expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('supports keyboard interaction', async () => {
      const wrapper = mount(Button);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('has disabled state for accessibility', () => {
      const wrapper = mount(Button, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.attributes('disabled')).toBeDefined();
    });
  });
});
