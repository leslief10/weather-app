import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from '@/components/ui/Input/Input.vue';

describe('Input.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('applies default props correctly', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' },
    });
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('text');
    expect(input.classes()).toContain('input--lg');
  });

  it('renders input with custom id', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', id: 'test-input' },
    });
    expect(wrapper.find('input').attributes('id')).toBe('test-input');
  });

  it('renders input with correct type', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', type: 'email' },
    });
    expect(wrapper.find('input').attributes('type')).toBe('email');
  });

  it('displays the modelValue prop', () => {
    const wrapper = mount(Input, {
      props: { modelValue: 'Test value' },
    });
    expect(wrapper.find('input').element.value).toBe('Test value');
  });

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' },
    });
    const input = wrapper.find('input');
    await input.setValue('New value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New value']);
  });

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', disabled: true },
    });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('renders placeholder text', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', placeholder: 'Enter text...' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'Enter text...',
    );
  });

  it('applies correct size class', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', size: 'sm' },
    });
    expect(wrapper.find('input').classes()).toContain('input--sm');
  });

  it('applies custom className prop', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', className: 'custom-class' },
    });
    expect(wrapper.find('input').classes()).toContain('custom-class');
  });

  it('applies error state class when error prop is true', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', error: true },
    });
    expect(wrapper.find('input').classes()).toContain('input--error');
  });

  it('displays error message when error and errorMessage props are provided', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        error: true,
        errorMessage: 'This field is required',
      },
    });
    expect(wrapper.find('.input--error-message').text()).toBe(
      'This field is required',
    );
  });

  it('does not display error message when error is false', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        error: false,
        errorMessage: 'This field is required',
      },
    });
    expect(wrapper.find('.input--error-message').exists()).toBe(false);
  });

  it('passes aria-label to input element', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', ariaLabel: 'Username' },
    });
    expect(wrapper.find('input').attributes('aria-label')).toBe('Username');
  });

  it('passes aria-describedby to input element', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', ariaDescribedby: 'help-text' },
    });
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      'help-text',
    );
  });

  it('passes aria-invalid to input element', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', ariaInvalid: true },
    });
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true');
  });

  it('passes data-testid to input element', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', dataTestid: 'email-input' },
    });
    expect(wrapper.find('input').attributes('data-testid')).toBe('email-input');
  });

  it('sets autocomplete attribute', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', autocomplete: 'email' },
    });
    expect(wrapper.find('input').attributes('autocomplete')).toBe('email');
  });

  it('handles numeric input', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', type: 'number' },
    });
    const input = wrapper.find('input');
    await input.setValue('42');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['42']);
  });
});
