import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconButton from '@/components/ui/Button/IconButton.vue';
import { SVGIcon } from '@/components/ui/Icons';

describe('IconButton.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(IconButton);
    expect(wrapper.exists()).toBe(true);
  });

  it('applies default props correctly', () => {
    const wrapper = mount(IconButton);
    const button = wrapper.findComponent({ name: 'Button' });
    expect(button.props('type')).toBe('button');
    expect(button.props('variant')).toBe('primary');
    expect(button.props('size')).toBe('lg');
    expect(button.props('disabled')).toBe(false);
  });

  it('renders left icon when iconLeft prop is provided', () => {
    const wrapper = mount(IconButton, {
      props: { iconLeft: 'icon-loading' },
    });
    const svgIcon = wrapper.findComponent(SVGIcon);
    expect(svgIcon.exists()).toBe(true);
  });

  it('renders right icon when iconRight prop is provided', () => {
    const wrapper = mount(IconButton, {
      props: { iconRight: 'icon-dropdown' },
    });
    const svgIcon = wrapper.findComponent(SVGIcon);
    expect(svgIcon.exists()).toBe(true);
  });

  it('does not render icons when props are not provided', () => {
    const wrapper = mount(IconButton);
    expect(wrapper.find('.icon-button__icon--left').exists()).toBe(false);
    expect(wrapper.find('.icon-button__icon--right').exists()).toBe(false);
  });

  it('renders slot content', () => {
    const wrapper = mount(IconButton, {
      slots: { default: 'Click me' },
    });
    expect(wrapper.text()).toContain('Click me');
  });

  it('emits click event with MouseEvent', async () => {
    const wrapper = mount(IconButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('disables button when disabled prop is true', () => {
    const wrapper = mount(IconButton, {
      props: { disabled: true },
    });
    const button = wrapper.findComponent({ name: 'Button' });
    expect(button.props('disabled')).toBe(true);
  });

  it('disables button when loading prop is true', () => {
    const wrapper = mount(IconButton, {
      props: { loading: true },
    });
    const button = wrapper.findComponent({ name: 'Button' });
    expect(button.props('disabled')).toBe(true);
  });

  it('passes through aria attributes to Button component', () => {
    const wrapper = mount(IconButton, {
      props: {
        ariaLabel: 'Menu',
        ariaExpanded: true,
        ariaPressed: false,
      },
    });
    const button = wrapper.findComponent({ name: 'Button' });
    expect(button.props('ariaLabel')).toBe('Menu');
    expect(button.props('ariaExpanded')).toBe(true);
    expect(button.props('ariaPressed')).toBe(false);
  });

  it('applies custom className prop', () => {
    const wrapper = mount(IconButton, {
      props: { className: 'custom-class' },
    });
    const button = wrapper.findComponent({ name: 'Button' });
    expect(button.props('className')).toBe('custom-class');
  });

  it('applies id prop to Button component', () => {
    const wrapper = mount(IconButton, {
      props: { id: 'test-button' },
    });
    const button = wrapper.findComponent({ name: 'Button' });
    expect(button.props('id')).toBe('test-button');
  });

  it('renders both icons with slot content', () => {
    const wrapper = mount(IconButton, {
      props: { iconLeft: 'icon-loading', iconRight: 'icon-dropdown' },
      slots: { default: 'Text' },
    });
    const svgIcons = wrapper.findAllComponents(SVGIcon);
    expect(svgIcons).toHaveLength(2);
    expect(svgIcons[0]?.vm.name).toContain('icon-loading');
    expect(svgIcons[1]?.vm.name).toContain('icon-dropdown');
    expect(wrapper.text()).toContain('Text');
  });
});
