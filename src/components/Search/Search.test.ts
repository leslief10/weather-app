import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia } from 'pinia';
import Search from './Search.vue';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/Input';
import { SearchDropdown } from '@/components/Search';
import { searchCities } from '@/services/locationService';
import { createMockWeatherStore } from '@/test-utils/mockWeatherStore';
import type { LocationData } from '@/types';

vi.mock('@/stores/weatherStore', () => ({
  useWeatherStore: vi.fn(),
}));

vi.mock('@/services/locationService', () => ({
  searchCities: vi.fn(),
}));

import { useWeatherStore } from '@/stores/weatherStore';

describe('Search.vue', () => {
  const mockLocations: LocationData[] = [
    {
      city: 'New York',
      country: 'USA',
      latitude: 40.7128,
      longitude: -74.0060,
    },
    {
      city: 'London',
      country: 'UK',
      latitude: 51.5074,
      longitude: -0.1278,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Component rendering', () => {
    it('renders the search container', () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      expect(wrapper.find('.search').exists()).toBe(true);
      expect(wrapper.find('.search-container').exists()).toBe(true);
    });

    it('renders SearchInput component', () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      expect(wrapper.findComponent(SearchInput).exists()).toBe(true);
    });

    it('renders Button component', () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const button = wrapper.findComponent(Button);
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('Search');
    });

    it('sets correct placeholder for SearchInput', () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      expect(searchInput.props('placeholder')).toBe('Search for a place...');
    });
  });

  describe('Search functionality', () => {
    it('does not show dropdown when search query is empty', () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      expect(wrapper.findComponent(SearchDropdown).exists()).toBe(false);
    });

    it('does not trigger search for queries less than 2 characters', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'a');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      expect(vi.mocked(searchCities)).not.toHaveBeenCalled();
      expect(wrapper.findComponent(SearchDropdown).exists()).toBe(false);
    });

    it('triggers search after debounce delay for valid queries', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'New York');
      
      expect(vi.mocked(searchCities)).not.toHaveBeenCalled();

      vi.advanceTimersByTime(300);
      await flushPromises();

      expect(vi.mocked(searchCities)).toHaveBeenCalledWith('New York');
    });

    it('shows loading state during search', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockLocations), 1000))
      );

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'London');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const dropdown = wrapper.findComponent(SearchDropdown);
      expect(dropdown.exists()).toBe(true);
      expect(dropdown.props('isLoading')).toBe(true);
    });

    it('displays search results after successful search', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'New');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const dropdown = wrapper.findComponent(SearchDropdown);
      expect(dropdown.exists()).toBe(true);
      expect(dropdown.props('results')).toEqual(mockLocations);
      expect(dropdown.props('isLoading')).toBe(false);
    });

    it('debounces multiple rapid search queries', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      
      await searchInput.vm.$emit('update:modelValue', 'Ne');
      vi.advanceTimersByTime(100);
      
      await searchInput.vm.$emit('update:modelValue', 'New');
      vi.advanceTimersByTime(100);
      
      await searchInput.vm.$emit('update:modelValue', 'New Y');
      vi.advanceTimersByTime(300);
      await flushPromises();

      expect(vi.mocked(searchCities)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(searchCities)).toHaveBeenCalledWith('New Y');
    });

it('handles search errors gracefully', async () => {
  const mockStore = createMockWeatherStore({ error: null });
  vi.mocked(useWeatherStore).mockReturnValue(mockStore);
  
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.mocked(searchCities).mockRejectedValue(new Error('Network error'));

  const wrapper = mount(Search, {
    global: {
      plugins: [createPinia()],
    },
  });

  const searchInput = wrapper.findComponent(SearchInput);
  await searchInput.vm.$emit('update:modelValue', 'Tokyo');
  
  vi.advanceTimersByTime(300);
  await flushPromises();

  expect(consoleErrorSpy).toHaveBeenCalled();

  const dropdown = wrapper.findComponent(SearchDropdown);
  expect(dropdown.props('results')).toEqual([]);

  consoleErrorSpy.mockRestore();
});

    it('clears results when query becomes too short', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      
      await searchInput.vm.$emit('update:modelValue', 'New York');
      vi.advanceTimersByTime(300);
      await flushPromises();

      expect(wrapper.findComponent(SearchDropdown).exists()).toBe(true);

      await searchInput.vm.$emit('update:modelValue', 'N');
      await flushPromises();

      expect(wrapper.findComponent(SearchDropdown).exists()).toBe(false);
    });
  });

  describe('City selection', () => {
    it('calls fetchWeather when selecting a city from dropdown', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'New York');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const dropdown = wrapper.findComponent(SearchDropdown);
      await dropdown.vm.$emit('select', mockLocations[0]);
      await flushPromises();

      expect(mockStore.fetchWeather).toHaveBeenCalledWith(mockLocations[0]);
    });

    it('hides dropdown after selecting a city', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'London');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const dropdown = wrapper.findComponent(SearchDropdown);
      await dropdown.vm.$emit('select', mockLocations[1]);
      await flushPromises();

      expect(wrapper.findComponent(SearchDropdown).exists()).toBe(false);
    });

    it('clears search query after selecting a city', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'Tokyo');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const dropdown = wrapper.findComponent(SearchDropdown);
      await dropdown.vm.$emit('select', mockLocations[0]);
      await flushPromises();

      expect(searchInput.props('modelValue')).toBe('');
    });

    it('emits empty message event when selecting a city', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'Paris');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const dropdown = wrapper.findComponent(SearchDropdown);
      await dropdown.vm.$emit('select', mockLocations[0]);
      await flushPromises();

      expect(wrapper.emitted('message')).toBeTruthy();
      expect(wrapper.emitted('message')?.[0]).toEqual(['']);
    });

    it('handles errors during city selection', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.mocked(searchCities).mockResolvedValue(mockLocations);
      vi.mocked(mockStore.fetchWeather).mockRejectedValue(new Error('Fetch error'));

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'Berlin');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const dropdown = wrapper.findComponent(SearchDropdown);
      await dropdown.vm.$emit('select', mockLocations[0]);
      await flushPromises();

      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Search button functionality', () => {
    it('disables search button when search returns no results', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(undefined as unknown as LocationData[]);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const button = wrapper.findComponent(Button);
      expect(button.props('disabled')).toBe(false);

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'NonExistentCity');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      expect(button.props('disabled')).toBe(true);
    });

    it('fetches weather for first result when search button is clicked', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'Rome');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const button = wrapper.findComponent(Button);
      await button.trigger('click');
      await flushPromises();

      expect(mockStore.fetchWeather).toHaveBeenCalledWith(mockLocations[0]);
    });

    it('hides dropdown after search button click', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'Vienna');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const button = wrapper.findComponent(Button);
      await button.trigger('click');
      await flushPromises();

      expect(wrapper.findComponent(SearchDropdown).exists()).toBe(false);
    });

    it('clears search query after search button click', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'Oslo');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const button = wrapper.findComponent(Button);
      await button.trigger('click');
      await flushPromises();

      expect(searchInput.props('modelValue')).toBe('');
    });

    it('emits message when no results found and button is clicked', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue([]);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'Atlantis');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const button = wrapper.findComponent(Button);
      await button.trigger('click');
      await flushPromises();

      expect(wrapper.emitted('message')?.[0]).toEqual(['No search result found!']);
    });

    it('emits empty message on successful search button click', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      vi.mocked(searchCities).mockResolvedValue(mockLocations);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'Dublin');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const button = wrapper.findComponent(Button);
      await button.trigger('click');
      await flushPromises();

      expect(wrapper.emitted('message')?.[0]).toEqual(['']);
    });

    it('handles errors during search button click', async () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);
      
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.mocked(searchCities).mockResolvedValue(mockLocations);
      vi.mocked(mockStore.fetchWeather).mockRejectedValue(new Error('Button fetch error'));

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      const searchInput = wrapper.findComponent(SearchInput);
      await searchInput.vm.$emit('update:modelValue', 'Warsaw');
      
      vi.advanceTimersByTime(300);
      await flushPromises();

      const button = wrapper.findComponent(Button);
      await button.trigger('click');
      await flushPromises();

      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('CSS classes', () => {
    it('applies correct CSS classes to components', () => {
      const mockStore = createMockWeatherStore();
      vi.mocked(useWeatherStore).mockReturnValue(mockStore);

      const wrapper = mount(Search, {
        global: {
          plugins: [createPinia()],
        },
      });

      expect(wrapper.find('.search').exists()).toBe(true);
      expect(wrapper.find('.search-container').exists()).toBe(true);
      expect(wrapper.find('.search-container__input').exists()).toBe(true);
    });
  });
});
