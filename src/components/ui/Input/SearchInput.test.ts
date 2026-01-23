import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchInput from '@/components/ui/Input/SearchInput.vue';
import Input from '@/components/ui/Input/Input.vue';

describe('SearchInput.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        stubs: {
          Input: true,
          SVGIcon: true,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the search icon', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        stubs: {
          Input: true,
          SVGIcon: true,
        },
      },
    });
    const svgIcon = wrapper.findComponent({ name: 'SVGIcon' });
    expect(svgIcon.exists()).toBe(true);
    expect(svgIcon.props('name')).toBe('icon-search');
  });

  it('applies search-input__icon class to SVGIcon', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        stubs: {
          Input: true,
          SVGIcon: true,
        },
      },
    });
    const svgIcon = wrapper.findComponent({ name: 'SVGIcon' });
    expect(svgIcon.classes()).toContain('search-input__icon');
  });

  it('renders Input component with default size', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.exists()).toBe(true);
    expect(input.props('size')).toBe('lg');
  });

  it('passes modelValue to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: 'test search' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('modelValue')).toBe('test search');
  });

  it('passes type prop to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', type: 'email' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('type')).toBe('email');
  });

  it('passes size prop to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', size: 'md' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('size')).toBe('md');
  });

  it('passes disabled prop to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', disabled: true },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('disabled')).toBe(true);
  });

  it('passes placeholder to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', placeholder: 'Search weather...' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('placeholder')).toBe('Search weather...');
  });

  it('passes error prop to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', error: true },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('error')).toBe(true);
  });

  it('passes errorMessage to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', errorMessage: 'Invalid search' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('errorMessage')).toBe('Invalid search');
  });

  it('passes aria-label to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', ariaLabel: 'Search weather' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('ariaLabel')).toBe('Search weather');
  });

  it('passes aria-describedby to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', ariaDescribedby: 'search-help' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('ariaDescribedby')).toBe('search-help');
  });

  it('passes aria-invalid to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', ariaInvalid: true },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('ariaInvalid')).toBe(true);
  });

  it('passes data-testid to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', dataTestid: 'search-input' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('dataTestid')).toBe('search-input');
  });

  it('passes autocomplete to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', autocomplete: 'off' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('autocomplete')).toBe('off');
  });

  it('passes className to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', className: 'custom-search' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('className')).toBe('custom-search');
  });

  it('passes id to Input component', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', id: 'search-field' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.props('id')).toBe('search-field');
  });

  it('emits update:modelValue event when Input emits', async () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    await input.vm.$emit('update:model-value', 'new search term');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      'new search term',
    ]);
  });

  it('applies search-input class to Input', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        stubs: {
          SVGIcon: true,
        },
      },
    });
    const input = wrapper.findComponent(Input);
    expect(input.classes()).toContain('search-input');
  });

  it('renders search-input wrapper', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
      global: {
        stubs: {
          Input: true,
          SVGIcon: true,
        },
      },
    });
    expect(wrapper.find('.search-input').exists()).toBe(true);
  });
});
