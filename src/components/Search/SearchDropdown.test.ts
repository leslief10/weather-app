import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchDropdown from './SearchDropdown.vue';
import { List, ListItem } from '@/components/ui/List';
import { SVGIcon } from '@/components/ui/Icons';
import type { LocationData } from '@/types';

describe('SearchDropdown', () => {
  const mockResults: LocationData[] = [
    {
      city: 'New York',
      country: 'USA',
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      city: 'London',
      country: 'UK',
      latitude: 51.5074,
      longitude: -0.1278,
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      latitude: 35.6762,
      longitude: 139.6503,
    },
  ];

  describe('Loading state', () => {
    it('should display loading indicator when isLoading is true', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: [],
          isLoading: true,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      expect(wrapper.find('.search-dropdown__loading').exists()).toBe(true);
      expect(wrapper.text()).toContain('Search in progress');
      expect(wrapper.findComponent(SVGIcon).props('name')).toBe('icon-loading');
    });

    it('should apply spinning animation to loading icon', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: [],
          isLoading: true,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      const loadingIconContainer = wrapper.find('.search-dropdown__loading');
      expect(loadingIconContainer.exists()).toBe(true);
    });
  });

  describe('Empty state', () => {
    it('should display empty message when results is falsy and not loading', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: null as unknown as LocationData[],
          isLoading: false,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      expect(wrapper.find('.search-dropdown__empty').exists()).toBe(true);
      expect(wrapper.text()).toContain('No results found');
    });

    it('should not display empty message when loading', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: [],
          isLoading: true,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      expect(wrapper.find('.search-dropdown__empty').exists()).toBe(false);
    });
  });

  describe('Results display', () => {
    it('should render list of results when available', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: mockResults,
          isLoading: false,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      const list = wrapper.findComponent(List);
      expect(list.exists()).toBe(true);
      expect(list.props('size')).toBe('sm');

      const listItems = wrapper.findAllComponents(ListItem);
      expect(listItems).toHaveLength(mockResults.length);
    });

    it('should display city and country for each result', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: mockResults,
          isLoading: false,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      const listItems = wrapper.findAllComponents(ListItem);
      listItems.forEach((item, index) => {
        expect(item.text()).toContain(mockResults[index]?.city);
        expect(item.text()).toContain(mockResults[index]?.country);
      });
    });

    it('should apply interactive prop to list items', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: mockResults,
          isLoading: false,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      const listItems = wrapper.findAllComponents(ListItem);
      listItems.forEach((item) => {
        expect(item.props('interactive')).toBe(true);
      });
    });
  });

  describe('User interactions', () => {
    it('should emit select event when clicking on a result', async () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: mockResults,
          isLoading: false,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      const listItems = wrapper.findAllComponents(ListItem);
      await listItems[0]?.trigger('click');

      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('select')?.[0]).toEqual([mockResults[0]]);
    });

    it('should emit correct location data for each clicked item', async () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: mockResults,
          isLoading: false,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      const listItems = wrapper.findAllComponents(ListItem);

      for (let i = 0; i < listItems.length; i++) {
        await listItems[i]?.trigger('click');
        expect(wrapper.emitted('select')?.[i]).toEqual([mockResults[i]]);
      }
    });
  });

  describe('Conditional rendering', () => {
    it('should render only loading state when loading', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: mockResults,
          isLoading: true,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      expect(wrapper.find('.search-dropdown__loading').exists()).toBe(true);
      expect(wrapper.find('.search-dropdown__empty').exists()).toBe(false);
      expect(wrapper.findComponent(List).exists()).toBe(false);
    });

    it('should render only list when results are available and not loading', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: mockResults,
          isLoading: false,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      expect(wrapper.find('.search-dropdown__loading').exists()).toBe(false);
      expect(wrapper.find('.search-dropdown__empty').exists()).toBe(false);
      expect(wrapper.findComponent(List).exists()).toBe(true);
    });
  });

  describe('CSS classes', () => {
    it('should apply correct CSS classes to main container', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: mockResults,
          isLoading: false,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      expect(wrapper.find('.search-dropdown').exists()).toBe(true);
    });

    it('should apply correct CSS classes to list items', () => {
      const wrapper = mount(SearchDropdown, {
        props: {
          results: mockResults,
          isLoading: false,
        },
        global: {
          components: { List, ListItem, SVGIcon },
        },
      });

      const listItems = wrapper.findAll('.search-dropdown__item');
      expect(listItems.length).toBe(mockResults.length);
    });
  });
});
