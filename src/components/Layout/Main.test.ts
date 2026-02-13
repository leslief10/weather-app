import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Main from './Main.vue';
import { createMockWeatherStore } from '@/test-utils/mockWeatherStore';

vi.mock('@/stores/weatherStore', () => ({
  useWeatherStore: vi.fn(),
}));

import { useWeatherStore } from '@/stores/weatherStore';

describe('Main.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders ErrorMain component when error exists', () => {
    const mockStore = createMockWeatherStore({ error: 'API error occurred' });
    vi.mocked(useWeatherStore).mockReturnValue(mockStore);

    const wrapper = mount(Main);
    expect(wrapper.find('[data-testid="error-main"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="main-content"]').exists()).toBe(false);
  });

  it('renders main content when no error', () => {
    const mockStore = createMockWeatherStore({ error: null });
    vi.mocked(useWeatherStore).mockReturnValue(mockStore);

    const wrapper = mount(Main);
    expect(wrapper.find('[data-testid="main-content"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="error-main"]').exists()).toBe(false);
  });

  it('displays the correct title', () => {
    const mockStore = createMockWeatherStore({ error: null });
    vi.mocked(useWeatherStore).mockReturnValue(mockStore);

    const wrapper = mount(Main);
    expect(wrapper.find('h1.main__title').text()).toBe(
      "How's the sky looking today?",
    );
  });

  it('renders Search component', () => {
    const mockStore = createMockWeatherStore({ error: null });
    vi.mocked(useWeatherStore).mockReturnValue(mockStore);

    const wrapper = mount(Main, {
      global: {
        stubs: { Search: true },
      },
    });
    expect(wrapper.findComponent({ name: 'Search' }).exists()).toBe(true);
  });

  it('displays error message when noResultsMessage is set', async () => {
    const mockStore = createMockWeatherStore({ error: null });
    vi.mocked(useWeatherStore).mockReturnValue(mockStore);

    const wrapper = mount(Main, {
      global: {
        stubs: { Search: true },
      },
    });

    await wrapper
      .findComponent({ name: 'Search' })
      .vm.$emit('message', 'No results found');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.main__error-message').exists()).toBe(true);
    expect(wrapper.find('.main__error-message').text()).toBe(
      'No results found',
    );
  });

  it('displays weather sections when no error message', () => {
    const mockStore = createMockWeatherStore({ error: null });
    vi.mocked(useWeatherStore).mockReturnValue(mockStore);

    const wrapper = mount(Main, {
      global: {
        stubs: {
          CurrentWeatherSection: true,
          DailyWeatherSection: true,
          HourlyWeatherSection: true,
        },
      },
    });

    expect(wrapper.find('.main__sections-container').exists()).toBe(true);
  });

  it('hides weather sections when error message is shown', async () => {
    const mockStore = createMockWeatherStore({ error: null });
    vi.mocked(useWeatherStore).mockReturnValue(mockStore);

    const wrapper = mount(Main, {
      global: {
        stubs: { Search: true },
      },
    });

    await wrapper
      .findComponent({ name: 'Search' })
      .vm.$emit('message', 'Error message');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.main__sections-container').exists()).toBe(false);
  });
});
