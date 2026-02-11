import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorMain from './ErrorMain.vue';
import { SVGIcon } from '@/components/ui/Icons';
import { IconButton } from '@/components/ui/Button';

describe('ErrorMain.vue', () => {
  let reloadSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    reloadSpy = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadSpy },
      writable: true
    });
  });

  afterEach(() => {
    reloadSpy.mockRestore();
  });

  it('renders the component correctly', () => {
    const wrapper = mount(ErrorMain, {
      global: {
        components: { SVGIcon, IconButton }
      }
    });
    expect(wrapper.find('main.main').exists()).toBe(true);
  });

  it('displays the error icon with correct attributes', () => {
    const wrapper = mount(ErrorMain, {
      global: {
        components: { SVGIcon, IconButton }
      }
    });
    const img = wrapper.find('img.main__icon');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toContain('data:image/svg+xml');
    expect(img.attributes('alt')).toBe('Error connecting to the server');
  });

  it('displays the correct error title', () => {
    const wrapper = mount(ErrorMain, {
      global: {
        components: { SVGIcon, IconButton }
      }
    });
    expect(wrapper.find('h1.main__title').text()).toBe('Something went wrong');
  });

  it('displays the correct error message', () => {
    const wrapper = mount(ErrorMain, {
      global: {
        components: { SVGIcon, IconButton }
      }
    });
    const text = wrapper.find('p.main__text').text();
    expect(text).toContain("We couldn't connect to the server");
    expect(text).toContain('API error');
  });

  it('renders the retry button with correct props', () => {
    const wrapper = mount(ErrorMain, {
      global: {
        components: { SVGIcon, IconButton }
      }
    });
    const button = wrapper.findComponent(IconButton);
    expect(button.exists()).toBe(true);
    expect(button.props('variant')).toBe('secondary');
    expect(button.props('size')).toBe('md');
  });

  it('calls window.location.reload when retry button is clicked', async () => {
    const wrapper = mount(ErrorMain, {
      global: {
        components: { SVGIcon, IconButton }
      }
    });
    const button = wrapper.findComponent(IconButton);
    await button.trigger('click');
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('renders the SVG icon in the button', () => {
    const wrapper = mount(ErrorMain, {
      global: {
        components: { SVGIcon, IconButton }
      }
    });
    const icon = wrapper.findComponent(SVGIcon);
    expect(icon.exists()).toBe(true);
    expect(icon.props('name')).toBe('icon-retry');
  });

  it('displays retry button text', () => {
    const wrapper = mount(ErrorMain, {
      global: {
        components: { SVGIcon, IconButton }
      }
    });
    expect(wrapper.text()).toContain('Retry');
  });
});
