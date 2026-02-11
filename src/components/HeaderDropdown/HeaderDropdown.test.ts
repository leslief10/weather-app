import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import HeaderDropdown from './HeaderDropdown.vue';
import { createMockUnitsStore } from '@/test-utils/mockUnitsStore';
import { Button } from '@/components/ui/Button';
import { List, ListItem } from '@/components/ui/List';
import { SVGIcon } from '@/components/ui/Icons';

vi.mock('@/stores/unitsStore', () => ({
  useUnitsStore: vi.fn(),
}));

import { useUnitsStore } from '@/stores/unitsStore';

describe('HeaderDropdown.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  const mountComponent = (storeOptions = {}) => {
    vi.mocked(useUnitsStore).mockReturnValue(
      createMockUnitsStore(storeOptions),
    );

    return mount(HeaderDropdown, {
      global: {
        components: { Button, List, ListItem, SVGIcon },
        plugins: [createPinia()],
      },
    });
  };

  describe('rendering', () => {
    it('renders the component correctly', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('.header-dropdown').exists()).toBe(true);
    });

    it('displays "Switch to Imperial" button when in metric mode', () => {
      const wrapper = mountComponent({ isImperial: false });
      expect(wrapper.text()).toContain('Switch to Imperial');
    });

    it('displays "Switch to Metric" button when in imperial mode', () => {
      const wrapper = mountComponent({ isImperial: true });
      expect(wrapper.text()).toContain('Switch to Metric');
    });

    it('renders all temperature unit options', () => {
      const wrapper = mountComponent();
      expect(wrapper.text()).toContain('Celsius (°C)');
      expect(wrapper.text()).toContain('Fahrenheit (°F)');
    });

    it('renders all wind speed unit options', () => {
      const wrapper = mountComponent();
      expect(wrapper.text()).toContain('km/h');
      expect(wrapper.text()).toContain('mph');
    });

    it('renders all precipitation unit options', () => {
      const wrapper = mountComponent();
      expect(wrapper.text()).toContain('Millimeters (mm)');
      expect(wrapper.text()).toContain('Inches (in)');
    });
  });

  describe('checkmarks display', () => {
    it('shows checkmark for celsius when selected', () => {
      const wrapper = mountComponent({ temperatureUnit: 'celsius' });
      const listItems = wrapper.findAllComponents(ListItem);
      const celsiusItem = listItems.find(item => item.text().includes('Celsius'));
      const checkmark = celsiusItem?.findComponent(SVGIcon);
      expect(checkmark?.exists()).toBe(true);
    });

    it('shows checkmark for fahrenheit when selected', () => {
      const wrapper = mountComponent({ temperatureUnit: 'fahrenheit' });
      const listItems = wrapper.findAllComponents(ListItem);
      const fahrenheitItem = listItems.find(item => item.text().includes('Fahrenheit'));
      const checkmark = fahrenheitItem?.findComponent(SVGIcon);
      expect(checkmark?.exists()).toBe(true);
    });

    it('shows checkmark for kmh when selected', () => {
      const wrapper = mountComponent({ windSpeedUnit: 'kmh' });
      const listItems = wrapper.findAllComponents(ListItem);
      const kmhItem = listItems.find(item => item.text() === 'km/h');
      const checkmark = kmhItem?.findComponent(SVGIcon);
      expect(checkmark?.exists()).toBe(true);
    });

    it('shows checkmark for mph when selected', () => {
      const wrapper = mountComponent({ windSpeedUnit: 'mph' });
      const listItems = wrapper.findAllComponents(ListItem);
      const mphItem = listItems.find(item => item.text() === 'mph');
      const checkmark = mphItem?.findComponent(SVGIcon);
      expect(checkmark?.exists()).toBe(true);
    });

    it('shows checkmark for mm when selected', () => {
      const wrapper = mountComponent({ precipitationUnit: 'mm' });
      const listItems = wrapper.findAllComponents(ListItem);
      const mmItem = listItems.find(item => item.text().includes('Millimeters'));
      const checkmark = mmItem?.findComponent(SVGIcon);
      expect(checkmark?.exists()).toBe(true);
    });

    it('shows checkmark for inch when selected', () => {
      const wrapper = mountComponent({ precipitationUnit: 'inch' });
      const listItems = wrapper.findAllComponents(ListItem);
      const inchItem = listItems.find(item => item.text().includes('Inches'));
      const checkmark = inchItem?.findComponent(SVGIcon);
      expect(checkmark?.exists()).toBe(true);
    });
  });

  describe('unit switching', () => {
    it('calls switchToImperial when button is clicked in metric mode', async () => {
      const wrapper = mountComponent({ isImperial: false });
      const mockStore = vi.mocked(useUnitsStore)();
      const button = wrapper.findComponent(Button);

      await button.trigger('click');

      expect(mockStore.switchToImperial).toHaveBeenCalled();
    });

    it('calls switchToMetric when button is clicked in imperial mode', async () => {
      const wrapper = mountComponent({ isImperial: true });
      const mockStore = vi.mocked(useUnitsStore)();
      const button = wrapper.findComponent(Button);

      await button.trigger('click');

      expect(mockStore.switchToMetric).toHaveBeenCalled();
    });

    it('emits close event after switching to imperial', async () => {
      const wrapper = mountComponent({ isImperial: false });
      const button = wrapper.findComponent(Button);

      await button.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('emits close event after switching to metric', async () => {
      const wrapper = mountComponent({ isImperial: true });
      const button = wrapper.findComponent(Button);

      await button.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });

  describe('temperature unit selection', () => {
    it('emits close event after selecting celsius', async () => {
      const wrapper = mountComponent();
      const listItems = wrapper.findAllComponents(ListItem);
      const celsiusItem = listItems.find(item => item.text().includes('Celsius'));

      await celsiusItem?.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('emits close event after selecting fahrenheit', async () => {
      const wrapper = mountComponent();
      const listItems = wrapper.findAllComponents(ListItem);
      const fahrenheitItem = listItems.find(item => item.text().includes('Fahrenheit'));

      await fahrenheitItem?.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });

  describe('wind speed unit selection', () => {
    it('emits close event after selecting kmh', async () => {
      const wrapper = mountComponent();
      const listItems = wrapper.findAllComponents(ListItem);
      const kmhItem = listItems.find(item => item.text() === 'km/h');

      await kmhItem?.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('emits close event after selecting mph', async () => {
      const wrapper = mountComponent();
      const listItems = wrapper.findAllComponents(ListItem);
      const mphItem = listItems.find(item => item.text() === 'mph');

      await mphItem?.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });

  describe('precipitation unit selection', () => {
    it('emits close event after selecting mm', async () => {
      const wrapper = mountComponent();
      const listItems = wrapper.findAllComponents(ListItem);
      const mmItem = listItems.find(item => item.text().includes('Millimeters'));

      await mmItem?.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('emits close event after selecting inch', async () => {
      const wrapper = mountComponent();
      const listItems = wrapper.findAllComponents(ListItem);
      const inchItem = listItems.find(item => item.text().includes('Inches'));

      await inchItem?.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });
});
