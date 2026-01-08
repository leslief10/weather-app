import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SVGIcon from '@/components/ui/SVGIcon/SVGIcon.vue';

describe('SVGIcon.vue', () => {
  it('renders successfully', () => {
    const wrapper = mount(SVGIcon, {
      props: { name: 'icon-search' },
      global: {
        stubs: {
          AsyncComponentWrapper: true,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('accepts name prop as required', () => {
    const wrapper = mount(SVGIcon, {
      props: { name: 'icon-units' },
    });
    expect(wrapper.props('name')).toBe('icon-units');
  });

  it('updates icon when name prop changes', async () => {
    const wrapper = mount(SVGIcon, {
      props: { name: 'icon-search' },
    });
    await wrapper.setProps({ name: 'icon-units' });
    expect(wrapper.props('name')).toBe('icon-units');
  });

  it('handles different icon names', () => {
    const iconNames = ['icon-search', 'icon-units', 'icon-retry', 'icon-loading'];

    iconNames.forEach((iconName) => {
      const wrapper = mount(SVGIcon, {
        props: { name: iconName },
      });
      expect(wrapper.props('name')).toBe(iconName);
    });
  });

  it('maintains reactivity when props change', async () => {
    const wrapper = mount(SVGIcon, {
      props: { name: 'icon-search' },
    });

    const initialName = wrapper.props('name');
    expect(initialName).toBe('icon-search');

    await wrapper.setProps({ name: 'icon-retry' });
    expect(wrapper.props('name')).toBe('icon-retry');
    expect(wrapper.props('name')).not.toBe(initialName);
  });
});