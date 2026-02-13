import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from './Header.vue';

vi.mock('@/components/ui/Button', () => ({
  IconButton: {
    name: 'IconButton',
    template: '<button><slot /></button>',
  },
}));

vi.mock('@/components/ui/Icons', () => ({
  SVGIcon: {
    name: 'SVGIcon',
    template: '<span></span>',
    props: ['name'],
  },
}));

vi.mock('@/components/HeaderDropdown/HeaderDropdown.vue', () => ({
  default: {
    name: 'HeaderDropdown',
    template: '<div class="header-dropdown"></div>',
  },
}));

describe('Header.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(Header);
    expect(wrapper.find('.header').exists()).toBe(true);
  });

  it('displays the logo with correct attributes', () => {
    const wrapper = mount(Header);
    const logo = wrapper.find('.header--logo');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('src')).toBe('/logo.svg');
    expect(logo.attributes('alt')).toBe('');
  });

  it('renders IconButton with correct content', () => {
    const wrapper = mount(Header);
    const button = wrapper.findComponent({ name: 'IconButton' });
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('Units');
  });

  it('dropdown is initially hidden', () => {
    const wrapper = mount(Header);
    const dropdown = wrapper.findComponent({ name: 'HeaderDropdown' });
    expect(dropdown.isVisible()).toBe(false);
  });

  it('shows dropdown when IconButton is clicked', async () => {
    const wrapper = mount(Header);
    const button = wrapper.findComponent({ name: 'IconButton' });

    await button.trigger('click');

    const dropdown = wrapper.findComponent({ name: 'HeaderDropdown' });
    expect(dropdown.isVisible()).toBe(true);
  });

  it('toggles dropdown visibility when IconButton is clicked multiple times', async () => {
    const wrapper = mount(Header);
    const button = wrapper.findComponent({ name: 'IconButton' });
    const dropdown = wrapper.findComponent({ name: 'HeaderDropdown' });

    expect(dropdown.attributes('style')).toContain('display: none');

    await button.trigger('click');
    expect(dropdown.attributes('style')).not.toContain('display: none');

    await button.trigger('click');
    expect(dropdown.attributes('style')).toContain('display: none');
  });

  it('closes dropdown when close event is emitted', async () => {
    const wrapper = mount(Header);
    const button = wrapper.findComponent({ name: 'IconButton' });

    await button.trigger('click');

    const dropdown = wrapper.findComponent({ name: 'HeaderDropdown' });
    expect(dropdown.attributes('style')).not.toContain('display: none');

    await dropdown.vm.$emit('close');

    expect(dropdown.attributes('style')).toContain('display: none');
  });

  it('applies correct CSS classes', () => {
    const wrapper = mount(Header);
    expect(wrapper.find('header').classes()).toContain('header');
    expect(wrapper.find('img').classes()).toContain('header--logo');
  });
});
